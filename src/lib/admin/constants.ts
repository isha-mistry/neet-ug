/** Client + server shared admin auth constants. */

export const ADMIN_TOKEN_STORAGE_KEY = "dravio_admin_token";
export const ADMIN_TOKEN_EXPIRES_STORAGE_KEY = "dravio_admin_token_expires";

/** JWT lifetime in seconds (1 hours). */
export const ADMIN_JWT_TTL_SEC = 1 * 60 * 60;

export const ADMIN_ROLE = "admin" as const;
