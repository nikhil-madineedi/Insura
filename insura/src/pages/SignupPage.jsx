import { useState } from "react";
import { GlowOrb, RainParticle, InsuraLogo, Spinner, PlanCard } from "../components/SharedComponents";
import { GIG_PLATFORMS, WORK_AREAS, RISK_PLANS, FIXED_PLANS } from "../utils/data";

// ============================================================
//  SignupPage.jsx
//  Multi-step registration:
//  Step 1 → Personal details
//  Step 2 → Work details (platform + area)
//  Step 3 → Plan selection
//  Step 4 → Confirmation
// ============================================================

const TOTAL_STEPS = 4;

export default function SignupPage({ onSignup, onGoLogin }) {
  const [step, setStep]       = useState(1);
  const [loading, setLoading] = useState(false);
  const [planType, setPlanType] = useState("risk"); // "risk" | "fixed"

  const [form, setForm] = useState({
    // Step 1
    name: "", email: "", phone: "", password: "", confirmPw: "",
    // Step 2
    platform: "", workArea: "", vehicleType: "two-wheeler",
    // Step 3
    plan: "medium",
  });

  const [errors, setErrors] = useState({});

  const update = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: "" }));
  };

  // ── Validation per step ──────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (step === 1) {
      if (!form.name.trim())     errs.name = "Name is required";
      if (!form.email.trim())    errs.email = "Email is required";
      if (!form.phone.trim())    errs.phone = "Phone is required";
      if (form.password.length < 6) errs.password = "Min 6 characters";
      if (form.password !== form.confirmPw) errs.confirmPw = "Passwords don't match";
    }
    if (step === 2) {
      if (!form.platform) errs.platform = "Select your gig platform";
      if (!form.workArea) errs.workArea = "Select your work area";
    }
    if (step === 3) {
      if (!form.plan) errs.plan = "Please select a plan";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = async () => {
    if (!validate()) return;
    if (step < TOTAL_STEPS - 1) { setStep(s => s + 1); return; }
    // Final submit
    setLoading(true);
    await new Promise(r => setTimeout(r, 1600));
    setLoading(false);
    setStep(TOTAL_STEPS); // confirmation
  };

  const allPlans = planType === "risk" ? RISK_PLANS : FIXED_PLANS;
  const particles = Array.from({ length: 16 }, (_, i) => ({ delay: (i * 0.3) % 2, x: `${(i * 6.4) % 100}%` }));

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(140deg, #030A1E 0%, #060E28 55%, #0C1B50 100%)",
      position: "relative", overflow: "hidden",
      display: "flex", alignItems: step < TOTAL_STEPS ? "flex-start" : "center",
      justifyContent: "center", paddingTop: step < TOTAL_STEPS ? 40 : 0, paddingBottom: 40,
    }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {particles.map((p, i) => <RainParticle key={i} {...p} />)}
      </div>
      <GlowOrb color="#8B5CF6" size={500} x="-10%" y="-10%" blur={150} opacity={0.10} />
      <GlowOrb color="#3B82F6" size={380} x="70%"  y="60%"  blur={120} opacity={0.09} />

      {step === TOTAL_STEPS
        ? <SuccessScreen form={form} allPlans={allPlans} onLogin={() => onSignup(form)} />
        : (
          <div style={{
            position: "relative", zIndex: 1,
            width: step === 3 ? "min(860px, 96vw)" : "min(480px, 94vw)",
            background: "rgba(11,20,55,0.82)",
            border: "1px solid rgba(99,102,241,0.22)",
            borderRadius: 24, padding: "38px 36px",
            backdropFilter: "blur(28px)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
            animation: "fadeUp 0.5s ease",
          }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <InsuraLogo size={38} fontSize={20} />
              <StepIndicator current={step} total={TOTAL_STEPS - 1} />
            </div>

            {/* Step content */}
            {step === 1 && <Step1 form={form} update={update} errors={errors} />}
            {step === 2 && <Step2 form={form} update={update} errors={errors} />}
            {step === 3 && (
              <Step3
                form={form} update={update} errors={errors}
                planType={planType} setPlanType={setPlanType}
                allPlans={allPlans}
              />
            )}

            {/* Navigation */}
            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)} style={{
                  flex: "0 0 auto", padding: "13px 22px", borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#E8EEFF", fontFamily: "'DM Sans',sans-serif",
                  fontSize: 15, cursor: "pointer",
                }}>← Back</button>
              )}
              <button onClick={next} disabled={loading} style={{
                flex: 1, padding: "14px",
                borderRadius: 12, border: "none",
                background: loading ? "rgba(99,102,241,0.35)" : "linear-gradient(135deg, #6366F1, #3B82F6)",
                color: "#fff", fontFamily: "'Syne',sans-serif",
                fontSize: 16, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : "0 8px 28px rgba(99,102,241,0.38)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                transition: "all 0.2s",
              }}>
                {loading
                  ? <><Spinner size={18} color="#fff" /> Creating account…</>
                  : step === TOTAL_STEPS - 1 ? "Create Account 🎉" : "Continue →"
                }
              </button>
            </div>

            <p style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "#8896C8" }}>
              Already a rider?{" "}
              <span onClick={onGoLogin} style={{ color: "#3B82F6", cursor: "pointer", fontWeight: 600 }}>Sign in</span>
            </p>
          </div>
        )
      }
    </div>
  );
}

