"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const CommentsSection = dynamic(
  () => import("@/components/CommentsSection").then((mod) => mod.CommentsSection),
  { ssr: false, loading: () => <p className="text-sm text-slate-600">Loading comments...</p> }
);

type CommentsSectionLazyProps = {
  slug: string;
  startOpen?: boolean;
};

export function CommentsSectionLazy({ slug, startOpen = false }: CommentsSectionLazyProps) {
  const [open, setOpen] = useState(startOpen);

  if (!open) {
    return (
      <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Comments</h2>
        <p className="mt-2 text-sm text-slate-600">Load comments and sign in with Google to participate.</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
        >
          Load comments
        </button>
      </section>
    );
  }

  return <CommentsSection slug={slug} />;
}

