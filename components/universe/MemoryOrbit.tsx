"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { memories } from "@/lib/universe";
import { Arrow, ChapterLink, Photo, Star } from "./Artwork";

const points = memories.map((_, index) => {
  const y = 1 - ((index + 0.5) / memories.length) * 2;
  const radius = Math.sqrt(1 - y * y);
  const angle = index * Math.PI * (3 - Math.sqrt(5));
  return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius };
});
const facing = (index: number) => ({
  yaw: -Math.atan2(points[index].x, points[index].z),
  pitch: Math.atan2(
    points[index].y,
    Math.hypot(points[index].x, points[index].z),
  ),
});

export function MemoryOrbit({
  onOpen,
  onNext,
  paused = false,
}: {
  onOpen: (index: number) => void;
  onNext: () => void;
  paused?: boolean;
}) {
  const field = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const initial = facing(0);
  const rotation = useRef({
    yaw: initial.yaw,
    pitch: initial.pitch,
    targetYaw: initial.yaw,
    targetPitch: initial.pitch,
    lastInteraction: 0,
  });
  const drag = useRef<{
    x: number;
    y: number;
    yaw: number;
    pitch: number;
    pointer: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(0);
  const hovered = useRef<number | null>(null);
  const focused = useRef<number | null>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const element = field.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      previous = 0,
      width = element.clientWidth,
      height = element.clientHeight;
    const paint = (now: number) => {
      const dt = Math.min((now - previous) / 1000 || 0.016, 0.05);
      previous = now;
      const value = rotation.current;
      if (
        !media.matches &&
        !drag.current &&
        hovered.current === null &&
        focused.current === null &&
        !pausedRef.current &&
        now - value.lastInteraction > 6000
      )
        value.targetYaw += dt * 0.045;
      const ease = media.matches ? 1 : 1 - Math.exp(-dt * 8);
      value.yaw += (value.targetYaw - value.yaw) * ease;
      value.pitch += (value.targetPitch - value.pitch) * ease;
      const radius = Math.min(width * 0.355, height * 0.45);
      const cy = Math.cos(value.yaw),
        sy = Math.sin(value.yaw),
        cp = Math.cos(value.pitch),
        sp = Math.sin(value.pitch);
      points.forEach((point, index) => {
        const card = cards.current[index];
        if (!card) return;
        const x = point.x * cy + point.z * sy;
        const z = -point.x * sy + point.z * cy;
        const y = point.y * cp - z * sp;
        const depth = point.y * sp + z * cp;
        const perspective = 2.8 / (2.8 - depth * 0.55);
        const scale = 0.62 + (depth + 1) * 0.24;
        card.style.transform = `translate(-50%,-50%) translate3d(${x * radius * perspective}px,${y * radius * 0.78 * perspective}px,0) scale(${scale}) rotate(${x * -6}deg)`;
        card.style.opacity = `${focused.current === index ? 1 : 0.32 + (depth + 1) * 0.34}`;
        card.style.zIndex = `${focused.current === index ? 45 : Math.round((depth + 1) * 15) + 2}`;
        card.style.setProperty("--depth", `${depth}`);
      });
      if (!document.hidden) frame = requestAnimationFrame(paint);
    };
    const resize = new ResizeObserver(() => {
      width = element.clientWidth;
      height = element.clientHeight;
    });
    resize.observe(element);
    const resume = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(paint);
    };
    document.addEventListener("visibilitychange", resume);
    frame = requestAnimationFrame(paint);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      document.removeEventListener("visibilitychange", resume);
    };
  }, []);

  const select = (index: number) => {
    const next = (index + memories.length) % memories.length;
    const target = facing(next);
    const current = rotation.current;
    const difference = Math.atan2(
      Math.sin(target.yaw - current.yaw),
      Math.cos(target.yaw - current.yaw),
    );
    current.targetYaw = current.yaw + difference;
    current.targetPitch = target.pitch;
    current.lastInteraction = performance.now();
    setActive(next);
  };
  const startDrag = (event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    suppressClick.current = 0;
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      yaw: rotation.current.targetYaw,
      pitch: rotation.current.targetPitch,
      pointer: event.pointerId,
      moved: false,
    };
  };
  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.pointer !== event.pointerId) return;
    if (drag.current.moved) suppressClick.current = performance.now() + 300;
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <section className="memory-sky chapter-scene" aria-labelledby="orbit-title">
      <div className="sky-heading">
        <p className="eyebrow">
          <Star /> 01 / THE MEMORY SKY
        </p>
        <h1 id="orbit-title" tabIndex={-1}>
          All these moments.
          <br />
          <em>One little universe.</em>
        </h1>
        <span className="sky-instruction">
          DRAG THE SKY. FIND A MOMENT.
          <br />
          TAP A PHOTOGRAPH TO STAY.
        </span>
      </div>
      <div
        ref={field}
        className={`memory-globe ${dragging ? "is-dragging" : ""}`}
        onPointerDown={startDrag}
        onPointerMove={(event) => {
          const start = drag.current;
          if (!start || start.pointer !== event.pointerId) return;
          if (event.buttons === 0) {
            endDrag(event);
            return;
          }
          const dx = event.clientX - start.x,
            dy = event.clientY - start.y;
          if (!start.moved && Math.hypot(dx, dy) < 7) return;
          start.moved = true;
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
          rotation.current.targetYaw = start.yaw + dx * 0.006;
          rotation.current.targetPitch = Math.max(
            -1.35,
            Math.min(1.35, start.pitch - dy * 0.003),
          );
          rotation.current.lastInteraction = performance.now();
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <svg
          className="globe-graticule"
          viewBox="0 0 800 600"
          fill="none"
          aria-hidden="true"
        >
          <ellipse cx="400" cy="300" rx="260" ry="220" />
          <ellipse cx="400" cy="300" rx="160" ry="220" />
          <ellipse cx="400" cy="300" rx="65" ry="220" />
          <ellipse cx="400" cy="300" rx="260" ry="75" />
          <path d="M140 300h520M400 80v440" />
          <path d="M173 197c150 69 304 69 454 0M173 403c150-69 304-69 454 0" />
        </svg>
        <div className="globe-heart" aria-hidden="true">
          <Star />
          <span>us</span>
          <i>EVERYTHING IS CONNECTED</i>
        </div>
        {memories.map((photo, index) => (
          <button
            ref={(element) => {
              cards.current[index] = element;
            }}
            key={photo.id}
            className={`memory-star ${active === index ? "is-selected" : ""}`}
            onClick={(event) => {
              if (
                event.detail === 0 ||
                performance.now() > suppressClick.current
              ) {
                setActive(index);
                onOpen(index);
              }
            }}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") hovered.current = index;
            }}
            onPointerLeave={() => {
              hovered.current = null;
            }}
            onFocus={() => {
              focused.current = index;
            }}
            onBlur={() => {
              focused.current = null;
            }}
            aria-label={`Open memory ${index + 1}: ${photo.title}`}
          >
            <div className="memory-star-photo">
              <Photo {...photo} sizes="180px" />
            </div>
            <span aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
              <Star /> A MOMENT, OURS.
            </span>
          </button>
        ))}
        <span className="globe-coordinate globe-coordinate--left">N / ∞</span>
        <span className="globe-coordinate globe-coordinate--right">D / ∞</span>
      </div>
      <div className="sky-bottom">
        <div className="sky-controls">
          <button
            className="circle-control"
            onClick={() => select(active - 1)}
            aria-label="Previous memory"
          >
            <Arrow direction="left" />
          </button>
          <span className="sky-counter" aria-live="polite">
            {String(active + 1).padStart(2, "0")} <i>/</i>{" "}
            {String(memories.length).padStart(2, "0")}
          </span>
          <button
            className="circle-control"
            onClick={() => select(active + 1)}
            aria-label="Next memory"
          >
            <Arrow />
          </button>
        </div>
        <p>{memories[active].title}</p>
        <ChapterLink onClick={onNext}>FOLLOW THE LIGHT</ChapterLink>
      </div>
    </section>
  );
}
