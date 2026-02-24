"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
  website: ""
};

const linkPattern =
  /(https?:\/\/|www\.|[a-z0-9-]+\.(com|net|org|io|co|dev|app|info|biz|us|uk|ca|au|de|fr|ua|ru)\b)/i;

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (linkPattern.test(form.message)) {
      setError("Links are not allowed in the message.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form)
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || "Failed to submit form.");
      }
      setForm(initialState);
      setSuccess("Thanks. Your message was sent successfully.");
      trackEvent("contact_form_submit", { page: "contact" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit form.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-semibold text-slate-900">Send a Message</h2>
      <p className="mt-2 text-sm text-slate-600">
        Response window is typically 1-2 business days. Please do not include links.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Name
            <input
              required
              minLength={2}
              maxLength={120}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-slate-400 focus:ring-2"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-slate-400 focus:ring-2"
            />
          </label>
        </div>

        <label className="sr-only" aria-hidden="true">
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
            className="hidden"
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Message
          <textarea
            required
            minLength={10}
            maxLength={3000}
            rows={7}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-slate-400 focus:ring-2"
            placeholder="Tell us your goals, preferred service, and time zone."
          />
        </label>

        {error && <p className="text-sm font-medium text-rose-700">{error}</p>}
        {success && <p className="text-sm font-medium text-emerald-700">{success}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Send message"}
        </button>
      </form>
    </section>
  );
}
