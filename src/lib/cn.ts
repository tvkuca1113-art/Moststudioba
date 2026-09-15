/** Joins class names, dropping anything falsy or non-string. */
export function cn(...parts: unknown[]): string {
  return parts.filter((part): part is string => typeof part === "string" && part.length > 0).join(" ");
}
