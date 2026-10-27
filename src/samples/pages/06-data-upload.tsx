"use client";

import { AlertTriangle, ChevronLeft, ChevronRight, FileSpreadsheet, Upload } from "lucide-react";
import { AppShell } from "@/components/mock/shell";
import {
  Btn,
  Callout,
  Chip,
  DataTable,
  Dot,
  Drawer,
  Field,
  PageHeader,
  Panel,
  Progress,
  Select,
  Stepper,
  StickyBar,
  Tag,
  UnderlineTabs,
} from "@/components/mock/kit";

const ROWS = [
  ["深圳仓_1027.xlsx", "深圳仓", "12,036", "警告 3", "今天 07:58", "梁佩仪"],
  ["佛山仓_1026.xlsx", "佛山仓", "9,804", "通过", "昨天 16:20", "林晓婷"],
  ["东莞仓_1026.xlsx", "东莞仓", "8,712", "通过", "昨天 11:02", "罗文斌"],
  ["全量_1025.xlsx", "全部仓", "128,169", "通过", "10-25 09:03", "陈立航"],
];

function RecordTable() {
  return (
    <DataTable
      dense
      columns={[
        { key: "f", title: "文件", render: (r: string[]) => <span className="font-medium text-slate-800">{r[0]}</span> },
        { key: "w", title: "目标仓", render: (r) => r[1] },
        { key: "n", title: "行数", align: "right", render: (r) => <span className="tnum">{r[2]}</span> },
        {
          key: "s",
          title: "体检",
          render: (r) => <Tag tone={r[3].startsWith("警告") ? "amber" : "green"} dot>{r[3]}</Tag>,
        },
        { key: "t", title: "时间", render: (r) => <span className="tnum text-xs text-slate-500">{r[4]}</span> },
        { key: "u", title: "上传人", render: (r) => r[5] },
      ]}
      rows={ROWS}
    />
  );
}

export function A() {
  return (
    <AppShell nav="data" fill>
      <div className="flex h-full flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
        <aside className="flex shrink-0 flex-col border-line bg-white max-lg:border-b lg:w-[400px] lg:border-r">
          <div className="space-y-4 p-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
            <h2 className="text-[15px] font-semibold text-slate-900">上传数据</h2>
            <div className="flex flex-wrap gap-1.5">
              <Chip active>目标仓 · 深圳仓</Chip>
              <Chip>版本 · 增量</Chip>
              <Chip>上次 · 今天 07:58</Chip>
            </div>
            <Field label="目标仓">
              <Select value="深圳仓 · SZ02" className="w-full" />
            </Field>
            <div className="rounded-xl border border-dashed border-blue-300 bg-blue-50/40 px-4 py-6 text-center">
              <span className="mx-auto grid size-10 place-items-center rounded-xl bg-white text-blue-600 shadow-card">
                <Upload className="size-5" />
              </span>
              <div className="mt-2 text-[13px] font-medium text-slate-800">拖入表格，或点击选择</div>
              <div className="mt-0.5 text-xs text-slate-400">xlsx / csv · 单文件 ≤ 50MB</div>
              <div className="mx-auto mt-3 flex max-w-xs items-center gap-2 rounded-lg bg-white px-2.5 py-2 text-left ring-1 ring-line">
                <FileSpreadsheet className="size-4 text-emerald-600" />
                <span className="min-w-0 flex-1 truncate text-xs text-slate-700">深圳仓_1027.xlsx</span>
                <span className="text-[11px] text-slate-400">2.4MB</span>
              </div>
            </div>
            <Panel title="体检结果" className="shadow-none">
              <div className="space-y-2 text-[13px]">
                <div className="flex items-center justify-between"><span className="text-slate-500">行数</span><b className="tnum">12,036</b></div>
                <div className="flex items-center justify-between"><span className="text-slate-500">新增 / 删除</span><b className="tnum text-emerald-600">+41 / −6</b></div>
                <div className="flex items-center justify-between"><span className="text-slate-500">警告</span><Tag tone="amber">3 行缺规格</Tag></div>
              </div>
              <Progress value={92} tone="amber" className="mt-3" />
              <div className="mt-1 text-[11px] text-slate-400">质量预估 96 分，警告不阻断发布</div>
            </Panel>
          </div>
          <div className="border-t border-line p-3">
            <Btn variant="primary" size="lg" className="w-full">发布到深圳仓</Btn>
          </div>
        </aside>
        <section className="flex min-w-0 flex-1 flex-col p-4">
          <UnderlineTabs
            value="records"
            options={[
              { value: "tasks", label: "进行中", count: 0 },
              { value: "records", label: "上传记录", count: 4 },
            ]}
          />
          <div className="mt-3 min-h-0 flex-1 overflow-hidden rounded-xl border border-line bg-white shadow-card">
            <RecordTable />
          </div>
        </section>
      </div>
    </AppShell>
  );
}

