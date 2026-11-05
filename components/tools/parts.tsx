import type { RuleSource } from "@/lib/epa608-rules";

/** The three number labels used across goraedu tools: official data, our calculation, your input. */
export function Label({ kind }: { kind: "official" | "calc" | "input" }) {
  const map = {
    official: ["Official data", "border-low/40 bg-low-soft text-low"],
    calc: ["Our calculation", "border-hose/60 bg-hose-soft text-hose-ink"],
    input: ["Your input", "border-line bg-paper text-muted"],
  } as const;
  const [text, cls] = map[kind];
  return (
    <span className={`inline-block rounded-full border px-2 text-[0.8125rem] font-medium leading-6 ${cls}`}>
      {text}
    </span>
  );
}

export function RuleQuote({ source }: { source: RuleSource }) {
  return (
    <figure className="mt-3 border-l-[3px] border-low/60 pl-3 text-[0.9375rem]">
      <blockquote className="text-muted">&ldquo;{source.quote}&rdquo;</blockquote>
      <figcaption className="mt-1">
        <a href={source.url} className="text-low underline" rel="noopener">
          {source.title}
        </a>
      </figcaption>
    </figure>
  );
}

export function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-[0.9375rem] font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

export function Segmented<T extends string>({
  legend,
  value,
  onChange,
  options,
}: {
  legend: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; hint?: string }[];
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-[0.9375rem] font-medium">{legend}</legend>
      <div className="grid gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={`flex cursor-pointer gap-3 rounded-xl border px-3 py-2.5 ${
              value === o.value ? "border-low bg-low-soft" : "border-line bg-paper hover:border-low/60"
            }`}
          >
            <input
              type="radio"
              className="mt-1 accent-[var(--color-low)]"
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            <span>
              <span className="block">{o.label}</span>
              {o.hint ? <span className="block text-[0.875rem] text-muted">{o.hint}</span> : null}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
