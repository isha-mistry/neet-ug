import countryCodesJson from "../../../public/countrycode.json";

export type CountryDialEntry = {
  name: string;
  dial_code: string;
  code: string;
};

export const COUNTRY_DIAL_CODES: CountryDialEntry[] = countryCodesJson as CountryDialEntry[];

export const DEFAULT_COUNTRY_DIAL_CODE = "+91";

/** Option label in the dropdown list. */
export function formatCountryDialOption(entry: CountryDialEntry): string {
  return `${entry.code} (${entry.dial_code})`;
}

export function findCountryDialEntry(dialCode: string): CountryDialEntry | undefined {
  return COUNTRY_DIAL_CODES.find((entry) => entry.dial_code === dialCode);
}

export function countryDialOptionKey(entry: CountryDialEntry): string {
  return `${entry.code}-${entry.dial_code}`;
}

export function isKnownDialCode(dialCode: string): boolean {
  return COUNTRY_DIAL_CODES.some((entry) => entry.dial_code === dialCode);
}
