export const siteConfig = {
  siteName: "True Energy Flow",
  siteUrl: "https://trueenergyflow.com",
  bookingUrl: "/contact",
  defaultOgImage: "/images/posts/what-to-expect-in-an-energy-healing-session-1.png",
  description:
    "True Energy Flow offers energy healing, remote sessions, intuitive guidance, craniosacral therapy insights, and spiritual coaching resources.",
  locale: "en_US"
};

export function toAbsoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
