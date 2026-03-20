import { useState } from "react";

// ============================================================
//  WorkflowPage.jsx
//  Interactive 5-phase application workflow visualization
// ============================================================

const PHASES = [
  {
    num: 1, label: "Onboarding & AI Risk Assessment",
    color: "#3B82F6", colorRgb: "59,130,246",
    steps: [
      { n: 1, icon: "📱", title: "User Registration",   desc: "Rider registers via app — phone number, gig platform, and work area." },
      { n: 2, icon: "🧠", title: "AI Risk Calculation",  desc: "AI assesses user's disruption risk → assigns Low / Medium / High zone." },
    ],
  },
  {
    num: 2, label: "Plan Selection & Policy Activation",
    color: "#F97316", colorRgb: "249,115,22",
    steps: [
      { n: 3, icon: "📋", title: "Plan Selection",      desc: "User chooses Basic, Standard, or AI Risk-based plan. ₹150/week for Medium." },
      { n: 4, icon: "💳", title: "Payment & Activation", desc: "Payment processed. Policy stored and activated in MySQL database." },
    ],
  },
  {
    num: 3, label: "Active Monitoring",
    color: "#8B5CF6", colorRgb: "139,92,246",
    steps: [
      { n: 5, icon: "📡", title: "Continuous Monitoring",     desc: "Real-time API polling — OpenWeather, government alerts, city shutdowns." },
      { n: "5b", icon: "🌧", title: "Disruption Detection",   desc: "Heavy rain (>50mm/hr) or other threshold detected at user's work area." },
    ],
  },
  {
    num: 4, label: "Disruption & Automated Claim Trigger",
    color: "#10B981", colorRgb: "16,185,129",
    steps: [
      { n: 6, icon: "⚡", title: "Trigger Event",    desc: "System detects disruption crosses payout threshold. Auto-claim initiated." },
      { n: 7, icon: "🔍", title: "Fraud Validation",  desc: "Multi-layer check: IP vs GPS, delivery data, device signals, movement patterns." },
    ],
  },
  {
    num: 5, label: "Instant Payout & Resolution",
    color: "#F43F5E", colorRgb: "244,63,94",
    steps: [
      { n: 8, icon: "💸", title: "Instant Payout", desc: "₹325 sent directly to rider's bank/UPI within 2 minutes. No manual claim needed." },
    ],
  },
];

export default function WorkflowPage() {
  const [active, setActive] = useState(null);

  const toggle = (key) => setActive(a => a === key ? null : key);

  return (
    <div style={{ padding: "28px 24px", maxWidth: 760, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 28, animation: "fadeUp 0.5s ease" }}>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: -0.3, marginBottom: 6 }}>
          Application Workflow
        </h2>
        <p style={{ color: "#8896C8", fontSize: 14 }}>
          End-to-end Insura process — from registration to payout in 5 phases
        </p>
      </div>

      {/* Phases */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {PHASES.map((phase, pi) => (
          <div key={pi} style={{ animation: `fadeUp 0.5s ease ${pi * 0.09}s both` }}>
            {/* Phase banner */}
            <div style={{
              padding: "12px 20px",
              borderRadius: pi === 0 ? "16px 16px 0 0" : "0",
              background: `linear-gradient(135deg, rgba(${phase.colorRgb},0.85), rgba(${phase.colorRgb},0.55))`,
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 13,
              }}>{phase.num}</div>
              <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>
                Phase {phase.num}: {phase.label}
              </span>
            </div>

            {/* Steps */}
            <div style={{
              background: "rgba(13,27,75,0.70)",
              border: `1px solid rgba(${phase.colorRgb},0.18)`,
              borderTop: "none",
              borderRadius: pi === PHASES.length - 1 ? "0 0 16px 16px" : "0",
              padding: "18px 16px",
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12,
            }}>
              {phase.steps.map((s, si) => {
                const key = `${pi}-${si}`;
                const isOpen = active === key;
                return (
                  <div key={si} onClick={() => toggle(key)} style={{
                    padding: "16px", borderRadius: 12, cursor: "pointer",
                    background: isOpen ? `rgba(${phase.colorRgb},0.14)` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isOpen ? phase.color : "rgba(255,255,255,0.07)"}`,
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { if (!isOpen) e.currentTarget.style.borderColor = `rgba(${phase.colorRgb},0.35)`; }}
                    onMouseLeave={e => { if (!isOpen) e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                        background: `rgba(${phase.colorRgb},0.18)`,
                        border: `1px solid rgba(${phase.colorRgb},0.3)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 13, color: phase.color,
                      }}>{s.n}</div>
                      <span style={{ fontSize: 22 }}>{s.icon}</span>
                      <span style={{ marginLeft: "auto", color: "#8896C8", fontSize: 14, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "" }}>▾</span>
                    </div>
                    <h4 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 4, color: isOpen ? phase.color : "#E8EEFF" }}>
                      {s.title}
                    </h4>
                    {isOpen && (
                      <p style={{ fontSize: 13, color: "#8896C8", lineHeight: 1.6, marginTop: 8, animation: "fadeIn 0.25s ease" }}>
                        {s.desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Arrow connector */}
            {pi < PHASES.length - 1 && (
              <div style={{ display: "flex", justifyContent: "center", margin: "2px 0" }}>
                <div style={{
                  width: 2, height: 22,
                  background: `linear-gradient(to bottom, rgba(${phase.colorRgb},0.7), rgba(${PHASES[pi+1].colorRgb},0.7))`,
                }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Anti-fraud section */}
      <div style={{
        marginTop: 28, padding: "20px 22px", borderRadius: 16,
        background: "rgba(13,27,75,0.65)", border: "1px solid rgba(255,255,255,0.07)",
        animation: "fadeUp 0.5s ease 0.5s both",
      }}>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 14 }}>
          🛡 Anti-Fraud & Verification Layers
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
          {[
            { icon: "🌐", title: "IP & Network",    desc: "IP vs GPS cross-check; VPN/proxy flags" },
            { icon: "📍", title: "GPS Stability",   desc: "Jitter, altitude, cell tower triangulation" },
            { icon: "🏃", title: "Movement",        desc: "Impossible travel speed detection" },
            { icon: "👥", title: "Cluster Detect",  desc: "Fraud ring / mass-claim pattern flags" },
          ].map((l, i) => (
            <div key={i} style={{
              padding: "13px 14px", borderRadius: 11,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{l.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 3 }}>{l.title}</div>
              <div style={{ fontSize: 12, color: "#8896C8" }}>{l.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
