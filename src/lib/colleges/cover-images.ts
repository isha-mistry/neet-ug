import manifest from "@/data/college-cover-images.json";
import { normalizeMatchKey } from "@/lib/colleges/normalize-match-key";

type CoverManifest = {
  cloudName: string;
  folder: string;
  uploadedAt: string | null;
  bySlug: Record<
    string,
    {
      publicId: string;
      secureUrl: string;
    }
  >;
};

const data = manifest as CoverManifest;

const CARD_TRANSFORM = "c_fill,w_520,h_360,f_auto,q_auto";
const DETAIL_TRANSFORM = "c_fill,w_900,h_560,f_auto,q_auto";

/** Local AI illustrations — used when no Cloudinary photo exists for a college. */
export const AI_GENERATED_COLLEGE_COVERS = [
  "/ai_gen_college_images/AI_generated_college_img_01.png",
  "/ai_gen_college_images/AI_generated_college_img_02.png",
  "/ai_gen_college_images/AI_generated_college_img_03.png",
  "/ai_gen_college_images/AI_generated_college_img_04.png",
  "/ai_gen_college_images/AI_generated_college_img_05.png",
  "/ai_gen_college_images/AI_generated_college_img_06.png",
  "/ai_gen_college_images/AI_generated_college_img_07.png",
  "/ai_gen_college_images/AI_generated_college_img_08.png",
] as const;

function buildTransformedUrl(publicId: string, transform: string): string {
  const cloud = data.cloudName || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud) return "";
  return `https://res.cloudinary.com/${cloud}/image/upload/${transform}/${publicId}`;
}

/** Stable pick from the AI pool so the same college always gets the same illustration. */
export function getAiGeneratedCollegeCoverPath(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (Math.imul(31, hash) + slug.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % AI_GENERATED_COLLEGE_COVERS.length;
  return AI_GENERATED_COLLEGE_COVERS[index];
}

export function hasUploadedCollegePhoto(slug: string): boolean {
  return Boolean(data.bySlug[slug]?.publicId);
}

/** Cloudinary photo when available; otherwise a deterministic local AI illustration. */
export function getCollegeCoverImageUrl(
  slug: string,
  variant: "card" | "detail" = "card"
): string {
  const entry = data.bySlug[slug];
  if (entry?.publicId) {
    const transform = variant === "detail" ? DETAIL_TRANSFORM : CARD_TRANSFORM;
    const url = buildTransformedUrl(entry.publicId, transform);
    if (url) return url;
    if (entry.secureUrl) return entry.secureUrl;
  }
  return getAiGeneratedCollegeCoverPath(slug);
}

export function getCollegeCoverManifestMeta() {
  return {
    cloudName: data.cloudName,
    folder: data.folder,
    uploadedAt: data.uploadedAt,
    count: Object.keys(data.bySlug).length,
  };
}

/** Used by upload tooling to resolve filename → slug. */
export function buildCollegeNameMatchIndex(
  colleges: Array<{ slug: string; name: string }>
): Map<string, string> {
  const index = new Map<string, string>();
  for (const college of colleges) {
    index.set(normalizeMatchKey(college.name), college.slug);
  }
  return index;
}
