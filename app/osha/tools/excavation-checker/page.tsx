import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import ExcavationCheck from "@/components/tools/ExcavationCheck";
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
  title: "Excavation Rules by Depth: Protective System, Egress, Air Testing (OSHA 1926 Subpart P)",
  description:
    "Enter an excavation's depth and conditions to see what 29 CFR 1926.651 and 1926.652 say about cave-in protection, a way out and atmosphere testing.",
  alternates: { canonical: "/osha/tools/excavation-checker/" },
};

export default function ExcavationCheckPage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "OSHA Construction", href: "/osha/" },
        { label: "Tools", href: "/tools/" },
        { label: "Excavation checker" },
      ]}
      title="Excavation rules by depth"
      lead="Enter the depth and conditions to see what three rules in 29 CFR 1926 Subpart P say about cave-in protection, a means of egress and atmosphere testing."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 3, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <ExcavationCheck />
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
