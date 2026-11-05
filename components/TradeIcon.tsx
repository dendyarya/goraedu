import type { FamilyIcon } from "@/lib/clusters";

/** Line icons for each trade family, drawn for goraedu (24px grid, 1.75 stroke, currentColor). */
const PATHS: Record<FamilyIcon | "source" | "free" | "refresh" | "check", React.ReactNode> = {
  hvac: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="1.6" />
      <path d="M12 10.4c-.6-2.6.4-4.6 2.6-5.2M13.6 12c2.6-.6 4.6.4 5.2 2.6M12 13.6c.6 2.6-.4 4.6-2.6 5.2M10.4 12c-2.6.6-4.6-.4-5.2-2.6" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h11v9h-11z" />
      <path d="M13.5 9.5h4l3 3.2v2.8h-7" />
      <circle cx="6.5" cy="17.2" r="1.8" />
      <circle cx="17" cy="17.2" r="1.8" />
    </>
  ),
  helmet: (
    <>
      <path d="M3.5 16.5h17" />
      <path d="M5 16.5v-2a7 7 0 0 1 14 0v2" />
      <path d="M10 7.8V5.5h4v2.3" />
      <path d="M12 9.5v3" />
    </>
  ),
  car: (
    <>
      <path d="M3.5 15.5v-3l2-4.5h13l2 4.5v3z" />
      <path d="M3.5 12.5h17" />
      <circle cx="7.5" cy="16.5" r="1.7" />
      <circle cx="16.5" cy="16.5" r="1.7" />
    </>
  ),
  bolt: <path d="M13.5 2.8 5.5 13.5h6l-1 7.7 8-10.7h-6z" />,
  house: (
    <>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 9.5v10h13v-10" />
      <path d="M10 19.5v-5h4v5" />
    </>
  ),
  drone: (
    <>
      <path d="M9 10.5h6v3H9z" />
      <path d="M9 11 5.5 7.5M15 11l3.5-3.5M9 13l-3.5 3.5M15 13l3.5 3.5" />
      <path d="M3 7.5h5M16 7.5h5M3 16.5h5M16 16.5h5" />
    </>
  ),
  source: (
    <>
      <path d="M6 3.5h8.5L18.5 7.5v13H6z" />
      <path d="M14 3.5v4.5h4.5" />
      <path d="M9 12.5h6M9 15.5h6M9 9.5h2.5" />
    </>
  ),
  free: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 7.7-1.5" />
      <path d="M12 14.5v2" />
    </>
  ),
  refresh: (
    <>
      <path d="M19.5 12a7.5 7.5 0 0 1-13.1 5" />
      <path d="M4.5 12a7.5 7.5 0 0 1 13.1-5" />
      <path d="M17.6 3.5v3.5h-3.5M6.4 20.5V17h3.5" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
};

export type IconName = keyof typeof PATHS;

export default function TradeIcon({
  name,
  size = 24,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}

/** Icon on a soft tinted tile. Tints come from the gauge palette so families are told apart at a glance. */
const TINT: Record<FamilyIcon, string> = {
  hvac: "bg-low-soft text-low",
  truck: "bg-hose-soft text-hose-ink",
  helmet: "bg-hose-soft text-hose-ink",
  car: "bg-high-soft text-high",
  bolt: "bg-hose-soft text-hose-ink",
  house: "bg-low-soft text-low",
  drone: "bg-low-soft text-low",
};

export function IconTile({ name, size = 44 }: { name: FamilyIcon; size?: number }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-2xl ${TINT[name]}`}
      style={{ width: size, height: size }}
    >
      <TradeIcon name={name} size={Math.round(size * 0.55)} />
    </span>
  );
}
