import type { Metadata } from "next";
import { Manrope, Merriweather } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/siteConfig";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans"
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.siteName} | Energy Healing and Spiritual Guidance`,
    template: `%s | ${siteConfig.siteName}`
  },
  description: siteConfig.description,
  alternates: { canonical: siteConfig.siteUrl },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.siteName,
    title: siteConfig.siteName,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    images: [{ url: siteConfig.defaultOgImage, width: 1200, height: 630, alt: siteConfig.siteName }]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description: siteConfig.description,
    images: [siteConfig.defaultOgImage]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const organizationLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.siteName,
        url: siteConfig.siteUrl,
        logo: `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`,
        description: siteConfig.description,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "hello@trueenergyflow.com",
            areaServed: "US",
            availableLanguage: "en"
          }
        ]
      },
      {
        "@type": "WebSite",
        name: siteConfig.siteName,
        url: siteConfig.siteUrl
      }
    ]
  };

  return (
    <html lang="en">
      <body className={`${manrope.variable} ${merriweather.variable} antialiased`}>
        <JsonLd data={organizationLd} />
        <div className="min-h-screen font-[family-name:var(--font-sans)]">
          <Header />
          <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
