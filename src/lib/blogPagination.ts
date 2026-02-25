export const POSTS_PER_PAGE = 9;

export function getTotalBlogPages(totalPosts: number): number {
  return Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
}

export function getBlogPageSlice<T>(items: T[], page: number): T[] {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  return items.slice(start, start + POSTS_PER_PAGE);
}
