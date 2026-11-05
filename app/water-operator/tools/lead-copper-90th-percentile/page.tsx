import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LeadCopper90th from "@/components/tools/LeadCopper90th";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { WATER_INDEPENDENCE_TEXT } from "@/lib/osha";
import { RLCR } from "@/lib/water-rules";

assertQuotes(
  "water-operator",
  Object.values(RLCR).map((s) => s.quote),
);

const CHECKED = "2026-11-06";

export const metadata: Metadata = {
  title: "Lead and Copper 90th Percentile Calculator (40 CFR 141.80, 2024 Revision)",
  description:
    "Work out the 90th percentile of lead or copper tap sample results the way 40 CFR 141.80(c)(3) describes it, and compare it with the 2024-revised action levels.",
  alternates: { canonical: "/water-operator/tools/lead-copper-90th-percentile/" },
};

export default function LeadCopper90thPage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Drinking water operator", href: "/water-operator/" },
        { label: "Tools", href: "/tools/" },
        { label: "Lead and copper 90th percentile" },
      ]}
      title="Lead and copper 90th percentile calculator"
      lead="Put tap sample results in order and find the 90th percentile the way 40 CFR 141.80(c)(3) describes it, then compare it with the lead and copper action levels in the 2024-revised rule."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 3, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <LeadCopper90th />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        A study aid, not legal or compliance advice. {WATER_INDEPENDENCE_TEXT} Spot an error?{" "}
        <Link href="/contact/" className="text-low underline">
          Tell us
        </Link>
        .
      </p>
    </PageShell>
  );
}
