/** Whether a primary nav item should show the active underline (current section). */
export function isNavLinkActive(href: string, pathname: string): boolean {
  const path = pathname.split("?")[0] ?? pathname;

  if (href === "/colleges") {
    if (path === "/colleges") return true;
    if (!path.startsWith("/colleges/")) return false;
    const segment = path.slice("/colleges/".length).split("/")[0];
    return segment !== "state" && segment !== "category";
  }

  if (href.startsWith("/quota/")) {
    return path.startsWith("/quota/");
  }

  if (href === "/rank-predictor") {
    return path === "/rank-predictor" || path.startsWith("/rank-predictor/");
  }

  if (href === "/college-predictor") {
    return path === "/college-predictor" || path.startsWith("/college-predictor/");
  }

  if (path === href) return true;
  return href !== "/" && path.startsWith(`${href}/`);
}
