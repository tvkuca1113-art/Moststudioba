import type { Locale } from "./config";

/**
 * A value that must exist in every language. Content modules use this so a
 * missing German string is a type error, not a half-translated page.
 */
export type L<T = string> = Record<Locale, T>;

export function pick<T>(value: L<T>, locale: Locale): T {
  return value[locale];
}

/** Bound reader: `const t = translator(locale)` then `t(content.title)`. */
export function translator(locale: Locale) {
  return function read<T>(value: L<T>): T {
    return value[locale];
  };
}
