import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { getStaticPageBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { renderMdx } from "@/lib/mdx";

export function generateMetadata(): Metadata {
  const page = getStaticPageBySlug("contact");
  if (!page) return {};
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: "/contact",
    canonical: page.canonical,
    ogImage: page.ogImage
  });
}

export default async function ContactRoute() {
  const page = getStaticPageBySlug("contact");
  if (!page) notFound();

  const { content } = await renderMdx(page.content);
  const heroImage = page.ogImage || "/images/posts/remote-energy-healing-how-distance-sessions-work-1.webp";

  return (
    <section className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-12">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">True Energy Flow</p>
      <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl font-black text-slate-900 md:text-5xl">
        {page.title}
      </h1>
      <p className="mt-4 text-lg text-slate-600">{page.description}</p>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        <Image src={heroImage} alt={page.title} width={1600} height={900} className="h-full w-full object-cover" />
      </div>
      <article className="prose mt-8 max-w-none">{content}</article>
      <ContactForm />
    </section>
  );
}
