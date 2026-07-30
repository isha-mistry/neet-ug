import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Reads a file from `public/` and returns it base64 encoded.
 *
 * Evolution accepts either a URL or base64 for media. Base64 is used so sends
 * do not depend on `NEXT_PUBLIC_SITE_URL` being publicly reachable, which is
 * never true in local dev and is only true after a deploy in production.
 */
export async function readPublicFileAsBase64(
  publicPath: string,
): Promise<string | null> {
  const relative = publicPath.replace(/^\/+/, "");
  // Guard against escaping public/ via a crafted template path.
  if (!relative || relative.includes("..")) return null;

  const absolute = path.join(process.cwd(), "public", relative);
  try {
    const file = await readFile(absolute);
    return file.toString("base64");
  } catch {
    return null;
  }
}
