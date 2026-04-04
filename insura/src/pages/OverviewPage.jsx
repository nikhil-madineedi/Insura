import { useEffect, useState } from "react";
import { GlowOrb, Spinner } from "../components/SharedComponents";

export default function OverviewPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 120); }, []);

  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 80px)", padding: "24px 20px" }}>
      <GlowOrb color="#3B82F6" size={520} x="-15%" y="-20%" blur={160} opacity={0.10} />
      <GlowOrb color="#F97316" size={360} x="70%" y="-10%" blur={110} opacity={0.08} />
      <GlowOrb color="#10B981" size={260} x="80%" y="60%" blur={90} opacity={0.06} />

      <div style={{ position: "relative", zIndex: 1, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(18px)", transition: "all 0.35s ease" }}>
        <div style={{ marginBottom: 28 }}>
          <span style={{ color: "#3B82F6", fontSize: 14, fontWeight: 700, letterSpacing: 0.8 }}>AI-Powered Insurance</span>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 38, fontWeight: 800, margin: "12px 0", lineHeight: 1.05, maxWidth: 760 }}>
            Income protection for India’s gig workers during climate disruption
          </h1>
          <p style={{ color: "#8896C8", fontSize: 15, maxWidth: 760, lineHeight: 1.85 }}>
            A digital platform that automatically detects extreme weather, shutdowns, and curfews — then pays gig workers fast without manual claims.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 28 }}>
          {[
            { title: "Problem Statement", items: [
              "Gig delivery workers depend on daily income.",
              "Heavy rain, floods, heatwaves, curfews, and bandh stop orders.",
              "Most workers lack income protection and insurance.",
            ]},
            { title: "Goal", items: [
              "Build weekly income protection for climate disruption.",
              "Offer fast, parametric payouts based on thresholds.",
              "Let workers access protection via browser.",
            ]},
          ].map((block, index) => (
            <div key={index} style={{ padding: 20, borderRadius: 20, background: "rgba(13,27,75,0.75)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h2 style={{ color: "#fff", fontSize: 18, marginBottom: 14 }}>{block.title}</h2>
              <ul style={{ color: "#8896C8", lineHeight: 1.9, fontSize: 14, paddingLeft: 18 }}>
                {block.items.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gap: 18 }}>
          <Section title="Persona-Based Scenarios" description="Sample user journeys for delivery riders and gig workers." items={[
            { title: "Ravi — Swiggy rider", description: "Registers, subscribes, heavy rain triggers city shutdown, auto payout processed after 3 days without manual claim." },
            { title: "Aisha — Zomato rider", description: "Signs up, curfew alert is detected from API, compensation is triggered instantly." },
          ]} />

          <Section title="Workflow" description="How the platform onboards workers, monitors risks, and settles weekly payouts." items={[
            { title: "Worker registration", description: "Phone sign-up with gig platform and city/area details." },
            { title: "Weekly subscription", description: "Worker pays a small weekly premium for protection." },
            { title: "Monitoring events", description: "Weather, government alerts, city shutdowns, and rainfall thresholds are tracked." },
            { title: "Parametric trigger", description: "If thresholds are met, payout is automatically triggered." },
            { title: "Weekly settlement", description: "Payouts are issued for triggered events; premiums pool when no event occurs." },
          ]} />

          <Section title="Parametric Premium Model" description="Automatic payouts based on thresholds, not manual claims." items={[
            { title: "Fast payouts", description: "No cumbersome claim filing." },
            { title: "Transparent rules", description: "Payments are based on clearly defined weather and alert thresholds." },
            { title: "Automated triggers", description: "Rainfall, temperature, curfews and flood warnings start payouts." },
          ]} />

          <Section title="AI / ML Integration" description="How intelligence powers climate prediction, fraud detection and premium pricing." items={[
            { title: "Climate risk prediction", description: "Weather data predicts rainfall intensity and flood probability." },
            { title: "Fraud detection", description: "Anomaly detection flags suspicious accounts and claims." },
            { title: "Premium calculation", description: "Models adapt premiums using city risk, weather history and user activity." },
          ]} />
        </div>

        <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { title: "Frontend", value: "React + Tailwind CSS" },
            { title: "Backend", value: "Spring Boot" },
            { title: "Database", value: "MongoDB" },
            { title: "Cloud", value: "AWS Lambda + API Gateway + DynamoDB" },
            { title: "APIs", value: "OpenWeather + monitoring feeds" },
          ].map((item, idx) => (
            <div key={idx} style={{ padding: 18, borderRadius: 18, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 12, color: "#8896C8", marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
      {!loaded && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><Spinner /></div>}
    </div>
  );
}

function Section({ title, description, items }) {
  return (
    <div style={{ padding: 20, borderRadius: 20, background: "rgba(13,27,75,0.75)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <h2 style={{ color: "#fff", fontSize: 18, marginBottom: 8 }}>{title}</h2>
      <p style={{ color: "#8896C8", fontSize: 14, marginBottom: 18 }}>{description}</p>
      <div style={{ display: "grid", gap: 12 }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ padding: 16, borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ color: "#E8EEFF", fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
            <div style={{ color: "#8896C8", fontSize: 13, lineHeight: 1.8 }}>{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
