"use client";

import { useEffect, useRef, useState } from "react";
import { PASSCODE } from "@/lib/girlfriendDay";

type PasswordGateProps = {
  onUnlock: () => void;
};

const KEYPAD_ITEMS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];

export function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [entry, setEntry] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (/^\d$/.test(event.key)) {
        event.preventDefault();
        handleDigit(event.key);
        return;
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        handleDelete();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  function rejectEntry() {
    setError("wrong code");
    setIsShaking(true);

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = setTimeout(() => {
      setEntry("");
      setIsShaking(false);
    }, 520);
  }

  function validateEntry(nextEntry: string) {
    if (nextEntry === PASSCODE) {
      setError("");
      onUnlock();
      return;
    }

    rejectEntry();
  }

  function handleDigit(digit: string) {
    if (isShaking || entry.length >= PASSCODE.length) {
      return;
    }

    const nextEntry = `${entry}${digit}`;
    setEntry(nextEntry);

    if (nextEntry.length === PASSCODE.length) {
      validateEntry(nextEntry);
    }
  }

  function handleDelete() {
    if (isShaking) {
      return;
    }

    setError("");
    setEntry((currentEntry) => currentEntry.slice(0, -1));
  }

  return (
    <section className="password-stage" aria-label="Password gate">
      <div className={`password-card ${isShaking ? "password-card-shake" : ""}`}>
        <div className="pixel-heart-frame" aria-hidden="true">
          <div className="pixel-heart" />
        </div>

        <div className="passcode-dots" aria-label={`${entry.length} of 4 digits entered`}>
          {Array.from({ length: PASSCODE.length }, (_, index) => (
            <span
              className={`passcode-dot ${index < entry.length ? "passcode-dot-filled" : ""}`}
              key={index}
            />
          ))}
        </div>

        <p className="passcode-error" aria-live="polite">
          {error}
        </p>

        <div className="keypad" aria-label="Passcode keypad">
          {KEYPAD_ITEMS.map((item, index) => {
            if (item === "") {
              return <span aria-hidden="true" className="keypad-spacer" key="spacer" />;
            }

            const isDelete = item === "del";

            return (
              <button
                aria-label={isDelete ? "Delete last digit" : `Enter ${item}`}
                className="keypad-button"
                disabled={isShaking}
                key={`${item}-${index}`}
                onClick={() => (isDelete ? handleDelete() : handleDigit(item))}
                type="button"
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
