"use client";

import { useCallback, useState } from "react";
import { FlowerRain } from "@/components/FlowerRain";
import { LoveScript } from "@/components/LoveScript";
import { PasswordGate } from "@/components/PasswordGate";
import { PicturePuzzle } from "@/components/PicturePuzzle";
import { PlaylistSection } from "@/components/PlaylistSection";
import { RomanticBackground } from "@/components/RomanticBackground";

type Stage = "locked" | "flowerTransition" | "puzzle" | "content";

export default function Home() {
  const [stage, setStage] = useState<Stage>("locked");

  const handleUnlock = useCallback(() => {
    setStage("flowerTransition");
  }, []);

  const handleFlowerFinish = useCallback(() => {
    setStage("puzzle");
  }, []);

  const handlePuzzleSolved = useCallback(() => {
    setStage("content");
  }, []);

  const contentUnlocked = stage === "content";

  return (
    <main className="girlfriend-page">
      <RomanticBackground />

      {stage === "locked" ? <PasswordGate onUnlock={handleUnlock} /> : null}

      {stage === "flowerTransition" ? (
        <FlowerRain onFinish={handleFlowerFinish} />
      ) : null}

      {stage === "puzzle" || stage === "content" ? (
        <div className="girlfriend-content">
          <PicturePuzzle isSolved={contentUnlocked} onSolved={handlePuzzleSolved} />

          {contentUnlocked ? (
            <>
              <PlaylistSection />
              <LoveScript />
            </>
          ) : null}
        </div>
      ) : null}
    </main>
  );
}
