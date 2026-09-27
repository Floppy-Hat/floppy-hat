import { HomePage } from "@/features/home/HomePage";

export const metadata = {
  title: "Floppy Hat — Brand, Social, And Website Design",
  description:
    "We create brands that look different, feel right, and stay memorable.",
  // Resolved against metadataBase. The site answers on more than one host —
  // the vercel.app domain as well as the real one — so without this each page
  // competes with a copy of itself.
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomePage />;
}
