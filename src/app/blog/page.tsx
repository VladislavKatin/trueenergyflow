import { BlogSearch } from "@/components/BlogSearch";
import { buildMetadata } from "@/lib/seo";
import { getAllCategories, getAllPosts } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Read practical articles on energy healing, remote sessions, intuitive guidance, craniosacral therapy, and spiritual coaching.",
  path: "/blog"
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <section className="space-y-8">
      <header>
        <h1 className="font-[family-name:var(--font-serif)] text-4xl font-semibold text-slate-900">Blog</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Practical guidance for spiritual wellness. Search by topic or filter by category.
        </p>
      </header>
      <BlogSearch posts={posts} categories={categories} />
    </section>
  );
}
