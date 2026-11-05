import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LeakRateCalculator from "@/components/tools/LeakRateCalculator";
import { RULES_CHECKED, SNAPSHOT_LABEL, SRC } from "@/lib/epa608-rules";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";

export const metadata: Metadata = {
  title: "EPA 608 Leak Rate Calculator (Annualizing and Rolling Average)",
  description:
    "Free leak rate calculator using both methods in 40 CFR 82.152, compared with the 10, 20 and 30 percent leak rates in § 82.157. Shows the rule text.",
  alternates: { canonical: "/epa-608/tools/leak-rate-calculator/" },
};

// Fails the build if any rule quote shown by the tool is not in the dated eCFR snapshot.
assertQuotes(
  "epa-608",
  Object.values(SRC).map((s) => s.quote),
);

export default function LeakRatePage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "EPA 608", href: "/epa-608/" },
        { label: "Tools", href: "/tools/" },
        { label: "Leak rate calculator" },
      ]}
      title="EPA 608 leak rate calculator"
      lead="Calculate an appliance's leak rate with the annualizing or rolling average method from 40 CFR 82.152, and see whether it is over the applicable leak rate in § 82.157."
      meta={
        <>
          Fact-checked against official sources ({SNAPSHOT_LABEL}) · Last checked{" "}
          <time dateTime={RULES_CHECKED}>{formatDate(RULES_CHECKED)}</time>
        </>
      }
    >
      <LeakRateCalculator />
      <div className="mt-12 max-w-[68ch] space-y-3 text-[0.9375rem] text-muted">
        <p>
          This tool repeats the arithmetic the rule describes. It is a study and planning aid, not a compliance record:
          the owner or operator remains responsible for the calculation and records the rule requires. Learn the rest of
          the leak repair rules in the{" "}
          <Link href="/epa-608/type-2/study-guide/#leak-repair-requirements" className="text-low underline">
            Type II study guide
          </Link>
          .
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
