import { useState } from "react";

// ── GlowOrb background decoration ─────────────────────────────
export function GlowOrb({ color, size, x, y, blur = 120, opacity = 0.15 }) {
  return (
    <div style={{
      position: "absolute", borderRadius: "50%",
      width: size, height: size, left: x, top: y,
      background: color, filter: `blur(${blur}px)`,
      opacity, pointerEvents: "none", zIndex: 0,
    }} />
  );
}

// ── Rain particle for auth background ─────────────────────────
export function RainParticle({ delay, x }) {
  return (
    <div style={{
      position: "absolute", left: x, top: 0,
      width: 1, height: 45,
      background: "linear-gradient(to bottom, transparent, rgba(59,130,246,0.7), transparent)",
      animation: `rain ${1.2 + Math.random() * 0.8}s linear ${delay}s infinite`,
      opacity: 0.35,
    }} />
  );
}

// ── Loading Spinner ────────────────────────────────────────────
export function Spinner({ size = 20, color = "#3B82F6" }) {
  return (
    <div style={{
      width: size, height: size,
      border: `2px solid ${color}33`,
      borderTopColor: color,
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
      flexShrink: 0,
    }} />
  );
}

// ── Insura Shield Logo ─────────────────────────────────────────
export function InsuraLogo({ size = 40, fontSize = 22 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: size, height: size, borderRadius: Math.round(size * 0.28),
        background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 16px rgba(59,130,246,0.45)",
        animation: "float 3s ease-in-out infinite",
        flexShrink: 0,
      }}>
        <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 32 32" fill="none">
          <path d="M16 3L4 9v7c0 7.18 5.14 13.9 12 15.5C22.86 29.9 28 23.18 28 16V9L16 3z"
            fill="white" opacity="0.92"/>
          <path d="M12 16l3 3 5-5" stroke="#3B82F6" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        fontSize, color: "#fff", letterSpacing: -0.3,
      }}>Insura</span>
    </div>
  );
}

// ── Sidebar Navigation ─────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", icon: "⊞",  label: "Dashboard" },
  { id: "plans",     icon: "🛡",  label: "Plans" },
  { id: "risk",      icon: "🧠",  label: "Risk AI" },
  { id: "claims",    icon: "📋",  label: "Claims" },
  { id: "workflow",  icon: "🔄",  label: "Workflow" },
  { id: "pricing",   icon: "💰",  label: "Pricing" },
];

