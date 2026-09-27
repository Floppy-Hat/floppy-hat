import { ProjectList } from "./ProjectList";
import { ProjectShowcase } from "./ProjectShowcase";
import { COLLECTIONS, PROJECTS } from "@/lib/constants";

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
      <h2 className="mb-8 text-subheading font-medium tracking-tight lg:mb-10 lg:text-heading">
        Our Projects
      </h2>
      <ProjectList projects={PROJECTS} collections={COLLECTIONS} />
      <ProjectShowcase projects={PROJECTS} collections={COLLECTIONS} />
    </section>
  );
}
