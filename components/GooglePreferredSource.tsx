import React, { useState } from 'react';
import { ExternalLink, Check, Sparkles, X, Globe } from 'lucide-react';

interface GooglePreferredSourceProps {
  variant?: 'button' | 'card' | 'inline' | 'compact';
  className?: string;
  domain?: string;
}

export const GooglePreferredSource: React.FC<GooglePreferredSourceProps> = ({
  variant = 'button',
  className = '',
  domain = 'theunboundedleadership.com'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Google Preferred Source Deeplink as per Google for Developers guidelines:
  // https://www.google.com/preferences/source?q=[domain]
  const canonicalDomain = 'theunboundedleadership.com';
  const targetDomain = typeof window !== 'undefined' && window.location.hostname && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('run.app')
    ? window.location.hostname 
    : (domain || canonicalDomain);

  const googlePreferredUrl = `https://www.google.com/preferences/source?q=${encodeURIComponent('https://theunboundedleadership.com')}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(googlePreferredUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'compact') {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#efebe2] hover:bg-[#e4ded0] text-[#57534e] hover:text-[#1c1917] border border-[#ded6c5] rounded-xs font-serif text-[10px] uppercase tracking-wider transition-all duration-200 cursor-pointer ${className}`}
          title="Add to Google Preferred Sources"
        >
          <GoogleIcon className="w-3 h-3" />
          <span>Google Preferred Source</span>
        </button>

        {isOpen && (
          <GooglePreferenceModal 
            onClose={() => setIsOpen(false)} 
            googleUrl={googlePreferredUrl} 
            domain={targetDomain}
            copied={copied}
            onCopy={handleCopyLink}
          />
        )}
      </>
    );
  }

  if (variant === 'inline') {
    return (
      <>
        <div className={`p-4 bg-[#ffffff] border border-[#ded6c5] rounded-xs text-left shadow-2xs font-serif ${className}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#efebe2] border border-[#ded6c5] flex items-center justify-center shrink-0">
                <GoogleIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[#8c6708] text-[9px] uppercase font-bold tracking-widest block font-serif">
                  Google Search Integration
                </span>
                <p className="text-[#1c1917] text-xs font-serif italic">
                  Set The Unbounded as your Preferred Source in Google Search & Discover.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={googlePreferredUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#b8860b] hover:bg-[#a17812] text-white font-serif font-bold text-[10px] uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <span>Add Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => setIsOpen(true)}
                className="px-2.5 py-1.5 bg-[#efebe2] hover:bg-[#e4ded0] text-[#57534e] font-serif text-[10px] uppercase border border-[#ded6c5] rounded-xs transition-colors cursor-pointer"
              >
                Why?
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <GooglePreferenceModal 
            onClose={() => setIsOpen(false)} 
            googleUrl={googlePreferredUrl} 
            domain={targetDomain}
            copied={copied}
            onCopy={handleCopyLink}
          />
        )}
      </>
    );
  }

  if (variant === 'card') {
    return (
      <>
        <div className={`p-6 bg-[#ffffff] border border-[#ded6c5] rounded-xs text-left relative overflow-hidden shadow-xs font-serif ${className}`}>
          <div className="absolute top-0 right-0 px-3 py-1 bg-[#efebe2] text-[#8c6708] text-[9px] font-bold uppercase tracking-widest font-serif border-b border-l border-[#ded6c5]">
            Verified Source
          </div>

          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#efebe2] border border-[#ded6c5] flex items-center justify-center shrink-0 mt-0.5">
              <GoogleIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[#8c6708] text-[9px] uppercase font-bold tracking-widest block mb-1 font-serif">
                Executive Telemetry Distribution
              </span>
              <h4 className="text-[#1c1917] font-serif font-bold text-base sm:text-lg leading-tight">
                Prioritize Sovereign Intelligence in Google Search
              </h4>
            </div>
          </div>

          <p className="text-[#57534e] text-xs font-serif italic leading-relaxed mb-5">
            Add <strong className="text-[#1c1917] font-semibold">The Unbounded Leadership Co.</strong> directly to your Google Search & Discover preferred source list to ensure Founder Suchita Sancheti’s proprietary white papers, mathematical execution protocol research, and executive dispatches are surfaced first.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={googlePreferredUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-[#b8860b] to-[#8c6708] hover:from-[#c99518] hover:to-[#9e7610] text-white font-serif font-bold text-[10px] uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 shadow-2xs"
            >
              <GoogleIcon className="w-3.5 h-3.5" />
              <span>Add to Google Preferred Sources</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => setIsOpen(true)}
              className="px-3.5 py-2 bg-[#efebe2] hover:bg-[#e4ded0] text-[#57534e] hover:text-[#1c1917] font-serif text-[10px] uppercase border border-[#ded6c5] rounded-xs transition-colors cursor-pointer"
            >
              How It Works
            </button>
          </div>
        </div>

        {isOpen && (
          <GooglePreferenceModal 
            onClose={() => setIsOpen(false)} 
            googleUrl={googlePreferredUrl} 
            domain={targetDomain}
            copied={copied}
            onCopy={handleCopyLink}
          />
        )}
      </>
    );
  }

  // Default 'button' variant
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 bg-[#efebe2] hover:bg-[#b8860b]/20 text-[#57534e] hover:text-[#8c6708] border border-[#ded6c5] hover:border-[#b8860b]/40 rounded-xs font-serif text-[9px] sm:text-[10px] uppercase tracking-wider transition-all duration-200 cursor-pointer ${className}`}
      >
        <GoogleIcon className="w-3.5 h-3.5" />
        <span>Prioritize in Google Search</span>
        <Sparkles className="w-2.5 h-2.5 text-[#8c6708]" />
      </button>

      {isOpen && (
        <GooglePreferenceModal 
          onClose={() => setIsOpen(false)} 
          googleUrl={googlePreferredUrl} 
          domain={targetDomain}
          copied={copied}
          onCopy={handleCopyLink}
        />
      )}
    </>
  );
};

interface ModalProps {
  onClose: () => void;
  googleUrl: string;
  domain: string;
  copied: boolean;
  onCopy: () => void;
}

const GooglePreferenceModal: React.FC<ModalProps> = ({
  onClose,
  googleUrl,
  domain,
  copied,
  onCopy
}) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in text-left font-serif">
      <div className="bg-[#ffffff] border border-[#ded6c5] rounded-xs max-w-lg w-full p-6 sm:p-8 text-[#1c1917] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#78716c] hover:text-[#1c1917] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#efebe2] border border-[#b8860b]/30 flex items-center justify-center">
            <GoogleIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[#8c6708] text-[9px] font-bold uppercase tracking-widest block font-serif">
              Google Preferred Source Protocol
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-[#1c1917]">
              Prioritize Sovereign Intelligence
            </h3>
          </div>
        </div>

        <p className="text-[#57534e] text-xs sm:text-sm font-serif italic leading-relaxed mb-6">
          Google Search enables enterprise principals to explicitly designate trusted research domains. By adding <strong>{domain}</strong> to your Google source preferences, all executive dispatches, strategic white papers, and mathematical execution protocol case studies will automatically rank higher in your personal Google Search and Discover feeds.
        </p>

        <div className="space-y-3 mb-6 font-serif text-xs">
          <div className="p-3 bg-[#faf8f5] border border-[#ded6c5] rounded-xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#57534e]">
              <Globe className="w-4 h-4 text-[#8c6708]" />
              <span className="truncate max-w-[200px] sm:max-w-xs">{domain}</span>
            </div>
            <span className="text-emerald-700 text-[10px] uppercase font-bold">Verified Authority</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-[#b8860b] to-[#8c6708] hover:from-[#c99518] hover:to-[#9e7610] text-white font-serif font-bold text-[10px] uppercase tracking-wider rounded-xs text-center transition-all flex items-center justify-center gap-2 shadow-2xs"
          >
            <span>Open Google Preference Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onCopy}
            className="px-4 py-3 bg-[#efebe2] hover:bg-[#e4ded0] text-[#292524] hover:text-[#1c1917] font-serif text-[10px] uppercase border border-[#ded6c5] rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Link Copied</span>
              </>
            ) : (
              <span>Copy Direct Link</span>
            )}
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-[#ded6c5] text-[10px] font-serif text-[#78716c] text-center">
          Powered by Google for Developers Preferred Sources Guide
        </div>
      </div>
    </div>
  );
};

const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);
