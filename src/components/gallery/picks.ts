"use client";

import { useSyncExternalStore } from "react";
import { PAGES, type VariantKey } from "@/samples/registry";

const KEY = "layout-samples.picks.v2";
type Picks = Record<string, VariantKey>;

const listeners = new Set<() => void>();
let cache: Picks | null = null;
const EMPTY: Picks = {};

function read(): Picks {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) || "{}") as Picks;
  } catch {
    cache = {};
  }
  return cache;
}

function write(next: Picks) {
  cache = next;
  localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function usePicks() {
  const picks = useSyncExternalStore(subscribe, read, () => EMPTY);
  const pickOf = (slug: string): VariantKey => picks[slug] ?? PAGES.find((p) => p.slug === slug)!.recommended;
  const isExplicit = (slug: string) => slug in picks;
  const setPick = (slug: string, v: VariantKey) => write({ ...read(), [slug]: v });
  const reset = () => write({});
  return { picks, pickOf, isExplicit, setPick, reset };
}

export function buildPickList(pickOf: (slug: string) => VariantKey) {
  return PAGES.map((p) => {
    const v = pickOf(p.slug);
    const meta = p.variants[v];
    const tag = v === p.recommended ? "推荐" : `改选，推荐 ${p.recommended}`;
    return `${p.no} ${p.title}（${p.route}）：${v} · ${meta.name}【${tag}】`;
  }).join("\n");
}
