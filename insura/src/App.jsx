import { useState } from "react";
import LoginPage    from "./pages/LoginPage";
import SignupPage   from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import OverviewPage from "./pages/OverviewPage";
import PlansPage    from "./pages/PlansPage";
import RiskPage     from "./pages/RiskPage";
import ClaimsPage   from "./pages/ClaimsPage";
import WorkflowPage from "./pages/WorkflowPage";
import PricingPage  from "./pages/PricingPage";
import PolicyManagementPage from "./pages/PolicyManagementPage";
import { Sidebar, Topbar } from "./components/SharedComponents";

// ============================================================
//  App.jsx — Root component
//  Routes: login / signup / app (dashboard + inner pages)
// ============================================================

const WORKER_NAV = [
  { id: "overview", icon: "📘", label: "Overview" },
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { id: "plans", icon: "🛡", label: "Insurance Plans" },
  { id: "risk", icon: "🧠", label: "AI Risk" },
  { id: "claims", icon: "📋", label: "Claims" },
  { id: "workflow", icon: "🔄", label: "Workflow" },
  { id: "pricing", icon: "💰", label: "Pricing" },
  { id: "policy", icon: "📜", label: "Policy Management" },
];

const ADMIN_NAV = [
  { id: "overview", icon: "📘", label: "Overview" },
  { id: "dashboard", icon: "🧑‍💼", label: "Admin Dashboard" },
  { id: "claims", icon: "📋", label: "Claims" },
  { id: "policy", icon: "📜", label: "Policies" },
  { id: "workflow", icon: "🔎", label: "Monitoring" },
  { id: "pricing", icon: "💰", label: "Pricing" },
  { id: "plans", icon: "🛡", label: "Plans" },
];

const PAGE_COMPONENTS = {
  overview: ({ user, onNav }) => <OverviewPage user={user} onNav={onNav} />,
  dashboard: ({ user, onNav }) => user?.role === "admin"
    ? <AdminDashboardPage user={user} onNav={onNav} />
    : <DashboardPage user={user} onNav={onNav} />,
  plans: ({ user }) => <PlansPage user={user} />,
  risk: ({ user }) => <RiskPage user={user} />,
  claims: ({ user }) => <ClaimsPage user={user} />,
  workflow: ({ user }) => <WorkflowPage user={user} />,
  pricing: ({ user }) => <PricingPage user={user} />,
  policy: ({ user }) => <PolicyManagementPage user={user} />,
};

export default function App() {
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogin = (userData) => {
    setUser(userData);
    setActiveTab("dashboard");
    setAuthMode("login");
  };

  const handleLogout = () => {
    setUser(null);
    setAuthMode("login");
    setActiveTab("overview");
  };

  const navItems = user?.role === "admin" ? ADMIN_NAV : WORKER_NAV;
  const currentPage = PAGE_COMPONENTS[activeTab] || (() => (
    <div style={{ color: "#E8EEFF", padding: 24, borderRadius: 18, background: "rgba(255,255,255,0.04)" }}>
      <h2 style={{ marginBottom: 14 }}>Page not available</h2>
      <p>Please select a valid page from the sidebar.</p>
    </div>
  ));

  if (!user) {
    return authMode === "signup"
      ? <SignupPage onSignup={handleLogin} onGoLogin={() => setAuthMode("login")} />
      : <LoginPage onLogin={handleLogin} onGoSignup={() => setAuthMode("signup")} />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#060E28" }}>
      <Sidebar
        activeTab={activeTab}
        onNav={setActiveTab}
        user={user}
        onLogout={handleLogout}
        open={sidebarOpen}
        onToggle={setSidebarOpen}
        navItems={navItems}
      />

      <div style={{
        flex: 1,
        marginLeft: sidebarOpen ? 220 : 72,
        padding: "24px 28px",
        transition: "margin-left 0.28s ease",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}>
        <Topbar title={navItems.find(item => item.id === activeTab)?.label || "Insura"} user={user} />

        <div style={{ paddingTop: 18, maxWidth: 1440, margin: "0 auto" }}>
          {currentPage({ user, onNav: setActiveTab })}
        </div>
      </div>
    </div>
  );
}
