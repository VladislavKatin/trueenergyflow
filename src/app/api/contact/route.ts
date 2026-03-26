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

async function sendNotificationEmail(params: {
  name: string;
  email: string;
  message: string;
}) {
  if (!resendApiKey) {
    return false;
  }

  const text = [
    "New contact form message",
    "",
    `Name: ${params.name}`,
    `Email: ${params.email}`,
    "",
    "Message:",
    params.message
  ].join("\n");

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: [contactToEmail],
        subject: `New contact form message from ${params.name}`,
        text,
        reply_to: params.email
      })
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseServerClient();

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
    let storedSuccessfully = false;

    if (supabase) {
      const { error } = await supabase.from("contact_messages").insert({
        name,
        email,
        message,
        ip,
        user_agent: userAgent
      });

      if (!error) {
        storedSuccessfully = true;
      }
    }

    const emailedSuccessfully = await sendNotificationEmail({ name, email, message });

    if (storedSuccessfully || emailedSuccessfully) {
      return json({ ok: true }, 200);
    }

    return json(
      {
        error: "Contact service is temporarily unavailable.",
        fallbackEmail: contactToEmail,
        fallbackMailto: `mailto:${contactToEmail}`
      },
      503
    );
  } catch {
    return json(
      {
        error: "Contact service is temporarily unavailable.",
        fallbackEmail: contactToEmail,
        fallbackMailto: `mailto:${contactToEmail}`
      },
      503
    );
  }
}
