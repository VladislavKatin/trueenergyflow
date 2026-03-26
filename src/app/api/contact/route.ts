import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { hasForbiddenLink, sanitizeCommentInput } from "@/lib/comments";
import { applyRateLimit, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const RESEND_API_URL = "https://api.resend.com/emails";
const contactToEmail = process.env.CONTACT_TO_EMAIL || "vladkatintam@gmail.com";
const contactFromEmail = process.env.CONTACT_FROM_EMAIL || "True Energy Flow <onboarding@resend.dev>";
const resendApiKey = process.env.RESEND_API_KEY;

function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0"
    }
  });
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return json({ error: "Contact form is not configured." }, 503);
    }

    const ip = getClientIp(request);
    const limit = applyRateLimit({
      namespace: "contact",
      key: ip,
      windowMs: WINDOW_MS,
      maxRequests: MAX_REQUESTS_PER_WINDOW
    });
    if (!limit.allowed) {
      return json({ error: "Too many requests. Please try again later." }, 429);
    }

    const payload = await request.json().catch(() => null);
    const name = sanitizeCommentInput(typeof payload?.name === "string" ? payload.name : "");
    const email = sanitizeCommentInput(typeof payload?.email === "string" ? payload.email : "");
    const message = sanitizeCommentInput(typeof payload?.message === "string" ? payload.message : "");
    const website = sanitizeCommentInput(typeof payload?.website === "string" ? payload.website : "");

    if (website) {
      return json({ ok: true }, 200);
    }

    if (name.length < 2 || name.length > 120) {
      return json({ error: "Please enter a valid name." }, 400);
    }
    if (!emailPattern.test(email)) {
      return json({ error: "Please enter a valid email." }, 400);
    }
    if (message.length < 10 || message.length > 3000) {
      return json({ error: "Message must be 10-3000 characters." }, 400);
    }
    if (hasForbiddenLink(message)) {
      return json({ error: "Links are not allowed in the message." }, 400);
    }

    const userAgent = request.headers.get("user-agent") ?? "";

    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      message,
      ip,
      user_agent: userAgent
    });

    if (error) {
      const dbMessage = error.message.toLowerCase();
      if (dbMessage.includes("could not find the table")) {
        return json({ error: "Contact storage is not ready yet." }, 503);
      }
      if (dbMessage.includes("row-level security")) {
        return json({ error: "Contact permissions are not configured yet." }, 503);
      }
      return json({ error: "Unable to submit the message right now." }, 500);
    }

    if (resendApiKey) {
      const text = [
        "New contact form message",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message
      ].join("\n");

      await fetch(RESEND_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: contactFromEmail,
          to: [contactToEmail],
          subject: `New contact form message from ${name}`,
          text,
          reply_to: email
        })
      }).catch(() => null);
    }

    return json({ ok: true }, 200);
  } catch {
    return json({ error: "Unable to submit the message right now." }, 500);
  }
}
