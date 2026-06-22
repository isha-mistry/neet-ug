import localFont from "next/font/local";

/** Self-hosted Hanken Grotesk under `public/font/Hanken_Grotesk/`. */
export const hankenGrotesk = localFont({
  src: [
    {
      path: "../../../public/font/Hanken_Grotesk/HankenGrotesk-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../../public/font/Hanken_Grotesk/HankenGrotesk-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-hanken-grotesk",
  display: "swap",
});
