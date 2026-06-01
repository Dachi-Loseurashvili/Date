"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const AUDIO_SRC = "/music/shes-my-collar.mp3";
const COVER_SRC = "/music/gorillaz.webp";

function formatTime(value: number): string {
  if (!Number.isFinite(value) || value <= 0) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) {
      return;
    }

    const player: HTMLAudioElement = audioElement;

    function syncTime() {
      setCurrentTime(player.currentTime);
    }

    function syncDuration() {
      setDuration(player.duration);
    }

    function handleEnded() {
      setIsPlaying(false);
      setCurrentTime(0);
    }

    player.addEventListener("timeupdate", syncTime);
    player.addEventListener("loadedmetadata", syncDuration);
    player.addEventListener("durationchange", syncDuration);
    player.addEventListener("ended", handleEnded);

    return () => {
      player.removeEventListener("timeupdate", syncTime);
      player.removeEventListener("loadedmetadata", syncDuration);
      player.removeEventListener("durationchange", syncDuration);
      player.removeEventListener("ended", handleEnded);
    };
  }, []);

  async function togglePlayback() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }

  function skipBy(seconds: number) {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      duration || audio.duration || 0,
    );
  }

  function handleSeek(value: string) {
    const audio = audioRef.current;
    const nextTime = Number(value);

    if (!audio || Number.isNaN(nextTime)) {
      return;
    }

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  return (
    <aside
      aria-label="Music player"
      className="relative overflow-hidden rounded-lg border border-purple-200/80 bg-white/90 p-3 text-purple-950 shadow-soft"
    >
      <audio preload="metadata" ref={audioRef} src={AUDIO_SRC}>
        <track kind="captions" />
      </audio>

      <div className="mb-3 flex items-center justify-between border-b border-purple-100 pb-2">
        <div className="h-2.5 w-2.5 rounded-full bg-fuchsia-300" />
        <p className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-purple-500">
          now playing
        </p>
        <div className="flex gap-1">
          <span className="h-2.5 w-2.5 rounded-sm border border-purple-300" />
          <span className="h-2.5 w-2.5 rounded-sm border border-purple-300 bg-purple-100" />
        </div>
      </div>

      <Image
        alt="Song cover"
        className="mx-auto h-24 w-24 rounded-md border border-purple-200 object-cover shadow-sm"
        height={96}
        src={COVER_SRC}
        width={96}
      />

      <div className="mt-3 text-center">
        <p className="truncate text-sm font-bold text-purple-950">
          She&apos;s My Collar
        </p>
        <p className="mt-0.5 text-xs font-medium text-purple-500">Gorillaz</p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          aria-label="Go back 10 seconds"
          className="rounded-md border border-purple-200 bg-white px-3 py-2 text-sm font-bold text-purple-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 active:translate-y-0"
          onClick={() => skipBy(-10)}
          type="button"
        >
          &lt;&lt;
        </button>
        <button
          aria-label={isPlaying ? "Pause song" : "Play song"}
          className="rounded-md bg-purple-900 px-4 py-2 text-base font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-900 active:translate-y-0"
          onClick={togglePlayback}
          type="button"
        >
          {isPlaying ? "II" : "Play"}
        </button>
        <button
          aria-label="Skip forward 10 seconds"
          className="rounded-md border border-purple-200 bg-white px-3 py-2 text-sm font-bold text-purple-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 active:translate-y-0"
          onClick={() => skipBy(10)}
          type="button"
        >
          &gt;&gt;
        </button>
      </div>

      <div className="mt-4">
        <input
          aria-label="Song progress"
          className="h-2 w-full accent-purple-700"
          max={duration || 0}
          min="0"
          onChange={(event) => handleSeek(event.target.value)}
          step="1"
          type="range"
          value={Math.min(currentTime, duration || currentTime)}
        />
        <div className="mt-1 flex justify-between text-[0.68rem] font-semibold text-purple-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </aside>
  );
}
