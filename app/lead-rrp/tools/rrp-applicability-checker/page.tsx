import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import RrpCheck from "@/components/tools/RrpCheck";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { RRP_INDEPENDENCE_TEXT } from "@/lib/osha";
import { RRRP } from "@/lib/rrp-rules";

assertQuotes(
  "lead-rrp",
  Object.values(RRRP).map((s) => s.quote),
);

const CHECKED = "2026-11-06";

export const metadata: Metadata = {
  title: "Lead RRP Rule Checker: Is It a Covered Renovation or Minor Repair? (40 CFR 745.82)",
  description:
    "Check whether a paid job in target housing or a child-occupied facility is a renovation under EPA's lead RRP rule or minor repair and maintenance, with the rule's words.",
  alternates: { canonical: "/lead-rrp/tools/rrp-applicability-checker/" },
};

export default function RrpCheckPage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "EPA Lead RRP", href: "/lead-rrp/" },
        { label: "Tools", href: "/tools/" },
        { label: "RRP rule checker" },
      ]}
      title="Lead RRP rule checker"
      lead="Answer a few questions about a job to see whether EPA's lead renovation, repair and painting rule (40 CFR 745 Subpart E) covers it, or whether it is minor repair and maintenance, with the exact words of the rule."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 4, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <RrpCheck />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        A study aid, not legal or compliance advice. {RRP_INDEPENDENCE_TEXT} Spot an error?{" "}
        <Link href="/contact/" className="text-low underline">
          Tell us
        </Link>
        .
      </p>
    </PageShell>
  );
}
