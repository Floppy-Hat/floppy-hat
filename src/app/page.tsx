import type { Metadata } from "next";
import { HomePage } from "@/features/home/HomePage";

export const metadata: Metadata = {
  title: "Floppy Hat — Branding that stands out",
  description: "We build brands that stand out.",
};

export default function Page() {
  return <HomePage />;
}