export function Sidebar({ activeTab, onNav, user, onLogout }) {
  const [open, setOpen] = useState(true);

  return (
    <div style={{
      width: open ? 220 : 72,
      flexShrink: 0,
      background: "rgba(6,14,40,0.97)",
      borderRight: "1px solid rgba(255,255,255,0.07)",
      display: "flex", flexDirection: "column",
      position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20,
      backdropFilter: "blur(24px)",
      transition: "width 0.28s cubic-bezier(.4,0,.2,1)",
    }}>
      {/* Logo row */}
      <div style={{
        padding: open ? "22px 20px" : "22px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center",
        justifyContent: open ? "space-between" : "center",
        gap: 10, overflow: "hidden",
      }}>
        {open && <InsuraLogo size={36} fontSize={20} />}
        {!open && (
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <path d="M16 3L4 9v7c0 7.18 5.14 13.9 12 15.5C22.86 29.9 28 23.18 28 16V9L16 3z" fill="white"/>
              <path d="M12 16l3 3 5-5" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        {open && (
          <button onClick={() => setOpen(false)} style={{
            background: "none", border: "none", color: "#8896C8",
            fontSize: 18, cursor: "pointer", padding: 0,
          }}>‹</button>
        )}
      </div>

      {/* Toggle when closed */}
      {!open && (
        <button onClick={() => setOpen(true)} style={{
          background: "none", border: "none", color: "#8896C8",
          fontSize: 16, cursor: "pointer", padding: "10px 0",
          textAlign: "center",
        }}>›</button>
      )}

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 3, overflowY: "auto" }}>
        {NAV_ITEMS.map(n => {
          const active = activeTab === n.id;
          return (
            <button key={n.id} onClick={() => onNav(n.id)} style={{
              display: "flex", alignItems: "center",
              gap: open ? 12 : 0, justifyContent: open ? "flex-start" : "center",
              padding: open ? "11px 14px" : "11px",
              borderRadius: 11, border: "none",
              background: active ? "rgba(59,130,246,0.14)" : "transparent",
              color: active ? "#3B82F6" : "#8896C8",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, fontWeight: active ? 600 : 400,
              borderLeft: active ? "3px solid #3B82F6" : "3px solid transparent",
              transition: "all 0.18s", cursor: "pointer",
              overflow: "hidden",
            }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#E8EEFF"; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8896C8"; } }}
            >
              <span style={{ fontSize: 17, flexShrink: 0 }}>{n.icon}</span>
              {open && <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>{n.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User footer */}
      <div style={{
        padding: open ? "14px 12px" : "14px 8px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center",
        gap: open ? 10 : 0, justifyContent: open ? "flex-start" : "center",
        overflow: "hidden",
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, textTransform: "capitalize",
          color: "#fff",
        }}>{(user?.name?.[0] || "R").toUpperCase()}</div>
        {open && (
          <div style={{ overflow: "hidden", flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textTransform: "capitalize" }}>
              {user?.name || "Rider"}
            </p>
            <button onClick={onLogout} style={{
              background: "none", border: "none", color: "#8896C8",
              fontSize: 12, cursor: "pointer", padding: 0, fontFamily: "'DM Sans', sans-serif",
            }}>Sign out</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Top Bar ────────────────────────────────────────────────────
export function Topbar({ title, user }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 10,
      padding: "13px 24px",
      background: "rgba(6,14,40,0.88)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      display: "flex", alignItems: "center", gap: 16,
    }}>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700 }}>{title}</h3>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
        {/* Live indicator */}
        <div style={{
          padding: "5px 12px", borderRadius: 20,
          background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)",
          fontSize: 12, color: "#10B981",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%", background: "#10B981",
            animation: "pulse-ring 1.2s ease infinite",
          }} />
          AI Monitoring Active
        </div>
        {/* User chip */}
        <div style={{
          padding: "5px 12px 5px 7px", borderRadius: 20,
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
          fontSize: 13, display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: "50%",
            background: "linear-gradient(135deg,#3B82F6,#8B5CF6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700,
          }}>{(user?.name?.[0] || "R").toUpperCase()}</div>
          <span style={{ textTransform: "capitalize" }}>{user?.name}</span>
        </div>
      </div>
    </div>
  );
}

// ── Plan Card (reusable) ───────────────────────────────────────
export function PlanCard({ plan, selected, onSelect, showSelect = true }) {
  const isSelected = selected === plan.id;
  return (
    <div
      onClick={() => showSelect && onSelect(plan.id)}
      style={{
        background: isSelected
          ? `linear-gradient(135deg, rgba(${plan.colorRgb},0.18), rgba(${plan.colorRgb},0.06))`
          : "rgba(13,27,75,0.65)",
        border: `2px solid ${isSelected ? plan.color : "rgba(255,255,255,0.08)"}`,
        borderRadius: 20, padding: "26px 22px",
        cursor: showSelect ? "pointer" : "default",
        position: "relative", overflow: "hidden",
        transform: isSelected ? "scale(1.02)" : "scale(1)",
        transition: "all 0.22s ease",
        boxShadow: isSelected ? `0 16px 48px rgba(${plan.colorRgb},0.25)` : "none",
      }}
      onMouseEnter={e => { if (!isSelected && showSelect) e.currentTarget.style.borderColor = `rgba(${plan.colorRgb},0.4)`; }}
      onMouseLeave={e => { if (!isSelected && showSelect) e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
    >
      {plan.popular && (
        <div style={{
          position: "absolute", top: 14, right: -28,
          background: plan.color, padding: "3px 36px",
          fontSize: 10, fontWeight: 700, color: "#fff",
          transform: "rotate(45deg)", letterSpacing: 0.5,
        }}>POPULAR</div>
      )}

      {/* Glow bg */}
      <div style={{
        position: "absolute", top: -30, right: -30, width: 100, height: 100,
        borderRadius: "50%", background: plan.color, opacity: 0.06, filter: "blur(30px)",
        pointerEvents: "none",
      }} />

      <div style={{ fontSize: 36, marginBottom: 12 }}>{plan.icon}</div>
      <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: plan.color, marginBottom: 6 }}>
        {plan.name}
      </h3>
      <p style={{ fontSize: 12, color: "#8896C8", marginBottom: 14, lineHeight: 1.5 }}>{plan.description}</p>

      <div style={{ marginBottom: 16 }}>
        <span style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Syne',sans-serif" }}>₹{plan.weekly}</span>
        <span style={{ fontSize: 12, color: "#8896C8" }}>/week</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "#8896C8" }}>Daily payout</span>
          <span style={{ fontWeight: 600, color: plan.color }}>₹{plan.daily}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "#8896C8" }}>Max weekly</span>
          <span style={{ fontWeight: 600 }}>₹{plan.maxWeekly}</span>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 7 }}>
        {plan.features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{ color: plan.color, fontWeight: 700 }}>✓</span>
            <span style={{ color: "#C8D4F0" }}>{f}</span>
          </div>
        ))}
      </div>

      {showSelect && isSelected && (
        <div style={{
          marginTop: 16, textAlign: "center", padding: "8px", borderRadius: 8,
          background: `rgba(${plan.colorRgb},0.15)`, color: plan.color,
          fontSize: 13, fontWeight: 600,
        }}>✓ Selected</div>
      )}
    </div>
  );
}
