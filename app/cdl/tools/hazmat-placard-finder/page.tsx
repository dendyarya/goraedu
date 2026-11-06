import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import PlacardFinder from "@/components/tools/PlacardFinder";
import { assertQuotes } from "@/lib/guides";
import { R172 } from "@/lib/hazmat-rules";
import { formatDate } from "@/lib/news";
import { CDL_INDEPENDENCE_TEXT } from "@/lib/osha";

assertQuotes(
  "cdl",
  Object.values(R172).map((s) => s.quote),
);

const CHECKED = "2026-11-06";

export const metadata: Metadata = {
  title: "Hazmat Placard Finder: Table 1, Table 2 and the 1,001 lb Exception (49 CFR 172.504)",
  description:
    "See which placards a highway load needs under 49 CFR 172.504 Tables 1 and 2, the 1,001 lb exception and the DANGEROUS placard option, with the rule's words.",
  alternates: { canonical: "/cdl/tools/hazmat-placard-finder/" },
};

export default function PlacardFinderPage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "CDL", href: "/cdl/" },
        { label: "Tools", href: "/tools/" },
        { label: "Hazmat placard finder" },
      ]}
      title="Hazmat placard finder"
      lead="List the hazard classes on a highway load and their weights to see which placards 49 CFR 172.504 calls for, including the 1,001 lb exception for Table 2 materials and the DANGEROUS placard option."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 4, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <PlacardFinder />
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
