"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SoundState = "off" | "loading" | "on" | "error";

export function useSoundtrack() {
  const audio = useRef<HTMLAudioElement>(null);
  const [sound, setSound] = useState<SoundState>("off");
  const context = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const frequencies = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const settingUp = useRef(false);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      void context.current?.close().catch(() => {});
    };
  }, []);

  const analyse = useCallback(async () => {
    if (context.current) {
      await context.current.resume().catch(() => {});
      return;
    }
    if (settingUp.current || !window.AudioContext) return;
    settingUp.current = true;
    let next: AudioContext | null = null;
    try {
      next = new AudioContext();
      await next.resume();
      if (!alive.current || next.state !== "running" || !audio.current) {
        await next.close();
        return;
      }
      // Only capture the media element after the context is running. The direct
      // destination connection keeps playback independent of visual analysis.
      const meter = next.createAnalyser();
      meter.fftSize = 256;
      meter.smoothingTimeConstant = 0.85;
      const source = next.createMediaElementSource(audio.current);
      source.connect(next.destination);
      context.current = next;
      source.connect(meter);
      analyser.current = meter;
      frequencies.current = new Uint8Array(meter.frequencyBinCount);
    } catch {
      if (next && next !== context.current) void next.close().catch(() => {});
      // Audio analysis is optional; ordinary media playback is the fallback.
    } finally {
      settingUp.current = false;
    }
  }, []);

  const toggle = useCallback(async () => {
    const element = audio.current;
    if (!element || sound === "loading") return;
    if (!element.paused) {
      element.pause();
      return;
    }
    element.volume = 0.45;
    if (sound === "error") element.load();
    setSound("loading");
    try {
      // play() runs directly inside the gesture, including on iOS.
      const playing = element.play();
      void analyse();
      await playing;
      if (alive.current) setSound("on");
    } catch (error) {
      if (alive.current) {
        setSound(
          error instanceof DOMException && error.name === "AbortError"
            ? "off"
            : "error",
        );
      }
    }
  }, [analyse, sound]);

  const energy = useCallback(() => {
    if (!analyser.current || !frequencies.current || audio.current?.paused)
      return 0;
    analyser.current.getByteFrequencyData(frequencies.current);
    let sum = 0;
    for (let i = 2; i < 28; i++) sum += frequencies.current[i];
    return sum / (26 * 255);
  }, []);

  return { audio, sound, setSound, toggle, energy };
}
