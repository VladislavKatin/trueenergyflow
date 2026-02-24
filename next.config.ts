import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.trueenergyflow.com" }],
        destination: "https://trueenergyflow.com/:path*",
        permanent: true
      }
    ];
  }
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
