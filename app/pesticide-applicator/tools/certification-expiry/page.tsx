import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import PesticideExpiry from "@/components/tools/PesticideExpiry";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { PESTICIDE_INDEPENDENCE_TEXT } from "@/lib/osha";
import { R171 } from "@/lib/pesticide-rules";

assertQuotes(
  "pesticide-applicator",
  Object.values(R171).map((s) => s.quote),
);

const CHECKED = "2026-11-06";

export const metadata: Metadata = {
  title: "Pesticide Applicator Certification Expiry Date (40 CFR 171.107)",
  description:
    "Find when a restricted use pesticide applicator certification expires under EPA's five-year federal limit in 40 CFR 171.107(a), with the rule's exact words.",
  alternates: { canonical: "/pesticide-applicator/tools/certification-expiry/" },
};

export default function PesticideExpiryPage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Pesticide applicator", href: "/pesticide-applicator/" },
        { label: "Tools", href: "/tools/" },
        { label: "Certification expiry" },
      ]}
      title="Pesticide applicator certification expiry"
      lead="Enter the date a commercial or private applicator certification was issued to see when it expires under the federal five-year limit, or a shorter period your certifying authority sets, with the rule's exact words."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 4, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <PesticideExpiry />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        A study aid, not legal or compliance advice. {PESTICIDE_INDEPENDENCE_TEXT} Spot an error?{" "}
        <Link href="/contact/" className="text-low underline">
          Tell us
        </Link>
        .
      </p>
    </PageShell>
  );
}
