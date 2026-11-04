// Generates the favicon, app icons and share image from the logo files in src/assets.
// Run with `npm run brand-assets`; the outputs are committed, so this is only needed when the logo changes.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BG = "#111111";
const wordmark = join(root, "src/assets/hap-logo-new.webp"); // "HAP" only
const lockup = join(root, "src/assets/logo.webp"); // "HAP" over "HAPCRAFT MEDIA"

/** Square icon: the HAP wordmark centred on the dark brand background. */
async function squareIcon(size, outPath) {
  const markWidth = Math.round(size * 0.72);
  const mark = await sharp(wordmark).resize({ width: markWidth }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toFile(outPath);
}

/** 1200x630 share image: the full logo lockup centred on the dark background. */
async function shareImage(outPath) {
  const mark = await sharp(lockup).resize({ height: 340 }).png().toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: BG } })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toFile(outPath);
}

await squareIcon(512, join(root, "src/app/icon.png"));
await squareIcon(180, join(root, "src/app/apple-icon.png"));
await squareIcon(192, join(root, "public/icon-192.png"));
await squareIcon(512, join(root, "public/icon-512.png"));
await shareImage(join(root, "src/app/opengraph-image.png"));
console.log("Brand assets written.");
