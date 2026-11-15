import type { Metadata } from "next";
import HubPage from "@/components/hub/HubPage";
import { hubById } from "@/lib/hubs";

const hub = hubById("solar-pv");

export const metadata: Metadata = {
  title: hub.metaTitle,
  description: hub.description,
  alternates: { canonical: hub.href },
};

export default function Page() {
  return <HubPage hub={hub} />;
}
