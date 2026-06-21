export const LEAD_CONSENT_ERROR = "Please accept the privacy policy to continue.";

export function isLeadConsentGranted(consent: boolean | undefined): boolean {
  return consent === true;
}
