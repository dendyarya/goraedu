import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import EvacuationLevels from "@/components/tools/EvacuationLevels";
import { RULES_CHECKED, SNAPSHOT_LABEL, SRC } from "@/lib/epa608-rules";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";

export const metadata: Metadata = {
  title: "EPA 608 Evacuation Levels (Table 1 Lookup)",
  description:
    "Find the required evacuation level before opening or disposing of an appliance, from Table 1 of 40 CFR 82.156 and the small appliance rules.",
  alternates: { canonical: "/epa-608/tools/evacuation-levels/" },
};

// Fails the build if any rule quote shown by the tool is not in the dated eCFR snapshot.
assertQuotes(
  "epa-608",
  Object.values(SRC).map((s) => s.quote),
);

export default function EvacuationLevelsPage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "EPA 608", href: "/epa-608/" },
        { label: "Tools", href: "/tools/" },
        { label: "Evacuation level finder" },
      ]}
      title="EPA 608 evacuation level finder"
      lead="Pick the appliance type, its charge and the age of your recovery equipment to see the evacuation level 40 CFR 82.156 requires before opening or disposing of it."
      meta={
        <>
          Fact-checked against official sources ({SNAPSHOT_LABEL}) · Last checked{" "}
          <time dateTime={RULES_CHECKED}>{formatDate(RULES_CHECKED)}</time>
        </>
      }
    >
      <EvacuationLevels />
      <div className="mt-12 max-w-[68ch] space-y-3 text-[0.9375rem] text-muted">
        <p>
          Levels come straight from Table 1 and paragraph (b) of § 82.156. MVACs and MVAC-like appliances follow other
          rules and are not included.
        </p>
        <p>
          Not affiliated with or endorsed by the U.S. EPA. Spot an error?{" "}
          <Link href="/contact/" className="text-low underline">
            Tell us
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
