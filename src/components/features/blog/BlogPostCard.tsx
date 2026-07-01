import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiClock, FiUser, FiCalendar } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { urlFor } from "@/sanity/lib/image";
import type { SanityBlogPost } from "@/types/blog";

interface BlogPostCardProps {
  post: SanityBlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(600).height(380).url()
    : null;

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
      {imageUrl ? (
        <div className="relative h-48 w-full overflow-hidden bg-surface-container-low">
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-primary-fixed to-surface-container-low p-6">
          <span className="text-center font-mono text-xs font-bold uppercase tracking-widest text-primary">
            Dravio Medical Counseling
          </span>
        </div>
      )}

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

        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold tracking-wide text-primary transition-all group-hover:gap-2.5"
        >
          Read Article
          <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