export function B() {
  return (
    <AppShell nav="data" fill>
      <div className="flex h-full flex-col">
        <div className="border-b border-line bg-white px-6 py-4">
          <Stepper
            current={2}
            steps={[
              { title: "选择目标", desc: "仓库与方式" },
              { title: "上传文件", desc: "表格校验" },
              { title: "体检", desc: "警告与差异" },
              { title: "确认发布", desc: "写入版本" },
            ]}
          />
        </div>
        <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl space-y-4 p-6">
            <div>
              <h2 className="text-[18px] font-semibold text-slate-900">体检 · 深圳仓_1027.xlsx</h2>
              <p className="mt-1 text-[13px] text-slate-500">增量上传 · 12,036 行 · 相对当前版本 +41 / −6</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["通过", "12,033", "green"],
                ["警告", "3", "amber"],
                ["错误", "0", "slate"],
              ].map(([l, v]) => (
                <div key={l} className="rounded-xl border border-line bg-white p-3 shadow-card">
                  <div className="text-xs text-slate-500">{l}</div>
                  <div className="tnum mt-1 text-[22px] font-semibold text-slate-900">{v}</div>
                </div>
              ))}
            </div>
            <Panel title="需要看一眼的 3 行" flush>
              <DataTable
                dense
                zebra={false}
                stickyHeader={false}
                columns={[
                  { key: "r", title: "行", render: (r: string[]) => <span className="tnum text-slate-500">{r[0]}</span> },
                  { key: "c", title: "编码", render: (r) => <span className="font-mono text-xs">{r[1]}</span> },
                  { key: "i", title: "问题", render: (r) => <span className="text-amber-700">{r[2]}</span> },
                ]}
                rows={[
                  ["128", "6-1107-0099", "规格为空，将沿用上一版"],
                  ["640", "8-0213-4601", "单价为 0"],
                  ["1022", "5-3301-1300", "库位格式不是 A-00-00"],
                ]}
              />
            </Panel>
            <Callout tone="amber" icon={AlertTriangle}>
              警告不阻止发布。若要修正，回到上一步更换文件；确认后才会生成新版本。
            </Callout>
          </div>
        </div>
        <StickyBar>
          <Btn icon={ChevronLeft}>上一步</Btn>
          <span className="ml-auto text-xs text-slate-400">尚未写入，可随时退出</span>
          <Btn variant="primary" iconRight={ChevronRight}>确认发布</Btn>
        </StickyBar>
      </div>
    </AppShell>
  );
}

export function C() {
  return (
    <AppShell
      nav="data"
      overlay={
        <Drawer title="问题清单 · 深圳仓_1027.xlsx" desc="3 条警告 · 不阻断发布" width={400} footer={<Btn variant="primary">知道了，继续发布</Btn>}>
          <div className="space-y-3">
            {[
              ["第 128 行", "6-1107-0099", "规格为空，将沿用上一版规格 YDK-30"],
              ["第 640 行", "8-0213-4601", "单价为 0，请确认是否赠品"],
              ["第 1022 行", "5-3301-1300", "库位「C2-1」不符合 A-00-00"],
            ].map(([row, code, issue]) => (
              <div key={row} className="rounded-xl border border-amber-200 bg-amber-50/50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-amber-800">{row}</span>
                  <span className="font-mono text-xs text-slate-700">{code}</span>
                </div>
                <p className="mt-1 text-[13px] text-slate-700">{issue}</p>
              </div>
            ))}
          </div>
        </Drawer>
      }
    >
      <div className="mx-auto w-full max-w-[1200px] space-y-4 p-4 sm:p-6">
        <PageHeader title="上传数据" desc="文件先放到这里，记录在下方，问题从右侧展开。" actions={<Select value="深圳仓 · SZ02" className="w-44" />} />
        <div className="rounded-2xl border border-dashed border-blue-300 bg-white px-6 py-8 text-center shadow-card">
          <div className="mx-auto flex max-w-md items-center gap-3 text-left">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <FileSpreadsheet className="size-6" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[14px] font-medium text-slate-900">深圳仓_1027.xlsx</div>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                <Dot tone="amber" />
                体检完成 · 12,036 行 · 3 条警告
              </div>
            </div>
            <Btn variant="primary">发布</Btn>
          </div>
        </div>
        <Panel title="上传记录" flush actions={<Tag tone="amber">1 个文件有警告</Tag>}>
          <RecordTable />
        </Panel>
      </div>
    </AppShell>
  );
}
