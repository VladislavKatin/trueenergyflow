import { notFound } from "next/navigation";
import { renderMdx } from "@/lib/mdx";
import { getStaticPageBySlug } from "@/lib/content";

type StaticMdxPageProps = {
  slug: string;
};

export async function StaticMdxPage({ slug }: StaticMdxPageProps) {
  const page = getStaticPageBySlug(slug);
  if (!page) notFound();

  const { content } = await renderMdx(page.content);

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="font-[family-name:var(--font-serif)] text-4xl font-semibold text-slate-900">{page.title}</h1>
      <p className="mt-4 text-lg text-slate-600">{page.description}</p>
      <article className="prose mt-8 max-w-none">{content}</article>
    </section>
  );
}

