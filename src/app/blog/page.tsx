import { BlogIndex } from "@/components/BlogIndex";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/content";
import { getBlogPageSlice, getTotalBlogPages } from "@/lib/blogPagination";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Read practical articles on energy healing, remote sessions, intuitive guidance, craniosacral therapy, and spiritual coaching.",
  path: "/blog"
});

export default function BlogPage() {
  const allPosts = getAllPosts();
  const totalPages = getTotalBlogPages(allPosts.length);
  const posts = getBlogPageSlice(allPosts, 1).map((post) => ({
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

  return <BlogIndex totalPosts={allPosts.length} posts={posts} currentPage={1} totalPages={totalPages} />;
}
