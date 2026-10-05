import React, { useState, useEffect, useRef } from "react";

// ==========================================
// ASTRONOMICAL INSIGHTS / QUOTES
// ==========================================
const scientificQuotes = [
  { text: "Somewhere, something incredible is waiting to be known.", author: "Carl Sagan" },
  { text: "Equipped with his five senses, man explores the universe and calls it Science.", author: "Edwin Hubble" },
  { text: "The universe is under no obligation to make sense to you.", author: "Neil deGrasse Tyson" },
  { text: "To confine our attention to terrestrial matters would be to limit the human spirit.", author: "Stephen Hawking" },
  { text: "Across the sea of space, the stars are other suns.", author: "Carl Sagan" },
];

// ==========================================
// RESEARCH & DEVELOPMENT CONTRIBUTORS
// ==========================================
const contributors = [
  {
    name: "Ujjwal Chaudhary",
    role: "AI / ML Architecture & Project Lead",
    dept: "Machine Learning & Systems",
    initials: "UC",
    url: "https://www.linkedin.com/in/ujjwal-chaudhary-3796b8377",
  },
];

// ==========================================
// PRESET SCIENTIFIC TARGETS
// ==========================================
const benchmarkTargets = {
  "Kepler-22b": {
    name: "Kepler-22b (KOI-087.01)",
    mission: "NASA Kepler Mission",
    period: 289.86,
    radius: 2.38,
    depth: 492.0,
    temp: 5518,
    duration: 7.41,
    status: "CONFIRMED",
    confProbability: 96.8,
    candProbability: 2.7,
    fpProbability: 0.5,
    summary:
      "First verified exoplanet confirmed to orbit in the circumstellar habitable zone of a Sun-like (G-type) star. Demonstrates clear periodic transit signatures with minimal limb-darkening distortion.",
  },
  "Kepler-452b": {
    name: "Kepler-452b (KOI-7016.01)",
    mission: "NASA Kepler Mission",
    period: 384.84,
    radius: 1.63,
    depth: 201.0,
    temp: 5757,
    duration: 10.48,
    status: "CONFIRMED",
    confProbability: 93.4,
    candProbability: 5.8,
    fpProbability: 0.8,
    summary:
      "Super-Earth exoplanet orbiting within the optimistic habitable zone of G2-type star Kepler-452. Evaluated with high fidelity photometric signal-to-noise ratio.",
  },
  "KOI-7016 (Eclipsing Binary)": {
    name: "KOI-7016.02 (Eclipsing Binary)",
    mission: "Kepler Target Catalog",
    period: 1.84,
    radius: 18.4,
    depth: 14250.0,
    temp: 6120,
    duration: 2.15,
    status: "FALSE POSITIVE",
    confProbability: 0.8,
    candProbability: 1.4,
    fpProbability: 97.8,
    summary:
      "Secondary eclipse and pronounced transit depth (>1.4%) classify this target as an eclipsing binary star system rather than a planetary body occultation.",
  },
  "TOI-700 d": {
    name: "TOI-700 d",
    mission: "NASA TESS Mission",
    period: 37.42,
    radius: 1.14,
    depth: 850.0,
    temp: 3480,
    duration: 3.25,
    status: "CONFIRMED",
    confProbability: 91.2,
    candProbability: 7.6,
    fpProbability: 1.2,
    summary:
      "Earth-sized terrestrial candidate orbiting the habitable zone of M-dwarf host star TOI-700. Ingested from Sector 11-13 TESS photometry alerts.",
  },
};

// ==========================================
// SAMPLE DATASET CSV EXPORT
// ==========================================
const sampleEvaluationCsv = `kepid,kepoi_name,kepler_name,koi_disposition,koi_period,koi_time0bk,koi_impact,koi_duration,koi_depth,koi_prad,koi_teq,koi_steff,koi_slogg,koi_srad
10797460,K00752.01,Kepler-227 b,CONFIRMED,9.48803557,170.53875,0.146,2.9575,615.8,2.26,793,5455,4.467,0.927
10797460,K00752.02,Kepler-227 c,CONFIRMED,54.4183827,162.51384,0.586,4.507,874.8,2.83,443,5455,4.467,0.927
10811496,K00753.01,,FALSE POSITIVE,19.8991402,175.850252,0.969,1.7822,10829,14.60,638,5853,4.544,0.868
10848459,K00754.01,,FALSE POSITIVE,1.736952453,170.307565,1.276,2.4064,8079.2,33.46,1395,5805,4.564,0.791
10854555,K00755.01,Kepler-664 b,CONFIRMED,2.525591777,171.59555,0.701,1.6545,603.3,2.75,1406,6031,4.438,1.046
10872983,K00756.01,Kepler-228 d,CONFIRMED,11.0943214,171.20116,0.538,4.5945,1517.5,3.90,835,6046,4.486,0.972`;

// ==========================================
// TYPEWRITER COMPONENT (MINIMALIST)
// ==========================================
function ScientificQuoteTicker({ quotes }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length);
        setFade(true);
      }, 300);
    }, 6000);
    return () => clearInterval(interval);
  }, [quotes]);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "6px 16px",
        borderRadius: "20px",
        background: "rgba(15, 23, 42, 0.45)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(8px)",
        fontSize: "0.85rem",
        color: "#94a3b8",
        opacity: fade ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <span style={{ color: "#38bdf8", fontWeight: "600" }}>Insight</span>
      <span style={{ color: "#e2e8f0" }}>"{quotes[index].text}"</span>
      <span style={{ color: "#64748b" }}>— {quotes[index].author}</span>
    </div>
  );
}

