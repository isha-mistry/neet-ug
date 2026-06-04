/**
 * MedSeat Design System (single source of truth).
 *
 * Edit values in this file to retheme the entire application.
 * Tokens are bridged into CSS variables and Tailwind utilities via
 * `src/styles/globals.css`. Components must consume tokens, not literals.
 */

export const medseatTheme = {
  brand: {
    name: "MedSeat",
    tagline: "Find the right MBBS college with clarity.",
  },

  colors: {
    /** New Material 3 style palette based on DESIGN.md */
    surface: "#f8f9fb",
    surfaceDim: "#d9dadc",
    surfaceBright: "#f8f9fb",
    surfaceContainerLowest: "#ffffff",
    surfaceContainerLow: "#f3f4f6",
    surfaceContainer: "#edeef0",
    surfaceContainerHigh: "#e7e8ea",
    surfaceContainerHighest: "#e1e2e4",
    onSurface: "#191c1e",
    onSurfaceVariant: "#434654",
    inverseSurface: "#2e3132",
    inverseOnSurface: "#f0f1f3",
    outline: "#737685",
    outlineVariant: "#c3c6d6",
    surfaceTint: "#0c56d0",
    primary: "#003d9b",
    onPrimary: "#ffffff",
    primaryContainer: "#0052cc",
    onPrimaryContainer: "#c4d2ff",
    inversePrimary: "#b2c5ff",
    secondary: "#00687b",
    onSecondary: "#ffffff",
    secondaryContainer: "#50dcff",
    onSecondaryContainer: "#005f71",
    tertiary: "#5e3c00",
    onTertiary: "#ffffff",
    tertiaryContainer: "#7d5200",
    onTertiaryContainer: "#ffca81",
    error: "#ba1a1a",
    onError: "#ffffff",
    errorContainer: "#ffdad6",
    onErrorContainer: "#93000a",
    primaryFixed: "#dae2ff",
    primaryFixedDim: "#b2c5ff",
    onPrimaryFixed: "#001848",
    onPrimaryFixedVariant: "#0040a2",
    secondaryFixed: "#afecff",
    secondaryFixedDim: "#48d7f9",
    onSecondaryFixed: "#001f27",
    onSecondaryFixedVariant: "#004e5d",
    tertiaryFixed: "#ffddb3",
    tertiaryFixedDim: "#ffb950",
    onTertiaryFixed: "#291800",
    onTertiaryFixedVariant: "#624000",
    background: "#f8f9fb",
    onBackground: "#191c1e",
    surfaceVariant: "#e1e2e4",

    /** Legacy Base surfaces mapped to new theme */
    surfaceMuted: "var(--color-surface-container)",
    surfaceElevated: "var(--color-surface-container-lowest)",
    border: "var(--color-outline-variant)",
    borderStrong: "var(--color-outline)",
    overlay: "rgba(25, 28, 30, 0.45)",

    /** Legacy Brand blues mapped to new theme */
    brand: {
      "50": "var(--color-primary-fixed)",
      "100": "var(--color-primary-fixed-dim)",
      "200": "var(--color-secondary-fixed)",
      "300": "var(--color-secondary-fixed-dim)",
      "400": "var(--color-primary-container)",
      "500": "var(--color-primary)",
      "600": "var(--color-primary)",
      "700": "var(--color-primary)",
      "800": "var(--color-on-primary-container)",
      "900": "var(--color-on-primary-fixed-variant)",
    },

    /** Legacy Foreground text mapped to new theme */
    text: {
      primary: "var(--color-on-background)",
      secondary: "var(--color-on-surface-variant)",
      muted: "var(--color-outline)",
      inverse: "var(--color-inverse-on-surface)",
      onBrand: "var(--color-on-primary)",
    },

    /** Legacy Semantic states mapped to new theme */
    semantic: {
      safe: "var(--color-primary)",
      safeSurface: "var(--color-primary-container)",
      risky: "var(--color-error)",
      riskySurface: "var(--color-error-container)",
      success: "var(--color-primary)",
      warning: "var(--color-secondary)",
      error: "var(--color-error)",
      info: "var(--color-surface-tint)",
    },

    /**
     * College explorer listing (metric tiles, type chips, accents).
     * Token values live in `globals.css` (@theme --color-college-*).
     */
    collegeListing: {
      metricFeesBg: "var(--color-college-metric-fees)",
      metricFeesBgHover: "var(--color-college-metric-fees-hover)",
      metricFeesBorder: "var(--color-college-metric-fees-border)",
      metricRankBg: "var(--color-college-metric-rank)",
      metricRankBgHover: "var(--color-college-metric-rank-hover)",
      metricRankBorder: "var(--color-college-metric-rank-border)",
      metricSeatsBg: "var(--color-college-metric-seats)",
      metricSeatsBgHover: "var(--color-college-metric-seats-hover)",
      metricSeatsBorder: "var(--color-college-metric-seats-border)",
      metricBondBg: "var(--color-college-metric-bond)",
      metricBondBgHover: "var(--color-college-metric-bond-hover)",
      metricBondBorder: "var(--color-college-metric-bond-border)",
      typeDeemedBg: "var(--color-college-type-deemed-bg)",
      typeDeemedFg: "var(--color-college-type-deemed-fg)",
      typeGovernmentBg: "var(--color-college-type-government-bg)",
      typeGovernmentFg: "var(--color-college-type-government-fg)",
      typePrivateBg: "var(--color-college-type-private-bg)",
      typePrivateFg: "var(--color-college-type-private-fg)",
      accentDeemed: "var(--color-college-accent-deemed)",
      accentGovernment: "var(--color-college-accent-government)",
      accentPrivate: "var(--color-college-accent-private)",
    },
  },

  gradient: {
    brandSoft: "linear-gradient(135deg, var(--color-brand-50) 0%, var(--color-brand-100) 100%)",
    brandStrong: "linear-gradient(135deg, var(--color-brand-500) 0%, var(--color-brand-700) 100%)",
    brandWash: "linear-gradient(180deg, var(--color-surface) 0%, var(--color-background) 100%)",
  },

  typography: {
    fontFamily: {
      sans: "var(--font-inter), system-ui, sans-serif",
      headline: "var(--font-hanken-grotesk), system-ui, sans-serif",
      mono: "var(--font-geist-mono), ui-monospace, monospace",
    },
    fontSize: {
      "label-sm": ["12px", { lineHeight: "14px", fontWeight: "500" }],
      "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" }],
      "label-md": ["14px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" }],
      "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
      "headline-xl": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
      "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
      "headline-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "600" }],
      "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
      "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeight: {
      tight: "1.15",
      snug: "1.3",
      normal: "1.5",
      relaxed: "1.65",
    },
    letterSpacing: {
      tight: "-0.02em",
      snug: "-0.01em",
      normal: "0em",
      wide: "0.02em",
      wider: "0.04em",
      widest: "0.08em",
    },
  },

  spacing: {
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    base: "8px",
    gutter: "24px",
    "stack-sm": "12px",
    "stack-md": "24px",
    "stack-lg": "48px",
    "margin-mobile": "16px",
    "margin-desktop": "64px",
    "container-max": "1280px",
  },

  radius: {
    none: "0",
    sm: "0.375rem",
    DEFAULT: "0.5rem",
    md: "0.625rem",
    lg: "0.875rem",
    xl: "1.25rem",
    "2xl": "1.75rem",
    pill: "9999px",
    full: "9999px",
  },

  shadow: {
    sm: "0 1px 2px rgba(13, 39, 80, 0.06)",
    md: "0 4px 12px rgba(13, 39, 80, 0.08)",
    lg: "0 12px 32px rgba(13, 39, 80, 0.10)",
    focus: "0 0 0 4px rgba(59, 130, 246, 0.25)",
  },

  breakpoint: {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
    "3xl": "1800px",
  },

  container: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1200px",
    "2xl": "1320px",
  },

  iconSize: {
    sm: "1rem",
    md: "1.25rem",
    lg: "1.5rem",
    xl: "2rem",
  },

  motion: {
    durationFast: "120ms",
    durationBase: "200ms",
    durationSlow: "320ms",
    easingStandard: "cubic-bezier(0.2, 0, 0, 1)",
  },

  component: {
    button: {
      radius: "0.625rem",
      paddingX: "1.25rem",
      paddingY: "0.625rem",
      fontWeight: "600",
      letterSpacing: "0.01em",
    },
    card: {
      radius: "0.875rem",
      padding: "1.25rem",
      borderColor: "#DDE7F5",
      shadow: "0 4px 12px rgba(13, 39, 80, 0.06)",
    },
    badge: {
      radius: "9999px",
      paddingX: "0.625rem",
      paddingY: "0.25rem",
      fontSize: "0.75rem",
      letterSpacing: "0.04em",
    },
    input: {
      radius: "0.625rem",
      paddingX: "0.875rem",
      paddingY: "0.625rem",
    },
  },
} as const;

export type MedseatTheme = typeof medseatTheme;
