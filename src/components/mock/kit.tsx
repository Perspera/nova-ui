"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Search,
  X,
  type LucideIcon,
} from "lucide-react";

export type Tone = "neutral" | "blue" | "indigo" | "green" | "amber" | "red" | "sky" | "violet";

const TONE_TAG: Record<Tone, string> = {
  neutral: "bg-slate-100 text-slate-600 ring-slate-200/70",
  blue: "bg-blue-50 text-blue-700 ring-blue-200/70",
  indigo: "bg-indigo-50 text-indigo-700 ring-indigo-200/70",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200/70",
  amber: "bg-amber-50 text-amber-700 ring-amber-200/80",
  red: "bg-rose-50 text-rose-700 ring-rose-200/70",
  sky: "bg-sky-50 text-sky-700 ring-sky-200/70",
  violet: "bg-violet-50 text-violet-700 ring-violet-200/70",
};

const TONE_DOT: Record<Tone, string> = {
  neutral: "bg-slate-400",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-rose-500",
  sky: "bg-sky-500",
  violet: "bg-violet-500",
};

export const TONE_SOFT: Record<Tone, string> = {
  neutral: "bg-slate-50 text-slate-700 border-slate-200",
  blue: "bg-blue-50/70 text-blue-800 border-blue-200",
  indigo: "bg-indigo-50/70 text-indigo-800 border-indigo-200",
  green: "bg-emerald-50/70 text-emerald-800 border-emerald-200",
  amber: "bg-amber-50/80 text-amber-900 border-amber-200",
  red: "bg-rose-50/70 text-rose-800 border-rose-200",
  sky: "bg-sky-50/70 text-sky-800 border-sky-200",
  violet: "bg-violet-50/70 text-violet-800 border-violet-200",
};

export const TONE_ICON_BG: Record<Tone, string> = {
  neutral: "bg-slate-100 text-slate-600",
  blue: "bg-blue-50 text-blue-600",
  indigo: "bg-indigo-50 text-indigo-600",
  green: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  red: "bg-rose-50 text-rose-600",
  sky: "bg-sky-50 text-sky-600",
  violet: "bg-violet-50 text-violet-600",
};

/* ───────────────────────── Surfaces ───────────────────────── */

