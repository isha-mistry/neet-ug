import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHeader } from "@/components/common/PageHeader";
import { ContentPageShell } from "@/components/features/content/ContentPageShell";
import { BlogPostCard } from "@/components/features/blog/BlogPostCard";
import { getBlogContent } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  const blog = getBlogContent();
  return buildMetadata({
    title: blog.title,
    description: blog.description,
    path: "/blog",
  });
}

export default function BlogHomePage() {
  const blog = getBlogContent();
  return (
    <ContentPageShell>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />
      <PageHeader
        eyebrow="MedSeat Insights"
        title={blog.title}
        description={blog.description}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {blog.articles.map((article) => (
          <BlogPostCard key={article.slug} article={article} />
        ))}
      </div>
    </ContentPageShell>
  );
}
