import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import SourceList, { type Source } from "@/components/SourceList";
import { formatDate } from "@/lib/news";

export const metadata: Metadata = {
  title: "EPA 608 Passing Score and Exam Format",
  description:
    "The EPA 608 passing score is 70 percent (84 percent for mail-in Type I tests). How many questions each test has, how it is proctored, and when results arrive, from 40 CFR Part 82.",
  alternates: { canonical: "/epa-608/guide/passing-score/" },
};

const CHECKED = "2026-11-05";
const APPENDIX_D: Source = {
  title:
    "eCFR: 40 CFR Part 82, Subpart F, Appendix D, Standards for Becoming a Certifying Program for Technicians (as of Nov 3, 2026)",
  url: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-F",
  checked: CHECKED,
};

const TESTS = [
  { test: "Type I (on-site)", questions: "50", core: "25", sector: "25 Type I", pass: "70%", needed: "35" },
  { test: "Type I (mail-in)", questions: "50", core: "25", sector: "25 Type I", pass: "84%", needed: "42" },
  { test: "Type II", questions: "50", core: "25", sector: "25 Type II", pass: "70%", needed: "35" },
  { test: "Type III", questions: "50", core: "25", sector: "25 Type III", pass: "70%", needed: "35" },
  {
    test: "Universal",
    questions: "100",
    core: "25",
    sector: "75 (25 each of Type I, II and III)",
    pass: "70%",
    needed: "70",
  },
];

function Label({ kind }: { kind: "official" | "calc" }) {
  return kind === "official" ? (
    <span className="rounded-full border border-low/40 bg-low-soft px-2 text-[0.75rem] font-medium leading-5 text-low">
      Official data
    </span>
  ) : (
    <span className="rounded-full border border-hose/60 bg-hose-soft px-2 text-[0.75rem] font-medium leading-5 text-hose-ink">
      Our calculation
    </span>
  );
}

export default function PassingScorePage() {
  return (
    <PageShell
      crumbs={[{ label: "Home", href: "/" }, { label: "EPA 608", href: "/epa-608/" }, { label: "Passing score" }]}
      title="EPA 608 passing score and exam format"
      lead="The passing score for the closed-book EPA 608 Type I, Type II, Type III and Universal tests is 70 percent. Mail-in Type I tests need 84 percent."
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <div className="max-w-[72ch]">
        <section>
          <h2 className="text-[1.75rem] font-bold">Questions and passing score by test</h2>
          <p className="mt-3 text-muted">
            Every test has 25 questions from Group I (the Core topics) plus 25 from each technical group it covers.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left text-[0.9375rem]">
              <caption className="sr-only">EPA 608 test length and passing score</caption>
              <thead>
                <tr className="border-b-2 border-ink align-bottom">
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Test
                  </th>
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Questions
                  </th>
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Core (Group I)
                  </th>
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Technical (Group II)
                  </th>
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Passing score <Label kind="official" />
                  </th>
                  <th scope="col" className="py-2 font-semibold">
                    Correct answers needed <Label kind="calc" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {TESTS.map((t) => (
                  <tr key={t.test} className="border-b border-line align-top">
                    <th scope="row" className="py-3 pr-4 font-semibold">
                      {t.test}
                    </th>
                    <td className="py-3 pr-4">{t.questions}</td>
                    <td className="py-3 pr-4">{t.core}</td>
                    <td className="py-3 pr-4">{t.sector}</td>
                    <td className="py-3 pr-4 font-semibold">{t.pass}</td>
                    <td className="py-3">
                      {t.needed} of {t.questions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[0.875rem] text-muted">
            &quot;Correct answers needed&quot; is the passing percentage applied to the number of questions, rounded up.
            The regulation states the percentage, not the count.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-[1.75rem] font-bold">How the tests are given</h2>
          <ul className="mt-4 list-disc space-y-2.5 pl-6">
            <li>
              Type II, Type III and Universal tests are closed-book and proctored, in a secure environment, by an
              EPA-approved certifying program.
            </li>
            <li>
              Type I can be taken on-site or by mail when the program offers only Type I. A mail-in Type I test cannot
              be used toward Universal certification.
            </li>
            <li>
              Universal can be taken all at once, or earned by combining passing scores on separate Type I, Type II and
              Type III tests.
            </li>
            <li>Proctors check photo identification, such as a driver&apos;s license or passport.</li>
            <li>Programs must use several versions of the test at each testing event.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-[1.75rem] font-bold">What the questions cover</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-line bg-panel p-5">
              <h3 className="text-[1.1875rem] font-bold">Group I (Core)</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Environmental impact of CFCs, HCFCs and substitute refrigerants</li>
                <li>Laws and regulations</li>
                <li>Changing industry outlook</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-line bg-panel p-5">
              <h3 className="text-[1.1875rem] font-bold">Group II (Type I, II or III)</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Leak detection</li>
                <li>Recovery techniques</li>
                <li>Safety</li>
                <li>Shipping</li>
                <li>Disposal</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-[1.75rem] font-bold">Results and your card</h2>
          <ul className="mt-4 list-disc space-y-2.5 pl-6">
            <li>The certifying program must give you your result no later than 30 days after the test.</li>
            <li>
              If you pass, it must issue a wallet-sized identification card no later than 30 days after the test. For
              mail-in Type I tests, both deadlines count from the day the program receives your completed test and any
              required documentation.
            </li>
            <li>
              The card shows the program&apos;s name and the date it was approved by EPA, your name, your certification
              type and a unique number that does not include your Social Security number.
            </li>
          </ul>
        </section>

        <section className="mt-12 rounded-3xl border border-low/30 bg-low-soft/50 p-6">
          <h2 className="text-[1.375rem] font-bold">Practice before the test</h2>
          <p className="mt-2">
            Try our free{" "}
            <Link href="/epa-608/core/practice-test/" className="text-low underline">
              EPA 608 Core practice test
            </Link>{" "}
            and the other sections listed on the{" "}
            <Link href="/epa-608/" className="text-low underline">
              EPA 608 page
            </Link>
            . A practice score is not a prediction of your official result.
          </p>
        </section>

        <div className="mt-12">
          <SourceList
            sources={[APPENDIX_D]}
            note={<>Independent. Not affiliated with or endorsed by the U.S. EPA or any certifying organization.</>}
          />
        </div>
      </div>
    </PageShell>
  );
}
