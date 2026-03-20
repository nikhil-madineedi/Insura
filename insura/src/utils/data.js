// ============================================================
//  INSURA — Shared Data & Constants
//  Source: Project Report (pricing model, plans, triggers)
// ============================================================

// ── Risk-Based Plans (from report p.10) ──────────────────────
export const RISK_PLANS = [
  {
    id: "low",
    name: "Low Risk",
    icon: "🌿",
    color: "#10B981",
    colorRgb: "16,185,129",
    weekly: 125,
    daily: 275,
    maxWeekly: 700,
    description: "Ideal for workers in low-disruption zones",
    features: [
      "Weather Shield (Basic)",
      "Flood Alert Cover",
      "Rain Disruption Pay",
      "SMS Alerts",
      "5-min payout processing",
    ],
  },
  {
    id: "medium",
    name: "Medium Risk",
    icon: "⚡",
    color: "#3B82F6",
    colorRgb: "59,130,246",
    weekly: 150,
    daily: 325,
    maxWeekly: 700,
    popular: true,
    description: "Best for urban delivery workers (Zomato/Swiggy)",
    features: [
      "Weather Shield (Pro)",
      "Flood + Heatwave Cover",
      "Curfew & Bundh Protection",
      "Pollution Alert Pay",
      "Instant payout (< 2 min)",
    ],
  },
  {
    id: "high",
    name: "High Risk",
    icon: "🔥",
    color: "#F97316",
    colorRgb: "249,115,22",
    weekly: 175,
    daily: 325,
    maxWeekly: 700,
    description: "Full protection for high-exposure zones",
    features: [
      "Full Weather Suite",
      "All Social Disruptions",
      "Zone Restriction Cover",
      "Strike & Bundh Pay",
      "Priority instant payout",
    ],
  },
];

// ── Fixed / Optional Plans (from report p.11) ─────────────────
export const FIXED_PLANS = [
  {
    id: "basic",
    name: "Basic",
    icon: "🌱",
    color: "#10B981",
    colorRgb: "16,185,129",
    weekly: 100,
    daily: 200,
    maxWeekly: 400,
    description: "Entry-level coverage for occasional workers",
    features: [
      "Rain Disruption Cover",
      "Basic flood alert",
      "Standard processing",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    icon: "⭐",
    color: "#3B82F6",
    colorRgb: "59,130,246",
    weekly: 200,
    daily: 400,
    maxWeekly: 800,
    description: "Balanced coverage with higher daily payouts",
    features: [
      "Weather + Social Cover",
      "Heatwave protection",
      "Fast 3-min processing",
      "SMS + App alerts",
    ],
  },
];

// ── Gig Platforms ─────────────────────────────────────────────
export const GIG_PLATFORMS = [
  { id: "zomato",  name: "Zomato",  icon: "🍕", color: "#EF4444" },
  { id: "swiggy",  name: "Swiggy",  icon: "🛵", color: "#F97316" },
  { id: "blinkit", name: "Blinkit", icon: "⚡", color: "#F59E0B" },
  { id: "amazon",  name: "Amazon",  icon: "📦", color: "#6366F1" },
  { id: "dunzo",   name: "Dunzo",   icon: "🏃", color: "#10B981" },
  { id: "zepto",   name: "Zepto",   icon: "🟣", color: "#8B5CF6" },
  { id: "other",   name: "Other",   icon: "🚴", color: "#8896C8" },
];

// ── Work Areas (AP focused + metros) ─────────────────────────
export const WORK_AREAS = [
  "Vijayawada", "Guntur", "Visakhapatnam", "Tirupati",
  "Rajahmundry", "Kakinada", "Nellore", "Kurnool",
  "Hyderabad", "Bengaluru", "Chennai", "Mumbai", "Delhi", "Pune",
];

// ── Disruption Triggers (from report p.10) ────────────────────
export const DISRUPTION_TRIGGERS = [
  { id: "rain",      label: "Heavy Rain",         threshold: "> 50mm/hr",   icon: "🌧", color: "#3B82F6" },
  { id: "flood",     label: "Flood Alert",         threshold: "Alert issued", icon: "🌊", color: "#6366F1" },
  { id: "heat",      label: "Extreme Heatwave",    threshold: "> 42°C",      icon: "🌡", color: "#F97316" },
  { id: "pollution", label: "Severe Pollution",    threshold: "AQI > 300",   icon: "😷", color: "#8B5CF6" },
  { id: "curfew",    label: "Curfew / Shutdown",   threshold: "Govt order",  icon: "🚫", color: "#F43F5E" },
  { id: "bundh",     label: "Bundh / Strike",      threshold: "Active",      icon: "✊", color: "#F59E0B" },
];

// ── Rainfall Risk Score Table (from report p.9) ───────────────
export const RAINFALL_SCORES = [
  { range: "0–5 mm/hr",   score: 0.1 },
  { range: "5–20 mm/hr",  score: 0.3 },
  { range: "20–50 mm/hr", score: 0.5 },
  { range: "50+ mm/hr",   score: 0.7 },
];

// ── Risk Calculation (Environmental 70% + Social 30%) ─────────
export function calculateRiskProbability(envScores, socialScores) {
  const envAvg = envScores.length
    ? envScores.reduce((a, b) => a + b, 0) / envScores.length
    : 0;
  const socialAvg = socialScores.length
    ? socialScores.reduce((a, b) => a + b, 0) / socialScores.length
    : 0;
  return (0.7 * envAvg) + (0.3 * socialAvg);
}

// ── Risk Level from Score ─────────────────────────────────────
export function getRiskLevel(score) {
  if (score < 0.3) return "low";
  if (score < 0.6) return "medium";
  return "high";
}
