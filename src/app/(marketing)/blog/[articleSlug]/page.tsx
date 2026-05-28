import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHeader } from "@/components/common/PageHeader";
import { ContentPageShell } from "@/components/features/content/ContentPageShell";
import { BlogArticleContent } from "@/components/features/blog/BlogArticleContent";
import { getBlogArticleBySlug, getBlogArticles } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ articleSlug: string }>;
}

export function generateStaticParams() {
  return getBlogArticles().map((article) => ({ articleSlug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { articleSlug } = await params;
  const article = getBlogArticleBySlug(articleSlug);
  if (!article) {
    return buildMetadata({
      title: "Blog Article Not Found",
      description: "The requested article does not exist.",
    });
  }
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${articleSlug}`,
  });
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { articleSlug } = await params;
  const article = getBlogArticleBySlug(articleSlug);
  if (!article) notFound();

  return (
    <ContentPageShell>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: article.title },
        ]}
      />
      <PageHeader
        eyebrow={`${article.author} · ${article.readMinutes} min read`}
        title={article.title}
        description={article.excerpt}
      />
      <BlogArticleContent article={article} />
    </ContentPageShell>
  );
}
