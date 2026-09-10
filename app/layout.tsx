import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteTitle = "ჩვენი პატარა ამბავი";
const siteDescription = "ჩვენი ფოტოები, მოგონებები და ერთი წერილი ნინუცისთვის.";

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
    card: "summary_large_image",
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

export const viewport: Viewport = {
  themeColor: "#170d2c",
  width: "device-width",
  initialScale: 1,
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ka">
      <body>{children}</body>
    </html>
  );
}
