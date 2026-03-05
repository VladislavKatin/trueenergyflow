import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const host = new URL(siteConfig.siteUrl).host;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"]
      }
    ],
    host,
    sitemap: [`${siteConfig.siteUrl}/sitemap.xml`, `${siteConfig.siteUrl}/image-sitemap.xml`]
  };
}
