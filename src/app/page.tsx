import HomeView from "@/components/HomeView";
import { pageMetadata } from "@/lib/metadata";
import { pageLd, ldJson } from "@/lib/schema";

export const metadata = pageMetadata("/");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(pageLd("/")) }} />
      <HomeView />
    </>
  );
}
