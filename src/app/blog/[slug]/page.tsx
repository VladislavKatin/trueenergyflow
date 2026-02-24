import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";
import { buildMetadata } from "@/lib/seo";
import { extractTocFromMarkdown, getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { siteConfig, toAbsoluteUrl } from "@/config/siteConfig";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    canonical: post.canonical,
    ogImage: post.ogImage
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await renderMdx(post.content);
  const toc = extractTocFromMarkdown(post.content);
  const related = getRelatedPosts(post);
  const postUrl = toAbsoluteUrl(`/blog/${post.slug}`);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: toAbsoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl }
    ]
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: postUrl,
    author: {
      "@type": "Organization",
      name: siteConfig.siteName
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      logo: {
        "@type": "ImageObject",
        url: toAbsoluteUrl(siteConfig.defaultOgImage)
      }
    },
    image: [toAbsoluteUrl(post.ogImage ?? siteConfig.defaultOgImage)]
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
      <article>
        <JsonLd data={articleLd} />
        <JsonLd data={breadcrumbLd} />

        <nav className="mb-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/blog" className="hover:text-slate-700">
            Blog
          </Link>{" "}
          / {post.title}
        </nav>

        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">{post.category}</p>
        <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl font-semibold text-slate-900">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{post.description}</p>
        <p className="mt-4 text-sm text-slate-500">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}{" "}
          · {post.readingMinutes} min read
        </p>

        <article className="prose mt-8 max-w-none">{content}</article>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-slate-600">Share:</span>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700"
          >
            X
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700"
          >
            Facebook
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700"
          >
            LinkedIn
          </a>
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-slate-900">
              Related posts
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((relatedPost) => (
                <PostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </article>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Table of contents</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {toc.map((item) => (
            <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
              <a href={`#${item.id}`} className="text-slate-600 hover:text-sky-700">
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

