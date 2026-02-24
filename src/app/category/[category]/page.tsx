import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { buildMetadata } from "@/lib/seo";
import { getAllCategories, getPostsByCategory } from "@/lib/content";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category: encodeURIComponent(category) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  return buildMetadata({
    title: `${decoded} Articles`,
    description: `Browse ${decoded} resources and educational articles.`,
    path: `/category/${encodeURIComponent(decoded)}`
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const posts = getPostsByCategory(decoded);
  if (posts.length === 0) notFound();

  return (
    <section className="space-y-8">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Category archive</p>
        <h1 className="mt-2 font-[family-name:var(--font-serif)] text-4xl font-black text-slate-900 md:text-5xl">{decoded}</h1>
        <p className="mt-3 text-slate-600">{posts.length} articles in this topic.</p>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
