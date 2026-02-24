import type { Metadata } from "next";
import { StaticMdxPage } from "@/components/StaticMdxPage";
import { getStaticPageBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const page = getStaticPageBySlug("terms");
  if (!page) return {};
  return buildMetadata({ title: page.title, description: page.description, path: "/terms", canonical: page.canonical, ogImage: page.ogImage });
}

export default function TermsRoute() {
  return <StaticMdxPage slug="terms" />;
}
