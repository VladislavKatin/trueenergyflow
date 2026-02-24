import Link from "next/link";
import type { ContentItem, PostFrontmatter } from "@/lib/types";

type PostCardProps = {
  post: ContentItem<PostFrontmatter>;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{post.category}</p>
      <h3 className="mt-2 text-xl font-semibold text-slate-900">
        <Link href={`/blog/${post.slug}`} className="hover:text-sky-700">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{post.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
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
    </article>
  );
}

