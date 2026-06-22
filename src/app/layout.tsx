import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { hankenGrotesk } from "@/lib/fonts/hanken-grotesk";
import "@/styles/country-code-select.css";
import "@/styles/lead-form-controls.css";
import "@/styles/lead-consent.css";
import {
  GoogleTagManagerHead,
  GoogleTagManagerNoScript,
} from "@/components/seo/GoogleTagManager";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
      className={` ${hankenGrotesk.variable} h-full antialiased`}
    >
      <head>
        <GoogleTagManagerHead />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- icon font; not available via next/font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-background text-on-surface font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
        <GoogleTagManagerNoScript />
        <SiteJsonLd />
        <SiteProviders>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main id="main-content" className="flex-1 bg-surface-container-lowest">
              {children}
            </main>
            <Footer />
          </div>
        </SiteProviders>
      </body>
    </html>
  );
}
