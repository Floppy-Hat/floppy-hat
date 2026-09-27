"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { CONTACT } from "@/lib/constants";
import { isRateLimited } from "@/lib/rate-limit";

/** Type-only export — erased at build, so it does not count as a runtime
 *  export from this "use server" module. */
export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
};

const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 } as const;

// Deliberately loose: the only claim worth making is "this could be an address".
// Anything stricter rejects valid addresses; the real check is the reply landing.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactEmail(_previous: ContactState, formData: FormData): Promise<ContactState> {
  // Bots fill every field they find. A human never sees this one.
  if (formData.get("company")) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // The client attributes are UX; this is the trust boundary.
  const errors: ContactState["errors"] = {};
  if (name.length < 2) errors.name = "Tell us your name.";
  if (!EMAIL.test(email)) errors.email = "That email doesn't look right.";
  if (message.length < 10) errors.message = "A sentence or two is plenty.";
  if (Object.keys(errors).length > 0) return { status: "error", errors };

  // Checked after validation so a typo'd email doesn't burn someone's quota,
  // and before the send because that is the only step that costs anything.
  const forwardedFor = (await headers()).get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip, RATE_LIMIT)) {
    return {
      status: "error",
      message: "That's a few messages already — try again in a little while.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return {
      status: "error",
      message: `Email isn't configured yet. Reach us at ${CONTACT.email}.`,
    };
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      // onboarding@resend.dev works without a verified domain, but only
      // delivers to the Resend account owner. Swap once the domain verifies.
      from: "Floppy Hat <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: `${name} <${email}>\n\n${message}`,
    });
    if (error) {
      console.error("Resend rejected the send:", error);
      return { status: "error", message: "We couldn't send that. Try again?" };
    }
    return { status: "success" };
  } catch (cause) {
    console.error("Contact send failed:", cause);
    return { status: "error", message: "We couldn't send that. Try again?" };
  }
}
