import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import ForkliftRefresher from "@/components/tools/ForkliftRefresher";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { FORKLIFT_INDEPENDENCE_TEXT } from "@/lib/osha";
import { R178, TRIGGERS } from "@/lib/forklift-rules";

assertQuotes("forklift", [...Object.values(R178).map((s) => s.quote), ...TRIGGERS.map((t) => t.text)]);

const CHECKED = "2026-11-06";

export const metadata: Metadata = {
  title: "Forklift Refresher Training and Evaluation Checker (29 CFR 1910.178(l)(4))",
  description:
    "Check whether OSHA's forklift rule requires refresher training and when the next three-year operator evaluation falls, with the exact words of 29 CFR 1910.178(l)(4).",
  alternates: { canonical: "/forklift/tools/forklift-refresher-evaluation/" },
};

export default function ForkliftRefresherPage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Forklift operator", href: "/forklift/" },
        { label: "Tools", href: "/tools/" },
        { label: "Forklift refresher and evaluation" },
      ]}
      title="Forklift refresher and evaluation checker"
      lead="Tick what has happened since an operator's last evaluation to see whether 29 CFR 1910.178(l)(4) requires refresher training, and when three years from that evaluation falls, with the exact words of the rule."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 4, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <ForkliftRefresher />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        A study aid, not legal or compliance advice. {FORKLIFT_INDEPENDENCE_TEXT} Spot an error?{" "}
        <Link href="/contact/" className="text-low underline">
          Tell us
        </Link>
        .
      </p>
    </PageShell>
  );
}
