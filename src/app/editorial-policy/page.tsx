import type { Metadata } from "next";
import { StaticMdxPage } from "@/components/StaticMdxPage";
import { getStaticPageBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const page = getStaticPageBySlug("editorial-policy");
  if (!page) return {};
  return buildMetadata({ title: page.title, description: page.description, path: "/editorial-policy", canonical: page.canonical, ogImage: page.ogImage });
}

export default function EditorialPolicyRoute() {
  return <StaticMdxPage slug="editorial-policy" />;
}
