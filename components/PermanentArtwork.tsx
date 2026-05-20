import React from 'react';

interface ArtworkProps {
  id: string;
  title: string;
  className?: string;
}

export const PermanentArtwork: React.FC<ArtworkProps> = ({ id, title, className = "w-full h-full" }) => {
  // Normalize ID for comparison
  const normId = id ? id.toUpperCase() : 'GENERIC';

  // Aesthetic Definitions
  const bgDark = "#111111";
  const bgCard = "#161616";
  const gold = "#b8860b";
  const platinum = "#8a95a5";
  const gridColor = "rgba(255,255,255,0.03)";
  const indexColor = "rgba(184, 134, 11, 0.15)";

  const renderArtwork = () => {
    switch (normId) {
      case 'INT-010': // The Architecture of Authority
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Dark background */}
            <rect width="800" height="500" fill={bgCard} />
            
            {/* Fine Architecture Grid */}
            <pattern id="grid-010" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={gridColor} strokeWidth="1" />
            </pattern>
            <rect width="800" height="500" fill="url(#grid-010)" />
            
            {/* Technical blueprint lines */}
            <circle cx="400" cy="250" r="180" stroke={gold} strokeWidth="1" strokeDasharray="5,5" opacity="0.4" />
            <circle cx="400" cy="250" r="120" stroke={platinum} strokeWidth="0.75" opacity="0.3" />
            
            {/* Structural Vault lines */}
            <path d="M 150 420 L 400 70 L 650 420" stroke={platinum} strokeWidth="1.5" opacity="0.25" />
            <path d="M 220 420 L 400 140 L 580 420" stroke={gold} strokeWidth="1.5" opacity="0.4" />
            
            {/* Vertical Axis of Intent */}
            <line x1="400" y1="50" x2="400" y2="450" stroke={gold} strokeWidth="1" strokeDasharray="8,8" opacity="0.5" />
            
            {/* Intersecting Horizon Lines */}
            <line x1="100" y1="250" x2="700" y2="250" stroke={platinum} strokeWidth="0.5" opacity="0.3" />
            <line x1="100" y1="420" x2="700" y2="420" stroke={gold} strokeWidth="0.5" opacity="0.3" />
            
            {/* Architectural Nodes */}
            <circle cx="400" cy="140" r="5" fill={gold} />
            <circle cx="400" cy="70" r="3" fill="#ffffff" />
            <circle cx="220" cy="420" r="4" fill={platinum} />
            <circle cx="580" cy="420" r="4" fill={platinum} />
            <circle cx="400" cy="250" r="6" fill="none" stroke={gold} strokeWidth="2" />
            
            {/* Technical labeling */}
            <text x="50" y="80" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">SCALE: SOVEREIGN PROTOCOL V1.0</text>
            <text x="50" y="100" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.6">MODEL: INT-010 // SYSTEM_AUTHORITY</text>
            <text x="620" y="440" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">COORDINATES: LND // NYC // SGP</text>
            
            {/* Golden Core highlight */}
            <path d="M 370 250 L 400 230 L 430 250 L 400 270 Z" fill={gold} opacity="0.2" />
          </svg>
        );

      case 'INT-011': // Strategic Substrates
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="800" height="500" fill={bgCard} />
            
            <pattern id="grid-011" width="50" height="25" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 25" fill="none" stroke={gridColor} strokeWidth="0.75" />
            </pattern>
            <rect width="800" height="500" fill="url(#grid-011)" />
            
            {/* Prism / Refraction Lines */}
            <polygon points="400,100 250,350 550,350" stroke={platinum} strokeWidth="1" opacity="0.2" />
            
            {/* Substrates Layer 1 */}
            <g opacity="0.8">
              <path d="M 150 350 L 300 250 L 650 250 L 500 350 Z" fill="rgba(255,255,255,0.01)" stroke={platinum} strokeWidth="1" />
              <line x1="225" y1="300" x2="575" y2="300" stroke={platinum} strokeWidth="0.5" strokeDasharray="3,3" />
            </g>

            {/* Substrates Layer 2 (The Golden Focus Layer) */}
            <g opacity="0.9" transform="translate(0, -60)">
              <path d="M 150 350 L 300 250 L 650 250 L 500 350 Z" fill="rgba(184, 134, 11, 0.03)" stroke={gold} strokeWidth="1.5" />
              <line x1="150" y1="350" x2="500" y2="350" stroke={gold} strokeWidth="0.5" />
              <line x1="300" y1="250" x2="650" y2="250" stroke={gold} strokeWidth="0.5" />
              {/* Intersecting light beams */}
              <path d="M 400 160 L 225 290 L 575 290 Z" fill="none" stroke={gold} strokeWidth="0.75" strokeDasharray="5,5" opacity="0.4" />
            </g>

            {/* Substrates Layer 3 */}
            <g opacity="0.5" transform="translate(0, -120)">
              <path d="M 150 350 L 300 250 L 650 250 L 500 350 Z" fill="none" stroke={platinum} strokeWidth="0.75" />
            </g>
            
            {/* Core laser alignment */}
            <line x1="400" y1="40" x2="400" y2="400" stroke={gold} strokeWidth="1" opacity="0.3" id="central-laser" />
            <circle cx="400" cy="190" r="8" fill="none" stroke={gold} strokeWidth="1.5" />
            <circle cx="400" cy="190" r="3" fill="#ffffff" />
            
            {/* Technical markers */}
            <text x="50" y="80" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">AEO PROTOCOL: HIGH-FIDELITY COHERENCE</text>
            <text x="50" y="100" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.6">SUBSTRATE VERIFICATION: ACTIVE</text>
            <text x="750" y="440" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">LATENCY MATRIX: 0.00ms</text>
          </svg>
        );

      case 'INT-012': // Sovereign Leadership
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="800" height="500" fill={bgCard} />
            
            <pattern id="grid-012" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.06)" />
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke={gridColor} strokeWidth="0.5" />
            </pattern>
            <rect width="800" height="500" fill="url(#grid-012)" />

            {/* Cybernetic concentric circles */}
            <circle cx="400" cy="250" r="210" stroke={platinum} strokeWidth="0.5" opacity="0.2" />
            <circle cx="400" cy="250" r="170" stroke={gold} strokeWidth="1.5" strokeDasharray="3,9" opacity="0.6" />
            <circle cx="400" cy="250" r="130" stroke={platinum} strokeWidth="1.25" opacity="0.3" />
            <circle cx="400" cy="250" r="80" stroke={gold} strokeWidth="2" opacity="0.8" />
            
            {/* Satellite network nodes & orbits */}
            <line x1="400" y1="40" x2="400" y2="460" stroke={platinum} strokeWidth="0.5" opacity="0.15" />
            <line x1="190" y1="250" x2="610" y2="250" stroke={platinum} strokeWidth="0.5" opacity="0.15" />
            
            {/* Golden Star Pattern Intersections */}
            <path d="M 400 170 L 480 250 L 400 330 L 320 250 Z" fill="none" stroke={gold} strokeWidth="1" opacity="0.3" />
            <path d="M 400 210 L 440 250 L 400 290 L 360 250 Z" fill={gold} opacity="0.15" />

            <circle cx="400" cy="170" r="4" fill={platinum} />
            <circle cx="400" cy="330" r="4" fill={platinum} />
            <circle cx="480" cy="250" r="4" fill={gold} />
            <circle cx="320" cy="250" r="4" fill={gold} />
            
            <circle cx="400" cy="250" r="5" fill="#ffffff" />
            
            {/* Tech spec labels */}
            <text x="50" y="80" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">AEO/GEO SIGNAL INDEX: CALIBRATED</text>
            <text x="50" y="100" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.6">SOVEREIGN CORE: CYBERNETIC_HARMONY</text>
            <text x="750" y="440" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">SYSTEMS INTELLIGENCE STACK</text>
          </svg>
        );

      case 'INT-001': // The Founder's Dilemma
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="800" height="500" fill={bgCard} />
            
            {/* Diagonal isometric alignment grid */}
            <line x1="0" y1="100" x2="800" y2="500" stroke={gridColor} strokeWidth="0.5" />
            <line x1="0" y1="200" x2="800" y2="600" stroke={gridColor} strokeWidth="0.5" />
            <line x1="0" y1="0" x2="800" y2="400" stroke={gridColor} strokeWidth="0.5" />
            <line x1="0" y1="400" x2="200" y2="500" stroke={gridColor} strokeWidth="0.5" />
            <line x1="600" y1="0" x2="800" y2="100" stroke={gridColor} strokeWidth="0.5" />
            
            {/* Horizontal guidelines */}
            <line x1="50" y1="250" x2="750" y2="250" stroke={platinum} strokeWidth="0.5" opacity="0.2" />

            {/* The Founders loop vs Successors system */}
            {/* Left box (Charismatic Anchor) */}
            <rect x="200" y="150" width="160" height="200" rx="4" stroke={platinum} strokeWidth="1" strokeDasharray="4,4" fill="rgba(255,255,255,0.005)" opacity="0.4" />
            <circle cx="280" cy="250" r="30" stroke={platinum} strokeWidth="1" opacity="0.5" />
            <text x="280" y="255" fill={platinum} fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.5">MEMBER_CENTRIC</text>
            
            {/* Right box (Systemic Sovereign Foundation) */}
            <rect x="440" y="150" width="160" height="200" rx="4" stroke={gold} strokeWidth="1.5" fill="rgba(184, 134, 11, 0.02)" />
            <rect x="470" y="180" width="100" height="140" stroke={gold} strokeWidth="1" opacity="0.4" />
            <polygon points="520,225 545,265 495,265" stroke={gold} strokeWidth="1" fill="none" />
            <text x="520" y="305" fill={gold} fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="1" opacity="0.8">SYSTEM_SOVEREIGN</text>

            {/* Handover Vector Arrow */}
            <path d="M 320 250 L 480 250" stroke={gold} strokeWidth="2" strokeDasharray="3,0" />
            <path d="M 480 250 L 470 245 M 480 250 L 470 255" stroke={gold} strokeWidth="2" />
            
            <text x="400" y="235" fill={gold} fontSize="9" fontFamily="monospace" textAnchor="middle" className="font-bold">HANDOVER PROTOCOL</text>

            <text x="50" y="80" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">TRANSITION MATRIX: RE-ENGINEERED</text>
            <text x="50" y="100" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.6">FIDUCIARY EXCELLENCE STABILIZER // ACTV</text>
          </svg>
        );

      case 'INT-002': // The Cognitive Tax of Leadership
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="800" height="500" fill={bgCard} />
            
            {/* Dense technical vertical lines */}
            <pattern id="grid-002" width="20" height="500" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="500" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
            </pattern>
            <rect width="800" height="500" fill="url(#grid-002)" />

            {/* Left side: Turbulent waveforms representing cognitive friction */}
            <path d="M 100 250 Q 150 150 200 250 T 300 250 T 400 250" stroke={platinum} strokeWidth="1" opacity="0.3" strokeDasharray="3,6" />
            <path d="M 100 250 Q 130 300 220 200 T 350 280 T 400 250" stroke={platinum} strokeWidth="0.75" opacity="0.2" />
            <path d="M 100 250 Q 180 80 250 280 T 400 250" stroke={platinum} strokeWidth="0.5" opacity="0.15" />

            {/* The Lens / Filter (Substrate Optimization) */}
            <polygon points="400,150 430,250 400,350 370,250" fill="rgba(184, 134, 11, 0.05)" stroke={gold} strokeWidth="1.5" />
            <line x1="400" y1="100" x2="400" y2="400" stroke={gold} strokeWidth="0.5" opacity="0.4" />
            
            {/* Right side: Focused perfect golden ray, no tax */}
            <line x1="415" y1="250" x2="700" y2="250" stroke={gold} strokeWidth="3" />
            <line x1="415" y1="250" x2="650" y2="210" stroke={gold} strokeWidth="0.75" opacity="0.4" />
            <line x1="415" y1="250" x2="650" y2="290" stroke={gold} strokeWidth="0.75" opacity="0.4" />

            <circle cx="415" cy="250" r="5" fill="#ffffff" />
            <circle cx="700" cy="250" r="6" fill={gold} />

            <text x="250" y="380" fill={platinum} fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.5">COGNITIVE COMPLEXITY (TACTICAL NOISE)</text>
            <text x="580" y="380" fill={gold} fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.8">40% STRATEGIC BANDWIDTH RECLAIMED</text>

            <text x="50" y="80" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">COGNITIVE LOAD: COMPRESSED</text>
            <text x="50" y="100" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.6">YIELD PERFORMANCE DYNAMIC: MAXIMUM</text>
          </svg>
        );

      case 'INT-003': // Bridging the Strategy-Execution Gap
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="800" height="500" fill={bgCard} />
            
            {/* Blueprint grid with horizontal emphasis */}
            <pattern id="grid-003" width="80" height="40" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 40" fill="none" stroke={gridColor} strokeWidth="0.75" />
            </pattern>
            <rect width="800" height="500" fill="url(#grid-003)" />

            {/* Board / Directional Level */}
            <line x1="150" y1="150" x2="650" y2="150" stroke={platinum} strokeWidth="1.5" opacity="0.3" strokeDasharray="3,3" />
            <circle cx="150" cy="150" r="5" fill={platinum} opacity="0.4" />
            <text x="140" y="135" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.5">STRATEGIC DIRECTIVE (BOARD)</text>

            {/* Structural Bridge Truss Structure (Engineering Alignment) */}
            <path d="M 150 350 L 250 150 L 350 350 L 450 150 L 550 350 L 650 150" stroke={gold} strokeWidth="1" opacity="0.5" />
            <path d="M 150 150 L 250 350 L 350 150 L 450 350 L 550 150 L 650 350" stroke={gold} strokeWidth="1" opacity="0.2" />
            
            {/* Operational / Execution Level */}
            <line x1="150" y1="350" x2="650" y2="350" stroke={gold} strokeWidth="2" />
            <circle cx="650" cy="350" r="5" fill={gold} />
            <text x="660" y="370" fill={gold} fontSize="8" fontFamily="monospace" opacity="0.8" textAnchor="end">HIGH-FIDELITY RESULT (OPERATOR)</text>

            {/* Calibrated Connection Vector */}
            <line x1="400" y1="120" x2="400" y2="380" stroke={gold} strokeWidth="0.75" strokeDasharray="5,5" opacity="0.5" />
            <circle cx="400" cy="150" r="4" fill="#ffffff" stroke={gold} strokeWidth="1" />
            <circle cx="400" cy="350" r="4" fill="#ffffff" stroke={gold} strokeWidth="1" />

            <text x="50" y="80" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">ALIGNMENT INDEX: 99.8% FIDELITY</text>
            <text x="50" y="100" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.6">CALIBRATION ENGINE // COMMITTED</text>
          </svg>
        );

      default: // Elegant Fibonacci Spiral / Golden Ratio lines (Unified Sovereign Branding)
        return (
          <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="800" height="500" fill={bgCard} />
            
            {/* Intricate concentric grid */}
            <pattern id="grid-generic" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke={gridColor} strokeWidth="0.5" />
            </pattern>
            <rect width="800" height="500" fill="url(#grid-generic)" />
            
            <circle cx="400" cy="250" r="230" stroke={gridColor} strokeWidth="1.5" />
            <circle cx="400" cy="250" r="150" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
            <circle cx="400" cy="250" r="90" stroke="rgba(184,134,11,0.08)" strokeWidth="1.5" />

            {/* Mathematical Curve (Fibonacci Golden Arc) */}
            <path d="M 400 250 A 20 20 0 0 1 420 250 A 30 30 0 0 1 420 280 A 50 50 0 0 1 370 280 A 80 80 0 0 1 370 200 A 130 130 0 0 1 500 200 A 210 210 0 0 1 500 410 A 340 340 0 0 1 160 410" stroke={gold} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            
            {/* Alignment metrics and labeling */}
            <line x1="160" y1="410" x2="400" y2="250" stroke={platinum} strokeWidth="0.75" opacity="0.25" strokeDasharray="3,3" />
            <circle cx="160" cy="410" r="4" fill={platinum} />
            <circle cx="400" cy="250" r="4" fill={gold} />
            
            <text x="50" y="80" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="2">SOVEREIGN SYSTEM ARCHITECTURE // V4.0</text>
            <text x="50" y="100" fill={gold} fontSize="9" fontFamily="monospace" opacity="0.6">REGISTRY ID: {id || "TULC_CENTRAL_DB"}</text>
            <text x="750" y="440" fill={platinum} fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">INEVITABILITY COEFFICIENT: CALIBRATED</text>
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
