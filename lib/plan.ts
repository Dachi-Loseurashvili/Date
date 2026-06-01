export const DATE_OPTIONS = [
  "Coffee",
  "Dinner",
  "Movie",
  "Gaseirneba",
  "Siurprizi (me avarchev)",
  "sxva idea (instagramze momcere)",
] as const;

export const PLAN_YEAR = "2026";
export const PLAN_MIN_DATE = `${PLAN_YEAR}-01-01`;
export const PLAN_MAX_DATE = `${PLAN_YEAR}-12-31`;

export type DateType = (typeof DATE_OPTIONS)[number];

export type DatePlan = {
  dateType: DateType;
  selectedDate: string;
  selectedTime?: string;
  submittedAt: string;
};

export type PlanApiResponse =
  | {
      ok: true;
      configured: boolean;
    }
  | {
      ok: false;
      configured: boolean;
      error: string;
      status?: number;
    };

type ValidationResult =
  | {
      ok: true;
      plan: DatePlan;
    }
  | {
      ok: false;
      error: string;
    };

export function isDateType(value: unknown): value is DateType {
  return typeof value === "string" && DATE_OPTIONS.includes(value as DateType);
}

export function isCalendarDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

export function isPlanDate(value: unknown): value is string {
  return (
    isCalendarDate(value) &&
    value >= PLAN_MIN_DATE &&
    value <= PLAN_MAX_DATE
  );
}

export function isTimeInput(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{2}:\d{2}$/.test(value)) {
    return false;
  }

  const [hour, minute] = value.split(":").map(Number);
  return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
}

export function validatePlanPayload(value: unknown): ValidationResult {
  if (!value || typeof value !== "object") {
    return { ok: false, error: "Expected a JSON object." };
  }

  const payload = value as Record<string, unknown>;

  if (!isDateType(payload.dateType)) {
    return { ok: false, error: "Invalid date type." };
  }

  if (!isPlanDate(payload.selectedDate)) {
    return { ok: false, error: "Selected date must be in 2026." };
  }

  if (
    payload.selectedTime !== undefined &&
    payload.selectedTime !== "" &&
    !isTimeInput(payload.selectedTime)
  ) {
    return { ok: false, error: "Invalid selected time." };
  }

  if (
    typeof payload.submittedAt !== "string" ||
    Number.isNaN(Date.parse(payload.submittedAt))
  ) {
    return { ok: false, error: "Invalid submission timestamp." };
  }

  return {
    ok: true,
    plan: {
      dateType: payload.dateType,
      selectedDate: payload.selectedDate,
      selectedTime:
        typeof payload.selectedTime === "string" && payload.selectedTime
          ? payload.selectedTime
          : undefined,
      submittedAt: payload.submittedAt,
    },
  };
}

export function formatDateLabel(value: string): string {
  if (!isCalendarDate(value)) {
    return value;
  }

  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export function formatPlanSummary(plan: DatePlan): string {
  const lines = [
    "Chveni date",
    `Plan: ${plan.dateType}`,
    `Date: ${formatDateLabel(plan.selectedDate)}`,
  ];

  if (plan.selectedTime) {
    lines.push(`Time: ${plan.selectedTime}`);
  }

  return lines.join("\n");
}
