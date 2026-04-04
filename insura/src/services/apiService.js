// ============================================================
//  apiService.js
//  Mock API Service — Weather, Disruption Detection, Claims
//  Phase 2: Automated triggers and real-time monitoring
// ============================================================

/**
 * Real-time disruption detection system
 * Simulates OpenWeather, Govt Alert APIs, City Shutdown APIs
 */

// ── Simulated Weather API Response ────────────────────────
export async function fetchWeatherData(location) {
  // Simulate API call delay
  await new Promise(r => setTimeout(r, 800));
  
  const locationData = {
    "Vijayawada": { rainfall: 45, temp: 38, aqi: 280, curfew: false, strike: true },
    "Guntur": { rainfall: 30, temp: 40, aqi: 200, curfew: false, strike: false },
    "Visakhapatnam": { rainfall: 65, temp: 36, aqi: 150, curfew: false, strike: false },
    "Hyderabad": { rainfall: 25, temp: 40, aqi: 320, curfew: true, strike: false },
    "Bengaluru": { rainfall: 15, temp: 35, aqi: 120, curfew: false, strike: false },
    "Chennai": { rainfall: 55, temp: 42, aqi: 280, curfew: false, strike: false },
    "Mumbai": { rainfall: 35, temp: 38, aqi: 200, curfew: false, strike: false },
    "Delhi": { rainfall: 10, temp: 43, aqi: 400, curfew: false, strike: true },
  };

  const data = locationData[location] || {
    rainfall: Math.random() * 100,
    temp: 35 + Math.random() * 10,
    aqi: 100 + Math.random() * 300,
    curfew: Math.random() > 0.8,
    strike: Math.random() > 0.85,
  };

  return {
    location,
    timestamp: new Date().toISOString(),
    weather: {
      rainfall: data.rainfall,      // mm/hr
      temperature: data.temp,       // Celsius
      aqi: Math.round(data.aqi),    // Air Quality Index
      humidity: 60 + Math.random() * 30,
      windSpeed: 10 + Math.random() * 20,
    },
    disruptions: {
      heavyRain: data.rainfall > 50,
      flood: data.rainfall > 60,
      heatwave: data.temp > 41,
      pollution: data.aqi > 300,
      curfew: data.curfew,
      strike: data.strike,
    },
  };
}

// ── Disruption Event Detection ────────────────────────────
export function detectDisruptionEvents(weatherData) {
  const events = [];
  const { disruptions, weather } = weatherData;

  if (disruptions.heavyRain) {
    events.push({
      type: "HEAVY_RAIN",
      icon: "🌧",
      label: "Heavy Rain Detected",
      severity: "high",
      payoutMultiplier: 1.2,
      threshold: `${Math.round(weather.rainfall)} mm/hr (> 50mm/hr)`,
    });
  }

  if (disruptions.flood) {
    events.push({
      type: "FLOOD",
      icon: "🌊",
      label: "Flood Alert",
      severity: "critical",
      payoutMultiplier: 1.5,
      threshold: "Flash flood warning issued",
    });
  }

  if (disruptions.heatwave) {
    events.push({
      type: "HEATWAVE",
      icon: "🌡",
      label: "Extreme Heat",
      severity: "high",
      payoutMultiplier: 1.1,
      threshold: `${Math.round(weather.temperature)}°C (> 41°C)`,
    });
  }

  if (disruptions.pollution) {
    events.push({
      type: "POLLUTION",
      icon: "😷",
      label: "Severe Air Pollution",
      severity: "medium",
      payoutMultiplier: 1.0,
      threshold: `AQI ${weather.aqi} (> 300)`,
    });
  }

  if (disruptions.curfew) {
    events.push({
      type: "CURFEW",
      icon: "🚫",
      label: "Curfew / Lockdown",
      severity: "critical",
      payoutMultiplier: 1.3,
      threshold: "Government order issued",
    });
  }

  if (disruptions.strike) {
    events.push({
      type: "STRIKE",
      icon: "✊",
      label: "Bundh / Strike Active",
      severity: "high",
      payoutMultiplier: 1.2,
      threshold: "Ongoing labor action",
    });
  }

  return events;
}

