import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiClock, FiUser, FiCalendar } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { AiGeneratedCoverBadge } from "@/components/features/colleges/shared/AiGeneratedCoverBadge";
import { getBlogCoverImage } from "@/lib/blog/fallback-images";
import type { SanityBlogPost } from "@/types/blog";

interface BlogHeroFeaturedProps {
  post: SanityBlogPost;
}

export function BlogHeroFeatured({ post }: BlogHeroFeaturedProps) {
  const { url: imageUrl, isAiGenerated } = getBlogCoverImage(post, 900, 560);

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : new Date(post._createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

  const tags = post.tags && post.tags.length > 0 ? post.tags : ["Featured Guide", "NEET UG 2026"];

  return (
    <div className="relative mb-12 overflow-hidden rounded-[24px] border border-outline-variant bg-surface-container-lowest shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Image Column */}
        <div className="relative min-h-[260px] sm:min-h-[340px] lg:col-span-7 lg:min-h-[420px] bg-surface-container-low">
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
          {isAiGenerated ? <AiGeneratedCoverBadge /> : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
        </div>

        {/* Content Column */}
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-on-primary shadow-sm">
                Featured
              </span>
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary-fixed px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-on-surface sm:text-3xl lg:text-4xl">
              <Link
                href={`/blog/${post.slug}`}
                className="transition-colors hover:text-primary"
              >
                {post.title}
              </Link>
            </h2>

            <p className="mt-4 line-clamp-4 text-base leading-relaxed text-on-surface-variant">
              {post.excerpt ||
                "Deep dive into multi-year NEET UG cutoff trends, state counseling seat quotas, and data-driven admission chances analyzed by Dravio expert counselors."}
            </p>
          </div>

          <div className="mt-8 border-t border-outline-variant pt-6">
            <div className="mb-6 flex flex-wrap items-center gap-4 text-xs font-medium text-outline">
              {post.author?.name && (
                <span className="inline-flex items-center gap-1.5 font-semibold text-on-surface">
                  <FiUser aria-hidden="true" className="text-primary" />
                  {post.author.name}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <FiCalendar aria-hidden="true" />
                {formattedDate}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FiClock aria-hidden="true" />
                {post.readMinutes || 5} min read
              </span>
            </div>

            <div>
              <Button
                as="link"
                href={`/blog/${post.slug}`}
                variant="primary"
                size="md"
                trailingIcon={<FiArrowRight aria-hidden="true" className="text-base" />}
              >
                Read Full Insight
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
