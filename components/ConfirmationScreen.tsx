"use client";

import { useMemo, useState } from "react";
import { type DatePlan, formatPlanSummary } from "@/lib/plan";

type ConfirmationScreenProps = {
  configured: boolean;
  onReset: () => void;
  plan: DatePlan;
};

export function ConfirmationScreen({
  configured,
  onReset,
  plan,
}: ConfirmationScreenProps) {
  const [copyStatus, setCopyStatus] = useState("");
  const summary = useMemo(() => formatPlanSummary(plan), [plan]);

  async function copyPlan() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopyStatus("Copied.");
    } catch {
      setCopyStatus("Copy failed. The summary text is selectable.");
    }
  }

  return (
    <article className="rounded-lg border border-purple-100/80 bg-white/90 px-6 py-7 text-center shadow-soft backdrop-blur sm:px-8 sm:py-8">
      <p className="text-sm font-semibold text-purple-600">
        (kamerashi gxedav dzaan lamazi xar)
      </p>
      <h1 className="mt-3 text-2xl font-bold leading-tight text-purple-950 sm:text-3xl">
        Date chanishnulia
      </h1>

      {!configured ? (
        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-purple-800/80">
          Daascreenshote es da instagramze gamomigzavne, saiti armushaobs 😔💔
        </p>
      ) : (
        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-purple-800/80">
          Gegma gadagzavnilia maghla
        </p>
      )}

      <pre className="mt-6 whitespace-pre-wrap rounded-lg border border-purple-100 bg-purple-50/70 p-4 text-left text-sm leading-6 text-purple-950">
        {summary}
      </pre>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          className="flex-1 rounded-full bg-purple-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-150 ease-out hover:-translate-y-0.5 hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-900 active:translate-y-0"
          onClick={copyPlan}
          type="button"
        >
          Copy
        </button>
        <button
          className="flex-1 rounded-full border border-purple-100 bg-white px-5 py-3 text-sm font-semibold text-purple-800 shadow-sm transition duration-150 ease-out hover:-translate-y-0.5 hover:border-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-900 active:translate-y-0"
          onClick={onReset}
          type="button"
        >
          axlidan dackeba
        </button>
      </div>

      <p aria-live="polite" className="mt-4 min-h-5 text-sm text-purple-800/80">
        {copyStatus}
      </p>
    </article>
  );
}
