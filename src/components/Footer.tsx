import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white/80">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_1fr] md:px-6">
        <div>
          <p className="text-lg font-extrabold text-slate-900">True Energy Flow</p>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            Spiritual and educational wellness content for U.S. readers. Sessions are offered with clear scope,
            practical integration, and safe language.
          </p>
          <p className="mt-5 text-xs text-slate-500">© {new Date().getFullYear()} True Energy Flow. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap items-start gap-5 text-sm font-semibold text-slate-700">
          <Link href="/privacy-policy" className="hover:text-slate-900">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-slate-900">
            Terms
          </Link>
          <Link href="/disclaimer" className="hover:text-slate-900">
            Disclaimer
          </Link>
          <Link href="/editorial-policy" className="hover:text-slate-900">
            Editorial Policy
          </Link>
          <Link href="/safety-policy" className="hover:text-slate-900">
            Safety Policy
          </Link>
          <Link href="/contact" className="hover:text-slate-900">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
