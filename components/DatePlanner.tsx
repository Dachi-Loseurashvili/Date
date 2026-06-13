"use client";

import { FormEvent, useState } from "react";
import {
  DATE_OPTIONS,
  PLAN_MAX_DATE,
  PLAN_MIN_DATE,
  type DatePlan,
  type DateType,
  type PlanApiResponse,
} from "@/lib/plan";
import { FateWheel } from "@/components/FateWheel";

type DatePlannerProps = {
  onComplete: (plan: DatePlan, configured: boolean) => void;
};

type SubmitState = "idle" | "submitting" | "error";

export function DatePlanner({ onComplete }: DatePlannerProps) {
  const [dateType, setDateType] = useState<DateType | "">("");
  const [selectedDate, setSelectedDate] = useState(PLAN_MIN_DATE);
  const [selectedTime, setSelectedTime] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const canSubmit =
    dateType !== "" && selectedDate !== "" && submitState !== "submitting";

  function handleDateChange(value: string) {
    if (!value) {
      setSelectedDate("");
      return;
    }

    if (value < PLAN_MIN_DATE) {
      setSelectedDate(PLAN_MIN_DATE);
      return;
    }

    if (value > PLAN_MAX_DATE) {
      setSelectedDate(PLAN_MAX_DATE);
      return;
    }

    setSelectedDate(value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!dateType || !selectedDate) {
      return;
    }

    const plan: DatePlan = {
      dateType,
      selectedDate,
      selectedTime: selectedTime || undefined,
      submittedAt: new Date().toISOString(),
    };

    setSubmitState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/plan", {
        body: JSON.stringify(plan),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const body = (await response.json().catch(() => null)) as
        | PlanApiResponse
        | null;

      if (!response.ok || !body?.ok) {
        const message =
          body && !body.ok
            ? body.error
            : "The paperwork jammed. Try submitting it again.";
        throw new Error(message);
      }

      onComplete(plan, body.configured);
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The paperwork jammed. Try submitting it again.",
      );
    }
  }

  return (
    <article className="rounded-lg border border-purple-100/80 bg-white/90 px-6 py-7 shadow-soft backdrop-blur sm:px-8 sm:py-8">
      <div className="text-center">
        <p className="text-sm font-semibold text-purple-600">
          kargi xo
        </p>
        <h1 className="mt-3 text-2xl font-bold leading-tight text-purple-950 sm:text-3xl">
          rogor dateze mivdivart?
        </h1>
      </div>

      <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
        <FateWheel />

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-purple-900">
            Date type
          </span>
          <select
            className="w-full rounded-md border border-purple-100 bg-white px-3 py-3 text-sm text-purple-950 shadow-sm outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
            onChange={(event) =>
              setDateType(event.target.value as DateType | "")
            }
            value={dateType}
          >
            <option value="">aarchie idea:</option>
            {DATE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-[1fr_0.72fr]">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-purple-900">
              Date
            </span>
            <input
              className="w-full rounded-md border border-purple-100 bg-white px-3 py-3 text-sm text-purple-950 shadow-sm outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
              max={PLAN_MAX_DATE}
              min={PLAN_MIN_DATE}
              onChange={(event) => handleDateChange(event.target.value)}
              type="date"
              value={selectedDate}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-purple-500">
              Time
            </span>
            <input
              className="w-full rounded-md border border-purple-100 bg-white px-3 py-3 text-sm text-purple-900 shadow-sm outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
              onChange={(event) => setSelectedTime(event.target.value)}
              type="time"
              value={selectedTime}
            />
          </label>
        </div>

        <button
          className="w-full rounded-full bg-purple-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-150 ease-out hover:-translate-y-0.5 hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-900 active:translate-y-0 disabled:cursor-not-allowed disabled:bg-purple-200 disabled:text-purple-500 disabled:shadow-none disabled:hover:translate-y-0"
          disabled={!canSubmit}
          type="submit"
        >
          {submitState === "submitting"
            ? "Filing the paperwork..."
            : "Daaconfirme"}
        </button>

        <p
          aria-live="polite"
          className="min-h-5 text-center text-sm font-medium text-purple-700"
        >
          {submitState === "error" ? errorMessage : ""}
        </p>
      </form>
    </article>
  );
}
