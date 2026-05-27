import { FiCheck, FiX } from "react-icons/fi";
import { Card, CardHeader } from "@/components/ui/Card";
import type { CollegeReviews } from "@/types/college";

interface ReviewsBlockProps {
  reviews: CollegeReviews;
}

export function ReviewsBlock({ reviews }: ReviewsBlockProps) {
  const hasContent = reviews.pros.length + reviews.cons.length > 0;
  return (
    <Card padded bordered>
      <CardHeader
        title="Reviews"
        description="Structured pros and cons curated from student feedback."
      />
      {hasContent ? (
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <ReviewList items={reviews.pros} tone="pros" />
          <ReviewList items={reviews.cons} tone="cons" />
        </div>
      ) : (
        <p className="mt-4 text-sm tracking-wide text-text-muted">
          Reviews will be added soon.
        </p>
      )}
    </Card>
  );
}

function ReviewList({
  items,
  tone,
}: {
  items: string[];
  tone: "pros" | "cons";
}) {
  const isPros = tone === "pros";
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
        {isPros ? "Pros" : "Cons"}
      </h4>
      <ul className="flex flex-col gap-2">
        {items.map((item, index) => (
          <li
            key={`${tone}-${index}`}
            className="flex items-start gap-2 rounded-[var(--radius-md)] border border-border bg-surface px-3 py-2 text-sm leading-relaxed text-text-secondary"
          >
            <span
              aria-hidden="true"
              className={
                isPros
                  ? "mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-[var(--radius-pill)] bg-safe-surface text-safe"
                  : "mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-[var(--radius-pill)] bg-risky-surface text-risky"
              }
            >
              {isPros ? <FiCheck /> : <FiX />}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
