"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { PhotoSelection } from "@/lib/universe";
import { FINAL_LETTER } from "@/lib/surpriseContent";
import { Arrow, Photo, Star } from "./Artwork";

function Dialog({
  children,
  onClose,
  label,
  className = "",
  onStep,
}: {
  children: ReactNode;
  onClose: () => void;
  label: string;
  className?: string;
  onStep?: (direction: number) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const requestClose = () => {
    // Let the browser restore focus before React removes the dialog.
    ref.current?.close();
  };
  useEffect(() => {
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`universe-dialog ${className}`}
      aria-label={label}
      onClose={(event) => {
        // Strict Mode can reopen the node before its cleanup's queued close
        // event arrives. Only dismiss a dialog that is actually closed.
        if (!event.currentTarget.open) onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
      onKeyDown={(event) => {
        if (
          !onStep ||
          (event.key !== "ArrowLeft" && event.key !== "ArrowRight")
        )
          return;
        event.preventDefault();
        onStep(event.key === "ArrowLeft" ? -1 : 1);
      }}
    >
      <div className="dialog-surface">
        <div className="dialog-toolbar">
          <button
            className="dialog-close"
            onClick={requestClose}
            aria-label="Close"
          >
            <span />
            <span />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}

export function PhotoDialog({
  selection,
  onClose,
  onStep,
}: {
  selection: PhotoSelection;
  onClose: () => void;
  onStep: (direction: number) => void;
}) {
  const photo = selection.collection[selection.index];
  return (
    <Dialog
      onClose={onClose}
      label={photo.title}
      onStep={onStep}
      className="photo-dialog"
    >
      <figure>
        <div className="dialog-photo" key={photo.id}>
          <Photo {...photo} sizes="(max-width: 700px) 90vw, 650px" />
        </div>
        <figcaption>
          <div>
            <p className="eyebrow">A LITTLE PIECE OF OUR UNIVERSE</p>
            <h2>{photo.title}</h2>
          </div>
          <Star />
        </figcaption>
      </figure>
      <div className="dialog-pagination">
        <button
          className="circle-control"
          onClick={() => onStep(-1)}
          aria-label="Previous photograph"
        >
          <Arrow direction="left" />
        </button>
        <span aria-live="polite">
          {String(selection.index + 1).padStart(2, "0")} <i>/</i>{" "}
          {String(selection.collection.length).padStart(2, "0")}
        </span>
        <button
          className="circle-control"
          onClick={() => onStep(1)}
          aria-label="Next photograph"
        >
          <Arrow />
        </button>
      </div>
    </Dialog>
  );
}

export function LetterDialog({ onClose }: { onClose: () => void }) {
  return (
    <Dialog
      onClose={onClose}
      label="A letter from Dachi to Ninutsi"
      className="letter-dialog"
    >
      <article lang="ka">
        <Star />
        <p className="eyebrow" lang="en">
          FOR YOUR EYES, ALWAYS.
        </p>
        <h2>{FINAL_LETTER.title}</h2>
        <p className="letter-salutation">{FINAL_LETTER.salutation}</p>
        {FINAL_LETTER.body.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <p className="letter-signature">
          {FINAL_LETTER.signature}
          <Star />
        </p>
      </article>
    </Dialog>
  );
}
