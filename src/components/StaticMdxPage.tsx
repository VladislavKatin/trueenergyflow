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
    <section className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">True Energy Flow</p>
      <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl font-black text-slate-900 md:text-5xl">{page.title}</h1>
      <p className="mt-4 text-lg text-slate-600">{page.description}</p>
      <article className="prose mt-8 max-w-none">{content}</article>
    </section>
  );
}
