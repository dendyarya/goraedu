/**
 * Wordmark: a small gauge dial (blue low side, yellow high side, needle) next to the name.
 * Decorative; the text carries the name for screen readers.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 34 34" aria-hidden="true" focusable="false">
        <circle cx="17" cy="17" r="14" fill="none" stroke="var(--color-line)" strokeWidth="4" />
        <path
          d="M6.5 24.5 A14 14 0 0 1 17 3"
          fill="none"
          stroke="var(--color-sky)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M17 3 A14 14 0 0 1 27.5 24.5"
          fill="none"
          stroke="var(--color-hose)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path d="M17 17 L23 10" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="17" cy="17" r="2.6" fill="currentColor" />
      </svg>
      <span className="font-[family-name:var(--font-display)] text-[1.5rem] font-bold tracking-[-0.03em]">goraedu</span>
    </span>
  );
}
