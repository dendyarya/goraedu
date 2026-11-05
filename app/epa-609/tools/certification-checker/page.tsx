import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import Cert609Checker from "@/components/tools/Cert609Checker";
import { RULES_CHECKED } from "@/lib/epa608-rules";
import { R609 } from "@/lib/epa609-rules";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";

assertQuotes(
  "epa-609",
  Object.values(R609).map((s) => s.quote),
);

export const metadata: Metadata = {
  title: "Do I Need EPA 609 Certification? (Free Checker)",
  description:
    "Answer three questions to see whether the EPA Section 609 certification rule in 40 CFR 82.34 covers your work, with the exact rule text.",
  alternates: { canonical: "/epa-609/tools/certification-checker/" },
};

export default function Cert609Page() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "EPA 609", href: "/epa-609/" },
        { label: "Tools", href: "/tools/" },
        { label: "Certification checker" },
      ]}
      title="Do I need EPA 609 certification?"
      lead="Answer three questions to see what 40 CFR 82.34(a) says about your work, with the exact words of the rule."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 3, 2026) · Last checked{" "}
          <time dateTime={RULES_CHECKED}>{formatDate(RULES_CHECKED)}</time>
        </>
      }
    >
      <Cert609Checker />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        A study aid, not legal advice. Not affiliated with or endorsed by the U.S. EPA. Spot an error?{" "}
        <Link href="/contact/" className="text-low underline">
          Tell us
        </Link>
        .
      </p>
    </PageShell>
  );
}
