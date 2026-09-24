import type { Service } from "@/types/content";

const SERVICES: Service[] = [
  { id: "identity", title: "Brand identity", description: "Placeholder copy." },
  { id: "web", title: "Web design", description: "Placeholder copy." },
  { id: "content", title: "Content", description: "Placeholder copy." },
];

export function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <h2 className="font-heading text-3xl uppercase tracking-tight">Services</h2>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <li
            key={service.id}
            className="rounded-lg border border-border bg-card p-6 text-card-foreground"
          >
            <h3 className="font-heading text-lg uppercase tracking-tight">
              {service.title}
            </h3>
            <p className="mt-2 text-muted-foreground">{service.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
