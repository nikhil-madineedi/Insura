import { useState } from "react";

// ============================================================
//  ClaimsPage.jsx
//  View active + settled claims; file new claim
// ============================================================

const MOCK_CLAIMS = {
  active: [
    { id: "CLM-2026-0912", type: "Heavy Rain Disruption",   amount: "₹325", status: "Processing",   color: "#F59E0B", date: "Mar 19, 2026", progress: 65, days: 1 },
    { id: "CLM-2026-0908", type: "Flood Zone Alert",        amount: "₹325", status: "Fraud Check",  color: "#8B5CF6", date: "Mar 17, 2026", progress: 40, days: 1 },
  ],
  settled: [
    { id: "CLM-2026-0891", type: "Heatwave — 2 days",       amount: "₹650", status: "Paid",  color: "#10B981", date: "Mar 10, 2026", progress: 100, days: 2 },
    { id: "CLM-2026-0874", type: "Bundh Shutdown",          amount: "₹325", status: "Paid",  color: "#10B981", date: "Feb 28, 2026", progress: 100, days: 1 },
    { id: "CLM-2026-0861", type: "Heavy Rain Disruption",   amount: "₹325", status: "Paid",  color: "#10B981", date: "Feb 22, 2026", progress: 100, days: 1 },
    { id: "CLM-2026-0840", type: "Flood Alert — 2 days",    amount: "₹650", status: "Paid",  color: "#10B981", date: "Feb 10, 2026", progress: 100, days: 2 },
  ],
};

const STATUS_COLORS = {
  Processing: "#F59E0B",
  "Fraud Check": "#8B5CF6",
  Paid: "#10B981",
  Rejected: "#F43F5E",
};

