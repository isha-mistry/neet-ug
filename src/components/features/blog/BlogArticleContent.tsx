"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextReactComponents } from "@portabletext/react";
import { FiMessageCircle, FiAward, FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { urlFor } from "@/sanity/lib/image";
import type { SanityBlogPost } from "@/types/blog";
import { openCounselWhatsApp } from "@/lib/leads/whatsapp";

interface BlogArticleContentProps {
  post: SanityBlogPost;
}

const ptComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref && !value?.asset?._id) {
        return null;
      }
      return (
        <div className="my-8 overflow-hidden rounded-[20px] border border-outline-variant bg-surface-container-low shadow-sm">
          <div className="relative max-h-[500px] w-full">
            <Image
              src={urlFor(value).width(1000).url()}
              alt={value.alt || "Blog article image"}
              width={1000}
              height={560}
              className="h-auto w-full object-cover"
            />
          </div>
          {value.alt && (
            <p className="bg-surface-container-lowest py-2.5 px-4 text-center text-xs font-medium text-outline">
              {value.alt}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="mt-10 mb-4 text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight text-on-surface sm:text-3xl border-b border-outline-variant/40 pb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-bold tracking-tight text-on-surface sm:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg font-bold text-on-surface">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-l-primary bg-surface-container-low/80 p-6 rounded-r-[16px] italic leading-relaxed text-on-surface">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-base leading-relaxed text-on-surface-variant">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 ml-6 list-disc space-y-2 text-base leading-relaxed text-on-surface-variant">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 ml-6 list-decimal space-y-2 text-base leading-relaxed text-on-surface-variant">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-on-surface">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-primary font-medium">{children}</em>,
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          target={!value.href.startsWith("/") ? "_blank" : undefined}
          className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
        >
          {children}
        </a>
      );
    },
  },
};

export function BlogArticleContent({ post }: BlogArticleContentProps) {
  const handleWhatsAppConsult = () => {
    openCounselWhatsApp([
      `Hi Dravio Team, I read your article "${post.title}" and want counseling guidance for NEET UG 2026.`,
    ]);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Rich Text Body */}
      <div className="prose-article max-w-none">
        {post.body && post.body.length > 0 ? (
          <PortableText value={post.body} components={ptComponents} />
        ) : (
          <p className="text-base leading-relaxed text-on-surface-variant">
            {post.excerpt || "Article content is currently being updated in Sanity Studio."}
          </p>
        )}
      </div>

      {/* Card Left-Border Accent CTA */}
      <div className="mt-8 rounded-[20px] border border-outline-variant border-l-4 border-l-primary bg-surface-container-lowest p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <span className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Next Steps
            </span>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-on-surface sm:text-2xl">
              Need Help With Your MBBS Admissions?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              Don't leave your counseling choices to guesswork. Get data-driven rank prediction and personalized seat selection support from Dravio experts.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:shrink-0 sm:flex-row sm:items-center">
            <Button
              as="link"
              href="/reneet-rank-predictor-2026"
              variant="primary"
              size="md"
              leadingIcon={<FiAward className="text-base" />}
            >
              Check Chances
            </Button>
            <Button
              as="button"
              type="button"
              onClick={handleWhatsAppConsult}
              variant="secondary"
              size="md"
              leadingIcon={<FiMessageCircle className="text-base text-[#25D366]" />}
            >
              Talk on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
