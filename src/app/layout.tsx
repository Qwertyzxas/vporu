import type { Metadata, Viewport } from "next";
import { Onest, STIX_Two_Text } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { Metrika } from "@/components/Metrika";
import { pictures } from "@/content/media";
import { meta } from "@/content/site";
import { asset } from "@/lib/asset";
import "./globals.css";

const stix = STIX_Two_Text({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-stix",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  themeColor: "#2b2216",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${stix.variable} ${onest.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body style={{ "--texture": `url("${asset(pictures.walnut.src)}")` } as CSSProperties}>
        {children}
        <Metrika />
      </body>
    </html>
  );
}
