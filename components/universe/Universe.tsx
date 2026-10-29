"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { chapters, keepsakes, memories } from "@/lib/universe";
import type { Chapter, PhotoSelection } from "@/lib/universe";
import { OrbitMark, Star } from "./Artwork";
import { Cover } from "./Cover";
import { MemoryOrbit } from "./MemoryOrbit";
import { LittleThings } from "./LittleThings";
import { Reunion } from "./Reunion";
import { Darkroom } from "./Darkroom";
import { Prelude } from "./Prelude";
import { Sky } from "./Sky";
import { Transit } from "./Transit";
import { useSoundtrack } from "./useSoundtrack";
import { LetterDialog, PhotoDialog } from "./Dialogs";
import { VersionMenu } from "@/components/versions/VersionMenu";

export function Universe() {
  const [chapter, setChapter] = useState<Chapter>("entrance");
  const [entered, setEntered] = useState(false);
  const [travelling, setTravelling] = useState(false);
  const [afterglow, setAfterglow] = useState(false);
  const [found, setFound] = useState<number[]>([]);
  const [selection, setSelection] = useState<PhotoSelection | null>(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const { audio, sound, setSound, toggle, energy } = useSoundtrack();
  const stage = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const travellingRef = useRef(false);
  const chapterIndex = chapters.findIndex((item) => item.id === chapter);
  const dark =
    !entered || chapter === "orbit" || chapter === "darkroom" || afterglow;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    if (!entered || travelling) return;
    stage.current
      ?.querySelector<HTMLHeadingElement>("h1")
      ?.focus({ preventScroll: true });
  }, [chapter, entered, travelling]);
  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#102a25" : "#f2f1e8");
  }, [dark]);

  const go = useCallback(
    (next: Chapter) => {
      if (travellingRef.current || (entered && chapter === next)) return;
      const arrive = () => {
        setAfterglow(false);
        setChapter(next);
        setEntered(true);
        window.scrollTo({ top: 0, behavior: "instant" });
      };
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        arrive();
        return;
      }
      travellingRef.current = true;
      setTravelling(true);
      timers.current = [
        setTimeout(arrive, 380),
        setTimeout(() => {
          travellingRef.current = false;
          setTravelling(false);
          timers.current = [];
        }, 1000),
      ];
    },
    [chapter, entered],
  );

  const discover = (index: number) =>
    setFound((current) =>
      current.includes(index) ? current : [...current, index],
    );
  const stepPhoto = (direction: number) => {
    if (!selection) return;
    const index =
      (selection.index + direction + selection.collection.length) %
      selection.collection.length;
    setSelection({ ...selection, index });
    if (selection.collection === keepsakes) discover(index);
  };

  return (
    <main
      className={`universe universe--${entered ? chapter : "prelude"} ${afterglow ? "universe--afterglow" : ""} ${sound === "on" ? "music-is-playing" : ""}`}
      aria-busy={travelling}
    >
      <a className="skip-link" href="#experience">
        Skip to the experience
      </a>
      <Sky dark={dark} energy={energy} burst={afterglow} />
      <audio
        ref={audio}
        src="/audio/always-forever.mp3"
        preload="none"
        loop
        onPlaying={() => setSound("on")}
        onPause={() =>
          setSound((current) => (current === "on" ? "off" : current))
        }
        onError={() => setSound("error")}
      />
      <header className="masthead">
        <button
          className="monogram"
          onClick={() => go("entrance")}
          disabled={!entered || travelling}
          aria-label="Return to the beginning"
        >
          <span>d</span>
          <Star />
          <span>n</span>
        </button>
        <span className="masthead-caption">
          {entered ? "A SMALL WORLD, JUST FOR TWO" : "FOR NINUTSI. FROM DACHI."}
        </span>
        <div className="masthead-tools">
          <div className="masthead-playback">
            {entered ? (
              <>
                <button
                  className={`sound-toggle ${sound === "on" ? "is-playing" : "sound-is-off"}`}
                  onClick={toggle}
                  aria-label={
                    sound === "on"
                      ? "Turn soundtrack off"
                      : "Turn soundtrack on: Always Forever by Cults"
                  }
                  aria-pressed={sound === "on"}
                  disabled={sound === "loading"}
                >
                  <span className="sound-bars" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <i key={i} />
                    ))}
                  </span>
                  <span>
                    SOUND{" "}
                    {sound === "on" ? "ON" : sound === "loading" ? "…" : "OFF"}
                  </span>
                </button>
                <span className="masthead-index">
                  {String(chapterIndex + 1).padStart(2, "0")}
                  <i>/</i>05
                </span>
              </>
            ) : (
              <span className="prelude-header-note">
                A PERSONAL RECORD &nbsp; / &nbsp; 001
              </span>
            )}
          </div>
          <VersionMenu prominent />
        </div>
      </header>
      {entered && sound === "error" && (
        <p className="sound-error" role="status">
          The soundtrack couldn&apos;t start. Tap sound to try again.
        </p>
      )}
      <div className="experience" id="experience" ref={stage}>
        {!entered ? (
          <Prelude
            sound={sound}
            onSound={toggle}
            onEnter={() => go("entrance")}
            onQuiet={() => {
              audio.current?.pause();
              setSound("off");
              go("entrance");
            }}
          />
        ) : (
          <>
            {chapter === "entrance" && <Cover onEnter={() => go("orbit")} />}
            {chapter === "orbit" && (
              <MemoryOrbit
                paused={!!selection}
                onOpen={(index) =>
                  setSelection({ collection: memories, index })
                }
                onNext={() => go("darkroom")}
              />
            )}
            {chapter === "darkroom" && <Darkroom onNext={() => go("things")} />}
            {chapter === "things" && (
              <LittleThings
                found={found}
                onDiscover={discover}
                onOpen={(index) => {
                  discover(index);
                  setSelection({ collection: keepsakes, index });
                }}
                onNext={() => go("reunion")}
              />
            )}
            {chapter === "reunion" && (
              <Reunion
                onReveal={setAfterglow}
                onLetter={() => setLetterOpen(true)}
                onRestart={() => {
                  setFound([]);
                  go("entrance");
                }}
              />
            )}
          </>
        )}
      </div>
      {entered && (
        <footer className="world-footer">
          <div className="footer-signature">
            <OrbitMark />
            <span>
              OUR TINY
              <br />
              UNIVERSE
            </span>
          </div>
          <nav className="chapter-nav" aria-label="Chapters">
            {chapters.map((item, index) => (
              <button
                className={chapter === item.id ? "is-current" : ""}
                key={item.id}
                disabled={travelling}
                onClick={() => go(item.id)}
                aria-label={`${index + 1}. ${item.label}`}
                aria-current={chapter === item.id ? "step" : undefined}
              >
                <span className="chapter-nav-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="chapter-nav-line" />
                <span className="chapter-nav-label">{item.label}</span>
              </button>
            ))}
          </nav>
          <span className="footer-note">a world with no outside.</span>
        </footer>
      )}
      {selection && (
        <PhotoDialog
          selection={selection}
          onClose={() => setSelection(null)}
          onStep={stepPhoto}
        />
      )}
      {letterOpen && <LetterDialog onClose={() => setLetterOpen(false)} />}
      {travelling && <Transit />}
    </main>
  );
}
