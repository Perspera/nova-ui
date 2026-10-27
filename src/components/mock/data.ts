export type Part = {
  code: string;
  name: string;
  spec: string;
  bin: string;
  stock: number;
  transit: number;
  bo: number;
  price: number;
  sub?: string;
  updated: string;
  status: "ok" | "low" | "out" | "missing";
};

export const PARTS: Part[] = [
  { code: "8-0213-4471", name: "压缩机总成", spec: "QXA-B145F030", bin: "A-03-12", stock: 24, transit: 6, bo: 0, price: 1860, updated: "10-27 09:12", status: "ok" },
  { code: "8-0213-4472", name: "主控板组件", spec: "PCB-K32 V4.1", bin: "B-11-04", stock: 3, transit: 10, bo: 2, price: 428, sub: "8-0213-4480", updated: "10-27 09:12", status: "low" },
  { code: "6-1107-0035", name: "室外风机电机", spec: "YDK-25-6A", bin: "A-07-02", stock: 0, transit: 4, bo: 5, price: 312, updated: "10-26 17:40", status: "out" },
  { code: "6-1107-0042", name: "四通换向阀", spec: "SHF-9H-34U", bin: "C-02-09", stock: 41, transit: 0, bo: 0, price: 96, updated: "10-27 08:55", status: "ok" },
  { code: "5-3301-1180", name: "电子膨胀阀线圈", spec: "DPF-1.8C", bin: "C-05-01", stock: 7, transit: 0, bo: 1, price: 64, updated: "10-26 16:02", status: "low" },
  { code: "5-3301-1192", name: "温度传感器", spec: "NTC 15K 3950", bin: "D-01-14", stock: 156, transit: 0, bo: 0, price: 8.5, updated: "10-27 09:01", status: "ok" },
  { code: "8-0213-4519", name: "变频模块", spec: "IPM-FSBB30", bin: "B-11-08", stock: 12, transit: 2, bo: 0, price: 586, updated: "10-27 07:48", status: "ok" },
  { code: "7-2204-0911", name: "贯流风叶", spec: "Φ98×650", bin: "E-04-03", stock: 18, transit: 0, bo: 0, price: 52, updated: "10-25 14:20", status: "ok" },
  { code: "7-2204-0938", name: "接水盘组件", spec: "KFR-35G", bin: "E-06-11", stock: 0, transit: 0, bo: 3, price: 38, updated: "10-24 10:05", status: "out" },
  { code: "9-0001-7723", name: "遥控器", spec: "YAP1F7", bin: "F-01-01", stock: 230, transit: 50, bo: 0, price: 26, updated: "10-27 09:10", status: "ok" },
  { code: "8-0213-4480", name: "主控板组件（替代）", spec: "PCB-K32 V5.0", bin: "B-11-05", stock: 9, transit: 0, bo: 0, price: 446, updated: "10-27 09:12", status: "ok" },
  { code: "6-1107-0051", name: "电容 35μF", spec: "CBB65 450V", bin: "D-03-07", stock: 88, transit: 0, bo: 0, price: 14, updated: "10-26 11:32", status: "ok" },
  { code: "X-9999-0001", name: "—", spec: "编码未收录", bin: "—", stock: 0, transit: 0, bo: 0, price: 0, updated: "—", status: "missing" },
  { code: "5-3301-1205", name: "排水泵", spec: "PSB-12A", bin: "C-08-02", stock: 5, transit: 8, bo: 0, price: 118, updated: "10-26 15:18", status: "low" },
];

export const WAREHOUSES = [
  { code: "GZ01", name: "广州中心仓", region: "华南", parts: 18420, health: 98 },
  { code: "SZ02", name: "深圳仓", region: "华南", parts: 12036, health: 96 },
  { code: "FS03", name: "佛山仓", region: "华南", parts: 9804, health: 91 },
  { code: "DG04", name: "东莞仓", region: "华南", parts: 8712, health: 99 },
  { code: "SH11", name: "上海仓", region: "华东", parts: 15233, health: 94 },
  { code: "HZ12", name: "杭州仓", region: "华东", parts: 10541, health: 88 },
  { code: "CD21", name: "成都仓", region: "西南", parts: 7920, health: 97 },
  { code: "WH31", name: "武汉仓", region: "华中", parts: 8301, health: 93 },
];

