import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";
import { getAllPosts, getAllServices } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/blog", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer"].map(
    (path) => ({
      url: `${siteConfig.siteUrl}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8
    })
  );

  const postPages = getAllPosts().map((post) => ({
    url: `${siteConfig.siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.75
  }));

  const servicePages = getAllServices().map((service) => ({
    url: `${siteConfig.siteUrl}/services/${service.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  return [...staticPages, ...postPages, ...servicePages];
}

