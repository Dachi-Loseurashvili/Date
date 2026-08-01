"use client";

import { useEffect, useRef, useState } from "react";
import { LOVE_SCRIPT_LINES, LOVE_SCRIPT_TEXT } from "@/lib/girlfriendDay";

const ANIMATION_MS = 19000;
const REDUCED_MOTION_MS = 5200;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function LoveScript() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    let hasStarted = false;
    let hideTimer: number | undefined;

    const startAnimation = () => {
      if (hasStarted) {
        return;
      }

      const shouldReduceMotion = prefersReducedMotion();
      hasStarted = true;
      setIsReducedMotion(shouldReduceMotion);
      setIsVisible(true);

      hideTimer = window.setTimeout(
        () => setIsVisible(false),
        shouldReduceMotion ? REDUCED_MOTION_MS : ANIMATION_MS,
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startAnimation();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px 18% 0px", threshold: 0.12 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }
    };
  }, []);

  return (
    <section
      aria-live="polite"
      className={`love-script-section ${isReducedMotion ? "love-script-reduced" : ""}`}
      ref={sectionRef}
    >
      {isVisible ? (
        <p aria-label={LOVE_SCRIPT_TEXT} className="love-script-text">
          {LOVE_SCRIPT_LINES.map((line, index) => (
            <span
              aria-hidden="true"
              className={`love-script-line love-script-line-${index + 1}`}
              key={line}
            >
              {line}
            </span>
          ))}
        </p>
      ) : null}
    </section>
  );
}
