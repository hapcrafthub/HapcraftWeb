// Single source of truth for public routes: the sitemap, each page's <head> metadata and its
// JSON-LD all read from here. Add a route here and it shows up in all three.

export const SITE_URL = "https://www.hapcraftmedia.com";
export const ORG_NAME = "Hapcraft Media";
export const SAME_AS = [
  "https://www.instagram.com/hapcraftmedia",
  "https://x.com/HapcraftMedia",
  "https://www.linkedin.com/company/hapcraftmedia/",
];

export type Route = {
  path: string;
  changefreq: "weekly" | "monthly";
  priority: number;
  title: string;
  description: string;
  breadcrumbLabel: string;
};

export const ROUTES: Route[] = [
  {
    path: "/",
    changefreq: "weekly",
    priority: 1.0,
    title: "Hapcraft Media — Brand Strategy & Creative Production Studio",
    description:
      "Hapcraft Media is a brand strategy and creative production studio that turns businesses into brands people remember, from major public events to government partnerships.",
    breadcrumbLabel: "Home",
  },
  {
    path: "/work",
    changefreq: "weekly",
    priority: 0.8,
    title: "Our Work — Hapcraft Media",
    description:
      "See Hapcraft Media's work: co-organizing the Antarrashtriya Arya Mahasammelan for 4.5 lakh+ attendees, a Gujarat government strategic partnership, and brand strategy for Mr. Potato and Jobipo.",
    breadcrumbLabel: "Our Work",
  },
  {
    path: "/about",
    changefreq: "monthly",
    priority: 0.6,
    title: "About Us — Hapcraft Media",
    description:
      "Hapcraft Media builds the systems that turn small businesses into names people remember, through bold branding and sharp marketing.",
    breadcrumbLabel: "About Us",
  },
  {
    path: "/services",
    changefreq: "monthly",
    priority: 0.6,
    title: "Our Services — Hapcraft Media",
    description:
      "From AI-powered infrastructure to custom digital experiences, Hapcraft Media builds the systems that make brands impossible to ignore.",
    breadcrumbLabel: "Our Services",
  },
];

export function getRoute(path: string): Route {
  return ROUTES.find((r) => r.path === path) ?? ROUTES[0];
}

/** Canonical URL with a trailing slash, matching what the old site published. */
export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path}/`.replace(/\/+$/, "/");
}

// Short versions of the cards on /services, for the Service/OfferCatalog JSON-LD.
// Keep in sync with src/components/ServicesView.tsx if the offerings change.
export const SERVICES: { name: string; description: string }[] = [
  {
    name: "AI Creative Production",
    description:
      "AI-driven creative production that delivers high-quality visuals without the cost and overhead of traditional studio shoots.",
  },
  {
    name: "Custom Website Development",
    description:
      "Websites built to earn trust in the first three seconds and turn visitor interest into decisions.",
  },
  {
    name: "AI-Powered Business Infrastructure",
    description:
      "Infrastructure that automates repetitive work so teams can focus on growth without added chaos.",
  },
  {
    name: "Content Strategic Blueprint",
    description:
      "A content distribution plan mapping every channel and audience moment so nothing created goes to waste.",
  },
  {
    name: "Product Design",
    description:
      "Strategic clarity before launch so products enter the market positioned correctly and priced right.",
  },
  {
    name: "Performance Marketing",
    description:
      "Data-driven ad campaigns optimised relentlessly to lower cost per acquisition and compound returns.",
  },
];
