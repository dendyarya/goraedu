"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Choice, Question } from "@/lib/questions";
import { clearIds, recordAnswer, statsFor, type QuestionStat } from "@/lib/progress";

const CHOICES: Choice[] = ["A", "B", "C", "D"];

function shuffle<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function formatChecked(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

type Phase = "start" | "quiz" | "done";

/**
 * Practice mode: one question at a time, the explanation and its official source right after each answer,
 * then a score by topic and a review of missed questions. Everything stays in the browser.
 */
export default function PracticeTest({
  title,
  questions,
  drawPerTopic,
  drawTotal,
  passPct,
  passNote,
}: {
  title: string;
  questions: Question[];
  /** Exam mode: each start draws this many random questions from every topic, and there is no topic filter. */
  drawPerTopic?: number;
  /** Exam mode: each start draws this many random questions from the whole bank. */
  drawTotal?: number;
  /** Exam mode: the passing score (percent) set by the official source, shown next to the practice score. */
  passPct?: number;
  /** Exam mode: where the passing score comes from, shown with it. */
  passNote?: string;
}) {
  const exam = Boolean(drawPerTopic || drawTotal);
  const topics = useMemo(() => [...new Set(questions.map((q) => q.topic))], [questions]);
  const [phase, setPhase] = useState<Phase>("start");
  const [topic, setTopic] = useState<string>("all");
  const [order, setOrder] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Choice>>({});
  const [stats, setStats] = useState<Record<string, QuestionStat> | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const current = order[index];
  const picked = current ? answers[current.id] : undefined;
  const answered = picked !== undefined;

  function start(list: Question[]) {
    setOrder(shuffle(list));
    setIndex(0);
    setAnswers({});
    setPhase("quiz");
  }

  function pick(c: Choice) {
    if (!current || answered) return;
    setAnswers((a) => ({ ...a, [current.id]: c }));
    recordAnswer(current.id, c === current.answer);
  }

  // Progress saved on this device; read after mount so server and client markup match.
  useEffect(() => {
    if (phase === "quiz") return;
    const id = window.requestAnimationFrame(() => setStats(statsFor(questions.map((q) => q.id))));
    return () => window.cancelAnimationFrame(id);
  }, [phase, questions]);

  function next() {
    if (index + 1 < order.length) setIndex(index + 1);
    else setPhase("done");
  }

  // Move focus so keyboard and screen-reader users follow the flow.
  useEffect(() => {
    if (answered) feedbackRef.current?.focus();
  }, [answered]);
  useEffect(() => {
    if (phase !== "start") headingRef.current?.focus();
  }, [phase, index]);

  // Keys A-D (or 1-4) answer; Enter goes to the next question.
  useEffect(() => {
    if (phase !== "quiz") return;
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      const k = e.key.toUpperCase();
      const i = ["1", "2", "3", "4"].indexOf(k);
      const c = (CHOICES as string[]).includes(k) ? (k as Choice) : i >= 0 ? CHOICES[i] : undefined;
      if (c && !answered) pick(c);
      else if (e.key === "Enter" && answered && document.activeElement?.tagName !== "BUTTON") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const pool = topic === "all" ? questions : questions.filter((q) => q.topic === topic);

  function draw() {
    if (drawTotal) return shuffle(questions).slice(0, drawTotal);
    return topics.flatMap((t) => shuffle(questions.filter((q) => q.topic === t)).slice(0, drawPerTopic));
  }

  if (phase === "start" && exam) {
    const size = drawTotal
      ? Math.min(drawTotal, questions.length)
      : topics.reduce((n, t) => n + Math.min(drawPerTopic!, questions.filter((q) => q.topic === t).length), 0);
    return (
      <div className="rounded-3xl border border-line bg-panel p-6 sm:p-8">
        <h2 className="text-[1.5rem] font-bold">{title}</h2>
        <p className="mt-2 text-muted">
          {drawTotal
            ? `Each exam draws ${size} random questions from our bank of ${questions.length}.`
            : `Each exam draws ${drawPerTopic} random questions from each of ${new Intl.ListFormat("en-US").format(topics)}, ${size} questions in all, from our bank of ${questions.length}.`}{" "}
          Start again for a new draw. After each answer you see why it is right, with a link to the official source, and
          your results are shown by {drawTotal ? "topic" : "section"}.
        </p>
        {passPct ? (
          <p className="mt-3 text-[0.9375rem]">
            Passing score: <strong>{passPct}%</strong> ({Math.ceil((size * passPct) / 100)} of {size}).{" "}
            {passNote ? <span className="text-muted">{passNote}</span> : null}
          </p>
        ) : null}
        <div className="mt-6">
          <button
            type="button"
            onClick={() => start(draw())}
            className="rounded-full bg-low px-5 py-3 font-semibold text-white hover:brightness-110"
          >
            Start the exam ({size} questions)
          </button>
        </div>
        <p className="mt-4 text-[0.875rem] text-muted">
          Tip: press A, B, C or D to answer and Enter for the next question. Nothing you answer leaves your browser.
        </p>
      </div>
    );
  }

  if (phase === "start") {
    return (
      <div className="rounded-3xl border border-line bg-panel p-6 sm:p-8">
        <h2 className="text-[1.5rem] font-bold">{title}</h2>
        <p className="mt-2 text-muted">
          {questions.length} questions across {topics.length} topics. After each answer you see why it is right, with a
          link to the official source.
        </p>
        <label className="mt-6 block text-[0.9375rem] font-medium" htmlFor="topic">
          Topic
        </label>
        <select
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mt-2 w-full max-w-md rounded-2xl border border-line bg-paper px-3 py-2.5"
        >
          <option value="all">All topics ({questions.length} questions)</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t} ({questions.filter((q) => q.topic === t).length})
            </option>
          ))}
        </select>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => start(pool)}
            className="rounded-full bg-low px-5 py-3 font-semibold text-white hover:brightness-110"
          >
            Start practice ({pool.length} questions)
          </button>
        </div>
        <Progress
          questions={questions}
          stats={stats}
          onStart={start}
          onClear={() => {
            clearIds(questions.map((q) => q.id));
            setStats({});
          }}
        />
        <p className="mt-4 text-[0.875rem] text-muted">
          Tip: press A, B, C or D to answer and Enter for the next question. Nothing you answer leaves your browser.
        </p>
      </div>
    );
  }

  if (phase === "done") {
    const correct = order.filter((q) => answers[q.id] === q.answer);
    const missed = order.filter((q) => answers[q.id] !== q.answer);
    const pct = Math.round((correct.length / order.length) * 100);
    const byTopic = topics
      .filter((t) => order.some((q) => q.topic === t))
      .map((t) => {
        const qs = order.filter((q) => q.topic === t);
        return { t, total: qs.length, right: qs.filter((q) => answers[q.id] === q.answer).length };
      });
    return (
      <div className="rounded-3xl border border-line bg-panel p-6 sm:p-8">
        <h2 ref={headingRef} tabIndex={-1} className="text-[1.5rem] font-bold outline-none">
          You answered {correct.length} of {order.length} correctly ({pct}%)
        </h2>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-line" aria-hidden="true">
          <div className="h-full rounded-full bg-low" style={{ width: `${pct}%` }} />
        </div>
        {passPct ? (
          <p className="mt-3 font-semibold">
            Passing score: {passPct}% ({Math.ceil((order.length * passPct) / 100)} of {order.length}). Your practice
            score {pct >= passPct ? "reaches" : "is below"} it.
          </p>
        ) : null}
        <p className="mt-3 text-[0.9375rem] text-muted">
          This is a practice score, not a prediction of your result on the official exam.
        </p>

        <h3 className="mt-8 text-[1.1875rem] font-bold">{drawPerTopic ? "By section" : "By topic"}</h3>
        <table className="mt-3 w-full max-w-xl border-collapse text-left text-[0.9375rem]">
          <thead>
            <tr className="border-b-2 border-ink">
              <th scope="col" className="py-2 pr-4 font-semibold">
                Topic
              </th>
              <th scope="col" className="py-2 font-semibold">
                Correct
              </th>
            </tr>
          </thead>
          <tbody>
            {byTopic.map((r) => (
              <tr key={r.t} className="border-b border-line">
                <td className="py-2.5 pr-4">{r.t}</td>
                <td className={`py-2.5 font-medium ${r.right === r.total ? "text-low" : ""}`}>
                  {r.right} of {r.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 flex flex-wrap gap-3">
          {missed.length > 0 ? (
            <button
              type="button"
              onClick={() => start(missed)}
              className="rounded-full bg-low px-5 py-3 font-semibold text-white hover:brightness-110"
            >
              Practice the {missed.length} you missed
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setPhase("start")}
            className="rounded-full border border-line px-5 py-3 font-semibold hover:border-low hover:text-low"
          >
            Start over
          </button>
        </div>

        {missed.length > 0 ? (
          <>
            <h3 className="mt-10 text-[1.1875rem] font-bold">Review what you missed</h3>
            <ol className="mt-4 space-y-5">
              {missed.map((q) => (
                <li key={q.id} className="rounded-2xl border border-line p-5">
                  <p className="font-semibold">{q.question}</p>
                  <p className="mt-2 text-[0.9375rem]">
                    <span className="text-high">Your answer: {q.options[answers[q.id]!]}</span>
                    <br />
                    <span className="text-low">Correct answer: {q.options[q.answer]}</span>
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed">{q.explanation}</p>
                  <p className="mt-2 text-[0.875rem] text-muted">
                    Source:{" "}
                    <a href={q.source.url} className="text-low underline" rel="noopener">
                      {q.source.title}
                    </a>
                    , checked {formatChecked(q.checked)}
                  </p>
                </li>
              ))}
            </ol>
          </>
        ) : (
          <p className="mt-8 font-semibold text-low">Every answer correct. Try another topic or start over.</p>
        )}
      </div>
    );
  }

  // Quiz
  const q = current!;
  const progress = Math.round((index / order.length) * 100);
  return (
    <div className="rounded-3xl border border-line bg-panel">
      <div className="border-b border-line px-5 py-4 sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[0.875rem] text-muted">
          <span>
            Question {index + 1} of {order.length}
          </span>
          <span className="rounded-full border border-low/40 bg-low-soft px-2.5 font-medium leading-6 text-low">
            {q.topic}
          </span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
          <div className="h-full rounded-full bg-low transition-[width]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="px-5 pb-6 pt-5 sm:px-7">
        <h2
          ref={headingRef}
          tabIndex={-1}
          id={`q-${q.id}`}
          className="text-[1.1875rem] font-semibold leading-snug outline-none [font-family:var(--font-body)]"
        >
          {q.question}
        </h2>
        <ul className="mt-5 space-y-2.5" aria-labelledby={`q-${q.id}`}>
          {CHOICES.map((c) => {
            const isAnswer = c === q.answer;
            const isPicked = c === picked;
            let state = "border-line hover:border-low hover:bg-low-soft";
            if (answered && isAnswer) state = "border-low bg-low-soft";
            else if (answered && isPicked) state = "border-high bg-high-soft";
            else if (answered) state = "border-line opacity-70";
            return (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => pick(c)}
                  disabled={answered}
                  aria-pressed={isPicked}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-colors disabled:cursor-default ${state}`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-[0.875rem] font-semibold ${
                      answered && isAnswer
                        ? "border-low bg-low text-white"
                        : answered && isPicked
                          ? "border-high bg-high text-white"
                          : "border-line"
                    }`}
                  >
                    {c}
                  </span>
                  <span>{q.options[c]}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div aria-live="polite">
          {answered ? (
            <div ref={feedbackRef} tabIndex={-1} className="mt-5 border-t border-line pt-5 outline-none">
              <p className={`font-semibold ${picked === q.answer ? "text-low" : "text-high"}`}>
                {picked === q.answer ? "Correct." : `Not quite. The answer is ${q.answer}: ${q.options[q.answer]}.`}
              </p>
              <p className="mt-2 leading-relaxed">{q.explanation}</p>
              <p className="mt-3 text-[0.875rem] text-muted">
                Source:{" "}
                <a href={q.source.url} className="text-low underline" rel="noopener">
                  {q.source.title}
                </a>
                , checked {formatChecked(q.checked)}
              </p>
              <button
                type="button"
                onClick={next}
                className="mt-5 rounded-full bg-low px-5 py-3 font-semibold text-white hover:brightness-110"
              >
                {index + 1 < order.length ? "Next question" : "See my results"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** What this device remembers about the set: questions tried, last-answer accuracy, weakest topics, quick reviews. */
function Progress({
  questions,
  stats,
  onStart,
  onClear,
}: {
  questions: Question[];
  stats: Record<string, QuestionStat> | null;
  onStart: (list: Question[]) => void;
  onClear: () => void;
}) {
  if (!stats) return null;
  const tried = questions.filter((q) => stats[q.id]);
  if (tried.length === 0) {
    return (
      <p className="mt-6 text-[0.875rem] text-muted">
        Your answers are remembered on this device only, so you can come back to the ones you missed.
      </p>
    );
  }
  const missed = tried.filter((q) => stats[q.id]!.last === "w");
  const fresh = questions.filter((q) => !stats[q.id]);
  const right = tried.length - missed.length;
  const weak = [...new Set(questions.map((q) => q.topic))]
    .map((t) => {
      const qs = tried.filter((q) => q.topic === t);
      const w = qs.filter((q) => stats[q.id]!.last === "w").length;
      return { t, tried: qs.length, w };
    })
    .filter((x) => x.w > 0)
    .sort((a, b) => b.w / b.tried - a.w / a.tried || b.w - a.w)
    .slice(0, 3);

  return (
    <section aria-labelledby="progress-h" className="mt-8 rounded-2xl border border-line bg-paper p-5">
      <h3 id="progress-h" className="text-[1.0625rem] font-bold">
        Your progress on this device
      </h3>
      <p className="mt-2 text-[0.9375rem]">
        You have tried {tried.length} of {questions.length} questions. Your last answer was right on {right} of them.
      </p>
      {weak.length ? (
        <>
          <p className="mt-3 text-[0.9375rem] font-semibold">Topics to review</p>
          <ul className="mt-1 space-y-1 text-[0.9375rem]">
            {weak.map((x) => (
              <li key={x.t}>
                {x.t}: {x.w} of {x.tried} missed last time
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2.5">
        {missed.length ? (
          <button
            type="button"
            onClick={() => onStart(missed)}
            className="rounded-full bg-low px-4 py-2.5 text-[0.9375rem] font-semibold text-white hover:brightness-110"
          >
            Practice the {missed.length} you missed last time
          </button>
        ) : null}
        {fresh.length ? (
          <button
            type="button"
            onClick={() => onStart(fresh)}
            className="rounded-full border border-line px-4 py-2.5 text-[0.9375rem] font-semibold hover:border-low hover:text-low"
          >
            Practice the {fresh.length} you have not tried
          </button>
        ) : null}
        <button
          type="button"
          onClick={onClear}
          className="rounded-full px-4 py-2.5 text-[0.9375rem] font-semibold text-muted underline hover:text-low"
        >
          Clear my progress for this set
        </button>
      </div>
      <p className="mt-3 text-[0.8125rem] text-muted">
        Saved only in this browser on this device. It is never sent to us.
      </p>
    </section>
  );
}