// ── Automatic Claim Trigger ───────────────────────────────
export function createAutoClaimFromEvent(event, userPlan) {
  const claimId = `CLM-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
  
  return {
    id: claimId,
    type: "AUTO_TRIGGER",
    eventType: event.type,
    eventLabel: event.label,
    eventIcon: event.icon,
    status: "PROCESSING",
    createdAt: new Date().toISOString(),
    processedAt: null,
    amount: Math.round(userPlan.daily * event.payoutMultiplier),
    reason: `Automatic payout triggered: ${event.label}`,
    fraudScore: Math.random() * 0.15, // Very low fraud risk for auto-claims
    verificationLayers: [
      { check: "IP-GPS Cross-Check", status: "PASS" },
      { check: "Device Fingerprint", status: "PASS" },
      { check: "Movement Analysis", status: "PASS" },
      { check: "API Disruption Confirmation", status: "PASS" },
    ],
  };
}

// ── Dynamic Premium Calculation (ML-based) ─────────────────
export function calculateDynamicPremium(baseWeekly, riskFactors) {
  /**
   * ML Algorithm: Adjust premium based on:
   * - Historical disruption frequency in the zone
   * - Weather patterns (seasonal)
   * - Delivery performance (low fraud risk = discount)
   * - Time of day work patterns
   */
  
  let adjustment = 1.0;

  // Factor 1: Historical disruption frequency (0.8 to 1.3x)
  adjustment *= (0.8 + riskFactors.historicalDisruptionRate * 0.5);

  // Factor 2: Seasonal weather risk (0.9 to 1.2x)
  adjustment *= (0.9 + riskFactors.seasonalWeatherRisk * 0.3);

  // Factor 3: Fraud risk / Trust score (0.85 to 1.0x) — loyal riders get discount
  adjustment *= (0.85 + riskFactors.trustScore * 0.15);

  // Factor 4: Peak hours worked (1.0 to 1.1x) — night delivery = higher risk
  if (riskFactors.peakHoursPercentage > 0.6) {
    adjustment *= 1.1;
  }

  // Floor at 0.7x (max 30% discount), cap at 1.35x (max 35% premium)
  adjustment = Math.max(0.7, Math.min(1.35, adjustment));

  const dynamicWeekly = Math.round(baseWeekly * adjustment);
  const weeklyDiscount = baseWeekly - dynamicWeekly;

  return {
    baseWeekly,
    dynamicWeekly,
    weeklyDiscount,
    adjustmentFactor: adjustment.toFixed(2),
    reason: generateReasonText(riskFactors, adjustment),
  };
}

function generateReasonText(factors, adjustment) {
  if (adjustment < 0.9) {
    return `✓ 🎯 Loyal Rider Discount: Safe zone + High trust score`;
  }
  if (adjustment > 1.2) {
    return `⚠ High-Risk Zone: Frequent disruptions + seasonal weather`;
  }
  return `Standard premium for your area`;
}

// ── Policy Management CRUD ────────────────────────────────
export async function createInsurancePolicy(userForm) {
  await new Promise(r => setTimeout(r, 1200));

  const policyId = `POL-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

  return {
    policyId,
    userId: userForm.userId || "USER-001",
    riderId: `RIDER-${userForm.email.split("@")[0].toUpperCase()}`,
    holder: userForm.name,
    platform: userForm.platform,
    workArea: userForm.workArea,
    vehicleType: userForm.vehicleType,
    planId: userForm.plan,
    status: "ACTIVE",
    activatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    premiumBillingDay: 1,
    nextBillingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

// ── Fetch Policy Status ────────────────────────────────────
export async function getPolicyStatus(policyId) {
  await new Promise(r => setTimeout(r, 500));

  return {
    policyId,
    status: "ACTIVE",
    coverageActive: true,
    lastPremiumPaid: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    nextDueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    claimsThisMonth: 2,
    totalPayoutsThisMonth: 650,
    fraudScore: 0.05,
  };
}

// ── Claims Processing Pipeline ────────────────────────────
export async function submitClaim(policyId, claimData) {
  await new Promise(r => setTimeout(r, 2000));

  const fraudCheckResult = runFraudDetection(claimData);
  const verificationLayers = runMultiLayerVerification(claimData);

  return {
    claimId: claimData.id || `CLM-${Date.now()}`,
    policyId,
    status: fraudCheckResult.score < 0.2 ? "APPROVED" : "REVIEW",
    fraudScore: fraudCheckResult.score,
    fraudReason: fraudCheckResult.reason,
    verificationLayers,
    approvalTime: fraudCheckResult.score < 0.2 ? "< 2 minutes" : "24-48 hours",
    payoutScheduled: fraudCheckResult.score < 0.2,
    estimatedPayout: claimData.amount,
  };
}

function runFraudDetection(claimData) {
  /**
   * Fraud Detection Layers:
   * 1. IP vs GPS cross-check
   * 2. Device fingerprint
   * 3. Delivery data validation
   * 4. Movement pattern analysis
   * 5. Historical claim pattern
   */
  
  const fraudScore = Math.random() * 0.1; // Mostly legitimate

  if (claimData.type === "AUTO_TRIGGER") {
    return {
      score: fraudScore * 0.5, // Auto-claims are very safe
      reason: "API-confirmed disruption event",
    };
  }

  return {
    score: fraudScore,
    reason: "Standard verification passed",
  };
}

function runMultiLayerVerification(claimData) {
  return [
    { layer: "IP-GPS Cross-Check", status: "PASS", timestamp: new Date().toISOString() },
    { layer: "Device Fingerprint Match", status: "PASS", timestamp: new Date().toISOString() },
    { layer: "Delivery API Validation", status: "PASS", timestamp: new Date().toISOString() },
    { layer: "Movement Pattern Analysis", status: "PASS", timestamp: new Date().toISOString() },
    { layer: "Historical Claim Review", status: "PASS", timestamp: new Date().toISOString() },
  ];
}

// ── Real-time Monitoring Dashboard ────────────────────────
export async function getRealtimeMonitoringData(userLocation) {
  const weather = await fetchWeatherData(userLocation);
  const events = detectDisruptionEvents(weather);

  return {
    location: userLocation,
    weather,
    activeEvents: events,
    riskLevel: events.length > 2 ? "HIGH" : events.length > 0 ? "MEDIUM" : "LOW",
    nextCheckIn: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
  };
}
