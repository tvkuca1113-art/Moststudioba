"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/dictionary";

const STAGE_W = 680;
const STAGE_H = 520;

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * The hero figure: a bridge built out of real interface panels.
 *
 * Every panel is ordinary HTML and CSS — a browser window, a phone screen, a
 * contact card — arranged in a 3-D scene whose geometry is the studio's own
 * name: two piers, a deck, a span. It assembles once and then holds still.
 * On a fine pointer it tilts a few degrees; with reduced motion it simply
 * appears finished.
 */
export function HeroComposition({ dict }: { dict: Dictionary }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const measure = () => {
      const width = node.clientWidth;
      setScale(Math.max(0.4, Math.min(1.1, width / STAGE_W)));
    };
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Pointer tilt: fine pointers only, and never against reduced motion.
  useEffect(() => {
    const stage = stageRef.current;
    const wrap = wrapRef.current;
    if (!stage || !wrap || typeof window.matchMedia !== "function") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = wrap.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        stage.style.setProperty("--stage-ry", `${-17 + x * 9}deg`);
        stage.style.setProperty("--stage-rx", `${9 - y * 6}deg`);
      });
    };
    const onLeave = () => {
      stage.style.removeProperty("--stage-ry");
      stage.style.removeProperty("--stage-rx");
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const f = dict.heroFigure;

  return (
    <div ref={wrapRef} className="scene-3d relative w-full" style={{ height: STAGE_H * scale }}>
      <div
        className="absolute top-0 left-1/2"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        <div ref={stageRef} className="scene-stage relative size-full" aria-hidden="true">
          {/* Deck — the lime span line between the piers */}
          <Plate
            className="rounded-full bg-lime/90"
            style={{ left: 54, top: 404, width: 574, height: 12, "--pz": "-70px", "--delay": "90ms" } as Vars}
          />
          {/* Cable stays: two diagonals that read as the middle of an M */}
          <Plate
            className="origin-left rounded-full bg-lime/35"
            style={{ left: 196, top: 408, width: 190, height: 3, "--pz": "-68px", "--delay": "150ms", rotate: "-46deg" } as Vars}
          />
          <Plate
            className="origin-left rounded-full bg-lime/35"
            style={{ left: 342, top: 272, width: 190, height: 3, "--pz": "-68px", "--delay": "170ms", rotate: "46deg" } as Vars}
          />

          {/* Left pier — a phone screen */}
          <Plate
            className="overflow-hidden rounded-[22px] border border-white/12 bg-[#0f2c27] shadow-[0_40px_70px_-40px_rgba(0,0,0,0.9)]"
            style={{ left: 30, top: 128, width: 168, height: 300, "--pz": "-150px", "--pry": "17deg", "--delay": "200ms" } as Vars}
          >
            <div className="flex items-center justify-between px-4 pt-3 text-[8px] text-mist">
              <span>9:41</span>
              <span className="flex gap-0.5">
                <i className="block size-1 rounded-full bg-mist/70" />
                <i className="block size-1 rounded-full bg-mist/70" />
                <i className="block size-1 rounded-full bg-mist/70" />
              </span>
            </div>
            <div className="px-4 pt-4">
              <p className="font-display text-[10px] font-extrabold tracking-[0.18em] text-paper">MOST</p>
              <p className="mt-5 font-display text-[19px] leading-[1.05] font-extrabold text-paper">{f.mobileTitle}</p>
              <p className="mt-2.5 text-[9px] leading-relaxed text-mist">{f.mobileBody}</p>
              <p className="mt-4 inline-flex rounded-full bg-lime px-3 py-1.5 text-[9px] font-bold text-ink">
                {f.mobileCta}
              </p>
              <div className="mt-5 space-y-2">
                <i className="block h-12 rounded-lg bg-white/8" />
                <i className="block h-12 rounded-lg bg-white/8" />
              </div>
            </div>
          </Plate>

          {/* Right pier — a contact card */}
          <Plate
            className="overflow-hidden rounded-2xl border border-line-light bg-paper shadow-[0_40px_70px_-40px_rgba(0,0,0,0.85)]"
            style={{ left: 484, top: 168, width: 170, height: 262, "--pz": "-150px", "--pry": "-17deg", "--delay": "250ms" } as Vars}
          >
            <div className="p-4">
              <p className="text-[8px] font-semibold tracking-[0.18em] text-slate uppercase">{f.formTitle}</p>
              <p className="mt-3 text-[10px] font-semibold text-ink">{f.formField}</p>
              <i className="mt-2 block h-8 rounded-lg border border-line-light bg-white" />
              <div className="mt-3 space-y-1.5">
                <i className="block h-2 w-4/5 rounded-full bg-ink/10" />
                <i className="block h-2 w-3/5 rounded-full bg-ink/10" />
              </div>
              <i className="mt-4 block h-16 rounded-lg border border-line-light bg-white" />
              <p className="mt-3 inline-flex rounded-full bg-forest px-3 py-1.5 text-[9px] font-bold text-paper">
                {f.formCta}
              </p>
            </div>
          </Plate>

          {/* The span — main browser window */}
          <Plate
            className="overflow-hidden rounded-2xl border border-line-light bg-paper shadow-[0_60px_90px_-45px_rgba(0,0,0,0.9)]"
            style={{ left: 92, top: 42, width: 496, height: 340, "--pz": "40px", "--delay": "0ms" } as Vars}
          >
            <div className="flex items-center gap-2 border-b border-line-light bg-white px-3 py-2">
              <span className="flex gap-1">
                <i className="block size-1.5 rounded-full bg-ink/15" />
                <i className="block size-1.5 rounded-full bg-ink/15" />
                <i className="block size-1.5 rounded-full bg-ink/15" />
              </span>
              <span className="flex flex-1 items-center gap-1.5 rounded-full bg-paper-dim px-2 py-1">
                <svg viewBox="0 0 12 12" className="size-2 text-slate" fill="none">
                  <rect x="2.5" y="5" width="7" height="5" rx="1.2" stroke="currentColor" strokeWidth="1" />
                  <path d="M4.25 5V3.75a1.75 1.75 0 0 1 3.5 0V5" stroke="currentColor" strokeWidth="1" />
                </svg>
                <i className="block h-1.5 w-20 rounded-full bg-ink/12" />
              </span>
            </div>

            <div className="px-5 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-display text-[11px] font-extrabold tracking-[0.18em] text-forest">MOST</span>
                <span className="flex gap-3 text-[8px] text-slate">
                  <span>{f.navWork}</span>
                  <span>{f.navServices}</span>
                  <span>{f.navContact}</span>
                </span>
              </div>

              <div className="mt-5 grid grid-cols-[1.15fr_0.85fr] gap-4">
                <div>
                  <p className="text-[7px] font-semibold tracking-[0.2em] text-slate uppercase">
                    {dict.hero.support}
                  </p>
                  <p className="mt-2 font-display text-[26px] leading-[0.98] font-extrabold tracking-[-0.03em] text-forest">
                    {f.title}
                  </p>
                  <p className="mt-2.5 text-[9px] leading-relaxed text-slate">{f.body}</p>
                  <p className="mt-3.5 inline-flex rounded-full bg-forest px-3.5 py-1.5 text-[9px] font-bold text-paper">
                    {f.cta}
                  </p>
                </div>
                <div className="relative">
                  <i className="absolute inset-0 rounded-xl bg-forest" />
                  <i className="absolute top-4 -left-3 h-16 w-14 rounded-lg bg-lime" />
                  <i className="absolute right-3 bottom-4 h-14 w-16 rounded-lg bg-paper-dim" />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2.5 border-t border-line-light pt-3.5">
                {[f.cardOne, f.cardTwo, f.cardThree].map((label) => (
                  <div key={label} className="rounded-lg bg-paper-dim p-2.5">
                    <p className="text-[8px] font-bold text-forest">{label}</p>
                    <i className="mt-1.5 block h-1.5 w-full rounded-full bg-ink/10" />
                    <i className="mt-1 block h-1.5 w-2/3 rounded-full bg-ink/10" />
                  </div>
                ))}
              </div>
            </div>
          </Plate>

          {/* Front card floating above the span */}
          <Plate
            className="overflow-hidden rounded-xl border border-line-dark bg-ink shadow-[0_40px_60px_-35px_rgba(0,0,0,0.95)]"
            style={{ left: 392, top: 322, width: 224, height: 128, "--pz": "140px", "--pry": "-9deg", "--delay": "320ms" } as Vars}
          >
            <div className="p-3.5">
              <p className="text-[7px] font-semibold tracking-[0.2em] text-lime uppercase">{dict.showcase.eyebrow}</p>
              <div className="mt-2.5 space-y-2">
                {[f.cardOne, f.cardTwo, f.cardThree].map((label, index) => (
                  <div key={label} className="flex items-center justify-between border-b border-line-dark pb-1.5">
                    <span className="text-[9px] font-semibold text-paper">{label}</span>
                    <span className="text-[8px] text-mist">0{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </Plate>
        </div>
      </div>
    </div>
  );
}

function Plate({
  children,
  className,
  style,
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cn("scene-plate plate-enter absolute", className)} style={style}>
      {children}
    </div>
  );
}
