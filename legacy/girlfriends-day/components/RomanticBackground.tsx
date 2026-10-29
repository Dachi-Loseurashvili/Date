import type { CSSProperties } from "react";

type DecorItem = {
  kind: "heart" | "flower";
  className: string;
  color: string;
  delay: number;
  duration: number;
  opacity: number;
  rotate: number;
  size: number;
  x: number;
  y: number;
};

const DECOR_ITEMS: DecorItem[] = [
  { kind: "flower", className: "bg-flower-soft", color: "#be185d", delay: 0, duration: 9, opacity: 0.16, rotate: -12, size: 82, x: 7, y: 14 },
  { kind: "heart", className: "", color: "#7e22ce", delay: 1.1, duration: 11, opacity: 0.12, rotate: 12, size: 58, x: 20, y: 28 },
  { kind: "flower", className: "bg-flower-wide", color: "#db2777", delay: 0.4, duration: 10, opacity: 0.18, rotate: 24, size: 96, x: 84, y: 12 },
  { kind: "heart", className: "", color: "#be123c", delay: 1.8, duration: 12, opacity: 0.11, rotate: -20, size: 72, x: 93, y: 26 },
  { kind: "flower", className: "bg-flower-soft", color: "#9333ea", delay: 2.4, duration: 13, opacity: 0.15, rotate: 8, size: 68, x: 12, y: 50 },
  { kind: "flower", className: "bg-flower-wide", color: "#f472b6", delay: 1.5, duration: 10, opacity: 0.18, rotate: -30, size: 118, x: 90, y: 58 },
  { kind: "heart", className: "", color: "#ec4899", delay: 2.1, duration: 12, opacity: 0.12, rotate: 24, size: 48, x: 30, y: 70 },
  { kind: "flower", className: "bg-flower-soft", color: "#7c3aed", delay: 3.2, duration: 11, opacity: 0.14, rotate: 16, size: 86, x: 67, y: 76 },
  { kind: "heart", className: "", color: "#9d174d", delay: 2.8, duration: 13, opacity: 0.1, rotate: -8, size: 84, x: 8, y: 88 },
  { kind: "flower", className: "bg-flower-wide", color: "#2563eb", delay: 3.6, duration: 14, opacity: 0.11, rotate: 28, size: 74, x: 49, y: 18 },
  { kind: "flower", className: "bg-flower-soft", color: "#dc2626", delay: 4.1, duration: 11, opacity: 0.14, rotate: -18, size: 62, x: 76, y: 40 },
  { kind: "heart", className: "", color: "#6b21a8", delay: 4.6, duration: 12, opacity: 0.11, rotate: 18, size: 54, x: 56, y: 91 },
  { kind: "flower", className: "bg-flower-wide", color: "#be185d", delay: 5.1, duration: 13, opacity: 0.13, rotate: -26, size: 108, x: 18, y: 103 },
  { kind: "heart", className: "", color: "#db2777", delay: 5.8, duration: 10, opacity: 0.12, rotate: 10, size: 64, x: 86, y: 103 },
  { kind: "flower", className: "bg-flower-soft", color: "#0f766e", delay: 6.1, duration: 14, opacity: 0.1, rotate: 20, size: 78, x: 40, y: 118 },
  { kind: "flower", className: "bg-flower-wide", color: "#c026d3", delay: 6.8, duration: 12, opacity: 0.13, rotate: -16, size: 92, x: 72, y: 130 },
  { kind: "heart", className: "", color: "#be123c", delay: 7.3, duration: 13, opacity: 0.1, rotate: -18, size: 76, x: 16, y: 145 },
  { kind: "flower", className: "bg-flower-soft", color: "#f97316", delay: 7.9, duration: 11, opacity: 0.1, rotate: 26, size: 66, x: 91, y: 151 },
];

export function RomanticBackground() {
  return (
    <div aria-hidden="true" className="romantic-background">
      {DECOR_ITEMS.map((item) => (
        <span
          className={`bg-decor bg-${item.kind} ${item.className}`}
          key={`${item.kind}-${item.x}-${item.y}`}
          style={
            {
              "--bg-color": item.color,
              "--bg-delay": `${item.delay}s`,
              "--bg-duration": `${item.duration}s`,
              "--bg-opacity": item.opacity,
              "--bg-rotate": `${item.rotate}deg`,
              "--bg-size": `${item.size}px`,
              "--bg-x": `${item.x}%`,
              "--bg-y": `${item.y}svh`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
