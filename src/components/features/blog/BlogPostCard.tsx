import Link from "next/link";
import { FiArrowRight, FiClock, FiUser } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import type { BlogArticle } from "@/types/content";

interface BlogPostCardProps {
  article: BlogArticle;
}

export function BlogPostCard({ article }: BlogPostCardProps) {
  return (
    <Card padded bordered elevated as="article" className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2">
        {article.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-[var(--radius-pill)] bg-brand-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-brand-800"
          >
            {tag}
          </span>
        ))}
      </div>
      <h2 className="mt-3 text-xl font-semibold tracking-snug text-text">
        {article.title}
      </h2>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-secondary">
        {article.excerpt}
      </p>
      <div className="mt-4 flex items-center gap-4 text-xs font-medium tracking-wide text-text-muted">
        <span className="inline-flex items-center gap-1">
          <FiUser aria-hidden="true" />
          {article.author}
        </span>
        <span className="inline-flex items-center gap-1">
          <FiClock aria-hidden="true" />
          {article.readMinutes} min
        </span>
      </div>
      <Link
        href={`/blog/${article.slug}`}
        className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold tracking-wide text-brand-700"
      >
        Read Article
        <FiArrowRight aria-hidden="true" />
      </Link>
    </Card>
  );
}
