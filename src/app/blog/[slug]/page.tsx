import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { CommentsSectionLazy } from "@/components/CommentsSectionLazy";
import { PostCard } from "@/components/PostCard";
import { ShareButtons } from "@/components/ShareButtons";
import { editorialTeam } from "@/config/editorial";
import { buildMetadata } from "@/lib/seo";
import { extractFaqFromMarkdown, extractTocFromMarkdown, getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { siteConfig, toAbsoluteUrl } from "@/config/siteConfig";

type Props = { params: Promise<{ slug: string }> };
type SearchParams = { comments?: string };

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
    ogImage: post.ogImage,
    ogType: "article"
  });
}

export default async function BlogPostPage({
  params,
  searchParams
}: Props & { searchParams: Promise<SearchParams> }) {
  const { slug } = await params;
  const { comments } = await searchParams;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const commentsConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const showComments = comments === "1";

  const { content } = await renderMdx(post.content);
  const toc = extractTocFromMarkdown(post.content);
  const faqItems = extractFaqFromMarkdown(post.content);
  const related = getRelatedPosts(post);
  const postUrl = toAbsoluteUrl(`/blog/${post.slug}`);
  const authorName = post.authorName ?? editorialTeam.defaultAuthor.name;
  const reviewedBy = post.reviewedBy ?? editorialTeam.reviewer.name;

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
      "@type": "Person",
      name: authorName
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

  const faqLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer
            }
          }))
        }
      : null;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <JsonLd data={articleLd} />
        <JsonLd data={breadcrumbLd} />
        {faqLd && <JsonLd data={faqLd} />}

        <nav className="mb-6 break-words text-sm leading-relaxed text-slate-500">
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
        <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl font-semibold text-slate-900 md:text-5xl">
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

        <ShareButtons title={post.title} url={postUrl} />

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Written by {authorName}</p>
          <p className="mt-1 text-sm text-slate-600">{editorialTeam.defaultAuthor.bio}</p>
          <p className="mt-3 text-sm text-slate-700">
            Reviewed by {reviewedBy} for scope boundaries, clarity, and responsible non-medical framing.
          </p>
          <Link href={editorialTeam.defaultAuthor.profilePath} className="mt-3 inline-flex text-sm font-semibold text-sky-700 hover:text-sky-800">
            Learn more about the editorial team
          </Link>
        </div>

        <Image
          src={post.ogImage || siteConfig.defaultOgImage}
          alt={post.title}
          width={1600}
          height={900}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 960px"
          className="mt-6 h-auto w-full rounded-2xl object-cover"
          priority
        />

        <article className="prose mt-8 max-w-none">{content}</article>

        {post.references && post.references.length > 0 && (
          <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-slate-900">References</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {post.references.map((reference) => (
                <li key={reference.url}>
                  <a href={reference.url} target="_blank" rel="noopener noreferrer" className="font-medium text-sky-700 hover:text-sky-800">
                    {reference.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <ShareButtons title={post.title} url={postUrl} />

        {!commentsConfigured ? (
          <section id="comments" className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Comments</h2>
            <p className="mt-2 text-sm text-slate-600">Comments are temporarily unavailable.</p>
          </section>
        ) : showComments ? (
          <div id="comments">
            <CommentsSectionLazy slug={post.slug} startOpen />
          </div>
        ) : (
          <section id="comments" className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Comments</h2>
            <p className="mt-2 text-sm text-slate-600">
              Load comments and sign in with Google to participate.
            </p>
            <Link
              href={`/blog/${post.slug}?comments=1#comments`}
              prefetch={false}
              className="mt-4 inline-flex rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
            >
              Load comments
            </Link>
          </section>
        )}

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

      <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6 lg:block">
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
