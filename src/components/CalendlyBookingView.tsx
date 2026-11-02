import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  ExternalLink, 
  Copy, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Edit3, 
  Save, 
  Loader2, 
  Video, 
  ArrowLeft,
  ArrowRight,
  Send,
  Lock
} from 'lucide-react';
import { getCalendlyUrl, setCalendlyUrl } from '../utils/calendlyConfig';

interface CalendlyBookingViewProps {
  onBackToHome: () => void;
  onNavigateToContact: () => void;
}

export const CalendlyBookingView: React.FC<CalendlyBookingViewProps> = ({
  onBackToHome,
  onNavigateToContact
}) => {
  const [calendlyUrl, setUrlState] = useState<string>(getCalendlyUrl());
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [urlInput, setUrlInput] = useState(calendlyUrl);
  const [copied, setCopied] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    const current = getCalendlyUrl();
    setUrlState(current);
    setUrlInput(current);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(calendlyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = urlInput.trim();
    if (clean) {
      setCalendlyUrl(clean);
      setUrlState(clean);
      setIsEditingUrl(false);
      setIframeLoading(true);
    }
  };

  const embedUrl = calendlyUrl.includes('?') 
    ? `${calendlyUrl}&hide_gdpr_banner=1&background_color=f8f6f0&text_color=17181c&primary_color=9d7b38`
    : `${calendlyUrl}?hide_gdpr_banner=1&background_color=f8f6f0&text_color=17181c&primary_color=9d7b38`;

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-black py-4 sm:py-6 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Top Breadcrumb & Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#d8cebe]">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-black hover:text-[#9d7b38] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#9d7b38]" />
            <span>Back to Home</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white border border-[#d8cebe] rounded-xs text-[11px] text-black font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>Strict In-Camera Non-Disclosure · 1-on-1 with Suchita Sancheti</span>
          </div>

          <button
            onClick={onNavigateToContact}
            className="text-xs font-mono font-bold uppercase text-black hover:text-[#9d7b38] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Written Inquiry Form →</span>
          </button>
        </div>

        {/* Header Hero Area */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-black text-[#d4af37] text-[10px] font-mono uppercase font-bold rounded-xs">
            <Calendar className="w-3 h-3 text-[#d4af37]" />
            <span>Direct Calendar Booking</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight leading-tight">
            Schedule a Private 20-Min Executive Briefing
          </h1>

          <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
            Select a live date and time directly on Suchita Sancheti's official calendar. An automatic calendar invite with private video conference credentials will be dispatched to your inbox.
          </p>
        </div>

        {/* 3 Pillar Value Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white border border-[#d8cebe] rounded-md shadow-2xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-black">
              <Clock className="w-4 h-4 text-[#9d7b38]" />
              <span>20-Minute Direct Sparring</span>
            </div>
            <p className="text-zinc-600 text-[11px] leading-snug">
              Laser-focused session diagnosing founder bottlenecks, committee drift, and 90-day decoupling runway.
            </p>
          </div>

          <div className="p-3 bg-white border border-[#d8cebe] rounded-md shadow-2xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-black">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Chatham House Privilege</span>
            </div>
            <p className="text-zinc-600 text-[11px] leading-snug">
              Strict non-disclosure enforced. Disclosures are never logged or shared with external parties.
            </p>
          </div>

          <div className="p-3 bg-white border border-[#d8cebe] rounded-md shadow-2xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-black">
              <Sparkles className="w-4 h-4 text-[#9d7b38]" />
              <span>Zero Intermediary Triage</span>
            </div>
            <p className="text-zinc-600 text-[11px] leading-snug">
              You speak directly with Suchita Sancheti — not junior analysts, sales reps, or account coordinators.
            </p>
          </div>
        </div>

        {/* Direct Link Controls Bar */}
        <div className="p-3 bg-white border-2 border-[#d8cebe] rounded-md flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-black uppercase">
              Direct Link:
            </span>
            <code className="px-2 py-1 bg-[#faf8f4] border border-stone-200 rounded text-xs text-black font-mono select-all">
              {calendlyUrl}
            </code>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-black hover:bg-zinc-800 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Open in New Tab</span>
            </a>

            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-white hover:bg-stone-100 text-black border border-stone-300 font-mono font-bold text-xs uppercase rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsEditingUrl(!isEditingUrl)}
              className="text-[11px] font-mono text-zinc-600 hover:text-black flex items-center gap-1 underline cursor-pointer ml-1"
            >
              <Edit3 className="w-3 h-3 text-[#9d7b38]" />
              <span>{isEditingUrl ? 'Cancel' : 'Change URL'}</span>
            </button>
          </div>
        </div>

        {/* Change URL Input Form */}
        {isEditingUrl && (
          <form onSubmit={handleSaveUrl} className="p-3.5 bg-white border-2 border-black rounded-md space-y-2">
            <label className="block text-xs font-mono uppercase font-bold text-black">
              Specify Custom Calendly URL:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                required
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://calendly.com/your-username/meeting"
                className="flex-1 bg-[#faf8f4] border border-stone-300 rounded px-3 py-2 text-xs text-black font-mono focus:outline-none focus:border-black"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-xs font-mono font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <Save className="w-3 h-3 text-[#d4af37]" />
                <span>Save URL</span>
              </button>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono">
              The updated Calendly booking link will be saved in your browser and used across all booking buttons.
            </p>
          </form>
        )}

        {/* Responsive Interactive Calendar Embed */}
        <div className="relative w-full h-[620px] sm:h-[720px] bg-white border-2 border-black rounded-lg shadow-md overflow-hidden">
          {iframeLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#faf8f4] text-zinc-700 space-y-2 z-10">
              <Loader2 className="w-7 h-7 animate-spin text-[#9d7b38]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                Loading Secure Calendly Interface...
              </span>
              <p className="text-xs text-zinc-500 max-w-sm text-center">
                Fetching real-time executive calendar slots with Suchita Sancheti.
              </p>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-xs font-bold text-[#9d7b38] underline flex items-center gap-1"
              >
                <span>If calendar doesn't appear, click here to open directly</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Calendly Executive Booking"
            onLoad={() => setIframeLoading(false)}
            className="w-full h-full"
          />
        </div>

        {/* Footer Alternative Options */}
        <div className="p-4 bg-white border border-[#d8cebe] rounded-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div>
            <strong className="block text-black">Need Institutional In-Camera Clearance First?</strong>
            <span className="text-zinc-600">
              If your board requires formal mutual NDAs prior to scheduling, submit a confidential dossier.
            </span>
          </div>

          <button
            onClick={onNavigateToContact}
            className="px-4 py-2 bg-black hover:bg-zinc-800 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xs transition-colors shrink-0 cursor-pointer"
          >
            <span>Open In-Camera Dossier Form</span>
          </button>
        </div>

      </div>
    </div>
  );
};
