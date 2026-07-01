import React, { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'monogram' | 'clean';
  theme?: 'dark' | 'light' | 'transparent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'dark',
  size = 'md',
}) => {
  const [hasError, setHasError] = useState(false);

  // Sizing mapping
  const sizeClasses = {
    sm: 'max-w-[180px]',
    md: 'max-w-[320px]',
    lg: 'max-w-[480px]',
    xl: 'max-w-[640px] w-full',
  };

  const isDark = theme === 'dark';
  const isTransparent = theme === 'transparent';

  return (
    <div 
      id="tulc-brand-logo"
      className={`relative overflow-hidden select-none border border-amber-500/10 transition-all duration-700 shadow-xl rounded-sm ${
        isDark 
          ? 'bg-gradient-to-br from-[#040814] via-[#091126] to-[#03060f] text-white' 
          : isTransparent 
            ? 'bg-transparent text-zinc-900 border-none shadow-none' 
            : 'bg-white text-zinc-950 border-zinc-200 shadow-sm'
      } ${sizeClasses[size]} ${className}`}
    >
      {/* Subtle background texture effect for dark theme */}
      {isDark && (
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none bg-[radial-gradient(#b8860b_1px,transparent_1px)] [background-size:16px_16px]" />
      )}
      
      {/* Elegant gold radial shine in the center */}
      {isDark && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
      )}

      <div className="relative z-10 p-4 sm:p-6 flex flex-col items-center justify-center text-center">
        {!hasError ? (
          <img 
            src="/logo.jpeg" 
            alt="The Unbounded Leadership Co." 
            className="w-full h-auto object-contain rounded-xs max-h-[220px] transition-all duration-500"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
          />
        ) : (
          /* SVG Logo fallback if logo.jpeg fails */
          <svg
            viewBox="0 0 500 320"
            className="w-full h-auto drop-shadow-[0_2px_10px_rgba(184,134,11,0.15)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="gold-grad-1-fb" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8a640f" />
                <stop offset="25%" stopColor="#d1b46a" />
                <stop offset="50%" stopColor="#f3e5ab" />
                <stop offset="75%" stopColor="#d1b46a" />
                <stop offset="100%" stopColor="#8a640f" />
              </linearGradient>
              
              <linearGradient id="gold-grad-text-fb" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9a7b32" />
                <stop offset="30%" stopColor="#f5e2a3" />
                <stop offset="50%" stopColor="#dfbe6b" />
                <stop offset="70%" stopColor="#f5e2a3" />
                <stop offset="100%" stopColor="#9a7b32" />
              </linearGradient>

              <filter id="gold-glow-fb">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <g filter="url(#gold-glow-fb)">
              <path d="M 215 65 L 215 110 C 215 135, 230 145, 250 145 C 270 145, 285 135, 285 110 L 285 65 L 297 65 L 297 110 C 297 142, 275 156, 250 156 C 225 156, 203 142, 203 110 L 203 65 Z" fill="url(#gold-grad-1-fb)" />
              <path d="M 190 55 L 310 55 L 310 65 L 256 65 L 256 142 L 244 142 L 244 65 L 190 65 Z" fill="url(#gold-grad-1-fb)" />
              <path d="M 285 85 C 295 85, 305 92, 308 102 L 318 97 C 314 82, 300 73, 285 73 C 255 73, 240 95, 240 115 C 240 135, 255 157, 285 157 C 300 157, 314 148, 318 133 L 308 128 C 305 138, 295 145, 285 145 C 265 145, 252 130, 252 115 C 252 100, 265 85, 285 85 Z" fill="url(#gold-grad-1-fb)" />
              <path d="M 195 148 L 305 148 L 295 154 L 205 154 Z" fill="url(#gold-grad-1-fb)" />
            </g>

            <g transform="translate(0, 155)">
              <text x="250" y="35" textAnchor="middle" fill="url(#gold-grad-text-fb)" fontSize="31" fontWeight="bold" letterSpacing="0.16em" fontFamily="'Cinzel', serif">THE UNBOUNDED</text>
              <g transform="translate(0, 50)">
                <line x1="85" y1="15" x2="185" y2="15" stroke="url(#gold-grad-1-fb)" strokeWidth="1.2" />
                <text x="250" y="20" textAnchor="middle" fill="url(#gold-grad-text-fb)" fontSize="15" fontWeight="900" letterSpacing="0.32em" fontFamily="'Inter', sans-serif">LEADERSHIP CO.</text>
                <line x1="315" y1="15" x2="415" y2="15" stroke="url(#gold-grad-1-fb)" strokeWidth="1.2" />
              </g>
              <text x="250" y="110" textAnchor="middle" fill="#d1b46a" fillOpacity="0.9" fontSize="11.5" letterSpacing="0.06em" fontFamily="'Inter', sans-serif" fontWeight="300" fontStyle="italic">Elevating Cultures, Transforming Leadership</text>
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;
