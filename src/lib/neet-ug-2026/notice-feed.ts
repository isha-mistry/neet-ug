/**
 * Notice feed from a Google Sheet editorial tab (gviz CSV).
 *
 * Preferred headers (row 1):
 *   date, title, summary, href, tag [, show_in_feed, sort_order]
 *
 * Aliases also accepted (monitor sheet):
 *   Detected Date, Feed Title / Notification Title, Feed Summary / description,
 *   Direct Link / PDF URL, Feed Tag, Show in Feed / published
 *
 * Publish: complete rows (title + summary + href) are live unless show_in_feed
 * is explicitly No/FALSE/0. Empty or missing show_in_feed = published.
 *
 * Source of truth: the sheet only. Fetch failure or empty sheet → empty feed
 * (no hardcoded notice list in code).
 *
 * Server-only — import from Server Components, Route Handlers, or admin server code.
 */
import "server-only";

import type {
  UpdatesNoticeItem,
  UpdatesNoticeTag,
} from "@/lib/neet-ug-2026/updates-content";

/** Dravio Notice Feed workbook (editorial CMS). Override via env if needed. */
const DEFAULT_SPREADSHEET_ID =
  "1VQYUm2ysnlMrPCHmyoC_W1vL8Epz_TNbSzR7F7MIMXc";
const DEFAULT_GID = "0";
const DEFAULT_REVALIDATE_SECONDS = 300;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const NOTICE_TAGS = new Set<string>([
  "NTA",
  "MCC",
  "Advisory",
  "Gujarat",
  "MP",
  "Rajasthan",
  "Maharashtra",
  "Karnataka",
  "UP",
]);

function revalidateSeconds(): number {
  const raw = process.env.NOTICE_FEED_REVALIDATE_SECONDS?.trim();
  if (!raw) return DEFAULT_REVALIDATE_SECONDS;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : DEFAULT_REVALIDATE_SECONDS;
}

