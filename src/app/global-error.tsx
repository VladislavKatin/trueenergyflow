"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4">
          <section className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-slate-900">Something went wrong</h1>
            <p className="mt-3 text-slate-600">Please try refreshing the page.</p>
            <button onClick={reset} className="mt-6 rounded-full bg-sky-700 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-800">
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
