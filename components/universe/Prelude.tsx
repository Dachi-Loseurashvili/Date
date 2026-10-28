"use client";

import type { SoundState } from "./useSoundtrack";
import { Arrow, Photo, Star } from "./Artwork";

export function Prelude({
  sound,
  onSound,
  onEnter,
  onQuiet,
}: {
  sound: SoundState;
  onSound: () => void;
  onEnter: () => void;
  onQuiet: () => void;
}) {
  const playing = sound === "on";
  return (
    <section
      className={`prelude chapter-scene ${playing ? "record-is-playing" : ""}`}
      aria-labelledby="prelude-title"
    >
      <div className="prelude-copy">
        <p className="eyebrow prelude-eyebrow">
          <Star /> BEFORE THE OUTSIDE DISAPPEARS
        </p>
        <h1 id="prelude-title" tabIndex={-1}>
          {playing ? (
            <>
              There.
              <br />
              <em>That&apos;s us.</em>
            </>
          ) : (
            <>
              First,
              <br />
              <em>press play.</em>
            </>
          )}
        </h1>
        <p className="prelude-subtitle">
          პატარა სამყარო
          <br />
          თავისი საუნდრექით :*
        </p>
        <div className="prelude-actions">
          <button
            className="record-start"
            onClick={playing ? onEnter : onSound}
            disabled={sound === "loading"}
          >
            {playing ? (
              <Arrow />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M8 5.5 19 12 8 18.5z" fill="currentColor" />
              </svg>
            )}
            <span>
              {playing
                ? "STEP INSIDE"
                : sound === "loading"
                  ? "FINDING OUR SONG…"
                  : "TURN THE MUSIC ON"}
            </span>
            <Star />
          </button>
          <div className="prelude-secondary">
            {playing ? (
              <span>
                <i /> OUR RECORD IS SPINNING. TAKE YOUR TIME.
              </span>
            ) : (
              <button onClick={onQuiet}>
                or, enter quietly <Arrow />
              </button>
            )}
          </div>
          {sound === "error" && (
            <p className="prelude-error" role="status">
              The record couldn&apos;t start. Try again, or enter quietly.
            </p>
          )}
        </div>
      </div>
      <div
        className="turntable"
        aria-label="A record of us, playing Always Forever by Cults"
      >
        <div className="turntable-topline">
          <span>SIDE A &nbsp; / &nbsp; JUST US</span>
          <Star />
          <span>33⅓ RPM</span>
        </div>
        <div className="turntable-platter">
          <div className="record-disc">
            <div className="record-grooves" />
            <div className="record-label">
              <Photo
                id="sofa"
                alt="The two of us on our own record label"
                priority
                sizes="170px"
              />
              <span className="record-label-title">
                always
                <br />
                <em>forever.</em>
              </span>
              <i />
            </div>
          </div>
        </div>
        <svg
          className="tonearm"
          viewBox="0 0 220 350"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="160"
            cy="35"
            r="26"
            fill="#243b30"
            stroke="#70816a"
            strokeWidth="2"
          />
          <circle cx="160" cy="35" r="13" fill="#a9b496" />
          <path
            d="M160 35v145c0 18-10 34-22 46L69 300"
            stroke="#223b2f"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M160 35v145c0 18-10 34-22 46L69 300"
            stroke="#b3bea0"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path d="m49 291 27 15-13 25-27-15z" fill="#263d30" />
          <path d="m40 315 18 10" stroke="#b4c099" strokeWidth="3" />
        </svg>
        <div className="turntable-bottomline">
          <span className="turntable-light" />
          <div>
            <span>{playing ? "NOW PLAYING" : "WAITING FOR YOU"}</span>
            <strong>
              Always Forever <i>—</i> Cults
            </strong>
          </div>
          <span className="record-edition">
            D + N<br />
            001 / ∞
          </span>
        </div>
        <span className="turntable-screw turntable-screw--one" />
        <span className="turntable-screw turntable-screw--two" />
      </div>
      <p className="prelude-footnote">
        FOR NINUTSI. &nbsp; FIVE LITTLE WORLDS. &nbsp; NO PLACE ELSE TO BE.
      </p>
    </section>
  );
}
