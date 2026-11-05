import Link from "next/link";
import { StatusTag } from "@/components/ClusterGrid";
import SampleQuestion, { type SampleQuestionData } from "@/components/SampleQuestion";
import TradeIcon, { IconTile, type IconName } from "@/components/TradeIcon";
import { ALL_CLUSTERS, WITH_FAMILY } from "@/lib/clusters";
import { formatDate, getAllNews } from "@/lib/news";

const EPA_REQUIREMENTS = {
  title: "EPA: Section 608 Technician Certification Requirements",
  url: "https://www.epa.gov/section608/section-608-technician-certification-requirements",
  checked: "Nov 5, 2026",
};

// Answer stated verbatim on the EPA page above (accuracy principle 1).
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
  source: EPA_REQUIREMENTS,
};

const PROMISES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "source",
    title: "Every answer shows its source",
    body: "Each explanation links to the official rule or agency page it comes from, with the date we last checked it.",
  },
  {
    icon: "free",
    title: "Free, with no sign-up",
    body: "Practice runs in your browser. We never ask for your name or email to use a question or a tool.",
  },
  {
    icon: "refresh",
    title: "Updated when the rules change",
    body: "We follow the Federal Register and agency updates, and revise study pages when a change affects the exam.",
  },
];

const FIRST_UP = [
  "Practice tests for Core, Type I, Type II and Type III, plus a 100-question Universal practice exam",
  "Study guides for each section that quote the regulation word for word",
  "Free tools: a leak rate calculator and an evacuation level finder",
  "Every answer linked to the section of 40 CFR Part 82 or the EPA page it comes from",
];

