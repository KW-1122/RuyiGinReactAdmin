import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Bot,
  BrainCircuit,
  ChevronDown,
  Cpu,
  Gauge,
  Home,
  LayoutDashboard,
  Menu,
  Orbit,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap
} from "lucide-react";
import { fetchDashboard } from "./mock/dashboard";

const navItems = [
  { label: "管理首页", icon: LayoutDashboard, active: true },
  { label: "AI 中枢", icon: BrainCircuit },
  { label: "智能工单", icon: Workflow },
  { label: "风险巡检", icon: ShieldCheck },
  { label: "系统设置", icon: Settings }
];

const iconMap = {
  blue: Bot,
  jade: Workflow,
  gold: Bell,
  ink: Gauge
};

function App() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    let alive = true;
    fetchDashboard().then((data) => {
      if (alive) setDashboard(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  const welcome = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "早安";
    if (hour < 18) return "午安";
    return "晚安";
  }, []);

  return (
    <div className="app-shell">
      <div className="scene-layer" aria-hidden="true">
        <span className="aurora aurora-one" />
        <span className="aurora aurora-two" />
        <span className="ruyi-curve curve-one" />
        <span className="ruyi-curve curve-two" />
      </div>

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Sparkles size={23} />
          </div>
          <div>
            <strong>如意 Admin</strong>
            <span>AI Native Console</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="主导航">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button className={item.active ? "nav-item active" : "nav-item"} key={item.label}>
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-panel">
          <div className="panel-kicker">AI 状态</div>
          <div className="ai-orbit">
            <span />
            <Bot size={25} />
          </div>
          <strong>智能体集群在线</strong>
          <span>模型调度、规则推理与任务编排保持稳定。</span>
        </div>
      </aside>

      <section className="main-shell">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button" title="菜单">
              <Menu size={21} />
            </button>
            <div className="crumb">
              <Home size={17} />
              <span>工作台</span>
            </div>
          </div>

          <div className="search-box">
            <Search size={18} />
            <input aria-label="搜索" placeholder="搜索智能体、流程、告警" />
          </div>

          <div className="topbar-actions">
            <button className="icon-button" title="通知">
              <Bell size={20} />
            </button>
            <button className="profile-button">
              <span>{dashboard?.user.name ?? "如意"}</span>
              <ChevronDown size={17} />
            </button>
          </div>
        </header>

        <main className="content">
          <section className="hero-band">
            <div className="hero-copy">
              <p>{welcome}，欢迎回到 AI 管理中枢</p>
              <h1>以如意智枢统筹业务、流程与风险</h1>
              <span>智能体调度、流程编排、风险巡检实时协同</span>
            </div>

            <div className="hero-orb" aria-hidden="true">
              <div className="orb-core">
                <Cpu size={38} />
              </div>
              <span className="ring ring-a" />
              <span className="ring ring-b" />
              <span className="ring ring-c" />
            </div>

            <div className="hero-metrics">
              <span>实时推理</span>
              <strong>24.6k</strong>
              <small>tokens/min</small>
            </div>
          </section>

          {!dashboard ? (
            <div className="loading-card">正在连接 mock 数据...</div>
          ) : (
            <>
              <section className="stat-grid">
                {dashboard.stats.map((stat) => {
                  const Icon = iconMap[stat.tone] ?? Activity;
                  return (
                    <article className={`stat-card tone-${stat.tone}`} key={stat.label}>
                      <div className="stat-head">
                        <div className="stat-icon">
                          <Icon size={22} />
                        </div>
                        <span>{stat.delta}</span>
                      </div>
                      <p>{stat.label}</p>
                      <strong>{stat.value}</strong>
                      <small>{stat.caption}</small>
                    </article>
                  );
                })}
              </section>

              <section className="dashboard-grid">
                <article className="workspace-card module-card">
                  <div className="section-title">
                    <div>
                      <span>AI 模块</span>
                      <h2>核心能力运行概览</h2>
                    </div>
                    <Activity size={21} />
                  </div>
                  <div className="module-list">
                    {dashboard.modules.map((module) => (
                      <div className="module-row" key={module.name}>
                        <div>
                          <strong>{module.name}</strong>
                          <span>{module.status}</span>
                        </div>
                        <div className="progress-track" aria-label={`${module.name} ${module.percent}%`}>
                          <i style={{ width: `${module.percent}%` }} />
                        </div>
                        <em>{module.percent}%</em>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="workspace-card agent-card">
                  <div className="section-title">
                    <div>
                      <span>智能体</span>
                      <h2>在线协作队列</h2>
                    </div>
                    <Bot size={21} />
                  </div>
                  <div className="agent-list">
                    {dashboard.agents.map((agent) => (
                      <div className="agent-row" key={agent.name}>
                        <div className="agent-avatar">
                          <BrainCircuit size={20} />
                        </div>
                        <div>
                          <strong>{agent.name}</strong>
                          <span>{agent.intent}</span>
                        </div>
                        <small>{agent.load}</small>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="workspace-card insight-card">
                  <div className="section-title">
                    <div>
                      <span>智能洞察</span>
                      <h2>今日策略脉冲</h2>
                    </div>
                    <Zap size={21} />
                  </div>
                  <div className="pulse-board">
                    <div>
                      <Orbit size={26} />
                      <strong>87%</strong>
                      <span>流程自治率</span>
                    </div>
                    <div>
                      <ShieldCheck size={26} />
                      <strong>12ms</strong>
                      <span>风控响应</span>
                    </div>
                    <div>
                      <Activity size={26} />
                      <strong>4.8k</strong>
                      <span>知识召回</span>
                    </div>
                  </div>
                </article>

                <article className="workspace-card timeline-card">
                  <div className="section-title">
                    <div>
                      <span>动态</span>
                      <h2>今日关键事件</h2>
                    </div>
                    <ShieldCheck size={21} />
                  </div>
                  <div className="timeline">
                    {dashboard.activities.map((activity) => (
                      <div className="timeline-row" key={`${activity.time}-${activity.title}`}>
                        <time>{activity.time}</time>
                        <div>
                          <strong>{activity.title}</strong>
                          <span>{activity.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </section>
            </>
          )}
        </main>
      </section>
    </div>
  );
}

export default App;
