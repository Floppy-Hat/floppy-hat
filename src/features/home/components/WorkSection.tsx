import type { Project } from "@/types/content";

const PROJECTS: Project[] = [
  { id: "project-one", client: "Client One", title: "Placeholder project" },
  { id: "project-two", client: "Client Two", title: "Placeholder project" },
  { id: "project-three", client: "Client Three", title: "Placeholder project" },
];

export function WorkSection() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <h2 className="font-heading text-3xl uppercase tracking-tight">Work</h2>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <li
            key={project.id}
            className="rounded-lg border border-border bg-card p-6 text-card-foreground"
          >
            <p className="text-sm text-muted-foreground">{project.client}</p>
            <h3 className="font-heading mt-1 text-lg uppercase tracking-tight">
              {project.title}
            </h3>
          </li>
        ))}
      </ul>
    </section>
  );
}