// ── Step Indicator ─────────────────────────────────────────────
function StepIndicator({ current, total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        const done   = n < current;
        const active = n === current;
        return (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: done ? "#10B981" : active ? "linear-gradient(135deg,#6366F1,#3B82F6)" : "rgba(255,255,255,0.06)",
              border: `2px solid ${done ? "#10B981" : active ? "#6366F1" : "rgba(255,255,255,0.12)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "#fff",
              transition: "all 0.25s",
            }}>{done ? "✓" : n}</div>
            {n < total && (
              <div style={{
                width: 24, height: 2, borderRadius: 1,
                background: done ? "#10B981" : "rgba(255,255,255,0.08)",
                transition: "background 0.25s",
              }} />
            )}
          </div>
        );
      })}
      <span style={{ marginLeft: 6, fontSize: 12, color: "#8896C8" }}>
        {current}/{total}
      </span>
    </div>
  );
}

// ── Step 1: Personal Info ──────────────────────────────────────
function Step1({ form, update, errors }) {
  return (
    <div style={{ animation: "slideInRight 0.35s ease" }}>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
        Personal Details
      </h2>
      <p style={{ color: "#8896C8", fontSize: 14, marginBottom: 24 }}>
        Create your Insura rider account
      </p>

      <Field label="Full Name" error={errors.name}>
        <input value={form.name} onChange={e => update("name", e.target.value)}
          placeholder="Ravi Kumar" style={iStyle(errors.name)}
          onFocus={e => e.target.style.borderColor = "#6366F1"}
          onBlur={e => e.target.style.borderColor = errors.name ? "#F43F5E" : "rgba(255,255,255,0.1)"}
        />
      </Field>

      <Field label="Email Address" error={errors.email} mt>
        <input value={form.email} onChange={e => update("email", e.target.value)}
          placeholder="ravi@example.com" style={iStyle(errors.email)}
          onFocus={e => e.target.style.borderColor = "#6366F1"}
          onBlur={e => e.target.style.borderColor = errors.email ? "#F43F5E" : "rgba(255,255,255,0.1)"}
        />
      </Field>

      <Field label="Phone Number" error={errors.phone} mt>
        <input value={form.phone} onChange={e => update("phone", e.target.value)}
          placeholder="+91 98765 43210" style={iStyle(errors.phone)}
          onFocus={e => e.target.style.borderColor = "#6366F1"}
          onBlur={e => e.target.style.borderColor = errors.phone ? "#F43F5E" : "rgba(255,255,255,0.1)"}
        />
      </Field>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 18 }}>
        <Field label="Password" error={errors.password}>
          <input type="password" value={form.password} onChange={e => update("password", e.target.value)}
            placeholder="Min 6 chars" style={iStyle(errors.password)}
            onFocus={e => e.target.style.borderColor = "#6366F1"}
            onBlur={e => e.target.style.borderColor = errors.password ? "#F43F5E" : "rgba(255,255,255,0.1)"}
          />
        </Field>
        <Field label="Confirm Password" error={errors.confirmPw}>
          <input type="password" value={form.confirmPw} onChange={e => update("confirmPw", e.target.value)}
            placeholder="Re-enter" style={iStyle(errors.confirmPw)}
            onFocus={e => e.target.style.borderColor = "#6366F1"}
            onBlur={e => e.target.style.borderColor = errors.confirmPw ? "#F43F5E" : "rgba(255,255,255,0.1)"}
          />
        </Field>
      </div>
    </div>
  );
}

// ── Step 2: Work Details ───────────────────────────────────────
function Step2({ form, update, errors }) {
  return (
    <div style={{ animation: "slideInRight 0.35s ease" }}>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
        Work Details
      </h2>
      <p style={{ color: "#8896C8", fontSize: 14, marginBottom: 24 }}>
        Tell us where you work and which platform
      </p>

      {/* Platform */}
      <label style={lStyle}>Gig Platform you work with</label>
      {errors.platform && <span style={errStyle}>{errors.platform}</span>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
        {GIG_PLATFORMS.map(p => (
          <button key={p.id} onClick={() => update("platform", p.id)} style={{
            padding: "12px 8px", borderRadius: 12, border: "none", cursor: "pointer",
            background: form.platform === p.id
              ? `rgba(99,102,241,0.18)` : "rgba(255,255,255,0.04)",
            borderWidth: 1.5, borderStyle: "solid",
            borderColor: form.platform === p.id ? "#6366F1" : "rgba(255,255,255,0.08)",
            color: "#fff", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 5,
            transition: "all 0.18s",
          }}>
            <span style={{ fontSize: 22 }}>{p.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: form.platform === p.id ? "#C4B5FD" : "#8896C8" }}>
              {p.name}
            </span>
          </button>
        ))}
      </div>

      {/* Work Area */}
      <label style={lStyle}>Primary Work Area</label>
      {errors.workArea && <span style={errStyle}>{errors.workArea}</span>}
      <select
        value={form.workArea}
        onChange={e => update("workArea", e.target.value)}
        style={{
          ...iStyle(errors.workArea),
          appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238896C8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
          paddingRight: 36,
          cursor: "pointer",
        }}
      >
        <option value="" style={{ background: "#0B1437" }}>Select your city / area</option>
        {WORK_AREAS.map(a => (
          <option key={a} value={a} style={{ background: "#0B1437" }}>{a}</option>
        ))}
      </select>

      {/* Vehicle */}
      <label style={{ ...lStyle, marginTop: 20 }}>Vehicle Type</label>
      <div style={{ display: "flex", gap: 10, marginTop: 2 }}>
        {["two-wheeler", "four-wheeler", "bicycle"].map(v => (
          <button key={v} onClick={() => update("vehicleType", v)} style={{
            flex: 1, padding: "11px 10px", borderRadius: 11, border: "none",
            cursor: "pointer",
            background: form.vehicleType === v ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)",
            borderWidth: 1.5, borderStyle: "solid",
            borderColor: form.vehicleType === v ? "#6366F1" : "rgba(255,255,255,0.08)",
            color: form.vehicleType === v ? "#C4B5FD" : "#8896C8",
            fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500,
            transition: "all 0.18s", textTransform: "capitalize",
          }}>
            {v === "two-wheeler" ? "🛵" : v === "four-wheeler" ? "🚗" : "🚲"} {v}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Step 3: Plan Selection ─────────────────────────────────────
function Step3({ form, update, errors, planType, setPlanType, allPlans }) {
  return (
    <div style={{ animation: "slideInRight 0.35s ease" }}>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
        Choose Your Plan
      </h2>
      <p style={{ color: "#8896C8", fontSize: 14, marginBottom: 20 }}>
        Select weekly income protection that fits your needs
      </p>

      {/* Plan type toggle */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 24,
        background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4,
        width: "fit-content",
      }}>
        {[
          { id: "risk",  label: "AI Risk-Based Plans" },
          { id: "fixed", label: "Fixed Plans" },
        ].map(t => (
          <button key={t.id} onClick={() => { setPlanType(t.id); update("plan", ""); }} style={{
            padding: "8px 18px", borderRadius: 9, border: "none", cursor: "pointer",
            background: planType === t.id ? "rgba(99,102,241,0.75)" : "transparent",
            color: "#fff", fontFamily: "'DM Sans',sans-serif",
            fontSize: 13, fontWeight: planType === t.id ? 600 : 400,
            transition: "all 0.18s",
          }}>{t.label}</button>
        ))}
      </div>

      {errors.plan && (
        <div style={{ ...errStyle, display: "block", marginBottom: 16 }}>{errors.plan}</div>
      )}

      {/* Plan cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${allPlans.length}, 1fr)`,
        gap: 16,
      }}>
        {allPlans.map(p => (
          <PlanCard key={p.id} plan={p} selected={form.plan} onSelect={id => update("plan", id)} />
        ))}
      </div>

      {/* Pricing info banner */}
      <div style={{
        marginTop: 20, padding: "14px 18px", borderRadius: 12,
        background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
        fontSize: 13, color: "#8896C8", lineHeight: 1.6,
      }}>
        💡 <strong style={{ color: "#E8EEFF" }}>Parametric model:</strong> Payouts are automatic — triggered when rain exceeds thresholds, floods are detected, or govt disruptions occur. No manual claims needed.
      </div>
    </div>
  );
}

