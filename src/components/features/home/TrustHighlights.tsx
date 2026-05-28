import type { HomeContent } from "@/types/site";

interface TrustHighlightsProps {
  content: HomeContent["trustHighlights"];
}

export function TrustHighlights({ content }: TrustHighlightsProps) {
  const getStyles = (index: number) => {
    switch (index % 4) {
      case 0:
        return {
          bg: "bg-primary-container/10 text-primary",
          icon: "verified_user",
          text: "text-primary",
        };
      case 1:
        return {
          bg: "bg-secondary-container/10 text-secondary",
          icon: "timeline",
          text: "text-secondary",
        };
      case 2:
        return {
          bg: "bg-tertiary-fixed/30 text-tertiary",
          icon: "star",
          text: "text-tertiary",
        };
      case 3:
      default:
        return {
          bg: "bg-primary-container/10 text-primary",
          icon: "language",
          text: "text-primary",
        };
    }
  };

  return (
    <div>
      <div className="text-center mb-16">
        <span className="text-secondary font-label-md text-label-md tracking-wider uppercase mb-2 block">
          Trust & Clarity
        </span>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          {content.title}
        </h2>
        <p className="text-on-surface-variant font-body-md text-body-md mt-4 max-w-2xl mx-auto">
          {content.description}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {content.items.map((item, index) => {
          const { bg, icon, text } = getStyles(index);
          return (
            <div key={item.id} className="flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${bg}`}
              >
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {icon}
                </span>
              </div>
              <div className={`font-headline-xl text-headline-xl ${text}`}>
                {item.value}
              </div>
              <div className="text-on-surface font-semibold mt-1">
                {item.label}
              </div>
              <p className="text-on-surface-variant text-body-sm mt-2">
                {item.caption}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
