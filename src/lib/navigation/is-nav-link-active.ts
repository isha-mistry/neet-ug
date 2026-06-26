import { RANK_PREDICTOR_PAGE_PATH } from "@/lib/rank-predictor/constants";

/** Whether a primary nav item should show the active underline (current section). */
export function isNavLinkActive(href: string, pathname: string): boolean {
  const path = pathname.split("?")[0] ?? pathname;

  if (href === "/colleges") {
    if (path === "/colleges") return true;
    if (!path.startsWith("/colleges/")) return false;
    const segment = path.slice("/colleges/".length).split("/")[0];
    return segment !== "state" && segment !== "category";
  }

  if (href === "/quota" || href === "/quota/general") {
    return path === "/quota" || path.startsWith("/quota/");
  }

  if (href === RANK_PREDICTOR_PAGE_PATH) {
    return (
      path === RANK_PREDICTOR_PAGE_PATH ||
      path.startsWith(`${RANK_PREDICTOR_PAGE_PATH}/`) ||
      path === "/rank-predictor" ||
      path.startsWith("/rank-predictor/")
    );
  }

  if (href === "/college-predictor") {
    return (
      path === "/college-predictor" || path.startsWith("/college-predictor/")
    );
  }

  const exactMatchOnlyRoutes = ["/neet-ug-2026", "/mbbs-in-india"];
  if (exactMatchOnlyRoutes.includes(href)) {
    return path === href;
  }

  if (path === href) return true;
  return href !== "/" && path.startsWith(`${href}/`);
}
