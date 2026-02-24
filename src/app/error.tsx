"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">500</p>
      <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl font-semibold text-slate-900">
        Internal server error
      </h1>
      <p className="mt-4 text-slate-600">Please try again in a moment.</p>
      <button
        onClick={reset}
        className="mt-8 inline-flex rounded-full bg-sky-700 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-800"
      >
        Try again
      </button>
    </section>
  );
}

