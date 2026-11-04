import ServicesView from "@/components/ServicesView";
import { pageMetadata } from "@/lib/metadata";
import { pageLd, ldJson } from "@/lib/schema";

export const metadata = pageMetadata("/services");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(pageLd("/services")) }} />
      <ServicesView />
    </>
  );
}
