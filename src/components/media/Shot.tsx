import Image from "next/image";

import { shots } from "@/content/shots";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/config";

/**
 * A screenshot of an implemented demo page, framed as the device it was
 * captured on. One pair per language, so the headline in the picture is in the
 * language the visitor is reading.
 *
 * `crop` shows the top of the capture inside a shallower window. A card wants
 * to say "this is a designed page", which the first screen already does; the
 * whole 16:10 capture belongs on the concept page, where it is the subject
 * rather than a thumbnail.
 */
export function Shot({
  slug,
  locale,
  device,
  alt,
  className,
  sizes,
  priority = false,
  frame = true,
  crop,
}: {
  slug: string;
  locale: Locale;
  device: "desktop" | "mobile";
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  frame?: boolean;
  /**
   * Which window of the capture to show. "pano" is the hero gallery, "card"
   * the portfolio — two different framings of the same page, so the two
   * sections do not read as the same picture printed twice.
   */
  crop?: "pano" | "card";
}) {
  const shot = shots[`${slug}-${locale}-${device}` as keyof typeof shots];
  if (!shot) return null;

  if (device === "mobile") {
    return (
      <div
        className={cn(
          "overflow-hidden bg-ink",
          frame && "rounded-[1.4rem] p-1.5 ring-1 ring-mist/25",
          className,
        )}
      >
        <Image
          src={shot.src}
          alt={alt}
          width={shot.width}
          height={shot.height}
          sizes={sizes}
          priority={priority}
          className={cn(
            "w-full object-cover object-top",
            crop ? "aspect-9/16" : "h-full",
            frame && "rounded-[1.05rem]",
          )}
        />
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden bg-ink", frame && "rounded-xl ring-1 ring-mist/25", className)}>
      {frame && (
        <div className="flex items-center gap-1.5 border-b border-line-dark px-3.5 py-2.5">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-mist/35" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-mist/35" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-mist/35" />
        </div>
      )}
      <Image
        src={shot.src}
        alt={alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        priority={priority}
        className={cn("w-full", crop === "pano" ? "aspect-3/1 object-cover object-top" : crop === "card" ? "aspect-13/5 object-cover object-top" : "h-auto")}
      />
    </div>
  );
}
