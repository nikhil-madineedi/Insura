import { useState, useEffect } from "react";
import { GlowOrb, RainParticle, InsuraLogo, Spinner } from "../components/SharedComponents";

// ============================================================
//  LoginPage.jsx
//  Sign-in screen for returning Insura riders
// ============================================================

export default function LoginPage({ onLogin, onGoSignup }) {
  const [form, setForm]       = useState({ email: "", password: "" });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  // 20 rain particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    delay: (i * 0.28) % 2.2,
    x: `${(i * 5.3) % 100}%`,
  }));

  const handleLogin = async () => {
    if (!form.email.trim()) { setError("Please enter your email."); return; }
    if (!form.password)     { setError("Please enter your password."); return; }
    setError("");
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    const name = form.email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim() || "Rider";
    onLogin({ name, email: form.email, plan: "medium" });
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(140deg, #030A1E 0%, #060E28 55%, #0C1B50 100%)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Rain background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {particles.map((p, i) => <RainParticle key={i} {...p} />)}
      </div>

      {/* Glow orbs */}
      <GlowOrb color="#3B82F6" size={600} x="-15%" y="-20%" blur={160} opacity={0.12} />
      <GlowOrb color="#8B5CF6" size={400} x="65%"  y="55%"  blur={120} opacity={0.10} />
      <GlowOrb color="#10B981" size={280} x="80%"  y="-5%"  blur={90}  opacity={0.08} />

      {/* Card */}
      <div style={{
        position: "relative", zIndex: 1,
        width: "min(430px, 92vw)",
        background: "rgba(11,20,55,0.80)",
        border: "1px solid rgba(59,130,246,0.22)",
        borderRadius: 24,
        padding: "44px 38px",
        backdropFilter: "blur(28px)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
      }}>

        {/* Top logo */}
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <div style={{ display: "inline-block", marginBottom: 14 }}>
            <InsuraLogo size={56} fontSize={26} />
          </div>
          <p style={{ fontSize: 13, color: "#8896C8", letterSpacing: 0.4 }}>
            AI-Based Gig Worker Insurance
          </p>
        </div>

        {/* Divider */}
        <div style={{
          height: 1, margin: "22px 0 28px",
          background: "linear-gradient(to right, transparent, rgba(59,130,246,0.35), transparent)",
        }} />

        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: 22, marginBottom: 24, letterSpacing: -0.3,
        }}>Welcome back 👋</h2>

        {/* Email */}
        <label style={labelStyle}>Email / Phone</label>
        <input
          className="input-field"
          value={form.email}
          onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setError(""); }}
          placeholder="ravi@example.com"
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = "#3B82F6"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
        />

        {/* Password */}
        <label style={{ ...labelStyle, marginTop: 18 }}>Password</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPw ? "text" : "password"}
            value={form.password}
            onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setError(""); }}
            placeholder="••••••••"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{ ...inputStyle, paddingRight: 46 }}
            onFocus={e => e.target.style.borderColor = "#3B82F6"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
          />
          <button onClick={() => setShowPw(s => !s)} style={{
            position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", cursor: "pointer",
            color: "#8896C8", fontSize: 16, padding: 2,
          }}>{showPw ? "🙈" : "👁"}</button>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            marginTop: 12, padding: "10px 14px", borderRadius: 10,
            background: "rgba(244,63,94,0.10)", border: "1px solid rgba(244,63,94,0.28)",
            color: "#F43F5E", fontSize: 13, display: "flex", alignItems: "center", gap: 8,
          }}>⚠ {error}</div>
        )}

        {/* Forgot */}
        <div style={{ textAlign: "right", marginTop: 10 }}>
          <span style={{ color: "#3B82F6", fontSize: 13, cursor: "pointer" }}>Forgot password?</span>
        </div>

        {/* Submit */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%", marginTop: 22, padding: "15px",
            borderRadius: 13, border: "none",
            background: loading
              ? "rgba(59,130,246,0.35)"
              : "linear-gradient(135deg, #3B82F6, #6366F1)",
            color: "#fff",
            fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700,
            letterSpacing: 0.3,
            boxShadow: loading ? "none" : "0 8px 28px rgba(59,130,246,0.38)",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
        >
          {loading
            ? <><Spinner size={18} color="#fff" /> Signing in…</>
            : "Sign In →"
          }
        </button>

        {/* Signup link */}
        <p style={{ textAlign: "center", marginTop: 22, fontSize: 14, color: "#8896C8" }}>
          New rider?{" "}
          <span
            onClick={onGoSignup}
            style={{ color: "#3B82F6", cursor: "pointer", fontWeight: 600 }}
          >Create an account</span>
        </p>

        {/* Security */}
        <div style={{
          marginTop: 24, padding: "11px 14px", borderRadius: 10,
          background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)",
          fontSize: 12, color: "#10B981", textAlign: "center", letterSpacing: 0.2,
        }}>
          🔒 256-bit encrypted · IRDAI compliant · Zero data sold
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: 12, fontWeight: 600,
  color: "#8896C8",
  textTransform: "uppercase", letterSpacing: 0.8,
  marginBottom: 7,
};

const inputStyle = {
  width: "100%", padding: "13px 16px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12, color: "#E8EEFF",
  fontSize: 15, outline: "none",
  transition: "border-color 0.2s, background 0.2s",
  fontFamily: "'DM Sans', sans-serif",
};
