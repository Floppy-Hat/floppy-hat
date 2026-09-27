import { ContactChannels } from "@/components/ContactChannels";
import { ContactDialog } from "@/features/home/components/ContactDialog";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border">
      {/* Centred on phones, back to the two-column left-aligned layout from md.
          One text-align carries it: the CTA, the address and the channel row
          are all inline-level, so they follow without their own rules. */}
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 text-center md:grid-cols-2 md:text-left lg:py-24">
        <div>
          <p className="text-body">{new Date().getFullYear()} &copy; Copyright</p>
          <h2 className="mx-auto mt-3 max-w-md text-display font-medium tracking-tight sm:text-heading md:mx-0 lg:text-title">
            We&rsquo;re Ready To Hear About Your Project
          </h2>
          <ContactDialog />
        </div>

        <ContactChannels label="Contacts" className="md:pt-10" />
      </div>
    </footer>
  );
}
