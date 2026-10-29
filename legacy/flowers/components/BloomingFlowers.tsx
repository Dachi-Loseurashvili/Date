import type { CSSProperties } from "react";

type FlowerVariant = "music" | "invitation";

type FlowerConfig = {
  className: string;
  size: number;
  shape: "round" | "pointed" | "wide" | "ruffled";
  delayMs: number;
  swayMs: number;
  rotate: number;
  stemLength: number;
  stemRotate: number;
  primary: string;
  secondary: string;
  center: string;
};

type BloomingFlowersProps = {
  variant: FlowerVariant;
};

const FLOWERS: Record<FlowerVariant, FlowerConfig[]> = {
  music: [
    {
      className: "flower-music-top-left",
      size: 62,
      shape: "round",
      delayMs: 80,
      swayMs: 3600,
      rotate: -18,
      stemLength: 62,
      stemRotate: 16,
      primary: "#7c3aed",
      secondary: "#f0abfc",
      center: "#facc15",
    },
    {
      className: "flower-music-top-right",
      size: 58,
      shape: "pointed",
      delayMs: 240,
      swayMs: 4200,
      rotate: 14,
      stemLength: 56,
      stemRotate: -14,
      primary: "#dc2626",
      secondary: "#fda4af",
      center: "#fde047",
    },
    {
      className: "flower-music-left",
      size: 54,
      shape: "wide",
      delayMs: 420,
      swayMs: 3900,
      rotate: 22,
      stemLength: 52,
      stemRotate: 22,
      primary: "#2563eb",
      secondary: "#93c5fd",
      center: "#f59e0b",
    },
    {
      className: "flower-music-right",
      size: 70,
      shape: "ruffled",
      delayMs: 620,
      swayMs: 4400,
      rotate: -24,
      stemLength: 70,
      stemRotate: -20,
      primary: "#9333ea",
      secondary: "#fb7185",
      center: "#facc15",
    },
    {
      className: "flower-music-bottom-left",
      size: 60,
      shape: "pointed",
      delayMs: 820,
      swayMs: 4100,
      rotate: -8,
      stemLength: 58,
      stemRotate: 12,
      primary: "#db2777",
      secondary: "#fbcfe8",
      center: "#f97316",
    },
    {
      className: "flower-music-bottom-right",
      size: 52,
      shape: "round",
      delayMs: 1040,
      swayMs: 3700,
      rotate: 28,
      stemLength: 48,
      stemRotate: -16,
      primary: "#0891b2",
      secondary: "#bae6fd",
      center: "#fde047",
    },
    {
      className: "flower-music-header",
      size: 46,
      shape: "wide",
      delayMs: 1220,
      swayMs: 4600,
      rotate: 6,
      stemLength: 38,
      stemRotate: 8,
      primary: "#c026d3",
      secondary: "#a5b4fc",
      center: "#facc15",
    },
  ],
  invitation: [
    {
      className: "flower-invite-top",
      size: 70,
      shape: "ruffled",
      delayMs: 520,
      swayMs: 4300,
      rotate: 18,
      stemLength: 70,
      stemRotate: -14,
      primary: "#7e22ce",
      secondary: "#f0abfc",
      center: "#facc15",
    },
    {
      className: "flower-invite-bottom",
      size: 58,
      shape: "pointed",
      delayMs: 860,
      swayMs: 3900,
      rotate: -20,
      stemLength: 58,
      stemRotate: 18,
      primary: "#ef4444",
      secondary: "#c4b5fd",
      center: "#f59e0b",
    },
  ],
};

export function BloomingFlowers({ variant }: BloomingFlowersProps) {
  return (
    <div
      aria-hidden="true"
      className={`flower-field flower-field-${variant}`}
    >
      {FLOWERS[variant].map((flower) => (
        <span
          className={`flower-shell ${flower.className}`}
          key={flower.className}
          style={
            {
              "--flower-center": flower.center,
              "--flower-delay": `${flower.delayMs}ms`,
              "--flower-primary": flower.primary,
              "--flower-rotate": `${flower.rotate}deg`,
              "--flower-secondary": flower.secondary,
              "--flower-size": `${flower.size}px`,
              "--flower-stem-length": `${flower.stemLength}px`,
              "--flower-stem-rotate": `${flower.stemRotate}deg`,
              "--flower-sway-duration": `${flower.swayMs}ms`,
            } as CSSProperties
          }
        >
          <span className="flower-stem" />
          <span className="flower-sepals">
            <span className="flower-sepal flower-sepal-left" />
            <span className="flower-sepal flower-sepal-middle" />
            <span className="flower-sepal flower-sepal-right" />
          </span>
          <span className={`flower-bloom flower-shape-${flower.shape}`}>
            <span className="flower-petal flower-petal-one" />
            <span className="flower-petal flower-petal-two" />
            <span className="flower-petal flower-petal-three" />
            <span className="flower-petal flower-petal-four" />
            <span className="flower-petal flower-petal-five" />
            <span className="flower-center" />
          </span>
        </span>
      ))}
    </div>
  );
}
