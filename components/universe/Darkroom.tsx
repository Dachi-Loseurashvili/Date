"use client";

import { useEffect, useRef, useState } from "react";
import { memories } from "@/lib/universe";
import type { Photograph } from "@/lib/universe";
import { ChapterLink, Photo, Star } from "./Artwork";

const negatives = [memories[3], memories[0], memories[2]];
const GRID_X = 16,
  GRID_Y = 20;
type Point = { x: number; y: number };

function segmentDistance(point: Point, from: Point, to: Point) {
  const dx = to.x - from.x,
    dy = to.y - from.y;
  const length = dx * dx + dy * dy;
  const t =
    length === 0
      ? 0
      : Math.max(
          0,
          Math.min(
            1,
            ((point.x - from.x) * dx + (point.y - from.y) * dy) / length,
          ),
        );
  return Math.hypot(point.x - (from.x + t * dx), point.y - (from.y + t * dy));
}

function DevelopingPhoto({
  photo,
  onRevealed,
  initiallyRevealed,
}: {
  photo: Photograph;
  onRevealed: (id: string) => void;
  initiallyRevealed: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef<Point | null>(null);
  const covered = useRef(new Set<number>());
  const finished = useRef(initiallyRevealed);
  const [coverage, setCoverage] = useState(initiallyRevealed ? 100 : 0);
  const [revealed, setRevealed] = useState(initiallyRevealed);
  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    setRevealed(true);
    setCoverage(100);
    onRevealed(photo.id);
  };

  useEffect(() => {
    const element = canvas.current;
    const ctx = element?.getContext("2d");
    if (!element || !ctx) return;
    const image = new window.Image();
    let disposed = false;
    const paint = () => {
      if (disposed || finished.current) return;
      const width = element.clientWidth,
        height = element.clientHeight;
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element.width = width * ratio;
      element.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#40322d";
      ctx.fillRect(0, 0, width, height);
      if (image.complete && image.naturalWidth) {
        const scale = Math.max(width / image.width, height / image.height);
        const position = (photo.position || "50% 50%")
          .split(" ")
          .map((v) => parseFloat(v) / 100);
        ctx.save();
        ctx.filter = "grayscale(1) sepia(.8) contrast(.75)";
        ctx.drawImage(
          image,
          (width - image.width * scale) * position[0],
          (height - image.height * scale) * (position[1] ?? 0.5),
          image.width * scale,
          image.height * scale,
        );
        ctx.restore();
        ctx.fillStyle = "rgba(39,26,23,.78)";
        ctx.fillRect(0, 0, width, height);
      }
      ctx.strokeStyle = "rgba(234,201,166,.12)";
      ctx.lineWidth = 0.5;
      for (let x = 16; x < width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      covered.current.clear();
      setCoverage(0);
    };
    image.onload = paint;
    image.src = `/assets/universe/${photo.id}.webp`;
    const observer = new ResizeObserver(paint);
    observer.observe(element);
    paint();
    return () => {
      disposed = true;
      image.onload = null;
      observer.disconnect();
    };
  }, [photo]);

  const erase = (point: Point) => {
    if (finished.current || !canvas.current) return;
    const element = canvas.current,
      ctx = element.getContext("2d");
    if (!ctx) {
      finish();
      return;
    }
    const from = drawing.current || point;
    const radius = element.clientWidth * 0.15;
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#000";
    ctx.lineWidth = radius * 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fill();
    for (let y = 0; y < GRID_Y; y++)
      for (let x = 0; x < GRID_X; x++) {
        const centre = {
          x: ((x + 0.5) / GRID_X) * element.clientWidth,
          y: ((y + 0.5) / GRID_Y) * element.clientHeight,
        };
        if (segmentDistance(centre, from, point) <= radius)
          covered.current.add(y * GRID_X + x);
      }
    drawing.current = point;
    const percent = Math.round(
      (covered.current.size / (GRID_X * GRID_Y)) * 100,
    );
    setCoverage(percent);
    if (percent >= 48) finish();
  };
  const location = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  return (
    <div className={`developing-photo ${revealed ? "is-developed" : ""}`}>
      <div className="darkroom-paper">
        <div className="darkroom-image">
          <Photo {...photo} sizes="(max-width: 700px) 80vw, 420px" />
          <canvas
            ref={canvas}
            aria-hidden="true"
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              event.currentTarget.setPointerCapture(event.pointerId);
              erase(location(event));
            }}
            onPointerMove={(event) => {
              if (drawing.current) erase(location(event));
            }}
            onPointerUp={() => {
              drawing.current = null;
            }}
            onPointerCancel={() => {
              drawing.current = null;
            }}
          />
          {!revealed && (
            <span className="darkroom-touch" aria-hidden="true">
              <Star />
              <span>TOUCH TO REMEMBER</span>
            </span>
          )}
        </div>
        <div className="darkroom-paper-label">
          <span>US, IN FULL COLOUR.</span>
          <Star />
          <span>{revealed ? "A MOMENT, FOUND" : "WAITING FOR THE LIGHT"}</span>
        </div>
      </div>
      <div className="develop-controls">
        <button onClick={finish} disabled={revealed}>
          <Star />
          {revealed ? "THERE IT IS." : "OR, LET THERE BE LIGHT"}
        </button>
        <span
          className="develop-meter"
          role="progressbar"
          aria-label="Memory development"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={coverage}
        >
          <i style={{ width: `${coverage}%` }} />
        </span>
      </div>
    </div>
  );
}

export function Darkroom({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState(0);
  const [developed, setDeveloped] = useState<string[]>([]);
  return (
    <section
      className="darkroom chapter-scene"
      aria-labelledby="darkroom-title"
    >
      <div className="darkroom-copy">
        <p className="eyebrow">
          <Star />
          02 / A LITTLE LIGHT
        </p>
        <h1 id="darkroom-title" tabIndex={-1}>
          Some things
          <br />
          <em>stay with you.</em>
        </h1>
        <p className="darkroom-subtitle">
          Brush your hand across a memory.
          <br />
          Bring it back to life.
        </p>
        <div className="negative-strip" aria-label="Choose a memory to develop">
          {negatives.map((photo, index) => (
            <button
              className={selected === index ? "is-selected" : ""}
              onClick={() => setSelected(index)}
              key={photo.id}
              aria-label={`Develop memory ${index + 1}`}
              aria-pressed={selected === index}
            >
              <span className="negative-photo">
                <Photo {...photo} sizes="90px" />
              </span>
              <span>
                0{index + 1}
                <Star hollow={!developed.includes(photo.id)} />
              </span>
            </button>
          ))}
        </div>
        <span className="darkroom-note">
          NOT PERFECT PICTURES.
          <br />
          PERFECT LITTLE MOMENTS.
        </span>
      </div>
      <DevelopingPhoto
        key={negatives[selected].id}
        photo={negatives[selected]}
        initiallyRevealed={developed.includes(negatives[selected].id)}
        onRevealed={(id) =>
          setDeveloped((current) =>
            current.includes(id) ? current : [...current, id],
          )
        }
      />
      <div className="darkroom-bottom">
        <span className="darkroom-status">
          <i />
          {developed.length
            ? `${developed.length} / 3 MOMENTS IN THE LIGHT`
            : "THE DARKROOM IS YOURS"}
        </span>
        <ChapterLink onClick={onNext}>A UNIVERSE IN MINIATURE</ChapterLink>
      </div>
    </section>
  );
}
