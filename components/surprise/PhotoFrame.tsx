"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties } from "react";
import type { PhotoAsset } from "@/lib/surpriseContent";

type PhotoFrameProps = {
  className?: string;
  photo: PhotoAsset;
  priority?: boolean;
  sizes: string;
};

export function PhotoFrame({
  className = "",
  photo,
  priority = false,
  sizes,
}: PhotoFrameProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`photo-frame ${className} ${hasError ? "photo-frame-missing" : ""}`}
      style={{ "--photo-tilt": `${photo.rotation}deg` } as CSSProperties}
    >
      <div className="photo-frame-image">
        {hasError ? (
          <div className="photo-fallback" role="img" aria-label={photo.alt}>
            <span aria-hidden="true">♡</span>
            <small>ფოტო ვერ ჩაიტვირთა</small>
          </div>
        ) : (
          <Image
            alt={photo.alt}
            fill
            onError={() => setHasError(true)}
            priority={priority}
            sizes={sizes}
            src={photo.src}
          />
        )}
      </div>
    </div>
  );
}