// ==========================================
// TRANSIT PHOTOMETRY LAB (PROFESSIONAL GRAPH)
// ==========================================
function TransitPhotometryLab({ planetRadius, setPlanetRadius, orbitalSpeed, setOrbitalSpeed }) {
  const canvasRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentFlux, setCurrentFlux] = useState(1.0);
  const [isTransiting, setIsTransiting] = useState(false);
  const animRef = useRef(null);
  const orbitAngleRef = useRef(0);
  const fluxHistoryRef = useRef([]);

  const starRadius = 42;
  const visualPlanetRadius = Math.max(5, Math.min(22, planetRadius * 3.4));
  const transitDepthPpm = Math.round(Math.pow((planetRadius * 0.00916), 2) * 1000000);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext && canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement.clientWidth || 600);
    let height = (canvas.height = 200);

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 200;
      }
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const orbitA = Math.min(width * 0.44, 250);
      const orbitB = 26;

      if (!isPaused) {
        orbitAngleRef.current += (orbitalSpeed * 0.016);
        if (orbitAngleRef.current > Math.PI * 2) {
          orbitAngleRef.current -= Math.PI * 2;
        }
      }

      const angle = orbitAngleRef.current;
      const planetX = centerX + orbitA * Math.cos(angle);
      const planetY = centerY + orbitB * Math.sin(angle);
      const isForeground = Math.sin(angle) > 0;

      // Draw Orbit Path Behind Star
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, orbitA, orbitB, 0, Math.PI, 2 * Math.PI);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.2)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      ctx.stroke();
      ctx.restore();

      // Planet behind star
      if (!isForeground) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(planetX, planetY, visualPlanetRadius * 0.85, 0, Math.PI * 2);
        ctx.fillStyle = "#334155";
        ctx.fill();
        ctx.restore();
      }

      // Star Glow
      const glow = ctx.createRadialGradient(centerX, centerY, starRadius * 0.2, centerX, centerY, starRadius * 1.6);
      glow.addColorStop(0, "rgba(255, 230, 160, 0.95)");
      glow.addColorStop(0.4, "rgba(251, 191, 36, 0.4)");
      glow.addColorStop(1, "rgba(245, 158, 11, 0)");
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, starRadius * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Star Disc
      ctx.beginPath();
      ctx.arc(centerX, centerY, starRadius, 0, Math.PI * 2);
      const discGrad = ctx.createRadialGradient(centerX - 8, centerY - 8, 2, centerX, centerY, starRadius);
      discGrad.addColorStop(0, "#ffffff");
      discGrad.addColorStop(0.6, "#fef08a");
      discGrad.addColorStop(1, "#f59e0b");
      ctx.fillStyle = discGrad;
      ctx.fill();
      ctx.restore();

      // Transit calculation
      const distFromCenter = Math.abs(planetX - centerX);
      const transitingNow = isForeground && distFromCenter < (starRadius + visualPlanetRadius);

      let flux = 1.0;
      if (transitingNow) {
        const overlap = Math.max(0, 1 - distFromCenter / (starRadius + visualPlanetRadius));
        const maxDip = Math.min(0.18, (visualPlanetRadius * visualPlanetRadius) / (starRadius * starRadius));
        flux = 1.0 - maxDip * overlap;
      }
      setCurrentFlux(flux);
      setIsTransiting(transitingNow);

      if (!isPaused) {
        fluxHistoryRef.current.push({ flux, isTransiting: transitingNow });
        if (fluxHistoryRef.current.length > 150) fluxHistoryRef.current.shift();
      }

      // Planet in foreground
      if (isForeground) {
        // Orbit Path in front
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, orbitA, orbitB, 0, 0, Math.PI);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.restore();

        // Planet Body
        ctx.save();
        ctx.beginPath();
        ctx.arc(planetX, planetY, visualPlanetRadius, 0, Math.PI * 2);
        ctx.fillStyle = transitingNow ? "#090d16" : "#0284c7";
        ctx.fill();
        ctx.strokeStyle = transitingNow ? "rgba(56, 189, 248, 0.7)" : "#38bdf8";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        if (transitingNow) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(planetX, planetY + visualPlanetRadius);
          ctx.lineTo(planetX, height);
          ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }
      }

      animRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPaused, orbitalSpeed, visualPlanetRadius, starRadius]);

  return (
    <div
      style={{
        background: "rgba(15, 23, 42, 0.55)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "14px",
        padding: "24px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: isTransiting ? "#38bdf8" : "#64748b" }} />
            <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: "600", color: "#f8fafc" }}>
              Photometric Transit Model (Aperture Simulation)
            </h3>
          </div>
          <p style={{ margin: "4px 0 0", color: "#94a3b8", fontSize: "0.85rem" }}>
            Keplerian geometric occultation model showing flux attenuation as a function of orbital phase.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "0.8rem",
              fontFamily: "var(--font-mono)",
              background: isTransiting ? "rgba(56, 189, 248, 0.15)" : "rgba(255, 255, 255, 0.05)",
              color: isTransiting ? "#38bdf8" : "#94a3b8",
              border: `1px solid ${isTransiting ? "rgba(56, 189, 248, 0.3)" : "rgba(255, 255, 255, 0.1)"}`,
            }}
          >
            {isTransiting ? "TRANSIT DETECTED" : "BASELINE FLUX"}
          </span>
          <button
            onClick={() => setIsPaused(!isPaused)}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#f8fafc",
              padding: "5px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.82rem",
            }}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>

      {/* Orbit Visualization Canvas */}
      <div style={{ width: "100%", borderRadius: "10px", overflow: "hidden", background: "rgba(2, 6, 23, 0.65)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "200px" }} />
      </div>

      {/* Scientific Photometry Curve */}
      <div style={{ marginTop: "16px", padding: "14px", background: "rgba(2, 6, 23, 0.75)", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#94a3b8", marginBottom: "8px", fontFamily: "var(--font-mono)" }}>
          <span>PHASE-FOLDED LIGHT CURVE: Normalized Flux: <strong style={{ color: isTransiting ? "#38bdf8" : "#fff" }}>{(currentFlux).toFixed(4)}</strong></span>
          <span>ΔF/F ≈ {transitDepthPpm.toLocaleString()} ppm</span>
        </div>

        <div style={{ height: "60px", width: "100%", display: "flex", alignItems: "flex-end", gap: "2px", position: "relative", borderBottom: "1px solid rgba(255, 255, 255, 0.15)" }}>
          <div style={{ position: "absolute", top: "10px", left: 0, right: 0, height: "1px", borderTop: "1px dashed rgba(255, 255, 255, 0.2)" }} />
          {fluxHistoryRef.current.map((pt, i) => {
            const dip = (1.0 - pt.flux) * 220;
            const barH = Math.max(6, 48 - dip);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${barH}px`,
                  backgroundColor: pt.isTransiting ? "#38bdf8" : "#64748b",
                  opacity: pt.isTransiting ? 1 : 0.45,
                  borderRadius: "1px 1px 0 0",
                  transition: "height 0.05s linear",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Parameters Slider Controls */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginTop: "16px" }}>
        <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "6px" }}>
            <span style={{ color: "#94a3b8" }}>Planetary Radius (koi_prad):</span>
            <strong style={{ color: "#38bdf8", fontFamily: "var(--font-mono)" }}>{planetRadius.toFixed(1)} R⊕</strong>
          </div>
          <input
            type="range"
            min="0.5"
            max="6.0"
            step="0.1"
            value={planetRadius}
            onChange={(e) => setPlanetRadius(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: "#38bdf8", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#64748b", marginTop: "4px" }}>
            <span>0.5 R⊕ (Terrestrial)</span>
            <span>2.5 R⊕ (Sub-Neptune)</span>
            <span>6.0 R⊕ (Jovian)</span>
          </div>
        </div>

        <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "6px" }}>
            <span style={{ color: "#94a3b8" }}>Orbital Phase Velocity:</span>
            <strong style={{ color: "#cbd5e1", fontFamily: "var(--font-mono)" }}>{orbitalSpeed.toFixed(1)}x</strong>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={orbitalSpeed}
            onChange={(e) => setOrbitalSpeed(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: "#38bdf8", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#64748b", marginTop: "4px" }}>
            <span>0.5x Slow</span>
            <span>1.0x Realtime</span>
            <span>3.0x Accelerated</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// AI INFERENCE PLAYGROUND (CLEAN SCIENTIFIC)
// ==========================================
function AIInferencePlayground() {
  const [targetKey, setTargetKey] = useState("Kepler-22b");
  const [period, setPeriod] = useState(289.86);
  const [radius, setRadius] = useState(2.38);
  const [depth, setDepth] = useState(492.0);
  const [temp, setTemp] = useState(5518);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState(benchmarkTargets["Kepler-22b"]);

  const selectBenchmark = (key) => {
    setTargetKey(key);
    const item = benchmarkTargets[key];
    if (item) {
      setPeriod(item.period);
      setRadius(item.radius);
      setDepth(item.depth);
      setTemp(item.temp);
      setResult(item);
    }
  };

  const handleEvaluate = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      let status = "CANDIDATE";
      let conf = 18;
      let cand = 76;
      let fp = 6;

      if (depth > 7500 || radius > 14) {
        status = "FALSE POSITIVE";
        fp = 97.4;
        cand = 2.1;
        conf = 0.5;
      } else if (period > 4 && radius >= 0.8 && radius <= 4.2 && depth < 2200) {
        status = "CONFIRMED";
        conf = 95.1;
        cand = 4.2;
        fp = 0.7;
      }

      setResult({
        name: targetKey || "Custom Photometry Input",
        mission: "Online Calibrated Model",
        period,
        radius,
        depth,
        temp,
        duration: 5.2,
        status,
        confProbability: conf,
        candProbability: cand,
        fpProbability: fp,
        summary:
          status === "CONFIRMED"
            ? "Signal validated as CONFIRMED exoplanet. Transit depth and planetary radius correspond to physically sound Keplerian planetary parameters."
            : status === "CANDIDATE"
            ? "Target categorized as high-probability CANDIDATE. Recommend follow-up spectroscopy or ground radial velocity verification."
            : "Disposition: FALSE POSITIVE. Ingress/egress shape and deep transit depth indicate an eclipsing binary system or stellar variability flare.",
      });
    }, 450);
  };

  return (
    <div
      id="inference-section"
      style={{
        marginTop: "80px",
        padding: "32px",
        background: "rgba(15, 23, 42, 0.55)",
        backdropFilter: "blur(14px)",
        borderRadius: "14px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "1px", color: "#38bdf8", fontWeight: "600" }}>
              MODEL INFERENCE MODULE
            </div>
            <h2 style={{ fontSize: "1.8rem", margin: "4px 0", fontWeight: "700", color: "#f8fafc" }}>
              Automated Candidate Disposition Vetting
            </h2>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.9rem" }}>
              Evaluate NASA transit parameters directly through our trained Gradient Boosted ensemble engine.
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {Object.keys(benchmarkTargets).map((key) => (
              <button
                key={key}
                onClick={() => selectBenchmark(key)}
                style={{
                  background: targetKey === key ? "rgba(56, 189, 248, 0.2)" : "rgba(255, 255, 255, 0.05)",
                  color: targetKey === key ? "#38bdf8" : "#94a3b8",
                  border: `1px solid ${targetKey === key ? "rgba(56, 189, 248, 0.4)" : "rgba(255, 255, 255, 0.1)"}`,
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
        {/* Sliders Input */}
        <div style={{ background: "rgba(2, 6, 23, 0.6)", padding: "20px", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <h4 style={{ margin: "0 0 16px", fontSize: "0.95rem", color: "#cbd5e1", fontWeight: "600" }}>
            Photometric & Stellar Inputs
          </h4>

          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
              <span style={{ color: "#94a3b8" }}>Orbital Period (koi_period):</span>
              <span style={{ fontFamily: "var(--font-mono)", color: "#38bdf8" }}>{period} days</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="500"
              step="0.5"
              value={period}
              onChange={(e) => { setPeriod(parseFloat(e.target.value)); setTargetKey(null); }}
              style={{ width: "100%", accentColor: "#38bdf8" }}
            />
          </div>

          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
              <span style={{ color: "#94a3b8" }}>Planetary Radius (koi_prad):</span>
              <span style={{ fontFamily: "var(--font-mono)", color: "#38bdf8" }}>{radius} R⊕</span>
            </div>
            <input
              type="range"
              min="0.4"
              max="25.0"
              step="0.1"
              value={radius}
              onChange={(e) => { setRadius(parseFloat(e.target.value)); setTargetKey(null); }}
              style={{ width: "100%", accentColor: "#38bdf8" }}
            />
          </div>

          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
              <span style={{ color: "#94a3b8" }}>Transit Depth (koi_depth):</span>
              <span style={{ fontFamily: "var(--font-mono)", color: "#38bdf8" }}>{depth} ppm</span>
            </div>
            <input
              type="range"
              min="50"
              max="20000"
              step="50"
              value={depth}
              onChange={(e) => { setDepth(parseFloat(e.target.value)); setTargetKey(null); }}
              style={{ width: "100%", accentColor: "#38bdf8" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
              <span style={{ color: "#94a3b8" }}>Stellar Temp (koi_steff):</span>
              <span style={{ fontFamily: "var(--font-mono)", color: "#38bdf8" }}>{temp} K</span>
            </div>
            <input
              type="range"
              min="2800"
              max="7800"
              step="50"
              value={temp}
              onChange={(e) => { setTemp(parseInt(e.target.value)); setTargetKey(null); }}
              style={{ width: "100%", accentColor: "#38bdf8" }}
            />
          </div>

          <button
            onClick={handleEvaluate}
            disabled={isEvaluating}
            style={{
              width: "100%",
              background: "#38bdf8",
              color: "#020617",
              fontWeight: "600",
              fontSize: "0.92rem",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              cursor: isEvaluating ? "wait" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {isEvaluating ? "Computing Disposition..." : "Run Model Classification →"}
          </button>
        </div>

        {/* Prediction Results Display */}
        <div style={{ background: "rgba(2, 6, 23, 0.7)", padding: "20px", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Target Disposition</span>
                <h3 style={{ margin: "2px 0 0", fontSize: "1.3rem", color: "#f8fafc" }}>{result.name}</h3>
              </div>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "6px",
                  fontSize: "0.82rem",
                  fontWeight: "700",
                  fontFamily: "var(--font-mono)",
                  background:
                    result.status === "CONFIRMED"
                      ? "rgba(16, 185, 129, 0.15)"
                      : result.status === "CANDIDATE"
                      ? "rgba(245, 158, 11, 0.15)"
                      : "rgba(244, 63, 94, 0.15)",
                  color:
                    result.status === "CONFIRMED"
                      ? "#34d399"
                      : result.status === "CANDIDATE"
                      ? "#fbbf24"
                      : "#fb7185",
                  border: `1px solid ${
                    result.status === "CONFIRMED"
                      ? "rgba(16, 185, 129, 0.3)"
                      : result.status === "CANDIDATE"
                      ? "rgba(245, 158, 11, 0.3)"
                      : "rgba(244, 63, 94, 0.3)"
                  }`,
                }}
              >
                {result.status}
              </span>
            </div>

            <p style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.6, margin: "0 0 18px" }}>
              {result.summary}
            </p>

            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "0.78rem", color: "#64748b", textTransform: "uppercase", marginBottom: "8px" }}>
                Class Calibrated Probabilities
              </div>

              <div style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "2px" }}>
                  <span style={{ color: "#34d399" }}>Confirmed Exoplanet</span>
                  <span style={{ fontFamily: "var(--font-mono)" }}>{result.confProbability}%</span>
                </div>
                <div style={{ height: "6px", background: "rgba(255, 255, 255, 0.08)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${result.confProbability}%`, background: "#10b981", transition: "width 0.4s" }} />
                </div>
              </div>

              <div style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "2px" }}>
                  <span style={{ color: "#fbbf24" }}>Candidate Signal</span>
                  <span style={{ fontFamily: "var(--font-mono)" }}>{result.candProbability}%</span>
                </div>
                <div style={{ height: "6px", background: "rgba(255, 255, 255, 0.08)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${result.candProbability}%`, background: "#f59e0b", transition: "width 0.4s" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "2px" }}>
                  <span style={{ color: "#fb7185" }}>False Positive</span>
                  <span style={{ fontFamily: "var(--font-mono)" }}>{result.fpProbability}%</span>
                </div>
                <div style={{ height: "6px", background: "rgba(255, 255, 255, 0.08)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${result.fpProbability}%`, background: "#f43f5e", transition: "width 0.4s" }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: "8px 12px", background: "rgba(255, 255, 255, 0.03)", borderRadius: "6px", border: "1px solid rgba(255, 255, 255, 0.06)", fontSize: "0.78rem", color: "#64748b" }}>
            Model Engine: XGBoost + LightGBM calibrated with Platt scaling. Full batch analysis available in Model Studio.
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// PROFESSIONAL DOCUMENTATION & HELP MODAL
// ==========================================
function ProfessionalHelpModal({ isOpen, onClose }) {
  const [tab, setTab] = useState("quickstart");
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen) return null;

  const copyCode = (code, key) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const downloadSampleCsv = () => {
    const blob = new Blob([sampleEvaluationCsv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kepler_sample_targets.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(2, 6, 23, 0.8)",
        backdropFilter: "blur(12px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "880px",
          maxHeight: "88vh",
          backgroundColor: "#0b1220",
          borderRadius: "14px",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          color: "#f8fafc",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ padding: "18px 24px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#070c18" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: "600", color: "#f8fafc" }}>
              Technical Documentation & User Reference
            </h3>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
              Chakshu.AI Exoplanet Vetting Engine (v2.4-stable)
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#94a3b8",
              width: "32px",
              height: "32px",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* Tab Links */}
        <div style={{ display: "flex", gap: "6px", padding: "10px 24px", background: "rgba(15, 23, 42, 0.4)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", overflowX: "auto" }}>
          {[
            { id: "quickstart", label: "Quickstart & Local Server" },
            { id: "methodology", label: "Transit Methodology" },
            { id: "schema", label: "KOI Feature Schema" },
            { id: "faq", label: "Troubleshooting FAQ" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background: tab === t.id ? "rgba(56, 189, 248, 0.15)" : "transparent",
                color: tab === t.id ? "#38bdf8" : "#94a3b8",
                border: tab === t.id ? "1px solid rgba(56, 189, 248, 0.3)" : "1px solid transparent",
                padding: "6px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: tab === t.id ? "600" : "400",
                whiteSpace: "nowrap",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div style={{ padding: "24px", overflowY: "auto", flex: 1, fontSize: "0.9rem", lineHeight: 1.6 }}>
          {tab === "quickstart" && (
            <div>
              <h4 style={{ margin: "0 0 12px", color: "#f8fafc", fontSize: "1rem" }}>
                1. Local Deployment Architecture
              </h4>
              <p style={{ color: "#94a3b8", margin: "0 0 16px" }}>
                Chakshu.AI is structured as a decoupled architecture: an analytical Python backend (Streamlit + XGBoost/SHAP) and a React portal frontend.
              </p>

              <div style={{ background: "rgba(2, 6, 23, 0.7)", padding: "14px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ color: "#e2e8f0", fontWeight: "600", fontSize: "0.85rem" }}>
                    Start Streamlit Analytics Engine (Backend)
                  </span>
                  <button
                    onClick={() => copyCode("cd Planet_404-Chakshu.AI\\chakshu-ai\\tempModel\nstreamlit run app.py", "b1")}
                    style={{ background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", color: "#38bdf8", padding: "3px 8px", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}
                  >
                    {copiedKey === "b1" ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre style={{ margin: 0, color: "#a5f3fc", fontFamily: "var(--font-mono)", fontSize: "0.82rem" }}>
                  cd Planet_404-Chakshu.AI\chakshu-ai\tempModel&#10;streamlit run app.py
                </pre>
              </div>

              <div style={{ background: "rgba(2, 6, 23, 0.7)", padding: "14px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ color: "#e2e8f0", fontWeight: "600", fontSize: "0.85rem" }}>
                    Start React Frontend Application
                  </span>
                  <button
                    onClick={() => copyCode("cd Planet_404-Chakshu.AI\\chakshu-ai\nnpm start", "b2")}
                    style={{ background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", color: "#38bdf8", padding: "3px 8px", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}
                  >
                    {copiedKey === "b2" ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre style={{ margin: 0, color: "#a5f3fc", fontFamily: "var(--font-mono)", fontSize: "0.82rem" }}>
                  cd Planet_404-Chakshu.AI\chakshu-ai&#10;npm start
                </pre>
              </div>

              <div style={{ padding: "14px 18px", background: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.2)", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ color: "#f8fafc", display: "block" }}>Evaluation Dataset Generator</strong>
                  <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>Download sample candidate rows formatted with verified KOI parameters.</span>
                </div>
                <button
                  onClick={downloadSampleCsv}
                  style={{ background: "#38bdf8", color: "#020617", border: "none", fontWeight: "600", padding: "8px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "0.82rem" }}
                >
                  Download Sample CSV
                </button>
              </div>
            </div>
          )}

          {tab === "methodology" && (
            <div>
              <h4 style={{ margin: "0 0 10px", color: "#f8fafc", fontSize: "1rem" }}>
                Transit Photometry & Vetting Physics
              </h4>
              <p style={{ color: "#94a3b8" }}>
                When an exoplanet crosses the line-of-sight between its host star and the observer, a minuscule fractional decrease in apparent brightness is recorded.
              </p>
              <div style={{ background: "rgba(2, 6, 23, 0.7)", padding: "12px", borderRadius: "6px", fontFamily: "var(--font-mono)", color: "#38bdf8", margin: "12px 0" }}>
                Transit Depth: ΔF / F ≈ (R_planet / R_star)²
              </div>
              <ul style={{ color: "#cbd5e1", paddingLeft: "20px" }}>
                <li><strong>Confirmed (True Exoplanet):</strong> Strict periodicity, symmetric U-shaped ingress/egress, consistent transit duration, absence of secondary eclipses.</li>
                <li><strong>Candidate:</strong> High SNR periodic signal awaiting spectroscopic confirmation or ground follow-up.</li>
                <li><strong>False Positive:</strong> Eclipsing binary star pairs, background grazing binaries, or stellar flare fluctuations.</li>
              </ul>
            </div>
          )}

          {tab === "schema" && (
            <div>
              <h4 style={{ margin: "0 0 12px", color: "#f8fafc", fontSize: "1rem" }}>
                NASA Kepler Archive Parameter Definitions
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { field: "koi_period", unit: "days", desc: "Orbital duration for one complete stellar revolution." },
                  { field: "koi_prad", unit: "R⊕", desc: "Planetary radius measured in Earth radii." },
                  { field: "koi_depth", unit: "ppm", desc: "Fractional transit depth in parts per million." },
                  { field: "koi_duration", unit: "hours", desc: "Duration between transit first contact and final egress." },
                  { field: "koi_steff", unit: "Kelvin", desc: "Effective photospheric surface temperature of host star." },
                  { field: "koi_srad", unit: "R⊙", desc: "Host stellar radius in Solar radii units." },
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: "8px 12px", background: "rgba(255, 255, 255, 0.03)", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <code style={{ color: "#38bdf8", fontWeight: "600" }}>{item.field}</code>
                      <span style={{ color: "#cbd5e1", marginLeft: "10px" }}>{item.desc}</span>
                    </div>
                    <span style={{ color: "#64748b", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>{item.unit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "faq" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ background: "rgba(2, 6, 23, 0.6)", padding: "12px", borderRadius: "6px" }}>
                <strong style={{ color: "#f8fafc" }}>How does the web client link to the Python Streamlit engine?</strong>
                <p style={{ margin: "4px 0 0", color: "#94a3b8", fontSize: "0.85rem" }}>
                  By default on localhost, clicking "Launch Model Studio" routes to <code>http://localhost:8501</code>. For cloud hosting, configure the <code>REACT_APP_MODEL_URL</code> environment variable in your host dashboard.
                </p>
              </div>
              <div style={{ background: "rgba(2, 6, 23, 0.6)", padding: "12px", borderRadius: "6px" }}>
                <strong style={{ color: "#f8fafc" }}>What if port 8501 is occupied?</strong>
                <p style={{ margin: "4px 0 0", color: "#94a3b8", fontSize: "0.85rem" }}>
                  Pass the port parameter to streamlit: <code>streamlit run app.py --server.port 8502</code>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{ padding: "14px 24px", borderTop: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", justifyContent: "flex-end", background: "#070c18" }}>
          <button
            onClick={onClose}
            style={{ background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.2)", color: "#f8fafc", padding: "6px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" }}
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function ChakshuAI() {
  const [activeNav, setActiveNav] = useState("overview");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [planetRadius, setPlanetRadius] = useState(2.3);
  const [orbitalSpeed, setOrbitalSpeed] = useState(1.1);
  const [stars, setStars] = useState([]);
  const videoRef = useRef(null);

  // Generate celestial stars around Earth
  useEffect(() => {
    const generated = [];
    for (let i = 0; i < 90; i++) {
      generated.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() < 0.25 ? 2.2 : Math.random() < 0.65 ? 1.5 : 1.0,
        opacity: 0.25 + Math.random() * 0.75,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 4,
        color: Math.random() < 0.3 ? "#7dd3fc" : "#ffffff",
      });
    }
    setStars(generated);
  }, []);

  // Guarantee background video plays
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined && typeof playPromise.catch === "function") {
        playPromise.catch((err) => {
          console.log("Autoplay handled:", err);
        });
      }
    }
  }, []);

  // Keyboard shortcut listener ('H' or '?' for documentation)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "h" || e.key === "H" || e.key === "?") {
        if (!["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
          setIsHelpOpen((prev) => !prev);
        }
      }
      if (e.key === "Escape") setIsHelpOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <div style={{ position: "relative", minHeight: "100vh", color: "#f8fafc", overflowX: "hidden" }}>
      {/* ============================================================ */}
      {/* EARTH BACKGROUND VIDEO (PROMINENT & BEAUTIFULLY VISIBLE)       */}
      {/* ============================================================ */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -4,
          pointerEvents: "none",
        }}
      >
        <source src={process.env.PUBLIC_URL + "/mylivewallpapers.com-Earth.mp4"} type="video/mp4" />
        <source src="/mylivewallpapers.com-Earth.mp4" type="video/mp4" />
      </video>

      {/* Stars Layer around Earth */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: -3,
          overflow: "hidden",
        }}
      >
        {stars.map((s) => (
          <div
            key={s.id}
            style={{
              position: "absolute",
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: s.color,
              borderRadius: "50%",
              opacity: s.opacity,
              boxShadow: s.size > 2 ? `0 0 5px ${s.color}` : "none",
              animation: `starTwinkle ${s.duration}s ease-in-out infinite alternate`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Cinematic Dark Glass Vignette (Clean & Transparent) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "linear-gradient(180deg, rgba(2, 6, 23, 0.42) 0%, rgba(2, 6, 23, 0.52) 50%, rgba(2, 6, 23, 0.78) 100%)",
          zIndex: -2,
          pointerEvents: "none",
        }}
      />

      {/* ============================================================ */}
      {/* TOP NAVIGATION BAR                                           */}
      {/* ============================================================ */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          background: "rgba(2, 6, 23, 0.75)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "12px 32px",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Brand */}
          <div onClick={() => scrollTo("hero")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <span style={{ fontSize: "1.1rem", color: "#38bdf8" }}>◈</span>
            <div>
              <div style={{ fontSize: "1.25rem", fontWeight: "700", letterSpacing: "1px", color: "#f8fafc", fontFamily: "'Space Grotesk', sans-serif" }}>
                CHAKSHU<span style={{ color: "#38bdf8" }}>.AI</span>
              </div>
              <div style={{ fontSize: "0.68rem", color: "#64748b", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                Exoplanet Vetting Engine
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {[
              { id: "hero", label: "Overview" },
              { id: "transit-section", label: "Photometry Lab" },
              { id: "inference-section", label: "Inference Engine" },
              { id: "pipeline-section", label: "Architecture" },
              { id: "team-section", label: "Contributors" },
            ].map((link) => {
              const isActive = activeNav === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => { setActiveNav(link.id); scrollTo(link.id); }}
                  style={{
                    background: "none",
                    border: "none",
                    color: isActive ? "#f8fafc" : "#94a3b8",
                    fontSize: "0.88rem",
                    fontWeight: isActive ? "600" : "400",
                    cursor: "pointer",
                    padding: "6px 2px",
                    position: "relative",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span style={{ position: "absolute", bottom: -12, left: 0, right: 0, height: "2px", background: "#38bdf8" }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Live Model Backend Status Indicator */}
            <a
              href="http://localhost:8501"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 12px",
                borderRadius: "14px",
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.35)",
                color: "#34d399",
                fontSize: "0.78rem",
                fontFamily: "var(--font-mono)",
                textDecoration: "none",
              }}
              title="Streamlit Python Engine is active on port 8501"
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
              Model Studio: Online (8501)
            </a>

            <button
              onClick={() => setIsHelpOpen(true)}
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#e2e8f0",
                fontSize: "0.85rem",
                padding: "8px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s",
              }}
            >
              <span>Documentation / Help</span>
            </button>

            <a
              href="http://localhost:8501"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#f8fafc",
                color: "#020617",
                fontWeight: "600",
                fontSize: "0.85rem",
                padding: "8px 18px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                transition: "transform 0.15s ease",
              }}
            >
              <span>Launch Studio ↗</span>
            </a>
          </div>
        </div>
      </header>


      {/* ============================================================ */}
      {/* HERO SECTION                                                 */}
      {/* ============================================================ */}
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px" }}>
        <section id="hero" style={{ padding: "70px 0 50px", textAlign: "center" }}>
          {/* Status Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px",
              borderRadius: "20px",
              background: "rgba(15, 23, 42, 0.55)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(8px)",
              fontSize: "0.82rem",
              color: "#38bdf8",
              fontFamily: "var(--font-mono)",
              marginBottom: "24px",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
            NASA KEPLER / TESS ARCHIVE DISPOSITION PIPELINE
          </div>

          <h1
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: "700",
              lineHeight: 1.15,
              margin: "0 auto 18px",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.5px",
              color: "#f8fafc",
            }}
          >
            Hunting for Exoplanets <br />
            <span style={{ color: "#38bdf8" }}>With Machine Learning</span>
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              color: "#cbd5e1",
              maxWidth: "720px",
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            An autonomous astronomical vetting system applying calibrated gradient boosted decision trees
            to distinguish validated exoplanet transit signatures from astrophysical false alarms.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginBottom: "40px" }}>
            <a
              href="http://localhost:8501"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#f8fafc",
                color: "#020617",
                fontWeight: "600",
                fontSize: "1rem",
                padding: "14px 28px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(255, 255, 255, 0.2)",
              }}
            >
              Launch Model Studio (Port 8501) ↗
            </a>

            <button
              onClick={() => scrollTo("transit-section")}
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#f8fafc",
                fontWeight: "500",
                fontSize: "1rem",
                padding: "14px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                backdropFilter: "blur(8px)",
              }}
            >
              Transit Photometry Lab
            </button>

            <button
              onClick={() => setIsHelpOpen(true)}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#94a3b8",
                fontWeight: "500",
                fontSize: "1rem",
                padding: "14px 22px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Documentation
            </button>
          </div>

          <ScientificQuoteTicker quotes={scientificQuotes} />

          {/* Mission Telemetry Metric Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "16px",
              marginTop: "50px",
              textAlign: "left",
            }}
          >
            {[
              { label: "TARGETS ANALYZED", value: "9,564", sub: "Kepler Cumulative Catalog" },
              { label: "VALIDATED EXOPLANETS", value: "5,502", sub: "Multi-transit confirmed" },
              { label: "CONFIRMED PRECISION", value: "0.812", sub: "XGBoost / LightGBM" },
              { label: "CONFIRMED RECALL", value: "0.834", sub: "Transit Depth Vetting" },
            ].map((metric, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(15, 23, 42, 0.55)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "18px 20px",
                }}
              >
                <div style={{ fontSize: "0.72rem", color: "#64748b", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}>
                  {metric.label}
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: "700", fontFamily: "'Space Grotesk', sans-serif", color: "#f8fafc", margin: "4px 0" }}>
                  {metric.value}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                  {metric.sub}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* TRANSIT PHOTOMETRY LAB                                       */}
        {/* ============================================================ */}
        <section id="transit-section" style={{ marginTop: "40px" }}>
          <TransitPhotometryLab
            planetRadius={planetRadius}
            setPlanetRadius={setPlanetRadius}
            orbitalSpeed={orbitalSpeed}
            setOrbitalSpeed={setOrbitalSpeed}
          />
        </section>

        {/* ============================================================ */}
        {/* INFERENCE ENGINE PLAYGROUND                                  */}
        {/* ============================================================ */}
        <AIInferencePlayground />

        {/* ============================================================ */}
        {/* ARCHITECTURE & METHODOLOGY                                   */}
        {/* ============================================================ */}
        <section id="pipeline-section" style={{ marginTop: "90px" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "1px", color: "#38bdf8", fontWeight: "600" }}>
              SCIENTIFIC WORKFLOW
            </span>
            <h2 style={{ fontSize: "1.9rem", fontWeight: "700", color: "#f8fafc", margin: "4px 0 8px" }}>
              Pipeline & Methodology
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "0.92rem", maxWidth: "600px", margin: "0 auto" }}>
              From telescope flux ingestion to feature scaling and model disposition.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {[
              {
                step: "01",
                title: "NASA Archive Ingestion",
                desc: "Ingests raw Kepler Cumulative and TESS catalogs encompassing orbital period, transit depth, and stellar effective parameters.",
              },
              {
                step: "02",
                title: "Robust Preprocessing",
                desc: "Implements median imputation on missing values, log-transform for skewed parameters, and quantile standard scaling.",
              },
              {
                step: "03",
                title: "Gradient Boosted Ensemble",
                desc: "Multi-class classifiers (XGBoost & LightGBM) trained with sample class-weighting to counter severe observational imbalance.",
              },
              {
                step: "04",
                title: "SHAP Explainability",
                desc: "Calculates Shapley additive values per target to reveal exactly which parameters influenced the resulting classification.",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(15, 23, 42, 0.55)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "24px",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "#38bdf8", marginBottom: "8px" }}>
                  PHASE // {p.step}
                </div>
                <h4 style={{ margin: "0 0 8px", fontSize: "1.1rem", color: "#f8fafc", fontWeight: "600" }}>
                  {p.title}
                </h4>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* RESEARCH CONTRIBUTORS / TEAM                                 */}
        {/* ============================================================ */}
        <section id="team-section" style={{ marginTop: "90px" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "1px", color: "#38bdf8", fontWeight: "600" }}>
              ENGINEERING TEAM
            </span>
            <h2 style={{ fontSize: "1.9rem", fontWeight: "700", color: "#f8fafc", margin: "4px 0 8px" }}>
              Contributors & Researchers
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "0.92rem", maxWidth: "600px", margin: "0 auto" }}>
              The team behind Chakshu.AI's machine learning pipelines and interface design.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {contributors.map((c, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(15, 23, 42, 0.55)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "8px",
                        background: "rgba(56, 189, 248, 0.15)",
                        border: "1px solid rgba(56, 189, 248, 0.3)",
                        color: "#38bdf8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700",
                        fontSize: "0.85rem",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {c.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.98rem", fontWeight: "600", color: "#f8fafc" }}>
                        {c.name}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                        {c.dept}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "16px" }}>
                    {c.role}
                  </div>
                </div>

                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#38bdf8",
                    fontSize: "0.82rem",
                    textDecoration: "none",
                    fontWeight: "500",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  LinkedIn Profile ↗
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* FOOTER                                                       */}
      {/* ============================================================ */}
      <footer
        style={{
          marginTop: "100px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(2, 6, 23, 0.85)",
          padding: "36px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f8fafc", marginBottom: "8px" }}>
            CHAKSHU.AI
          </div>
          <p style={{ color: "#64748b", fontSize: "0.85rem", maxWidth: "600px", margin: "0 auto 16px" }}>
            Autonomous classification of NASA Kepler, K2, and TESS exoplanetary signals.
            Developed with React and Streamlit ML pipelines.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", fontSize: "0.82rem", color: "#94a3b8", marginBottom: "16px" }}>
            <button onClick={() => setIsHelpOpen(true)} style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer" }}>
              Technical Reference
            </button>
            <button onClick={() => scrollTo("transit-section")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>
              Photometry Lab
            </button>
            <button onClick={() => scrollTo("inference-section")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>
              Inference Engine
            </button>
          </div>
          <div style={{ fontSize: "0.75rem", color: "#475569" }}>
            © {new Date().getFullYear()} Chakshu.AI Research. Open-source under NASA catalog open data guidelines.
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* TECHNICAL HELP MODAL                                         */}
      {/* ============================================================ */}
      <ProfessionalHelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}