import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LeadDisclosureCheck from "@/components/tools/LeadDisclosureCheck";
import { DISCLOSURE } from "@/lib/disclosure-rules";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { HOME_INSPECTOR_INDEPENDENCE_TEXT } from "@/lib/osha";

assertQuotes(
  "home-inspector",
  Object.values(DISCLOSURE).map((s) => s.quote),
);

const CHECKED = "2026-11-15";

export const metadata: Metadata = {
  title: "Lead Disclosure Rule Checker: Does a Home Sale or Lease Need It? (40 CFR 745 Subpart F)",
  description:
    "Check whether a sale or lease of pre-1978 housing falls under EPA's lead-based paint disclosure rule, and see the duties that apply, in the rule's own words.",
  alternates: { canonical: "/home-inspector/tools/lead-disclosure-checker/" },
};

export default function LeadDisclosureCheckPage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Home inspector", href: "/home-inspector/" },
        { label: "Tools", href: "/tools/" },
        { label: "Lead disclosure checker" },
      ]}
      title="Lead disclosure rule checker"
      lead="Answer a few questions about a sale or lease to see whether EPA's lead-based paint disclosure rule (40 CFR 745 Subpart F) covers it, and what the seller, landlord and agents must do, with the exact words of the rule."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 12, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <LeadDisclosureCheck />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        A study aid, not legal advice. {HOME_INSPECTOR_INDEPENDENCE_TEXT} Spot an error?{" "}
        <Link href="/contact/" className="text-low underline">
          Tell us
        </Link>
        .
      </p>
    </PageShell>
  );
}
