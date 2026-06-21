/** Public site URL used for metadata, OG, and JSON-LD. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://dravio.in";

export const SITE_TITLE =
  "Dravio — MBBS counseling for NEET 2026 students";

export const SITE_DESCRIPTION =
  "Plan your MBBS admission with verified cutoff data, round-by-round counseling strategy, and expert guidance across Gujarat, Rajasthan, MP, Maharashtra and MCC All India Quota.";

export const SITE_KEYWORDS = [
  "MBBS counseling",
  "NEET 2026",
  "NEET MBBS admission",
  "MBBS in Gujarat",
  "MBBS in Rajasthan",
  "MBBS in MP",
  "MBBS in Maharashtra",
  "AIQ counseling",
  "MCC counseling",
  "ACPUGMEC",
  "RUHS",
  "DMAT",
  "NEET rank predictor",
  "MBBS college predictor",
];

export const THEME_COLOR = "#004AC6";

export const OG_IMAGE_PATH = "/dravio_meta.webp";
export const OG_IMAGE_ALT =
  "Dravio — MBBS counseling for NEET 2026 students. Verified data, round-by-round guidance, expert counselors. Covering Gujarat, Rajasthan, MP, Maharashtra and AIQ.";

/** Measured from public/dravio_meta.webp */
export const OG_IMAGE_WIDTH = 7500;
export const OG_IMAGE_HEIGHT = 3937;

export const TWITTER_SITE = "@dravio_in";

export const MANIFEST_PATH = "/site.webmanifest";

export const FAVICON = {
  svg: "/favicon.svg",
  png32: "/favicon/favicon-32x32.png",
  png16: "/favicon/favicon-16x16.png",
  apple: "/favicon/apple-touch-icon.png",
  safariPinned: "/safari-pinned-tab.svg",
  android192: "/favicon/android-chrome-192x192.png",
  android512: "/favicon/android-chrome-512x512.png",
} as const;

export const ORGANIZATION_SAME_AS = [
  "https://twitter.com/dravio_in",
  "https://www.linkedin.com/company/dravio",
  "https://www.instagram.com/dravio.in",
  "https://www.youtube.com/@dravio",
] as const;

/** Customer service line shown in Organization JSON-LD */
export const ORGANIZATION_PHONE = "+91-90909-09090";
