import { useState } from "react";
import { RISK_PLANS, FIXED_PLANS } from "../utils/data";
import { PlanCard } from "../components/SharedComponents";

// ============================================================
//  PlansPage.jsx
//  Browse & purchase Risk-Based or Fixed insurance plans
// ============================================================

export default function PlansPage({ user }) {
  const [planType, setPlanType] = useState("risk");
  const [selected, setSelected] = useState(user?.plan || "medium");
  const [bought, setBought]     = useState(false);
  const [loading, setLoading]   = useState(false);

  const allPlans = planType === "risk" ? RISK_PLANS : FIXED_PLANS;
  const chosenPlan = allPlans.find(p => p.id === selected);

  const handleActivate = async () => {
    if (!selected) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setBought(true);
  };

  return (
    <div style={{ padding: "28px 24px", maxWidth: 960, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 28, animation: "fadeUp 0.5s ease" }}>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: -0.3, marginBottom: 6 }}>
          Insurance Plans
        </h2>
        <p style={{ color: "#8896C8", fontSize: 14 }}>
          Choose a weekly income protection plan. Payouts are automatic — no manual claims.
        </p>
      </div>

      {/* Plan type toggle */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 28,
        background: "rgba(255,255,255,0.04)", borderRadius: 12,
        padding: 4, width: "fit-content",
        animation: "fadeUp 0.5s ease 0.08s both",
      }}>
        {[
          { id: "risk",  label: "🧠 AI Risk-Based" },
          { id: "fixed", label: "📋 Fixed Plans" },
        ].map(t => (
          <button key={t.id} onClick={() => { setPlanType(t.id); setSelected(""); setBought(false); }} style={{
            padding: "9px 20px", borderRadius: 10, border: "none", cursor: "pointer",
            background: planType === t.id ? "rgba(59,130,246,0.75)" : "transparent",
            color: "#fff", fontFamily: "'DM Sans',sans-serif",
            fontSize: 13, fontWeight: planType === t.id ? 600 : 400,
            transition: "all 0.18s",
          }}>{t.label}</button>
        ))}
      </div>

      {/* Info banner */}
      {planType === "risk" && (
        <div style={{
          padding: "13px 18px", borderRadius: 12, marginBottom: 22,
          background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)",
          fontSize: 13, color: "#8896C8", lineHeight: 1.6,
          animation: "fadeIn 0.35s ease",
        }}>
          🧠 <strong style={{ color: "#C4B5FD" }}>AI Risk-Based plans</strong> are automatically assigned based on your location and work area. Higher risk zones get higher daily payouts.
        </div>
      )}
      {planType === "fixed" && (
        <div style={{
          padding: "13px 18px", borderRadius: 12, marginBottom: 22,
          background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
          fontSize: 13, color: "#8896C8", lineHeight: 1.6,
          animation: "fadeIn 0.35s ease",
        }}>
          📋 <strong style={{ color: "#93C5FD" }}>Fixed plans</strong> ignore area-based pricing but still follow all disruption triggers (rain, floods, curfews). Choose based on your budget.
        </div>
      )}

      {/* Plan Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${allPlans.length}, 1fr)`,
        gap: 20, marginBottom: 24,
        animation: "fadeUp 0.5s ease 0.12s both",
      }}>
        {allPlans.map(p => (
          <PlanCard key={p.id} plan={p} selected={selected} onSelect={id => { setSelected(id); setBought(false); }} />
        ))}
      </div>

      {/* CTA */}
      {selected && !bought && (
        <div style={{ textAlign: "center", animation: "fadeUp 0.4s ease" }}>
          <button
            onClick={handleActivate}
            disabled={loading}
            style={{
              padding: "14px 48px", borderRadius: 14, border: "none",
              background: loading
                ? `rgba(${chosenPlan?.colorRgb || "59,130,246"},0.35)`
                : `linear-gradient(135deg, ${chosenPlan?.color}, ${chosenPlan?.color}aa)`,
              color: "#fff", fontFamily: "'Syne',sans-serif",
              fontSize: 16, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : `0 8px 32px rgba(${chosenPlan?.colorRgb || "59,130,246"},0.4)`,
              display: "inline-flex", alignItems: "center", gap: 10,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
          >
            {loading
              ? <><span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} /> Activating…</>
              : `Activate ${chosenPlan?.name} Plan →`
            }
          </button>
        </div>
      )}

      {/* Success */}
      {bought && chosenPlan && (
        <div style={{
          padding: "24px", borderRadius: 16, textAlign: "center",
          background: `rgba(${chosenPlan.colorRgb},0.1)`,
          border: `1px solid rgba(${chosenPlan.colorRgb},0.3)`,
          animation: "countUp 0.45s ease",
        }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>🎉</div>
          <h3 style={{ fontFamily: "'Syne',sans-serif", color: chosenPlan.color, fontWeight: 700, marginBottom: 6 }}>
            {chosenPlan.name} Plan Activated!
          </h3>
          <p style={{ color: "#8896C8", fontSize: 14, marginBottom: 16 }}>
            AI monitoring is live. You'll receive ₹{chosenPlan.daily}/day automatically when disruptions are detected.
          </p>
          <div style={{
            display: "inline-flex", gap: 24, padding: "12px 24px", borderRadius: 12,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            fontSize: 14,
          }}>
            <span>💰 ₹{chosenPlan.weekly}/week</span>
            <span>📅 Daily: ₹{chosenPlan.daily}</span>
            <span>🎯 Max: ₹{chosenPlan.maxWeekly}/week</span>
          </div>
        </div>
      )}

      {/* Trigger reminder */}
      <div style={{
        marginTop: 28, padding: "18px 20px", borderRadius: 14,
        background: "rgba(13,27,75,0.65)", border: "1px solid rgba(255,255,255,0.07)",
        animation: "fadeUp 0.5s ease 0.3s both",
      }}>
        <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
          📡 Automatic Payout Triggers
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {["🌧 Rain > 50mm/hr", "🌊 Flood Alert", "🌡 Heat > 42°C", "😷 AQI > 300", "🚫 Curfew", "✊ Bundh/Strike"].map((t, i) => (
            <span key={i} style={{
              padding: "6px 13px", borderRadius: 20,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 13, color: "#C8D4F0",
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
