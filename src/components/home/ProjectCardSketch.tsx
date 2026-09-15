import { AdvisoryScene, ClinicScene, JoineryScene } from "@/components/demos/art";
import type { DemoKey } from "@/content/projects";

/**
 * A miniature of each concept's own front page, drawn with that concept's
 * palette and its own artwork. It is a small designed thing rather than a grey
 * skeleton, and the structure differs per concept — rounded and roomy for the
 * clinic, hard-edged for the joinery, hairline-editorial for the advisory —
 * so the three cards never read as one repeated template.
 */
export function ProjectCardSketch({
  variant,
  fg,
  accent,
  uid,
}: {
  variant: DemoKey;
  fg: string;
  accent: string;
  uid: string;
}) {
  const bar = (width: string, opacity = 0.16) => ({ width, backgroundColor: fg, opacity });

  if (variant === "clinic") {
    return (
      <div aria-hidden="true" className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-black/5 px-3 py-2">
          <span className="h-2 rounded-full" style={bar("2.5rem", 0.55)} />
          <span className="h-4 w-14 rounded-full" style={{ backgroundColor: fg }} />
        </div>
        <div className="grid flex-1 grid-cols-[1.05fr_0.95fr] gap-3 p-3">
          <div className="flex flex-col gap-1.5">
            <span className="h-1.5 rounded-full" style={{ ...bar("3rem", 0.9), backgroundColor: accent }} />
            <span className="mt-1 h-3 rounded-full" style={bar("100%", 0.82)} />
            <span className="h-3 rounded-full" style={bar("70%", 0.82)} />
            <span className="mt-1 h-1.5 rounded-full" style={bar("90%")} />
            <span className="h-1.5 rounded-full" style={bar("60%")} />
            <span className="mt-auto h-5 w-20 rounded-full" style={{ backgroundColor: fg }} />
          </div>
          <div className="relative overflow-hidden rounded-lg border border-black/5">
            <ClinicScene uid={`${uid}-card`} className="absolute inset-0" />
          </div>
        </div>
        <div className="flex gap-1.5 px-3 pb-3">
          {[0, 1, 2, 3].map((index) => (
            <span
              key={index}
              className="h-5 flex-1 rounded-full"
              style={index === 0 ? { backgroundColor: accent } : { backgroundColor: fg, opacity: 0.1 }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "trades") {
    return (
      <div aria-hidden="true" className="flex h-full flex-col overflow-hidden bg-black/35">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <span className="h-2" style={bar("2.5rem", 0.5)} />
          <span className="h-4 w-14 border" style={{ borderColor: accent }} />
        </div>
        <div className="grid flex-1 grid-cols-[0.85fr_1.15fr] gap-3 p-3">
          <div className="flex flex-col gap-1.5">
            <span className="h-1.5" style={{ ...bar("2.5rem"), backgroundColor: accent }} />
            <span className="mt-1 h-4" style={bar("100%", 0.85)} />
            <span className="h-4" style={bar("80%", 0.85)} />
            <span className="h-4" style={bar("90%", 0.85)} />
            <span className="mt-auto h-5 w-20" style={{ backgroundColor: accent }} />
          </div>
          <div className="relative overflow-hidden border border-white/10">
            <JoineryScene uid={`${uid}-card`} variant="kitchen" finish="oak" className="absolute inset-0" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="flex h-full flex-col gap-2.5 overflow-hidden p-3">
      <span className="h-1.5 w-12 rounded-full" style={{ backgroundColor: accent }} />
      <span className="h-3.5 rounded-sm" style={bar("85%", 0.75)} />
      <span className="h-3.5 rounded-sm" style={bar("60%", 0.75)} />
      <span className="h-px w-full" style={{ backgroundColor: fg, opacity: 0.28 }} />
      <div className="relative min-h-20 flex-1 overflow-hidden border" style={{ borderColor: `${fg}22` }}>
        <AdvisoryScene uid={`${uid}-card`} className="absolute inset-0" />
      </div>
      <div className="flex flex-col gap-1.5">
        {[0, 1, 2].map((index) => (
          <div key={index} className="flex items-center gap-2 border-t pt-1.5" style={{ borderColor: `${fg}22` }}>
            <span className="h-1.5 w-3 rounded-full" style={{ backgroundColor: accent, opacity: 0.85 }} />
            <span className="h-1.5 flex-1 rounded-full" style={bar("100%", 0.2)} />
          </div>
        ))}
      </div>
    </div>
  );
}
