import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-text">
        <h1 className="text-5xl font-bold tracking-tight">404</h1>
        <p className="max-w-md text-center text-base leading-relaxed text-text-muted">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-[var(--radius-md)] bg-brand-700 px-5 text-sm font-semibold tracking-wide text-text-on-brand transition-colors hover:bg-brand-800"
        >
          Back to Home
        </Link>
      </body>
    </html>
  );
}
