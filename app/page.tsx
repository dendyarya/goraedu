import Link from "next/link";
import NewsGrid from "@/components/NewsGrid";
import QuickStart, { type QuickStartOption } from "@/components/QuickStart";
import SampleQuestion, { type SampleQuestionData } from "@/components/SampleQuestion";
import TradeIcon, { IconTile } from "@/components/TradeIcon";
import { ALL_CLUSTERS, FAMILIES, WITH_FAMILY } from "@/lib/clusters";
import { getAllGuides, getAllTopicPages } from "@/lib/guides";
import { getAllNews, newsCards } from "@/lib/news";
import { getAllSets, SECTION_NAME, universalPool } from "@/lib/questions";
import { oshaRank } from "@/lib/osha";
import { TOOLS } from "@/lib/tools";

// Answer stated verbatim on the EPA page cited (accuracy principle 1).
const SAMPLE: SampleQuestionData = {
  topic: "EPA 608: certification types",
  question:
    "Which Section 608 certification type covers servicing or disposing of high- or very high-pressure appliances, except small appliances and motor vehicle air conditioners?",
  options: [
    { id: "A", text: "Type I" },
    { id: "B", text: "Type II" },
    { id: "C", text: "Type III" },
    { id: "D", text: "Universal" },
  ],
  answer: "B",
  explanation:
    "EPA lists Type II for high- and very high-pressure appliances, except small appliances and MVACs. Type I covers small appliances, Type III covers low-pressure appliances, and Universal covers all types of equipment.",
  source: {
    title: "EPA: Section 608 Technician Certification Requirements",
    url: "https://www.epa.gov/section608/section-608-technician-certification-requirements",
    checked: "Nov 5, 2026",
  },
};

const SOURCES = ["eCFR", "Federal Register", "EPA.gov", "40 CFR Part 82", "Agency guidance"];

const STEPS = [
  { title: "Written from the rule", body: "Only questions whose answer an official source states clearly." },
  { title: "Quoted word for word", body: "The site will not build if a quote differs from the regulation." },
  { title: "Corrected within 7 days", body: "Report an error and we fix it and log it on our corrections page." },
];

const H2 = "text-[2rem] sm:text-[2.75rem]";