export const STOCK_BY_WH = [
  { wh: "广州中心仓", stock: 24, transit: 6, bin: "A-03-12" },
  { wh: "深圳仓", stock: 11, transit: 0, bin: "A-01-07" },
  { wh: "佛山仓", stock: 0, transit: 4, bin: "B-02-03" },
  { wh: "东莞仓", stock: 6, transit: 0, bin: "A-05-10" },
  { wh: "上海仓", stock: 32, transit: 12, bin: "C-01-02" },
];

export type Role = "超级管理员" | "仓库管理员" | "仓管员" | "现场工程师" | "只读";

export const USERS: { name: string; account: string; role: Role; scope: string[]; status: "启用" | "停用" | "锁定"; last: string; phone: string }[] = [
  { name: "陈立航", account: "chenlh", role: "超级管理员", scope: ["全部仓"], status: "启用", last: "今天 09:12", phone: "138****2201" },
  { name: "林晓婷", account: "linxt", role: "仓库管理员", scope: ["广州中心仓", "佛山仓", "东莞仓"], status: "启用", last: "今天 08:47", phone: "139****8812" },
  { name: "周嘉豪", account: "zhoujh", role: "仓管员", scope: ["深圳仓"], status: "启用", last: "今天 08:30", phone: "136****0937" },
  { name: "黄思敏", account: "huangsm", role: "现场工程师", scope: ["广州中心仓"], status: "启用", last: "昨天 18:02", phone: "137****4410" },
  { name: "吴志强", account: "wuzq", role: "仓管员", scope: ["上海仓", "杭州仓"], status: "锁定", last: "10-24 11:20", phone: "135****6623" },
  { name: "郑雨桐", account: "zhengyt", role: "只读", scope: ["成都仓"], status: "启用", last: "10-25 15:44", phone: "158****3390" },
  { name: "何俊杰", account: "hejj", role: "现场工程师", scope: ["武汉仓"], status: "停用", last: "10-12 09:05", phone: "186****1127" },
  { name: "梁佩仪", account: "liangpy", role: "仓库管理员", scope: ["深圳仓", "东莞仓"], status: "启用", last: "今天 07:58", phone: "187****5506" },
  { name: "罗文斌", account: "luowb", role: "仓管员", scope: ["佛山仓"], status: "启用", last: "今天 09:03", phone: "150****7781" },
];

export const AUDIT = [
  { time: "09:12:41", user: "陈立航", action: "发布数据版本", target: "v2026.10.27-01", wh: "全部仓", ip: "10.21.4.18", result: "成功" },
  { time: "09:03:15", user: "罗文斌", action: "批量打印", target: "48 张标签", wh: "佛山仓", ip: "10.21.9.66", result: "成功" },
  { time: "08:58:02", user: "林晓婷", action: "修改账号权限", target: "zhoujh", wh: "深圳仓", ip: "10.21.4.31", result: "成功" },
  { time: "08:47:30", user: "林晓婷", action: "登录", target: "Web", wh: "广州中心仓", ip: "10.21.4.31", result: "成功" },
  { time: "08:41:09", user: "wuzq", action: "登录", target: "Web", wh: "上海仓", ip: "10.33.2.14", result: "密码错误 ×5，已锁定" },
  { time: "08:30:55", user: "周嘉豪", action: "导出查询结果", target: "312 行", wh: "深圳仓", ip: "10.21.7.12", result: "成功" },
  { time: "08:12:20", user: "陈立航", action: "修改安全策略", target: "会话超时 30→20 分钟", wh: "—", ip: "10.21.4.18", result: "成功" },
  { time: "07:58:44", user: "梁佩仪", action: "上传库存表", target: "深圳仓_1027.xlsx", wh: "深圳仓", ip: "10.21.7.40", result: "警告 3 行" },
];

