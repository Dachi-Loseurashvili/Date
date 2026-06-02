import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteTitle = "Ninuca da Dachi";
const siteDescription = "ninucas dachisgan";

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
