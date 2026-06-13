"use client";

import { useState } from "react";
import { BloomingFlowers } from "@/components/BloomingFlowers";
import { RunawayButton } from "@/components/RunawayButton";

type InvitationCardProps = {
  onAccept: () => void;
};

export function InvitationCard({ onAccept }: InvitationCardProps) {
  const [rejectionMessage, setRejectionMessage] = useState("");

  return (
    <article className="relative min-h-[24rem] overflow-hidden rounded-lg border border-purple-100/80 bg-white/90 px-7 py-9 text-center shadow-soft sm:min-h-[27.75rem] sm:px-10 sm:py-11">
      <span aria-hidden className="decor-heart decor-heart-one" />
      <span aria-hidden className="decor-heart decor-heart-two" />
      <span aria-hidden className="decor-sparkle decor-sparkle-one" />
      <BloomingFlowers variant="invitation" />

      <div className="relative z-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-purple-500 sm:text-sm">
          date invite ninucas dachisgan
        </p>
        <h1 className="text-balance text-4xl font-bold leading-tight text-purple-950 sm:text-5xl">
          camoxval chemtan dateze?
        </h1>
        

        <div className="mt-9 flex min-h-14 items-center justify-center gap-4">
          <button
            className="rounded-full bg-purple-900 px-8 py-4 text-base font-semibold text-white shadow-sm transition duration-150 ease-out hover:-translate-y-0.5 hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-900 active:translate-y-0"
            onClick={onAccept}
            type="button"
          >
            Yes
          </button>

          <RunawayButton onRejectedAttempt={setRejectionMessage} />
        </div>

        <p
          aria-live="polite"
          className="mx-auto mt-6 min-h-20 max-w-md text-lg font-bold leading-7 text-purple-700 sm:text-xl"
        >
          {rejectionMessage}
        </p>
      </div>
    </article>
  );
}