export const MESSAGES = [
  { id: 1, title: "10 月 28 日 22:00–23:30 系统维护", from: "系统", time: "09:20", unread: true, confirm: true, tag: "系统", excerpt: "维护期间查询与打印不可用，请提前导出当日作业清单。" },
  { id: 2, title: "深圳仓 10-27 库存数据已发布", from: "数据中心", time: "08:02", unread: true, confirm: false, tag: "数据", excerpt: "v2026.10.27-01 共 12,036 行，较上一版新增 41 个编码。" },
  { id: 3, title: "主控板 PCB-K32 V4.1 停产，请改用 V5.0", from: "林晓婷", time: "昨天", unread: false, confirm: true, tag: "通知", excerpt: "替代件编码 8-0213-4480，现有库存消化完后统一切换。" },
  { id: 4, title: "打印网关 GW-FS03 已恢复", from: "运维", time: "昨天", unread: false, confirm: false, tag: "打印", excerpt: "佛山仓 2 号打印机网关 17:42 恢复在线，排队任务已自动重发。" },
  { id: 5, title: "Q4 盘点安排", from: "陈立航", time: "10-25", unread: false, confirm: false, tag: "通知", excerpt: "11 月 3 日起各仓分批盘点，盘点期间暂停上传。" },
  { id: 6, title: "新版标签模板「库位标签 60×40」上线", from: "系统", time: "10-24", unread: false, confirm: false, tag: "打印", excerpt: "支持二维码 + 库位号大字，旧模板保留到 11 月底。" },
];

export const VERSIONS = [
  { id: "v2026.10.27-01", time: "10-27 09:12", by: "陈立航", rows: 128_402, delta: "+41 / −6", quality: 98.6, current: true, note: "全量覆盖" },
  { id: "v2026.10.26-02", time: "10-26 17:40", by: "梁佩仪", rows: 128_367, delta: "+12 / −3", quality: 97.9, current: false, note: "深圳仓增量" },
  { id: "v2026.10.26-01", time: "10-26 08:55", by: "陈立航", rows: 128_358, delta: "+208 / −19", quality: 96.4, current: false, note: "全量覆盖" },
  { id: "v2026.10.25-01", time: "10-25 09:03", by: "林晓婷", rows: 128_169, delta: "+5 / −0", quality: 98.1, current: false, note: "佛山仓增量" },
  { id: "v2026.10.24-01", time: "10-24 10:05", by: "陈立航", rows: 128_164, delta: "+77 / −31", quality: 92.7, current: false, note: "全量覆盖（3 仓缺表）" },
  { id: "v2026.10.23-01", time: "10-23 08:40", by: "陈立航", rows: 128_118, delta: "+14 / −2", quality: 98.3, current: false, note: "全量覆盖" },
];

export const NOTICES = [
  { title: "10/28 晚间系统维护", place: ["登录页", "应用内"], range: "10-27 → 10-28", status: "生效中", level: "warning" as const },
  { title: "Q4 盘点期间暂停上传", place: ["应用内"], range: "11-03 → 11-10", status: "已排期", level: "info" as const },
  { title: "新版库位标签模板上线", place: ["应用内"], range: "10-24 → 11-30", status: "生效中", level: "info" as const },
  { title: "账号安全：请尽快修改初始密码", place: ["登录页"], range: "10-01 → 12-31", status: "生效中", level: "danger" as const },
  { title: "国庆假期发货安排", place: ["登录页", "应用内"], range: "09-25 → 10-08", status: "已结束", level: "info" as const },
];

export const PRINTERS = [
  { name: "广州中心仓-1号 Zebra ZT411", status: "在线", queue: 0 },
  { name: "广州中心仓-2号 TSC TE344", status: "在线", queue: 3 },
  { name: "佛山仓-2号 GW-FS03", status: "离线", queue: 12 },
];

export const fmt = (n: number) => n.toLocaleString("zh-CN");
