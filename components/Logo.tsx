/**
 * Wordmark: a small gauge dial (low side blue, high side red, needle pointing to the safe middle)
 * next to the name. Decorative; the text carries the name for screen readers.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true" focusable="false">
        <circle cx="13" cy="13" r="11.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M5.2 17.5 A8.6 8.6 0 0 1 13 4.4" fill="none" stroke="var(--color-low)" strokeWidth="2.6" />
        <path d="M13 4.4 A8.6 8.6 0 0 1 20.8 17.5" fill="none" stroke="var(--color-high)" strokeWidth="2.6" />
        <path d="M13 13 L15.8 7.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="13" cy="13" r="1.8" fill="currentColor" />
      </svg>
      <span className="font-[family-name:var(--font-display)] text-[1.375rem] font-bold tracking-tight [font-stretch:92%]">
        goraedu
      </span>
    </span>
  );
}
