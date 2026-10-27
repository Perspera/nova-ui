"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LayoutGrid,
  Loader2,
  Monitor,
  PanelRightClose,
  PanelRightOpen,
  Smartphone,
  Sparkles,
  Star,
  Tablet,
  Wrench,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GROUPS, PAGES, VARIANT_KEYS, getPage, type VariantKey } from "@/samples/registry";
import { Glyph } from "./glyph";
import { usePicks } from "./picks";

type Device = "fit" | "desktop" | "tablet" | "mobile";
const DEVICES: { key: Device; label: string; icon: typeof Monitor; w?: number; h?: number }[] = [
  { key: "fit", label: "自适应", icon: Maximize2 },
  { key: "desktop", label: "1440", icon: Monitor, w: 1440 },
  { key: "tablet", label: "平板", icon: Tablet, w: 834, h: 1112 },
  { key: "mobile", label: "手机", icon: Smartphone, w: 390, h: 844 },
];

function useSize<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [size, setSize] = React.useState({ w: 0, h: 0 });
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
}

export function Viewer({ initialSlug, initialVariant }: { initialSlug: string; initialVariant: VariantKey }) {
  const [slug, setSlug] = React.useState(initialSlug);
  const [variant, setVariant] = React.useState<VariantKey>(initialVariant);
  const [device, setDevice] = React.useState<Device>("fit");
  const [notesOpen, setNotesOpen] = React.useState(true);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const { pickOf, setPick } = usePicks();
  const page = getPage(slug)!;
  const idx = PAGES.findIndex((p) => p.slug === slug);

  React.useEffect(() => {
    const url = `/s/${slug}/${variant}`;
    if (window.location.pathname !== url) window.history.replaceState(null, "", url);
    document.title = `${page.no} ${page.title} · 方案 ${variant} — 布局样卡`;
  }, [slug, variant, page]);

  const goPage = React.useCallback(
    (delta: number) => {
      const next = PAGES[(idx + delta + PAGES.length) % PAGES.length];
      setSlug(next.slug);
      setVariant(next.recommended);
    },
    [idx],
  );

  const pick = pickOf(slug);
  const isPicked = pick === variant;

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowRight") goPage(1);
      else if (e.key === "ArrowLeft") goPage(-1);
      else if (e.key === "1" || e.key.toLowerCase() === "a") setVariant("A");
      else if (e.key === "2" || e.key.toLowerCase() === "b") setVariant("B");
      else if (e.key === "3" || e.key.toLowerCase() === "c") setVariant("C");
      else if (e.key.toLowerCase() === "p") setPick(slug, variant);
      else if (e.key === "Escape") setPickerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPage, setPick, slug, variant]);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-slate-100 text-slate-800">
      {/* ───────── Toolbar ───────── */}
      <header className="relative z-30 flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b border-slate-200 bg-white px-3 py-2 shadow-[0_1px_0_rgb(15_23_42/0.02)] sm:px-4">
        <div className="flex min-w-0 items-center gap-1.5">
          <Link
            href="/"
            className="flex h-9 items-center gap-1.5 rounded-lg px-2 text-[13px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">索引</span>
          </Link>
          <span className="h-5 w-px bg-slate-200" />
          <div className="relative">
            <button
              type="button"
              onClick={() => setPickerOpen((o) => !o)}
              className="flex h-9 min-w-0 items-center gap-2 rounded-lg px-2 hover:bg-slate-100"
            >
              <span className="rounded-md bg-slate-900 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-white">{page.no}</span>
              <span className="truncate text-[14px] font-semibold text-slate-900">{page.title}</span>
              <span className="hidden truncate font-mono text-[11px] text-slate-400 md:inline">{page.route}</span>
              <ChevronDown className="size-4 text-slate-400" />
            </button>
            {pickerOpen && <PagePicker current={slug} onPick={(s) => { setSlug(s); setVariant(getPage(s)!.recommended); setPickerOpen(false); }} onClose={() => setPickerOpen(false)} />}
          </div>
          <div className="flex items-center">
            <ToolIcon onClick={() => goPage(-1)} label="上一页 ←">
              <ChevronLeft className="size-4" />
            </ToolIcon>
            <ToolIcon onClick={() => goPage(1)} label="下一页 →">
              <ChevronRight className="size-4" />
            </ToolIcon>
          </div>
        </div>

        {/* Variant switch */}
        <div className="order-last flex w-full justify-center lg:order-none lg:w-auto lg:flex-1">
          <div className="flex w-full max-w-[640px] gap-1 rounded-xl bg-slate-100 p-1 ring-1 ring-inset ring-slate-200/70">
            {VARIANT_KEYS.map((k) => {
              const v = page.variants[k];
              const on = k === variant;
              const rec = k === page.recommended;
              const chosen = pick === k;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setVariant(k)}
                  className={cn(
                    "group flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-all",
                    on ? "bg-white shadow-[0_1px_3px_rgb(15_23_42/0.1),0_0_0_1px_rgb(15_23_42/0.04)]" : "hover:bg-white/60",
                  )}
                >
                  <Glyph rects={v.glyph} active={on} className="hidden w-10 shrink-0 sm:block" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className={cn("font-mono text-[12px] font-bold", on ? "text-indigo-600" : "text-slate-400")}>{k}</span>
                      <span className={cn("truncate text-[12.5px] font-medium", on ? "text-slate-900" : "text-slate-600")}>{v.name}</span>
                    </span>
                    <span className="mt-0.5 flex items-center gap-1">
                      {rec && (
                        <span className="inline-flex items-center gap-0.5 rounded bg-amber-50 px-1 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-200/70">
                          <Star className="size-2.5 fill-amber-400 text-amber-500" />
                          推荐
                        </span>
                      )}
                      {chosen && (
                        <span className="inline-flex items-center gap-0.5 rounded bg-emerald-50 px-1 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200/70">
                          <Check className="size-2.5" />
                          已选
                        </span>
                      )}
                      <span className="hidden truncate text-[10.5px] text-slate-400 xl:inline">{v.pattern}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <div className="hidden items-center rounded-lg bg-slate-100 p-0.5 ring-1 ring-inset ring-slate-200/70 md:flex">
            {DEVICES.map((d) => (
              <button
                key={d.key}
                type="button"
                onClick={() => setDevice(d.key)}
                title={d.label}
                className={cn(
                  "flex h-8 items-center gap-1 rounded-md px-2 text-[12px] font-medium transition-all",
                  device === d.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800",
                )}
              >
                <d.icon className="size-3.5" />
                <span className="hidden 2xl:inline">{d.label}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPick(slug, variant)}
            className={cn(
              "flex h-9 items-center gap-1.5 rounded-lg px-3 text-[13px] font-semibold transition-colors",
              isPicked
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
                : "bg-indigo-600 text-white shadow-[0_1px_2px_rgb(79_70_229/0.4)] hover:bg-indigo-700",
            )}
          >
            {isPicked ? <Check className="size-4" /> : <Sparkles className="size-4" />}
            {isPicked ? `已选定 ${variant}` : `选定方案 ${variant}`}
          </button>
          <ToolIcon href={`/f/${slug}/${variant}`} label="新窗口全屏打开">
            <ExternalLink className="size-4" />
          </ToolIcon>
          <ToolIcon onClick={() => setNotesOpen((o) => !o)} label={notesOpen ? "收起说明" : "展开说明"} className="hidden md:inline-grid">
            {notesOpen ? <PanelRightClose className="size-4" /> : <PanelRightOpen className="size-4" />}
          </ToolIcon>
        </div>
      </header>

      {/* ───────── Body ───────── */}
      <div className="flex min-h-0 flex-1">
        <Stage slug={slug} variant={variant} device={device} />
        {notesOpen && <Notes slug={slug} variant={variant} onVariant={setVariant} pick={pick} />}
      </div>
    </div>
  );
}

function ToolIcon({
  children,
  onClick,
  href,
  label,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  label: string;
  className?: string;
}) {
  const cls = cn("inline-grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900", className);
  if (href)
    return (
      <a href={href} target="_blank" rel="noreferrer" title={label} className={cls}>
        {children}
      </a>
    );
  return (
    <button type="button" onClick={onClick} title={label} className={cls}>
      {children}
    </button>
  );
}

function PagePicker({ current, onPick, onClose }: { current: string; onPick: (slug: string) => void; onClose: () => void }) {
  const { pickOf } = usePicks();
  React.useEffect(() => {
    const t = setTimeout(() => window.addEventListener("click", onClose, { once: true }), 0);
    return () => {
      clearTimeout(t);
      window.removeEventListener("click", onClose);
    };
  }, [onClose]);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-11 left-0 z-50 w-[min(92vw,680px)] rounded-xl border border-slate-200 bg-white p-2 shadow-[0_24px_48px_-12px_rgb(15_23_42/0.25)] animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="grid gap-x-2 sm:grid-cols-2">
        {GROUPS.map((g) => (
          <div key={g.key} className="py-1">
            <div className="px-2 pt-1 pb-1 text-[11px] font-semibold tracking-wide text-slate-400">{g.label}</div>
            {PAGES.filter((p) => p.group === g.key).map((p) => {
              const on = p.slug === current;
              const v = pickOf(p.slug);
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => onPick(p.slug)}
                  className={cn("flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left hover:bg-slate-50", on && "bg-indigo-50 hover:bg-indigo-50")}
                >
                  <span className={cn("font-mono text-[11px] font-semibold", on ? "text-indigo-600" : "text-slate-400")}>{p.no}</span>
                  <span className={cn("flex-1 truncate text-[13px]", on ? "font-semibold text-indigo-700" : "text-slate-700")}>{p.title}</span>
                  <span className="font-mono text-[10.5px] text-slate-400">{v}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stage({ slug, variant, device }: { slug: string; variant: VariantKey; device: Device }) {
  const [ref, size] = useSize<HTMLDivElement>();
  const [loaded, setLoaded] = React.useState<Record<string, boolean>>({});
  const pad = device === "fit" ? 16 : 28;
  const availW = Math.max(0, size.w - pad * 2);
  const availH = Math.max(0, size.h - pad * 2);
  const d = DEVICES.find((x) => x.key === device)!;

  let w = availW;
  let h = availH;
  let scale = 1;
  if (d.w) {
    w = d.w;
    if (d.h) {
      h = d.h;
      scale = Math.min(1, availW / d.w, availH / d.h);
    } else {
      scale = Math.min(1, availW / d.w);
      h = availH / (scale || 1);
    }
  }

  const isPhone = device === "mobile";
  const ready = size.w > 0;
  const fit = device === "fit";
  const markLoaded = (key: string) => setLoaded((s) => (s[key] ? s : { ...s, [key]: true }));

  // Iframe load often finishes before React attaches onLoad, which leaves the spinner up.
  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const sync = () => {
      let pending = false;
      root.querySelectorAll("iframe").forEach((node) => {
        const frame = node as HTMLIFrameElement;
        const src = frame.getAttribute("src") || "";
        const key = src.replace(/^\/f\//, "");
        let done = false;
        try {
          const doc = frame.contentDocument;
          done = Boolean(doc && doc.readyState === "complete" && src && doc.URL.includes(src));
        } catch {
          done = false;
        }
        if (done) markLoaded(key);
        else pending = true;
      });
      return pending;
    };
    if (!sync()) return;
    const timer = window.setInterval(() => {
      if (!sync()) window.clearInterval(timer);
    }, 200);
    return () => window.clearInterval(timer);
  }, [slug, device, ref]);

  return (
    <div ref={ref} className="bg-dots relative min-w-0 flex-1 overflow-hidden">
      {(fit || ready) && (
        <div className="absolute inset-0 flex items-start justify-center" style={{ padding: pad }}>
          <div
            className={cn(
              "relative shrink-0 overflow-hidden bg-white",
              fit && "h-full w-full",
              isPhone
                ? "rounded-[34px] shadow-[0_0_0_7px_#0f172a,0_30px_60px_-20px_rgb(15_23_42/0.45)]"
                : "rounded-xl shadow-[0_0_0_1px_rgb(15_23_42/0.08),0_24px_48px_-16px_rgb(15_23_42/0.25)]",
            )}
            style={fit ? undefined : { width: w * scale, height: h * scale }}
          >
            {VARIANT_KEYS.map((k) => {
              const key = `${slug}/${k}`;
              const on = k === variant;
              return (
                <iframe
                  key={key}
                  src={`/f/${slug}/${k}`}
                  title={`${slug} ${k}`}
                  onLoad={() => markLoaded(key)}
                  className={cn(
                    "absolute top-0 left-0 border-0 bg-white transition-opacity duration-150",
                    fit && "size-full",
                    on ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                  style={fit ? undefined : { width: w, height: h, transform: `scale(${scale})`, transformOrigin: "0 0" }}
                />
              );
            })}
            {!loaded[`${slug}/${variant}`] && (
              <div className="absolute inset-0 grid place-items-center bg-white">
                <div className="flex items-center gap-2 text-[13px] text-slate-400">
                  <Loader2 className="size-4 animate-spin" />
                  正在渲染样卡…
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {d.w && scale < 1 && (
        <div className="absolute right-3 bottom-3 rounded-md bg-slate-900/80 px-2 py-1 font-mono text-[11px] text-white backdrop-blur">
          {d.w}px · {Math.round(scale * 100)}%
        </div>
      )}
    </div>
  );
}

function Notes({
  slug,
  variant,
  onVariant,
  pick,
}: {
  slug: string;
  variant: VariantKey;
  onVariant: (v: VariantKey) => void;
  pick: VariantKey;
}) {
  const page = getPage(slug)!;
  const v = page.variants[variant];
  const rec = page.variants[page.recommended];
  return (
    <aside className="scrollbar-thin hidden w-[340px] shrink-0 overflow-y-auto border-l border-slate-200 bg-white md:block">
      <div className="space-y-5 p-5">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wide text-slate-400">
            <LayoutGrid className="size-3.5" />
            {GROUPS.find((g) => g.key === page.group)?.label}
          </div>
          <h2 className="mt-1.5 text-[17px] font-semibold tracking-tight text-slate-900">
            {page.no} · {page.title}
          </h2>
          <code className="mt-1 inline-block rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-500">{page.route}</code>
        </div>

        <div className="rounded-xl border border-amber-200/80 bg-gradient-to-b from-amber-50 to-white p-3.5">
          <div className="flex items-center gap-1.5 text-[12px] font-semibold text-amber-800">
            <Star className="size-3.5 fill-amber-400 text-amber-500" />
            推荐默认：方案 {page.recommended} · {rec.name}
          </div>
          <p className="mt-1.5 text-[12.5px] leading-5 text-slate-600">{page.reason}</p>
        </div>

        <div>
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-600 font-mono text-lg font-bold text-white shadow-[0_4px_10px_-2px_rgb(79_70_229/0.45)]">
              {variant}
            </span>
            <div className="min-w-0">
              <div className="text-[15px] font-semibold text-slate-900">{v.name}</div>
              <div className="mt-0.5 flex flex-wrap gap-1">
                <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[11px] font-medium text-indigo-700">{v.pattern}</span>
                {variant === page.recommended && <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[11px] font-medium text-amber-700">推荐</span>}
                {variant === pick && <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[11px] font-medium text-emerald-700">已选定</span>}
              </div>
            </div>
          </div>
          <p className="mt-3 text-[13px] leading-6 text-slate-600">{v.summary}</p>
        </div>

        <NoteList title="优点" items={v.pros} icon={<Check className="size-3.5 text-emerald-600" />} />
        <NoteList title="代价" items={v.cons} icon={<AlertTriangle className="size-3.5 text-amber-500" />} />

        <div>
          <div className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-slate-800">
            <Wrench className="size-3.5 text-slate-400" />
            落地改动（Vue 侧，仅供估算）
          </div>
          <ul className="space-y-1.5">
            {v.changes.map((c) => (
              <li key={c} className="rounded-lg bg-slate-50 px-2.5 py-1.5 font-mono text-[11.5px] leading-5 text-slate-600 ring-1 ring-inset ring-slate-200/70">
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-2 text-[12px] font-semibold text-slate-800">三套对比</div>
          <div className="space-y-1.5">
            {VARIANT_KEYS.map((k) => {
              const m = page.variants[k];
              const on = k === variant;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => onVariant(k)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border p-2 text-left transition-colors",
                    on ? "border-indigo-200 bg-indigo-50/50" : "border-slate-200 hover:bg-slate-50",
                  )}
                >
                  <Glyph rects={m.glyph} active={on} className="w-16 shrink-0" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={cn("font-mono text-[12px] font-bold", on ? "text-indigo-600" : "text-slate-400")}>{k}</span>
                      <span className="truncate text-[12.5px] font-medium text-slate-800">{m.name}</span>
                      {k === page.recommended && <Star className="size-3 shrink-0 fill-amber-400 text-amber-500" />}
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-400">{m.pattern}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 px-3 py-2.5 text-[11.5px] leading-5 text-slate-500">
          快捷键：<b className="text-slate-700">← →</b> 翻页 · <b className="text-slate-700">1 2 3</b> 切方案 · <b className="text-slate-700">P</b> 选定当前方案。选择会保存在本浏览器，回到索引页可一键复制落地清单。
        </div>
      </div>
    </aside>
  );
}

function NoteList({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-[12px] font-semibold text-slate-800">{title}</div>
      <ul className="space-y-1.5">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-2 text-[13px] leading-5 text-slate-600">
            <span className="mt-[3px] shrink-0">{icon}</span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
