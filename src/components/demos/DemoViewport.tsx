"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export type Device = "desktop" | "mobile";

/** Layout width the demo is rendered at, per device. */
export const deviceWidth: Record<Device, number> = { desktop: 1180, mobile: 390 };

/**
 * Renders a demo at a real layout width and scales the result to fit.
 *
 * The point is that switching device changes the *container width* the demo's
 * container queries respond to — so the content genuinely re-flows, rather
 * than a desktop screenshot being shrunk. Scrolling happens inside the frame.
 */
export function DemoViewport({
  device,
  children,
  className,
  label,
}: {
  device: Device;
  children: ReactNode;
  className?: string;
  label: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const target = deviceWidth[device];

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;

    const measure = () => setBox({ width: node.clientWidth, height: node.clientHeight });
    measure();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const scale = box.width > 0 ? Math.min(1, box.width / target) : 1;
  const innerHeight = box.height > 0 ? box.height / scale : 0;

  return (
    <div ref={frameRef} className={cn("relative overflow-hidden", className)}>
      <div
        role="group"
        aria-label={label}
        className="@container absolute top-0 left-0 overflow-x-hidden overflow-y-auto overscroll-contain"
        style={{
          width: target,
          height: innerHeight || "100%",
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
        }}
      >
        {children}
      </div>
    </div>
  );
}
