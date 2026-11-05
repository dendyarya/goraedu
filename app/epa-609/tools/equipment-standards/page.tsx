import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import Equipment609Finder from "@/components/tools/Equipment609Finder";
import { RULES_CHECKED } from "@/lib/epa608-rules";
import { R609 } from "@/lib/epa609-rules";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";

assertQuotes(
  "epa-609",
  Object.values(R609).map((s) => s.quote),
);

export const metadata: Metadata = {
  title: "EPA 609 Equipment Standards Finder (R-1234yf, R-134a, R-12)",
  description:
    "Find which standard 40 CFR 82.36 requires for MVAC refrigerant handling equipment, from SAE J2843 for R-1234yf to Appendix C for R-134a.",
  alternates: { canonical: "/epa-609/tools/equipment-standards/" },
};

export default function Equipment609Page() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "EPA 609", href: "/epa-609/" },
        { label: "Tools", href: "/tools/" },
        { label: "Equipment standards finder" },
      ]}
      title="EPA 609 equipment standards finder"
      lead="Pick the refrigerant and what the machine does to see which standard 40 CFR 82.36(a) says it must meet."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 3, 2026) · Last checked{" "}
          <time dateTime={RULES_CHECKED}>{formatDate(RULES_CHECKED)}</time>
        </>
      }
    >
      <Equipment609Finder />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        The SAE standards are incorporated by reference in 40 CFR 82.31; we name them but do not reproduce them. Not
        affiliated with or endorsed by the U.S. EPA or SAE International. Spot an error?{" "}
        <Link href="/contact/" className="text-low underline">
          Tell us
        </Link>
        .
      </p>
    </PageShell>
  );
}
