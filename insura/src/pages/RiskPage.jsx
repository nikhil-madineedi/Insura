import { useState } from "react";
import { calculateRiskProbability, getRiskLevel, RISK_PLANS } from "../utils/data";
import { Spinner } from "../components/SharedComponents";

// ============================================================
//  RiskPage.jsx
//  AI Risk Assessment — 4-question wizard using the
//  report's probability model (Env 70% + Social 30%)
// ============================================================

const QUESTIONS = [
  {
    id: "location",
    label: "Where is your primary work area?",
    icon: "📍",
    options: [
      { label: "Urban City (dry zone)", envScore: 0.1, socialScore: 0.2 },
      { label: "Coastal Area",          envScore: 0.4, socialScore: 0.2 },
      { label: "Flood-prone Zone",      envScore: 0.7, socialScore: 0.3 },
      { label: "Rural / Hilly Area",    envScore: 0.3, socialScore: 0.1 },
    ],
  },
  {
    id: "weather",
    label: "How often do you face heavy rain / heatwaves?",
    icon: "🌦",
    options: [
      { label: "Rarely (< 5 days/year)",       envScore: 0.1, socialScore: 0.0 },
      { label: "Occasionally (5–15 days)",     envScore: 0.3, socialScore: 0.0 },
      { label: "Frequently (15–30 days)",      envScore: 0.5, socialScore: 0.1 },
      { label: "Very often (30+ days)",        envScore: 0.7, socialScore: 0.1 },
    ],
  },
  {
    id: "social",
    label: "How often do curfews / bundhs affect your area?",
    icon: "🚫",
    options: [
      { label: "Never",              envScore: 0.0, socialScore: 0.0 },
      { label: "Rarely (1–2/year)", envScore: 0.0, socialScore: 0.2 },
      { label: "Sometimes (3–5)",   envScore: 0.0, socialScore: 0.5 },
      { label: "Often (6+ times)",  envScore: 0.0, socialScore: 0.8 },
    ],
  },
  {
    id: "pollution",
    label: "Does air pollution / AQI affect your deliveries?",
    icon: "😷",
    options: [
      { label: "No, air quality is fine",       envScore: 0.0, socialScore: 0.0 },
      { label: "Mild (AQI 100–200 sometimes)", envScore: 0.2, socialScore: 0.0 },
      { label: "Moderate (AQI > 200 often)",   envScore: 0.4, socialScore: 0.0 },
      { label: "Severe (AQI > 300 regularly)", envScore: 0.6, socialScore: 0.1 },
    ],
  },
];

