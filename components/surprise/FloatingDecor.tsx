import type { CSSProperties } from "react";

const STARS = [
  [8, 12, 2, 0.2],
  [18, 28, 3, 1.4],
  [29, 9, 2, 2.1],
  [38, 34, 1, 0.8],
  [49, 17, 2, 2.8],
  [61, 7, 3, 1.1],
  [71, 29, 2, 3.4],
  [84, 13, 1, 0.5],
  [93, 38, 3, 2.5],
  [12, 58, 1, 3.1],
  [24, 76, 3, 1.8],
  [35, 52, 2, 0.4],
  [47, 88, 1, 2.2],
  [58, 62, 2, 3.7],
  [69, 82, 3, 0.9],
  [79, 54, 1, 2.9],
  [89, 73, 2, 1.6],
  [96, 91, 2, 3.2],
] as const;

export function FloatingDecor() {
  return (
    <div aria-hidden="true" className="star-field">
      {STARS.map(([left, top, size, delay]) => (
        <span
          className="sky-star"
          key={`${left}-${top}`}
          style={
            {
              "--star-delay": `${delay}s`,
              "--star-left": `${left}%`,
              "--star-size": `${size}px`,
              "--star-top": `${top}%`,
            } as CSSProperties
          }
        />
      ))}
      <span className="shooting-star shooting-star-one" />
      <span className="shooting-star shooting-star-two" />
    </div>
  );
}
