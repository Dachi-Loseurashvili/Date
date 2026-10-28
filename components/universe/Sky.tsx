"use client";

import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
};

/** A bounded canvas layer. No React render loop; pauses in background tabs. */
export function Sky({
  dark,
  energy,
  burst,
}: {
  dark: boolean;
  energy: () => number;
  burst: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const burstRef = useRef(burst);
  const previousBurst = useRef(false);
  const particles = useRef<Spark[]>([]);
  burstRef.current = burst;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0,
      height = 0,
      frame = 0,
      previous = 0,
      lastTrail = 0;
    let time = 0;
    const sparks = particles.current;
    const pointer = { x: -1000, y: -1000 };
    const stars = Array.from({ length: 100 }, (_, i) => ({
      x: (Math.sin(i * 127.1 + 2) * 43758.5453) % 1,
      y: (Math.sin(i * 311.7 + 9) * 19731.3431) % 1,
      size: 0.45 + (i % 4) * 0.33,
      phase: i * 1.9,
    }));
    const color = dark ? "211,227,191" : "87,111,67";
    const addSparks = (x: number, y: number, count: number, force = 1) => {
      if (media.matches) return;
      for (let i = 0; i < count; i++) {
        const angle = i * 2.399 + time;
        const speed = (0.6 + (i % 7) * 0.35) * force;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 0.8 + (i % 3),
        });
      }
      if (sparks.length > 150) sparks.splice(0, sparks.length - 150);
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.7);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (media.matches) draw(0);
    };
    const draw = (now: number) => {
      if (now - previous < 30 && !media.matches) {
        frame = requestAnimationFrame(draw);
        return;
      }
      const delta = Math.min((now - previous) / 1000 || 0.033, 0.05);
      previous = now;
      time += delta;
      ctx.clearRect(0, 0, width, height);
      const pulse = media.matches ? 0 : energy();
      for (const star of stars) {
        const x =
          Math.abs(star.x) * width + Math.sin(time * 0.05 + star.phase) * 5;
        const y =
          Math.abs(star.y) * height + Math.cos(time * 0.04 + star.phase) * 5;
        const near = Math.hypot(pointer.x - x, pointer.y - y);
        const opacity =
          (dark ? 0.17 : 0.09) +
          (Math.sin(time * 0.6 + star.phase) + 1) * 0.08 +
          pulse * 0.16;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color},${opacity})`;
        ctx.arc(x, y, star.size * (1 + pulse * 0.8), 0, Math.PI * 2);
        ctx.fill();
        if (near < 110 && !media.matches) {
          ctx.strokeStyle = `rgba(${color},${(1 - near / 110) * 0.16})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }
      if (burstRef.current && !previousBurst.current)
        addSparks(width * 0.57, height * 0.48, 100, 3.5);
      previousBurst.current = burstRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.life -= delta * 0.5;
        spark.x += spark.vx * delta * 35;
        spark.y += spark.vy * delta * 35;
        if (spark.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(${color},${spark.life * 0.8})`;
        ctx.lineWidth = 0.7;
        const s = spark.size * spark.life;
        ctx.beginPath();
        ctx.moveTo(spark.x - s * 2, spark.y);
        ctx.lineTo(spark.x + s * 2, spark.y);
        ctx.moveTo(spark.x, spark.y - s * 2);
        ctx.lineTo(spark.x, spark.y + s * 2);
        ctx.stroke();
      }
      if (!media.matches && !document.hidden)
        frame = requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (event.pointerType !== "mouse" || performance.now() - lastTrail < 55)
        return;
      lastTrail = performance.now();
      addSparks(pointer.x, pointer.y, 1, 0.25);
    };
    const click = (event: PointerEvent) => {
      if ((event.target as Element).closest("button,input,a,dialog")) return;
      addSparks(event.clientX, event.clientY, 16);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(draw);
    };
    resize();
    restart();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", click);
    document.addEventListener("visibilitychange", restart);
    media.addEventListener("change", restart);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", click);
      document.removeEventListener("visibilitychange", restart);
      media.removeEventListener("change", restart);
    };
  }, [dark, energy]);
  return <canvas ref={ref} className="living-sky" aria-hidden="true" />;
}
