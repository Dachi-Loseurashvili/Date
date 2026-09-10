"use client";

import { useState } from "react";
import {
  KEEPSAKES,
  KEEPSAKES_REQUIRED_TO_UNLOCK,
  PAGE_COPY,
} from "@/lib/surpriseContent";

type KeepsakeConstellationProps = {
  onRevealLetter: () => void;
};

export function KeepsakeConstellation({
  onRevealLetter,
}: KeepsakeConstellationProps) {
  const [openedIds, setOpenedIds] = useState<Set<string>>(() => new Set());

  function openKeepsake(id: string) {
    setOpenedIds((current) => {
      const next = new Set(current);
      next.add(id);
      return next;
    });
  }

  const openedCount = openedIds.size;
  const canReveal = openedCount >= KEEPSAKES_REQUIRED_TO_UNLOCK;

  return (
    <section className="keepsake-section" aria-labelledby="keepsake-title">
      <FloatingConstellation />
      <div className="keepsake-shell">
        <header className="section-intro section-intro-night">
          <p className="eyebrow eyebrow-light">{PAGE_COPY.keepsakeEyebrow}</p>
          <h2 id="keepsake-title">{PAGE_COPY.keepsakeTitle}</h2>
          <p>{PAGE_COPY.keepsakeBody}</p>
        </header>

        <div className="keepsake-progress" aria-live="polite">
          <span style={{ width: `${(openedCount / KEEPSAKES.length) * 100}%` }} />
          <p>
            უკვე ნახე: {openedCount} / {KEEPSAKES.length}
          </p>
        </div>

        <div className="keepsake-grid">
          {KEEPSAKES.map((keepsake, index) => {
            const isOpen = openedIds.has(keepsake.id);

            return (
              <button
                aria-expanded={isOpen}
                className={`keepsake-card ${isOpen ? "keepsake-card-open" : ""}`}
                key={keepsake.id}
                onClick={() => openKeepsake(keepsake.id)}
                type="button"
              >
                <span className="keepsake-index">0{index + 1}</span>
                <span className="keepsake-symbol" aria-hidden="true">
                  {keepsake.symbol}
                </span>
                <span className="keepsake-label">{keepsake.label}</span>
                <span className="keepsake-hint">
                  {isOpen ? keepsake.note : keepsake.hint}
                </span>
              </button>
            );
          })}
        </div>

        <div className={`letter-gate ${canReveal ? "letter-gate-ready" : ""}`}>
          <div className="envelope" aria-hidden="true">
            <span className="envelope-flap" />
            <span className="wax-seal">♡</span>
          </div>
          <p>{canReveal ? PAGE_COPY.letterReady : PAGE_COPY.letterLocked}</p>
          <button
            className="letter-button"
            disabled={!canReveal}
            onClick={onRevealLetter}
            type="button"
          >
            {PAGE_COPY.letterButton}
          </button>
        </div>
      </div>
    </section>
  );
}

function FloatingConstellation() {
  return (
    <div className="constellation" aria-hidden="true">
      <span className="constellation-line line-one" />
      <span className="constellation-line line-two" />
      <span className="constellation-star star-one">✦</span>
      <span className="constellation-star star-two">✦</span>
      <span className="constellation-star star-three">✦</span>
      <span className="constellation-star star-four">✦</span>
      <span className="constellation-star star-five">✦</span>
    </div>
  );
}
