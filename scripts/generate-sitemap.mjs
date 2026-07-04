// Generates dist/sitemap.xml at build time, after `vite build` and the
// prerender step. Writing directly into dist/ (rather than public/, which
// Vite would just copy verbatim) means every build produces a fresh,
// physical XML file with today's <lastmod> — never the SPA's index.html.
//
// No dependency on the `sitemap` npm package: for 4 fixed URLs a template
// literal is more reliable than a library and has zero supply-chain surface.

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { SITE_URL, ROUTES } from "./routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, "../dist/sitemap.xml");

const today = new Date().toISOString().slice(0, 10);

// Trailing slash matches the canonical/OG URLs entry-server.tsx emits for
// each prerendered route (e.g. https://www.hapcraftmedia.com/work/), so the
// sitemap and canonical tags never disagree on the URL for the same page.
const urlEntries = ROUTES.map(
  ({ path, changefreq, priority }) => `  <url>
    <loc>${`${SITE_URL}${path}/`.replace(/\/+$/, "/")}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

writeFileSync(outPath, xml, "utf8");
console.log(`[sitemap] wrote ${ROUTES.length} URLs to ${outPath}`);
