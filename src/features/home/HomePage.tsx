import { ContactSection } from "./components/ContactSection";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { SiteHeader } from "./components/SiteHeader";
import { WorkSection } from "./components/WorkSection";

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background text-foreground">
        <HeroSection />
        <ServicesSection />
        <WorkSection />
        <ContactSection />
      </main>
    </>
  );
}
