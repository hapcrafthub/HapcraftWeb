// Custom loader for next/image: points at the pre-built copies in public/_img (see
// scripts/make-responsive-images.mjs) instead of Vercel's metered /_next/image endpoint.

// Must match WIDTHS in scripts/make-responsive-images.mjs (deviceSizes + imageSizes in next.config.ts).
const WIDTHS = [256, 384, 480, 768, 1200, 1600, 2400];

// A static import's src looks like /_next/static/media/<name>.<content-hash>.<ext>
const STATIC_SRC = /\/([^/.]+)\.([^/.]+)\.(?:webp|png|jpe?g)$/;

/** URL of the smallest pre-built copy that is at least `width` px wide. The content hash makes it cacheable forever. */
export function responsiveSrc(src: string, width: number): string {
  const m = STATIC_SRC.exec(src);
  if (!m) return src;
  const size = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `/_img/${m[1]}-${size}.webp?v=${m[2]}`;
}

export default function imageLoader({ src, width }: { src: string; width: number }): string {
  return responsiveSrc(src, width);
}
