import { HeroSection } from "./components/HeroSection";
import { ManifestoSection } from "./components/ManifestoSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ServicesSection } from "./components/ServicesSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <ServicesSection />
      <ManifestoSection />
    </>
  );
}
