import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { getAllServices, getServiceBySlug } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { siteConfig, toAbsoluteUrl } from "@/config/siteConfig";

type Props = {
  params: Promise<{ service: string }>;
};

export function generateStaticParams() {
  return getAllServices().map((service) => ({ service: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const item = getServiceBySlug(service);
  if (!item) return {};

  return buildMetadata({
    title: item.title,
    description: item.description,
    path: `/services/${item.slug}`,
    canonical: item.canonical,
    ogImage: item.ogImage
  });
}

export default async function ServicePage({ params }: Props) {
  const { service } = await params;
  const item = getServiceBySlug(service);
  if (!item) notFound();

  const { content } = await renderMdx(item.content);
  const serviceUrl = toAbsoluteUrl(`/services/${item.slug}`);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: toAbsoluteUrl("/services/energy-healing") },
      { "@type": "ListItem", position: 3, name: item.title, item: serviceUrl }
    ]
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: item.title,
        serviceType: item.title,
        provider: { "@type": "Organization", name: siteConfig.siteName },
        areaServed: { "@type": "Country", name: "United States" },
        url: serviceUrl,
        description: item.description
      },
      {
        "@type": "LocalBusiness",
        name: siteConfig.siteName,
        url: siteConfig.siteUrl,
        areaServed: "US",
        description: "Spiritual and educational wellness support services."
      }
    ]
  };

  return (
    <section className="mx-auto max-w-4xl">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={serviceLd} />

      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-700">
          Home
        </Link>{" "}
        /{" "}
        <span>Services</span> / {item.title}
      </nav>

      <h1 className="font-[family-name:var(--font-serif)] text-4xl font-semibold text-slate-900">{item.title}</h1>
      <p className="mt-4 text-lg text-slate-600">{item.description}</p>
      <article className="prose mt-8 max-w-none">{content}</article>
    </section>
  );
}

