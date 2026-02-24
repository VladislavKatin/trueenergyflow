import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";
import { getAllCategories, getAllPosts, getAllServices, getAllTags } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/services", "/blog", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer"].map(
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

  const categoryPages = getAllCategories().map((category) => ({
    url: `${siteConfig.siteUrl}/category/${encodeURIComponent(category)}`,
    changeFrequency: "weekly" as const,
    priority: 0.6
  }));

  const tagPages = getAllTags().map((tag) => ({
    url: `${siteConfig.siteUrl}/tag/${encodeURIComponent(tag)}`,
    changeFrequency: "weekly" as const,
    priority: 0.5
  }));

  const feeds = [
    {
      url: `${siteConfig.siteUrl}/rss.xml`,
      changeFrequency: "daily" as const,
      priority: 0.7
    },
    {
      url: `${siteConfig.siteUrl}/image-sitemap.xml`,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }
  ];

  return [...staticPages, ...postPages, ...servicePages, ...categoryPages, ...tagPages, ...feeds];
}