export default function Home() {
  const latest = getAllNews().slice(0, 3);
  const featured = WITH_FAMILY.find((c) => c.id === "epa-608");
  const alsoAvailable = WITH_FAMILY.filter((c) => c.status === "available" && c.id !== "epa-608" && c.href);
  const next = WITH_FAMILY.filter((c) => c.status === "next");

  return (
    <main id="main">
      {/* Hero: the promise on the left, the product itself on the right */}
      <section className="relative overflow-hidden bg-[#10243a] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_78%_45%,rgba(91,147,230,0.22),transparent_70%)]"
        />
        {/* A manifold gauge face drawn large behind the sample question: blue low side, red high side */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 400 400"
          className="pointer-events-none absolute top-[36px] right-[calc(50%-36rem-103px)] hidden h-[760px] w-[760px] opacity-[0.26] lg:block"
        >
          <circle cx="200" cy="200" r="190" fill="none" stroke="#ffffff" strokeWidth="2" />
          <path d="M66 300 A160 160 0 0 1 200 40" fill="none" stroke="#5b93e6" strokeWidth="14" />
          <path d="M200 40 A160 160 0 0 1 334 300" fill="none" stroke="#e0685c" strokeWidth="14" />
          {Array.from({ length: 25 }, (_, i) => {
            const a = ((-120 + i * 10) * Math.PI) / 180;
            const r1 = i % 5 === 0 ? 128 : 138;
            return (
              <line
                key={i}
                x1={200 + r1 * Math.sin(a)}
                y1={200 - r1 * Math.cos(a)}
                x2={200 + 148 * Math.sin(a)}
                y2={200 - 148 * Math.cos(a)}
                stroke="#ffffff"
                strokeWidth={i % 5 === 0 ? 3 : 1.5}
              />
            );
          })}
          <line x1="200" y1="200" x2="262" y2="92" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
          <circle cx="200" cy="200" r="12" fill="#ffffff" />
        </svg>

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <h1 className="text-[2.5rem] font-[750] text-white sm:text-[3.25rem] lg:text-[3.75rem]">
              Practice for your trade certification with answers you can check.
            </h1>
            <p className="mt-5 max-w-[52ch] text-[1.1875rem] leading-relaxed text-[#c3d1de]">
              Free practice questions and study guides for U.S. skilled trades exams, starting with EPA Sections 608 and
              609. Each answer is explained and linked to the official rule behind it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#try"
                className="rounded-[10px] bg-white px-5 py-3 font-semibold text-[#10243a] hover:bg-[#e6eefa] lg:hidden"
              >
                Try a sample question
              </a>
              <Link
                href="/certifications/"
                className="rounded-[10px] border border-white/35 px-5 py-3 font-semibold text-white hover:border-white hover:bg-white/10"
              >
                Browse certifications
              </Link>
            </div>
            <div className="mt-10">
              <p className="text-[0.9375rem] text-[#a9bccd]">Built only from official sources</p>
              <ul className="mt-3 flex flex-wrap gap-2 text-[0.875rem]">
                {["Code of Federal Regulations", "Agency websites", "Federal Register"].map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[#dbe5ee]"
                  >
                    <TradeIcon name="check" size={14} className="text-[#8fb6f2]" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div id="try" className="scroll-mt-6 text-ink">
            <SampleQuestion q={SAMPLE} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <h2 className="text-[1.875rem] font-bold sm:text-[2.25rem]">How goraedu works</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {PROMISES.map((p) => (
            <div key={p.title} className="rounded-2xl border border-line bg-panel p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-low-soft text-low">
                <TradeIcon name={p.icon} />
              </span>
              <h3 className="mt-5 text-[1.25rem] font-bold">{p.title}</h3>
              <p className="mt-2 text-muted">{p.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[0.9375rem]">
          <Link href="/methodology/" className="text-low underline">
            Read how we write and check every question
          </Link>
        </p>
      </section>

      {/* Certifications: the one in progress, the next three, then the full roadmap */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <h2 className="text-[1.875rem] font-bold sm:text-[2.25rem]">Certifications</h2>
          <p className="mt-3 max-w-[60ch] text-muted">
            We finish one certification before starting the next, so each one gets complete practice questions and study
            pages.
          </p>

          {featured ? (
            <article className="mt-10 grid gap-8 rounded-2xl border border-low/30 bg-low-soft/50 p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <IconTile name={featured.family.icon} size={52} />
                  <StatusTag status={featured.status} />
                </div>
                <h3 className="mt-5 text-[1.875rem] font-bold">{featured.name}</h3>
                <p className="mt-2 text-[1.0625rem] text-muted">{featured.summary}</p>
                <p className="mt-3 text-[0.875rem] text-muted">Built from: {featured.source}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/epa-608/core/practice-test/"
                    className="rounded-[10px] bg-low px-5 py-3 font-semibold text-white hover:brightness-110"
                  >
                    Start the Core practice test
                  </Link>
                  {featured.href ? (
                    <Link
                      href={featured.href}
                      className="rounded-[10px] border border-line bg-panel px-5 py-3 font-semibold hover:border-low hover:text-low"
                    >
                      About EPA 608
                    </Link>
                  ) : null}
                </div>
              </div>
              <div className="rounded-xl bg-panel p-5 sm:p-6">
                <h4 className="font-semibold [font-family:var(--font-body)] [font-stretch:100%]">What you get</h4>
                <ul className="mt-3 space-y-3">
                  {FIRST_UP.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-low text-white">
                        <TradeIcon name="check" size={13} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ) : null}

          {alsoAvailable.length > 0 ? (
            <>
              <h3 className="mt-12 text-[1.375rem] font-bold">Also available</h3>
              <ul className="mt-5 grid gap-5 md:grid-cols-3">
                {alsoAvailable.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={c.href!}
                      className="flex h-full flex-col rounded-2xl border border-low/30 bg-low-soft/50 p-6 hover:border-low"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <IconTile name={c.family.icon} />
                        <StatusTag status={c.status} />
                      </div>
                      <h4 className="mt-5 text-[1.1875rem] font-bold">{c.name}</h4>
                      <p className="mt-2 text-[0.9375rem] text-muted">{c.summary}</p>
                      <span className="mt-4 font-semibold text-low">Practice test, study guide and rules</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <h3 className="mt-12 text-[1.375rem] font-bold">Coming next</h3>
          <ul className="mt-5 grid gap-5 md:grid-cols-3">
            {next.map((c) => (
              <li key={c.id} className="flex flex-col rounded-2xl border border-line bg-paper p-6">
                <div className="flex items-start justify-between gap-3">
                  <IconTile name={c.family.icon} />
                  <StatusTag status={c.status} />
                </div>
                <h4 className="mt-5 text-[1.1875rem] font-bold">{c.name}</h4>
                <p className="mt-2 text-[0.9375rem] text-muted">{c.summary}</p>
              </li>
            ))}
          </ul>

          <p className="mt-8">
            <Link
              href="/certifications/"
              className="inline-block rounded-[10px] bg-low px-5 py-3 font-semibold text-white hover:brightness-110"
            >
              See all {ALL_CLUSTERS.length} certifications on our roadmap
            </Link>
          </p>
        </div>
      </section>

      {/* News */}
      {latest.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-[1.875rem] font-bold sm:text-[2.25rem]">Certification news</h2>
            <Link href="/news/" className="text-[0.9375rem] font-medium text-low underline">
              All news
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {latest.map((p) => (
              <li key={p.slug} className="flex flex-col rounded-2xl border border-line bg-panel p-6">
                <p className="flex flex-wrap items-center gap-3 text-[0.875rem] text-muted">
                  <span className="rounded-full border border-low/40 bg-low-soft px-2.5 font-medium leading-6 text-low">
                    {p.topic}
                  </span>
                  <time dateTime={p.published}>{formatDate(p.published)}</time>
                </p>
                <Link
                  href={`/news/${p.slug}/`}
                  className="mt-4 text-[1.1875rem] font-semibold leading-snug hover:text-low hover:underline"
                >
                  {p.title}
                </Link>
                <p className="mt-2 text-[0.9375rem] text-muted">{p.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
