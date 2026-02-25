"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ParticleSupportBanner = dynamic(
  () => import("@/components/ParticleSupportBanner").then((mod) => mod.ParticleSupportBanner),
  { ssr: false }
);

export function SupportBanner() {
  const [showAnimated, setShowAnimated] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setShowAnimated(desktopQuery.matches && !reducedMotion.matches);
    update();

    desktopQuery.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);

    return () => {
      desktopQuery.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  if (!showAnimated) {
    return (
      <section className="rounded-[2rem] border border-amber-200/60 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-4 shadow-sm md:p-6">
        <p className="rounded-2xl border border-amber-200/70 bg-white/70 px-4 py-8 text-center text-xl font-semibold text-slate-900 md:py-10 md:text-2xl">
          You are supported. You can begin again.
        </p>
      </section>
    );
  }

  return <ParticleSupportBanner />;
}
