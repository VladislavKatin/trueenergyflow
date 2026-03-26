import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { editorialTeam } from "@/config/editorial";
import { serviceEditorialContent } from "@/config/serviceEditorial";
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
  const serviceImages: Record<string, string> = {
    "energy-healing": "/images/posts/what-to-expect-in-an-energy-healing-session-1.webp",
    "remote-healing": "/images/posts/remote-energy-healing-how-distance-sessions-work-1.webp",
    "intuitive-readings": "/images/posts/intuitive-reading-vs-psychic-reading-1.webp",
    "craniosacral-therapy": "/images/posts/craniosacral-therapy-what-it-is-and-what-to-expect-1.webp",
    "spiritual-coaching": "/images/posts/spiritual-coaching-how-sessions-are-structured-1.webp",
    "medium-for-hire-parties-and-events": "/images/posts/san-diego-medium-psychic-safe-grounded-session-1.webp",
    "custom-affirmation-art-pieces": "/images/posts/weekly-spiritual-coaching-planner-1.webp",
    "craniosacral-therapy-45-minutes": "/images/posts/craniosacral-therapy-full-session-experience-1.webp",
    "intuitive-reading-via-text-for-busy-witches": "/images/posts/intuitive-reading-for-career-decisions-1.webp"
  };
  const heroImage = serviceImages[item.slug] ?? "/images/posts/what-to-expect-in-an-energy-healing-session-1.webp";
  const serviceExtras = serviceEditorialContent[item.slug as keyof typeof serviceEditorialContent];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: toAbsoluteUrl("/services") },
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
    <section className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-12">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={serviceLd} />

      <nav className="mb-6 break-words text-sm leading-relaxed text-slate-500">
        <Link href="/" className="hover:text-slate-700">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/services" className="hover:text-slate-700">
          Services
        </Link>{" "}
        / {item.title}
      </nav>

      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Service page</p>
          <h1 className="mt-2 font-[family-name:var(--font-serif)] text-4xl font-black text-slate-900 md:text-5xl">{item.title}</h1>
          <p className="mt-4 text-lg text-slate-600">{item.description}</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <Image
            src={heroImage}
            alt={`${item.title} service`}
            width={1600}
            height={900}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-900">Service reviewed under the True Energy Flow editorial and safety standards</p>
        <p className="mt-2 text-sm text-slate-600">{editorialTeam.defaultAuthor.bio}</p>
        <p className="mt-3 text-sm text-slate-700">
          This page is written for educational clarity, grounded expectations, and responsible non-medical framing.
        </p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
          <Link href="/editorial-policy" className="text-sky-700 hover:text-sky-800">
            Editorial Policy
          </Link>
          <Link href="/safety-policy" className="text-sky-700 hover:text-sky-800">
            Safety Policy
          </Link>
        </div>
      </div>

      <article className="prose mt-8 max-w-none">{content}</article>

      {serviceExtras?.featuredReadings?.length ? (
        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-slate-900">Start With These Guides</h2>
          <p className="mt-3 text-sm text-slate-600">
            These articles support this service page with clearer expectations, comparison points, and safe next steps.
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {serviceExtras.featuredReadings.map((reading) => (
              <li key={reading.href}>
                <Link href={reading.href} className="font-medium text-sky-700 hover:text-sky-800">
                  {reading.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {serviceExtras?.references?.length ? (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-slate-900">References</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {serviceExtras.references.map((reference) => (
              <li key={reference.url}>
                <a href={reference.url} target="_blank" rel="noopener noreferrer" className="font-medium text-sky-700 hover:text-sky-800">
                  {reference.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </section>
  );
}
