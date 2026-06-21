import type { Metadata, Viewport } from "next";
import {
  FAVICON,
  MANIFEST_PATH,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_TITLE,
  SITE_URL,
  THEME_COLOR,
  TWITTER_SITE,
} from "@/lib/seo/site-config";

const ogImageUrl = new URL(OG_IMAGE_PATH, SITE_URL).href;

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: THEME_COLOR,
  colorScheme: "light",
};

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: "Dravio",
  authors: [{ name: "Dravio" }],
  generator: "Dravio",
  creator: "Dravio",
  publisher: "Dravio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: FAVICON.svg, type: "image/svg+xml" },
      { url: FAVICON.png32, sizes: "32x32", type: "image/png" },
      { url: FAVICON.png16, sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: FAVICON.apple, sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: FAVICON.safariPinned,
        color: THEME_COLOR,
      },
    ],
  },
  manifest: MANIFEST_PATH,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Dravio",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        type: "image/webp",
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_SITE,
    creator: TWITTER_SITE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: {
      url: ogImageUrl,
      alt: OG_IMAGE_ALT,
    },
  },
  appleWebApp: {
    capable: true,
    title: "Dravio",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "msapplication-TileColor": THEME_COLOR,
    language: "English",
    "content-language": "en-IN",
    "geo.region": "IN",
    "geo.placename": "India",
  },
};