export default function RiskPage({ onNav }) {
  const [step, setStep]           = useState(0);
  const [answers, setAnswers]     = useState({});
  const [computing, setComputing] = useState(false);
  const [result, setResult]       = useState(null);

  const q = QUESTIONS[step];

  const pick = async (opt) => {
    const next = { ...answers, [q.id]: opt };
    setAnswers(next);

    if (step < QUESTIONS.length - 1) {
      setStep(s => s + 1);
    } else {
      // Compute
      setComputing(true);
      await new Promise(r => setTimeout(r, 1800));

      const envScores    = Object.values(next).map(a => a.envScore);
      const socialScores = Object.values(next).map(a => a.socialScore);
      const prob         = calculateRiskProbability(envScores, socialScores);
      const level        = getRiskLevel(prob);

      setResult({ prob, level });
      setComputing(false);
    }
  };

  const reset = () => { setStep(0); setAnswers({}); setResult(null); };

  const LEVEL_COLORS = { low: "#10B981", medium: "#3B82F6", high: "#F97316" };
  const LEVEL_LABELS = { low: "Low", medium: "Medium", high: "High" };

  // ── Result screen ──────────────────────────────────────────
  if (result) {
    const rec   = RISK_PLANS.find(p => p.id === result.level) || RISK_PLANS[1];
    const pct   = Math.round(result.prob * 100);
    const color = LEVEL_COLORS[result.level];

    return (
      <div style={{ padding: "28px 24px", maxWidth: 660, margin: "0 auto" }}>
        <div style={{ textAlign: "center", animation: "countUp 0.55s ease" }}>
          {/* Score ring */}
          <div style={{ position: "relative", width: 160, height: 160, margin: "0 auto 24px" }}>
            <svg width="160" height="160" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
              <circle cx="80" cy="80" r="70" fill="none"
                stroke={color} strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - result.prob)}`}
                style={{ transition: "stroke-dashoffset 1.2s ease" }}
              />
            </svg>
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, color }}>{pct}%</span>
              <span style={{ fontSize: 12, color: "#8896C8" }}>risk score</span>
            </div>
          </div>

          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 30, fontWeight: 800, color, marginBottom: 8 }}>
            {LEVEL_LABELS[result.level]} Risk Zone
          </h2>
          <p style={{ color: "#8896C8", fontSize: 15, marginBottom: 28 }}>
            AI-assessed across 4 environmental & social dimensions
          </p>

          {/* Answer summary */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28, textAlign: "left",
          }}>
            {QUESTIONS.map((q, i) => (
              <div key={i} style={{
                background: "rgba(13,27,75,0.7)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12, padding: "14px 16px",
              }}>
                <p style={{ fontSize: 11, color: "#8896C8", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5 }}>
                  {q.icon} {q.id}
                </p>
                <p style={{ fontSize: 13, fontWeight: 600 }}>{answers[q.id]?.label}</p>
              </div>
            ))}
          </div>

          {/* Recommended plan */}
          <div style={{
            padding: "20px 22px", borderRadius: 14, marginBottom: 22, textAlign: "left",
            background: `rgba(${rec.colorRgb},0.1)`,
            border: `1px solid rgba(${rec.colorRgb},0.28)`,
          }}>
            <p style={{ fontSize: 12, color: "#8896C8", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>
              Recommended Plan
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 32 }}>{rec.icon}</span>
              <div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: rec.color }}>
                  {rec.name} Plan
                </h3>
                <p style={{ fontSize: 13, color: "#8896C8" }}>
                  ₹{rec.weekly}/week · ₹{rec.daily}/day payout · max ₹{rec.maxWeekly}/week
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={reset} style={{
              flex: "0 0 auto", padding: "13px 22px", borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)", color: "#E8EEFF",
              fontFamily: "'DM Sans',sans-serif", fontSize: 15, cursor: "pointer",
            }}>Retry</button>
            <button onClick={() => onNav("plans")} style={{
              flex: 1, padding: "13px",
              borderRadius: 12, border: "none",
              background: `linear-gradient(135deg, ${color}, ${color}99)`,
              color: "#fff", fontFamily: "'Syne',sans-serif",
              fontSize: 15, fontWeight: 700, cursor: "pointer",
              boxShadow: `0 8px 24px rgba(${rec.colorRgb},0.35)`,
            }}>View & Activate Plan →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Computing screen ───────────────────────────────────────
  if (computing) {
    return (
      <div style={{
        padding: "80px 24px", textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
      }}>
        <div style={{
          width: 60, height: 60,
          border: "3px solid rgba(59,130,246,0.2)",
          borderTopColor: "#3B82F6",
          borderRadius: "50%", animation: "spin 0.9s linear infinite",
        }} />
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700 }}>
          AI is computing your risk profile…
        </h3>
        <p style={{ color: "#8896C8", fontSize: 14 }}>
          Applying Environmental (70%) + Social (30%) weighting model
        </p>
      </div>
    );
  }

  // ── Question screen ────────────────────────────────────────
  const progress = (step / QUESTIONS.length) * 100;

  return (
    <div style={{ padding: "28px 24px", maxWidth: 620, margin: "0 auto" }}>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 6, animation: "fadeUp 0.5s ease" }}>
        AI Risk Assessment
      </h2>
      <p style={{ color: "#8896C8", fontSize: 14, marginBottom: 24, animation: "fadeUp 0.5s ease 0.05s both" }}>
        4 questions to calculate your disruption risk score
      </p>

      {/* Progress bar */}
      <div style={{ marginBottom: 28, animation: "fadeUp 0.5s ease 0.1s both" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8896C8", marginBottom: 8 }}>
          <span>Question {step + 1} of {QUESTIONS.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 5, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 5,
            background: "linear-gradient(to right, #3B82F6, #8B5CF6)",
            width: `${progress}%`, transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      {/* Question card */}
      <div style={{
        background: "rgba(13,27,75,0.75)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20, padding: "30px 28px",
        animation: "slideInRight 0.38s ease",
        key: step,
      }}>
        <div style={{ fontSize: 36, marginBottom: 14 }}>{q.icon}</div>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 22 }}>
          {q.label}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => pick(opt)} style={{
              padding: "14px 18px", borderRadius: 12, border: "none",
              background: "rgba(255,255,255,0.04)",
              borderWidth: 1, borderStyle: "solid",
              borderColor: "rgba(255,255,255,0.08)",
              color: "#E8EEFF", cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif", fontSize: 14,
              textAlign: "left", transition: "all 0.18s",
              display: "flex", alignItems: "center", gap: 12,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.12)"; e.currentTarget.style.borderColor = "#3B82F6"; e.currentTarget.style.transform = "translateX(4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = ""; }}
            >
              <span style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: "#3B82F6",
              }}>{String.fromCharCode(65 + i)}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Back button */}
      {step > 0 && (
        <button onClick={() => setStep(s => s - 1)} style={{
          marginTop: 16, padding: "10px 20px", borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "none", color: "#8896C8",
          fontFamily: "'DM Sans',sans-serif", fontSize: 14, cursor: "pointer",
        }}>← Previous question</button>
      )}
    </div>
  );
}
