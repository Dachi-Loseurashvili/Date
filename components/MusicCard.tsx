"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useId, useRef, useState } from "react";
import type { PlaylistSong } from "@/lib/girlfriendDay";

type MusicCardProps = {
  number: number;
  song: PlaylistSong;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function MusicCard({ number, song }: MusicCardProps) {
  const audioId = useId();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    function handleAnotherSongStarted(event: Event) {
      const activeAudioId = (event as CustomEvent<string>).detail;

      if (activeAudioId === audioId) {
        return;
      }

      audioRef.current?.pause();
      setIsPlaying(false);
    }

    window.addEventListener("date-site-audio-play", handleAnotherSongStarted);

    return () => {
      window.removeEventListener("date-site-audio-play", handleAnotherSongStarted);
    };
  }, [audioId]);

  async function togglePlayback() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      window.dispatchEvent(new CustomEvent("date-site-audio-play", { detail: audioId }));

      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }

      return;
    }

    audio.pause();
    setIsPlaying(false);
  }

  function handleSeek(value: string) {
    const audio = audioRef.current;
    const nextTime = (Number(value) / 100) * duration;

    if (!audio || !Number.isFinite(nextTime)) {
      return;
    }

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  return (
    <article className={`song-card song-card-${number}`}>
      <div className="song-cover-frame">
        <Image
          alt={`${song.title} cover`}
          className="song-cover"
          height={180}
          sizes="96px"
          src={song.coverSrc}
          width={180}
        />
        <span className="song-number">{number}</span>
      </div>

      <div className="song-body">
        <div>
          <h3>{song.title}</h3>
          <p>{song.artist}</p>
        </div>

        <div className="song-controls">
          <button
            aria-label={isPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
            className="song-play-button"
            onClick={togglePlayback}
            type="button"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <div className="song-time" aria-hidden="true">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            aria-label={`Seek ${song.title}`}
            className="song-progress"
            max="100"
            min="0"
            onChange={(event) => handleSeek(event.target.value)}
            step="0.1"
            style={{ "--song-progress": `${progress}%` } as CSSProperties}
            type="range"
            value={progress}
          />
        </div>
      </div>

      <audio
        onEnded={() => {
          setCurrentTime(0);
          setIsPlaying(false);
        }}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        preload="metadata"
        ref={audioRef}
        src={song.audioSrc}
      />
    </article>
  );
}
