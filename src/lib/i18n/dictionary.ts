import { bs, type Dictionary } from "./bs";
import { de } from "./de";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { bs, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
