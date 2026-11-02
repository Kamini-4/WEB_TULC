import React, { useState, useEffect } from 'react';
import { 
  X, 
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
  Video
} from 'lucide-react';
import { getCalendlyUrl, setCalendlyUrl } from '../utils/calendlyConfig';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  customTitle?: string;
  contextNote?: string;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({
  isOpen,
  onClose,
  customTitle = 'Schedule 1-on-1 Executive Briefing',
  contextNote
}) => {
  const [calendlyUrl, setUrlState] = useState<string>(getCalendlyUrl());
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [urlInput, setUrlInput] = useState(calendlyUrl);
  const [copied, setCopied] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const current = getCalendlyUrl();
      setUrlState(current);
      setUrlInput(current);
      setIframeLoading(true);
      setCopied(false);
      setIsEditingUrl(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

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

  // Append embed parameters for sleek embedded look
  const embedUrl = calendlyUrl.includes('?') 
    ? `${calendlyUrl}&hide_gdpr_banner=1&background_color=f8f6f0&text_color=17181c&primary_color=9d7b38`
    : `${calendlyUrl}?hide_gdpr_banner=1&background_color=f8f6f0&text_color=17181c&primary_color=9d7b38`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white border-2 border-black rounded-lg max-w-3xl w-full p-4 sm:p-6 shadow-2xl relative my-auto text-black animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendly-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1.5 text-zinc-600 hover:text-black rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close Booking Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-stone-200 pb-3.5 pr-8 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#9d7b38] font-bold">
            <Calendar className="w-3.5 h-3.5 text-[#9d7b38]" />
            <span>Direct Calendar Integration · Executive Booking</span>
          </div>

          <h2 id="calendly-modal-title" className="text-xl sm:text-2xl font-black text-black">
            {customTitle}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-700 pt-0.5">
            <span className="flex items-center gap-1 font-semibold text-black">
              <Video className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>With Suchita Sancheti</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>20 Minutes · Private Video Session</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-emerald-800 font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Chatham House Rule</span>
            </span>
          </div>

          {contextNote && (
            <div className="mt-2 p-2 bg-[#faf8f4] border border-[#d8cebe] rounded text-xs text-zinc-800">
              {contextNote}
            </div>
          )}
        </div>

        {/* Fast Action Bar: Open External, Copy Link & Customise */}
        <div className="py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 text-xs">
          <div className="flex items-center gap-2">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-black hover:bg-zinc-800 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 shadow-xs"
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
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={() => setIsEditingUrl(!isEditingUrl)}
            className="text-[11px] font-mono text-zinc-600 hover:text-black flex items-center gap-1 underline cursor-pointer"
          >
            <Edit3 className="w-3 h-3 text-[#9d7b38]" />
            <span>{isEditingUrl ? 'Cancel Edit' : 'Edit Calendly URL'}</span>
          </button>
        </div>

        {/* Custom URL Editor Form (When Activated) */}
        {isEditingUrl && (
          <form onSubmit={handleSaveUrl} className="p-3 bg-[#faf8f4] border border-[#d8cebe] rounded-md my-2.5 space-y-2">
            <label className="block text-[11px] font-mono uppercase font-bold text-black">
              Enter Your Personal Calendly Event Link:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                required
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://calendly.com/your-username/meeting"
                className="flex-1 bg-white border border-stone-300 rounded px-2.5 py-1.5 text-xs text-black font-mono focus:outline-none focus:border-black"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-black text-white rounded-xs font-mono font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <Save className="w-3 h-3 text-[#d4af37]" />
                <span>Save</span>
              </button>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono">
              Saved locally in browser so your custom calendar link is permanently preserved.
            </p>
          </form>
        )}

        {/* Interactive Calendly Embed / Fallback Container */}
        <div className="relative w-full h-[480px] sm:h-[550px] bg-[#faf8f4] border border-stone-300 rounded-md overflow-hidden my-2">
          {iframeLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#faf8f4] text-zinc-700 space-y-2 z-10">
              <Loader2 className="w-6 h-6 animate-spin text-[#9d7b38]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                Connecting to Secure Calendar...
              </span>
              <p className="text-[11px] text-zinc-500 max-w-xs text-center">
                Loading live appointment availability directly from Calendly.
              </p>
            </div>
          )}

          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Calendly Scheduling Interface"
            onLoad={() => setIframeLoading(false)}
            className="w-full h-full"
          />
        </div>

        {/* Modal Footer Note */}
        <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-zinc-600 font-mono">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#9d7b38]" />
            <span>Automatic Google Meet & Zoom link will be issued upon booking.</span>
          </div>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-bold hover:underline"
          >
            Direct URL: {calendlyUrl}
          </a>
        </div>

      </div>
    </div>
  );
};
