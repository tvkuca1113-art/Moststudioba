import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import type { DemoKey } from "@/content/projects";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { ClinicDemo } from "./ClinicDemo";

export type DemoComponentProps = {
  locale: Locale;
  dict: Dictionary;
  annotate?: boolean;
};

/**
 * The clinic concept is the default tab, so it ships in the initial bundle.
 * The other two are split out and fetched only when the visitor selects them —
 * three full concepts are never downloaded up front.
 */
export const demoComponents: Record<DemoKey, ComponentType<DemoComponentProps>> = {
  clinic: ClinicDemo,
  trades: dynamic(() => import("./TradesDemo").then((module) => module.TradesDemo)),
  advisory: dynamic(() => import("./AdvisoryDemo").then((module) => module.AdvisoryDemo)),
};
