"use client";

import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { trackEvent } from "@/lib/analytics";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="inline-flex min-w-0 max-w-[72%] items-center gap-2 text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
          <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-white">
            US
          </span>
          <span className="truncate">True Energy Flow</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-slate-700 hover:text-slate-900">
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.bookingUrl}
            onClick={() => trackEvent("book_session_click", { location: "header_desktop" })}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Book a session
          </Link>
        </nav>
        <Link
          href={siteConfig.bookingUrl}
          onClick={() => trackEvent("book_session_click", { location: "header_mobile" })}
          className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 md:hidden"
        >
          Book
        </Link>
      </div>
      <div className="mx-auto flex w-full max-w-7xl items-center gap-5 overflow-x-auto px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 md:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
