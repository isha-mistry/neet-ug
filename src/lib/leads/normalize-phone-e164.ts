import {
  type CountryCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

export type ParsedPhoneE164 =
  | { ok: true; e164: string; nationalDigits: string }
  | { ok: false; error: string };

const DEFAULT_COUNTRY: CountryCode = "IN";

function dialCodeToCountry(dialCode: string | undefined): CountryCode {
  const normalized = (dialCode ?? "+91").replace(/\s/g, "");
  switch (normalized) {
    case "+91":
      return "IN";
    case "+1":
      return "US";
    case "+44":
      return "GB";
    case "+971":
      return "AE";
    case "+966":
      return "SA";
    case "+974":
      return "QA";
    case "+965":
      return "KW";
    case "+968":
      return "OM";
    case "+973":
      return "BH";
    default:
      return DEFAULT_COUNTRY;
  }
}

/** Normalize country dial code + national digits to E.164 for storage and sending. */
export function parsePhoneToE164(
  countryCode: string | undefined,
  digits: string | undefined,
  defaultCountry: CountryCode = DEFAULT_COUNTRY,
): ParsedPhoneE164 {
  const nationalDigits = (digits ?? "").replace(/\D/g, "");
  if (!nationalDigits) {
    return { ok: false, error: "Enter a valid mobile number." };
  }

  const country = dialCodeToCountry(countryCode) ?? defaultCountry;
  const withDial =
    countryCode?.trim().startsWith("+")
      ? `${countryCode.trim()}${nationalDigits}`
      : nationalDigits;

  const parsed = parsePhoneNumberFromString(withDial, country);
  if (!parsed?.isValid()) {
    return { ok: false, error: "Enter a valid mobile number." };
  }

  return {
    ok: true,
    e164: parsed.format("E.164"),
    nationalDigits: parsed.nationalNumber,
  };
}

/** Evolution API expects digits only (no + prefix). */
export function e164ToEvolutionNumber(e164: string): string {
  return e164.replace(/\D/g, "");
}
