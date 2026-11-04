import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keeps the URLs the old site already had in Google (/work/, /about/, /services/).
  trailingSlash: true,
  images: {
    // Images are served as the already-optimised WebP files in src/assets. Vercel's image optimizer
    // (/_next/image) is metered per account and was returning 402 Payment Required, which broke
    // every image on the live site, so it stays off. Turn it back on only if the plan allows it.
    unoptimized: true,
  },
  async headers() {
    return [
      // The old site installed a service worker; /sw.js now removes it from returning visitors' browsers.
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }] },
    ];
  },
};

export default nextConfig;
