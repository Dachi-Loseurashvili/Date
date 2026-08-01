import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteTitle = "National Girlfriend's Day";
const siteDescription = "A private romantic puzzle, memories, and playlist.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ninucadadachi.com"),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://ninucadadachi.com",
    siteName: siteTitle,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    follow: false,
    index: false,
    googleBot: {
      follow: false,
      index: false,
    },
  },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
