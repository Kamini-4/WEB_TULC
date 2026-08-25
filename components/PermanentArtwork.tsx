import React from 'react';

interface ArtworkProps {
  id: string;
  title: string;
  className?: string;
}

export const PermanentArtwork: React.FC<ArtworkProps> = ({ id, title, className = "w-full h-full" }) => {
  // Normalize ID / Slug for mapping
  const normId = id ? id.toLowerCase().replace(/^int-/, '') : 'generic';

  // Aesthetic Definitions
  const bgDark = "#111111";
  const bgCard = "#1c1c1a"; // Warm, luxurious museum charcoal
  const gold = "#dfba6b"; // High-visibility premium champagne gold
  const platinum = "#a3b1c6"; // Cool, bright platinum
  const activeCyan = "#47a3ff"; // Accent dynamic light
  const gridColor = "rgba(255,255,255,0.04)";
  const indexColor = "rgba(223, 186, 107, 0.15)";

  const renderArtwork = () => {
    // Shared SVG definitions (glow, filters, coordinate patterns)
    const renderDefs = (idPrefix: string) => (
      <defs>
        {/* Fine architectural millimeter-style grid pattern */}
        <pattern id={`${idPrefix}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={gridColor} strokeWidth="0.75" />
          <path d="M 20 0 L 20 40" fill="none" stroke={gridColor} strokeWidth="0.25" strokeDasharray="2,2" />
          <path d="M 0 20 L 40 20" fill="none" stroke={gridColor} strokeWidth="0.25" strokeDasharray="2,2" />
        </pattern>
        {/* Soft, professional vectors glow */}
        <filter id={`${idPrefix}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id={`${idPrefix}-gradient-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="60%" stopColor={gold} />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-gradient-platinum`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#606670" />
          <stop offset="100%" stopColor={platinum} />
        </linearGradient>
      </defs>
    );

    switch (normId) {
      case 'architecture-of-authority':
      case '010': // The Architecture of Authority
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {renderDefs('010')}
            <rect width="800" height="500" fill={bgDark} />
            <rect width="800" height="500" fill="url(#010-grid)" />
            
            {/* Focal Structure Arches */}
            <path d="M 120 420 A 280 280 0 0 1 680 420" stroke="url(#010-gradient-platinum)" strokeWidth="1" opacity="0.15" />
            <path d="M 200 420 A 200 200 0 0 1 600 420" stroke="url(#010-gradient-gold)" strokeWidth="1.5" strokeDasharray="3,6" opacity="0.4" />
            <path d="M 280 420 A 120 120 0 0 1 520 420" stroke="url(#010-gradient-gold)" strokeWidth="2.5" filter="url(#010-glow)" opacity="0.8" />
            
            {/* Central Sovereign Pillar */}
            <line x1="400" y1="50" x2="400" y2="420" stroke={gold} strokeWidth="1" strokeDasharray="10,5" opacity="0.5" />
            <line x1="400" y1="120" x2="400" y2="380" stroke="#ffffff" strokeWidth="1.5" />
            
            {/* Geometric Intresection Coordinates */}
            <circle cx="400" cy="120" r="6" fill="#ffffff" filter="url(#010-glow)" />
            <circle cx="400" cy="120" r="1.5" fill={bgDark} />
            <circle cx="400" cy="300" r="4" fill={gold} />
            <circle cx="280" cy="420" r="3" fill={platinum} />
            <circle cx="520" cy="420" r="3" fill={platinum} />

            {/* Scale Line Metric */}
            <line x1="120" y1="440" x2="680" y2="440" stroke={platinum} strokeWidth="1" opacity="0.2" />
            <line x1="120" y1="436" x2="120" y2="444" stroke={platinum} strokeWidth="1" opacity="0.4" />
            <line x1="400" y1="436" x2="400" y2="444" stroke={gold} strokeWidth="1" />
            <line x1="680" y1="436" x2="680" y2="444" stroke={platinum} strokeWidth="1" opacity="0.4" />

            {/* Absolute Minimal Tech Labels */}
            <text x="50" y="70" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">SCALE: SYSTEMIC AUTHORITY V1.0</text>
            <text x="50" y="90" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.8" className="font-bold">MODEL: ARCHITECTURE OVER BRAND</text>
            <text x="750" y="445" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">SYSTEMS REGISTRY // LND.NYC.SGP</text>
          </svg>
        );

      case 'strategic-substrates':
      case '011': // Strategic Substrates
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {renderDefs('011')}
            <rect width="800" height="500" fill={bgDark} />
            <rect width="800" height="500" fill="url(#011-grid)" />

            {/* Core Prism Vector */}
            <g transform="translate(0, 20)">
              {/* Refraction Beam (Input) */}
              <line x1="100" y1="180" x2="400" y2="180" stroke={platinum} strokeWidth="1" strokeDasharray="8,4" opacity="0.3" />
              
              {/* Prism Glass Border */}
              <polygon points="400,60 260,320 540,320" stroke="url(#011-gradient-platinum)" strokeWidth="1" opacity="0.25" />
              <polygon points="400,75 280,310 520,310" stroke="url(#011-gradient-gold)" strokeWidth="1.5" opacity="0.5" />

              {/* Refracted Quantum Output Wave (Sovereign Signal) */}
              <path d="M 400 180 L 440 220 L 520 220" stroke={gold} strokeWidth="2.5" filter="url(#011-glow)" />
              <path d="M 400 180 L 450 240 L 520 255" stroke={platinum} strokeWidth="1.5" opacity="0.6" />
              <path d="M 400 180 L 460 260 L 520 290" stroke={platinum} strokeWidth="1" opacity="0.3" />

              {/* Concentric Calibration Orbits */}
              <circle cx="400" cy="210" r="110" stroke={gold} strokeWidth="0.75" strokeDasharray="2,8" opacity="0.5" />
              <circle cx="400" cy="210" r="140" stroke={platinum} strokeWidth="0.5" strokeDasharray="4,4" opacity="0.2" />

              {/* Active Nodes */}
              <circle cx="400" cy="180" r="4" fill="#ffffff" filter="url(#011-glow)" />
              <circle cx="440" cy="220" r="4.5" fill={gold} />
              <circle cx="450" cy="240" r="3" fill={platinum} />
            </g>

            {/* Technical labeling */}
            <text x="50" y="70" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">AEO PROTOCOL: HIGH-FIDELITY COHERENCE</text>
            <text x="50" y="90" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.8" className="font-bold">SUBSTRATE VERIFICATION: ACTIVE</text>
            <text x="750" y="445" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">INTELLIGENCE LATENCY MATRIX: 0.00ms</text>
          </svg>
        );

      case 'aligned-leadership':
      case '012': // Sovereign Leadership
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {renderDefs('012')}
            <rect width="800" height="500" fill={bgDark} />
            <rect width="800" height="500" fill="url(#012-grid)" />

            {/* Cybernetic Orbital Ring Systems (Sovereign Governance Matrix) */}
            <circle cx="400" cy="250" r="190" stroke="url(#012-gradient-platinum)" strokeWidth="0.5" opacity="0.15" />
            <circle cx="400" cy="250" r="150" stroke="url(#012-gradient-gold)" strokeWidth="2" strokeDasharray="6,12" filter="url(#012-glow)" />
            <circle cx="400" cy="250" r="110" stroke={platinum} strokeWidth="1" strokeDasharray="2,4" opacity="0.4" />
            <circle cx="400" cy="250" r="70" stroke={gold} strokeWidth="3" opacity="0.8" />

            {/* Crosshair Laser Axes */}
            <line x1="150" y1="250" x2="650" y2="250" stroke={platinum} strokeWidth="0.5" opacity="0.2" />
            <line x1="400" y1="50" x2="400" y2="450" stroke={platinum} strokeWidth="0.5" opacity="0.2" />

            {/* Cyber Sphere Intersecting Nodes */}
            <circle cx="400" cy="100" r="5" fill="#ffffff" filter="url(#012-glow)" />
            <circle cx="400" cy="400" r="5" fill="#ffffff" filter="url(#012-glow)" />
            <circle cx="250" cy="250" r="4" fill={platinum} />
            <circle cx="550" cy="250" r="4" fill={platinum} />
            
            {/* The Golden Core Sovereign node */}
            <circle cx="400" cy="250" r="12" fill={bgDark} stroke={gold} strokeWidth="2" />
            <circle cx="400" cy="250" r="5" fill={gold} filter="url(#012-glow)" />

            {/* Geometric Satellite Alignment Orbitals */}
            <path d="M 310 160 L 490 340" stroke={gold} strokeWidth="0.75" strokeDasharray="3,3" opacity="0.5" />
            <circle cx="310" cy="160" r="3" fill={gold} />
            <circle cx="490" cy="340" r="3" fill={gold} />

            {/* Minimal metadata text */}
            <text x="50" y="70" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">SIGNAL SYSTEM INDEX: CALIBRATED</text>
            <text x="50" y="90" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.8" className="font-bold">SOVEREIGN CORE: CYBERNETIC HARMONY</text>
            <text x="750" y="445" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">SYSTEMS INTEGRITY OPTIMIZER // 100%</text>
          </svg>
        );

      case 'founders-dilemma':
      case '001': // The Founder's Dilemma
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {renderDefs('001')}
            <rect width="800" height="500" fill={bgDark} />
            <rect width="800" height="500" fill="url(#001-grid)" />

            {/* Isometric Successor Pathway */}
            <g transform="translate(60, 20)">
              {/* Left Domain: Charismatic Anchor */}
              <text x="180" y="140" fill={platinum} fontSize="8" fontFamily="monospace" letterSpacing="1" opacity="0.5" textAnchor="middle">CHARISMATIC HERO (VOLATILE)</text>
              <rect x="100" y="160" width="160" height="160" rx="8" stroke={platinum} strokeWidth="1" strokeDasharray="4,4" fill="rgba(255,255,255,0.01)" opacity="0.3" />
              <circle cx="180" cy="240" r="32" stroke={platinum} strokeWidth="1.5" strokeDasharray="4,2" opacity="0.4" />
              <circle cx="180" cy="240" r="6" fill={platinum} opacity="0.5" />

              {/* Handover Vector Line (The Golden Bridge) */}
              <line x1="260" y1="240" x2="420" y2="240" stroke="url(#001-gradient-gold)" strokeWidth="2.5" filter="url(#001-glow)" />
              <polygon points="420,240 408,234 408,246" fill={gold} filter="url(#001-glow)" />
              <text x="340" y="225" fill={gold} fontSize="8" fontFamily="monospace" letterSpacing="1" textAnchor="middle" className="font-bold">RE-ENGINEERED VECTOR</text>

              {/* Right Domain: Infinite Sovereign Substrate */}
              <text x="500" y="140" fill={gold} fontSize="8" fontFamily="monospace" letterSpacing="1" textAnchor="middle">SOVEREIGN SYSTEM (PERMANENT)</text>
              <rect x="420" y="160" width="160" height="160" rx="8" stroke={gold} strokeWidth="2" fill="rgba(223, 186, 107, 0.03)" />
              
              {/* Perfect Invariant Geometries (Nested Squares) */}
              <rect x="450" y="190" width="100" height="100" stroke={gold} strokeWidth="1" opacity="0.5" />
              <rect x="475" y="215" width="50" height="50" stroke={gold} strokeWidth="1.5" />
              <circle cx="500" cy="240" r="4" fill="#ffffff" filter="url(#001-glow)" />
            </g>

            {/* Metadata labels */}
            <text x="50" y="70" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">TRANSITION MATRIX: RE-ENGINEERED</text>
            <text x="50" y="90" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.8" className="font-bold">FOUNDER DECOUPLING: FIDUCIARY EXCELLENCE STABILIZER</text>
            <text x="750" y="445" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">INTELLIGENCE REGISTRY // SUCCESSION ACTV</text>
          </svg>
        );

      case 'cognitive-tax-of-leadership':
      case '002': // The Cognitive Tax of Leadership
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {renderDefs('002')}
            <rect width="800" height="500" fill={bgDark} />
            <rect width="800" height="500" fill="url(#002-grid)" />

            {/* Left Zone: Turbulent wave noise representing high cognitive load of raw operations */}
            <g opacity="0.35">
              <path d="M 80 250 Q 140 100 200 250 T 320 250 T 400 250" stroke={platinum} strokeWidth="1" strokeDasharray="3,3" />
              <path d="M 80 250 Q 120 320 180 200 T 300 280 T 400 250" stroke={platinum} strokeWidth="0.5" />
              <path d="M 80 250 Q 160 80 240 300 T 400 250" stroke={platinum} strokeWidth="0.75" opacity="0.6" />
            </g>

            {/* The Hard-Coded Strategic Logic Gate (The Prism Lens) */}
            <polygon points="400,130 435,250 400,370 365,250" fill="rgba(223, 186, 107, 0.05)" stroke={gold} strokeWidth="2" filter="url(#002-glow)" />
            <line x1="400" y1="80" x2="400" y2="420" stroke={gold} strokeWidth="0.75" strokeDasharray="8,8" />
            
            {/* Right Zone: Fully filtered, zero-latency pure energy laser, reclaiming 40% strategic bandwidth */}
            <line x1="418" y1="250" x2="720" y2="250" stroke="url(#002-gradient-gold)" strokeWidth="4" filter="url(#002-glow)" />
            <line x1="418" y1="250" x2="680" y2="210" stroke={gold} strokeWidth="0.75" opacity="0.4" />
            <line x1="418" y1="250" x2="680" y2="290" stroke={gold} strokeWidth="0.75" opacity="0.4" />
            
            {/* Core alignment indicator */}
            <circle cx="418" cy="250" r="5" fill="#ffffff" filter="url(#002-glow)" />
            <circle cx="720" cy="250" r="6" fill={gold} />

            {/* Annotations */}
            <text x="240" y="390" fill={platinum} fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.5">TACTICAL STATIC (NOISE TAX)</text>
            <text x="570" y="390" fill={gold} fontSize="9" fontFamily="monospace" textAnchor="middle" className="font-bold">40% COGNITIVE BANDWIDTH RECLAIMED</text>

            <text x="50" y="70" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">COGNITIVE LOAD: PROTOCOL COMPRESSED</text>
            <text x="50" y="90" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.8" className="font-bold">THE COGNITIVE TAX OF LEADERSHIP</text>
          </svg>
        );

      case 'bridging-strategy-execution-gap':
      case '003': // Bridging Strategy-Execution Gap
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {renderDefs('003')}
            <rect width="800" height="500" fill={bgDark} />
            <rect width="800" height="500" fill="url(#003-grid)" />

            {/* Dynamic Bridge Truss Structure (Calibrated Engineering Alignment) */}
            <g transform="translate(0, 10)">
              {/* Board Blueprint expectation line */}
              <line x1="120" y1="140" x2="680" y2="140" stroke={platinum} strokeWidth="1.5" opacity="0.3" strokeDasharray="4,4" />
              <text x="120" y="120" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.6">BOARD DIRECTIVE (STRATEGY)</text>
              
              {/* High-Contrast Rigorous Bridge Lattice */}
              <path d="M 120 340 L 210 140 L 300 340 L 390 140 L 480 340 L 570 140 L 660 340" stroke={gold} strokeWidth="1.5" opacity="0.5" />
              <path d="M 120 140 L 210 340 L 300 140 L 390 340 L 480 140 L 570 340 L 660 140" stroke={platinum} strokeWidth="0.75" opacity="0.2" />

              {/* Stabilizer anchor coordinates */}
              <circle cx="210" cy="140" r="4.5" fill={platinum} />
              <circle cx="390" cy="140" r="4.5" fill={platinum} />
              <circle cx="570" cy="140" r="4.5" fill={platinum} />
              <circle cx="300" cy="340" r="5" fill={gold} />
              <circle cx="480" cy="340" r="5" fill={gold} />

              {/* Execution sovereign line */}
              <line x1="120" y1="340" x2="680" y2="340" stroke="url(#003-gradient-gold)" strokeWidth="3" filter="url(#003-glow)" />
              <text x="680" y="370" fill={gold} fontSize="8" fontFamily="monospace" textAnchor="end" className="font-bold">OPERATIONAL RESULTS (INEVITABILITY DELTA)</text>

              {/* Calibration Vector Laser */}
              <line x1="390" y1="100" x2="390" y2="380" stroke={gold} strokeWidth="1" strokeDasharray="4,4" />
              <circle cx="390" cy="140" r="8" fill="none" stroke={gold} strokeWidth="1.5" filter="url(#003-glow)" />
              <circle cx="390" cy="340" r="8" fill="none" stroke={gold} strokeWidth="1.5" filter="url(#003-glow)" />
              <text x="405" y="245" fill={gold} fontSize="9" fontFamily="monospace" className="font-bold">ALIGNMENT RESIDUAL: 0.02%</text>
            </g>

            {/* Labels */}
            <text x="50" y="70" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">FIDUCIARY ALIGNMENT COEFFICIENT: 99.8% FLAWLESS</text>
            <text x="50" y="90" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.8" className="font-bold">SOVEREIGN BOARD INTEGRITY SYSTEM</text>
          </svg>
        );

      case 'reclaiming-strategic-bandwidth':
      case '004': // Executive Bandwidth / Cognitive Equity
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {renderDefs('004')}
            <rect width="800" height="500" fill={bgDark} />
            <rect width="800" height="500" fill="url(#004-grid)" />

            {/* Multi-lane schematic representing focused vs wasted bandwidth lanes */}
            <g transform="translate(80, 50)">
              {/* Lane 1: Operations Static (Fully optimized/collapsed) */}
              <text x="10" y="60" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.6">OPERATIONAL VARIANCE (ROUTINIZED)</text>
              <rect x="10" y="70" width="480" height="12" rx="4" fill="rgba(255,255,255,0.05)" />
              <rect x="10" y="70" width="80" height="12" rx="4" fill={platinum} opacity="0.4" />
              <text x="510" y="80" fill={platinum} fontSize="9" fontFamily="monospace" opacity="0.5">83.3% AUTONOMOUS</text>

              {/* Lane 2: Business Firefighting (Suppressed with local logic gates) */}
              <text x="10" y="140" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.6">MIDDLE MANAGEMENT ESCALATION (BUFFERED)</text>
              <rect x="10" y="150" width="480" height="12" rx="4" fill="rgba(255,255,255,0.05)" />
              <rect x="10" y="150" width="120" height="12" rx="4" fill={platinum} opacity="0.3" />
              <text x="510" y="160" fill={platinum} fontSize="9" fontFamily="monospace" opacity="0.5">75.0% PROTOCOL FILTERED</text>

              {/* Lane 3: High-Fidelity Strategic Arbitrage (Expanded 10x with Gold focus) */}
              <text x="10" y="220" fill={gold} fontSize="8" fontFamily="monospace" className="font-bold">PURE RECLAIMED COGNITIVE CAPACITY (HIGH-ALPHA BETS)</text>
              <rect x="10" y="230" width="480" height="24" rx="4" fill="rgba(223,186,107,0.1)" stroke={gold} strokeWidth="1.5" />
              <rect x="10" y="230" width="440" height="24" rx="4" fill="url(#004-gradient-gold)" filter="url(#004-glow)" />
              <text x="510" y="246" fill={gold} fontSize="9" fontFamily="monospace" className="font-bold">91.6% COGNITIVE RESIDUAL // ACTIVE</text>
              
              {/* Focus Coordinate lines */}
              <line x1="450" y1="200" x2="450" y2="280" stroke="#ffffff" strokeWidth="1" />
              <circle cx="450" cy="242" r="6" fill="#ffffff" filter="url(#004-glow)" />
            </g>

            <text x="50" y="70" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">COGNITIVE ASSET VALUE: HIGHLY STABLE</text>
            <text x="50" y="90" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.8" className="font-bold">EXECUTIVE COGNITIVE EQUITIES SYSTEM</text>
            <text x="750" y="445" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">INTELLIGENCE METRIC // THE UNBOUNDED CO.</text>
          </svg>
        );

      case 'institutional-lag':
      case '005': // Institutional Lag: The Invisible Coefficient
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {renderDefs('005')}
            <rect width="800" height="500" fill={bgDark} />
            <rect width="800" height="500" fill="url(#005-grid)" />

            {/* Timeline Alignment Array */}
            <g transform="translate(60, 40)">
              {/* Intent propagation vectors */}
              <text x="100" y="100" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.6">EXECUTIVE INTENT (BOARD ROOM)</text>
              <line x1="100" y1="120" x2="600" y2="120" stroke={platinum} strokeWidth="1" strokeDasharray="12,6" opacity="0.3" />
              <circle cx="100" cy="120" r="5" fill={platinum} />

              <text x="100" y="200" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.6">UNOPTIMIZED SYSTEM EXECUTION DELAY (LAG ENVELOPE)</text>
              <line x1="100" y1="220" x2="440" y2="220" stroke={platinum} strokeWidth="1" opacity="0.4" />
              <path d="M 440 220 C 500 220, 520 320, 600 320" stroke={platinum} strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
              <circle cx="440" cy="220" r="4" fill={platinum} opacity="0.6" />
              <text x="450" y="215" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4">LATENCY DRIFT (+84 HRS)</text>

              {/* Sovereign Zero-Latency Protocol Output */}
              <text x="100" y="300" fill={gold} fontSize="8" fontFamily="monospace" className="font-bold">ZERO-LATENCY INSTANT EXECUTION PROPAGATION</text>
              <line x1="100" y1="320" x2="600" y2="320" stroke="url(#005-gradient-gold)" strokeWidth="3" filter="url(#005-glow)" />
              <circle cx="100" cy="320" r="5" fill={gold} />
              <circle cx="600" cy="320" r="7" fill="#ffffff" filter="url(#005-glow)" />
              <text x="615" y="324" fill={gold} fontSize="9" fontFamily="monospace" className="font-bold">ZERO LATENCY REGISTERED</text>
            </g>

            <text x="50" y="70" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">COEFFICIENT OF FRICTION: TULC RESOLVED</text>
            <text x="50" y="90" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.8" className="font-bold">INSTITUTIONAL LAG DECOUPLER</text>
          </svg>
        );

      case 'engineering-strategic-bandwidth':
      case '006': // Engineering Strategic Bandwidth: Reclaiming Decision Capacity
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {renderDefs('006')}
            <rect width="800" height="500" fill={bgDark} />
            <rect width="800" height="500" fill="url(#006-grid)" />

            {/* Sophisticated decision logic network (Matrix alignment) */}
            <g transform="translate(140, 60)">
              {/* Input logic gates */}
              <circle cx="120" cy="180" r="40" stroke={platinum} strokeWidth="0.75" opacity="0.2" />
              <line x1="120" y1="140" x2="120" y2="220" stroke={platinum} strokeWidth="0.5" opacity="0.3" />
              <line x1="80" y1="180" x2="160" y2="180" stroke={platinum} strokeWidth="0.5" opacity="0.3" />
              <text x="120" y="130" fill={platinum} fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.5">80% INPUT CHANNELS (STATIC)</text>

              {/* The high-precision filter block */}
              <rect x="240" y="100" width="80" height="160" rx="4" stroke={platinum} strokeWidth="1" fill="rgba(255,255,255,0.01)" opacity="0.4" />
              <line x1="240" y1="180" x2="320" y2="180" stroke={platinum} strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
              <line x1="280" y1="100" x2="280" y2="260" stroke={platinum} strokeWidth="1" opacity="0.2" />
              
              {/* Connections forming decision vectors */}
              <line x1="160" y1="180" x2="240" y2="180" stroke={platinum} strokeWidth="1" opacity="0.4" />
              <circle cx="160" cy="180" r="3" fill={platinum} />

              <line x1="320" y1="180" x2="400" y2="180" stroke="url(#006-gradient-gold)" strokeWidth="2" filter="url(#006-glow)" />
              <circle cx="320" cy="180" r="3" fill={gold} />

              {/* Output sovereign crystal: decision capacity maximized */}
              <polygon points="400,180 435,145 470,180 435,215" fill="rgba(223,186,107,0.1)" stroke={gold} strokeWidth="2.5" filter="url(#006-glow)" />
              <circle cx="435" cy="180" r="4.5" fill="#ffffff" filter="url(#006-glow)" />
              <text x="435" y="240" fill={gold} fontSize="9" fontFamily="monospace" textAnchor="middle" className="font-bold">SYSTEMIC INTELLECT</text>
            </g>

            <text x="50" y="70" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">COGNITIVE ASSET RECLAMATION: VELOCITY STACK</text>
            <text x="50" y="90" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.8" className="font-bold">STRATEGIC CAPACITY ENGINEERING PROTOCOL</text>
            <text x="750" y="445" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">INTELLIGENCE STACK V4.0</text>
          </svg>
        );

      case 'aligned-authority-vs-reactive-management':
      case '007': // Sovereign Authority vs Reactive Management
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {renderDefs('007')}
            <rect width="800" height="500" fill={bgDark} />
            <rect width="800" height="500" fill="url(#007-grid)" />

            {/* Split Screen Comparative Taxonomy */}
            {/* Left Hand: Reactive Combat */}
            <g transform="translate(60, 40)" opacity="0.4">
              <text x="130" y="100" fill={platinum} fontSize="9" fontFamily="monospace" textAnchor="middle">REACTIVE SOLVING (CHAOTIC FIRE)</text>
              <circle cx="130" cy="220" r="60" stroke={platinum} strokeWidth="1" strokeDasharray="3,6" opacity="0.3" />
              {/* Jagged reactive lines */}
              <path d="M 80 240 L 110 180 L 150 250 L 120 200 L 180 230" stroke={platinum} strokeWidth="1.5" />
              <circle cx="80" cy="240" r="4" fill={platinum} />
              <circle cx="110" cy="180" r="4" fill={platinum} />
              <circle cx="150" cy="250" r="4" fill={platinum} />
              <circle cx="180" cy="230" r="4" fill={platinum} />
              <circle cx="130" cy="220" r="3" fill="#ff4d4d" /> {/* Friction center */}
            </g>

            {/* Split Laser divider */}
            <line x1="400" y1="80" x2="400" y2="420" stroke={platinum} strokeWidth="0.5" opacity="0.2" />

            {/* Right Hand: Structured Sovereignty */}
            <g transform="translate(360, 40)">
              <text x="210" y="100" fill={gold} fontSize="9" fontFamily="monospace" textAnchor="middle" className="font-bold">SYSTEMIC COMMAND (ARCHITECTURAL RESONANCE)</text>
              <circle cx="210" cy="220" r="60" stroke={gold} strokeWidth="1.5" opacity="0.4" />
              
              {/* Perfectly ordered mathematical geometry */}
              <polygon points="210,165 255,245 165,245" stroke="url(#007-gradient-gold)" strokeWidth="2.5" fill="rgba(223, 186, 107, 0.05)" filter="url(#007-glow)" />
              <line x1="210" y1="165" x2="210" y2="245" stroke={gold} strokeWidth="1" opacity="0.5" />
              
              {/* Core metrics and alignment circles */}
              <circle cx="210" cy="210" r="4" fill="#ffffff" filter="url(#007-glow)" />
              <circle cx="210" cy="165" r="4.5" fill={gold} />
              <circle cx="255" cy="245" r="4.5" fill={gold} />
              <circle cx="165" cy="245" r="4.5" fill={gold} />
            </g>

            <text x="50" y="70" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">TAXONOMY ALIGNMENT: SOVEREIGN SYSTEMATIC</text>
            <text x="50" y="90" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.8" className="font-bold">AUTHORITY OVER EMERGENCY PROTOCOLS</text>
          </svg>
        );

      case 'dynamics-of-inevitability':
      case '008': // The Dynamics of Inevitability
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {renderDefs('008')}
            <rect width="800" height="500" fill={bgDark} />
            <rect width="800" height="500" fill="url(#008-grid)" />

            {/* Inevitability Gravity-Well (Distortion of Space-Time Grid for perfect alignment) */}
            <g transform="translate(0, 10)">
              {/* Concentric gravitational vectors */}
              <circle cx="400" cy="240" r="210" stroke={platinum} strokeWidth="0.5" opacity="0.1" />
              <circle cx="400" cy="240" r="170" stroke={platinum} strokeWidth="0.75" opacity="0.15" strokeDasharray="5,10" />
              <circle cx="400" cy="240" r="130" stroke={gold} strokeWidth="1" strokeDasharray="3,6" opacity="0.4" />
              <circle cx="400" cy="240" r="90" stroke={gold} strokeWidth="2" strokeDasharray="1,4" filter="url(#008-glow)" />

              {/* Fibonacci Perfect Bending Curve pulling to center */}
              <path d="M 120 240 C 240 100, 320 180, 400 240" stroke="url(#008-gradient-gold)" strokeWidth="3" filter="url(#008-glow)" strokeLinecap="round" />
              <path d="M 680 240 C 560 380, 480 300, 400 240" stroke="url(#008-gradient-platinum)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

              {/* Central Success Node (The Cosmic Sink) */}
              <circle cx="400" cy="240" r="12" fill={bgDark} stroke={gold} strokeWidth="2" filter="url(#008-glow)" />
              <circle cx="400" cy="240" r="4.5" fill="#ffffff" filter="url(#008-glow)" />

              {/* Absolute alignment markers */}
              <line x1="400" y1="50" x2="400" y2="430" stroke={gold} strokeWidth="0.5" opacity="0.3" strokeDasharray="8,8" />
              <line x1="210" y1="240" x2="590" y2="240" stroke={gold} strokeWidth="0.5" opacity="0.3" strokeDasharray="8,8" />
            </g>

            <text x="50" y="70" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">STRUCTURAL EFFICIENCY COEFFICIENT: INEVITABLE</text>
            <text x="50" y="90" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.8" className="font-bold">THE DYNAMICS OF INEVITABILITY ARCHITECTURE</text>
            <text x="750" y="445" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">SYSTEMS DOMINATE TALENT // TULC DISPATCH</text>
          </svg>
        );

      case 'cost-of-organizational-latency':
      case '009': // The Cost of Organizational Latency
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {renderDefs('009')}
            <rect width="800" height="500" fill={bgDark} />
            <rect width="800" height="500" fill="url(#009-grid)" />

            {/* High-Precision latency metric bar with instant response integration */}
            <g transform="translate(100, 60)">
              {/* Background scale */}
              <line x1="50" y1="180" x2="550" y2="180" stroke={platinum} strokeWidth="1" opacity="0.15" />
              
              {/* Millisecond division hashmarks */}
              {Array.from({ length: 11 }).map((_, i) => (
                <line 
                  key={i} 
                  x1={50 + i * 50} 
                  y1="174" 
                  x2={50 + i * 50} 
                  y2="186" 
                  stroke={platinum} 
                  strokeWidth="0.75" 
                  opacity={i % 5 === 0 ? 0.4 : 0.2} 
                />
              ))}

              {/* Red-Zone (Severe Latency tax - uncalibrated firms) */}
              <text x="120" y="110" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.5">UNCALIBRATED LAG FRICTION ENVELOPE</text>
              <rect x="50" y="125" width="250" height="15" rx="3" fill="rgba(255, 77, 77, 0.05)" stroke="rgba(255, 77, 77, 0.2)" strokeWidth="1" />
              <line x1="300" y1="120" x2="300" y2="145" stroke="#ff4d4d" strokeWidth="1" opacity="0.5" />
              <text x="300" y="115" fill="#ff4d4d" fontSize="8" fontFamily="monospace" opacity="0.7" textAnchor="middle">INACTION WINDOW (48H+)</text>

              {/* Sovereign Absolute Zero-Latency Target (Committed edge alignment) */}
              <text x="450" y="250" fill={gold} fontSize="8" fontFamily="monospace" className="font-bold">SOVEREIGN PROTOCOL TARGET (ZERO TAX)</text>
              <rect x="420" y="195" width="130" height="15" rx="3" fill="rgba(223, 186, 107, 0.1)" stroke={gold} strokeWidth="1.5" />
              
              {/* Connecting light beam showing instant transition */}
              <path d="M 300 132 C 380 132, 380 202, 420 202" stroke="url(#009-gradient-gold)" strokeWidth="2.5" filter="url(#009-glow)" />
              <circle cx="300" cy="132" r="4.5" fill="#ff4d4d" />
              <circle cx="420" cy="202" r="5" fill="#ffffff" filter="url(#009-glow)" />
              <circle cx="550" cy="180" r="4" fill={platinum} opacity="0.5" />
            </g>

            <text x="50" y="70" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">FIDUCIARY LOSS MATRIX: CORRECTED</text>
            <text x="50" y="90" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.8" className="font-bold">MEASURING & NEUTRALIZING THE INACTION TAX</text>
            <text x="750" y="445" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">LATENCY MATRIX RESOLVED // ZERO TEMPORAL DRIFT</text>
          </svg>
        );

      default: // Elegant Fibonacci Spiral / Golden Ratio lines (Unified Sovereign Branding)
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {renderDefs('generic')}
            <rect width="800" height="500" fill={bgDark} />
            <rect width="800" height="500" fill="url(#generic-grid)" />
            
            <circle cx="400" cy="250" r="230" stroke={gridColor} strokeWidth="1.5" />
            <circle cx="400" cy="250" r="160" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
            <circle cx="400" cy="250" r="90" stroke="rgba(223, 186, 107, 0.08)" strokeWidth="1.5" />

            {/* Mathematical Curve (Fibonacci Golden Arc) */}
            <path d="M 400 250 A 20 20 0 0 1 420 250 A 30 30 0 0 1 420 280 A 50 50 0 0 1 370 280 A 80 80 0 0 1 370 200 A 130 130 0 0 1 500 200 A 210 210 0 0 1 500 410 A 340 340 0 0 1 160 410" stroke="url(#generic-gradient-gold)" strokeWidth="2" strokeLinecap="round" filter="url(#generic-glow)" opacity="0.85" />
            
            {/* Alignment metrics and labeling */}
            <line x1="160" y1="410" x2="400" y2="250" stroke={platinum} strokeWidth="0.75" opacity="0.25" strokeDasharray="3,3" />
            <circle cx="160" cy="410" r="5" fill={platinum} />
            <circle cx="400" cy="250" r="5" fill={gold} filter="url(#generic-glow)" />
            
            <text x="50" y="70" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">SOVEREIGN SYSTEM ARCHITECTURE // V4.0</text>
            <text x="50" y="90" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.8" className="font-bold">SYSTEMIC INTEL: {title ? title.toUpperCase() : (id || "TULC_CENTRAL_DB")}</text>
            <text x="750" y="445" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">COEFFICIENT OF INEVITABILITY: CALIBRATED</text>
          </svg>
        );
    }
  };

  return (
    <div id={`artwork-${id}`} className={`relative bg-zinc-950 overflow-hidden flex items-center justify-center ${className}`}>
      {renderArtwork()}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
