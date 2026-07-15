const dashboardSnapshot = {
  user: {
    name: "如意智控中心",
    role: "AI Operations"
  },
  stats: [
    { label: "今日 AI 调度", value: "18,426", delta: "+12.8%", caption: "较昨日提升", tone: "blue" },
    { label: "自动化任务", value: "326", delta: "+24", caption: "待办压降中", tone: "jade" },
    { label: "异常预警", value: "7", delta: "-36%", caption: "风险收敛", tone: "gold" },
    { label: "模型可用率", value: "99.96%", delta: "+0.04%", caption: "高可用在线", tone: "ink" }
  ],
  modules: [
    { name: "智能工单", status: "运行中", percent: 86 },
    { name: "知识检索", status: "同步中", percent: 68 },
    { name: "风险巡检", status: "稳定", percent: 92 },
    { name: "流程编排", status: "待优化", percent: 54 }
  ],
  activities: [
    { time: "09:42", title: "AI 巡检完成", desc: "完成 32 个业务节点健康扫描" },
    { time: "10:18", title: "知识库增量更新", desc: "新增 1,208 条结构化知识片段" },
    { time: "11:06", title: "自动化流程触发", desc: "审批流由智能规则引擎接管" },
    { time: "13:24", title: "异常根因定位", desc: "识别接口超时与队列积压相关" }
  ],
  agents: [
    { name: "如意客服官", load: "42%", intent: "客户问答" },
    { name: "青霄数据官", load: "71%", intent: "经营分析" },
    { name: "玄策风控官", load: "33%", intent: "风险预警" }
  ]
};

export function fetchDashboard() {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(dashboardSnapshot), 260);
  });
}
