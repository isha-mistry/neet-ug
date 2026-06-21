import { cn } from "@/lib/utils";

/** Primary navbar item — desktop horizontal, mobile vertical. */
export function navItemClassName(active: boolean, className?: string) {
  return cn(
    "flex items-center gap-1 text-[15px] font-normal leading-normal text-on-surface-variant transition-colors duration-200",
    active
      ? "border-primary font-semibold text-primary"
      : "border-transparent hover:border-primary hover:text-primary",
    className,
  );
}

/** Full header bar height + underline slot (desktop only). */
export const navItemBorderClass =
  "box-border h-16 shrink-0 items-center border-b-2 border-transparent";

/** Desktop top bar — underline + fixed row height. */
export function navItemDesktopClassName(active: boolean, className?: string) {
  return navItemClassName(active, cn(navItemBorderClass, className));
}

/** Mobile drawer row — typography only; underline goes on inner label span. */
export function navItemMobileRowClassName(active: boolean) {
  return cn(navItemClassName(active), "w-full py-3.5");
}

/** Active underline width matches label (not full row). */
export function navItemMobileUnderlineClass(active: boolean) {
  return cn(
    "inline-flex border-b-2 pb-0.5",
    active ? "border-primary" : "border-transparent",
  );
}

/** Links inside nav dropdown panels (desktop flyout + mobile submenu). */
export function navDropdownLinkClassName(active: boolean) {
  return cn(
    "block rounded-[14px] px-3 py-2.5 text-[15px] font-normal leading-normal transition-colors duration-150",
    active
      ? "font-semibold text-primary"
      : "text-on-surface-variant hover:text-primary",
  );
}
