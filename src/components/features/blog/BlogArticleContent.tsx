import { Card } from "@/components/ui/Card";
import type { BlogArticle } from "@/types/content";

interface BlogArticleContentProps {
  article: BlogArticle;
}

export function BlogArticleContent({ article }: BlogArticleContentProps) {
  return (
    <div className="flex flex-col gap-6">
      {article.sections.map((section) => (
        <Card key={section.heading} padded bordered>
          <h2 className="text-xl font-semibold tracking-snug text-text">
            {section.heading}
          </h2>
          <div className="mt-3 space-y-3">
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-relaxed text-text-secondary"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
