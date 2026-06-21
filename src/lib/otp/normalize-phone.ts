export function normalizeIndianMobile(digits: string): string {
  return digits.replace(/\D/g, "");
}
