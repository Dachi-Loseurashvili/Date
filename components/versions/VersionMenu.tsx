"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Each historical design requires a fresh document to isolate its styles and audio. */

import { useEffect, useRef } from "react";
import { pastVersions, versionHref } from "@/lib/versions";
import type { VersionSlug } from "@/lib/versions";
import styles from "./Versions.module.css";

export function VersionMenu({
  current,
  prominent = false,
}: {
  current?: VersionSlug;
  prominent?: boolean;
}) {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (menu.current?.open && !menu.current.contains(event.target as Node))
        menu.current.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menu.current?.open) return;
      event.preventDefault();
      menu.current.open = false;
      menu.current.querySelector("summary")?.focus();
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  return (
    <details
      ref={menu}
      className={`${styles.menu} ${prominent ? styles.prominent : ""}`}
      onBlur={(event) => {
        if (
          event.relatedTarget instanceof Node &&
          !event.currentTarget.contains(event.relatedTarget)
        )
          event.currentTarget.open = false;
      }}
    >
      <summary className={styles.trigger} aria-label="Past versions">
        <svg
          className={styles.book}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 5c-2.5-2-6.5-2-9-1v15c2.5-1 6.5-1 9 1 2.5-2 6.5-2 9-1V4c-2.5-1-6.5-1-9 1Zm0 0v15"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M6 8h3M6 11h3M15 8h3M15 11h3"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        <span className={styles.triggerText}>PAST VERSIONS</span>
        {prominent && (
          <span className={styles.count} aria-hidden="true">
            {pastVersions.length}
          </span>
        )}
        <svg
          className={styles.chevron}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m3 4.5 3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <nav className={styles.panel} aria-label="Earlier chapters">
        <p className={styles.panelLabel}>OUR EARLIER CHAPTERS</p>
        {pastVersions.map((version, index) => (
          <a
            className={styles.version}
            key={version.slug}
            href={versionHref(version)}
            aria-current={current === version.slug ? "page" : undefined}
            onClick={() => {
              if (menu.current) menu.current.open = false;
            }}
          >
            <span className={styles.number}>0{index + 1}</span>
            <span className={styles.versionCopy}>
              <strong>{version.title}</strong>
              <small>{version.date}</small>
            </span>
            <svg
              className={styles.versionArrow}
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 15 15 5M5 5h10v10"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ))}
        {current && (
          <a className={styles.presentLink} href="/">
            Back to now <span aria-hidden="true">→</span>
          </a>
        )}
      </nav>
    </details>
  );
}
