import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseServerClient } from "@/lib/supabase";
import { hasForbiddenLink, sanitizeCommentInput } from "@/lib/comments";

const slugPattern = /^[a-z0-9-]{3,120}$/;

export const runtime = "nodejs";

export async function GET(request: Request) {
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
    return NextResponse.json({ error: "Invalid slug." }, { status: 400 });
  }

  // Graceful fallback to avoid frontend console/network errors when comments are disabled.
  if (!supabase) {
    return NextResponse.json({ comments: [] }, { status: 200 });
  }

  const { data, error } = await supabase
    .from("comments")
    .select("id, slug, content, user_name, created_at")
    .eq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    if (error.message.toLowerCase().includes("could not find the table")) {
      return NextResponse.json({ comments: [] }, { status: 200 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ comments: data ?? [] }, { status: 200 });
}

export async function POST(request: Request) {
  const supabaseAdmin = getSupabaseServerClient();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) {
    return NextResponse.json({ error: "Comments are not configured." }, { status: 503 });
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const authClient = createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false }
  });
  const {
    data: { user },
    error: authError
  } = await authClient.auth.getUser(token);

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  const slug = typeof payload?.slug === "string" ? payload.slug.trim() : "";
  const rawContent = typeof payload?.content === "string" ? payload.content : "";
  const content = sanitizeCommentInput(rawContent);

  if (!slugPattern.test(slug)) {
    return NextResponse.json({ error: "Invalid slug." }, { status: 400 });
  }
  if (content.length < 2 || content.length > 1200) {
    return NextResponse.json({ error: "Comment length must be between 2 and 1200 characters." }, { status: 400 });
  }
  if (hasForbiddenLink(content)) {
    return NextResponse.json({ error: "Links are not allowed in comments." }, { status: 400 });
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
    if (error.message.toLowerCase().includes("could not find the table")) {
      return NextResponse.json({ error: "Comments storage is not ready yet." }, { status: 503 });
    }
    if (error.message.toLowerCase().includes("row-level security")) {
      return NextResponse.json({ error: "Comments permissions are not configured yet." }, { status: 503 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ comment: data }, { status: 201 });
}
