import AboutView from "@/components/AboutView";
import { pageMetadata } from "@/lib/metadata";
import { pageLd, ldJson } from "@/lib/schema";

export const metadata = pageMetadata("/about");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(pageLd("/about")) }} />
      <AboutView />
    </>
  );
}
