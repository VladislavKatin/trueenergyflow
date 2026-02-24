import { siteConfig } from "@/config/siteConfig";
import { getAllPosts } from "@/lib/content";

export function GET() {
  const posts = getAllPosts();
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.siteName}</title>
    <link>${siteConfig.siteUrl}</link>
    <description>${siteConfig.description}</description>
    ${posts
      .map(
        (post) => `<item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteConfig.siteUrl}/blog/${post.slug}</link>
      <guid>${siteConfig.siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
    </item>`
      )
      .join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}

