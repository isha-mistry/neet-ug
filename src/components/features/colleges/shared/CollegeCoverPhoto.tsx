"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CollegeCoverPhotoProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Above-the-fold hero (detail page). Omit on listing cards for lazy load. */
  priority?: boolean;
}

export function CollegeCoverPhoto({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  priority = false,
}: CollegeCoverPhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "bg-[linear-gradient(135deg,var(--color-primary-fixed),var(--color-surface-container-low))]",
          className
        )}
        aria-hidden
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
      className={cn("object-cover object-center", imageClassName)}
      onError={() => setFailed(true)}
    />
  );
}
