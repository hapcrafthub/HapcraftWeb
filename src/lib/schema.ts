import { FAQS, ORG_NAME, SAME_AS, SERVICES, SITE_URL, canonicalUrl, getRoute } from "./site";

/** Serialises JSON-LD for a <script> tag; "<" is escaped so content can never close the tag. */
export function ldJson(blocks: object | object[]): string {
  return JSON.stringify(blocks).replace(/</g, "\\u003c");
}

export function pageLd(path: string): object[] {
  const route = getRoute(path);
  const canonical = canonicalUrl(route.path);

  if (route.path === "/") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: ORG_NAME,
        description: route.description,
        url: canonical,
        sameAs: SAME_AS,
      },
      { "@context": "https://schema.org", "@type": "WebSite", name: ORG_NAME, url: canonical },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ];
  }

  const blocks: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: route.title,
      description: route.description,
      url: canonical,
      isPartOf: { "@type": "Organization", name: ORG_NAME, url: `${SITE_URL}/` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: route.breadcrumbLabel, item: canonical },
      ],
    },
  ];

  if (route.path === "/services") {
    blocks.push({
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

  return blocks;
}
