import type { SanityBlogPost } from "@/types/blog";
import { urlFor } from "@/sanity/lib/image";

/** AI-generated illustration pool in public folder for blog posts when Sanity image is missing. */
export const AI_GENERATED_BLOG_IMAGES = [
  "/ai_gen_college_images/AI_generated_college_img_01.png",
  "/ai_gen_college_images/AI_generated_college_img_02.png",
  "/ai_gen_college_images/AI_generated_college_img_03.png",
  "/ai_gen_college_images/AI_generated_college_img_04.png",
  "/ai_gen_college_images/AI_generated_college_img_05.png",
  "/ai_gen_college_images/AI_generated_college_img_06.png",
  "/ai_gen_college_images/AI_generated_college_img_07.png",
  "/ai_gen_college_images/AI_generated_college_img_08.png",
] as const;

/** Deterministically select an AI generated fallback illustration based on post slug or title. */
export function getAiGeneratedBlogImage(identifier: string): string {
  let hash = 0;
  for (let i = 0; i < identifier.length; i += 1) {
    hash = (Math.imul(31, hash) + identifier.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % AI_GENERATED_BLOG_IMAGES.length;
  return AI_GENERATED_BLOG_IMAGES[index];
}

export function getBlogCoverImage(
  post: SanityBlogPost,
  width = 800,
  height = 500
): { url: string; isAiGenerated: boolean } {
  if (post.mainImage) {
    try {
      const url = urlFor(post.mainImage).width(width).height(height).url();
      if (url) {
        return { url, isAiGenerated: false };
      }
    } catch (err) {
      console.error("Failed to generate urlFor post mainImage:", err);
    }
  }

  return {
    url: getAiGeneratedBlogImage(post.slug || post._id || post.title),
    isAiGenerated: true,
  };
}
