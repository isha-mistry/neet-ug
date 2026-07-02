import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiClock, FiUser, FiCalendar } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AiGeneratedCoverBadge } from "@/components/features/colleges/shared/AiGeneratedCoverBadge";
import { getBlogCoverImage } from "@/lib/blog/fallback-images";
import type { SanityBlogPost } from "@/types/blog";

interface BlogPostCardProps {
  post: SanityBlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const { url: imageUrl, isAiGenerated } = getBlogCoverImage(post, 600, 380);

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

  const tags = post.tags && post.tags.length > 0 ? post.tags : ["NEET UG"];

  return (
    <Card
      bordered
      elevated
      as="article"
      className="group flex h-full flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40"
    >
      <div className="relative h-48 w-full overflow-hidden bg-surface-container-low">
        <Image
          src={imageUrl}
          alt={post.mainImage?.alt || post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isAiGenerated ? <AiGeneratedCoverBadge compact /> : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary-fixed px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="mt-3 text-xl font-bold tracking-tight text-on-surface transition-colors group-hover:text-primary">
          {post.title}
        </h2>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-on-surface-variant">
          {post.excerpt ||
            "Discover comprehensive NEET UG counseling insights, college rank predictions, and expert admission strategies."}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-outline-variant/40 pt-4 text-xs font-medium text-outline">
          {post.author?.name && (
            <span className="inline-flex items-center gap-1.5 text-on-surface-variant">
              <FiUser aria-hidden="true" className="text-primary" />
              {post.author.name}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <FiCalendar aria-hidden="true" />
            {formattedDate}
          </span>
          <span className="inline-flex items-center gap-1.5 ml-auto">
            <FiClock aria-hidden="true" />
            {post.readMinutes || 5} min read
          </span>
        </div>

        <div className="mt-4">
          <Button
            as="link"
            href={`/blog/${post.slug}`}
            variant="text"
            trailingIcon={<FiArrowRight aria-hidden="true" />}
          >
            Read Article
          </Button>
        </div>
      </div>
    </Card>
  );
}
