import type { medseatTheme } from "@/design/medseat.theme";

export type ThemeTokens = typeof medseatTheme;
export type BrandShade = keyof ThemeTokens["colors"]["brand"];
export type RadiusToken = keyof ThemeTokens["radius"];
export type SpacingToken = keyof ThemeTokens["spacing"];
export type IconSizeToken = keyof ThemeTokens["iconSize"];
