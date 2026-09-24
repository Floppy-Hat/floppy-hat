import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Body copy. Poppins is not a variable font — weights must be listed.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

// Headings, CTA labels, eyebrows. One weight is all the design uses — the other
// Menda cuts sit unused in ./fonts and are not bundled until imported here.
const menda = localFont({
  src: [{ path: "./fonts/menda-extrabold.woff2", weight: "800", style: "normal" }],
  variable: "--font-menda",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  title: "Floppy Hat",
  description: "We build brands that stand out.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${menda.variable} antialiased h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
