export default function CollegesLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col gap-6 animate-pulse"
    >
      <div className="h-24 rounded-[var(--radius-lg)] bg-surface" />
      <div className="flex flex-col gap-4">
        <div className="h-10 w-1/3 rounded-[14px] bg-surface" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="h-52 rounded-[var(--radius-lg)] bg-surface lg:h-56"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
