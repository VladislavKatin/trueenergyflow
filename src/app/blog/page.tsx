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

const FEATURED_SLUGS = [
  "what-to-expect-in-an-energy-healing-session",
  "energy-healing-vs-reiki",
  "remote-energy-healing-how-distance-sessions-work",
  "intuitive-reading-vs-psychic-reading",
  "craniosacral-therapy-what-it-is-and-what-to-expect",
  "spiritual-coaching-how-sessions-are-structured"
] as const;

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

  const featuredPosts = FEATURED_SLUGS.map((slug) => allPosts.find((post) => post.slug === slug))
    .filter((post): post is NonNullable<(typeof allPosts)[number]> => Boolean(post))
    .map((post) => ({
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
    <BlogIndex
      totalPosts={allPosts.length}
      posts={posts}
      currentPage={1}
      totalPages={totalPages}
      featuredPosts={featuredPosts}
    />
  );
}
