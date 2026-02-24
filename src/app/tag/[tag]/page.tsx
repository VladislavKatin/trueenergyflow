import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { buildMetadata } from "@/lib/seo";
import { getAllTags, getPostsByTag } from "@/lib/content";

type Props = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return buildMetadata({
    title: `Tag: ${decoded}`,
    description: `Articles related to ${decoded}.`,
    path: `/tag/${encodeURIComponent(decoded)}`
  });
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  if (posts.length === 0) notFound();

  return (
    <section>
      <h1 className="font-[family-name:var(--font-serif)] text-4xl font-semibold text-slate-900">#{decoded}</h1>
      <p className="mt-3 text-slate-600">Tag archive with {posts.length} articles.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

