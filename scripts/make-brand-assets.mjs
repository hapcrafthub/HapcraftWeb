// Generates the favicon, app icons and share image from the logo files in src/assets.
// Run with `npm run brand-assets`; the outputs are committed, so this is only needed when the logo changes.
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BG = "#111111";
const wordmark = join(root, "src/assets/hap-logo-new.webp"); // "HAP" only
const lockup = join(root, "src/assets/logo.webp"); // "HAP" over "HAPCRAFT MEDIA"

// The "H" is the first 594 px (of 2000) of the wordmark. On its own it stays readable at 16 px,
// where the full three-letter wordmark turns into a smudge.
const H_BOX = { left: 0, top: 0, width: 594, height: 669 };

/** Square icon: the H centred on the dark brand background, filling `fill` of the height. */
async function squareIcon(size, fill = 0.64) {
  const markHeight = Math.round(size * fill);
  const mark = await sharp(wordmark).extract(H_BOX).resize({ height: markHeight }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toBuffer();
}

/** Packs PNG images into a .ico file (PNG-in-ICO, supported by every current browser). */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

/** 1200x630 share image: the full logo lockup centred on the dark background. */
async function shareImage(outPath) {
  const mark = await sharp(lockup).resize({ height: 340 }).png().toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: BG } })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toFile(outPath);
}

// Google asks for a favicon whose size is a multiple of 48 px, so the linked icon is 192 px.
writeFileSync(join(root, "src/app/icon.png"), await squareIcon(192));
writeFileSync(join(root, "src/app/apple-icon.png"), await squareIcon(180, 0.58));
writeFileSync(join(root, "public/icon-192.png"), await squareIcon(192));
writeFileSync(join(root, "public/icon-512.png"), await squareIcon(512));
// Small sizes get a bigger H so it stays legible.
writeFileSync(
  join(root, "src/app/favicon.ico"),
  ico([
    { size: 16, data: await squareIcon(16, 0.8) },
    { size: 32, data: await squareIcon(32, 0.76) },
    { size: 48, data: await squareIcon(48, 0.72) },
  ])
);
await shareImage(join(root, "src/app/opengraph-image.png"));
console.log("Brand assets written.");
