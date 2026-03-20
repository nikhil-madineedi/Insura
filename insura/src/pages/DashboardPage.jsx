import { useState } from "react";
import { RISK_PLANS, DISRUPTION_TRIGGERS } from "../utils/data";

// ============================================================
//  DashboardPage.jsx
//  Main dashboard shown after login — stats, alerts, activity
// ============================================================

export default function DashboardPage({ user, onNav }) {
  const plan = RISK_PLANS.find(p => p.id === (user?.plan || "medium")) || RISK_PLANS[1];

  const stats = [
    { label: "Active Plan",      value: plan.name,  icon: "🛡", color: plan.color,   sub: `₹${plan.weekly}/week` },
    { label: "Daily Payout",     value: `₹${plan.daily}`, icon: "💰", color: "#10B981", sub: "Per disruption day" },
    { label: "Claims Settled",   value: "12",        icon: "✅", color: "#F59E0B",   sub: "100% success rate" },
    { label: "Risk Score",       value: "Medium",    icon: "📊", color: "#8B5CF6",   sub: "AI assessed" },
  ];

  const activity = [
    { date: "Mar 19, 2026", desc: "Heavy Rain Trigger — Payout",       amount: "+₹325",  color: "#10B981" },
    { date: "Mar 15, 2026", desc: "Weekly Premium Deducted",           amount: "-₹150",  color: "#F43F5E" },
    { date: "Mar 12, 2026", desc: "Policy Renewal — Active",           amount: "₹0",     color: "#8896C8" },
    { date: "Mar 10, 2026", desc: "Flood Event Payout",                amount: "+₹500",  color: "#10B981" },
    { date: "Mar 08, 2026", desc: "Heatwave Alert Payout",             amount: "+₹325",  color: "#10B981" },
    { date: "Mar 01, 2026", desc: "Weekly Premium Deducted",           amount: "-₹150",  color: "#F43F5E" },
  ];

  const quickActions = [
    { label: "Buy / Change Plan",   icon: "🛡", color: "#3B82F6", rgb: "59,130,246",  tab: "plans" },
    { label: "AI Risk Check",       icon: "🧠", color: "#8B5CF6", rgb: "139,92,246",  tab: "risk" },
    { label: "View Claims",         icon: "📋", color: "#F59E0B", rgb: "245,158,11",  tab: "claims" },
    { label: "See Workflow",        icon: "🔄", color: "#10B981", rgb: "16,185,129",  tab: "workflow" },
    { label: "Pricing Details",     icon: "💰", color: "#F97316", rgb: "249,115,22",  tab: "pricing" },
  ];

  return (
    <div style={{ padding: "28px 24px", maxWidth: 960, margin: "0 auto" }}>
      {/* Greeting */}
      <div style={{ marginBottom: 26, animation: "fadeUp 0.5s ease" }}>
        <p style={{ color: "#8896C8", fontSize: 14, marginBottom: 4 }}>Good morning,</p>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: -0.5, textTransform: "capitalize" }}>
          {user?.name || "Rider"} 👋
        </h2>
      </div>

      {/* Payout Alert Banner */}
      <div style={{
        background: "linear-gradient(135deg, rgba(16,185,129,0.14), rgba(59,130,246,0.08))",
        border: "1px solid rgba(16,185,129,0.3)",
        borderRadius: 16, padding: "16px 20px",
        display: "flex", alignItems: "center", gap: 14,
        marginBottom: 26, animation: "fadeUp 0.5s ease 0.1s both",
        flexWrap: "wrap",
      }}>
        <span style={{ fontSize: 28 }}>⚡</span>
        <div style={{ flex: 1, minWidth: 180 }}>
          <p style={{ fontWeight: 600, color: "#10B981", fontSize: 14 }}>Claim auto-triggered!</p>
          <p style={{ color: "#8896C8", fontSize: 13, marginTop: 2 }}>
            Heavy rain detected at {user?.workArea || "your location"}. Payout processed instantly.
          </p>
        </div>
        <div style={{
          fontFamily: "'Syne',sans-serif", fontWeight: 800,
          fontSize: 22, color: "#10B981",
        }}>+₹{plan.daily}</div>
      </div>

      {/* Stats */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
        gap: 16, marginBottom: 26,
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: "rgba(13,27,75,0.65)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16, padding: "20px 18px",
            position: "relative", overflow: "hidden",
            animation: `fadeUp 0.5s ease ${0.12 + i * 0.07}s both`,
            transition: "border-color 0.2s, transform 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.color}44`; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = ""; }}
          >
            <div style={{
              position: "absolute", top: -20, right: -20, width: 80, height: 80,
              borderRadius: "50%", background: s.color, opacity: 0.08, filter: "blur(22px)", pointerEvents: "none",
            }} />
            <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "#8896C8", marginTop: 3 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: s.color, marginTop: 6, opacity: 0.85 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Live Trigger Status */}
      <div style={{
        background: "rgba(13,27,75,0.65)", border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16, padding: "22px", marginBottom: 22,
        animation: "fadeUp 0.5s ease 0.38s both",
      }}>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
          Live Disruption Monitors
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
          {DISRUPTION_TRIGGERS.map((t, i) => {
            const active = i === 0; // Heavy rain is active
            return (
              <div key={i} style={{
                padding: "12px", borderRadius: 12,
                background: active ? `rgba(59,130,246,0.12)` : "rgba(255,255,255,0.03)",
                border: `1px solid ${active ? "#3B82F6" : "rgba(255,255,255,0.07)"}`,
                textAlign: "center",
              }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{t.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: active ? "#3B82F6" : "#8896C8", marginBottom: 3 }}>
                  {t.label}
                </div>
                <div style={{ fontSize: 11, color: active ? "#10B981" : "#8896C8" }}>
                  {active ? "🔴 ACTIVE" : "✓ Clear"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-col: Activity + Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 18 }}>

        {/* Recent Activity */}
        <div style={{
          background: "rgba(13,27,75,0.65)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16, padding: "22px",
          animation: "fadeUp 0.5s ease 0.44s both",
        }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 18 }}>
            Recent Activity
          </h3>
          {activity.map((a, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 0",
              borderBottom: i < activity.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: a.color, flexShrink: 0,
                boxShadow: `0 0 8px ${a.color}`,
              }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 500 }}>{a.desc}</p>
                <p style={{ fontSize: 12, color: "#8896C8" }}>{a.date}</p>
              </div>
              <span style={{
                fontFamily: "'Syne',sans-serif", fontWeight: 700,
                color: a.color, fontSize: 14, flexShrink: 0,
              }}>{a.amount}</span>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{
          background: "rgba(13,27,75,0.65)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16, padding: "22px",
          animation: "fadeUp 0.5s ease 0.50s both",
        }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
            Quick Actions
          </h3>
          {quickActions.map((a, i) => (
            <button key={i} onClick={() => onNav(a.tab)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12,
              padding: "11px 13px", borderRadius: 11, marginBottom: 9,
              background: `rgba(${a.rgb},0.08)`,
              border: `1px solid rgba(${a.rgb},0.18)`,
              color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 500,
              fontFamily: "'DM Sans',sans-serif",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.boxShadow = `0 4px 20px rgba(${a.rgb},0.2)`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              <span style={{ fontSize: 18 }}>{a.icon}</span>
              <span style={{ flex: 1, textAlign: "left" }}>{a.label}</span>
              <span style={{ color: a.color, opacity: 0.6, fontSize: 14 }}>→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
