// SSR entry point, built separately via `vite build --ssr` into dist-ssr/.
// scripts/prerender.mjs imports the compiled output of this file (no
// browser, no Puppeteer/Playwright) and calls render() once per route to
// get real HTML + <head> metadata to inject into the static build.
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import PrerenderRoutes from "./PrerenderRoutes";
import { SITE_URL, ROUTES, SERVICES } from "../scripts/routes.mjs";

const ORG_NAME = "Hapcraft Media";
const SAME_AS = [
  "https://www.instagram.com/hapcraftmedia",
  "https://x.com/HapcraftMedia",
  "https://www.linkedin.com/company/hapcraftmedia/",
];

function breadcrumbList(route: (typeof ROUTES)[number], canonical: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: route.breadcrumbLabel, item: canonical },
    ],
  };
}

export function render(pathname: string) {
  const route = ROUTES.find((r) => r.path === pathname) ?? ROUTES[0];
  const canonical = `${SITE_URL}${route.path === "/" ? "" : route.path}/`.replace(/\/+$/, "/");

  const appHtml = renderToStaticMarkup(
    <StaticRouter location={pathname}>
      <PrerenderRoutes />
    </StaticRouter>
  );

  const jsonLdBlocks: object[] = [];

  if (route.path === "/") {
    jsonLdBlocks.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: ORG_NAME,
      description: route.description,
      url: canonical,
      sameAs: SAME_AS,
    });
    jsonLdBlocks.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: ORG_NAME,
      url: canonical,
    });
  } else {
    jsonLdBlocks.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: route.title,
      description: route.description,
      url: canonical,
      isPartOf: { "@type": "Organization", name: ORG_NAME, url: `${SITE_URL}/` },
    });
    jsonLdBlocks.push(breadcrumbList(route, canonical));
  }

  if (route.path === "/services") {
    jsonLdBlocks.push({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Brand Strategy & Creative Production",
      provider: { "@type": "Organization", name: ORG_NAME, url: `${SITE_URL}/` },
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Hapcraft Media Services",
        itemListElement: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.description },
        })),
      },
    });
  }

  return { appHtml, route, canonical, jsonLdBlocks };
}
