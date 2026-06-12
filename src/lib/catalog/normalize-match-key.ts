export function normalizeMatchKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/\\n/g, " ")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}
