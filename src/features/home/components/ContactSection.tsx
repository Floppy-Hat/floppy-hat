import type { Contact } from "@/types/content";

const CONTACT: Contact = {
  heading: "Contact",
  copy: "Placeholder copy. The form replaces this block.",
  email: "hello@floppyhat.com",
};

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <h2 className="font-heading text-3xl uppercase tracking-tight">
        {CONTACT.heading}
      </h2>
      <p className="mt-4 max-w-xl text-muted-foreground">{CONTACT.copy}</p>
      <a
        href={`mailto:${CONTACT.email}`}
        className="mt-4 inline-block text-primary underline-offset-4 hover:underline"
      >
        {CONTACT.email}
      </a>
    </section>
  );
}
