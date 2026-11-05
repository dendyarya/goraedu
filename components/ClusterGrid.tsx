import Link from "next/link";
import { IconTile } from "@/components/TradeIcon";
import { FAMILIES, STATUS_LABEL, type Cluster } from "@/lib/clusters";

export function StatusTag({ status }: { status: Cluster["status"] }) {
  const style =
    status === "available" || status === "in-progress"
      ? "border-low/40 bg-low-soft text-low"
      : status === "next"
        ? "border-hose/60 bg-hose-soft text-hose-ink"
        : "border-line bg-paper text-muted";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 text-[0.8125rem] font-medium leading-6 ${style}`}
    >
      {status === "available" || status === "in-progress" ? (
        <span className="h-1.5 w-1.5 rounded-full bg-low" aria-hidden="true" />
      ) : null}
      {STATUS_LABEL[status]}
    </span>
  );
}

function ClusterRow({ c }: { c: Cluster }) {
  const name = c.href ? (
    <Link href={c.href} className="hover:text-low hover:underline">
      {c.name}
    </Link>
  ) : (
    c.name
  );
  return (
    <li className="border-t border-line py-4 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-[1.0625rem] font-semibold [font-family:var(--font-body)] [font-stretch:100%]">{name}</h3>
        <StatusTag status={c.status} />
      </div>
      <p className="mt-1.5 text-[0.9375rem] text-muted">{c.summary}</p>
      <p className="mt-1 text-[0.875rem] text-muted">Built from: {c.source}</p>
    </li>
  );
}

/** Full roadmap: one card per trade family. */
export default function ClusterGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {FAMILIES.map((f) => (
        <section key={f.name} className="rounded-2xl border border-line bg-panel p-6">
          <div className="flex items-center gap-3">
            <IconTile name={f.icon} />
            <h2 className="text-[1.25rem] font-bold">{f.name}</h2>
          </div>
          <ul className="mt-5">
            {f.clusters.map((c) => (
              <ClusterRow key={c.id} c={c} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
