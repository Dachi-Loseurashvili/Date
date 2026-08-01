"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { PUZZLE_IMAGE_SRC } from "@/lib/girlfriendDay";

type PicturePuzzleProps = {
  isSolved: boolean;
  onSolved: () => void;
};

const GRID_SIZE = 3;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
const SOLVED_TILES = Array.from({ length: TILE_COUNT }, (_, index) => index);

function countInversions(tiles: number[]) {
  let inversions = 0;

  for (let outerIndex = 0; outerIndex < tiles.length; outerIndex += 1) {
    for (let innerIndex = outerIndex + 1; innerIndex < tiles.length; innerIndex += 1) {
      if (tiles[outerIndex] > tiles[innerIndex]) {
        inversions += 1;
      }
    }
  }

  return inversions;
}

function isSolvablePermutation(tiles: number[]) {
  return countInversions(tiles) % 2 === 0;
}

function isSolvedOrder(tiles: number[]) {
  return tiles.every((tile, index) => tile === index);
}

function createShuffledTiles() {
  const tiles = [...SOLVED_TILES];

  do {
    for (let index = tiles.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [tiles[index], tiles[swapIndex]] = [tiles[swapIndex], tiles[index]];
    }
  } while (isSolvedOrder(tiles) || !isSolvablePermutation(tiles));

  return tiles;
}

function getTileImageStyle(tile: number, hasPuzzleImage: boolean): CSSProperties {
  if (!hasPuzzleImage) {
    const hue = 318 + tile * 9;

    return {
      background: `linear-gradient(135deg, hsl(${hue} 78% 91%), hsl(${hue + 36} 70% 82%))`,
    };
  }

  const row = Math.floor(tile / GRID_SIZE);
  const column = tile % GRID_SIZE;
  const positionX = (column / (GRID_SIZE - 1)) * 100;
  const positionY = (row / (GRID_SIZE - 1)) * 100;

  return {
    backgroundImage: `url("${PUZZLE_IMAGE_SRC}")`,
    backgroundPosition: `${positionX}% ${positionY}%`,
    backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
  };
}

export function PicturePuzzle({ isSolved, onSolved }: PicturePuzzleProps) {
  const [tiles, setTiles] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );
  const hasPuzzleImage = imageStatus !== "error";

  useEffect(() => {
    if (isSolved) {
      setTiles(SOLVED_TILES);
      setSelectedIndex(null);
      return;
    }

    setTiles(createShuffledTiles());
  }, [isSolved]);

  function handleTileClick(index: number) {
    if (isSolved || tiles.length !== TILE_COUNT) {
      return;
    }

    if (selectedIndex === null) {
      setSelectedIndex(index);
      return;
    }

    if (selectedIndex === index) {
      setSelectedIndex(null);
      return;
    }

    const nextTiles = [...tiles];
    [nextTiles[selectedIndex], nextTiles[index]] = [
      nextTiles[index],
      nextTiles[selectedIndex],
    ];

    setTiles(nextTiles);
    setSelectedIndex(null);

    if (isSolvedOrder(nextTiles)) {
      onSolved();
    }
  }

  return (
    <section
      className={`puzzle-section ${isSolved ? "puzzle-section-solved" : ""}`}
      aria-labelledby="puzzle-title"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="sr-only"
        onError={() => setImageStatus("error")}
        onLoad={() => setImageStatus("loaded")}
        src={PUZZLE_IMAGE_SRC}
      />

      <div className="section-heading">
        <span className="floating-flower" aria-hidden="true">
          ✿
        </span>
        <h1 id="puzzle-title">chveni puzzle unda gaiaro bae ♡</h1>
        
      </div>

      <div className="puzzle-card">
        {isSolved ? (
          <div
            aria-label="Completed puzzle"
            className="completed-puzzle"
            style={
              hasPuzzleImage
                ? { backgroundImage: `url("${PUZZLE_IMAGE_SRC}")` }
                : undefined
            }
          >
            {!hasPuzzleImage ? (
              <span>replace public/assets/puzzle-photo.jpg</span>
            ) : null}
          </div>
        ) : null}

        {!isSolved ? (
          <div className="puzzle-grid">
            {tiles.length === TILE_COUNT
              ? tiles.map((tile, index) => (
                  <button
                    aria-label={`Puzzle tile ${index + 1}`}
                    aria-pressed={selectedIndex === index}
                    className={`puzzle-tile ${
                      selectedIndex === index ? "puzzle-tile-selected" : ""
                    }`}
                    key={`${tile}-${index}`}
                    onClick={() => handleTileClick(index)}
                    style={getTileImageStyle(tile, hasPuzzleImage)}
                    type="button"
                  >
                    {!hasPuzzleImage ? <span>{tile + 1}</span> : null}
                  </button>
                ))
              : Array.from({ length: TILE_COUNT }, (_, index) => (
                  <div className="puzzle-tile puzzle-tile-loading" key={index} />
                ))}
          </div>
        ) : null}
      </div>

      {imageStatus === "error" ? (
        <p className="puzzle-fallback-note">
          Puzzle photo placeholder active. Add the real image at public/assets/puzzle-photo.jpg.
        </p>
      ) : null}

      {isSolved ? (
        <p className="scroll-cue" aria-live="polite">
          chamoscrolle chemo princesa
        </p>
      ) : null}
    </section>
  );
}
