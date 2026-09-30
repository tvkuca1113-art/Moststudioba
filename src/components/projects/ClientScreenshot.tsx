import Image from "next/image";

import { cn } from "@/lib/cn";

export type ClientScreenshotAsset = {
  src: string;
  width: number;
  height: number;
};

/** Actual, bounded viewport captures. Intrinsic dimensions preserve the layout. */
export function ClientScreenshot({
  shot,
  alt,
  caption,
  kind,
  sizes,
  preload = false,
  className,
}: {
  shot: ClientScreenshotAsset;
  alt: string;
  caption: string;
  kind: "desktop" | "services" | "mobile";
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  return (
    <figure data-client-screenshot={kind} className={cn("min-w-0", className)}>
      <div className="overflow-hidden rounded-xl border border-line-light bg-paper">
        <Image
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={alt}
          sizes={sizes}
          preload={preload}
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-slate">{caption}</figcaption>
    </figure>
  );
}
