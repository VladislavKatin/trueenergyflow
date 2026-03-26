import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseServerClient } from "@/lib/supabase";
import { hasForbiddenLink, sanitizeCommentInput } from "@/lib/comments";
import { applyRateLimit, getClientIp } from "@/lib/rateLimit";

const slugPattern = /^[a-z0-9-]{3,120}$/;
const COMMENTS_WINDOW_MS = 15 * 60 * 1000;
const MAX_COMMENT_REQUESTS = 8;

export const runtime = "nodejs";

function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0"
    }
  });
}

export async function GET(request: Request) {
  try {
    const supabaseAdmin = getSupabaseServerClient();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase =
      supabaseAdmin ||
      (supabaseUrl && anonKey
        ? createClient(supabaseUrl, anonKey, { auth: { persistSession: false, autoRefreshToken: false } })
        : null);
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug") ?? "";
    if (!slugPattern.test(slug)) {
      return json({ error: "Invalid slug." }, 400);
    }

    if (!supabase) {
      return json({ comments: [] }, 200);
    }

    const { data, error } = await supabase
      .from("comments")
      .select("id, slug, content, user_name, created_at")
      .eq("slug", slug)
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      const message = error.message.toLowerCase();
      if (message.includes("could not find the table")) {
        return json({ comments: [] }, 200);
      }
      return json({ error: "Unable to load comments right now." }, 500);
    }

    return json({ comments: data ?? [] }, 200);
  } catch {
    return json({ comments: [] }, 200);
  }
}

export async function POST(request: Request) {
  try {
    const supabaseAdmin = getSupabaseServerClient();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !anonKey) {
      return json({ error: "Comments are not configured." }, 503);
    }

    const ip = getClientIp(request);
    const limit = applyRateLimit({
      namespace: "comments",
      key: ip,
      windowMs: COMMENTS_WINDOW_MS,
      maxRequests: MAX_COMMENT_REQUESTS
    });
    if (!limit.allowed) {
      return json({ error: "Too many comment requests. Please try again later." }, 429);
    }

    const authHeader = request.headers.get("authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (!token) {
      return json({ error: "Unauthorized." }, 401);
    }

    const authClient = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false }
    });
    const {
      data: { user },
      error: authError
    } = await authClient.auth.getUser(token);

    if (authError || !user) {
      return json({ error: "Unauthorized." }, 401);
    }

    const payload = await request.json().catch(() => null);
    const slug = typeof payload?.slug === "string" ? payload.slug.trim() : "";
    const rawContent = typeof payload?.content === "string" ? payload.content : "";
    const content = sanitizeCommentInput(rawContent);

    if (!slugPattern.test(slug)) {
      return json({ error: "Invalid slug." }, 400);
    }
    if (content.length < 2 || content.length > 1200) {
      return json({ error: "Comment length must be between 2 and 1200 characters." }, 400);
    }
    if (hasForbiddenLink(content)) {
      return json({ error: "Links are not allowed in comments." }, 400);
    }

    const userName =
      (user.user_metadata?.full_name as string | undefined) ||
      (user.user_metadata?.name as string | undefined) ||
      (user.email?.split("@")[0] ?? "User");
    const supabaseUser = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    });
    const dbClient = supabaseAdmin ?? supabaseUser;

    const { data, error } = await dbClient
      .from("comments")
      .insert({
        slug,
        content,
        user_id: user.id,
        user_name: userName
      })
      .select("id, slug, content, user_name, created_at")
      .single();

    if (error) {
      const message = error.message.toLowerCase();
      if (message.includes("could not find the table")) {
        return json({ error: "Comments storage is not ready yet." }, 503);
      }
      if (message.includes("row-level security")) {
        return json({ error: "Comments permissions are not configured yet." }, 503);
      }
      return json({ error: "Unable to publish the comment right now." }, 500);
    }

    return json({ comment: data }, 201);
  } catch {
    return json({ error: "Unable to publish the comment right now." }, 500);
  }
}
