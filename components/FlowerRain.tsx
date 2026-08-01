"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

type FlowerRainProps = {
  onFinish: () => void;
};

const FLOWER_RAIN_DURATION_MS = 3600;
const REDUCED_MOTION_DURATION_MS = 650;
const FLOWER_COUNT = 44;
const FLOWER_GLYPHS = ["✿", "✽", "✾", "✤"];
const FLOWER_COLORS = ["#2e1065", "#581c87", "#7e22ce", "#9d174d", "#be185d"];

function createFlowerRainItems() {
  return Array.from({ length: FLOWER_COUNT }, (_, index) => {
    const column = -6 + ((index * 41) % 112);
    const drift = ((index * 23) % 42) - 21;
    const size = 76 + ((index * 17) % 92);
    const delay = (index * 59) % 1100;
    const duration = 2300 + ((index * 113) % 1300);
    const opacity = 0.72 + ((index * 7) % 24) / 100;

    return {
      color: FLOWER_COLORS[index % FLOWER_COLORS.length],
      delay,
      drift,
      duration,
      glyph: FLOWER_GLYPHS[index % FLOWER_GLYPHS.length],
      id: index,
      left: column,
      opacity,
      size,
    };
  });
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function FlowerRain({ onFinish }: FlowerRainProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const flowers = useMemo(createFlowerRainItems, []);

  useEffect(() => {
    const shouldReduceMotion = prefersReducedMotion();
    const duration = shouldReduceMotion
      ? REDUCED_MOTION_DURATION_MS
      : FLOWER_RAIN_DURATION_MS;

    setIsReducedMotion(shouldReduceMotion);

    const finishTimer = window.setTimeout(onFinish, duration);
    return () => window.clearTimeout(finishTimer);
  }, [onFinish]);

  return (
    <div
      aria-hidden="true"
      className={`flower-rain ${isReducedMotion ? "flower-rain-reduced" : ""}`}
    >
      <div className="flower-rain-glow" />
      {flowers.map((flower) => (
        <span
          className="flower-rain-petal"
          key={flower.id}
          style={
            {
              "--rain-color": flower.color,
              "--rain-delay": `${flower.delay}ms`,
              "--rain-drift": `${flower.drift}vw`,
              "--rain-duration": `${flower.duration}ms`,
              "--rain-left": `${flower.left}%`,
              "--rain-opacity": flower.opacity,
              "--rain-size": `${flower.size}px`,
            } as CSSProperties
          }
        >
          {flower.glyph}
        </span>
      ))}
    </div>
  );
}
