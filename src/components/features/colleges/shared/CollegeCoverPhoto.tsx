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
  priority?: boolean;
}

export function CollegeCoverPhoto({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  priority,
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
      className={cn("object-cover object-center", imageClassName)}
      onError={() => setFailed(true)}
    />
  );
}
