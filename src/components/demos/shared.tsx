import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { AnnotationId } from "@/content/projects";

export const annotationOrder: AnnotationId[] = ["offer", "services", "contact"];

export function annotationNumber(id: AnnotationId): number {
  return annotationOrder.indexOf(id) + 1;
}

/**
 * Numbered marker tying a spot in the demo to its explanation. Hidden on
 * narrow containers, where the explanations are listed under the preview
 * instead of crowding the content.
 */
export function AnnotationMarker({
  id,
  label,
  className,
}: {
  id: AnnotationId;
  label: string;
  className?: string;
}) {
  return (
    <span
      data-annotation={id}
      className={cn(
        "pointer-events-none z-20 hidden size-7 shrink-0 items-center justify-center rounded-full bg-lime text-[0.8125rem] font-bold text-ink shadow-[0_2px_10px_rgba(9,28,24,0.28)] @2xl:inline-flex",
        className,
      )}
    >
      <span className="sr-only">{label} {annotationNumber(id)}: </span>
      <span aria-hidden="true">{annotationNumber(id)}</span>
    </span>
  );
}

/** Persistent "this is a demo" strip shown at the top of every demo concept. */
export function DemoRibbon({ text, tone = "dark" }: { text: string; tone?: "dark" | "light" }) {
  return (
    <p
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2 text-center text-[0.8125rem] font-semibold tracking-[0.16em] uppercase",
        tone === "dark" ? "bg-ink text-lime" : "bg-lime text-ink",
      )}
    >
      {text}
    </p>
  );
}

/** Contact block used by all three concepts. Never pretends to send anything. */
export function DemoContactNotice({
  title,
  body,
  note,
  className,
}: {
  title: string;
  body: string;
  note: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-current/15 p-4 text-sm @lg:p-5", className)}>
      <p className="font-semibold">{title}</p>
      <p className="mt-1 opacity-80">{body}</p>
      <p className="mt-3 text-[0.8125rem] tracking-wide uppercase opacity-70">{note}</p>
    </div>
  );
}

export function DemoSection({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-5 py-10 @2xl:px-8 @2xl:py-14 @3xl:px-12 @3xl:py-20", className)}>
      {children}
    </section>
  );
}
