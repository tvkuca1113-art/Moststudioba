import Image from "next/image";
import type { Room } from "@/lib/demo-logic";
import type { WoodFinish } from "@/content/demos/trades";
import s from "./PremiumDemos.module.css";

export const furniturePhotos: Record<Room, Record<WoodFinish, string>> = {
  kitchen: { oak: "hrast-kuhinja-oak", walnut: "hrast-kuhinja", white: "hrast-kuhinja-white" },
  wardrobe: { oak: "hrast-plakar", walnut: "hrast-plakar-walnut", white: "hrast-plakar-white" },
  table: { oak: "hrast-sto-oak", walnut: "hrast-sto", white: "hrast-sto-white" },
};

/** Load the three finishes together so switching never shows a stale material.
 * Fixed geometry prevents image loading from moving the controls or page. */
export function FurniturePreview({ room, finish, label, className = "" }: {
  room: Room; finish: WoodFinish; label: string; className?: string;
}) {
  return <div className={`${s.furniturePreview} ${className}`}>
    {(Object.keys(furniturePhotos[room]) as WoodFinish[]).map((value) => (
      <Image key={`${room}-${value}`} src={`/images/hrast/${furniturePhotos[room][value]}.webp`}
        fill unoptimized loading="eager" sizes="(max-width:760px) 100vw, 40vw"
        alt={value === finish ? label : ""} aria-hidden={value !== finish}
        className={value === finish ? s.finishVisible : s.finishHidden} />
    ))}
  </div>;
}
