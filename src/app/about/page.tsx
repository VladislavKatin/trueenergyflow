import type { Metadata } from "next";
import { StaticMdxPage } from "@/components/StaticMdxPage";
import { getStaticPageBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const page = getStaticPageBySlug("about");
  if (!page) return {};
  return buildMetadata({ title: page.title, description: page.description, path: "/about", canonical: page.canonical, ogImage: page.ogImage });
}

export default function AboutRoute() {
  return <StaticMdxPage slug="about" />;
}
