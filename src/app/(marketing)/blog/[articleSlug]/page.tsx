import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiClock, FiUser, FiCalendar } from "react-icons/fi";
import { Container } from "@/components/common/Container";
import { BlogArticleContent } from "@/components/features/blog/BlogArticleContent";
import { BlogArticleSidebar } from "@/components/features/blog/BlogArticleSidebar";
import { NeetUg2026Shell } from "@/components/features/neet-ug/NeetUg2026Parts";
import { AiGeneratedCoverBadge } from "@/components/features/colleges/shared/AiGeneratedCoverBadge";
import { getBlogCoverImage } from "@/lib/blog/fallback-images";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { buildMetadata } from "@/lib/seo/metadata";
import type { SanityBlogPost } from "@/types/blog";

interface PageProps {
  params: Promise<{ articleSlug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(POST_SLUGS_QUERY);
    return slugs.map((item) => ({ articleSlug: item.slug }));
  } catch (err) {
    console.error("Failed to generate static params for blog articles:", err);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { articleSlug } = await params;
  try {
    const post = await client.fetch<SanityBlogPost | null>(POST_BY_SLUG_QUERY, {
      slug: articleSlug,
    });
    if (!post) {
      return buildMetadata({
        title: "Blog Article Not Found",
        description: "The requested counseling article does not exist.",
      });
    }

    const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined;

    return buildMetadata({
      title: post.title,
      description: post.excerpt || "Expert NEET UG counseling guide and cutoff analysis from Dravio.",
      path: `/blog/${articleSlug}`,
      image: imageUrl,
    });
  } catch (err) {
    return buildMetadata({
      title: "NEET UG Counseling Insights",
      description: "Expert NEET UG counseling articles.",
      path: `/blog/${articleSlug}`,
    });
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { articleSlug } = await params;
  let post: SanityBlogPost | null = null;

  try {
    const response = await sanityFetch({
      query: POST_BY_SLUG_QUERY,
      params: { slug: articleSlug },
    });
    post = response.data as SanityBlogPost | null;
  } catch (err) {
    console.error("Failed to fetch blog post by slug:", err);
  }

  if (!post) {
    notFound();
  }

  const { url: imageUrl, isAiGenerated } = getBlogCoverImage(post, 1200, 560);

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

  const tags = post.tags && post.tags.length > 0 ? post.tags : ["NEET UG 2026", "Counseling Guide"];

  return (
    <NeetUg2026Shell>
      <Container size="2xl" className="py-8 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Main Article Content Column */}
          <main className="min-w-0 lg:col-span-8">
            {/* Article Header */}
            <header className="mb-8 border-b border-outline-variant pb-8">
              <nav className="rp-crumb mb-4" aria-label="Breadcrumb">
                {[
                  { label: "Home", href: "/" },
                  { label: "Insights & Blog", href: "/blog" },
                  { label: post.slug },
                ].map((crumb, index, arr) => {
                  const isLast = index === arr.length - 1;
                  return (
                    <span key={`${crumb.label}-${index}`} className="contents">
                      {index > 0 ? <span className="rp-crumb-sep">/</span> : null}
                      {isLast || !crumb.href ? (
                        <span style={isLast ? { color: "var(--color-primary)" } : undefined}>
                          {crumb.label}
                        </span>
                      ) : (
                        <Link href={crumb.href}>{crumb.label}</Link>
                      )}
                    </span>
                  );
                })}
              </nav>

              <div className="flex flex-wrap items-center gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-4 text-lg leading-relaxed text-on-surface-variant">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-outline sm:text-sm">
                {post.author?.name && (
                  <div className="inline-flex items-center gap-2 text-on-surface">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary">
                      <FiUser aria-hidden="true" className="h-4 w-4" />
                    </div>
                    <span>{post.author.name}</span>
                  </div>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <FiCalendar aria-hidden="true" className="text-primary" />
                  {formattedDate}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FiClock aria-hidden="true" className="text-primary" />
                  {post.readMinutes || 5} min read
                </span>
              </div>
            </header>

            {/* Main Hero Image */}
            <div className="relative mb-10 h-[280px] sm:h-[400px] lg:h-[480px] w-full overflow-hidden rounded-[24px] border border-outline-variant bg-surface-container-low shadow-md">
              <Image
                src={imageUrl}
                alt={post.mainImage?.alt || post.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 800px"
                className="object-cover"
              />
              {isAiGenerated ? <AiGeneratedCoverBadge /> : null}
            </div>

            {/* Article Rich Content */}
            <BlogArticleContent post={post} />
          </main>

          {/* Right Aside Sidebar Column */}
          <div className="lg:col-span-4">
            <BlogArticleSidebar postTitle={post.title} postId={post._id} />
          </div>
        </div>
      </Container>
    </NeetUg2026Shell>
  );
}
