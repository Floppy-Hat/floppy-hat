import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

// Inter is variable — one file covers every weight the design uses.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://floppyhat.com"),
  title: {
    default: "Floppy Hat",
    template: "%s — Floppy Hat",
  },
  description:
    "We create brands that look different, feel right, and stay memorable.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // next-themes writes the theme class on <html> before paint, which React
    // would otherwise flag as a hydration mismatch.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} antialiased h-full motion-safe:scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        {/* Applies the saved theme before anything paints. Server-rendered,
            so React never renders a <script> on the client. Dark needs no
            class, so only a light-preferring visitor does any work here. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.add("light")}catch(e){}`,
          }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
