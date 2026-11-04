import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keeps the URLs the old site already had in Google (/work/, /about/, /services/).
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 31,
    // Every source image is at most 2400 px wide, so there is no point generating 2048/3840 px variants.
    deviceSizes: [480, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [96, 140, 256, 384],
  },
  async headers() {
    return [
      // The old site installed a service worker; /sw.js now removes it from returning visitors' browsers.
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }] },
    ];
  },
};

export default nextConfig;
