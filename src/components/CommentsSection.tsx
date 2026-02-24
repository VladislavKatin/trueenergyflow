"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { hasForbiddenLink, sanitizeCommentInput, type PublicComment } from "@/lib/comments";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type CommentsSectionProps = {
  slug: string;
};

export function CommentsSection({ slug }: CommentsSectionProps) {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const loadComments = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`, {
        method: "GET",
        cache: "no-store"
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load comments.");
      setComments(json.comments ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load comments.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  async function signInWithGoogle() {
    if (!supabase) return;
    const redirectTo = `${window.location.origin}/blog/${slug}`;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo }
    });
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  }

  async function submitComment() {
    const content = sanitizeCommentInput(message);
    if (!content) return;
    if (hasForbiddenLink(content)) {
      setError("Links are not allowed in comments.");
      return;
    }
    if (!session?.access_token) {
      setError("Please sign in with Google first.");
      return;
    }

    setPosting(true);
    setError("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ slug, content })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to post comment.");
      setMessage("");
      await loadComments();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post comment.");
    } finally {
      setPosting(false);
    }
  }

  if (!supabase) {
    return (
      <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Comments</h2>
        <p className="mt-3 text-sm text-slate-600">Comments are temporarily unavailable.</p>
      </section>
    );
  }

  return (
    <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-semibold text-slate-900">Comments</h2>
      <p className="mt-2 text-sm text-slate-500">Sign in with Google to comment. External links are not allowed.</p>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        {session ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-700">
              Signed in as <span className="font-semibold">{session.user.email}</span>
            </p>
            <button
              type="button"
              onClick={signOut}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={signInWithGoogle}
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
          >
            Continue with Google
          </button>
        )}

        <div className="mt-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            maxLength={1200}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-800 outline-none ring-slate-400 focus:ring-2"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>{message.length}/1200</span>
            <button
              type="button"
              disabled={!session || posting || sanitizeCommentInput(message).length < 2}
              onClick={submitComment}
              className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {posting ? "Posting..." : "Post comment"}
            </button>
          </div>
        </div>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-rose-700">{error}</p>}

      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-sm text-slate-600">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-slate-600">No comments yet. Be the first to comment.</p>
        ) : (
          comments.map((comment) => (
            <article key={comment.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-2 flex items-center justify-between gap-3 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{comment.user_name}</span>
                <span>{new Date(comment.created_at).toLocaleDateString("en-US")}</span>
              </div>
              <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">{comment.content}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