export function Panel({
  title,
  desc,
  actions,
  className,
  bodyClassName,
  children,
  icon: Icon,
  flush,
}: {
  title?: React.ReactNode;
  desc?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children?: React.ReactNode;
  icon?: LucideIcon;
  flush?: boolean;
}) {
  return (
    <section className={cn("rounded-xl border border-line bg-white shadow-card", className)}>
      {(title || actions) && (
        <header className="flex items-center gap-3 border-b border-line px-4 py-3">
          {Icon && (
            <span className="grid size-7 place-items-center rounded-lg bg-slate-50 text-slate-500 ring-1 ring-line">
              <Icon className="size-3.5" />
            </span>
          )}
          <div className="min-w-0 flex-1">
            {title && <h3 className="truncate text-[13px] font-semibold text-slate-900">{title}</h3>}
            {desc && <p className="mt-0.5 truncate text-xs text-slate-500">{desc}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-1.5">{actions}</div>}
        </header>
      )}
      <div className={cn(!flush && "p-4", bodyClassName)}>{children}</div>
    </section>
  );
}

export function PageHeader({
  title,
  desc,
  actions,
  crumbs,
  meta,
  className,
}: {
  title: React.ReactNode;
  desc?: React.ReactNode;
  actions?: React.ReactNode;
  crumbs?: string[];
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-x-6 gap-y-3", className)}>
      <div className="min-w-0">
        {crumbs && (
          <div className="mb-1.5 flex items-center gap-1 text-xs text-slate-400">
            {crumbs.map((c, i) => (
              <React.Fragment key={c}>
                {i > 0 && <ChevronRight className="size-3" />}
                <span className={i === crumbs.length - 1 ? "text-slate-500" : ""}>{c}</span>
              </React.Fragment>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-[20px] font-semibold tracking-tight text-slate-900">{title}</h1>
          {meta}
        </div>
        {desc && <p className="mt-1 text-[13px] text-slate-500">{desc}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function SectionTitle({
  children,
  hint,
  actions,
  className,
}: {
  children: React.ReactNode;
  hint?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <div className="flex items-baseline gap-2">
        <h4 className="text-[13px] font-semibold text-slate-800">{children}</h4>
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
      </div>
      {actions}
    </div>
  );
}

/* ───────────────────────── Atoms ───────────────────────── */

export function Tag({
  tone = "neutral",
  children,
  className,
  dot,
  icon: Icon,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
  icon?: LucideIcon;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-5 shrink-0 items-center gap-1 rounded-md px-1.5 text-[11px] font-medium whitespace-nowrap ring-1 ring-inset",
        TONE_TAG[tone],
        className,
      )}
    >
      {dot && <span className={cn("size-1.5 rounded-full", TONE_DOT[tone])} />}
      {Icon && <Icon className="size-3" />}
      {children}
    </span>
  );
}

export function Dot({ tone = "neutral", pulse, className }: { tone?: Tone; pulse?: boolean; className?: string }) {
  return (
    <span className={cn("relative inline-flex size-2 shrink-0", className)}>
      {pulse && <span className={cn("absolute inline-flex size-full animate-ping rounded-full opacity-50", TONE_DOT[tone])} />}
      <span className={cn("relative inline-flex size-2 rounded-full", TONE_DOT[tone])} />
    </span>
  );
}

export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded border border-line-strong bg-white px-1 font-mono text-[10px] font-medium text-slate-500 shadow-[0_1px_0_#d5dbe5]",
        className,
      )}
    >
      {children}
    </kbd>
  );
}

export function Btn({
  variant = "outline",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  children,
  className,
  ...rest
}: {
  variant?: "primary" | "outline" | "ghost" | "danger" | "soft" | "dark";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconRight?: LucideIcon;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const v = {
    primary: "bg-blue-600 text-white shadow-[0_1px_2px_rgb(37_99_235/0.3),inset_0_1px_0_rgb(255_255_255/0.12)] hover:bg-blue-700",
    outline: "border border-line-strong bg-white text-slate-700 shadow-card hover:bg-slate-50 hover:text-slate-900",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    danger: "bg-rose-600 text-white shadow-[0_1px_2px_rgb(225_29_72/0.3)] hover:bg-rose-700",
    soft: "bg-blue-50 text-blue-700 hover:bg-blue-100",
    dark: "bg-slate-900 text-white hover:bg-slate-800",
  }[variant];
  const s = {
    sm: "h-7 gap-1 rounded-md px-2.5 text-xs [&_svg]:size-3.5",
    md: "h-8 gap-1.5 rounded-lg px-3 text-[13px] [&_svg]:size-4",
    lg: "h-10 gap-2 rounded-lg px-4 text-sm [&_svg]:size-4",
  }[size];
  return (
    <button
      type="button"
      className={cn(
        "inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        v,
        s,
        className,
      )}
      {...rest}
    >
      {Icon && <Icon />}
      {children}
      {IconRight && <IconRight className="opacity-60" />}
    </button>
  );
}

export function IconBtn({
  icon: Icon,
  className,
  active,
  badge,
  ...rest
}: { icon: LucideIcon; active?: boolean; badge?: number | boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "relative inline-grid size-8 shrink-0 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800",
        active && "bg-slate-100 text-slate-900",
        className,
      )}
      {...rest}
    >
      <Icon className="size-4" />
      {badge !== undefined && badge !== false && (
        <span
          className={cn(
            "absolute top-1 right-1 grid place-items-center rounded-full bg-rose-500 text-[9px] font-semibold text-white ring-2 ring-white",
            typeof badge === "number" ? "h-3.5 min-w-3.5 px-0.5" : "size-2",
          )}
        >
          {typeof badge === "number" ? badge : null}
        </span>
      )}
    </button>
  );
}

export function Avatar({ name, size = 28, tone, className }: { name: string; size?: number; tone?: number; className?: string }) {
  const palette = [
    "from-blue-500 to-indigo-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-rose-500 to-pink-500",
    "from-violet-500 to-purple-500",
    "from-sky-500 to-cyan-500",
  ];
  const idx = tone ?? [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length;
  const text = /[\u4e00-\u9fa5]/.test(name) ? name.slice(-2) : name.slice(0, 2).toUpperCase();
  return (
    <span
      style={{ width: size, height: size, fontSize: Math.round(size * 0.4) }}
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-medium text-white",
        palette[idx],
        className,
      )}
    >
      {text}
    </span>
  );
}

export function Progress({ value, tone = "blue", className }: { value: number; tone?: Tone; className?: string }) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-slate-100", className)}>
      <div className={cn("h-full rounded-full", TONE_DOT[tone])} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

export function Divider({ className, vertical }: { className?: string; vertical?: boolean }) {
  return vertical ? (
    <span className={cn("mx-1 h-5 w-px shrink-0 bg-line", className)} />
  ) : (
    <div className={cn("h-px w-full bg-line", className)} />
  );
}

/* ───────────────────────── Form-like ───────────────────────── */

export function Field({
  label,
  hint,
  children,
  className,
  required,
  aside,
}: {
  label: React.ReactNode;
  hint?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  aside?: React.ReactNode;
}) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-slate-600">
          {label}
          {required && <span className="ml-0.5 text-rose-500">*</span>}
        </span>
        {aside}
      </span>
      {children}
      {hint && <span className="block text-[11px] leading-4 text-slate-400">{hint}</span>}
    </label>
  );
}

