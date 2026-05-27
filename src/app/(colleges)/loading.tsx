export default function CollegesLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col gap-6 animate-pulse"
    >
      <div className="h-24 rounded-[var(--radius-lg)] bg-surface" />
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="h-72 rounded-[var(--radius-lg)] bg-surface" />
        <div className="flex flex-col gap-4">
          <div className="h-10 w-1/3 rounded-[var(--radius-md)] bg-surface" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-56 rounded-[var(--radius-lg)] bg-surface"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
