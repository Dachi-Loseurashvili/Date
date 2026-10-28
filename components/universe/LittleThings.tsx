"use client";

import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import { keepsakes } from "@/lib/universe";
import { Arrow, ChapterLink, Photo, Star } from "./Artwork";

const nodes = [
  { x: 18, y: 35 },
  { x: 65, y: 21 },
  { x: 82, y: 67 },
  { x: 33, y: 70 },
];

export function LittleThings({
  found,
  onOpen,
  onDiscover,
  onNext,
}: {
  found: readonly number[];
  onOpen: (index: number) => void;
  onDiscover: (index: number) => void;
  onNext: () => void;
}) {
  const board = useRef<HTMLDivElement>(null);
  const tracing = useRef<{
    x: number;
    y: number;
    pointer: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(0);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const complete = found.length === keepsakes.length;
  const path =
    nodes
      .map(
        (node, index) =>
          `${index === 0 ? "M" : "L"}${node.x * 10} ${node.y * 6}`,
      )
      .join(" ") + " Z";
  const discoverAt = (clientX: number, clientY: number) => {
    const rect = board.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100,
      y = ((clientY - rect.top) / rect.height) * 100;
    setCursor({ x, y });
    nodes.forEach((node, index) => {
      if (
        Math.hypot(
          ((node.x - x) / 100) * rect.width,
          ((node.y - y) / 100) * rect.height,
        ) < 75
      )
        onDiscover(index);
    });
  };
  const endTrace = (event: PointerEvent<HTMLDivElement>) => {
    if (!tracing.current || tracing.current.pointer !== event.pointerId) return;
    if (tracing.current.moved) suppressClick.current = performance.now() + 300;
    tracing.current = null;
    setCursor(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return (
    <section
      className={`miniature chapter-scene ${complete ? "constellation-complete" : ""}`}
      aria-labelledby="things-title"
    >
      <div className="miniature-heading">
        <div>
          <p className="eyebrow">
            <Star /> 03 / A UNIVERSE IN MINIATURE
          </p>
          <h1 id="things-title" tabIndex={-1}>
            Little things.
            <br />
            <em>Cosmic magic.</em>
          </h1>
        </div>
        <p className="miniature-instruction">
          <span>
            TRACE BETWEEN THE STARS.
            <br />
            OR, OPEN A LITTLE THING.
          </span>
          <i>
            Every little thing
            <br />
            has its person.
          </i>
        </p>
      </div>
      <div
        className="constellation-board"
        ref={board}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          suppressClick.current = 0;
          if (event.pointerType === "touch") return;
          tracing.current = {
            x: event.clientX,
            y: event.clientY,
            pointer: event.pointerId,
            moved: false,
          };
        }}
        onPointerMove={(event) => {
          const start = tracing.current;
          if (!start || start.pointer !== event.pointerId) return;
          if (event.buttons === 0) {
            endTrace(event);
            return;
          }
          if (!start.moved) {
            if (
              Math.hypot(event.clientX - start.x, event.clientY - start.y) < 7
            )
              return;
            start.moved = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            discoverAt(start.x, start.y);
          }
          discoverAt(event.clientX, event.clientY);
        }}
        onPointerUp={endTrace}
        onPointerCancel={endTrace}
      >
        <div className="constellation-centre" aria-hidden="true">
          <Star hollow={!complete} />
          <span>{complete ? "of course," : "two"}</span>
          <em>{complete ? "you & me." : "of a kind."}</em>
        </div>
        <svg
          className="constellation-lines"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path d={path} className="constellation-ghost" />
          {nodes.map((node, index) => {
            const next = (index + 1) % nodes.length;
            return (
              <path
                key={index}
                className={
                  found.includes(index) && found.includes(next) ? "is-lit" : ""
                }
                d={`M${node.x * 10} ${node.y * 6}L${nodes[next].x * 10} ${nodes[next].y * 6}`}
              />
            );
          })}
          <path
            d="M500 90v420M160 300h680"
            className="constellation-crosshair"
          />
          {cursor && (
            <path
              className="constellation-thread"
              d={`M500 300Q${cursor.x * 10} 300 ${cursor.x * 10} ${cursor.y * 6}`}
            />
          )}
        </svg>
        {keepsakes.map((item, index) => (
          <button
            className={`relic relic--${item.kind} ${found.includes(index) ? "is-found" : ""}`}
            key={item.id}
            onClick={(event) => {
              if (
                event.detail === 0 ||
                performance.now() > suppressClick.current
              )
                onOpen(index);
            }}
            style={{ left: `${nodes[index].x}%`, top: `${nodes[index].y}%` }}
            aria-label={`Look closer: ${item.label}${found.includes(index) ? ", already discovered" : ""}`}
          >
            <span className="relic-number">
              0{index + 1}
              <Star hollow={!found.includes(index)} />
            </span>
            <span className="relic-photo">
              <Photo {...item} sizes="(max-width: 700px) 130px, 220px" />
            </span>
            <span className="relic-name">
              {item.label}
              <Arrow direction="up" />
            </span>
          </button>
        ))}
        <span className="constellation-note">
          THE VERY SMALL
          <br />
          IS NEVER SMALL.
        </span>
      </div>
      <div className="miniature-bottom">
        <div className="miniature-progress">
          <div aria-hidden="true">
            {keepsakes.map((item, index) => (
              <Star key={item.id} hollow={!found.includes(index)} />
            ))}
          </div>
          <span aria-live="polite">
            {complete
              ? "OUR OWN LITTLE CONSTELLATION."
              : `${found.length} / 4 STARS FOUND`}
          </span>
        </div>
        <ChapterLink onClick={onNext} dark>
          FOLLOW THE THREAD
        </ChapterLink>
      </div>
    </section>
  );
}
