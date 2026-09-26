import { ContactChannels } from "@/components/ContactChannels";
import { ContactDialog } from "@/features/home/components/ContactDialog";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:py-24 md:grid-cols-2">
        <div>
          <p className="text-body">{new Date().getFullYear()} &copy; Copyright</p>
          <h2 className="mt-3 max-w-md text-display font-medium tracking-tight sm:text-heading lg:text-title">
            We&rsquo;re Ready To Hear About Your Project
          </h2>
          <ContactDialog />
        </div>

        <ContactChannels label="Contacts" className="md:pt-10" />
      </div>
    </footer>
  );
}
