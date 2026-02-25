import Link from "next/link";
import Image from "next/image";
import { BlogSearch } from "@/components/BlogSearch";
import { buildMetadata } from "@/lib/seo";
import { getAllCategories, getAllPosts } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Read practical articles on energy healing, remote sessions, intuitive guidance, craniosacral therapy, and spiritual coaching.",
  path: "/blog"
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <section className="space-y-10">
      <header className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-amber-50 via-white to-sky-50 p-6 md:p-12">
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

      <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1.2fr_1fr] md:p-8">
        <div>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl font-black text-slate-900">How to use this blog</h2>
          <p className="mt-3 text-slate-600">
            This library is built for readers in the United States who want clear expectations before booking a session.
            Filter by category, search by tag, and follow internal links to matching service pages.
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
          <p className="mt-4 text-sm text-slate-500">
            Content is spiritual and educational in scope. It is not medical advice. See{" "}
            <Link href="/disclaimer" className="underline">
              disclaimer
            </Link>
            .
          </p>
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

      <BlogSearch posts={posts} categories={categories} />
    </section>
  );
}
