import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import HoursOfService from "@/components/tools/HoursOfService";
import { RHOS } from "@/lib/cdl-rules";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { CDL_INDEPENDENCE_TEXT } from "@/lib/osha";

assertQuotes(
  "cdl",
  Object.values(RHOS).map((s) => s.quote),
);

const CHECKED = "2026-11-05";

export const metadata: Metadata = {
  title: "Hours of Service Calculator: 11-Hour, 14-Hour and 60/70-Hour Limits (49 CFR 395.3)",
  description:
    "See how much driving time is left under the property-carrying hours-of-service limits in 49 CFR 395.3: 11 hours, the 14-hour period, the 30-minute break and 60/70 hours.",
  alternates: { canonical: "/cdl/tools/hours-of-service-calculator/" },
};

export default function HoursOfServicePage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "CDL", href: "/cdl/" },
        { label: "Tools", href: "/tools/" },
        { label: "Hours of service calculator" },
      ]}
      title="Hours of service calculator"
      lead="Enter your hours to see how much driving time is left under the property-carrying limits in 49 CFR 395.3, with the exact words of the rule."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 3, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <HoursOfService />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        A study aid, not legal or compliance advice. {CDL_INDEPENDENCE_TEXT} Spot an error?{" "}
        <Link href="/contact/" className="text-low underline">
          Tell us
        </Link>
        .
      </p>
    </PageShell>
  );
}
