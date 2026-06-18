/** Temporary fixed OTP for local/testing verification. */
export const RANK_PREDICTOR_DEMO_OTP = "121212";

export const RANK_PREDICTOR_SESSION_COOKIE = "medseat_rank_predictor_session";

export const RANK_PREDICTOR_SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 90;

export const NEET_SCORE_MIN = 0;
export const NEET_SCORE_MAX = 720;

/** POST JSON `{ score }` → wide AIR band (pre-verification). */
export const RANK_PREDICT_AIR_WIDE_URL = process.env.RANK_PREDICT_AIR_WIDE_URL;

/** POST JSON `{ score }` → refined AIR band (post-verification). */
export const RANK_PREDICT_AIR_URL = process.env.RANK_PREDICT_AIR_URL;

/** POST JSON `{ score, state }` → state merit band (post-verification). */
export const RANK_PREDICT_STATE_RANK_URL = process.env.RANK_PREDICT_STATE_RANK_URL;

/** AIR estimates map to All India Quota closing ranks in the catalog. */
export const RANK_PREDICTOR_PREVIEW_QUOTA = "aiq" as const;
