import Image from "next/image";
import { cn } from "@/lib/utils";

/** Decorative by design: the header wraps it in a link that carries the
 *  accessible name, and on the service cards it repeats the brand.
 *  Served from /public, so the intrinsic size is declared here. */
export function Logo({
  className,
  eager = false,
}: {
  className?: string;
  eager?: boolean;
}) {
  return (
    <Image
      src="/app/logo.svg"
      alt=""
      width={84}
      height={59}
      className={cn("h-auto w-21", className)}
      loading={eager ? "eager" : "lazy"}
    />
  );
}
