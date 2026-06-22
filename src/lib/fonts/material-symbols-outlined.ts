import localFont from "next/font/local";

/** Self-hosted Material Symbols Outlined (wght + FILL axes) under `public/font/`. */
export const materialSymbolsOutlined = localFont({
  src: "../../../public/font/Material_Symbols_Outlined/material-symbols-outlined-latin-standard-normal.woff2",
  variable: "--font-material-symbols-outlined",
  display: "swap",
  weight: "100 700",
  preload: true,
});
