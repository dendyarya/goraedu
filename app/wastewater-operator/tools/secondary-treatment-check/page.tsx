import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import SecondaryTreatment from "@/components/tools/SecondaryTreatment";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { WASTEWATER_INDEPENDENCE_TEXT } from "@/lib/osha";
import { R133 } from "@/lib/wastewater-rules";

assertQuotes(
  "wastewater-operator",
  Object.values(R133).map((s) => s.quote),
);

const CHECKED = "2026-11-06";

export const metadata: Metadata = {
  title: "Secondary Treatment Check: BOD5, CBOD5 and SS Averages and Percent Removal (40 CFR 133.102)",
  description:
    "Compare 30-day and 7-day effluent averages and percent removal with the secondary treatment levels in 40 CFR 133.102, with the exact words of the rule.",
  alternates: { canonical: "/wastewater-operator/tools/secondary-treatment-check/" },
};

export default function SecondaryTreatmentPage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Wastewater operator", href: "/wastewater-operator/" },
        { label: "Tools", href: "/tools/" },
        { label: "Secondary treatment check" },
      ]}
      title="Secondary treatment check"
      lead="Compare your 30-day and 7-day effluent averages and percent removal for BOD5, CBOD5 or suspended solids with the levels in 40 CFR 133.102, with the exact words of the rule."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 4, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <SecondaryTreatment />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        A study aid, not legal or compliance advice. {WASTEWATER_INDEPENDENCE_TEXT} Spot an error?{" "}
        <Link href="/contact/" className="text-low underline">
          Tell us
        </Link>
        .
      </p>
    </PageShell>
  );
}
