"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";

/**
 * The end-of-funnel action inside a demo concept.
 *
 * It looks like the real thing and behaves like a real control — focusable,
 * keyboard-operable, with a proper expanded state — but it says plainly what
 * it is instead of pretending an enquiry was sent. Nothing in these demos may
 * look clickable and then do nothing.
 */
export function DemoActionButton({
  label,
  noticeTitle,
  noticeBody,
  className,
  noticeClassName,
  id,
}: {
  label: string;
  noticeTitle: string;
  noticeBody: string;
  className?: string;
  noticeClassName?: string;
  id: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className={cn("inline-flex min-h-12 items-center px-6 text-[0.9375rem] font-semibold", className)}
      >
        {label}
      </button>
      <div id={id} hidden={!open} className={cn("mt-4 max-w-md border p-4 text-sm", noticeClassName)}>
        <p className="font-semibold">{noticeTitle}</p>
        <p className="mt-1 leading-relaxed opacity-85">{noticeBody}</p>
      </div>
    </div>
  );
}
