"use client";
import { useState } from "react";
import { FurniturePreview } from "./FurniturePreview";
import type { WoodFinish } from "@/content/demos/trades";
import type { Room } from "@/lib/demo-logic";
import type { Locale } from "@/lib/i18n/config";
import s from "./PremiumDemos.module.css";

export type FurnitureVariant = { room: Room; finish: WoodFinish; dimension: number; extras: string[]; roomLabel: string; materialLabel: string; services: string[] };
export function FurnitureComparison({ current, locale, onRestore }: { current: FurnitureVariant; locale: Locale; onRestore: (variant: FurnitureVariant) => void }) {
  const de = locale === "de";
  const [variants, setVariants] = useState<FurnitureVariant[]>([]);
  const [message, setMessage] = useState("");
  function add() {
    const duplicate = variants.some(v => v.room === current.room && v.finish === current.finish && v.dimension === current.dimension && [...v.extras].sort().join() === [...current.extras].sort().join());
    if (duplicate) { setMessage(de ? "Diese Variante ist bereits im Vergleich. Ändern Sie Ihre Auswahl für eine zweite Variante." : "Ova varijanta je već u poređenju. Promijenite odabir za drugu varijantu."); return; }
    if (variants.length === 2) return;
    setVariants([...variants, { ...current, extras: [...current.extras], services: [...current.services] }]);
    setMessage(de ? "Variante hinzugefügt. Sie können Ihre Auswahl oben weiter anpassen." : "Varijanta je dodana. Sada možete promijeniti odabir iznad i dodati drugu.");
  }
  return <section className={s.compare} aria-labelledby="variant-comparison-title">
    <div className={s.compareHeader}>
      <div><p className={s.eyebrow}>{de ? "ZWEI IDEEN. EINE ENTSCHEIDUNG." : "DVIJE IDEJE. JEDNA ODLUKA."}</p><h3 id="variant-comparison-title">{de ? "Ihre Varianten im Vergleich" : "Uporedite svoje varijante"}</h3><p className={s.fine}>{de ? "Bis zu zwei Varianten bleiben während dieses Besuchs gespeichert. Laden Sie Ihre bevorzugte Auswahl für den Export wieder in den Konfigurator." : "Do dvije varijante ostaju sačuvane tokom ove posjete. Vratite odabranu u konfigurator kada želite preuzeti njen sažetak."}</p></div>
      <button type="button" className={`${s.action} ${s.secondary}`} disabled={variants.length === 2} onClick={add}>{de ? "Auswahl zum Vergleich" : "Dodaj odabir u poređenje"} · {variants.length}/2</button>
    </div>
    <p role="status" className={s.fine}>{message}</p>
    {variants.length > 0 ? <div className={s.compareGrid}>{variants.map((variant, i) => <article key={i} className={s.variant}>
      <FurniturePreview room={variant.room} finish={variant.finish} label={`${de ? "Variante" : "Varijanta"} ${i+1} — ${variant.roomLabel}, ${variant.materialLabel}`} />
      <div className={s.variantCopy}>
        <p className={s.eyebrow}>{de ? "VARIANTE" : "VARIJANTA"} 0{i+1}</p><h4>{variant.roomLabel}</h4>
        <p>{variant.materialLabel} · {variant.dimension} cm</p>
        <ul>{variant.services.length ? variant.services.map(service => <li key={service}>{service}</li>) : <li>{de ? "Ohne Zusatzleistungen" : "Bez dodatnih usluga"}</li>}</ul>
        <div className={s.actions}>
          <button type="button" className={s.action} onClick={() => { onRestore(variant); setMessage(de ? `Variante ${i+1} ist wieder im Konfigurator ausgewählt.` : `Varijanta ${i+1} je vraćena u konfigurator.`); }}>{de ? "Diese Variante wählen" : "Odaberi ovu varijantu"}</button>
          <button type="button" className={`${s.action} ${s.secondary}`} aria-label={`${de ? "Variante entfernen" : "Ukloni varijantu"} ${i+1}`} onClick={() => { setVariants(variants.filter((_, n) => n !== i)); setMessage(de ? "Variante entfernt." : "Varijanta je uklonjena."); }}>{de ? "Entfernen" : "Ukloni"}</button>
        </div>
      </div>
    </article>)}</div> : null}
  </section>;
}
