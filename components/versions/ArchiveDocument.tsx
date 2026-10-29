/* eslint-disable @next/next/no-html-link-for-pages -- Each historical design requires a fresh document to isolate its styles and audio. */
import type { ReactNode } from "react";
import type { Metadata } from "next";
import type { PastVersion } from "@/lib/versions";
import { VersionMenu } from "./VersionMenu";
import styles from "./Versions.module.css";

export function archiveMetadata(version: PastVersion): Metadata {
  return {
    title: version.pageTitle,
    description: version.description,
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
  };
}

export function ArchiveDocument({
  version,
  children,
}: {
  version: PastVersion;
  children: ReactNode;
}) {
  return (
    <html lang={version.lang}>
      <body>
        <header className={styles.bar} lang="en">
          <a href="/" className={styles.backLink}>
            <svg
              className={styles.backArrow}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M20 12H4m6-6-6 6 6 6"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to now
          </a>
          <span className={styles.archiveLabel}>
            {version.title} &nbsp; / &nbsp; {version.date}
          </span>
          <VersionMenu current={version.slug} />
        </header>
        {children}
      </body>
    </html>
  );
}
