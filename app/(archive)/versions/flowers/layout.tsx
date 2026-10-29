import type { ReactNode } from "react";
import type { Viewport } from "next";
import {
  ArchiveDocument,
  archiveMetadata,
} from "@/components/versions/ArchiveDocument";
import { pastVersions } from "@/lib/versions";
import "@/legacy/flowers/styles.css";

const version = pastVersions[0];

export const metadata = archiveMetadata(version);
export const viewport: Viewport = {
  themeColor: version.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function ArchivedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <ArchiveDocument version={version}>{children}</ArchiveDocument>;
}
