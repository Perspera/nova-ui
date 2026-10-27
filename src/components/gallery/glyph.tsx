import { cn } from "@/lib/utils";
import type { GlyphKind, GlyphRect } from "@/samples/registry";

const KIND: Record<GlyphKind, string> = {
  h: "bg-slate-200",
  r: "bg-slate-100 ring-1 ring-inset ring-slate-200",
  s: "bg-slate-100",
  m: "bg-white ring-1 ring-inset ring-slate-200 glyph-lines",
  a: "bg-blue-100 ring-1 ring-inset ring-blue-300",
  d: "bg-white ring-1 ring-inset ring-indigo-300 shadow-[-4px_0_10px_-4px_rgb(79_70_229/0.35)]",
  b: "bg-slate-700",
};

export function Glyph({ rects, className, active }: { rects: GlyphRect[]; className?: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-md bg-slate-50 ring-1 ring-slate-200",
        active && "ring-indigo-300",
        className,
      )}
    >
      {rects.map(([x, y, w, h, k], i) => (
        <span
          key={i}
          className={cn("absolute rounded-[2px]", KIND[k])}
          style={{ left: `${x}%`, top: `${(y / 62.5) * 100}%`, width: `${w}%`, height: `${(h / 62.5) * 100}%` }}
        />
      ))}
    </div>
  );
}
