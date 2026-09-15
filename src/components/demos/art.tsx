import { cn } from "@/lib/cn";

/**
 * Original artwork for the demo concepts, drawn as SVG rather than sourced as
 * stock photography: it stays sharp at any size, weighs a few kilobytes, never
 * shifts layout, and — in the joinery configurator — actually re-renders when
 * the visitor picks a different finish.
 */

export function ClinicScene({ uid, className }: { uid: string; className?: string }) {
  const sky = `${uid}-sky`;
  const light = `${uid}-light`;
  return (
    <svg
      viewBox="0 0 520 420"
      className={cn("h-full w-full", className)}
      role="presentation"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#e7eff1" />
          <stop offset="100%" stopColor="#f8fbfb" />
        </linearGradient>
        <linearGradient id={light} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#cfe3e6" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <rect width="520" height="420" fill={`url(#${sky})`} />

      {/* Arched window with slatted light */}
      <path d="M126 300V150a84 84 0 0 1 168 0v150Z" fill={`url(#${light})`} />
      <path d="M126 300V150a84 84 0 0 1 168 0v150Z" fill="none" stroke="#12303a" strokeOpacity="0.16" strokeWidth="2.5" />
      <path d="M210 66v234" stroke="#12303a" strokeOpacity="0.12" strokeWidth="2" />
      {[118, 150, 182, 214, 246, 278].map((y) => (
        <path key={y} d={`M128 ${y}h164`} stroke="#12303a" strokeOpacity="0.08" strokeWidth="2" />
      ))}

      {/* Light falling on the floor */}
      <path d="M126 300h168l82 44H44Z" fill="#ffffff" fillOpacity="0.75" />

      {/* Chair */}
      <g stroke="#12303a" strokeOpacity="0.55" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M330 300v-58a22 22 0 0 1 22-22h26a22 22 0 0 1 22 22v58" />
        <path d="M326 300h108" />
        <path d="M344 300v34M416 300v34" />
      </g>
      <rect x="330" y="268" width="104" height="34" rx="12" fill="#3f7f8c" fillOpacity="0.85" />

      {/* Plant */}
      <path d="M92 344h54l-8 44H100Z" fill="#12303a" fillOpacity="0.72" />
      <g stroke="#3f7f8c" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M119 344v-58" />
        <path d="M119 302c-22-6-32-24-30-44 20 2 32 16 34 36" />
        <path d="M119 316c20-8 28-28 24-48-18 4-28 20-28 40" />
      </g>

      {/* Floor line */}
      <path d="M0 344h520" stroke="#12303a" strokeOpacity="0.14" strokeWidth="2" />
      <path d="M0 388h520" stroke="#12303a" strokeOpacity="0.07" strokeWidth="2" />
    </svg>
  );
}

export type WoodFinish = "oak" | "walnut" | "white";
export type RoomVariant = "kitchen" | "wardrobe" | "furniture";

const finishPalette: Record<WoodFinish, { base: string; deep: string; grain: string; edge: string; counter: string }> = {
  oak: { base: "#c99a63", deep: "#a97c48", grain: "#8a5f33", edge: "#6f4b28", counter: "#2f2c28" },
  walnut: { base: "#6f4630", deep: "#573423", grain: "#3d2318", edge: "#2c190f", counter: "#1f1d1b" },
  white: { base: "#e9e6df", deep: "#d7d3ca", grain: "#bcb6aa", edge: "#a9a296", counter: "#33312e" },
};

/** Deterministic grain lines — same finish always draws the same board. */
function grainPaths(width: number, height: number, seed: number, count = 7) {
  const lines: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const t = (i + 1) / (count + 1);
    const y = height * t;
    const wobble = 3 + ((seed * (i + 3)) % 7);
    const mid = width / 2;
    lines.push(
      `M0 ${y.toFixed(1)}C${(mid * 0.4).toFixed(1)} ${(y - wobble).toFixed(1)} ${(mid * 1.2).toFixed(1)} ${(
        y + wobble
      ).toFixed(1)} ${width} ${(y - wobble / 2).toFixed(1)}`,
    );
  }
  return lines;
}

function WoodFill({ id, finish }: { id: string; finish: WoodFinish }) {
  const palette = finishPalette[finish];
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor={palette.base} />
      <stop offset="60%" stopColor={palette.deep} />
      <stop offset="100%" stopColor={palette.base} />
    </linearGradient>
  );
}

/**
 * Elevation drawing of the selected room, filled with the selected finish.
 * Changing the finish repaints the SVG — no new file is fetched.
 */
