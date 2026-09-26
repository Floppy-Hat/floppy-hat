"use client";

import { useActionState, useId } from "react";
import { ContactChannels } from "@/components/ContactChannels";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { type ContactState, sendContactEmail } from "../api/contact";

const INITIAL_STATE: ContactState = { status: "idle" };

/** Underlined field, per the comp. The label is visible to screen readers
 *  only — a placeholder is not a label, it disappears the moment you type. */
function Field({
  name,
  label,
  error,
  type = "text",
  multiline = false,
}: {
  name: string;
  label: string;
  error?: string;
  type?: string;
  multiline?: boolean;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const shared = cn(
    "w-full border-b bg-transparent pb-3 text-lead text-foreground",
    "placeholder:text-muted-foreground",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
    error ? "border-destructive" : "border-border focus-visible:border-primary",
  );

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={3}
          required
          placeholder={label}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(shared, "resize-none")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required
          placeholder={label}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={shared}
        />
      )}
      {error ? (
        <p id={errorId} className="mt-2 text-caption text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Mounted only while the dialog is open, so a sent message resets on reopen. */
function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, INITIAL_STATE);

  if (state.status === "success") {
    return (
      <p className="mt-10 text-lead text-foreground" role="status">
        Thanks — that&rsquo;s with us. We&rsquo;ll reply within a day or two.
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-10">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field name="name" label="What Is Your Name?" error={state.errors?.name} />
        <Field name="email" label="Your Email" type="email" error={state.errors?.email} />
      </div>
      <div className="mt-8">
        <Field name="message" label="Tell Us About Your Project" multiline error={state.errors?.message} />
      </div>

      {/* Honeypot: bots fill every field, people never see this one. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" />

      <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
        <div>
          <Button type="submit" disabled={isPending} className="cursor-pointer h-auto rounded-full px-8 py-4 text-body">
            {isPending ? "Sending…" : "Send"}
          </Button>
          <p aria-live="polite" className="mt-3 text-caption text-destructive">
            {state.status === "error" && state.message ? state.message : ""}
          </p>
        </div>
        <ContactChannels addressClassName="text-lead" className="text-right" />
      </div>
    </form>
  );
}

export function ContactDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={<Button className="mt-8 h-auto rounded-full px-8 py-4 text-body lg:mt-10 cursor-pointer" />}
      >
        Get In Touch
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-none bg-background p-8 sm:max-w-3xl sm:p-12">
        <DialogTitle className="max-w-md text-subheading font-medium tracking-tight lg:text-title">
          Let&rsquo;s Create Something Meaningful.
        </DialogTitle>
        <DialogDescription className="text-caption text-foreground">
          Have A Brand, Website, Or Social Project In Mind?
          <br />
          Let&rsquo;s Turn The Idea Into Something Real.
        </DialogDescription>
        <ContactForm />
      </DialogContent>
    </Dialog>
  );
}
