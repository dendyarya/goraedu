import type { Metadata } from "next";
import ClusterGrid from "@/components/ClusterGrid";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "The U.S. skilled trades certifications goraedu covers and plans to cover, and the official rules each one is built from.",
  alternates: { canonical: "/certifications/" },
};

export default function CertificationsPage() {
  return (
    <PageShell
      crumbs={[{ label: "Home", href: "/" }, { label: "Certifications" }]}
      title="Certifications"
      lead="We cover certifications whose rules are published by a U.S. government agency, so every answer can be checked against the official text. Each one shows exactly what it covers and what it leaves out."
    >
      <ClusterGrid />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        &quot;Planned&quot; means we intend to cover a certification but have not published material for it yet. The
        order can change. Certification names are used only to identify each exam; goraedu is not affiliated with any
        government agency or certifying organization.
      </p>
    </PageShell>
  );
}
