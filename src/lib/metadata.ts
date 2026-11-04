import type { Metadata } from "next";
import { ORG_NAME, canonicalUrl, getRoute } from "./site";

/** Title, description, canonical, Open Graph and Twitter tags for one of the routes in site.ts. */
export function pageMetadata(path: string): Metadata {
  const route = getRoute(path);
  const url = canonicalUrl(route.path);
  // A page's own openGraph/twitter objects replace the root ones, so the share image is set here for every page.
  const image = { url: "/opengraph-image.png", width: 1200, height: 630, alt: ORG_NAME };
  return {
    title: { absolute: route.title },
    description: route.description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: ORG_NAME, locale: "en_IN", title: route.title, description: route.description, url, images: [image] },
    twitter: { card: "summary_large_image", title: route.title, description: route.description, images: [image.url] },
  };
}
