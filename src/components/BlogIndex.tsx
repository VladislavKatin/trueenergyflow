import Link from "next/link";
import Image from "next/image";
import { PostCard } from "@/components/PostCard";
import type { PostListItem } from "@/lib/types";

type BlogIndexProps = {
  totalPosts: number;
  posts: PostListItem[];
  currentPage: number;
  totalPages: number;
};

function pageHref(page: number): string {
  return page === 1 ? "/blog" : `/blog/page/${page}`;
}

export function BlogIndex({ totalPosts, posts, currentPage, totalPages }: BlogIndexProps) {
  return (
    <section className="space-y-10">
      <header className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-amber-50 via-white to-sky-50 p-6 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Editorial Journal</p>
          <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl font-black leading-tight text-slate-900 md:text-6xl">
            U.S. Spiritual Wellness Blog
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Long-form articles on energy healing, remote sessions, intuitive guidance, craniosacral support, and
            spiritual coaching for U.S. readers.
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-500">{totalPosts} published articles</p>
        </div>
      </header>

      <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1.2fr_1fr] md:p-8">
        <div>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl font-black text-slate-900">How to use this blog</h2>
          <p className="mt-3 text-slate-600">
            Browse by page, open articles, and follow internal links to matching services. This content is spiritual and
            educational in scope and not medical advice.
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
            <li>
              <Link className="underline hover:text-slate-900" href="/services/energy-healing">
                New to sessions: start with Energy Healing
              </Link>
            </li>
            <li>
              <Link className="underline hover:text-slate-900" href="/services/remote-healing">
                Planning remote work: review Remote Healing
              </Link>
            </li>
            <li>
              <Link className="underline hover:text-slate-900" href="/blog/what-to-expect-in-an-energy-healing-session">
                Read what to expect in an energy healing session
              </Link>
            </li>
            <li>
              <Link className="underline hover:text-slate-900" href="/blog/intuitive-reading-vs-psychic-reading">
                Compare intuitive reading vs psychic reading
              </Link>
            </li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <Image
            src="/images/posts/intuitive-reading-vs-psychic-reading-2.webp"
            alt="Spiritual wellness blog guidance"
            width={1600}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="flex flex-wrap items-center gap-2" aria-label="Blog pagination">
          {currentPage > 1 && (
            <Link
              href={pageHref(currentPage - 1)}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Prev
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <Link
              key={page}
              href={pageHref(page)}
              className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                page === currentPage
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {page}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link
              href={pageHref(currentPage + 1)}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Next
            </Link>
          )}
        </nav>
      )}
    </section>
  );
}
