import type { Metadata, Viewport } from "next";
import { Poppins, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import IntroLoader from "@/components/IntroLoader";
import { ORG_NAME, SITE_URL, ROUTES } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const home = ROUTES[0];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: home.title, template: "%s" },
  description: home.description,
  applicationName: ORG_NAME,
  authors: [{ name: ORG_NAME, url: SITE_URL }],
  creator: ORG_NAME,
  publisher: ORG_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: { siteName: ORG_NAME, type: "website", locale: "en_IN", url: SITE_URL, title: home.title, description: home.description },
  twitter: { card: "summary_large_image", title: home.title, description: home.description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${poppins.variable} ${hanken.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body>
        {/* Without JavaScript the intro cannot fade itself out and scroll reveals never fire, so show the page as it is. */}
        <noscript>
          <style>{".il{display:none}.reveal{opacity:1;transform:none}"}</style>
        </noscript>
        <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden="true">
          <defs>
            <filter id="hero-outline" colorInterpolationFilters="sRGB" x="-5%" y="-5%" width="110%" height="110%">
              <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="expanded" />
              <feFlood floodColor="#f9f6e7" result="color" />
              <feComposite in="color" in2="expanded" operator="in" result="outline" />
              <feMerge>
                <feMergeNode in="outline" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
        <IntroLoader />
        {children}
      </body>
    </html>
  );
}
