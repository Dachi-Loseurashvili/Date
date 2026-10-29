import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import "../experience.css";

export const metadata: Metadata = {
  title: "Somewhere, only us.",
  description:
    "A small world, made of all our little things. For Ninutsi, from Dachi.",
  robots: {
    follow: false,
    index: false,
    googleBot: { follow: false, index: false },
  },
};

export const viewport: Viewport = {
  themeColor: "#102a25",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/instrument-serif.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/instrument-serif-italic.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/dm-sans.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
