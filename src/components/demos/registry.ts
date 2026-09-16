import type { ComponentType } from "react";

import type { DemoKey } from "@/content/projects";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { AdvisoryDemo } from "./AdvisoryDemo";
import { ClinicDemo } from "./ClinicDemo";
import { TradesDemo } from "./TradesDemo";

export type DemoComponentProps = {
  locale: Locale;
  dict: Dictionary;
};

/**
 * Each demo now renders on its own route, one per page, so Next.js already
 * splits them per route — no dynamic indirection needed.
 */
export const demoComponents: Record<DemoKey, ComponentType<DemoComponentProps>> = {
  clinic: ClinicDemo,
  trades: TradesDemo,
  advisory: AdvisoryDemo,
};
