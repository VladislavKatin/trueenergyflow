import { BlogSearch } from "@/components/BlogSearch";
import { buildMetadata } from "@/lib/seo";
import { getAllCategories, getAllPosts } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Blog Search",
  description: "Search blog articles by title or tags.",
  path: "/blog/search"
});

export default function BlogSearchPage() {
  const categories = getAllCategories();
  const posts = getAllPosts().map((post) => ({
    title: post.title,
    description: post.description,
    date: post.date,
    category: post.category,
    tags: post.tags,
    slug: post.slug,
    canonical: post.canonical,
    ogImage: post.ogImage,
    readingMinutes: post.readingMinutes
  }));

  return (
    <section className="space-y-8">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Blog Search</p>
        <h1 className="mt-2 font-[family-name:var(--font-serif)] text-4xl font-black text-slate-900 md:text-5xl">
          Find Articles Fast
        </h1>
        <p className="mt-3 text-slate-600">Search by keyword, tags, or filter by category.</p>
      </header>
      <BlogSearch posts={posts} categories={categories} />
    </section>
  );
}
