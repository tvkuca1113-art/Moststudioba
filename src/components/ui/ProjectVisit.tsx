"use client";
import { useEffect, useRef } from "react";
import { event } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n/config";
/** Count an opened presentation, including direct visits, once per mounted route. */
export function ProjectVisit({ project, locale }: { project: string; locale: Locale }) {
  const sent = useRef("");
  useEffect(() => {
    const key = `${locale}:${project}`;
    if (sent.current === key) return;
    sent.current = key;
    event("view_project", { project, locale });
  }, [project, locale]);
  return null;
}
