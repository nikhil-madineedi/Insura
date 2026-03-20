import { useState } from "react";
import { RAINFALL_SCORES, calculateRiskProbability, getRiskLevel, RISK_PLANS, FIXED_PLANS } from "../utils/data";

// ============================================================
//  PricingPage.jsx
//  Full pricing model: Dynamic probability + risk-based plans
//  Based on project report pricing model (p.9–12)
// ============================================================

export default function PricingPage() {
  // ── Live Calculator ────────────────────────────────────────
  const [rain,       setRain]       = useState(0.3);
  const [heat,       setHeat]       = useState(0.1);
  const [flood,      setFlood]      = useState(0.0);
  const [pollution,  setPollution]  = useState(0.1);
  const [curfew,     setCurfew]     = useState(0.0);
  const [strike,     setStrike]     = useState(0.0);

  const envScores    = [rain, heat, flood, pollution];
  const socialScores = [curfew, strike];
  const prob         = calculateRiskProbability(envScores, socialScores);
  const level        = getRiskLevel(prob);
  const rec          = RISK_PLANS.find(p => p.id === level) || RISK_PLANS[1];
  const pct          = Math.round(prob * 100);

  const LEVEL_COLOR  = { low: "#10B981", medium: "#3B82F6", high: "#F97316" };
  const color        = LEVEL_COLOR[level];

  return (
    <div style={{ padding: "28px 24px", maxWidth: 960, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 28, animation: "fadeUp 0.5s ease" }}>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: -0.3, marginBottom: 6 }}>
          Pricing Model
        </h2>
        <p style={{ color: "#8896C8", fontSize: 14 }}>
          Dynamic disruption probability · Risk-Based & Fixed plans · From the Insura report
        </p>
      </div>

      {/* Two-col layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginBottom: 26 }}>

        {/* Formula panel */}
        <div style={{
          background: "rgba(13,27,75,0.65)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16, padding: "22px",
          animation: "fadeUp 0.5s ease 0.1s both",
        }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
            📐 Probability Formula
          </h3>

          <div style={{
            padding: "14px 16px", borderRadius: 12,
            background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
            fontFamily: "monospace", fontSize: 13, lineHeight: 2, marginBottom: 14,
          }}>
            <div style={{ color: "#93C5FD" }}>Env Risk = avg(rainfall, heat, flood, AQI)</div>
            <div style={{ color: "#C4B5FD" }}>Social Risk = avg(curfew, strike)</div>
            <div style={{ color: "#6EE7B7", fontWeight: 700, marginTop: 4 }}>
              Total = <strong>(0.7 × Env)</strong> + <strong>(0.3 × Social)</strong>
            </div>
          </div>

          {/* Rainfall table */}
          <h4 style={{ fontSize: 13, fontWeight: 600, color: "#8896C8", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.6 }}>
            Rainfall Risk Scores
          </h4>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["Rainfall (mm/hr)", "Risk Score"].map(h => (
                  <th key={h} style={{ padding: "7px 10px", color: "#8896C8", fontWeight: 600, textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RAINFALL_SCORES.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "8px 10px" }}>{row.range}</td>
                  <td style={{ padding: "8px 10px", fontWeight: 700, color: row.score >= 0.6 ? "#F43F5E" : row.score >= 0.4 ? "#F59E0B" : "#10B981" }}>
                    {row.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Live Calculator */}
        <div style={{
          background: "rgba(13,27,75,0.65)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16, padding: "22px",
          animation: "fadeUp 0.5s ease 0.14s both",
        }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
            🧮 Live Risk Calculator
          </h3>

          {[
            { label: "🌧 Rainfall",    val: rain,      set: setRain },
            { label: "🌡 Heatwave",   val: heat,      set: setHeat },
            { label: "🌊 Flood Alert", val: flood,     set: setFlood },
            { label: "😷 Pollution",  val: pollution, set: setPollution },
            { label: "🚫 Curfew",     val: curfew,    set: setCurfew },
            { label: "✊ Strike",     val: strike,    set: setStrike },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: "#C8D4F0" }}>{item.label}</span>
                <span style={{ fontWeight: 700, color: item.val >= 0.6 ? "#F43F5E" : item.val >= 0.4 ? "#F59E0B" : "#10B981" }}>
                  {item.val.toFixed(1)}
                </span>
              </div>
              <input type="range" min="0" max="1" step="0.1"
                value={item.val} onChange={e => item.set(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "#3B82F6", cursor: "pointer" }}
              />
            </div>
          ))}

          {/* Result */}
          <div style={{
            marginTop: 16, padding: "16px", borderRadius: 12,
            background: `rgba(${rec.colorRgb},0.12)`,
            border: `1px solid rgba(${rec.colorRgb},0.3)`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <p style={{ fontSize: 12, color: "#8896C8", marginBottom: 3 }}>Disruption Probability</p>
              <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 24, color }}>
                {pct}%
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 12, color: "#8896C8", marginBottom: 3 }}>Recommended Plan</p>
              <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color }}>
                {rec.name} — ₹{rec.weekly}/wk
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Plans comparison table */}
      <div style={{
        background: "rgba(13,27,75,0.65)", border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16, padding: "22px",
        animation: "fadeUp 0.5s ease 0.2s both",
        marginBottom: 22,
      }}>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 18 }}>
          📊 Risk-Based Plan Comparison
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {["Risk Level", "Weekly Premium", "Daily Payout", "Max Weekly", "AI Assigned"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", color: "#8896C8", fontWeight: 600, textAlign: "left", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RISK_PLANS.map((p, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: level === p.id ? `rgba(${p.colorRgb},0.06)` : "transparent" }}>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: p.color, display: "inline-block", boxShadow: `0 0 8px ${p.color}` }} />
                      <span style={{ fontWeight: 600, color: p.color }}>{p.name}</span>
                      {level === p.id && <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 10, background: `rgba(${p.colorRgb},0.2)`, color: p.color }}>Your Zone</span>}
                    </div>
                  </td>
                  <td style={{ padding: "12px 14px", fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>₹{p.weekly}</td>
                  <td style={{ padding: "12px 14px", color: p.color, fontWeight: 700 }}>₹{p.daily}</td>
                  <td style={{ padding: "12px 14px" }}>₹{p.maxWeekly}</td>
                  <td style={{ padding: "12px 14px", color: "#10B981", fontSize: 13 }}>✓ Yes</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fixed Plans */}
      <div style={{
        background: "rgba(13,27,75,0.65)", border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16, padding: "22px",
        animation: "fadeUp 0.5s ease 0.26s both",
        marginBottom: 22,
      }}>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 18 }}>
          📋 Optional Fixed Plans
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {["Plan", "Weekly Premium", "Daily Payout", "Max Weekly", "Area Pricing"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", color: "#8896C8", fontWeight: 600, textAlign: "left", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FIXED_PLANS.map((p, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span>{p.icon}</span>
                      <span style={{ fontWeight: 600, color: p.color }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 14px", fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>₹{p.weekly}</td>
                  <td style={{ padding: "12px 14px", color: p.color, fontWeight: 700 }}>₹{p.daily}</td>
                  <td style={{ padding: "12px 14px" }}>₹{p.maxWeekly}</td>
                  <td style={{ padding: "12px 14px", color: "#F43F5E", fontSize: 13 }}>✗ Ignored</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: "#8896C8", marginTop: 12 }}>
          * Fixed plans ignore area-based pricing but still follow all disruption triggers.
        </p>
      </div>

      {/* Example Scenario */}
      <div style={{
        background: "rgba(13,27,75,0.65)", border: "1px solid rgba(59,130,246,0.2)",
        borderRadius: 16, padding: "22px",
        animation: "fadeUp 0.5s ease 0.32s both",
      }}>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
          📍 Example Scenario — Vijayawada
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          {[
            { label: "Event",       value: "Heavy Rain", icon: "🌧" },
            { label: "Duration",    value: "2 days",     icon: "📅" },
            { label: "Plan",        value: "Medium Risk", icon: "⚡" },
            { label: "Daily Pay",   value: "₹325",       icon: "💰" },
            { label: "Total Payout","value": "₹650",     icon: "🎯" },
            { label: "Cap Check",   value: "< ₹700 ✓",  icon: "✅" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "13px 14px", borderRadius: 11,
              background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.15)",
            }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 12, color: "#8896C8", marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: "#93C5FD" }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