export function resolveNoticeCsvUrl(): string {
  const full = process.env.GOOGLE_SHEETS_NOTICE_CSV_URL?.trim();
  if (full) return full;

  const id =
    process.env.GOOGLE_SHEETS_NOTICE_SPREADSHEET_ID?.trim() ||
    DEFAULT_SPREADSHEET_ID;
  const gid =
    process.env.GOOGLE_SHEETS_NOTICE_GID?.trim() || DEFAULT_GID;
  return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&gid=${gid}`;
}

/** Minimal RFC4180-style CSV parse (quoted fields, commas, newlines). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let i = 0;
  let inQuotes = false;

  const pushField = () => {
    row.push(field);
    field = "";
  };
  const pushRow = () => {
    if (row.length === 1 && row[0] === "" && rows.length > 0) {
      row = [];
      return;
    }
    rows.push(row);
    row = [];
  };

  while (i < text.length) {
    const c = text[i]!;
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += c;
      i += 1;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }
    if (c === ",") {
      pushField();
      i += 1;
      continue;
    }
    if (c === "\r") {
      i += 1;
      continue;
    }
    if (c === "\n") {
      pushField();
      pushRow();
      i += 1;
      continue;
    }
    field += c;
    i += 1;
  }
  pushField();
  if (row.length > 1 || (row.length === 1 && row[0] !== "")) {
    pushRow();
  }
  return rows;
}

function normalizeHeader(h: string): string {
  return h
    .replace(/^\uFEFF/, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

/** Map various header labels → canonical keys. */
function canonicalKey(header: string): string | null {
  const h = normalizeHeader(header);
  const aliases: Record<string, string> = {
    // Editorial (preferred)
    date: "date",
    title: "title",
    summary: "summary",
    description: "summary",
    href: "href",
    link: "href",
    url: "href",
    tag: "tag",
    show_in_feed: "showInFeed",
    "show in feed": "showInFeed",
    publish: "showInFeed",
    published: "showInFeed",
    sort_order: "sortOrder",
    "sort order": "sortOrder",
    // Monitor / legacy
    "sr no": "srNo",
    "sr. no": "srNo",
    "detected date": "date",
    "detected time (ist)": "detectedTime",
    "detected time": "detectedTime",
    "state / body": "stateBody",
    state: "stateBody",
    "site name": "siteName",
    "notification title": "title",
    "feed title": "title",
    "direct link / pdf url": "href",
    "direct link": "href",
    "pdf url": "href",
    "source page url": "sourcePage",
    status: "status",
    remarks: "remarks",
    "feed summary": "summary",
    "feed tag": "tag",
  };
  return aliases[h] ?? null;
}

function rowsToObjects(matrix: string[][]): Record<string, string>[] {
  if (matrix.length < 2) return [];
  const headers = matrix[0]!.map((h) => canonicalKey(h));
  const out: Record<string, string>[] = [];
  for (let r = 1; r < matrix.length; r++) {
    const cells = matrix[r]!;
    const obj: Record<string, string> = {};
    let hasValue = false;
    headers.forEach((key, i) => {
      if (!key) return;
      const v = (cells[i] ?? "").trim();
      if (v) hasValue = true;
      // Prefer first non-empty when duplicate headers map to same key
      if (v || obj[key] === undefined) obj[key] = v;
    });
    if (hasValue) out.push(obj);
  }
  return out;
}

/**
 * Empty / missing → published (editorial sheet).
 * Explicit No/FALSE/0 → hidden.
 */
export function isShowInFeedPublished(raw: string | undefined): boolean {
  const v = (raw ?? "").trim().toLowerCase();
  if (!v) return true;
  if (
    v === "no" ||
    v === "n" ||
    v === "false" ||
    v === "0" ||
    v === "hide" ||
    v === "hidden" ||
    v === "off" ||
    v === "draft"
  ) {
    return false;
  }
  if (
    v === "yes" ||
    v === "y" ||
    v === "true" ||
    v === "1" ||
    v === "publish" ||
    v === "published"
  ) {
    return true;
  }
  // Unknown non-empty value: treat as published if truthy-looking
  return true;
}

function encodeHref(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    const u = new URL(withProtocol.replace(/ /g, "%20"));
    const path = u.pathname
      .split("/")
      .map((seg) => {
        if (!seg) return seg;
        try {
          return encodeURIComponent(decodeURIComponent(seg));
        } catch {
          return encodeURIComponent(seg);
        }
      })
      .join("/");
    u.pathname = path;
    return u.href;
  } catch {
    return trimmed.replace(/ /g, "%20");
  }
}

const MONTH_INDEX: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

/** Parse DD-MM-YYYY, D/M/YYYY, or "31 July 2026" → Date (local). */
export function parseDetectedDate(raw: string): Date | null {
  const s = raw.trim();
  if (!s) return null;

  const dmy = s.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
  if (dmy) {
    const day = Number(dmy[1]);
    const month = Number(dmy[2]) - 1;
    const year = Number(dmy[3]);
    const d = new Date(year, month, day);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  const named = s.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (named) {
    const day = Number(named[1]);
    const month = MONTH_INDEX[named[2]!.toLowerCase()];
    const year = Number(named[3]);
    if (month == null) return null;
    const d = new Date(year, month, day);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  const iso = Date.parse(s);
  if (!Number.isNaN(iso)) return new Date(iso);
  return null;
}

export function formatDisplayDate(raw: string): string {
  const d = parseDetectedDate(raw);
  if (!d) return raw.trim();
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function parseTimeMinutes(raw: string): number {
  const s = raw.trim();
  if (!s) return 0;
  const ampm = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (ampm) {
    let h = Number(ampm[1]) % 12;
    if (ampm[3]!.toUpperCase() === "PM") h += 12;
    return h * 60 + Number(ampm[2]);
  }
  const twentyFour = s.match(/^(\d{1,2}):(\d{2})$/);
  if (twentyFour) {
    return Number(twentyFour[1]) * 60 + Number(twentyFour[2]);
  }
  return 0;
}

/** Higher = earlier in feed. sort_order wins when set (inverted so lower sort_order ranks higher). */
function sortMeta(row: Record<string, string>): {
  useOrder: boolean;
  order: number;
  dateKey: number;
} {
  const orderRaw = (row.sortOrder ?? "").trim();
  if (orderRaw !== "") {
    const order = Number.parseInt(orderRaw, 10);
    if (Number.isFinite(order)) {
      return { useOrder: true, order, dateKey: 0 };
    }
  }
  const d = parseDetectedDate(row.date ?? "");
  const dayMs = d ? d.getTime() : 0;
  const mins = parseTimeMinutes(row.detectedTime ?? "");
  const sr = Number.parseInt(row.srNo ?? "0", 10) || 0;
  return {
    useOrder: false,
    order: 0,
    dateKey: dayMs + mins * 60_000 + sr,
  };
}

function mapTag(
  tagRaw: string | undefined,
  stateBody: string | undefined,
  siteName: string | undefined,
): UpdatesNoticeTag {
  const override = (tagRaw ?? "").trim();
  if (override) {
    const normalized = override.replace(/\s+/g, " ");
    const compact = normalized.toLowerCase();
    if (NOTICE_TAGS.has(normalized)) return normalized as UpdatesNoticeTag;
    // Case-insensitive exact match
    for (const t of NOTICE_TAGS) {
      if (t.toLowerCase() === compact) return t as UpdatesNoticeTag;
    }
    if (compact === "mp" || compact === "madhya pradesh") return "MP";
    if (compact === "uttar pradesh" || compact === "u.p.") return "UP";
    if (compact.includes("mcc") || compact === "all india") return "MCC";
    if (compact.includes("nta")) return "NTA";
    if (compact.includes("gujarat")) return "Gujarat";
    if (compact.includes("rajasthan")) return "Rajasthan";
    if (compact.includes("maharashtra")) return "Maharashtra";
    if (compact.includes("karnataka")) return "Karnataka";
  }

  const blob = `${stateBody ?? ""} ${siteName ?? ""}`.toLowerCase();
  if (blob.includes("nta") || blob.includes("neet.nta")) return "NTA";
  if (blob.includes("mcc") || blob.includes("all india") || blob.includes("aiq"))
    return "MCC";
  if (blob.includes("gujarat") || blob.includes("acpugmec")) return "Gujarat";
  if (blob.includes("madhya pradesh") || /\bmp\b/.test(blob)) return "MP";
  if (blob.includes("rajasthan")) return "Rajasthan";
  if (blob.includes("maharashtra")) return "Maharashtra";
  if (blob.includes("karnataka")) return "Karnataka";
  if (blob.includes("uttar pradesh") || blob.includes(" u.p")) return "UP";
  return "Advisory";
}

export function mapSheetRowsToNotices(
  rows: Record<string, string>[],
): UpdatesNoticeItem[] {
  const items: {
    notice: UpdatesNoticeItem;
    useOrder: boolean;
    order: number;
    dateKey: number;
  }[] = [];

  for (const row of rows) {
    if (!isShowInFeedPublished(row.showInFeed)) continue;

    const href = encodeHref(row.href ?? "");
    const title = (row.title ?? "").trim();
    const summary = (row.summary ?? "").trim();
    if (!href || !title || !summary) continue;

    const meta = sortMeta(row);
    items.push({
      useOrder: meta.useOrder,
      order: meta.order,
      dateKey: meta.dateKey,
      notice: {
        date: formatDisplayDate(row.date || ""),
        title,
        summary,
        href,
        tag: mapTag(row.tag, row.stateBody, row.siteName),
      },
    });
  }

  items.sort((a, b) => {
    if (a.useOrder || b.useOrder) {
      if (a.useOrder && b.useOrder) return a.order - b.order;
      if (a.useOrder) return -1;
      return 1;
    }
    return b.dateKey - a.dateKey;
  });

  return items.map((x) => x.notice);
}

export async function getNoticeFeed(): Promise<UpdatesNoticeItem[]> {
  const url = resolveNoticeCsvUrl();
  try {
    const res = await fetch(url, {
      next: { revalidate: revalidateSeconds() },
      headers: {
        Accept: "text/csv,text/plain,*/*",
        "User-Agent": "DravioNoticeFeed/1.0",
      },
    });
    if (!res.ok) {
      console.warn(`[notice-feed] CSV fetch failed ${res.status} ${url}`);
      return [];
    }
    const body = await res.text();
    if (
      !body.trim() ||
      body.trimStart().startsWith("<!DOCTYPE") ||
      body.trimStart().startsWith("<html")
    ) {
      console.warn("[notice-feed] Non-CSV response (HTML?) — check sheet sharing");
      return [];
    }

    const matrix = parseCsv(body);
    const objects = rowsToObjects(matrix);
    const notices = mapSheetRowsToNotices(objects);
    if (notices.length === 0) {
      console.warn(
        "[notice-feed] Sheet OK but zero live rows (need title+summary+href; show_in_feed not No)",
      );
      return [];
    }
    return notices;
  } catch (err) {
    console.error("[notice-feed] fetch error", err);
    return [];
  }
}

export async function getLatestUpdatesNotice(): Promise<UpdatesNoticeItem | null> {
  const feed = await getNoticeFeed();
  return feed[0] ?? null;
}
