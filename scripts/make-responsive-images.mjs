// Builds the resized copies of every image the site uses, as plain static files in public/_img/.
//
// Why: Vercel's image optimizer (/_next/image) is metered per account, and once the monthly allowance
// ran out every image on the site failed with "402 Payment Required". These copies are made at build
// time instead (src/lib/imageLoader.ts points <Image> at them), so there is no limit to hit and
// phones download a 400-800 px file instead of the 2000 px original.
//
// Runs automatically before `npm run dev` and `npm run build`. Output is not committed.
import sharp from "sharp";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, extname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = join(root, "src/assets");
const outDir = join(root, "public/_img");

// Must match deviceSizes + imageSizes in next.config.ts and WIDTHS in src/lib/imageLoader.ts.
const WIDTHS = [256, 384, 480, 768, 1200, 1600, 2400];
const QUALITY = 84;

/** Only images that the code actually imports; unused files in src/assets are skipped. */
function usedAssets() {
  const used = new Set();
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const p = join(dir, entry);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(tsx?|css)$/.test(entry)) {
        for (const m of readFileSync(p, "utf8").matchAll(/assets\/([\w.-]+\.(?:webp|png|jpe?g))/g)) used.add(m[1]);
      }
    }
  };
  walk(join(root, "src"));
  return [...used];
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

let files = 0;
for (const file of usedAssets()) {
  const input = join(assetsDir, file);
  if (!existsSync(input)) { console.warn(`[images] ${file} is imported but missing`); continue; }
  const name = basename(file, extname(file));
  const { width: originalWidth } = await sharp(input).metadata();
  const isWebp = extname(file).toLowerCase() === ".webp";

  for (const w of WIDTHS) {
    const target = join(outDir, `${name}-${w}.webp`);
    if (w >= originalWidth) {
      // Never upscale: the original is the largest copy. WebP originals are copied byte for byte.
      if (isWebp) copyFileSync(input, target);
      else await sharp(input).webp({ quality: 90 }).toFile(target);
    } else {
      await sharp(input).resize({ width: w }).webp({ quality: QUALITY }).toFile(target);
    }
    files++;
  }
}
console.log(`[images] wrote ${files} files to public/_img`);
