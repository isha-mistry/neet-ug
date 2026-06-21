import type { dravioTheme } from "@/design/dravio.theme";

export type ThemeTokens = typeof dravioTheme;
export type BrandShade = keyof ThemeTokens["colors"]["brand"];
export type RadiusToken = keyof ThemeTokens["radius"];
export type SpacingToken = keyof ThemeTokens["spacing"];
export type IconSizeToken = keyof ThemeTokens["iconSize"];
