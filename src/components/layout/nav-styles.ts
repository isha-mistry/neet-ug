import { cn } from "@/lib/utils";

/** Primary navbar item — desktop horizontal, mobile vertical. */
export function navItemClassName(active: boolean, className?: string) {
  return cn(
    "flex items-center gap-1 font-label-md text-label-md leading-none transition-colors duration-200",
    active
      ? "border-primary font-bold text-primary"
      : "border-transparent font-medium text-on-surface-variant hover:border-primary hover:text-primary",
    className,
  );
}

/** Bottom border accent used on top-level nav labels (matches desktop underline). */
export const navItemBorderClass = "border-b-2 pb-1";

/** Links inside nav dropdown panels (desktop flyout + mobile submenu). */
export function navDropdownLinkClassName(active: boolean) {
  return cn(
    "block rounded-lg px-3 py-2.5 text-sm transition-colors duration-150",
    active
      ? "font-semibold text-primary"
      : "font-medium text-on-surface-variant hover:text-primary",
  );
}
