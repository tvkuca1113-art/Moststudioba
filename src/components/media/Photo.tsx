import Image from "next/image";
import type { CSSProperties } from "react";

import { images, type ImageKey } from "@/content/images";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/config";

type Vars = CSSProperties & Record<`--${string}`, string>;

/**
 * One way to place a photograph.
 *
 * Dimensions and alt text come from the generated manifest module, so they
 * cannot drift from the file. The crop uses the manifest's object-position,
 * with a separate value for narrow layouts; inside a demo that switch is a
 * container query, because a demo is rendered at a real layout width and
 * scaled, so viewport breakpoints would be wrong.
 */
export function Photo({
  name,
  locale,
  className,
  sizes = "100vw",
  priority = false,
  fit = "cover",
  breakpoint = "container",
  decorative = false,
}: {
  name: ImageKey;
  locale: Locale;
  /** Wrapper classes — the caller owns aspect ratio, rounding and placement. */
  className?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  breakpoint?: "container" | "viewport";
  /** True when surrounding text already says everything the image says. */
  decorative?: boolean;
}) {
  const image = images[name];
  const style: Vars = {
    "--focus-narrow": image.focus.mobile,
    "--focus-wide": image.focus.desktop,
  };

  return (
    <div className={cn("relative overflow-hidden", className)} style={style}>
      <Image
        src={image.src}
        alt={decorative ? "" : image.alt[locale]}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          fit === "cover" ? "object-cover" : "object-contain",
          "[object-position:var(--focus-narrow)]",
          breakpoint === "container"
            ? "@3xl:[object-position:var(--focus-wide)]"
            : "lg:[object-position:var(--focus-wide)]",
        )}
      />
    </div>
  );
}
