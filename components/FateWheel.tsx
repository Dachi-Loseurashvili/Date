"use client";

import { useEffect, useRef, useState } from "react";

type FateWheelOption = {
  label: string;
  positive: boolean;
  angle: number;
};

const FATE_WHEEL_OPTIONS: FateWheelOption[] = [
  { label: "ki", positive: true, angle: 0 },
  { label: "ara", positive: false, angle: 36 },
  { label: "100%", positive: true, angle: 72 },
  { label: "ew", positive: false, angle: 108 },
  { label: "ratqmaunda", positive: true, angle: 144 },
  { label: "aratqo", positive: false, angle: 180 },
  { label: "dghesve", positive: true, angle: 216 },
  { label: "araa", positive: false, angle: 252 },
  { label: "kii", positive: true, angle: 288 },
  { label: "obviously", positive: true, angle: 324 },
];

const POSITIVE_OPTIONS = FATE_WHEEL_OPTIONS.filter((option) => option.positive);
const DEFAULT_SPIN_DURATION_MS = 2600;
const REDUCED_MOTION_SPIN_DURATION_MS = 120;
const FULL_TURNS = 6;

function normalizeDegrees(degrees: number) {
  return ((degrees % 360) + 360) % 360;
}

function getLabelPosition(angle: number) {
  const radius = 39;
  const radians = (angle * Math.PI) / 180;

  return {
    left: `${50 + Math.sin(radians) * radius}%`,
    top: `${50 - Math.cos(radians) * radius}%`,
  };
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function FateWheel() {
  const [rotation, setRotation] = useState(0);
  const [durationMs, setDurationMs] = useState(DEFAULT_SPIN_DURATION_MS);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleSpin() {
    if (isSpinning) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const selectedOption =
      POSITIVE_OPTIONS[Math.floor(Math.random() * POSITIVE_OPTIONS.length)];
    const shouldReduceMotion = prefersReducedMotion();
    const spinDuration = shouldReduceMotion
      ? REDUCED_MOTION_SPIN_DURATION_MS
      : DEFAULT_SPIN_DURATION_MS;
    const fullTurns = shouldReduceMotion ? 0 : FULL_TURNS;
    const currentAngle = normalizeDegrees(rotation);
    const angleToTarget = normalizeDegrees(selectedOption.angle - currentAngle);
    const finalRotation = rotation + fullTurns * 360 + angleToTarget;

    setResult(null);
    setDurationMs(spinDuration);
    setIsSpinning(true);
    setRotation(finalRotation);

    timeoutRef.current = setTimeout(() => {
      setResult(selectedOption.label);
      setIsSpinning(false);
    }, spinDuration + 40);
  }

  return (
    <section className="rounded-lg border border-purple-100 bg-purple-50/70 p-4 shadow-sm sm:p-5">
      <div className="text-center">
        <h2 className="text-lg font-bold text-purple-950">bediscera</h2>
        <p className="mt-1 text-xs font-medium text-purple-500">
          beds miende. unda cavidet dateze?
        </p>
      </div>

      <div className="mx-auto mt-4 aspect-square w-full max-w-[17rem] rounded-full border border-purple-100 bg-white/85 p-3 shadow-inner">
        <div className="relative h-full w-full rounded-full bg-gradient-to-br from-purple-50 via-white to-pink-50">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 origin-center ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDuration: isSpinning ? `${durationMs}ms` : "0ms",
              transitionProperty: "transform",
            }}
          >
            <span className="absolute left-1/2 top-[12%] h-[38%] w-1 -translate-x-1/2 rounded-full bg-purple-800 shadow-sm" />
            <span className="absolute left-1/2 top-[8%] h-3 w-3 -translate-x-1/2 rounded-full bg-fuchsia-400 ring-4 ring-white" />
          </div>

          {FATE_WHEEL_OPTIONS.map((option) => (
            <span
              className={[
                "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.68rem] font-bold shadow-sm sm:text-xs",
                option.positive
                  ? "border-purple-200 bg-purple-100 text-purple-900"
                  : "border-pink-100 bg-pink-50 text-pink-400",
              ].join(" ")}
              key={option.label}
              style={getLabelPosition(option.angle)}
            >
              {option.label}
            </span>
          ))}

          <button
            aria-label="Spin the fate wheel"
            className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-purple-900 text-sm font-bold text-white shadow-soft transition hover:-translate-y-[52%] hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-900 active:-translate-y-1/2 disabled:cursor-wait disabled:bg-purple-400 disabled:hover:-translate-y-1/2"
            disabled={isSpinning}
            onClick={handleSpin}
            type="button"
          >
            {isSpinning ? "..." : "spin"}
          </button>
        </div>
      </div>

      <p
        aria-live="polite"
        className="mt-3 min-h-5 text-center text-sm font-bold text-purple-700"
      >
        {result ? `bedisceram tqva: ${result}` : ""}
      </p>
    </section>
  );
}
