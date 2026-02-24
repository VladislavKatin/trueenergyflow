export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  slug: string;
  canonical?: string;
  ogImage?: string;
};

export type ServiceFrontmatter = {
  title: string;
  description: string;
  slug: string;
  canonical?: string;
  ogImage?: string;
  summary?: string;
};

export type StaticPageFrontmatter = {
  title: string;
  description: string;
  slug: string;
  canonical?: string;
  ogImage?: string;
};

export type ContentItem<T> = T & {
  content: string;
  readingMinutes?: number;
};

