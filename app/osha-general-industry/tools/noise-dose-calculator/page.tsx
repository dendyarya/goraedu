import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import NoiseDose from "@/components/tools/NoiseDose";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { OSHA_INDEPENDENCE } from "@/lib/osha";
import { RNOISE } from "@/lib/osha-gi-rules";

assertQuotes(
  "osha-general-industry",
  Object.values(RNOISE).map((s) => s.quote),
);

const CHECKED = "2026-11-05";

export const metadata: Metadata = {
  title: "OSHA Noise Dose and TWA Calculator (29 CFR 1910.95 Appendix A)",
  description:
    "Work out a noise dose and 8-hour TWA from sound levels and hours, using Table G-16a and the formulas in 29 CFR 1910.95 Appendix A, and compare with 85 dBA.",
  alternates: { canonical: "/osha-general-industry/tools/noise-dose-calculator/" },
};

export default function NoiseDosePage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "OSHA General Industry", href: "/osha-general-industry/" },
        { label: "Tools", href: "/tools/" },
        { label: "Noise dose calculator" },
      ]}
      title="Noise dose and TWA calculator"
      lead="Enter the sound levels and hours of a work day to get the noise dose and 8-hour TWA the way 29 CFR 1910.95 Appendix A computes them, with the exact words of the rule."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 3, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <NoiseDose />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        A study aid, not legal or safety advice. {OSHA_INDEPENDENCE} Spot an error?{" "}
        <Link href="/contact/" className="text-low underline">
          Tell us
        </Link>
        .
      </p>
    </PageShell>
  );
}
