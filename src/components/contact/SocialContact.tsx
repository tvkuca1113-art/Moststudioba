import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n/config";
import { buttonClass } from "@/components/ui/Button";
import { TrackedAnchor } from "@/components/ui/TrackedLink";
import { InstagramIcon } from "@/components/ui/icons";

/** One confirmed destination across the site. No speculative app deep links. */
export function SocialContact({ locale, from = "contact", dark = false }: {
  locale: Locale;
  from?: "hero" | "header" | "contact" | "footer" | "brief";
  dark?: boolean;
}) {
  return <div className="flex flex-wrap gap-3">
    <TrackedAnchor href={site.instagramUrl} target="_blank" rel="noopener noreferrer"
      track={["outbound_instagram", { locale, from }]}
      className={buttonClass("primary", dark ? "dark" : "light")}>
      <InstagramIcon className="size-5 shrink-0" />
      {locale === "bs" ? "Javite se na Instagramu" : "Auf Instagram schreiben"}
    </TrackedAnchor>
    {site.facebookUrl && <TrackedAnchor href={site.facebookUrl} target="_blank" rel="noopener noreferrer"
      track={["outbound_facebook", { locale, from }]}
      className={buttonClass("secondary", dark ? "dark" : "light")}>
      {locale === "bs" ? "Javite se na Facebooku" : "Auf Facebook schreiben"}
    </TrackedAnchor>}
  </div>;
}
