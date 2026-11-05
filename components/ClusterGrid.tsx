import Link from "next/link";
import { FAMILIES, STATUS_LABEL, type Cluster } from "@/lib/clusters";

function StatusTag({ status }: { status: Cluster["status"] }) {
  const style = status === "in-progress" ? "border-low bg-low-soft text-low" : "border-line bg-paper text-muted";
  return (
    <span className={`inline-block rounded-sm border px-1.5 text-[0.8125rem] leading-6 ${style}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

function ClusterItem({ c, showSource }: { c: Cluster; showSource: boolean }) {
  const title = c.href ? (
    <Link href={c.href} className="hover:text-low hover:underline">
      {c.name}
    </Link>
  ) : (
    c.name
  );
  return (
    <li className="flex flex-col gap-1.5 border-t border-line py-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-[1.0625rem] font-semibold [font-family:var(--font-body)] [font-stretch:100%]">{title}</h4>
        <StatusTag status={c.status} />
      </div>
      <p className="text-[0.9375rem] text-muted">{c.summary}</p>
      {showSource ? <p className="text-[0.875rem] text-muted">Built from: {c.source}</p> : null}
    </li>
  );
}

/** All certification families with their clusters. `compact` hides the source line (homepage). */
export default function ClusterGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
      {FAMILIES.map((f) => (
        <section key={f.name}>
          <h3 className="text-[1.25rem] font-bold">{f.name}</h3>
          <ul className="mt-3">
            {f.clusters.map((c) => (
              <ClusterItem key={c.id} c={c} showSource={!compact} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
