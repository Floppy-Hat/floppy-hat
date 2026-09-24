import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Body copy. Poppins is not a variable font — weights must be listed.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

// Headings use Menda (commercial, self-hosted). Until the .woff2 files land in
// src/app/fonts/, --font-heading falls back to Poppins in globals.css.
// To enable:
//   import localFont from "next/font/local";
//   const menda = localFont({
//     src: [{ path: "./fonts/Menda-Black.woff2", weight: "900", style: "normal" }],
//     variable: "--font-menda",
//     display: "swap",
//     adjustFontFallback: "Arial",
//   });
// then add menda.variable to the <html> className below.

export const metadata: Metadata = {
  title: "Floppy Hat",
  description: "We build brands that stand out.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
