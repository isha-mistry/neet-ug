/** Populated when the server catalog loads; safe to import from client bundles. */
let stateNameBySlug = new Map<string, string>();

export function setStateNameCache(map: Map<string, string>): void {
  stateNameBySlug = map;
}

export function getStateNameFromCatalog(stateSlug: string): string {
  return stateNameBySlug.get(stateSlug) ?? stateSlug;
}
