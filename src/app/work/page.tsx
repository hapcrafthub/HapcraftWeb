import WorkView from "@/components/WorkView";
import { pageMetadata } from "@/lib/metadata";
import { pageLd, ldJson } from "@/lib/schema";

export const metadata = pageMetadata("/work");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(pageLd("/work")) }} />
      <WorkView />
    </>
  );
}
