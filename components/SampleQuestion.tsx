"use client";

import { useState } from "react";

export type SampleQuestionData = {
  topic: string;
  question: string;
  options: { id: string; text: string }[];
  answer: string;
  explanation: string;
  source: { title: string; url: string; checked: string };
};

/**
 * One practice question that answers on click: the product in miniature.
 * The verdict is announced to screen readers through the live region.
 */
export default function SampleQuestion({ q }: { q: SampleQuestionData }) {
  const [picked, setPicked] = useState<string | null>(null);
  const answered = picked !== null;
  const correct = picked === q.answer;

  return (
    <div className="rounded-3xl border border-line bg-panel shadow-[0_1px_0_var(--color-line),0_18px_40px_-24px_rgba(16,36,58,0.35)]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3 text-[0.875rem] text-muted">
        <span>Sample question</span>
        <span>{q.topic}</span>
      </div>

      <div className="px-5 pb-5 pt-4">
        <p className="text-[1.0625rem] font-semibold leading-snug" id="sample-q">
          {q.question}
        </p>

        <ul className="mt-4 space-y-2" aria-labelledby="sample-q">
          {q.options.map((o) => {
            const isAnswer = o.id === q.answer;
            const isPicked = o.id === picked;
            let state = "border-line hover:border-low hover:bg-low-soft";
            if (answered && isAnswer) state = "border-low bg-low-soft";
            else if (answered && isPicked) state = "border-high bg-high-soft";
            else if (answered) state = "border-line opacity-70";
            return (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => setPicked(o.id)}
                  disabled={answered}
                  aria-pressed={isPicked}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-colors disabled:cursor-default ${state}`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[0.875rem] font-semibold ${
                      answered && isAnswer
                        ? "border-low bg-low text-white"
                        : answered && isPicked
                          ? "border-high bg-high text-white"
                          : "border-line"
                    }`}
                  >
                    {o.id}
                  </span>
                  <span>{o.text}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div aria-live="polite">
          {answered ? (
            <div className="mt-4 border-t border-line pt-4">
              <p className={`font-semibold ${correct ? "text-low" : "text-high"}`}>
                {correct ? "Correct." : `Not quite. The answer is ${q.answer}.`}
              </p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed">{q.explanation}</p>
              <p className="mt-3 text-[0.875rem] text-muted">
                Source:{" "}
                <a href={q.source.url} className="text-low underline" rel="noopener">
                  {q.source.title}
                </a>
                , checked {q.source.checked}
              </p>
              <button
                type="button"
                onClick={() => setPicked(null)}
                className="mt-3 text-[0.875rem] font-medium text-low underline"
              >
                Try again
              </button>
            </div>
          ) : (
            <p className="mt-4 text-[0.875rem] text-muted">Pick an answer to see the explanation and its source.</p>
          )}
        </div>
      </div>
    </div>
  );
}
