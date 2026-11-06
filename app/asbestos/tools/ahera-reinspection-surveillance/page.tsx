import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import AheraSchedule from "@/components/tools/AheraSchedule";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { ASBESTOS_INDEPENDENCE_TEXT } from "@/lib/osha";
import { R763 } from "@/lib/asbestos-rules";

assertQuotes(
  "asbestos",
  Object.values(R763).map((s) => s.quote),
);

const CHECKED = "2026-11-06";

export const metadata: Metadata = {
  title: "AHERA Reinspection and Periodic Surveillance Dates (40 CFR 763.85 and 763.92)",
  description:
    "Find when a school building's next asbestos reinspection and periodic surveillance fall under EPA's AHERA rule, with the exact words of 40 CFR 763.85(b) and 763.92(b).",
  alternates: { canonical: "/asbestos/tools/ahera-reinspection-surveillance/" },
};

export default function AheraSchedulePage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Asbestos", href: "/asbestos/" },
        { label: "Tools", href: "/tools/" },
        { label: "AHERA reinspection and surveillance" },
      ]}
      title="AHERA reinspection and surveillance dates"
      lead="Enter a school building's last reinspection and periodic surveillance dates to see the latest dates EPA's school asbestos rule allows for the next ones, with the rule's exact words."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 4, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <AheraSchedule />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        A study aid, not legal or compliance advice. {ASBESTOS_INDEPENDENCE_TEXT} Spot an error?{" "}
        <Link href="/contact/" className="text-low underline">
          Tell us
        </Link>
        .
      </p>
    </PageShell>
  );
}
