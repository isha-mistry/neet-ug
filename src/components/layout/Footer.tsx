import Link from "next/link";
import { getSiteIdentity } from "@/lib/data/site";
import { Container } from "@/components/common/Container";
import { BrandMark } from "./BrandMark";

export function Footer() {
  const site = getSiteIdentity();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface">
      <Container size="2xl" className="py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col gap-4">
            <BrandMark brandName={site.brandName} />
            <p className="max-w-sm text-sm leading-relaxed text-text-muted">
              {site.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {site.footer.columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-text">
                  {column.title}
                </h4>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm tracking-wide text-text-muted transition-colors hover:text-brand-700"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs leading-relaxed tracking-wide text-text-muted md:flex-row md:items-center md:justify-between">
          <p>{site.footer.legal}</p>
          <p>
            © {year} {site.brandName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
