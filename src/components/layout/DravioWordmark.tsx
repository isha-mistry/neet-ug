import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cn } from "@/lib/utils";

const WORDMARK_PATH = join(process.cwd(), "public/Dravio_Wordmark.svg");

let wordmarkSvgMarkup: string | null = null;

function getWordmarkSvgMarkup(): string {
  if (!wordmarkSvgMarkup) {
    const raw = readFileSync(WORDMARK_PATH, "utf8");
    wordmarkSvgMarkup = raw.replace(
      "<svg ",
      '<svg role="img" aria-hidden="true" focusable="false" preserveAspectRatio="xMinYMid meet" ',
    );
  }
  return wordmarkSvgMarkup;
}

/** Inline wordmark SVG — avoids `<img>` sizing bugs and keeps vectors crisp. */
export function DravioWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex shrink-0 leading-none", className)}
      dangerouslySetInnerHTML={{ __html: getWordmarkSvgMarkup() }}
    />
  );
}
