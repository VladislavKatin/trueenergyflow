export type PublicComment = {
  id: string;
  slug: string;
  content: string;
  user_name: string;
  created_at: string;
};

const linkPattern =
  /(https?:\/\/|www\.|[a-z0-9-]+\.(com|net|org|io|co|dev|app|info|biz|us|uk|ca|au|de|fr|ua|ru)\b)/i;

export function hasForbiddenLink(value: string): boolean {
  return linkPattern.test(value);
}

export function sanitizeCommentInput(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}
