import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { hasForbiddenLink, sanitizeCommentInput } from "@/lib/comments";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const RESEND_API_URL = "https://api.resend.com/emails";
const contactToEmail = process.env.CONTACT_TO_EMAIL || "vladkatintam@gmail.com";
const contactFromEmail = process.env.CONTACT_FROM_EMAIL || "True Energy Flow <onboarding@resend.dev>";
const resendApiKey = process.env.RESEND_API_KEY;

type RateEntry = { count: number; resetAt: number };

const globalStore = globalThis as unknown as { __contactRate?: Map<string, RateEntry> };
if (!globalStore.__contactRate) globalStore.__contactRate = new Map<string, RateEntry>();
const rateStore = globalStore.__contactRate;

function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  const cfIp = request.headers.get("cf-connecting-ip");
  return (cfIp || fwd?.split(",")[0] || "unknown").trim();
}

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const item = rateStore.get(ip);
  if (!item || now > item.resetAt) {
    rateStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (item.count >= MAX_REQUESTS_PER_WINDOW) return false;
  item.count += 1;
  rateStore.set(ip, item);
  return true;
}

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Contact form is not configured." }, { status: 500 });
  }

  const ip = getClientIp(request);
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const payload = await request.json().catch(() => null);
  const name = sanitizeCommentInput(typeof payload?.name === "string" ? payload.name : "");
  const email = sanitizeCommentInput(typeof payload?.email === "string" ? payload.email : "");
  const message = sanitizeCommentInput(typeof payload?.message === "string" ? payload.message : "");
  const website = sanitizeCommentInput(typeof payload?.website === "string" ? payload.website : "");

  if (website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
  }
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (message.length < 10 || message.length > 3000) {
    return NextResponse.json({ error: "Message must be 10-3000 characters." }, { status: 400 });
  }
  if (hasForbiddenLink(message)) {
    return NextResponse.json({ error: "Links are not allowed in the message." }, { status: 400 });
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Best-effort transactional email notification.
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

  return NextResponse.json({ ok: true }, { status: 200 });
}
