import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Garage V28 - Luxury Pre-Owned Cars in Chennai",
    template: "%s | Garage V28",
  },
  description:
    "Garage V28 is Chennai's trusted luxury car dealership. Buy, sell, and browse premium used cars with confidence.",
  keywords: [
    "luxury cars",
    "pre-owned cars",
    "used cars Chennai",
    "car dealership",
    "premium cars",
  ],
  metadataBase: new URL("https://garagev28.com"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://garagev28.com",
    siteName: "Garage V28",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
