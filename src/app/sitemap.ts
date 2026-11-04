import type { MetadataRoute } from "next";
import { ROUTES, canonicalUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, changefreq, priority }) => ({
    url: canonicalUrl(path),
    lastModified,
    changeFrequency: changefreq,
    priority,
  }));
}
