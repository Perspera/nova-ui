"use client";

import * as React from "react";
import {
  ArrowRightLeft,
  Barcode,
  Clock,
  Columns3,
  Copy,
  Cpu,
  Download,
  Fan,
  Filter,
  Gauge,
  History,
  ImageIcon,
  ListPlus,
  PackageSearch,
  Plug,
  Printer,
  RotateCcw,
  ScanLine,
  Search,
  SlidersHorizontal,
  Sparkles,
  Thermometer,
  Truck,
  Warehouse,
  Wind,
  Zap,
  Droplets,
  CircuitBoard,
  Cog,
  RadioReceiver,
  ClipboardPaste,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell, Body } from "@/components/mock/shell";
import {
  Btn,
  Callout,
  Check,
  Chip,
  Code,
  DataTable,
  Drawer,
  Field,
  IconBtn,
  Kbd,
  KeyValue,
  Pagination,
  Panel,
  PartStatus,
  PartThumb,
  SectionTitle,
  Segmented,
  Select,
  StockCell,
  Tag,
  TextArea,
  TextInput,
  Toggle,
  type Column,
} from "@/components/mock/kit";
import { PARTS, STOCK_BY_WH, type Part } from "@/components/mock/data";

const PART_ICONS = [Cog, Cpu, Fan, ArrowRightLeft, Zap, Thermometer, CircuitBoard, Wind, Droplets, RadioReceiver, Cpu, Plug, PackageSearch, Gauge];

const CODES = ["8-0213-4471", "8-0213-4472", "6-1107-0035", "6-1107-0042", "5-3301-1180", "5-3301-1192", "8-0213-4519", "X-9999-0001"];

function codeCol(sticky = true): Column<Part> {
  return {
    key: "code",
    title: "备件编码",
    sticky,
    render: (r) => (
      <span className="flex items-center gap-1.5">
        <Code className={r.status === "missing" ? "text-slate-400 line-through decoration-slate-300" : "font-medium"}>{r.code}</Code>
        <Copy className="size-3 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
    ),
  };
}

const COLS_FIELD: Column<Part>[] = [
  codeCol(),
  {
    key: "name",
    title: "名称 / 规格",
    render: (r) =>
      r.status === "missing" ? (
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <AlertCircle className="size-3.5 text-slate-400" />
          编码未收录，可提交缺码
        </span>
      ) : (
        <span className="block leading-tight">
          <span className="block text-[13px] font-medium text-slate-800">{r.name}</span>
          <span className="block text-[11px] text-slate-400">{r.spec}</span>
        </span>
      ),
  },
  { key: "bin", title: "库位", render: (r) => <span className="font-mono text-xs text-slate-600">{r.bin}</span> },
  { key: "stock", title: "可用", align: "right", render: (r) => <StockCell n={r.stock} status={r.status} /> },
  { key: "transit", title: "在途", align: "right", render: (r) => <span className="tnum text-slate-500">{r.status === "missing" ? "—" : r.transit || "—"}</span> },
  {
    key: "bo",
    title: "BO 欠货",
    align: "right",
    render: (r) => (r.bo ? <span className="tnum rounded bg-rose-50 px-1.5 py-0.5 text-xs font-semibold text-rose-600">{r.bo}</span> : <span className="text-slate-300">—</span>),
  },
  { key: "status", title: "状态", render: (r) => <PartStatus status={r.status} /> },
  {
    key: "sub",
    title: "替代件",
    render: (r) => (r.sub ? <span className="font-mono text-xs text-blue-600 underline decoration-blue-200 underline-offset-2">{r.sub}</span> : <span className="text-slate-300">—</span>),
  },
  { key: "price", title: "单价", align: "right", render: (r) => (r.price ? <span className="tnum text-slate-600">¥{r.price.toFixed(r.price < 10 ? 1 : 0)}</span> : <span className="text-slate-300">—</span>) },
  { key: "updated", title: "更新", render: (r) => <span className="tnum text-xs text-slate-400">{r.updated}</span> },
];

function SummaryChips() {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Chip active>全部 14</Chip>
      <Chip>
        <span className="size-1.5 rounded-full bg-emerald-500" />
        有货 8
      </Chip>
      <Chip>
        <span className="size-1.5 rounded-full bg-amber-500" />
        低库存 3
      </Chip>
      <Chip>
        <span className="size-1.5 rounded-full bg-rose-500" />
        缺货 2
      </Chip>
      <Chip>
        <span className="size-1.5 rounded-full bg-slate-400" />
        缺码 1
      </Chip>
      <Chip>BO 11 件</Chip>
    </div>
  );
}

