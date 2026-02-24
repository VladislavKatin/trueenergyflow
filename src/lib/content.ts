import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  ContentItem,
  PostFrontmatter,
  ServiceFrontmatter,
  StaticPageFrontmatter
} from "@/lib/types";

const contentDir = path.join(process.cwd(), "content");
const postsDir = path.join(contentDir, "posts");
const servicesDir = path.join(contentDir, "services");
const pagesDir = path.join(contentDir, "pages");

function readMdxFiles(directory: string): string[] {
  return fs.readdirSync(directory).filter((file) => file.endsWith(".mdx"));
}

export function generateSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function estimateReadingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function getAllPosts(): ContentItem<PostFrontmatter>[] {
  const files = readMdxFiles(postsDir);

  return files
    .map((file) => {
      const source = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data, content } = matter(source);
      const frontmatter = data as PostFrontmatter;

      return {
        ...frontmatter,
        slug: frontmatter.slug || generateSlug(frontmatter.title),
        content,
        readingMinutes: estimateReadingMinutes(content)
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): ContentItem<PostFrontmatter> | null {
  const post = getAllPosts().find((item) => item.slug === slug);
  return post ?? null;
}

export function getAllServices(): ContentItem<ServiceFrontmatter>[] {
  const files = readMdxFiles(servicesDir);

  return files.map((file) => {
    const source = fs.readFileSync(path.join(servicesDir, file), "utf8");
    const { data, content } = matter(source);
    const frontmatter = data as ServiceFrontmatter;

    return {
      ...frontmatter,
      slug: frontmatter.slug || generateSlug(frontmatter.title),
      content
    };
  });
}

export function getServiceBySlug(slug: string): ContentItem<ServiceFrontmatter> | null {
  const service = getAllServices().find((item) => item.slug === slug);
  return service ?? null;
}

export function getStaticPageBySlug(slug: string): ContentItem<StaticPageFrontmatter> | null {
  const sourcePath = path.join(pagesDir, `${slug}.mdx`);
  if (!fs.existsSync(sourcePath)) {
    return null;
  }

  const source = fs.readFileSync(sourcePath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = data as StaticPageFrontmatter;

  return {
    ...frontmatter,
    slug: frontmatter.slug || slug,
    content
  };
}

export function getAllCategories(): string[] {
  return [...new Set(getAllPosts().map((post) => post.category))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export function getAllTags(): string[] {
  return [...new Set(getAllPosts().flatMap((post) => post.tags))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export function getPostsByCategory(category: string): ContentItem<PostFrontmatter>[] {
  const normalized = decodeURIComponent(category).toLowerCase();
  return getAllPosts().filter((post) => post.category.toLowerCase() === normalized);
}

export function getPostsByTag(tag: string): ContentItem<PostFrontmatter>[] {
  const normalized = decodeURIComponent(tag).toLowerCase();
  return getAllPosts().filter((post) =>
    post.tags.some((item) => item.toLowerCase() === normalized)
  );
}

export function getRelatedPosts(post: ContentItem<PostFrontmatter>): ContentItem<PostFrontmatter>[] {
  return getAllPosts()
    .filter((item) => item.slug !== post.slug)
    .map((item) => {
      const sameTags = item.tags.filter((tag) => post.tags.includes(tag)).length;
      const sameCategory = item.category === post.category ? 1 : 0;
      return { item, score: sameTags * 2 + sameCategory };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => entry.item);
}

export function extractTocFromMarkdown(markdown: string): { id: string; text: string; level: number }[] {
  const lines = markdown.split("\n");
  return lines
    .map((line) => {
      const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
      if (!match) {
        return null;
      }
      const text = match[2].replace(/\[(.*?)\]\(.*?\)/g, "$1").trim();
      return {
        id: generateSlug(text),
        text,
        level: match[1].length
      };
    })
    .filter((item): item is { id: string; text: string; level: number } => Boolean(item));
}

