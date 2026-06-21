/** Placeholder when env is unset (local dev only). */
const FALLBACK_COUNSEL_WHATSAPP_NUMBER = "919090909090";

function readCounselWhatsAppNumberEnv(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_COUNSEL_WHATSAPP_NUMBER?.trim() ||
    process.env.COUNSEL_WHATSAPP_NUMBER?.trim()
  );
}

/** Digits only, with country code (no +). Used for `wa.me` and `tel:` links. */
export function getCounselWhatsAppNumberDigits(): string {
  const raw = readCounselWhatsAppNumberEnv();
  if (!raw) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[counsel-whatsapp] Set NEXT_PUBLIC_COUNSEL_WHATSAPP_NUMBER (e.g. 919876543210). Using placeholder.",
      );
    }
    return FALLBACK_COUNSEL_WHATSAPP_NUMBER;
  }

  const digits = raw.replace(/\D/g, "");
  if (digits.length < 10) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[counsel-whatsapp] Invalid NEXT_PUBLIC_COUNSEL_WHATSAPP_NUMBER; using placeholder.",
      );
    }
    return FALLBACK_COUNSEL_WHATSAPP_NUMBER;
  }

  return digits;
}

export function getCounselWhatsAppWaMeBase(): string {
  return `https://wa.me/${getCounselWhatsAppNumberDigits()}`;
}

export function getCounselWhatsAppTelHref(): string {
  return `tel:+${getCounselWhatsAppNumberDigits()}`;
}

export function getCounselWhatsAppUrl(text: string): string {
  return `${getCounselWhatsAppWaMeBase()}?text=${encodeURIComponent(text)}`;
}
