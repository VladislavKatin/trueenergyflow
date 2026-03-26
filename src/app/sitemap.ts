import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";
import { getAllCategories, getAllPosts, getAllServices } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/services", "/blog", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer", "/editorial-policy", "/safety-policy"].map(
    (path) => ({
      url: `${siteConfig.siteUrl}${path}`,
      lastModified: new Date(),
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
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  const categoryPages = getAllCategories().map((category) => ({
    url: `${siteConfig.siteUrl}/category/${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6
  }));

  return [...staticPages, ...postPages, ...servicePages, ...categoryPages];
}
