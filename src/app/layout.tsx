import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/country-code-select.css";
import "@/styles/lead-form-controls.css";
import "@/styles/lead-consent.css";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteProviders } from "@/components/layout/SiteProviders";
import { siteMetadata, siteViewport } from "@/lib/seo/site-metadata";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

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
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full bg-background text-on-surface font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
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
