import { DISRUPTION_TRIGGERS } from "../utils/data";

export default function AdminDashboardPage({ user, onNav }) {
  const metrics = [
    { label: "Active Riders", value: "2,180", icon: "🚴", color: "#3B82F6" },
    { label: "Weekly Premiums", value: "₹1.2M", icon: "💵", color: "#10B981" },
    { label: "Open Triggers", value: "14", icon: "⚡", color: "#F59E0B" },
    { label: "Pending Payouts", value: "₹326k", icon: "📤", color: "#8B5CF6" },
  ];

  const tasks = [
    { title: "Review risk thresholds", status: "Urgent", color: "#F97316" },
    { title: "Approve auto payouts", status: "Pending", color: "#3B82F6" },
    { title: "Monitor flood alerts", status: "Active", color: "#10B981" },
  ];

  return (
    <div style={{ padding: "28px 24px", maxWidth: 980, margin: "0 auto" }}>
      <div style={{ marginBottom: 26 }}>
        <p style={{ color: "#8896C8", fontSize: 14, marginBottom: 4 }}>Admin console</p>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, letterSpacing: -0.4 }}>
          Welcome back, {user?.name || "Admin"}
        </h2>
        <p style={{ color: "#8896C8", fontSize: 14, marginTop: 8 }}>
          Monitor payouts, approve workflows, and manage policies for gig workers across markets.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 22 }}>
        {metrics.map((m, idx) => (
          <div key={idx} style={{ padding: 20, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(13,27,75,0.65)" }}>
            <div style={{ fontSize: 24, marginBottom: 12 }}>{m.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: m.color }}>{m.value}</div>
            <div style={{ color: "#8896C8", marginTop: 5, fontSize: 13 }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 18, marginBottom: 22 }}>
        <div style={{ padding: 22, borderRadius: 20, background: "rgba(13,27,75,0.65)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <p style={{ color: "#8896C8", fontSize: 13, marginBottom: 4 }}>Live claim triggers</p>
              <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>Active disruptions</h3>
            </div>
            <button onClick={() => onNav("claims")} style={{ border: "none", background: "#3B82F6", color: "#fff", borderRadius: 12, padding: "10px 14px", cursor: "pointer" }}>
              View claims
            </button>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {DISRUPTION_TRIGGERS.slice(0, 4).map((trigger, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.04)" }}>
                <span>{trigger.icon} {trigger.label}</span>
                <span style={{ color: trigger.color, fontWeight: 700 }}>{trigger.threshold}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: 22, borderRadius: 20, background: "rgba(13,27,75,0.65)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ color: "#8896C8", fontSize: 13, marginBottom: 14 }}>Priority tasks</p>
          <div style={{ display: "grid", gap: 14 }}>
            {tasks.map((task, idx) => (
              <div key={idx} style={{ padding: 14, borderRadius: 14, background: "rgba(255,255,255,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ color: "#E8EEFF", fontWeight: 600 }}>{task.title}</span>
                  <span style={{ color: task.color, fontSize: 12, fontWeight: 700 }}>{task.status}</span>
                </div>
                <p style={{ color: "#8896C8", fontSize: 13, lineHeight: 1.7 }}>Review the latest payout and risk settings before the next weekly settlement.</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: 22, borderRadius: 20, background: "rgba(13,27,75,0.65)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Platform health</h3>
        <div style={{ display: "grid", gap: 12 }}>
          <StatusRow label="Fraud alerts" value="2 new" />
          <StatusRow label="Policy renewals" value="314 this week" />
          <StatusRow label="API latency" value="128 ms" />
          <StatusRow label="Claim approval rate" value="98%" />
        </div>
      </div>
    </div>
  );
}

function StatusRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.04)" }}>
      <span style={{ color: "#8896C8" }}>{label}</span>
      <span style={{ color: "#fff", fontWeight: 700 }}>{value}</span>
    </div>
  );
}
