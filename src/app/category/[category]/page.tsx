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
    <section>
      <h1 className="font-[family-name:var(--font-serif)] text-4xl font-semibold text-slate-900">{decoded}</h1>
      <p className="mt-3 text-slate-600">Category archive with {posts.length} articles.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

