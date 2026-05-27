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
    /** Base surfaces (white/blue light palette) */
    background: "#FFFFFF",
    surface: "#F5F9FF",
    surfaceMuted: "#EAF2FE",
    surfaceElevated: "#FFFFFF",
    border: "#DDE7F5",
    borderStrong: "#B9CCE6",
    overlay: "rgba(13, 39, 80, 0.45)",

    /** Brand blues (monochromatic) */
    brand: {
      "50": "#EFF6FF",
      "100": "#DBEAFE",
      "200": "#BFDBFE",
      "300": "#93C5FD",
      "400": "#60A5FA",
      "500": "#3B82F6",
      "600": "#2563EB",
      "700": "#1D4ED8",
      "800": "#1E40AF",
      "900": "#1E3A8A",
    },

    /** Foreground text */
    text: {
      primary: "#0B2545",
      secondary: "#33415C",
      muted: "#5C6F8A",
      inverse: "#FFFFFF",
      onBrand: "#FFFFFF",
    },

    /** Semantic states (kept inside the blue palette family where possible) */
    semantic: {
      safe: "#1D4ED8",
      safeSurface: "#E0EBFE",
      risky: "#9A3412",
      riskySurface: "#FEE6D7",
      success: "#0F766E",
      warning: "#B45309",
      error: "#B91C1C",
      info: "#2563EB",
    },
  },

  gradient: {
    /** Monochromatic blue gradients only */
    brandSoft:
      "linear-gradient(135deg, var(--ms-color-brand-50) 0%, var(--ms-color-brand-100) 100%)",
    brandStrong:
      "linear-gradient(135deg, var(--ms-color-brand-500) 0%, var(--ms-color-brand-700) 100%)",
    brandWash:
      "linear-gradient(180deg, var(--ms-color-surface) 0%, var(--ms-color-background) 100%)",
  },

  typography: {
    fontFamily: {
      sans: "var(--font-geist-sans), system-ui, sans-serif",
      mono: "var(--font-geist-mono), ui-monospace, monospace",
    },
    fontSize: {
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
  },

  radius: {
    none: "0",
    sm: "0.375rem",
    md: "0.625rem",
    lg: "0.875rem",
    xl: "1.25rem",
    "2xl": "1.75rem",
    pill: "9999px",
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
