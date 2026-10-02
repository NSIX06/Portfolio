import { Nav } from "@/components/layout/nav";
import { PageBackdrop } from "@/components/layout/page-backdrop";
import { ScrollBackdrop } from "@/components/layout/scroll-backdrop";
import { Providers } from "@/components/layout/providers";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { SiteEffects } from "@/components/effects/site-effects";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";

// Fontes empacotadas no projeto (sem depender do Google Fonts no build).
const geistSans = GeistSans;

// Identidade do portfólio antigo: Syne nos títulos e Space Mono nos rótulos.
const syne = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    {
      path: "../node_modules/@fontsource/syne/files/syne-latin-500-normal.woff2",
      weight: "500",
    },
    {
      path: "../node_modules/@fontsource/syne/files/syne-latin-600-normal.woff2",
      weight: "600",
    },
    {
      path: "../node_modules/@fontsource/syne/files/syne-latin-700-normal.woff2",
      weight: "700",
    },
    {
      path: "../node_modules/@fontsource/syne/files/syne-latin-800-normal.woff2",
      weight: "800",
    },
  ],
});

const spaceMono = localFont({
  variable: "--font-label",
  display: "swap",
  src: [
    {
      path: "../node_modules/@fontsource/space-mono/files/space-mono-latin-400-normal.woff2",
      weight: "400",
    },
    {
      path: "../node_modules/@fontsource/space-mono/files/space-mono-latin-700-normal.woff2",
      weight: "700",
    },
  ],
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      // As variáveis das fontes ficam no <html> porque o :root do globals.css as usa.
      className={`${geistSans.variable} ${syne.variable} ${spaceMono.variable}`}
    >
      <body
        className={`bg-background text-foreground min-h-screen font-sans antialiased`}
      >
        <Providers>
          <div className="site-frame site-frame--top" aria-hidden="true" />
          <div className="site-frame site-frame--left" aria-hidden="true" />
          <div className="site-frame site-frame--right" aria-hidden="true" />
          <svg
            className="site-corner site-corner--top-left"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
              fill="currentColor"
            />
          </svg>
          <svg
            className="site-corner site-corner--top-right"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
              fill="currentColor"
            />
          </svg>
          <SkipToContent />
          <ScrollBackdrop />
          <PageBackdrop />
          <Nav />
          {children}
          <SiteEffects />
        </Providers>
      </body>
    </html>
  );
}
