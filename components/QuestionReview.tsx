import type { Choice, Question } from "@/lib/questions";

const CHOICES: Choice[] = ["A", "B", "C", "D"];

/**
 * Every question in a set as plain text, grouped by topic, with each answer behind a "Show answer" toggle.
 * Rendered on the server, so the same text is in the page for readers and search engines; the toggles only keep
 * answers out of sight for people who want to try first.
 */
export default function QuestionReview({ title, questions }: { title: string; questions: Question[] }) {
  const topics = [...new Set(questions.map((q) => q.topic))];
  let n = 0;
  return (
    <section aria-labelledby="review" className="mt-14">
      <h2 id="review" className="text-[1.75rem] font-bold">
        Review all {questions.length} questions
      </h2>
      <p className="mt-2 max-w-[65ch] text-muted">
        Prefer to read? Here is every question in the {title} set, grouped by topic. Open a question to see the answer,
        why it is right and the official source.
      </p>
      {topics.map((t) => (
        <div key={t} className="mt-8">
          <h3 className="text-[1.25rem] font-bold">{t}</h3>
          <ol className="mt-3 space-y-4">
            {questions
              .filter((q) => q.topic === t)
              .map((q) => {
                n += 1;
                return (
                  <li key={q.id} id={q.id} className="scroll-mt-6 rounded-2xl border border-line bg-panel p-5">
                    <p className="font-semibold">
                      <span className="text-muted">{n}. </span>
                      {q.question}
                    </p>
                    <ul className="mt-3 space-y-1 text-[0.9375rem]">
                      {CHOICES.map((c) => (
                        <li key={c}>
                          <span className="font-semibold">{c}.</span> {q.options[c]}
                        </li>
                      ))}
                    </ul>
                    <details className="group mt-3">
                      <summary className="cursor-pointer text-[0.9375rem] font-semibold text-low underline">
                        Show answer
                      </summary>
                      <div className="mt-3 border-l-[3px] border-low pl-4 text-[0.9375rem]">
                        <p>
                          <span className="font-semibold">Answer: {q.answer}.</span> {q.options[q.answer]}
                        </p>
                        <p className="mt-2">{q.explanation}</p>
                        <p className="mt-2">
                          Source:{" "}
                          <a href={q.source.url} className="text-low underline" rel="noopener">
                            {q.source.title}
                          </a>
                        </p>
                      </div>
                    </details>
                  </li>
                );
              })}
          </ol>
        </div>
      ))}
    </section>
  );
}
