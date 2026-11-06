// Practice progress kept only in this browser (localStorage). Nothing here is sent anywhere.
// Per question id we keep how often it was answered right and wrong, and whether the last answer was right.
// Every read and write is wrapped in try/catch: storage can be blocked, full or missing (private windows).

export type QuestionStat = { r: number; w: number; last: "r" | "w"; t: number };
type Store = Record<string, QuestionStat>;

const KEY = "goraedu:progress:v1";
const MAX = 5000;

function read(): Store {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data)) return {};
    const out: Store = {};
    for (const [id, v] of Object.entries(data as Record<string, unknown>)) {
      if (!/^[a-z0-9-]{1,40}$/.test(id) || !v || typeof v !== "object") continue;
      const s = v as Partial<QuestionStat>;
      const r = Number(s.r);
      const w = Number(s.w);
      const t = Number(s.t);
      if (!Number.isInteger(r) || !Number.isInteger(w) || r < 0 || w < 0 || r > 1e6 || w > 1e6) continue;
      if (s.last !== "r" && s.last !== "w") continue;
      out[id] = { r, w, last: s.last, t: Number.isFinite(t) ? t : 0 };
    }
    return out;
  } catch {
    return {};
  }
}

function write(store: Store) {
  try {
    const entries = Object.entries(store);
    // Keep the most recent answers if the store grows past the cap.
    const kept = entries.length > MAX ? entries.sort((a, b) => b[1].t - a[1].t).slice(0, MAX) : entries;
    window.localStorage.setItem(KEY, JSON.stringify(Object.fromEntries(kept)));
  } catch {
    // Storage unavailable: progress simply is not kept.
  }
}

/** Record one answer. */
export function recordAnswer(id: string, correct: boolean) {
  const store = read();
  const prev = store[id] ?? { r: 0, w: 0, last: "r" as const, t: 0 };
  store[id] = {
    r: prev.r + (correct ? 1 : 0),
    w: prev.w + (correct ? 0 : 1),
    last: correct ? "r" : "w",
    t: Date.now(),
  };
  write(store);
}

/** Stats for the given question ids (only ids that have been answered). */
export function statsFor(ids: string[]): Record<string, QuestionStat> {
  const store = read();
  const out: Record<string, QuestionStat> = {};
  for (const id of ids) if (store[id]) out[id] = store[id];
  return out;
}

/** Forget the given question ids. */
export function clearIds(ids: string[]) {
  const store = read();
  for (const id of ids) delete store[id];
  write(store);
}
