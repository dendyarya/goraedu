import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import MechanicRecent from "@/components/tools/MechanicRecent";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { AMT_INDEPENDENCE_TEXT } from "@/lib/osha";
import { ACTIVITIES, R65 } from "@/lib/amt-rules";

assertQuotes("faa-amt", [...Object.values(R65).map((s) => s.quote), ...ACTIVITIES]);

const CHECKED = "2026-11-06";

export const metadata: Metadata = {
  title: "Aviation Mechanic Recent Experience and IA Expiration Checker (14 CFR 65.83, 65.92)",
  description:
    "Check the 24-month recent experience condition in 14 CFR 65.83 and when an inspection authorization expires under 65.92(a), with the exact words of the rule.",
  alternates: { canonical: "/faa-amt/tools/mechanic-recent-experience/" },
};

export default function MechanicRecentPage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "FAA aviation mechanic", href: "/faa-amt/" },
        { label: "Tools", href: "/tools/" },
        { label: "Recent experience and IA expiration" },
      ]}
      title="Mechanic recent experience and IA expiration"
      lead="Enter a mechanic's months of qualifying work in the last 24 months to see whether the recent experience condition in 14 CFR 65.83 is met, and find when an inspection authorization expires under 65.92(a), with the rule's exact words."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 4, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <MechanicRecent />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        A study aid, not legal or compliance advice. {AMT_INDEPENDENCE_TEXT} Spot an error?{" "}
        <Link href="/contact/" className="text-low underline">
          Tell us
        </Link>
        .
      </p>
    </PageShell>
  );
}
