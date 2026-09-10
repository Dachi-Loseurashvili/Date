"use client";

import { useEffect, useState } from "react";
import { FinalLetter } from "@/components/surprise/FinalLetter";
import { HeroScene } from "@/components/surprise/HeroScene";
import { KeepsakeConstellation } from "@/components/surprise/KeepsakeConstellation";
import { MemoryJourney } from "@/components/surprise/MemoryJourney";

export function SurpriseApp() {
  const [letterRevealed, setLetterRevealed] = useState(false);

  useEffect(() => {
    if (!letterRevealed) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      const letter = document.querySelector<HTMLElement>("#love-letter");
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      letter?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [letterRevealed]);

  function revealLetter() {
    setLetterRevealed(true);
  }

  return (
    <main className="surprise-app">
      <HeroScene />
      <MemoryJourney />
      <KeepsakeConstellation onRevealLetter={revealLetter} />
      {letterRevealed ? <FinalLetter /> : null}
    </main>
  );
}
