import type { ReactNode } from "react";
import { SiteFrame } from "@/components/layout/SiteFrame";
import type { HeaderTone } from "@/components/layout/Header";
import type { RouteRef } from "@/lib/i18n/config";

/** One shared visual system; this wrapper only selects English content. */
export function EnglishFrame({ children, route, tone = "solid" }: {
  children: ReactNode;
  route: RouteRef;
  tone?: HeaderTone;
}) {
  return <SiteFrame locale="en" route={route} tone={tone}>{children}</SiteFrame>;
}
