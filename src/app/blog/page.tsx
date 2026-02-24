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
    <section className="space-y-10">
      <header className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-amber-50 via-white to-sky-50 p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Editorial Journal</p>
          <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl font-black leading-tight text-slate-900 md:text-6xl">
            U.S. Spiritual Wellness Blog
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Long-form articles on energy healing, remote sessions, intuitive guidance, craniosacral support, and spiritual coaching for U.S. readers.
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-500">{posts.length} published articles</p>
        </div>
      </header>
      <BlogSearch posts={posts} categories={categories} />
    </section>
  );
}
