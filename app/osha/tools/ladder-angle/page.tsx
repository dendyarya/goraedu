import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LadderAngle from "@/components/tools/LadderAngle";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { OSHA_INDEPENDENCE } from "@/lib/osha";
import { ROSHA } from "@/lib/osha-rules";

assertQuotes(
  "osha",
  Object.values(ROSHA).map((s) => s.quote),
);

const CHECKED = "2026-11-05";

export const metadata: Metadata = {
  title: "How Far Should the Ladder Foot Be From the Wall? (OSHA 1926.1053 Calculator)",
  description:
    "Work out the base distance for a non-self-supporting ladder from its working length, using the one-quarter and one-eighth rules in 29 CFR 1926.1053(b)(5).",
  alternates: { canonical: "/osha/tools/ladder-angle/" },
};

export default function LadderAnglePage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "OSHA Construction", href: "/osha/" },
        { label: "Tools", href: "/tools/" },
        { label: "Ladder angle calculator" },
      ]}
      title="How far should the ladder foot be from the wall?"
      lead="Enter the ladder's working length to get the horizontal distance 29 CFR 1926.1053(b)(5) sets, with the exact words of the rule."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 3, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <LadderAngle />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        A study aid, not legal or safety advice: on a job site, the employer and its competent person decide.{" "}
        {OSHA_INDEPENDENCE} Spot an error?{" "}
        <Link href="/contact/" className="text-low underline">
          Tell us
        </Link>
        .
      </p>
    </PageShell>
  );
}
