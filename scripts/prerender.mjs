// Browserless static prerender: no Puppeteer, no Playwright, no headless
// browser, no `vite preview`, no child_process. Renders each route's real
// React tree to HTML via react-dom/server (through the SSR bundle built by
// `vite build --ssr src/entry-server.tsx`) and stamps it — plus per-route
// <title>/description/canonical/OG/Twitter/JSON-LD — into the client
// build's index.html template.
//
// Output: dist/index.html (for "/"), dist/work/index.html, dist/about/index.html,
// dist/services/index.html. Vercel serves these as static files ahead of the
// SPA rewrite, so bots get full text on first load with no JS execution.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import { ROUTES } from "./routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");
const ssrEntry = resolve(__dirname, "../dist-ssr/entry-server.js");

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function injectHead(html, { route, canonical, jsonLdBlocks }) {
  html = html
    .replace(/<title>.*?<\/title>/s, "")
    .replace(/<link rel="canonical"[^>]*>\n?/, "")
    .replace(/<meta name="description"[^>]*>\n?/, "")
    .replace(/<meta property="og:title"[^>]*>\n?/, "")
    .replace(/<meta property="og:description"[^>]*>\n?/, "")
    .replace(/<meta property="og:url"[^>]*>\n?/, "")
    .replace(/<meta property="og:type"[^>]*>\n?/, "");

  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const jsonLdScripts = jsonLdBlocks
    .map((block) => `    <script type="application/ld+json">${JSON.stringify(block)}</script>`)
    .join("\n");
  const head = `    <title>${title}</title>
    <link rel="canonical" href="${canonical}" />
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
${jsonLdScripts}
  </head>`;

  return html.replace("</head>", head);
}

function main() {
  if (!existsSync(join(distDir, "index.html"))) {
    throw new Error("dist/index.html not found — run `vite build` before prerendering.");
  }
  if (!existsSync(ssrEntry)) {
    throw new Error(`${ssrEntry} not found — run \`vite build --ssr src/entry-server.tsx --outDir dist-ssr\` first.`);
  }

  const template = readFileSync(join(distDir, "index.html"), "utf8");

  return import(`file://${ssrEntry.replace(/\\/g, "/")}?t=${Date.now()}`).then(({ render }) => {
    for (const route of ROUTES) {
      const { appHtml, canonical, jsonLdBlocks } = render(route.path);
      let html = template.replace(
        /<div id="root"><\/div>/,
        `<div id="root">${appHtml}</div>`
      );
      html = injectHead(html, { route, canonical, jsonLdBlocks });

      const outDir = route.path === "/" ? distDir : join(distDir, route.path.slice(1));
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, "index.html"), html, "utf8");
      console.log(`[prerender] wrote ${route.path === "/" ? "/" : route.path + "/"}`);
    }
  });
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  process.exit(1);
});
