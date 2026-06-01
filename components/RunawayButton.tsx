"use client";

import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";
import { useCallback, useRef, useState } from "react";

const EDGE_PADDING = 8;
const MIN_TRAVEL_DISTANCE = 120;
const REJECTION_MESSAGES = [
  "eg ghilaki ar mushaobs meore scade",
  "ar mushaobstqo eg ghilaki",
  "meore ghilaki scade aba",
] as const;

type Position = {
  left: number;
  top: number;
};

type RunawayButtonProps = {
  onRejectedAttempt: (message: string) => void;
};

function randomBetween(min: number, max: number): number {
  if (max <= min) {
    return min;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function distance(a: Position, b: Position): number {
  return Math.hypot(a.left - b.left, a.top - b.top);
}

export function RunawayButton({ onRejectedAttempt }: RunawayButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastPointerRejectAt = useRef(0);
  const rejectionCount = useRef(0);
  const [position, setPosition] = useState<Position | null>(null);

  const moveButton = useCallback(() => {
    const button = buttonRef.current;

    if (!button || typeof window === "undefined") {
      return;
    }

    const buttonRect = button.getBoundingClientRect();
    const viewport = window.visualViewport;
    const viewportLeft = Math.max(0, viewport?.offsetLeft ?? 0);
    const viewportTop = Math.max(0, viewport?.offsetTop ?? 0);
    const viewportRight = Math.min(
      window.innerWidth,
      viewportLeft + (viewport?.width ?? window.innerWidth),
    );
    const viewportBottom = Math.min(
      window.innerHeight,
      viewportTop + (viewport?.height ?? window.innerHeight),
    );

    const minLeft = Math.ceil(viewportLeft + EDGE_PADDING);
    const minTop = Math.ceil(viewportTop + EDGE_PADDING);
    const maxLeft = Math.max(
      minLeft,
      Math.floor(viewportRight - buttonRect.width - EDGE_PADDING),
    );
    const maxTop = Math.max(
      minTop,
      Math.floor(viewportBottom - buttonRect.height - EDGE_PADDING),
    );
    const current = {
      left: buttonRect.left,
      top: buttonRect.top,
    };

    let next: Position = {
      left: randomBetween(minLeft, maxLeft),
      top: randomBetween(minTop, maxTop),
    };

    for (let attempt = 0; attempt < 12; attempt += 1) {
      if (distance(current, next) >= MIN_TRAVEL_DISTANCE) {
        break;
      }

      next = {
        left: randomBetween(minLeft, maxLeft),
        top: randomBetween(minTop, maxTop),
      };
    }

    setPosition(next);
  }, []);

  const rejectAndMove = useCallback(() => {
    const message =
      REJECTION_MESSAGES[rejectionCount.current % REJECTION_MESSAGES.length];

    rejectionCount.current += 1;
    onRejectedAttempt(message);
    moveButton();
  }, [moveButton, onRejectedAttempt]);

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    lastPointerRejectAt.current = Date.now();
    rejectAndMove();
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (Date.now() - lastPointerRejectAt.current < 300) {
      return;
    }

    rejectAndMove();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    rejectAndMove();
  }

  return (
    <span className="inline-flex h-12 w-16 items-center justify-center">
      <button
        ref={buttonRef}
        aria-label="No, but this button refuses to cooperate"
        className="z-50 rounded-full border border-purple-200 bg-white px-5 py-3 text-sm font-semibold text-purple-600 shadow-sm transition-[background-color,border-color,box-shadow,left,top] duration-150 ease-out hover:border-purple-300 hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 active:scale-95"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        style={
          position
            ? {
                left: position.left,
                position: "fixed",
                top: position.top,
              }
            : undefined
        }
        type="button"
      >
        No
      </button>
    </span>
  );
}
