import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const protocol = headerStore.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(host ? `${protocol}://${host}` : "https://tools.gingiris.com");

  return {
    metadataBase,
    title: "Growth Tools has moved · Gingiris",
    description: "Gingiris Growth Tools now lives at tools.gingiris.com.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "Growth Tools has moved.",
      description: "Find Gingiris Growth Tools at tools.gingiris.com.",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Growth Tools has moved to tools.gingiris.com" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Growth Tools has moved.",
      description: "Find Gingiris Growth Tools at tools.gingiris.com.",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
