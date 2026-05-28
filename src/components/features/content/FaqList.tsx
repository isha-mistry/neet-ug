"use client";

import { useState } from "react";
import type { FaqItem } from "@/types/content";

interface FaqListProps {
  items: FaqItem[];
}

export function FaqList({ items }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <details
            key={item.question}
            className="group bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden"
            open={isOpen}
          >
            <summary
              onClick={(e) => handleToggle(index, e)}
              className="flex justify-between items-center p-6 cursor-pointer list-none font-semibold text-on-surface group-hover:bg-surface-container-low transition-colors"
            >
              {item.question}
              <span
                className={`material-symbols-outlined transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </summary>
            <div className="p-6 pt-0 text-on-surface-variant text-body-md border-t border-outline-variant/30 mt-4">
              {item.answer}
            </div>
          </details>
        );
      })}
    </div>
  );
}
