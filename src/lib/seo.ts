import type { Metadata } from "next";
import { siteConfig, toAbsoluteUrl } from "@/config/siteConfig";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
};

export function buildMetadata(input: MetadataInput): Metadata {
  const canonical = input.canonical ?? toAbsoluteUrl(input.path);
  const image = toAbsoluteUrl(input.ogImage ?? siteConfig.defaultOgImage);
  const ogType = input.ogType ?? "website";

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical },
    robots: input.noIndex
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true
          }
        }
      : undefined,
    openGraph: {
      type: ogType,
      locale: siteConfig.locale,
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: siteConfig.siteName,
      images: [{ url: image, width: 1200, height: 630, alt: input.title }]
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image]
    }
  };
}
