"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/PostCard";
import type { ContentItem, PostFrontmatter } from "@/lib/types";

type BlogSearchProps = {
  posts: ContentItem<PostFrontmatter>[];
  categories: string[];
};

export function BlogSearch({ posts, categories }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      if (!matchesCategory) return false;
      if (!normalized) return true;

      return (
        post.title.toLowerCase().includes(normalized) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalized))
      );
    });
  }, [activeCategory, posts, query]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 md:grid-cols-[2fr_1fr]">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title or tags..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none ring-slate-400 placeholder:text-slate-400 focus:ring-2"
        />
        <select
          value={activeCategory}
          onChange={(event) => setActiveCategory(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none ring-slate-400 focus:ring-2"
        >
          <option>All</option>
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-600">No posts match your search yet. Try a different keyword.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
