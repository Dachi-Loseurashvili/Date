import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

export function Photo({
  id,
  alt,
  priority = false,
  position = "center",
  sizes = "(max-width: 700px) 80vw, 35vw",
}: {
  id: string;
  alt: string;
  priority?: boolean;
  position?: string;
  sizes?: string;
}) {
  return (
    <Image
      src={`/assets/universe/${id}.webp`}
      alt={alt}
      fill
      unoptimized
      priority={priority}
      sizes={sizes}
      draggable={false}
      style={{ objectPosition: position }}
    />
  );
}

export function Star({
  className = "",
  style,
  hollow = false,
}: {
  className?: string;
  style?: CSSProperties;
  hollow?: boolean;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 1.5c1.8 13.9 4.6 16.7 18.5 18.5C24.6 21.8 21.8 24.6 20 38.5 18.2 24.6 15.4 21.8 1.5 20 15.4 18.2 18.2 15.4 20 1.5Z"
        fill={hollow ? "none" : "currentColor"}
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export function Arrow({
  direction = "right",
  className = "",
}: {
  direction?: "right" | "left" | "up";
  className?: string;
}) {
  return (
    <svg
      className={`arrow-icon ${className}`}
      style={{
        transform:
          direction === "left"
            ? "rotate(180deg)"
            : direction === "up"
              ? "rotate(-45deg)"
              : undefined,
      }}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 14h18M15 6l8 8-8 8"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OrbitMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 60"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="30" cy="30" r="17" stroke="currentColor" strokeWidth=".9" />
      <ellipse
        cx="30"
        cy="30"
        rx="28"
        ry="10"
        transform="rotate(-35 30 30)"
        stroke="currentColor"
        strokeWidth=".9"
      />
      <circle cx="52" cy="14" r="3" fill="currentColor" />
      <circle cx="30" cy="30" r="3" fill="currentColor" />
    </svg>
  );
}

export function UniverseStamp({ className = "" }: { className?: string }) {
  return (
    <div className={`universe-stamp ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <defs>
          <path
            id="stamp-circle"
            d="M60,60m-44,0a44,44 0 1,1 88,0a44,44 0 1,1 -88,0"
          />
        </defs>
        <text>
          <textPath href="#stamp-circle" textLength="276">
            A TINY UNIVERSE · JUST FOR YOU ·{" "}
          </textPath>
        </text>
      </svg>
      <Star />
    </div>
  );
}

export function ChapterLink({
  children,
  onClick,
  dark = false,
}: {
  children: ReactNode;
  onClick: () => void;
  dark?: boolean;
}) {
  return (
    <button
      className={`chapter-link ${dark ? "chapter-link--dark" : ""}`}
      onClick={onClick}
    >
      <span>{children}</span>
      <span className="chapter-link-arrow">
        <Arrow />
      </span>
    </button>
  );
}
