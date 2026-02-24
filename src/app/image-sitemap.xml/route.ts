import { siteConfig, toAbsoluteUrl } from "@/config/siteConfig";
import { getAllPosts, getAllServices, getStaticPageBySlug } from "@/lib/content";

function xmlEscape(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

export function GET() {
  const staticPageSlugs = ["about", "contact", "privacy-policy", "terms", "disclaimer"];
  const staticPages = staticPageSlugs
    .map((slug) => getStaticPageBySlug(slug))
    .filter((page): page is NonNullable<ReturnType<typeof getStaticPageBySlug>> => Boolean(page))
    .map((page) => ({
      loc: toAbsoluteUrl(`/${page.slug}`),
      image: toAbsoluteUrl(page.ogImage || siteConfig.defaultOgImage),
      title: page.title
    }));

  const posts = getAllPosts().map((post) => ({
    loc: toAbsoluteUrl(`/blog/${post.slug}`),
    image: toAbsoluteUrl(post.ogImage || siteConfig.defaultOgImage),
    title: post.title
  }));

  const services = getAllServices().map((service) => ({
    loc: toAbsoluteUrl(`/services/${service.slug}`),
    image: toAbsoluteUrl(service.ogImage || siteConfig.defaultOgImage),
    title: service.title
  }));

  const homepage = {
    loc: siteConfig.siteUrl,
    image: toAbsoluteUrl(siteConfig.defaultOgImage),
    title: siteConfig.siteName
  };

  const entries = [homepage, ...staticPages, ...posts, ...services]
    .map(
      (item) => `<url>
  <loc>${xmlEscape(item.loc)}</loc>
  <image:image>
    <image:loc>${xmlEscape(item.image)}</image:loc>
    <image:title>${xmlEscape(item.title)}</image:title>
  </image:image>
</url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
