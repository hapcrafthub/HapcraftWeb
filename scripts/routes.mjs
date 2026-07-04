// Single source of truth for public routes: sitemap.xml (generate-sitemap.mjs)
// and the prerendered per-route <head> metadata (entry-server.tsx) both read
// this file. Add a route here and it shows up in both automatically.
// Keep in sync with src/App.tsx / src/PrerenderRoutes.tsx.

export const SITE_URL = "https://www.hapcraftmedia.com";

export const ROUTES = [
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

// Mirrors the `services` list rendered in src/pages/ServicesPage.tsx, for the
// Service/OfferCatalog JSON-LD on /services. Keep titles/descriptions in sync
// with that file if the offerings change.
export const SERVICES = [
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
