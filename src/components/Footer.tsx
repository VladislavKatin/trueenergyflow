import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} True Energy Flow</p>
        <div className="flex items-center gap-5">
          <Link href="/privacy-policy" className="text-sm text-slate-600 hover:text-slate-900">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm text-slate-600 hover:text-slate-900">
            Terms
          </Link>
          <Link href="/disclaimer" className="text-sm text-slate-600 hover:text-slate-900">
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}

