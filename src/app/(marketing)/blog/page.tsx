import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiMessageCircle } from "react-icons/fi";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHeader } from "@/components/common/PageHeader";
import { ContentPageShell } from "@/components/features/content/ContentPageShell";
import { BlogPostCard } from "@/components/features/blog/BlogPostCard";
import { BlogHeroFeatured } from "@/components/features/blog/BlogHeroFeatured";
import { BlogEmptyState } from "@/components/features/blog/BlogEmptyState";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_POSTS_QUERY } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo/metadata";
import type { SanityBlogPost } from "@/types/blog";

export const revalidate = 60; // revalidate every minute if ISR

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "NEET UG 2026 Counseling Insights & Cutoff Guides",
    description:
      "Expert NEET UG 2026 counseling guides, AIQ cutoff trends, state counseling directories, and data-driven admission strategies from Dravio medical counselors.",
    path: "/blog",
  });
}

export default async function BlogHomePage() {
  let posts: SanityBlogPost[] = [];
  try {
    const response = await sanityFetch({ query: ALL_POSTS_QUERY });
    posts = (response.data as SanityBlogPost[]) || [];
  } catch (err) {
    console.error("Failed to fetch blog posts from Sanity:", err);
    posts = [];
  }

  const featuredPost = posts.find((post) => post.featured) || (posts.length > 0 ? posts[0] : undefined);
  const gridPosts = featuredPost
    ? posts.filter((post) => post._id !== featuredPost._id)
    : posts;

  return (
    <ContentPageShell>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />

      <PageHeader
        eyebrow="Dravio Insights · NEET UG 2026"
        title="Master Your Medical Career Journey"
        description="Data-driven counseling analysis, historical cutoff shifts, fee structure transparency, and strategic admission guides curated by Dravio medical experts."
      />

      {posts.length === 0 ? (
        <BlogEmptyState />
      ) : (
        <div className="flex flex-col gap-8">
          {featuredPost && <BlogHeroFeatured post={featuredPost} />}

          {gridPosts.length > 0 && (
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-outline-variant pb-3">
                <h2 className="text-2xl font-bold tracking-tight text-on-surface">
                  Latest Articles
                </h2>
                <span className="font-mono text-xs font-semibold text-outline">
                  {gridPosts.length} {gridPosts.length === 1 ? "Guide" : "Guides"}
                </span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post) => (
                  <BlogPostCard key={post._id} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Gradient CTA Band according to design.md Section 2.6 / 3 */}
      <div className="mt-16 overflow-hidden rounded-[28px] bg-gradient-to-br from-primary to-primary-pressed p-8 text-on-primary shadow-lg sm:p-12">
        <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
          <div className="max-w-2xl">
            <span className="rounded-full bg-on-primary/15 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-widest text-brand-inverse-muted backdrop-blur-sm">
              Free Expert Consultation
            </span>
            <h3 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              Unsure About Your AIQ or State Counseling Chances?
            </h3>
            <p className="mt-3 text-base leading-relaxed text-brand-inverse-body">
              Connect directly with experienced Dravio medical admission counselors via WhatsApp. Get customized college recommendations based on your projected rank and domicile.
            </p>
          </div>

          <div className="flex flex-col gap-3.5 sm:flex-row shrink-0">
            <Link
              href="/rank-predictor"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-on-primary px-7 py-3.5 text-sm font-bold text-primary shadow-sm transition-transform hover:-translate-y-[1px] hover:bg-primary-fixed"
            >
              Predict My Rank
              <FiArrowRight className="text-base" />
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_COUNSEL_WHATSAPP_NUMBER || "919876543210"}?text=${encodeURIComponent("Hi Dravio Team, I want free MBBS counseling review after reading your blog.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-on-primary/30 bg-transparent px-7 py-3.5 text-sm font-bold text-on-primary transition-colors hover:border-on-primary hover:bg-on-primary/10"
            >
              <FiMessageCircle className="text-base text-[#25D366]" />
              WhatsApp Advisor
            </a>
          </div>
        </div>
      </div>
    </ContentPageShell>
  );
}
