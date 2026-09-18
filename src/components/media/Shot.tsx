import Image from "next/image";
import { shots, type ShotKey } from "@/content/shots";
import { cn } from "@/lib/cn";
import { path, type Locale } from "@/lib/i18n/config";
import { TrackedLink } from "@/components/ui/TrackedLink";

/** Actual demo capture, rendered at its final aspect ratio without client JS. */
export function Shot({ slug, locale, device, alt, className, sizes, priority = false, frame = true }: {
  slug: string;
  locale: Locale;
  device: "desktop" | "mobile";
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  frame?: boolean;
  crop?: "pano" | "card";
}) {
  const shot = shots[`${slug}-${locale}-${device}` as ShotKey];
  if (!shot) return null;
  return <div className={cn("overflow-hidden", frame && (device === "mobile" ? "rounded-[1.5rem] border-[5px] border-[#35413b]" : "rounded-xl border border-current/15"), className)}>
    {frame && device === "desktop" && <TrackedLink
      href={path("demo", locale, slug)}
      track={["open_demo", { project: slug, locale, from: priority ? "hero" : "portfolio" }]}
      className="flex min-h-11 items-center justify-between gap-3 bg-[#e8e7e0] px-4 py-2 text-xs font-semibold text-[#35413b] underline underline-offset-4 hover:bg-white">
      <span>{locale === "de" ? "Interaktives Website-Konzept" : "Interaktivni web koncept"}</span>
      <span>{locale === "de" ? "Demo öffnen ↗" : "Otvori demo ↗"}</span>
    </TrackedLink>}
    <Image src={shot.src} width={shot.width} height={shot.height} alt={alt} sizes={sizes}
      preload={priority} className="block h-auto w-full" />
  </div>;
}
