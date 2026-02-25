import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogIndex } from "@/components/BlogIndex";
import { getAllPosts } from "@/lib/content";
import { getBlogPageSlice, getTotalBlogPages } from "@/lib/blogPagination";
import { buildMetadata } from "@/lib/seo";

type Params = {
  page: string;
};

function toPostListItem(post: ReturnType<typeof getAllPosts>[number]) {
  return {
    title: post.title,
    description: post.description,
    date: post.date,
    category: post.category,
    tags: post.tags,
    slug: post.slug,
    canonical: post.canonical,
    ogImage: post.ogImage,
    readingMinutes: post.readingMinutes
  };
}

export function generateStaticParams() {
  const totalPages = getTotalBlogPages(getAllPosts().length);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    page: String(index + 2)
  }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number(page);
  if (!Number.isInteger(pageNumber) || pageNumber < 2) return {};

  return buildMetadata({
    title: `Blog - Page ${pageNumber}`,
    description: `Browse blog page ${pageNumber} with practical articles on energy healing, remote sessions, and spiritual guidance.`,
    path: `/blog/page/${pageNumber}`
  });
}

export default async function BlogPaginationPage({ params }: { params: Promise<Params> }) {
  const { page } = await params;
  const pageNumber = Number(page);
  if (!Number.isInteger(pageNumber) || pageNumber < 1) notFound();
  if (pageNumber === 1) redirect("/blog");

  const allPosts = getAllPosts();
  const totalPages = getTotalBlogPages(allPosts.length);
  if (pageNumber > totalPages) notFound();

  const posts = getBlogPageSlice(allPosts, pageNumber).map(toPostListItem);

  return <BlogIndex totalPosts={allPosts.length} posts={posts} currentPage={pageNumber} totalPages={totalPages} />;
}
