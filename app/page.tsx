import Link from "next/link";
import SampleQuestion, { type SampleQuestionData } from "@/components/SampleQuestion";
import { formatDate, getAllNews } from "@/lib/news";

const EPA_REQUIREMENTS = {
  title: "EPA: Section 608 Technician Certification Requirements",
  url: "https://www.epa.gov/section608/section-608-technician-certification-requirements",
  checked: "Nov 5, 2026",
};

// Answer stated verbatim on the EPA page above (accuracy principle 1).
const SAMPLE: SampleQuestionData = {
  topic: "Certification types",
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

const TYPES = [
  { name: "Type I", covers: "Servicing small appliances" },
  {
    name: "Type II",
    covers: "Servicing or disposing of high- or very high-pressure appliances, except small appliances and MVACs",
  },
  { name: "Type III", covers: "Servicing or disposing of low-pressure appliances" },
  { name: "Universal", covers: "Servicing all types of equipment" },
];

const PROMISES = [
  {
    title: "Every answer shows its source",
    body: "Each explanation links to the EPA rule or page it comes from, with the date we last checked it.",
  },
  {
    title: "Free, with no sign-up",
    body: "Practice runs in your browser. We do not ask for your name or email to use any question or tool.",
  },
  {
    title: "Updated when EPA changes the rules",
    body: "We follow the Federal Register and update study pages when a change affects technicians.",
  },
];

export default function Home() {
  const latest = getAllNews().slice(0, 3);

  return (
    <main id="main">
      {/* Hero: the promise on the left, the product itself on the right */}
      <section className="relative overflow-hidden bg-[#10243a] text-white">
        {/* A manifold gauge face drawn large behind the headline: blue low side, red high side */}
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
              Study for the EPA 608 exam with answers you can check.
            </h1>
            <p className="mt-5 max-w-[52ch] text-[1.1875rem] leading-relaxed text-[#c3d1de]">
              Free practice questions for Core, Type I, Type II, Type III and Universal. Each answer is explained and
              linked to the official EPA rule behind it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#try"
                className="rounded-md bg-white px-5 py-3 font-semibold text-[#10243a] hover:bg-[#e6eefa] lg:hidden"
              >
                Try a sample question
              </a>
              <span className="text-[0.9375rem] text-[#a9bccd]">Full practice tests are coming soon.</span>
            </div>
          </div>
          <div id="try" className="scroll-mt-6 text-ink">
            <SampleQuestion q={SAMPLE} />
          </div>
        </div>
      </section>

      {/* What makes it different */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-[1.875rem] font-bold sm:text-[2.25rem]">How goraedu works</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {PROMISES.map((p) => (
            <div key={p.title} className="border-t-2 border-ink pt-4">
              <h3 className="text-[1.25rem] font-bold">{p.title}</h3>
              <p className="mt-2 text-muted">{p.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[0.9375rem]">
          <Link href="/methodology/" className="text-low underline">
            Read how we write and check every question
          </Link>
        </p>
      </section>

      {/* EPA 608 at a glance, in EPA's own words */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <h2 className="text-[1.875rem] font-bold sm:text-[2.25rem]">The four certification types</h2>
              <p className="mt-4 text-muted">
                Technicians who service or dispose of refrigeration and air-conditioning equipment must pass an
                EPA-approved test for the type of equipment they work on. EPA states that Section 608 certification
                credentials do not expire.
              </p>
            </div>
            <div>
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">EPA Section 608 technician certification types</caption>
                <thead>
                  <tr className="border-b-2 border-ink">
                    <th scope="col" className="w-32 py-2 pr-4 font-semibold">
                      Type
                    </th>
                    <th scope="col" className="py-2 font-semibold">
                      What it covers
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TYPES.map((t) => (
                    <tr key={t.name} className="border-b border-line align-top">
                      <th
                        scope="row"
                        className="py-3.5 pr-4 font-[family-name:var(--font-display)] text-[1.1875rem] font-bold [font-stretch:88%]"
                      >
                        {t.name}
                      </th>
                      <td className="py-3.5">{t.covers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-[0.875rem] text-muted">
                Source:{" "}
                <a href={EPA_REQUIREMENTS.url} className="text-low underline" rel="noopener">
                  {EPA_REQUIREMENTS.title}
                </a>
                , checked {EPA_REQUIREMENTS.checked}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      {latest.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-[1.875rem] font-bold sm:text-[2.25rem]">EPA rule changes</h2>
            <Link href="/news/" className="text-[0.9375rem] font-medium text-low underline">
              All news
            </Link>
          </div>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {latest.map((p) => (
              <li key={p.slug} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <time dateTime={p.published} className="text-[0.9375rem] text-muted">
                  {formatDate(p.published)}
                </time>
                <div>
                  <Link
                    href={`/news/${p.slug}/`}
                    className="text-[1.1875rem] font-semibold hover:text-low hover:underline"
                  >
                    {p.title}
                  </Link>
                  <p className="mt-1 text-muted">{p.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
