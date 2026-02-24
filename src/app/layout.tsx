import type { Metadata } from "next";
import { Nunito, Lora } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/config/siteConfig";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans"
});

const lora = Lora({
  subsets: ["latin"],
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
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${lora.variable} antialiased`}>
        <div className="min-h-screen font-[family-name:var(--font-sans)]">
          <Header />
          <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
