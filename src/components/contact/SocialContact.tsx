import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n/config";
import { buttonClass } from "@/components/ui/Button";
import { TrackedAnchor } from "@/components/ui/TrackedLink";
import { ArrowUpRight, FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export function SocialContact({ locale, from = "contact", dark = false, cards = false }: {
  locale: Locale;
  from?: "hero" | "header" | "contact" | "footer" | "brief";
  dark?: boolean;
  cards?: boolean;
}) {
  const channels = [
    { name: "Instagram", detail: site.instagramHandle, href: site.instagramUrl, Icon: InstagramIcon, event: "outbound_instagram" as const },
    { name: "Facebook", detail: "MOST Studio", href: site.facebookUrl, Icon: FacebookIcon, event: "outbound_facebook" as const },
  ];
  return <div className={cards ? "grid gap-3" : "flex flex-wrap gap-3"}>
    {channels.map(({ name, detail, href, Icon, event }) => <TrackedAnchor key={name}
      href={href} target="_blank" rel="noopener noreferrer" track={[event, { locale, from }]}
      aria-label={locale === "bs" ? `Javite se na ${name === "Instagram" ? "Instagramu" : "Facebooku"}` : `Auf ${name} schreiben`}
      className={cards ? cn("group flex min-h-22 items-center gap-4 rounded-2xl border px-5 py-4 transition-colors motion-reduce:transition-none",
        dark ? "border-line-dark bg-white/5 hover:border-lime/60 hover:bg-white/10" : "border-line-light bg-white/60 hover:border-forest/60 hover:bg-white")
        : buttonClass(name === "Instagram" ? "primary" : "secondary", dark ? "dark" : "light", "px-4")}>
      <span className={cards ? cn("flex size-11 shrink-0 items-center justify-center rounded-full", dark ? "bg-lime text-ink" : "bg-forest text-paper") : ""}><Icon className="size-5 shrink-0" /></span>
      {cards ? <span className="min-w-0 flex-1"><span className="block text-lg font-semibold">{name}</span><span className={cn("block text-sm", dark ? "text-mist" : "text-slate")}>{detail}</span></span> : name}
      {cards && <ArrowUpRight className="size-5 shrink-0" />}
    </TrackedAnchor>)}
  </div>;
}
