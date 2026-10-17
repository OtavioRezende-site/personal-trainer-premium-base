import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/paths";
import { trainer } from "@/data/trainer";
import { MotionProvider } from "@/components/motion-provider";
import { ContactProvider } from "@/components/contact";
import "./globals.css";

const display = localFont({ src: "../../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-700-normal.woff2", variable: "--font-display", display: "swap", weight: "700" });
const sans = localFont({ src: [
  { path: "../../node_modules/@fontsource/manrope/files/manrope-latin-400-normal.woff2", weight: "400" },
  { path: "../../node_modules/@fontsource/manrope/files/manrope-latin-500-normal.woff2", weight: "500" },
  { path: "../../node_modules/@fontsource/manrope/files/manrope-latin-600-normal.woff2", weight: "600" },
  { path: "../../node_modules/@fontsource/manrope/files/manrope-latin-700-normal.woff2", weight: "700" },
], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(trainer.seo.siteUrl ? new URL(trainer.seo.siteUrl).origin : "http://localhost:3000"),
  ...(trainer.seo.siteUrl ? { alternates: { canonical: trainer.seo.siteUrl } } : {}),
  title: { default: trainer.seo.title, template: `%s | ${trainer.name}` }, description: trainer.seo.description,
  applicationName: `${trainer.name} — ${trainer.professionalTitle}`,
  robots: { index: !trainer.isDemo && !!trainer.seo.siteUrl, follow: !trainer.isDemo && !!trainer.seo.siteUrl },
  openGraph: { images: [{ url: assetPath("/opengraph-image.png"), width: 1200, height: 630, alt: "Treino com propósito. Movimento com a sua medida." }], type: "website", locale: trainer.seo.locale, title: trainer.seo.title, description: trainer.seo.description, siteName: trainer.name, ...(trainer.seo.siteUrl ? { url: trainer.seo.siteUrl } : {}) },
  twitter: { images: [assetPath("/opengraph-image.png")], card: "summary_large_image", title: trainer.seo.title, description: trainer.seo.description },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: trainer.brand.background, colorScheme: "dark light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const colors = { "--color-ink": trainer.brand.background, "--color-surface": trainer.brand.surface, "--color-ivory": trainer.brand.ivory, "--color-lime": trainer.brand.accent, "--hero-desktop-position": trainer.hero.desktopPosition, "--hero-mobile-position": trainer.hero.mobilePosition, "--hero-tablet-position": trainer.hero.tabletLandscapePosition, "--hero-tablet-portrait-position": trainer.hero.tabletPortraitPosition } as CSSProperties;
  return <html lang="pt-BR" className={`${display.variable} ${sans.variable}`} style={colors}><body><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><MotionProvider><ContactProvider>{children}</ContactProvider></MotionProvider></body></html>;
}
