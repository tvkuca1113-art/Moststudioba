import Image from "next/image";

import { shots } from "@/content/shots";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/config";

/**
 * A screenshot of an implemented demo page, framed as the device it was
 * captured on. One pair per language, so the headline in the picture is in the
 * language the visitor is reading.
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
}: {
  slug: string;
  locale: Locale;
  device: "desktop" | "mobile";
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  frame?: boolean;
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
          className={cn("h-full w-full object-cover object-top", frame && "rounded-[1.05rem]")}
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
        className="h-auto w-full"
      />
    </div>
  );
}
