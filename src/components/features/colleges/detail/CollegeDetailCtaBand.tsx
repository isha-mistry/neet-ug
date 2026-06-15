import Link from "next/link";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";

interface CollegeDetailCtaBandProps {
  collegeName: string;
}

export function CollegeDetailCtaBand({ collegeName }: CollegeDetailCtaBandProps) {
  const shortName = collegeName.length > 48 ? `${collegeName.slice(0, 45)}…` : collegeName;
  const waBase = COUNSEL_WHATSAPP_URL.split("?")[0];
  const whatsappHref = `${waBase}?text=${encodeURIComponent(
    `Hi MedSeat, I'd like help comparing options including ${shortName}.`
  )}`;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-outline-variant bg-gradient-to-br from-primary via-primary to-primary-hover px-6 py-8 text-on-primary md:px-10">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-on-primary/10 blur-2xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">
            Not sure if this college fits your rank?
          </h2>
          <p className="mt-2 text-sm text-on-primary/90 md:text-base">
            Compare fees, bond, and cutoffs with similar colleges — or talk to our
            counselling team for a free second opinion.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/compare"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-on-primary/30 bg-on-primary px-5 py-3 text-sm font-bold text-primary shadow-sm transition hover:bg-on-primary/95"
          >
            <MaterialSymbol name="compare_arrows" className="text-lg" />
            Compare colleges
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-on-primary/40 bg-transparent px-5 py-3 text-sm font-bold text-on-primary transition hover:bg-on-primary/10"
          >
            <MaterialSymbol name="chat" className="text-lg" />
            Free counselling
          </a>
        </div>
      </div>
    </div>
  );
}
