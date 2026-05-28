import type { Metadata } from "next";
import { Inter, Hanken_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { getSiteIdentity } from "@/lib/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

export function generateMetadata(): Metadata {
  const site = getSiteIdentity();
  return {
    title: {
      default: `${site.brandName} — ${site.tagline}`,
      template: `%s | ${site.brandName}`,
    },
    description: site.description,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full bg-background text-on-surface font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main id="main-content" className="flex-1 bg-surface-container-lowest">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
