import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import RadiographyDueDates from "@/components/tools/RadiographyDueDates";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { RADIOGRAPHY_INDEPENDENCE_TEXT } from "@/lib/osha";
import { RAD_ITEMS } from "@/lib/radiography-rules";

assertQuotes(
  "industrial-radiography",
  RAD_ITEMS.map((i) => i.source.quote),
);

const CHECKED = "2026-11-07";

export const metadata: Metadata = {
  title: "Industrial Radiography Due Dates: Leak Tests, Calibration, Training (10 CFR Part 34)",
  description:
    "Work out the latest next dates for leak tests, survey instrument calibration, quarterly inspections, refresher training and job performance checks under 10 CFR Part 34.",
  alternates: { canonical: "/industrial-radiography/tools/due-dates/" },
};

export default function RadiographyDueDatesPage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Industrial radiography", href: "/industrial-radiography/" },
        { label: "Tools", href: "/tools/" },
        { label: "Due dates" },
      ]}
      title="Industrial radiography due dates"
      lead="Enter when each recurring check was last done to see the latest date the next one is due under the intervals in 10 CFR Part 34, with the rule's exact words."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 4, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <RadiographyDueDates />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        A study aid, not legal or compliance advice and not radiation safety training. {RADIOGRAPHY_INDEPENDENCE_TEXT}{" "}
        Spot an error?{" "}
        <Link href="/contact/" className="text-low underline">
          Tell us
        </Link>
        .
      </p>
    </PageShell>
  );
}
