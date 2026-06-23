import Link from "next/link";

const referenceLinks = [
  { label: "All MBBS Colleges", href: "/colleges" },
  { label: "MBBS Colleges by Category", href: "/colleges/category" },
  { label: "MBBS Colleges by State", href: "/colleges/state" },
  { label: "College Comparison Tool", href: "/compare" },
];

export function DataSourceNotice() {
  return (
    <section
      aria-label="Data source disclosure"
      className="rounded-lg border border-border bg-surface-muted"
    >
      <div className="flex flex-col gap-3 border-b border-border px-4 py-4 text-sm leading-relaxed text-text-muted md:px-6">
        <p>
          <strong className="font-semibold text-text">Data Compiled &amp; Verified By:</strong>{" "}
          Dravio NEET Counsellor Team, education consultants with 10+ years of experience.
        </p>
        <p>
          <strong className="font-semibold text-text">Data Sources:</strong>{" "}
          Information presented on this page is carefully compiled and
          cross-verified against official publications and portals including the
          National Medical Commission (NMC), Medical Counselling Committee
          (MCC), and the Ministry of Health &amp; Family Welfare, Government of
          India.
        </p>
      </div>
      <div className="px-4 py-4 text-sm leading-relaxed text-text-muted md:px-6">
        <p>
          Students can explore detailed MBBS admission data from these routes:{" "}
          {referenceLinks.map((link, index) => (
            <span key={link.href}>
              <Link
                href={link.href}
                className="font-semibold text-emerald-700 underline decoration-emerald-500/50 underline-offset-2 transition-colors hover:text-emerald-800"
              >
                {link.label}
              </Link>
              {index < referenceLinks.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
