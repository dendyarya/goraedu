import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import PowerLineClearance from "@/components/tools/PowerLineClearance";
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
  title: "Scaffold Distance From Power Lines (OSHA 1926.451(f)(6) Finder)",
  description:
    "Find the minimum distance between a scaffold and exposed, energized power lines from the table in 29 CFR 1926.451(f)(6), by line type and voltage.",
  alternates: { canonical: "/osha/tools/scaffold-power-line-clearance/" },
};

export default function PowerLineClearancePage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "OSHA Construction", href: "/osha/" },
        { label: "Tools", href: "/tools/" },
        { label: "Scaffold power line clearance" },
      ]}
      title="How close can a scaffold be to power lines?"
      lead="Choose the line type and enter its voltage to find the minimum distance in the table of 29 CFR 1926.451(f)(6)."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 3, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <PowerLineClearance />
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
