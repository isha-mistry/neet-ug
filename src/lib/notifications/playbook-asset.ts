import { SITE_URL } from "@/lib/seo/site-config";

export const PLAYBOOK_FILE_NAME = "NEET_2026_MBBS_Playbook.pdf";
export const PLAYBOOK_PUBLIC_PATH = `/${PLAYBOOK_FILE_NAME}`;

/**
 * Browser-facing URL for the playbook PDF. Only used as a link fallback — the
 * WhatsApp send inlines the file as base64 so it works before/without a deploy.
 */
export function getPlaybookPdfUrl(): string {
  return new URL(PLAYBOOK_PUBLIC_PATH, SITE_URL).href;
}
