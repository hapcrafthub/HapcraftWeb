import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keeps the URLs the old site already had in Google (/work/, /about/, /services/).
  trailingSlash: true,
  images: {
    // Images are resized at build time into public/_img by scripts/make-responsive-images.mjs and
    // looked up by this loader. Vercel's own optimizer (/_next/image) is metered per account and was
    // returning 402 Payment Required once the allowance ran out, which broke every image on the site.
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    // Keep in sync with WIDTHS in src/lib/imageLoader.ts and scripts/make-responsive-images.mjs.
    deviceSizes: [480, 768, 1200, 1600, 2400],
    imageSizes: [256, 384],
  },
  async headers() {
    return [
      // The old site installed a service worker; /sw.js now removes it from returning visitors' browsers.
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }] },
      // The resized images carry their content hash in the URL, so they can be cached for a year.
      { source: "/_img/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default nextConfig;