export function JoineryScene({
  uid,
  variant,
  finish,
  className,
}: {
  uid: string;
  variant: RoomVariant;
  finish: WoodFinish;
  className?: string;
}) {
  const palette = finishPalette[finish];
  const fillId = `${uid}-${variant}-${finish}`;
  const grain = grainPaths(480, 260, finish.length + variant.length);

  return (
    <svg
      viewBox="0 0 480 300"
      className={cn("h-full w-full", className)}
      role="presentation"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <WoodFill id={fillId} finish={finish} />
        <clipPath id={`${fillId}-clip`}>
          <rect x="0" y="0" width="480" height="300" />
        </clipPath>
      </defs>

      <rect width="480" height="300" fill="#141312" />
      <rect x="0" y="252" width="480" height="48" fill="#0d0c0b" />

      <g clipPath={`url(#${fillId}-clip)`}>
        {variant === "kitchen" && (
          <g>
            <rect x="24" y="52" width="196" height="76" rx="4" fill={`url(#${fillId})`} />
            <rect x="228" y="52" width="100" height="76" rx="4" fill={`url(#${fillId})`} />
            <rect x="24" y="168" width="304" height="84" rx="4" fill={`url(#${fillId})`} />
            <rect x="24" y="158" width="304" height="12" rx="3" fill={palette.counter} />
            <rect x="348" y="52" width="108" height="200" rx="4" fill={`url(#${fillId})`} />
            <g stroke={palette.edge} strokeWidth="2" opacity="0.8">
              <path d="M122 52v76M228 168v84M348 140h108" />
            </g>
            <g fill={palette.counter} opacity="0.9">
              <rect x="96" y="112" width="52" height="6" rx="3" />
              <rect x="252" y="112" width="52" height="6" rx="3" />
              <rect x="96" y="182" width="52" height="6" rx="3" />
              <rect x="252" y="182" width="52" height="6" rx="3" />
              <rect x="376" y="130" width="52" height="6" rx="3" />
            </g>
            <ellipse cx="160" cy="158" rx="30" ry="6" fill="#0d0c0b" opacity="0.5" />
          </g>
        )}

        {variant === "wardrobe" && (
          <g>
            <rect x="52" y="28" width="376" height="224" rx="4" fill={`url(#${fillId})`} />
            <g stroke={palette.edge} strokeWidth="2.5" opacity="0.85">
              <path d="M177 28v224M303 28v224" />
            </g>
            <g fill={palette.counter} opacity="0.9">
              <rect x="160" y="124" width="8" height="46" rx="4" />
              <rect x="312" y="124" width="8" height="46" rx="4" />
            </g>
            <rect x="52" y="28" width="376" height="10" rx="3" fill={palette.edge} opacity="0.7" />
            <rect x="72" y="252" width="336" height="8" rx="3" fill="#0d0c0b" opacity="0.6" />
          </g>
        )}

        {variant === "furniture" && (
          <g>
            <rect x="60" y="150" width="360" height="16" rx="5" fill={`url(#${fillId})`} />
            <rect x="84" y="166" width="16" height="86" rx="4" fill={`url(#${fillId})`} />
            <rect x="380" y="166" width="16" height="86" rx="4" fill={`url(#${fillId})`} />
            <path d="M100 178h280v10H100z" fill={palette.edge} opacity="0.55" />
            <g fill={`url(#${fillId})`}>
              <rect x="140" y="188" width="64" height="10" rx="4" />
              <rect x="146" y="198" width="10" height="54" rx="3" />
              <rect x="188" y="198" width="10" height="54" rx="3" />
              <rect x="146" y="130" width="10" height="58" rx="3" />
              <rect x="188" y="130" width="10" height="58" rx="3" />
              <rect x="140" y="126" width="64" height="10" rx="4" />
              <rect x="278" y="188" width="64" height="10" rx="4" />
              <rect x="284" y="198" width="10" height="54" rx="3" />
              <rect x="326" y="198" width="10" height="54" rx="3" />
              <rect x="284" y="130" width="10" height="58" rx="3" />
              <rect x="326" y="130" width="10" height="58" rx="3" />
              <rect x="278" y="126" width="64" height="10" rx="4" />
            </g>
          </g>
        )}

        <g stroke={palette.grain} strokeWidth="1" fill="none" opacity="0.35">
          {grain.map((d, index) => (
            <path key={index} d={d} transform="translate(0, 20)" />
          ))}
        </g>
      </g>
    </svg>
  );
}

/** Advisory: quiet architectural geometry, no people, no stock gloss. */
export function AdvisoryScene({ uid, className }: { uid: string; className?: string }) {
  const wash = `${uid}-wash`;
  return (
    <svg
      viewBox="0 0 520 380"
      className={cn("h-full w-full", className)}
      role="presentation"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={wash} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#f6f3ec" />
          <stop offset="100%" stopColor="#e6e1d6" />
        </linearGradient>
      </defs>
      <rect width="520" height="380" fill={`url(#${wash})`} />

      {/* Terraced steps: the "current position → next step" idea, drawn plainly */}
      <g fill="#23211c" fillOpacity="0.08">
        <rect x="40" y="276" width="440" height="52" />
        <rect x="92" y="224" width="388" height="52" />
        <rect x="144" y="172" width="336" height="52" />
        <rect x="196" y="120" width="284" height="52" />
      </g>
      <g stroke="#23211c" strokeOpacity="0.4" strokeWidth="1.5" fill="none">
        <path d="M40 276h440M92 224h388M144 172h336M196 120h284" />
        <path d="M40 276v52M92 224v52M144 172v52M196 120v52" />
      </g>

      <circle cx="404" cy="76" r="30" fill="#7a6a52" fillOpacity="0.9" />
      <path d="M40 60h236" stroke="#23211c" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M40 84h148" stroke="#23211c" strokeOpacity="0.28" strokeWidth="2" />
    </svg>
  );
}