export default function ClaimsPage() {
  const [tab, setTab]       = useState("active");
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newClaim, setNewClaim]   = useState({ type: "", desc: "", date: "" });

  const claims = MOCK_CLAIMS[tab];

  const handleSubmit = async () => {
    setSubmitted(true);
    setTimeout(() => { setShowForm(false); setSubmitted(false); setNewClaim({ type: "", desc: "", date: "" }); }, 2200);
  };

  return (
    <div style={{ padding: "28px 24px", maxWidth: 760, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 14 }}>
        <div style={{ animation: "fadeUp 0.5s ease" }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: -0.3, marginBottom: 5 }}>
            Claims Center
          </h2>
          <p style={{ color: "#8896C8", fontSize: 14 }}>Track auto-triggered and manual claims</p>
        </div>
        <button onClick={() => setShowForm(true)} style={{
          padding: "11px 20px", borderRadius: 11, border: "none",
          background: "linear-gradient(135deg, #3B82F6, #6366F1)",
          color: "#fff", fontFamily: "'Syne',sans-serif",
          fontSize: 14, fontWeight: 700, cursor: "pointer",
          boxShadow: "0 6px 20px rgba(59,130,246,0.35)",
          animation: "fadeUp 0.5s ease 0.08s both",
        }}>+ File New Claim</button>
      </div>

      {/* Summary strip */}
      <div style={{
        display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap",
        animation: "fadeUp 0.5s ease 0.1s both",
      }}>
        {[
          { label: "Total Claims", value: MOCK_CLAIMS.active.length + MOCK_CLAIMS.settled.length, color: "#3B82F6" },
          { label: "Total Paid",   value: "₹1,950", color: "#10B981" },
          { label: "In Progress",  value: MOCK_CLAIMS.active.length, color: "#F59E0B" },
          { label: "Success Rate", value: "100%", color: "#8B5CF6" },
        ].map((s, i) => (
          <div key={i} style={{
            flex: "1 1 120px", padding: "14px 16px", borderRadius: 12,
            background: "rgba(13,27,75,0.65)", border: "1px solid rgba(255,255,255,0.07)",
          }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#8896C8", marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 20,
        background: "rgba(255,255,255,0.04)", borderRadius: 11, padding: 4, width: "fit-content",
        animation: "fadeUp 0.5s ease 0.14s both",
      }}>
        {["active", "settled"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "8px 20px", borderRadius: 9, border: "none", cursor: "pointer",
            background: tab === t ? "rgba(59,130,246,0.7)" : "transparent",
            color: "#fff", fontFamily: "'DM Sans',sans-serif",
            fontSize: 13, fontWeight: tab === t ? 600 : 400, transition: "all 0.18s",
            textTransform: "capitalize",
          }}>{t} ({MOCK_CLAIMS[t].length})</button>
        ))}
      </div>

      {/* Claims list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {claims.map((c, i) => (
          <div key={i} style={{
            background: "rgba(13,27,75,0.7)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16, padding: "22px 24px",
            animation: `fadeUp 0.4s ease ${i * 0.07}s both`,
            transition: "border-color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = `rgba(${c.color === "#10B981" ? "16,185,129" : c.color === "#F59E0B" ? "245,158,11" : "139,92,246"},0.3)`}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
              <div>
                <p style={{ fontSize: 12, color: "#8896C8", marginBottom: 4, fontFamily: "monospace" }}>{c.id}</p>
                <h4 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16 }}>{c.type}</h4>
                <p style={{ fontSize: 12, color: "#8896C8", marginTop: 3 }}>{c.date} · {c.days} disruption day{c.days > 1 ? "s" : ""}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, color: c.color }}>{c.amount}</p>
                <span style={{
                  display: "inline-block", marginTop: 5,
                  padding: "3px 11px", borderRadius: 20,
                  background: `rgba(${STATUS_COLORS[c.status] === "#F59E0B" ? "245,158,11" : STATUS_COLORS[c.status] === "#10B981" ? "16,185,129" : "139,92,246"},0.15)`,
                  color: STATUS_COLORS[c.status],
                  fontSize: 12, fontWeight: 600,
                }}>{c.status}</span>
              </div>
            </div>

            {/* Progress */}
            <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 5, overflow: "hidden", marginBottom: 6 }}>
              <div style={{
                height: "100%", borderRadius: 5,
                background: `linear-gradient(to right, ${c.color}88, ${c.color})`,
                width: `${c.progress}%`, transition: "width 1s ease",
              }} />
            </div>
            <p style={{ fontSize: 12, color: "#8896C8" }}>
              {c.progress}% processed
              {c.status === "Paid" && " · Auto-triggered, no manual claim needed"}
            </p>
          </div>
        ))}
      </div>

      {/* New Claim Form Modal */}
      {showForm && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20,
        }} onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div style={{
            width: "min(460px, 96vw)",
            background: "rgba(11,20,55,0.98)",
            border: "1px solid rgba(59,130,246,0.25)",
            borderRadius: 20, padding: "32px",
            animation: "fadeUp 0.35s ease",
          }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 56, marginBottom: 14 }}>✅</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", color: "#10B981", fontSize: 20, marginBottom: 8 }}>Claim Submitted!</h3>
                <p style={{ color: "#8896C8", fontSize: 14 }}>Our AI is reviewing your claim. You'll be notified within minutes.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>File Manual Claim</h3>

                <label style={ls}>Disruption Type</label>
                <select value={newClaim.type} onChange={e => setNewClaim(c => ({ ...c, type: e.target.value }))} style={is}>
                  <option value="" style={{ background: "#0B1437" }}>Select type</option>
                  {["Heavy Rain", "Flood", "Heatwave", "Curfew", "Bundh/Strike", "Pollution"].map(o => (
                    <option key={o} value={o} style={{ background: "#0B1437" }}>{o}</option>
                  ))}
                </select>

                <label style={{ ...ls, marginTop: 16 }}>Date of Disruption</label>
                <input type="date" value={newClaim.date} onChange={e => setNewClaim(c => ({ ...c, date: e.target.value }))} style={is} />

                <label style={{ ...ls, marginTop: 16 }}>Description (optional)</label>
                <textarea value={newClaim.desc} onChange={e => setNewClaim(c => ({ ...c, desc: e.target.value }))}
                  placeholder="Briefly describe the disruption…"
                  rows={3} style={{ ...is, resize: "vertical" }}
                />

                <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                  <button onClick={() => setShowForm(false)} style={{
                    flex: "0 0 auto", padding: "12px 20px", borderRadius: 11,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "none", color: "#E8EEFF",
                    fontFamily: "'DM Sans',sans-serif", cursor: "pointer",
                  }}>Cancel</button>
                  <button onClick={handleSubmit} style={{
                    flex: 1, padding: "12px",
                    borderRadius: 11, border: "none",
                    background: "linear-gradient(135deg, #3B82F6, #6366F1)",
                    color: "#fff", fontFamily: "'Syne',sans-serif",
                    fontSize: 15, fontWeight: 700, cursor: "pointer",
                  }}>Submit Claim →</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const ls = {
  display: "block", fontSize: 12, fontWeight: 600,
  color: "#8896C8", textTransform: "uppercase",
  letterSpacing: 0.8, marginBottom: 7,
};

const is = {
  width: "100%", padding: "12px 14px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 11, color: "#E8EEFF",
  fontSize: 14, outline: "none",
  fontFamily: "'DM Sans',sans-serif",
  transition: "border-color 0.2s",
};
