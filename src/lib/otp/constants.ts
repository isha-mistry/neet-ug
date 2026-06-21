/** OTP code validity (Fast2SMS message copy). */
export const PHONE_OTP_TTL_SEC = 5 * 60;
export const PHONE_OTP_RESEND_COOLDOWN_SEC = 30;

/** Skip re-OTP for the same number within this window. */
export const PHONE_VERIFIED_TTL_SEC = 30 * 60;

export const PHONE_OTP_COOKIE = "dravio_phone_login_otp";
export const PHONE_VERIFIED_COOKIE = "dravio_phone_verified_session";
