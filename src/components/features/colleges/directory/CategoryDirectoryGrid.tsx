import Link from "next/link";
import { FiArrowRight, FiLayers } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { formatNumber } from "@/lib/utils";
import type { CategoryRecord } from "@/types/college";

export interface CategoryDirectoryItem extends CategoryRecord {
  collegeCount: number;
}

interface CategoryDirectoryGridProps {
  categories: CategoryDirectoryItem[];
}

export function CategoryDirectoryGrid({
  categories,
}: CategoryDirectoryGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/colleges/category/${category.slug}`}
          className="group flex"
        >
          <Card
            padded
            bordered
            elevated
            className="flex w-full flex-col gap-4 transition-shadow group-hover:shadow-[var(--shadow-md)]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-[14px] ms-gradient-soft text-brand-700">
              <FiLayers aria-hidden="true" className="h-5 w-5" />
            </span>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold tracking-snug text-text">
                {category.title}
              </h2>
              <p className="text-sm leading-relaxed text-text-muted">
                {category.description}
              </p>
            </div>
            <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm font-semibold tracking-tight text-text">
                {formatNumber(category.collegeCount)} colleges
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-brand-700">
                Browse
                <FiArrowRight aria-hidden="true" />
              </span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
