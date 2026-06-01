"use client";

import { useState } from "react";
import { RunawayButton } from "@/components/RunawayButton";

type InvitationCardProps = {
  onAccept: () => void;
};

export function InvitationCard({ onAccept }: InvitationCardProps) {
  const [rejectionMessage, setRejectionMessage] = useState("");

  return (
    <article className="relative overflow-hidden rounded-lg border border-purple-100/80 bg-white/90 px-6 py-7 text-center shadow-soft sm:px-8 sm:py-8">
      <span aria-hidden className="decor-heart decor-heart-one" />
      <span aria-hidden className="decor-heart decor-heart-two" />
      <span aria-hidden className="decor-sparkle decor-sparkle-one" />

      <div className="relative">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-purple-500">
          date invite ninucas dachisgan
        </p>
        <h1 className="text-balance text-3xl font-bold leading-tight text-purple-950 sm:text-4xl">
          camoxval chemtan ertad dateze?
        </h1>
        

        <div className="mt-7 flex min-h-12 items-center justify-center gap-3">
          <button
            className="rounded-full bg-purple-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-150 ease-out hover:-translate-y-0.5 hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-900 active:translate-y-0"
            onClick={onAccept}
            type="button"
          >
            Yes
          </button>

          <RunawayButton onRejectedAttempt={setRejectionMessage} />
        </div>

        <p
          aria-live="polite"
          className="mx-auto mt-5 min-h-16 max-w-sm text-base font-bold leading-6 text-purple-700 sm:text-lg"
        >
          {rejectionMessage}
        </p>
      </div>
    </article>
  );
}
