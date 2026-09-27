import { IconBrandWhatsapp, IconMail } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** The address plus the two channel buttons — footer and contact dialog.
 *  The footer labels the block; the dialog doesn't, so `label` is optional. */
export function ContactChannels({
  label,
  addressClassName = "text-heading",
  className,
}: {
  label?: string;
  /** The footer runs the address large; the dialog keeps it near body scale. */
  addressClassName?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {label ? <p className="text-subheading font-semibold">{label}</p> : null}
      <a
        href={`mailto:${CONTACT.email}`}
        className={cn(
          "inline-block font-medium tracking-tight",
          addressClassName,
          label && "mt-2",
        )}
      >
        {CONTACT.label}
      </a>
      {/* A block wrapper puts the row on its own line under the address; the
          inline-flex inside then follows the caller's text-align the way the
          address does — centred in the footer on phones, right in the dialog.
          A bare block-level flex row would ignore the alignment, and a bare
          inline-flex would sit beside the address instead of below it. */}
      <div className="mt-8">
        <div className="inline-flex gap-4">
          <Button
            size="icon-lg"
            nativeButton={false}
            render={<a href={CONTACT.whatsapp} />}
            aria-label="Message us on WhatsApp"
            className="size-14 rounded-full"
          >
            <IconBrandWhatsapp className="size-6" aria-hidden="true" />
          </Button>
          <Button
            size="icon-lg"
            nativeButton={false}
            render={<a href={`mailto:${CONTACT.email}`} />}
            aria-label="Email us"
            className="size-14 rounded-full"
          >
            <IconMail className="size-6" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
