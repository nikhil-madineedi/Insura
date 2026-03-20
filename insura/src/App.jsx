import { useState, useEffect } from "react";
import LoginPage    from "./pages/LoginPage";
import SignupPage   from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import PlansPage    from "./pages/PlansPage";
import RiskPage     from "./pages/RiskPage";
import ClaimsPage   from "./pages/ClaimsPage";
import WorkflowPage from "./pages/WorkflowPage";
import PricingPage  from "./pages/PricingPage";
import { Sidebar, Topbar } from "./components/SharedComponents";

// ============================================================
//  App.jsx — Root component
//  Routes: login / signup / app (dashboard + inner pages)
// ============================================================

// Inject global CSS once
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #060E28; --deep: #0B1437; --mid: #1A2E6E;
    --accent: #3B82F6; --accent2: #6366F1; --gold: #F59E0B;
    --green: #10B981; --coral: #F43F5E; --purple: #8B5CF6;
    --orange: #F97316; --text: #E8EEFF; --muted: #8896C8;
    --border: rgba(255,255,255,0.08); --glass: rgba(255,255,255,0.05);
    --font-display: 'Syne', sans-serif; --font-body: 'DM Sans', sans-serif;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: #060E28; color: #E8EEFF;
    overflow-x: hidden; -webkit-font-smoothing: antialiased; }
  h1,h2,h3,h4,h5,h6 { font-family: 'Syne', sans-serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #060E28; }
  ::-webkit-scrollbar-thumb { background: #1A2E6E; border-radius: 4px; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes slideInRight { from{opacity:0;transform:translateX(36px)} to{opacity:1;transform:translateX(0)} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.6);opacity:0} }
  @keyframes rain { 0%{transform:translateY(-10px);opacity:0} 10%{opacity:.6} 90%{opacity:.35} 100%{transform:translateY(70px) translateX(-8px);opacity:0} }
  @keyframes countUp { from{opacity:0;transform:scale(.82)} to{opacity:1;transform:scale(1)} }
`;

function injectStyles() {
  if (document.getElementById("insura-global")) return;
  const el = document.createElement("style");
  el.id = "insura-global";
  el.textContent = GLOBAL_STYLES;
  document.head.appendChild(el);
}

const NAV_LABELS = {
  dashboard: "Dashboard",
  plans:     "Insurance Plans",
  risk:      "AI Risk Assessment",
  claims:    "Claims Center",
  workflow:  "Application Workflow",
  pricing:   "Pricing Model",
};

export default function App() {
  const [screen, setScreen] = useState("login"); // "login" | "signup" | "app"
  const [tab,    setTab]    = useState("dashboard");
  const [user,   setUser]   = useState(null);

  // Inject global styles on mount
  useEffect(() => { injectStyles(); }, []);

  const handleLogin  = (u) => { setUser(u);  setTab("dashboard"); setScreen("app"); };
  const handleSignup = (u) => { setUser(u);  setTab("dashboard"); setScreen("app"); };
  const handleLogout = ()  => { setUser(null); setScreen("login"); setTab("dashboard"); };

  // ── Auth screens ─────────────────────────────────────────
  if (screen === "login") {
    return <LoginPage onLogin={handleLogin} onGoSignup={() => setScreen("signup")} />;
  }
  if (screen === "signup") {
    return <SignupPage onSignup={handleSignup} onGoLogin={() => setScreen("login")} />;
  }

  // ── App shell ────────────────────────────────────────────
  const screenMap = {
    dashboard: <DashboardPage user={user} onNav={setTab} />,
    plans:     <PlansPage user={user} />,
    risk:      <RiskPage onNav={setTab} />,
    claims:    <ClaimsPage />,
    workflow:  <WorkflowPage />,
    pricing:   <PricingPage />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#060E28" }}>
      <Sidebar activeTab={tab} onNav={setTab} user={user} onLogout={handleLogout} />

      {/* Dynamic margin matches sidebar width via CSS transition */}
      <div style={{
        flex: 1,
        marginLeft: 72, // sidebar collapsed fallback; sidebar manages its own width
        minHeight: "100vh",
        background: "linear-gradient(155deg, #030A1E 0%, #060E28 50%, #0B1437 100%)",
        transition: "margin-left 0.28s cubic-bezier(.4,0,.2,1)",
      }}>
        <Topbar title={NAV_LABELS[tab] || "Insura"} user={user} />
        <div key={tab} style={{ animation: "fadeUp 0.38s ease" }}>
          {screenMap[tab]}
        </div>
      </div>
    </div>
  );
}