// ── Success / Confirmation ─────────────────────────────────────
function SuccessScreen({ form, allPlans, onLogin }) {
  const allP = [...(allPlans || []), ...RISK_PLANS, ...FIXED_PLANS];
  const chosen = allP.find(p => p.id === form.plan) || RISK_PLANS[1];
  const platform = GIG_PLATFORMS.find(p => p.id === form.platform);

  return (
    <div style={{
      position: "relative", zIndex: 1,
      width: "min(480px, 94vw)",
      background: "rgba(11,20,55,0.85)",
      border: "1px solid rgba(16,185,129,0.3)",
      borderRadius: 24, padding: "44px 38px",
      backdropFilter: "blur(28px)",
      boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
      textAlign: "center",
      animation: "countUp 0.6s ease",
    }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color: "#10B981", marginBottom: 8 }}>
        Welcome to Insura!
      </h2>
      <p style={{ color: "#8896C8", marginBottom: 28, fontSize: 15, lineHeight: 1.6 }}>
        Account created for <strong style={{ color: "#E8EEFF" }}>{form.name}</strong>.<br/>
        Your <strong style={{ color: chosen.color }}>{chosen.name} Plan</strong> is now active.
      </p>

      {/* Summary card */}
      <div style={{
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14, padding: "18px 20px", marginBottom: 28, textAlign: "left",
      }}>
        {[
          ["Rider",    form.name],
          ["Platform", `${platform?.icon || ""} ${platform?.name || form.platform}`],
          ["Area",     form.workArea],
          ["Plan",     `${chosen.name} — ₹${chosen.weekly}/week`],
          ["Daily pay","₹" + chosen.daily + " (on disruption)"],
        ].map(([k, v]) => (
          <div key={k} style={{
            display: "flex", justifyContent: "space-between",
            padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
            fontSize: 14,
          }}>
            <span style={{ color: "#8896C8" }}>{k}</span>
            <span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>

      <button onClick={onLogin} style={{
        width: "100%", padding: "15px", borderRadius: 13, border: "none",
        background: "linear-gradient(135deg, #10B981, #3B82F6)",
        color: "#fff", fontFamily: "'Syne',sans-serif",
        fontSize: 16, fontWeight: 700, cursor: "pointer",
        boxShadow: "0 8px 28px rgba(16,185,129,0.35)",
      }}>Go to Dashboard →</button>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────
function Field({ label, error, children, mt }) {
  return (
    <div style={{ marginTop: mt ? 0 : 0 }}>
      <label style={lStyle}>{label}</label>
      {children}
      {error && <span style={errStyle}>{error}</span>}
    </div>
  );
}

const lStyle = {
  display: "block", fontSize: 12, fontWeight: 600,
  color: "#8896C8", textTransform: "uppercase",
  letterSpacing: 0.8, marginBottom: 7,
};
const errStyle = { fontSize: 12, color: "#F43F5E", marginTop: 4, display: "block" };

function iStyle(err) {
  return {
    width: "100%", padding: "12px 15px",
    background: "rgba(255,255,255,0.05)",
    border: `1px solid ${err ? "#F43F5E" : "rgba(255,255,255,0.1)"}`,
    borderRadius: 11, color: "#E8EEFF",
    fontSize: 15, outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.2s",
  };
}
