import Link from "next/link";
import Image from "next/image";
import type { ContentItem, PostFrontmatter } from "@/lib/types";

type PostCardProps = {
  post: ContentItem<PostFrontmatter>;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <Image
          src={post.ogImage || "/og.png"}
          alt={post.title}
          width={1600}
          height={900}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{post.category}</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-900">
          <Link href={`/blog/${post.slug}`} className="hover:text-sky-700">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{post.description}</p>
        <p className="mt-3 text-xs text-slate-500">
          {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} ·{" "}
          {post.readingMinutes} min read
        </p>
      </div>
      <div className="border-t border-slate-100 px-6 py-4">
        <div className="flex flex-wrap gap-2">
        {post.tags.slice(0, 3).map((tag) => (
          <Link
            key={tag}
            href={`/tag/${encodeURIComponent(tag)}`}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200"
          >
            #{tag}
          </Link>
        ))}
        </div>
      </div>
    </article>
  );
}
