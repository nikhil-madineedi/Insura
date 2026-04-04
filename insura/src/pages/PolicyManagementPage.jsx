import { useState, useEffect } from "react";
import { calculateDynamicPremiumAdjustment, MOCK_RISK_FACTORS } from "../utils/data";
import { calculateDynamicPremium } from "../services/apiService";

// ============================================================
//  PolicyManagementPage.jsx
//  Phase 2: Insurance Policy Management + Dynamic Premium Calc
//  Showcase: CRUD operations, ML-based pricing, policy tracking
// ============================================================

export default function PolicyManagementPage() {
  const [activePolicy, setActivePolicy] = useState(null);
  const [policies, setPolicies] = useState([
    {
      id: "POL-123456-VIJAYAWADA",
      holder: "Ravi Kumar",
      platform: "Zomato",
      workArea: "Vijayawada",
      status: "ACTIVE",
      planTier: "Medium Risk",
      baseWeekly: 150,
      dynamicWeekly: 130,
      activatedAt: "2026-03-15",
      nextBilling: "2026-04-11",
      monthlyPayouts: 650,
    },
  ]);
  const [dynamicPricingDemo, setDynamicPricingDemo] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(false);

  // Simulate dynamic premium calculation
  const handleCalculateDynamicPrice = async () => {
    setLoadingPrice(true);
    await new Promise(r => setTimeout(r, 1200));
    
    const result = calculateDynamicPremium(150, MOCK_RISK_FACTORS);
    setDynamicPricingDemo(result);
    setLoadingPrice(false);
  };

  return (
    <div style={{ padding: "28px 24px", maxWidth: 960, margin: "0 auto" }}>
      {/* Phase 2 Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <span style={{ color: "#10B981", fontSize: 16, fontWeight: 700 }}>Phase 2</span>
        <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.08)" }} />
      </div>

      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 6 }}>
        Insurance Policy Management
      </h2>
      <p style={{ color: "#8896C8", fontSize: 14, marginBottom: 28 }}>
        Real-time policy tracking, dynamic premium calculation, and ML-based pricing optimization
      </p>

      {/* Current Policies */}
      <div style={{ 
        background: "rgba(13,27,75,0.65)", border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16, padding: "22px", marginBottom: 26,
      }}>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
          📋 Active Policies
        </h3>
        {policies.map((p, i) => (
          <div key={i} style={{
            padding: "16px", borderRadius: 12, marginBottom: 12,
            background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(59,130,246,0.08)"; }}
            onClick={() => setActivePolicy(p)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{p.holder}</div>
                <div style={{ fontSize: 13, color: "#8896C8" }}>{p.platform} • {p.workArea}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: "#10B981" }}>
                  ₹{p.dynamicWeekly}/week
                </div>
                <span style={{
                  display: "inline-block", marginTop: 4, padding: "3px 10px", borderRadius: 20,
                  background: "rgba(16,185,129,0.2)", color: "#10B981", fontSize: 12, fontWeight: 600,
                }}>✓ {p.status}</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, fontSize: 12, color: "#8896C8" }}>
              <div>Plan: <strong>{p.planTier}</strong></div>
              <div>Active: <strong>{p.activatedAt}</strong></div>
              <div>Next Bill: <strong>{p.nextBilling}</strong></div>
              <div>Month: <strong>₹{p.monthlyPayouts}</strong></div>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Premium Calculation Demo */}
      <div style={{
        background: "rgba(13,27,75,0.65)", border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16, padding: "22px", marginBottom: 26,
      }}>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
          🧠 Dynamic Premium Calculator (ML Model)
        </h3>
        
        <div style={{ 
          background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
          borderRadius: 12, padding: "18px", marginBottom: 16,
        }}>
          <p style={{ color: "#8896C8", fontSize: 13, marginBottom: 14 }}>
            Machine Learning algorithm adjusts premiums based on:
            <br/>• Historical disruption frequency in zone • Seasonal weather risk • User trust score • Peak hour patterns
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 14 }}>
            {[
              { icon: "📍", label: "Zone Risk", value: "65%" },
              { icon: "🌦", label: "Seasonal Risk", value: "70%" },
              { icon: "⭐", label: "Trust Score", value: "92%" },
              { icon: "🌙", label: "Peak Hours", value: "45%" },
            ].map((f, i) => (
              <div key={i} style={{
                padding: "12px", borderRadius: 10,
                background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{f.icon}</div>
                <div style={{ fontSize: 11, color: "#8896C8" }}>{f.label}</div>
                <div style={{ fontWeight: 700, color: "#C4B5FD", fontSize: 13, marginTop: 3 }}>{f.value}</div>
              </div>
            ))}
          </div>
          <button onClick={handleCalculateDynamicPrice} disabled={loadingPrice} style={{
            width: "100%", padding: "13px", borderRadius: 10, border: "none",
            background: loadingPrice ? "rgba(139,92,246,0.35)" : "linear-gradient(135deg, #8B5CF6, #6366F1)",
            color: "#fff", fontWeight: 700, cursor: loadingPrice ? "not-allowed" : "pointer",
          }}>
            {loadingPrice ? "Calculating..." : "Calculate Adjusted Premium"}
          </button>
        </div>

        {/* Result Display */}
        {dynamicPricingDemo && (
          <div style={{
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 12, padding: "18px", animation: "countUp 0.5s ease",
          }}>
            <h4 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 14, color: "#10B981" }}>
              ✓ Premium Calculation Result
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 14 }}>
              <div style={{ padding: "12px", borderRadius: 10, background: "rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: 12, color: "#8896C8", marginBottom: 4 }}>Base Weekly Premium</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: "#8896C8" }}>
                  ₹{dynamicPricingDemo.baseWeekly}
                </div>
              </div>
              <div style={{ padding: "12px", borderRadius: 10, background: "rgba(16,185,129,0.1)" }}>
                <div style={{ fontSize: 12, color: "#10B981", marginBottom: 4 }}>Adjusted Weekly Premium</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: "#10B981" }}>
                  ₹{dynamicPricingDemo.dynamicWeekly}
                </div>
              </div>
            </div>
            <div style={{ 
              padding: "12px", borderRadius: 10, background: "rgba(16,185,129,0.1)",
              borderLeft: "3px solid #10B981", marginBottom: 14,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#10B981", marginBottom: 6 }}>
                💰 Your Savings: ₹{dynamicPricingDemo.weeklyDiscount}/week
              </div>
              <div style={{ fontSize: 12, color: "#A3E5C0" }}>
                {dynamicPricingDemo.reason}
              </div>
            </div>
            <div style={{  display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
              {dynamicPricingDemo.reasons && dynamicPricingDemo.reasons.map((r, i) => (
                <div key={i} style={{
                  padding: "8px 12px", borderRadius: 8,
                  background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.3)",
                  fontSize: 12, color: "#10B981",
                }}>✓ {r}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Policy Metrics */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 26,
      }}>
        {[
          { icon: "📜", label: "Total Policies", value: "1", color: "#3B82F6" },
          { icon: "✅", label: "Active Status", value: "100%", color: "#10B981" },
          { icon: "💳", label: "Next Payment", value: "Apr 11", color: "#F59E0B" },
          { icon: "📊", label: "Coverage Tier", value: "Medium", color: "#8B5CF6" },
        ].map((m, i) => (
          <div key={i} style={{
            background: "rgba(13,27,75,0.65)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14, padding: "18px 16px", textAlign: "center",
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</div>
            <div style={{ fontSize: 12, color: "#8896C8", marginBottom: 6 }}>{m.label}</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: m.color }}>
              {m.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