export function TextInput({
  value,
  placeholder,
  icon: Icon,
  className,
  suffix,
  mono,
}: {
  value?: string;
  placeholder?: string;
  icon?: LucideIcon;
  className?: string;
  suffix?: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-8 min-w-0 items-center gap-2 rounded-lg border border-line-strong bg-white px-2.5 text-[13px] shadow-[inset_0_1px_1px_rgb(15_23_42/0.03)] transition-colors focus-within:border-blue-400 focus-within:ring-3 focus-within:ring-blue-100",
        className,
      )}
    >
      {Icon && <Icon className="size-4 shrink-0 text-slate-400" />}
      <input
        readOnly
        defaultValue={value}
        placeholder={placeholder}
        className={cn("min-w-0 flex-1 bg-transparent text-slate-800 outline-none placeholder:text-slate-400", mono && "font-mono")}
      />
      {suffix}
    </div>
  );
}

export function SearchBox({ placeholder = "搜索", className, kbd }: { placeholder?: string; className?: string; kbd?: string }) {
  return <TextInput icon={Search} placeholder={placeholder} className={className} suffix={kbd ? <Kbd>{kbd}</Kbd> : undefined} />;
}

export function Select({ value, className, icon: Icon, label }: { value: string; className?: string; icon?: LucideIcon; label?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-8 items-center gap-2 rounded-lg border border-line-strong bg-white px-2.5 text-left text-[13px] text-slate-800 shadow-card hover:bg-slate-50",
        className,
      )}
    >
      {Icon && <Icon className="size-4 shrink-0 text-slate-400" />}
      {label && <span className="shrink-0 text-slate-400">{label}</span>}
      <span className="min-w-0 flex-1 truncate">{value}</span>
      <ChevronDown className="size-3.5 shrink-0 text-slate-400" />
    </button>
  );
}

