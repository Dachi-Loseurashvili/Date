"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { memories } from "@/lib/universe";
import { Arrow, Photo, Star } from "./Artwork";

export function Reunion({
  onLetter,
  onRestart,
  onReveal,
}: {
  onLetter: () => void;
  onRestart: () => void;
  onReveal: (value: boolean) => void;
}) {
  const [closeness, setCloseness] = useState(0);
  const art = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    x: number;
    value: number;
    direction: number;
    pointer: number;
  } | null>(null);
  const suppressClick = useRef(0);
  const together = closeness >= 96;
  const progress = together ? 1 : closeness / 100;
  useEffect(() => {
    onReveal(together);
  }, [together, onReveal]);
  const moveStar = (event: PointerEvent<HTMLButtonElement>) => {
    const start = drag.current;
    if (!start || start.pointer !== event.pointerId || !art.current) return;
    const delta = (event.clientX - start.x) * start.direction;
    if (Math.abs(delta) > 4) suppressClick.current = performance.now() + 300;
    setCloseness(
      Math.round(
        Math.min(
          100,
          Math.max(
            0,
            start.value + (delta / (art.current.clientWidth * 0.28)) * 100,
          ),
        ),
      ),
    );
  };
  return (
    <section
      className={`reunion chapter-scene ${together ? "is-together" : ""}`}
      style={{ "--closeness": progress } as CSSProperties}
      aria-labelledby="reunion-title"
    >
      <div className="reunion-copy">
        <p className="eyebrow">
          <Star />
          04 / WHERE EVERY THREAD LEADS
        </p>
        <h1 id="reunion-title" tabIndex={-1}>
          {together ? (
            <>
              Always,
              <br />
              <em>you.</em>
            </>
          ) : (
            <>
              A little
              <br />
              <em>closer.</em>
            </>
          )}
        </h1>
        <div className="reunion-message" aria-live="polite">
          {together ? (
            <p className="georgian-note" lang="ka">
              მიყვარხარ, ნინუცი.<span>— დაჩი</span>
            </p>
          ) : (
            <p>
              Two little stars.
              <br />
              You know where they belong.
            </p>
          )}
        </div>
        <div className="reunion-slider">
          <label htmlFor="closeness">
            {together
              ? "EVERY LITTLE UNIVERSE. ALWAYS YOU."
              : "BRING OUR TWO STARS TOGETHER"}
          </label>
          <div className="slider-rail">
            <Star hollow />
            <input
              id="closeness"
              type="range"
              min="0"
              max="100"
              value={closeness}
              onChange={(event) => setCloseness(Number(event.target.value))}
              aria-label="Bring our two stars together"
              aria-valuetext={
                together
                  ? "Together. I love you, Ninutsi."
                  : `${closeness} percent closer`
              }
            />
            <Star />
          </div>
          <span className="slider-hint">
            {together
              ? "THE OUTSIDE CAN WAIT A LITTLE LONGER."
              : "SLIDE HERE, OR MOVE THE STARS THEMSELVES."}
          </span>
        </div>
        <div className="reunion-actions">
          <button className="note-button" onClick={onLetter}>
            <Star />A NOTE, JUST FOR YOU
            <Arrow direction="up" />
          </button>
          <button
            className="restart-button"
            onClick={onRestart}
            aria-label="Start the experience again"
          >
            ↺
          </button>
        </div>
      </div>
      <div className="reunion-art" ref={art}>
        <div className="reunion-glow" />
        <svg
          className="reunion-rings"
          viewBox="0 0 700 700"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="350" cy="350" r="278" />
          <circle cx="350" cy="350" r="294" strokeDasharray="1 11" />
          <ellipse
            cx="350"
            cy="350"
            rx="335"
            ry="214"
            transform="rotate(-29 350 350)"
          />
          <path d="M350 27v25M350 648v25M27 350h25M648 350h25" />
        </svg>
        <div className="afterglow-mosaic" aria-hidden="true">
          {memories.map((photo, index) => {
            const angle = (index / memories.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <div
                className="mosaic-leaf"
                key={photo.id}
                style={
                  {
                    left: `${50 + Math.cos(angle) * 42}%`,
                    top: `${50 + Math.sin(angle) * 42}%`,
                    "--leaf-turn": `${(index % 2 === 0 ? -1 : 1) * (8 + index * 1.3)}deg`,
                    "--leaf-delay": `${index * 45}ms`,
                  } as CSSProperties
                }
              >
                <Photo {...photo} alt="" sizes="140px" />
              </div>
            );
          })}
        </div>
        <div className="reunion-photo">
          <div className="reunion-half reunion-half--left">
            <Photo
              id="sofa"
              alt="Dachi and Ninutsi together, a kiss on the cheek"
              sizes="(max-width: 700px) 90vw, 44vw"
            />
          </div>
          <div className="reunion-half reunion-half--right" aria-hidden="true">
            <Photo id="sofa" alt="" sizes="(max-width: 700px) 90vw, 44vw" />
          </div>
        </div>
        {[-1, 1].map((side, index) => (
          <button
            key={side}
            className={`reunion-star reunion-star--${side === -1 ? "left" : "right"}`}
            tabIndex={together ? -1 : 0}
            aria-hidden={together || undefined}
            aria-label={`Bring ${index === 0 ? "Dachi" : "Ninutsi"} closer`}
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              suppressClick.current = 0;
              event.currentTarget.setPointerCapture(event.pointerId);
              drag.current = {
                x: event.clientX,
                value: closeness,
                direction: -side,
                pointer: event.pointerId,
              };
            }}
            onPointerMove={moveStar}
            onPointerUp={() => {
              drag.current = null;
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
            onClick={(event) => {
              if (
                event.detail === 0 ||
                performance.now() > suppressClick.current
              )
                setCloseness((value) => Math.min(100, value + 25));
            }}
          >
            <Star />
            <span>{index === 0 ? "D" : "N"}</span>
          </button>
        ))}
        <Star className="reunion-spark reunion-spark--one" />
        <Star className="reunion-spark reunion-spark--two" />
        <span className="reunion-art-caption">
          SOMEWHERE, ONLY US. / ALWAYS.
        </span>
      </div>
    </section>
  );
}
