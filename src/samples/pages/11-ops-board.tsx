"use client";

import { ChevronDown } from "lucide-react";
import { AppShell, Body } from "@/components/mock/shell";
import { AreaChart, BarList, PageHeader, Panel, Segmented, Stat, Tag } from "@/components/mock/kit";

const LABELS = ["10-21", "10-22", "10-23", "10-24", "10-25", "10-26", "10-27"];
const QUERY = [980, 1102, 1044, 860, 1210, 1188, 1284];
const PRINTS = [240, 280, 260, 190, 310, 300, 326];

function Metrics() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Stat label="查询次数" value="7,668" delta="+8.4%" foot="较上期" spark={QUERY} />
      <Stat label="打印张数" value="1,906" delta="+3.1%" foot="较上期" spark={PRINTS} tone="indigo" />
      <Stat label="活跃账号" value="214" delta="-2" deltaTone="red" foot="较上期" spark={[180, 190, 188, 150, 200, 210, 214]} tone="green" />
      <Stat label="缺码提交" value="17" delta="+5" deltaTone="neutral" foot="待收录" spark={[2, 1, 3, 2, 4, 2, 3]} tone="amber" />
    </div>
  );
}

export function A() {
  return (
    <AppShell admin="ops">
      <Body wide>
        <PageHeader
          crumbs={["管理后台", "数据与看板"]}
          title="运营看板"
          desc="只读。口径见右上角，数字来自查询与打印日志。"
          actions={
            <Segmented
              value="7"
              options={[
                { value: "7", label: "7 天" },
                { value: "30", label: "30 天" },
                { value: "90", label: "本季" },
              ]}
            />
          }
        />
        <Metrics />
        <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
          <Panel title="查询与打印" desc="实线为查询，虚线为打印">
            <AreaChart
              labels={LABELS}
              series={[
                { name: "查询", data: QUERY, tone: "blue" },
                { name: "打印", data: PRINTS, tone: "indigo", dashed: true },
              ]}
            />
            <div className="mt-2 flex gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-blue-600" />查询</span>
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 border-t border-dashed border-indigo-500" />打印</span>
            </div>
          </Panel>
          <Panel title="仓库查询量">
            <BarList
              items={[
                { label: "广州中心仓", value: 2480 },
                { label: "深圳仓", value: 1510 },
                { label: "上海仓", value: 1320 },
                { label: "佛山仓", value: 860 },
                { label: "东莞仓", value: 640 },
                { label: "杭州仓", value: 420 },
              ]}
            />
          </Panel>
        </div>
        <details className="rounded-xl border border-line bg-slate-50/70 px-4 py-3 text-[13px] text-slate-500">
          <summary className="flex cursor-pointer list-none items-center gap-2 font-medium text-slate-500">
            <ChevronDown className="size-4" />
            本期不做
            <Tag>参考，不是待办</Tag>
          </summary>
          <ul className="mt-2 space-y-1 pl-6 text-slate-400">
            <li>不按供应商拆查询量</li>
            <li>不做跨仓调拨建议</li>
            <li>不接外部 BI</li>
          </ul>
        </details>
      </Body>
    </AppShell>
  );
}

export function B() {
  return (
    <AppShell admin="ops" fill>
      <div className="flex h-full flex-col lg:flex-row">
        <aside className="w-full shrink-0 space-y-4 border-line bg-white p-4 lg:w-[260px] lg:border-r">
          <div className="text-[13px] font-semibold text-slate-900">时间与口径</div>
          <Segmented full value="7" options={[{ value: "7", label: "7 天" }, { value: "30", label: "30 天" }]} />
          <div className="rounded-xl bg-slate-50 p-3 text-[12.5px] leading-5 text-slate-600 ring-1 ring-inset ring-line">
            <div className="font-medium text-slate-800">口径</div>
            查询按一次提交计，不管命中几行。打印按实际出纸张数。活跃账号为周期内至少登录一次。
          </div>
          <div className="text-xs text-slate-400">对比周期：上一个 7 天</div>
        </aside>
        <div className="scrollbar-thin min-w-0 flex-1 overflow-y-auto">
          <Body>
            <PageHeader title="运营看板" desc="口径放在左侧，避免把只读页做成筛选工作台。" />
            <Metrics />
            <Panel title="趋势">
              <AreaChart labels={LABELS} height={180} series={[{ name: "查询", data: QUERY, tone: "blue" }]} />
            </Panel>
          </Body>
        </div>
      </div>
    </AppShell>
  );
}

export function C() {
  return (
    <AppShell admin="ops">
      <Body wide>
        <PageHeader title="运营看板" desc="适合投屏。卡片大小代表权重。" actions={<Tag tone="indigo">近 7 天</Tag>} />
        <div className="grid gap-3 lg:grid-cols-4">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card lg:col-span-2 lg:row-span-2">
            <div className="text-xs font-medium text-slate-500">查询次数</div>
            <div className="tnum mt-2 text-[40px] leading-none font-semibold tracking-tight text-slate-900">7,668</div>
            <div className="mt-1 text-[13px] text-emerald-600">+8.4% 较上期</div>
            <AreaChart className="mt-4" height={180} labels={LABELS} series={[{ name: "查询", data: QUERY, tone: "blue" }]} />
          </div>
          <Stat label="打印张数" value="1,906" delta="+3.1%" spark={PRINTS} tone="indigo" />
          <Stat label="活跃账号" value="214" delta="-2" deltaTone="red" tone="green" />
          <div className="rounded-2xl border border-line bg-white p-4 shadow-card lg:col-span-2">
            <div className="mb-3 text-[13px] font-semibold text-slate-900">仓库热度</div>
            <BarList
              items={[
                { label: "广州中心仓", value: 2480 },
                { label: "深圳仓", value: 1510 },
                { label: "上海仓", value: 1320 },
                { label: "佛山仓", value: 860 },
              ]}
            />
          </div>
        </div>
      </Body>
    </AppShell>
  );
}