export function TextArea({
  lines,
  className,
  rows = 6,
  numbered = true,
}: {
  lines: string[];
  className?: string;
  rows?: number;
  numbered?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-line-strong bg-white font-mono text-[12.5px] leading-6 shadow-[inset_0_1px_1px_rgb(15_23_42/0.03)]",
        className,
      )}
    >
      <div className="flex" style={{ minHeight: rows * 24 + 12 }}>
        {numbered && (
          <div className="select-none border-r border-line bg-slate-50/80 px-2 py-1.5 text-right text-[11px] leading-6 text-slate-400">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        )}
        <div className="flex-1 px-2.5 py-1.5 text-slate-800">
          {lines.map((l, i) => (
            <div key={i} className="truncate">
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Toggle({ on, className }: { on?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-[18px] w-8 shrink-0 items-center rounded-full transition-colors",
        on ? "bg-blue-600" : "bg-slate-300",
        className,
      )}
    >
      <span className={cn("size-3.5 rounded-full bg-white shadow transition-transform", on ? "translate-x-4" : "translate-x-0.5")} />
    </span>
  );
}

export function Check({ on, indeterminate, className }: { on?: boolean; indeterminate?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-grid size-4 shrink-0 place-items-center rounded-[4px] border transition-colors",
        on || indeterminate ? "border-blue-600 bg-blue-600 text-white" : "border-line-strong bg-white",
        className,
      )}
    >
      {on && (
        <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2.5 6.2 5 8.5l4.5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {indeterminate && !on && <span className="h-0.5 w-2 rounded bg-white" />}
    </span>
  );
}

export function Radio({ on }: { on?: boolean }) {
  return (
    <span className={cn("inline-grid size-4 shrink-0 place-items-center rounded-full border", on ? "border-blue-600" : "border-line-strong bg-white")}>
      {on && <span className="size-2 rounded-full bg-blue-600" />}
    </span>
  );
}

/* ───────────────────────── Navigation-like ───────────────────────── */

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  size = "md",
  className,
  full,
}: {
  options: { value: T; label: React.ReactNode; icon?: LucideIcon; count?: number }[];
  value: T;
  onChange?: (v: T) => void;
  size?: "sm" | "md";
  className?: string;
  full?: boolean;
}) {
  return (
    <div className={cn("inline-flex rounded-lg bg-slate-100 p-0.5 ring-1 ring-inset ring-slate-200/60", full && "flex w-full", className)}>
      {options.map((o) => {
        const active = o.value === value;
        const Icon = o.icon;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange?.(o.value)}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap transition-all",
              size === "sm" ? "h-6 px-2 text-xs" : "h-7 px-3 text-[13px]",
              full && "flex-1",
              active ? "bg-white text-slate-900 shadow-[0_1px_2px_rgb(15_23_42/0.08),0_0_0_1px_rgb(15_23_42/0.04)]" : "text-slate-500 hover:text-slate-800",
            )}
          >
            {Icon && <Icon className="size-3.5" />}
            {o.label}
            {o.count !== undefined && (
              <span className={cn("tnum rounded px-1 text-[10px]", active ? "bg-blue-50 text-blue-700" : "bg-slate-200/70 text-slate-500")}>
                {o.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function UnderlineTabs<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: { value: T; label: React.ReactNode; count?: number; icon?: LucideIcon; locked?: boolean }[];
  value: T;
  onChange?: (v: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-5 border-b border-line", className)}>
      {options.map((o) => {
        const active = o.value === value;
        const Icon = o.icon;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange?.(o.value)}
            className={cn(
              "relative -mb-px flex h-10 items-center gap-1.5 border-b-2 text-[13px] font-medium whitespace-nowrap transition-colors",
              active ? "border-blue-600 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-800",
              o.locked && "text-slate-400",
            )}
          >
            {Icon && <Icon className={cn("size-4", active ? "text-blue-600" : "text-slate-400")} />}
            {o.label}
            {o.count !== undefined && (
              <span className={cn("tnum rounded-full px-1.5 text-[10px] leading-4", active ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-500")}>
                {o.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function Chip({
  children,
  active,
  onRemove,
  icon: Icon,
  className,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onRemove?: boolean;
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium whitespace-nowrap transition-colors",
        active ? "border-blue-200 bg-blue-50 text-blue-700" : "border-line-strong bg-white text-slate-600 hover:bg-slate-50",
        className,
      )}
    >
      {Icon && <Icon className="size-3.5" />}
      {children}
      {onRemove && <X className="size-3 opacity-60" />}
    </button>
  );
}

export function Stepper({
  steps,
  current,
  className,
}: {
  steps: { title: string; desc?: string }[];
  current: number;
  className?: string;
}) {
  return (
    <ol className={cn("flex items-start", className)}>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.title} className="flex min-w-0 flex-1 items-start gap-3">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold ring-4 transition-colors",
                  done && "bg-blue-600 text-white ring-blue-50",
                  active && "bg-white text-blue-700 ring-blue-100 outline-2 outline-blue-600",
                  !done && !active && "bg-slate-100 text-slate-400 ring-white",
                )}
              >
                {done ? (
                  <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M2.5 6.2 5 8.5l4.5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <div className="min-w-0 pt-0.5">
                <div className={cn("truncate text-[13px] font-semibold", active ? "text-slate-900" : done ? "text-slate-700" : "text-slate-400")}>
                  {s.title}
                </div>
                {s.desc && <div className="mt-0.5 hidden truncate text-xs text-slate-400 sm:block">{s.desc}</div>}
              </div>
            </div>
            {i < steps.length - 1 && <div className={cn("mx-2 mt-3.5 hidden h-0.5 min-w-6 flex-1 rounded sm:block", done ? "bg-blue-600" : "bg-slate-200")} />}
          </li>
        );
      })}
    </ol>
  );
}

export function Pagination({ total, page = 1, pages = 12, className }: { total: number | string; page?: number; pages?: number; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500", className)}>
      <span className="tnum">共 {total} 条</span>
      <div className="flex items-center gap-1">
        <IconBtn icon={ChevronLeft} className="size-7" />
        {[1, 2, 3].map((p) => (
          <button
            key={p}
            type="button"
            className={cn(
              "tnum grid size-7 place-items-center rounded-md text-xs font-medium",
              p === page ? "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200" : "text-slate-600 hover:bg-slate-100",
            )}
          >
            {p}
          </button>
        ))}
        <span className="px-1">…</span>
        <button type="button" className="tnum grid size-7 place-items-center rounded-md text-xs text-slate-600 hover:bg-slate-100">
          {pages}
        </button>
        <IconBtn icon={ChevronRight} className="size-7" />
      </div>
    </div>
  );
}

/* ───────────────────────── Data display ───────────────────────── */

export type Column<R> = {
  key: string;
  title: React.ReactNode;
  render: (row: R, i: number) => React.ReactNode;
  className?: string;
  headClassName?: string;
  align?: "left" | "right" | "center";
  sticky?: boolean;
  width?: number | string;
};

export function DataTable<R>({
  columns,
  rows,
  selectable,
  selected,
  onRowClick,
  activeIndex,
  className,
  dense,
  zebra = true,
  stickyHeader = true,
  rowClassName,
}: {
  columns: Column<R>[];
  rows: R[];
  selectable?: boolean;
  selected?: number[];
  onRowClick?: (i: number) => void;
  activeIndex?: number;
  className?: string;
  dense?: boolean;
  zebra?: boolean;
  stickyHeader?: boolean;
  rowClassName?: (row: R, i: number) => string | undefined;
}) {
  const allOn = selected && selected.length === rows.length;
  const some = selected && selected.length > 0 && !allOn;
  return (
    <div className={cn("scrollbar-thin overflow-auto", className)}>
      <table className="w-full border-separate border-spacing-0 text-[13px]">
        <thead className={cn(stickyHeader && "sticky top-0 z-10")}>
          <tr>
            {selectable && (
              <th className="w-10 border-b border-line bg-slate-50/95 px-3 text-left backdrop-blur">
                <Check on={allOn} indeterminate={some} />
              </th>
            )}
            {columns.map((c) => (
              <th
                key={c.key}
                style={{ width: c.width }}
                className={cn(
                  "h-9 border-b border-line bg-slate-50/95 px-3 text-left text-xs font-medium whitespace-nowrap text-slate-500 backdrop-blur",
                  c.align === "right" && "text-right",
                  c.align === "center" && "text-center",
                  c.sticky && "sticky left-0 z-10 shadow-[1px_0_0_#e6eaf1]",
                  c.headClassName,
                )}
              >
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const isSel = selected?.includes(i);
            const isActive = activeIndex === i;
            return (
              <tr
                key={i}
                onClick={() => onRowClick?.(i)}
                className={cn(
                  "group transition-colors",
                  onRowClick && "cursor-pointer",
                  zebra && i % 2 === 1 && "bg-slate-50/40",
                  "hover:bg-blue-50/40",
                  (isSel || isActive) && "bg-indigo-50/60 hover:bg-indigo-50/80",
                  rowClassName?.(r, i),
                )}
              >
                {selectable && (
                  <td className={cn("border-b border-line/70 px-3", dense ? "h-9" : "h-11")}>
                    <Check on={isSel} />
                  </td>
                )}
                {columns.map((c, ci) => (
                  <td
                    key={c.key}
                    className={cn(
                      "border-b border-line/70 px-3 whitespace-nowrap text-slate-700",
                      dense ? "h-9" : "h-11",
                      c.align === "right" && "text-right",
                      c.align === "center" && "text-center",
                      c.sticky && "sticky left-0 z-[1] bg-white shadow-[1px_0_0_#e6eaf1] group-hover:bg-[#f5f8ff]",
                      c.sticky && (isSel || isActive) && "bg-[#f1f2fe]",
                      ci === 0 && isActive && !selectable && "shadow-[inset_2px_0_0_#4f46e5]",
                      c.className,
                    )}
                  >
                    {c.render(r, i)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function Stat({
  label,
  value,
  unit,
  delta,
  deltaTone = "green",
  icon: Icon,
  tone = "blue",
  spark,
  className,
  foot,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: string;
  delta?: string;
  deltaTone?: Tone;
  icon?: LucideIcon;
  tone?: Tone;
  spark?: number[];
  className?: string;
  foot?: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-xl border border-line bg-white p-4 shadow-card", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        {Icon && (
          <span className={cn("grid size-7 place-items-center rounded-lg", TONE_ICON_BG[tone])}>
            <Icon className="size-3.5" />
          </span>
        )}
      </div>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div className="flex items-baseline gap-1">
          <span className="tnum text-[22px] leading-none font-semibold tracking-tight text-slate-900">{value}</span>
          {unit && <span className="text-xs text-slate-400">{unit}</span>}
        </div>
        {spark && <Sparkline data={spark} tone={tone} />}
      </div>
      {(delta || foot) && (
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          {delta && <span className={cn("tnum font-medium", deltaTone === "red" ? "text-rose-600" : deltaTone === "neutral" ? "text-slate-500" : "text-emerald-600")}>{delta}</span>}
          {foot && <span className="text-slate-400">{foot}</span>}
        </div>
      )}
    </div>
  );
}

const SPARK_COLOR: Record<Tone, string> = {
  neutral: "#94a3b8",
  blue: "#2563eb",
  indigo: "#4f46e5",
  green: "#10b981",
  amber: "#f59e0b",
  red: "#e11d48",
  sky: "#0ea5e9",
  violet: "#8b5cf6",
};

export function Sparkline({ data, tone = "blue", width = 72, height = 26, className }: { data: number[]; tone?: Tone; width?: number; height?: number; className?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((d, i) => [(i / (data.length - 1)) * width, height - 2 - ((d - min) / (max - min || 1)) * (height - 4)]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  const id = React.useId();
  const c = SPARK_COLOR[tone];
  return (
    <svg width={width} height={height} className={cn("shrink-0 overflow-visible", className)}>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={c} stopOpacity="0.18" />
          <stop offset="1" stopColor={c} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AreaChart({
  series,
  labels,
  height = 200,
  className,
}: {
  series: { name: string; data: number[]; tone: Tone; dashed?: boolean }[];
  labels: string[];
  height?: number;
  className?: string;
}) {
  const w = 640;
  const h = height;
  const pad = { l: 34, r: 8, t: 10, b: 22 };
  const all = series.flatMap((s) => s.data);
  const max = Math.ceil(Math.max(...all) / 10) * 10;
  const x = (i: number) => pad.l + (i / (labels.length - 1)) * (w - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b);
  const id = React.useId();
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("w-full", className)} preserveAspectRatio="none" style={{ height }}>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={w - pad.r} y1={y(max * t)} y2={y(max * t)} stroke="#eef1f6" />
          <text x={pad.l - 8} y={y(max * t) + 3} textAnchor="end" fontSize="10" fill="#94a3b8">
            {Math.round(max * t)}
          </text>
        </g>
      ))}
      {labels.map((l, i) =>
        i % Math.ceil(labels.length / 8) === 0 || i === labels.length - 1 ? (
          <text key={l + i} x={x(i)} y={h - 6} textAnchor="middle" fontSize="10" fill="#94a3b8">
            {l}
          </text>
        ) : null,
      )}
      {series.map((s, si) => {
        const c = SPARK_COLOR[s.tone];
        const line = s.data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
        return (
          <g key={s.name}>
            {!s.dashed && (
              <>
                <defs>
                  <linearGradient id={`${id}-${si}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor={c} stopOpacity="0.16" />
                    <stop offset="1" stopColor={c} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={`${line} L${x(s.data.length - 1)},${y(0)} L${x(0)},${y(0)} Z`} fill={`url(#${id}-${si})`} />
              </>
            )}
            <path d={line} fill="none" stroke={c} strokeWidth="2" strokeDasharray={s.dashed ? "4 4" : undefined} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </g>
        );
      })}
    </svg>
  );
}

export function BarList({ items, tone = "blue", className, unit }: { items: { label: string; value: number; hint?: string }[]; tone?: Tone; className?: string; unit?: string }) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <div className={cn("space-y-2.5", className)}>
      {items.map((it) => (
        <div key={it.label} className="space-y-1">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="truncate text-slate-700">{it.label}</span>
            <span className="tnum shrink-0 font-medium text-slate-900">
              {it.value.toLocaleString("zh-CN")}
              {unit && <span className="ml-0.5 font-normal text-slate-400">{unit}</span>}
              {it.hint && <span className="ml-1.5 font-normal text-slate-400">{it.hint}</span>}
            </span>
          </div>
          <Progress value={(it.value / max) * 100} tone={tone} />
        </div>
      ))}
    </div>
  );
}

export function KeyValue({ items, className, cols = 1 }: { items: { k: React.ReactNode; v: React.ReactNode }[]; className?: string; cols?: 1 | 2 }) {
  return (
    <dl className={cn("grid gap-x-6 gap-y-2.5 text-[13px]", cols === 2 && "sm:grid-cols-2", className)}>
      {items.map((it, i) => (
        <div key={i} className="flex items-baseline justify-between gap-3">
          <dt className="shrink-0 text-slate-500">{it.k}</dt>
          <dd className="min-w-0 truncate text-right font-medium text-slate-800">{it.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Empty({
  icon: Icon = Inbox,
  title,
  desc,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  desc?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center px-6 py-10 text-center", className)}>
      <span className="grid size-11 place-items-center rounded-xl bg-slate-50 text-slate-400 ring-1 ring-line">
        <Icon className="size-5" />
      </span>
      <div className="mt-3 text-[13px] font-semibold text-slate-800">{title}</div>
      {desc && <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">{desc}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Callout({
  tone = "blue",
  icon: Icon,
  title,
  children,
  className,
  action,
}: {
  tone?: Tone;
  icon?: LucideIcon;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-start gap-2.5 rounded-lg border px-3 py-2.5 text-xs leading-5", TONE_SOFT[tone], className)}>
      {Icon && <Icon className="mt-0.5 size-4 shrink-0 opacity-80" />}
      <div className="min-w-0 flex-1">
        {title && <div className="text-[13px] font-semibold">{title}</div>}
        {children && <div className={cn(title && "mt-0.5", "opacity-90")}>{children}</div>}
      </div>
      {action}
    </div>
  );
}

/* ───────────────────────── Overlays (static, inside relative container) ───────────────────────── */

export function Drawer({
  title,
  desc,
  children,
  footer,
  width = 420,
  className,
  scrim = true,
  onClose,
}: {
  title: React.ReactNode;
  desc?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
  className?: string;
  scrim?: boolean;
  onClose?: () => void;
}) {
  return (
    <>
      {scrim && <div className="absolute inset-0 z-30 bg-slate-900/15" onClick={onClose} />}
      <aside
        style={{ width }}
        className={cn(
          "absolute inset-y-0 right-0 z-40 flex max-w-full flex-col border-l border-line bg-white shadow-drawer animate-in slide-in-from-right-8 fade-in duration-300",
          className,
        )}
      >
        <header className="flex items-start gap-3 border-b border-line px-5 py-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
            {desc && <p className="mt-0.5 text-xs text-slate-500">{desc}</p>}
          </div>
          <IconBtn icon={X} className="-mt-1 -mr-2" onClick={onClose} />
        </header>
        <div className="scrollbar-thin min-h-0 flex-1 overflow-auto px-5 py-4">{children}</div>
        {footer && <footer className="flex items-center justify-end gap-2 border-t border-line bg-slate-50/60 px-5 py-3">{footer}</footer>}
      </aside>
    </>
  );
}

export function FloatingBar({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-2 py-1.5 text-[13px] text-white shadow-float",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StickyBar({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 border-t border-line bg-white/95 px-4 py-3 backdrop-blur shadow-[0_-8px_24px_-12px_rgb(15_23_42/0.12)]", className)}>
      {children}
    </div>
  );
}

/* ───────────────────────── Part thumbnail ───────────────────────── */

const THUMB_BG = [
  "from-slate-100 to-slate-200",
  "from-blue-50 to-indigo-100",
  "from-emerald-50 to-teal-100",
  "from-amber-50 to-orange-100",
  "from-sky-50 to-cyan-100",
  "from-violet-50 to-fuchsia-100",
];

export function PartThumb({ i = 0, icon: Icon, className, label }: { i?: number; icon: LucideIcon; className?: string; label?: string }) {
  return (
    <div className={cn("relative grid place-items-center overflow-hidden rounded-lg bg-gradient-to-br", THUMB_BG[i % THUMB_BG.length], className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.9),transparent_55%)]" />
      <Icon className="relative size-[38%] text-slate-500/80" strokeWidth={1.25} />
      {label && <span className="absolute bottom-1.5 left-1.5 rounded bg-white/85 px-1 font-mono text-[10px] text-slate-600 backdrop-blur">{label}</span>}
    </div>
  );
}

/* ───────────────────────── Helpers ───────────────────────── */

export function StockCell({ n, status }: { n: number; status?: string }) {
  if (status === "missing") return <span className="text-slate-300">—</span>;
  return (
    <span className={cn("tnum font-medium", n === 0 ? "text-rose-600" : n < 10 ? "text-amber-600" : "text-slate-900")}>{n}</span>
  );
}

export function PartStatus({ status }: { status: "ok" | "low" | "out" | "missing" }) {
  const map = {
    ok: <Tag tone="green" dot>有货</Tag>,
    low: <Tag tone="amber" dot>低库存</Tag>,
    out: <Tag tone="red" dot>缺货</Tag>,
    missing: <Tag tone="neutral">缺码</Tag>,
  } as const;
  return map[status];
}

export function Code({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("font-mono text-[12.5px] text-slate-900", className)}>{children}</span>;
}