export default function Home() {
  // OSHA topic sets follow the course order (falls first); other clusters keep their file order.
  const sets = [...getAllSets()].sort((a, b) =>
    a.cluster === b.cluster ? oshaRank(a.cluster, a.slug) - oshaRank(b.cluster, b.slug) : 0,
  );
  const guides = getAllGuides();
  const topicPages = getAllTopicPages();
  const latest = getAllNews().slice(0, 8);
  const live = WITH_FAMILY.filter((c) => c.status === "available" && c.href);
  const next = WITH_FAMILY.filter((c) => c.status === "next");
  const totalQuestions = sets.reduce((n, s) => n + s.questions.length, 0);

  const universal = universalPool();
  const quick: QuickStartOption[] = live.map((c) => {
    const own = sets.filter((s) => s.cluster === c.id);
    const tests = own.map((s) => ({
      label:
        SECTION_NAME[s.slug] ??
        s.title
          .replace(/^OSHA construction /, "")
          .replace(/ practice (questions|test)$/, "")
          .replace(/^./, (x) => x.toUpperCase()),
      href: s.href,
    }));
    if (c.id === "epa-608" && universal.sections.length) tests.push({ label: "Universal exam", href: universal.href });
    return { cert: c.name, tests };
  });

  const stats = (id: string) => {
    const own = sets.filter((s) => s.cluster === id);
    return {
      questions: own.reduce((n, s) => n + s.questions.length, 0),
      guides: guides.filter((g) => g.cluster === id).length,
      rules: topicPages.filter((g) => g.cluster === id).length,
      tools: TOOLS.filter((t) => t.cluster === id).length,
      first: own[0]?.href,
    };
  };

  return (
    <main id="main" className="overflow-x-clip">
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-12 pt-12 sm:px-6 md:pt-16 lg:grid-cols-[1.05fr_1fr]">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-panel py-1.5 pl-2 pr-4 text-[0.9375rem] font-semibold text-muted">
            <span aria-hidden="true" className="h-5 w-5 rounded-full bg-hose" />
            Free, no sign-up, built only from official rules
          </p>
          <h1 className="mt-6 text-[2.75rem] sm:text-[3.75rem] lg:text-[4.5rem]">
            Pass your trade certification. <span className="text-low">Check every answer.</span>
          </h1>
          <p className="mt-6 max-w-[34em] text-[1.1875rem] leading-relaxed text-muted">
            Practice tests, study guides and tools for U.S. skilled trades exams. Each answer quotes the regulation it
            comes from, so you learn the rule, not just the letter.
          </p>
          <div className="mt-8">
            <QuickStart options={quick} />
          </div>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {[
              [totalQuestions, "practice questions"],
              [guides.length, guides.length === 1 ? "study guide" : "study guides"],
              [TOOLS.length, "free tools"],
            ].map(([n, label]) => (
              <div key={label as string} className="flex flex-col-reverse">
                <dt className="text-[0.9375rem] text-muted">{label}</dt>
                <dd className="font-[family-name:var(--font-display)] text-[2rem] font-bold leading-none">{n}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* A manifold-gauge ring around a live sample question */}
        <div className="relative mx-auto w-full max-w-[34rem] py-10">
          <div
            aria-hidden="true"
            className="absolute inset-[4%] -z-0 rotate-[-20deg] rounded-full border-[18px] border-hose border-l-sky border-t-sky"
          />
          <div aria-hidden="true" className="absolute inset-[13%] rounded-full border-2 border-dashed border-line" />
          <div className="relative mx-[6%]">
            <SampleQuestion q={SAMPLE} />
          </div>
          <div className="absolute -left-1 top-0 hidden rounded-2xl border border-line bg-panel px-4 py-2.5 sm:block">
            <p className="text-[0.8125rem] font-semibold text-muted">Built from</p>
            <p className="font-[family-name:var(--font-display)] text-[1.25rem] font-bold">
              40 CFR <span className="text-low">Part 82</span>
            </p>
          </div>
          <div className="absolute -bottom-1 right-2 flex items-center gap-2.5 rounded-full bg-night py-2.5 pl-2.5 pr-4 text-white">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-hose text-night">
              <TradeIcon name="check" size={14} />
            </span>
            <span className="text-[0.9375rem] font-bold">Every answer fact-checked</span>
          </div>
        </div>
      </section>

      {/* Sources strip */}
      <section aria-label="Official sources" className="border-y border-line bg-panel">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-9 gap-y-3 px-4 py-5 sm:px-6">
          <p className="text-[0.9375rem] font-semibold text-muted">Only official sources</p>
          {SOURCES.map((s) => (
            <p key={s} className="font-[family-name:var(--font-display)] text-[1.375rem] font-bold text-[#6f849c]">
              {s}
            </p>
          ))}
        </div>
      </section>

      {/* Explore by trade */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className={H2}>
              Explore by <span className="text-low">trade</span>
            </h2>
            <p className="mt-3 max-w-[36em] text-[1.0625rem] text-muted">
              One certification at a time, each finished before the next. Pick your trade to see what is ready.
            </p>
          </div>
          <Link href="/certifications/" className="font-bold text-low underline">
            See all {ALL_CLUSTERS.length} certifications
          </Link>
        </div>
        <ul className="mt-8 flex flex-wrap gap-3">
          {FAMILIES.map((f) => {
            const ready = f.clusters.filter((c) => c.status === "available" && c.href);
            const soon = f.clusters.find((c) => c.status === "next");
            const href = ready[0]?.href ?? "/certifications/";
            const sub = ready.length
              ? `${ready.length} available`
              : soon
                ? `${soon.name.replace(/ \(.*\)$/, "")} coming next`
                : "Planned";
            return (
              <li key={f.name}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-full py-2.5 pl-2.5 pr-5 ${
                    ready.length
                      ? "bg-low text-white hover:brightness-110"
                      : "border border-line bg-panel hover:border-low"
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full ${ready.length ? "bg-white/20" : "bg-low-soft text-low"}`}
                  >
                    <TradeIcon name={f.icon} size={20} />
                  </span>
                  <span>
                    <span className="block font-bold">{f.name}</span>
                    <span className={`block text-[0.8125rem] ${ready.length ? "text-white/90" : "text-muted"}`}>
                      {sub}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Ready to practice */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <h2 className={H2}>
          Ready to <span className="text-low">practice</span>
        </h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {live.map((c) => {
            const st = stats(c.id);
            const chips = [
              `${st.questions} questions`,
              st.guides ? `${st.guides} study ${st.guides === 1 ? "guide" : "guides"}` : null,
              st.rules ? `${st.rules} rule pages` : null,
              st.tools ? `${st.tools} tools` : null,
            ].filter(Boolean) as string[];
            return (
              <article key={c.id} className="flex flex-col rounded-[1.75rem] border border-line bg-panel p-7">
                <div className="flex items-center justify-between gap-3">
                  <IconTile name={c.family.icon} size={52} />
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ok-soft px-3 text-[0.8125rem] font-bold leading-7 text-ok">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
                    Available
                  </span>
                </div>
                <h3 className="mt-5 text-[1.625rem]">{c.name}</h3>
                <p className="mt-2 text-muted">{c.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {chips.map((x) => (
                    <li
                      key={x}
                      className="rounded-full border border-line bg-paper px-3 py-1 text-[0.875rem] font-semibold"
                    >
                      {x}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-2.5 pt-6">
                  {st.first ? (
                    <Link
                      href={st.first}
                      className="inline-flex min-h-11 items-center rounded-full bg-low px-5 font-bold text-white hover:brightness-110"
                    >
                      Start practicing
                    </Link>
                  ) : null}
                  <Link
                    href={c.href!}
                    className="inline-flex min-h-11 items-center rounded-full border border-line px-5 font-bold hover:border-low hover:text-low"
                  >
                    About {c.name.replace("Section ", "")}
                  </Link>
                </div>
              </article>
            );
          })}
          {next.length ? (
            <article className="flex flex-col rounded-[1.75rem] border-2 border-dashed border-line p-7">
              <span className="self-start rounded-full bg-hose-soft px-3 text-[0.8125rem] font-bold leading-7 text-hose-ink">
                Coming next
              </span>
              <h3 className="mt-5 text-[1.375rem]">{next.map((c) => c.name.replace(/ \(.*\)$/, "")).join(" and ")}</h3>
              <ul className="mt-2 space-y-1.5 text-muted">
                {next.map((c) => (
                  <li key={c.id}>{c.summary}</li>
                ))}
              </ul>
              <Link href="/certifications/" className="mt-auto pt-6 font-bold text-low underline">
                See the full roadmap
              </Link>
            </article>
          ) : null}
        </div>
      </section>

      {/* How every answer is checked */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <div className="flex flex-wrap items-center gap-10 rounded-[2.25rem] bg-[#1673e0] p-8 text-white sm:p-12">
          <div className="min-w-0 flex-[1_1_22rem]">
            <h2 className={H2}>Every answer shows where it comes from.</h2>
            <p className="mt-4 text-[1.0625rem] text-white/90">
              We write each question ourselves from the rule text, quote the exact words that prove the answer, and have
              every set checked separately before it goes live.
            </p>
            <Link
              href="/methodology/"
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-white px-5 font-bold text-[#0e1b2c] hover:bg-low-soft"
            >
              Read our methodology
            </Link>
          </div>
          <ol className="grid min-w-0 flex-[1_1_26rem] gap-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex items-start gap-4 rounded-[1.25rem] bg-white/10 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-hose font-[family-name:var(--font-display)] font-bold text-[#0e1b2c]">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-[1.0625rem] font-bold">{s.title}</span>
                  <span className="mt-1 block text-[0.9375rem] text-white/90">{s.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tools */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className={H2}>
            Free <span className="text-low">tools</span>
          </h2>
          <Link href="/tools/" className="font-bold text-low underline">
            All tools
          </Link>
        </div>
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((t) => (
            <li key={t.slug}>
              <Link
                href={t.href}
                className="block h-full rounded-[1.4rem] border border-line bg-panel p-5 hover:border-low"
              >
                <span className="text-[0.8125rem] font-bold text-low">{t.name.match(/^EPA \d+/)?.[0]}</span>
                <span className="mt-2 block font-[family-name:var(--font-display)] text-[1.25rem] font-bold">
                  {t.name.replace(/^EPA \d+ /, "").replace(/^./, (x) => x.toUpperCase())}
                </span>
                <span className="mt-1.5 block text-[0.9375rem] text-muted">{t.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* News */}
      {latest.length > 0 ? (
        <section id="news" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:pb-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className={H2}>
                Latest <span className="text-low">news</span>
              </h2>
              <p className="mt-3 max-w-[36em] text-[1.0625rem] text-muted">
                Official rule changes for the certifications we cover, from the Federal Register, the eCFR and agency
                sites. Always marked proposed or final.
              </p>
            </div>
            <Link href="/news/" className="font-bold text-low underline">
              All news
            </Link>
          </div>
          <div className="mt-8">
            <NewsGrid posts={newsCards(latest)} filters />
          </div>
        </section>
      ) : null}
    </main>
  );
}
