import type { Metadata } from "next";
import { StaticMdxPage } from "@/components/StaticMdxPage";
import { getStaticPageBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const page = getStaticPageBySlug("disclaimer");
  if (!page) return {};
  return buildMetadata({ title: page.title, description: page.description, path: "/disclaimer", canonical: page.canonical, ogImage: page.ogImage });
}

export default function DisclaimerRoute() {
  return <StaticMdxPage slug="disclaimer" />;
}
