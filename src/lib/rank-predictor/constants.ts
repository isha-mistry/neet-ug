export const RANK_PREDICTOR_PAGE_PATH = "/reneet-rank-predictor-2026";

/** @deprecated Demo OTP removed — use Fast2SMS via sendPhoneLoginOtpAction. */
export const RANK_PREDICTOR_DEMO_OTP = "121212";

export const RANK_PREDICTOR_SESSION_COOKIE = "dravio_rank_predictor_session";

export const RANK_PREDICTOR_SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 90;

export const NEET_SCORE_MIN = 0;
export const NEET_SCORE_MAX = 720;

/** POST JSON `{ score }` → `{ lower_rank, upper_rank, predicted_air_rank, ... }` (wide band). */
export const RANK_PREDICT_AIR_WIDE_URL = process.env.RANK_PREDICT_AIR_WIDE_URL;

/** POST JSON `{ score }` → `{ lower_rank, upper_rank, predicted_air_rank, ... }` (narrow band). */
export const RANK_PREDICT_AIR_URL = process.env.RANK_PREDICT_AIR_URL;

/** POST JSON `{ score, state }` → `{ lower_rank, upper_rank, predicted_state_rank, ... }` (GJ / MP / RJ only). */
export const RANK_PREDICT_STATE_RANK_URL = process.env.RANK_PREDICT_STATE_RANK_URL;

/** AIR estimates map to All India Quota closing ranks in the catalog. */
export const RANK_PREDICTOR_PREVIEW_QUOTA = "aiq" as const;

/** Max colleges shown in the post-verification “ballpark” preview grid. */
export const RANK_PREDICTOR_MAX_PREVIEW_COLLEGES = 15;
