import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Everything is open to search engines and AI crawlers, as on the old site.
const CRAWLERS = ["*", "GPTBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
