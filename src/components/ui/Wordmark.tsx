import { cn } from "@/lib/cn";

/**
 * Typographic wordmark. No original logo file exists in the project, so the
 * brand mark is set type: a tight "MOST" with a bridge-span underline and a
 * spaced-out "STUDIO".
 */
export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className="relative font-display text-[1.0625rem] leading-none font-extrabold tracking-[0.06em] sm:text-lg">
        MOST
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-lime"
        />
      </span>
      {!compact && (
        <span className="font-sans text-[0.8125rem] leading-none font-semibold tracking-[0.3em] opacity-70">
          STUDIO
        </span>
      )}
    </span>
  );
}