/* ═════════════════════════ A · 侧栏输入 + 结果表 ═════════════════════════ */

export function A() {
  const [mode, setMode] = React.useState("batch");
  const [cols, setCols] = React.useState("field");
  return (
    <AppShell nav="query" notice fill>
      <div className="flex h-full flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
        <aside className="flex shrink-0 flex-col border-line bg-white max-lg:border-b lg:w-[360px] lg:border-r">
          <div className="space-y-4 p-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-slate-900">备件查询</h2>
              <button type="button" className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600">
                <History className="size-3.5" />
                历史
              </button>
            </div>
            <Segmented
              full
              value={mode}
              onChange={setMode}
              options={[
                { value: "batch", label: "批量编码", icon: ClipboardPaste },
                { value: "single", label: "单码", icon: Barcode },
                { value: "model", label: "型号/名称", icon: Search },
              ]}
            />
            <Field
              label="编码清单"
              aside={<span className="tnum text-[11px] text-slate-400">8 行 · 已去重 1</span>}
              hint="每行一个编码，支持从 Excel 直接粘贴；扫码枪输入自动换行。"
            >
              <TextArea lines={CODES} rows={8} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Btn size="sm" icon={ScanLine}>扫码录入</Btn>
              <Btn size="sm" variant="ghost" icon={RotateCcw}>清空</Btn>
            </div>
            <div className="space-y-3 rounded-xl bg-slate-50/80 p-3 ring-1 ring-inset ring-line">
              <Field label="查询范围">
                <Select value="广州中心仓（首选仓）" icon={Warehouse} className="w-full" />
              </Field>
              {[
                ["显示替代件", true],
                ["合并在途库存", true],
                ["只看缺货 / BO", false],
              ].map(([l, on]) => (
                <div key={l as string} className="flex items-center justify-between text-[13px] text-slate-700">
                  {l as string}
                  <Toggle on={on as boolean} />
                </div>
              ))}
            </div>
            <div>
              <SectionTitle hint="最近 3 次">最近查询</SectionTitle>
              <div className="mt-2 space-y-1">
                {[
                  ["09:02", "压缩机/主控板 等 8 个", "命中 7"],
                  ["昨天 17:40", "佛山仓补货清单 32 个", "命中 30"],
                  ["昨天 10:15", "6-1107-0035", "缺货"],
                ].map(([t, d, r]) => (
                  <button key={t} type="button" className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left hover:bg-slate-50">
                    <Clock className="size-3.5 shrink-0 text-slate-300" />
                    <span className="min-w-0 flex-1 truncate text-xs text-slate-600">{d}</span>
                    <span className="shrink-0 text-[11px] text-slate-400">{r}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-line bg-white p-3">
            <Btn variant="primary" size="lg" icon={Search} className="w-full">
              查询 8 个编码
              <Kbd className="ml-1 border-white/20 bg-white/15 text-white shadow-none">Ctrl ↵</Kbd>
            </Btn>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col gap-3 p-4 lg:min-h-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-[15px] font-semibold text-slate-900">查询结果</h3>
              <span className="text-xs text-slate-400">广州中心仓 · 数据版本 v2026.10.27-01 · 09:12</span>
            </div>
            <div className="flex items-center gap-2">
              <Segmented
                size="sm"
                value={cols}
                onChange={setCols}
                options={[
                  { value: "field", label: "现场常用" },
                  { value: "all", label: "全部列" },
                  { value: "min", label: "极简" },
                ]}
              />
              <IconBtn icon={Columns3} />
              <Btn size="sm" icon={Download}>导出</Btn>
              <Btn size="sm" variant="primary" icon={Printer}>打印所选 (2)</Btn>
            </div>
          </div>
          <SummaryChips />
          <div className="flex min-h-[420px] flex-1 flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card lg:min-h-0">
            <DataTable columns={COLS_FIELD} rows={PARTS} selectable selected={[1, 2]} className="min-h-0 flex-1" />
            <div className="border-t border-line px-4 py-2.5">
              <Pagination total="14" pages={1} />
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

/* ═════════════════════════ B · 顶部查询条 + 筛选抽屉 ═════════════════════════ */

export function B() {
  const [open, setOpen] = React.useState(true);
  const cols: Column<Part>[] = [
    ...COLS_FIELD.slice(0, 7),
    { key: "cat", title: "类目", render: (_, i) => <span className="text-xs text-slate-500">{["压缩机", "电控", "电机", "阀件", "阀件", "传感器", "电控"][i % 7]}</span> },
    ...COLS_FIELD.slice(7),
  ];
  return (
    <AppShell
      nav="query"
      notice
      overlay={
        open && (
          <Drawer
            title="筛选条件"
            desc="已应用 3 项 · 结果实时更新"
            width={380}
            onClose={() => setOpen(false)}
            footer={
              <>
                <Btn variant="ghost" icon={RotateCcw}>重置</Btn>
                <Btn variant="primary" onClick={() => setOpen(false)}>查看 14 条结果</Btn>
              </>
            }
          >
            <div className="space-y-6">
              <div>
                <SectionTitle hint="可多选">仓库</SectionTitle>
                <div className="mt-2.5 space-y-1">
                  {[
                    ["广州中心仓", "首选", true],
                    ["深圳仓", "", false],
                    ["佛山仓", "", false],
                    ["东莞仓", "", false],
                  ].map(([n, t, on]) => (
                    <label key={n as string} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] text-slate-700 hover:bg-slate-50">
                      <Check on={on as boolean} />
                      {n as string}
                      {t && <Tag tone="indigo">{t as string}</Tag>}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <SectionTitle>库存状态</SectionTitle>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <Chip active>有货</Chip>
                  <Chip active>低库存</Chip>
                  <Chip>缺货</Chip>
                  <Chip>有 BO</Chip>
                  <Chip>缺码</Chip>
                </div>
              </div>
              <div>
                <SectionTitle>类目</SectionTitle>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {["压缩机", "电控", "电机", "阀件", "传感器", "钣金", "配件"].map((c, i) => (
                    <Chip key={c} active={i === 1}>
                      {c}
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <SectionTitle>单价区间</SectionTitle>
                <div className="mt-2.5 flex items-center gap-2">
                  <TextInput value="0" className="flex-1" suffix={<span className="text-xs text-slate-400">¥</span>} />
                  <span className="text-slate-300">—</span>
                  <TextInput placeholder="不限" className="flex-1" suffix={<span className="text-xs text-slate-400">¥</span>} />
                </div>
              </div>
              <div>
                <SectionTitle>数据更新时间</SectionTitle>
                <Segmented
                  full
                  className="mt-2.5"
                  value="7d"
                  options={[
                    { value: "1d", label: "今天" },
                    { value: "7d", label: "7 天内" },
                    { value: "30d", label: "30 天" },
                    { value: "all", label: "不限" },
                  ]}
                />
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-[13px] text-slate-700 ring-1 ring-inset ring-line">
                显示替代件
                <Toggle on />
              </div>
            </div>
          </Drawer>
        )
      }
    >
      <Body wide className="space-y-4">
        <div className="rounded-2xl border border-line bg-white p-3 shadow-card">
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <div className="flex min-h-11 flex-1 flex-wrap items-center gap-1.5 rounded-xl border-2 border-blue-500 bg-white px-3 py-1.5 ring-4 ring-blue-100">
              <Search className="size-[18px] text-blue-600" />
              {CODES.slice(0, 4).map((c) => (
                <span key={c} className="inline-flex h-6 items-center gap-1 rounded-md bg-slate-100 px-1.5 font-mono text-xs text-slate-700">
                  {c}
                  <span className="text-slate-400">×</span>
                </span>
              ))}
              <span className="inline-flex h-6 items-center rounded-md bg-blue-50 px-1.5 text-xs font-medium text-blue-700">+4 个</span>
              <span className="ml-1 text-[13px] text-slate-400">继续输入或粘贴多行…</span>
            </div>
            <div className="flex items-center gap-2">
              <Select value="广州中心仓" icon={Warehouse} className="h-11 w-40 rounded-xl" />
              <Btn size="lg" icon={SlidersHorizontal} className="h-11 rounded-xl" onClick={() => setOpen(true)}>
                筛选
                <span className="tnum rounded bg-blue-600 px-1 text-[10px] text-white">3</span>
              </Btn>
              <Btn size="lg" variant="primary" icon={Search} className="h-11 rounded-xl px-5">
                查询
              </Btn>
            </div>
          </div>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 px-1">
            <span className="text-xs text-slate-400">已应用：</span>
            <Chip active onRemove>仓库：广州中心仓</Chip>
            <Chip active onRemove>库存：有货、低库存</Chip>
            <Chip active onRemove>类目：电控</Chip>
            <button type="button" className="ml-1 text-xs text-slate-400 hover:text-slate-600">
              全部清除
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <SummaryChips />
          <div className="flex items-center gap-2">
            <Btn size="sm" icon={Columns3}>列设置</Btn>
            <Btn size="sm" icon={Download}>导出</Btn>
            <Btn size="sm" variant="primary" icon={Printer}>批量打印</Btn>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
          <DataTable columns={cols} rows={PARTS} dense />
          <div className="border-t border-line px-4 py-2.5">
            <Pagination total="14" pages={1} />
          </div>
        </div>
      </Body>
    </AppShell>
  );
}

/* ═════════════════════════ C · 三栏主从 ═════════════════════════ */

export function C() {
  const [sel, setSel] = React.useState(1);
  const p = PARTS[sel];
  const Icon = PART_ICONS[sel % PART_ICONS.length];
  return (
    <AppShell nav="query" fill>
      <div className="flex h-full flex-col overflow-y-auto xl:flex-row xl:overflow-hidden">
        {/* Input column */}
        <aside className="flex shrink-0 flex-col border-line bg-white max-xl:border-b xl:w-[280px] xl:border-r">
          <div className="space-y-3 p-4 xl:min-h-0 xl:flex-1 xl:overflow-y-auto">
            <h2 className="text-[15px] font-semibold text-slate-900">备件查询</h2>
            <Segmented
              full
              size="sm"
              value="batch"
              options={[
                { value: "batch", label: "批量" },
                { value: "single", label: "单码" },
                { value: "model", label: "型号" },
              ]}
            />
            <TextArea lines={CODES} rows={8} />
            <Select value="广州中心仓（首选）" icon={Warehouse} className="w-full" />
            <div className="flex items-center justify-between text-[13px] text-slate-700">
              显示替代件
              <Toggle on />
            </div>
          </div>
          <div className="border-t border-line p-3">
            <Btn variant="primary" icon={Search} className="w-full">
              查询 8 个编码
            </Btn>
          </div>
        </aside>

        {/* Result list */}
        <section className="flex shrink-0 flex-col border-line bg-white max-xl:border-b xl:w-[400px] xl:border-r">
          <div className="space-y-2.5 border-b border-line px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-semibold text-slate-900">
                结果 <span className="tnum text-slate-400">14</span>
              </div>
              <div className="flex items-center gap-1">
                <IconBtn icon={Filter} />
                <IconBtn icon={Download} />
              </div>
            </div>
            <div className="scrollbar-thin -mx-1 flex gap-1.5 overflow-x-auto px-1">
              <Chip active>全部</Chip>
              <Chip>低库存 3</Chip>
              <Chip>缺货 2</Chip>
              <Chip>缺码 1</Chip>
            </div>
          </div>
          <ul className="scrollbar-thin divide-y divide-line/70 max-xl:max-h-[420px] max-xl:overflow-y-auto xl:min-h-0 xl:flex-1 xl:overflow-y-auto">
            {PARTS.map((r, i) => {
              const on = i === sel;
              const I = PART_ICONS[i % PART_ICONS.length];
              return (
                <li key={r.code}>
                  <button
                    type="button"
                    onClick={() => setSel(i)}
                    className={cn("relative flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors", on ? "bg-indigo-50/70" : "hover:bg-slate-50")}
                  >
                    {on && <span className="absolute inset-y-0 left-0 w-[3px] bg-indigo-600" />}
                    <PartThumb i={i} icon={I} className="size-9 shrink-0 rounded-lg" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <Code className={cn("text-[12px]", on && "text-indigo-700")}>{r.code}</Code>
                        {r.sub && <Tag tone="blue">有替代</Tag>}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-slate-500">
                        {r.status === "missing" ? "编码未收录" : `${r.name} · ${r.spec}`}
                      </span>
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-1">
                      <StockCell n={r.stock} status={r.status} />
                      <span className="text-[10px] text-slate-400">{r.status === "missing" ? "缺码" : `在途 ${r.transit}`}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Detail */}
        <section className="scrollbar-thin min-w-0 flex-1 xl:overflow-y-auto">
          <div className="space-y-4 p-5">
            <div className="flex flex-wrap items-start gap-4">
              <PartThumb i={sel} icon={Icon} className="size-20 shrink-0 rounded-xl ring-1 ring-line" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Code className="text-[15px] font-semibold">{p.code}</Code>
                  <PartStatus status={p.status} />
                  {p.bo > 0 && <Tag tone="red">BO {p.bo}</Tag>}
                </div>
                <h2 className="mt-1 text-[18px] font-semibold text-slate-900">{p.name}</h2>
                <p className="mt-0.5 text-[13px] text-slate-500">
                  {p.spec} · 库位 <span className="font-mono">{p.bin}</span> · 更新 {p.updated}
                </p>
              </div>
              <div className="flex gap-2">
                <Btn icon={ListPlus}>加入清单</Btn>
                <Btn variant="primary" icon={Printer}>打印标签</Btn>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { l: "本仓可用", v: p.stock, tone: p.stock < 10 ? "text-amber-600" : "text-slate-900", icon: Warehouse },
                { l: "在途", v: p.transit, tone: "text-slate-900", icon: Truck },
                { l: "BO 欠货", v: p.bo, tone: p.bo ? "text-rose-600" : "text-slate-900", icon: AlertCircle },
              ].map((k) => (
                <div key={k.l} className="rounded-xl border border-line bg-white p-3 shadow-card">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <k.icon className="size-3.5 text-slate-400" />
                    {k.l}
                  </div>
                  <div className={cn("tnum mt-1.5 text-[22px] leading-none font-semibold", k.tone)}>{k.v}</div>
                </div>
              ))}
            </div>

            {p.sub && (
              <Callout
                tone="blue"
                icon={Sparkles}
                title="推荐替代件 8-0213-4480 · 主控板组件 V5.0"
                action={
                  <Btn size="sm" variant="soft" iconRight={ChevronRight}>
                    查看
                  </Btn>
                }
              >
                本仓可用 9 件，可直接替换；V4.1 已停产，库存消化完后统一切换。
              </Callout>
            )}

            <div className="grid gap-4 2xl:grid-cols-[1.4fr_1fr]">
              <Panel title="各仓库存" desc="同区域可调拨" flush icon={Warehouse}>
                <DataTable
                  dense
                  zebra={false}
                  stickyHeader={false}
                  columns={[
                    { key: "wh", title: "仓库", render: (r: (typeof STOCK_BY_WH)[number]) => <span className="font-medium text-slate-800">{r.wh}</span> },
                    { key: "bin", title: "库位", render: (r) => <span className="font-mono text-xs text-slate-500">{r.bin}</span> },
                    { key: "stock", title: "可用", align: "right", render: (r) => <StockCell n={r.stock} /> },
                    { key: "transit", title: "在途", align: "right", render: (r) => <span className="tnum text-slate-500">{r.transit || "—"}</span> },
                  ]}
                  rows={STOCK_BY_WH}
                />
              </Panel>
              <Panel title="基础信息" icon={ImageIcon}>
                <KeyValue
                  items={[
                    { k: "类目", v: "电控 / 主控板" },
                    { k: "适用机型", v: "KFR-35GW / 50LW" },
                    { k: "单价", v: `¥${p.price}` },
                    { k: "最小包装", v: "1 件" },
                    { k: "供应商", v: "华南电控" },
                    { k: "图片", v: <span className="text-blue-600">3 张</span> },
                  ]}
                />
              </Panel>
            </div>

            <Panel title="近期动态" icon={History}>
              <ol className="relative space-y-3 border-l border-line pl-4">
                {[
                  ["10-27 09:12", "数据发布：可用 3 → 3，在途 +10", "blue"],
                  ["10-26 15:40", "黄思敏 打印库位标签 ×2", "neutral"],
                  ["10-25 11:02", "BO 新增 2 件（工单 WO-88120）", "red"],
                ].map(([t, d, tone]) => (
                  <li key={t} className="relative text-[13px]">
                    <span
                      className={cn(
                        "absolute top-1.5 -left-[21px] size-2.5 rounded-full ring-4 ring-white",
                        tone === "blue" ? "bg-blue-500" : tone === "red" ? "bg-rose-500" : "bg-slate-300",
                      )}
                    />
                    <span className="tnum mr-2 text-xs text-slate-400">{t}</span>
                    <span className="text-slate-700">{d}</span>
                  </li>
                ))}
              </ol>
            </Panel>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
