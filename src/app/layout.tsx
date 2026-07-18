import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { hankenGrotesk } from "@/lib/fonts/hanken-grotesk";
import { materialSymbolsOutlined } from "@/lib/fonts/material-symbols-outlined";
import "@/styles/country-code-select.css";
import "@/styles/lead-form-controls.css";
import "@/styles/lead-consent.css";
import {
  GoogleTagManagerHead,
  GoogleTagManagerNoScript,
} from "@/components/seo/GoogleTagManager";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { SiteProviders } from "@/components/layout/SiteProviders";
import { siteMetadata, siteViewport } from "@/lib/seo/site-metadata";

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${hankenGrotesk.variable} ${materialSymbolsOutlined.variable} h-full antialiased`}
    >
      <head>
        <GoogleTagManagerHead />
      </head>
      <body className="min-h-full bg-background text-on-surface font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
        <GoogleTagManagerNoScript />
        <SiteJsonLd />
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}
