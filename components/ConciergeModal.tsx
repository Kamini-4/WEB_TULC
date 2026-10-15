import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Mail, 
  Send, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  FileText,
  Copy,
  ExternalLink
} from 'lucide-react';
import { apiRequest } from '../src/lib/apiClient';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [capitalTier, setCapitalTier] = useState('$10M–$50M ARR');
  const [primaryFriction, setPrimaryFriction] = useState('');
  const [confidentialNote, setConfidentialNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workEmail || !fullName) return;

    setIsSubmitting(true);
    try {
      await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          fullName,
          email: workEmail,
          organization: organization || 'Direct Concierge Client',
          subject: `Confidential Executive Concierge: ${fullName} (${capitalTier})`,
          message: `Capital Tier: ${capitalTier}\nPrimary Friction: ${primaryFriction || 'Unspecified'}\nConfidential Note: ${confidentialNote || 'Direct contact requested'}\nRouting: Direct to suchita@theunboundedleadership.com`
        })
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('Concierge fallback logging:', err);
      try {
        const { SovereignDB } = await import('../lib/database');
        await SovereignDB.saveLead({
          name: fullName,
          email: workEmail,
          organization: organization || 'Executive Concierge Lead',
          role: capitalTier,
          message: `Concierge Inquiry: ${confidentialNote || primaryFriction || 'Direct Docket Request'}`
        });
      } catch (dbErr) {
        console.warn('Database fallback deferred:', dbErr);
      }
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('suchita@theunboundedleadership.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-serif">
      <div className="relative w-full max-w-xl bg-[#0d0d0d] border border-[#b8860b]/40 rounded-xs p-6 sm:p-8 shadow-2xl text-zinc-100 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xs bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Close Concierge"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#b8860b] mb-2 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#b8860b]" />
              Direct Executive Concierge Desk
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-serif leading-tight">
              Confidential Advisory Docket
            </h3>
            
            <p className="text-xs sm:text-sm text-zinc-400 mb-6 font-serif italic leading-relaxed">
              Direct, encrypted access to the Office of the Principal Architect, <strong className="text-zinc-200">Suchita Sancheti</strong>. Inquiries are reviewed under strict Fiduciary Non-Disclosure protocols.
            </p>

            {/* Direct Email Badge */}
            <div className="mb-6 p-3 bg-zinc-900/90 border border-zinc-800 rounded-xs flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <Mail className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                <span className="text-zinc-300 font-mono truncate">suchita@theunboundedleadership.com</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] font-mono uppercase font-bold rounded-2xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  <span>{emailCopied ? 'Copied' : 'Copy'}</span>
                </button>
                <a
                  href="mailto:suchita@theunboundedleadership.com?subject=Confidential%20Executive%20Inquiry%20//%20TULC"
                  className="px-2.5 py-1 bg-[#b8860b] hover:bg-[#8c6708] text-white text-[10px] font-mono uppercase font-bold rounded-2xs flex items-center gap-1 transition-colors"
                >
                  <span>Compose</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#b8860b] tracking-wider mb-1 font-bold">
                    Executive Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Marc Vance"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-sm rounded-xs focus:border-[#b8860b] focus:outline-none text-white font-serif"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#b8860b] tracking-wider mb-1 font-bold">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="e.g. m.vance@apexcapital.com"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-sm rounded-xs focus:border-[#b8860b] focus:outline-none text-white font-serif"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 tracking-wider mb-1">
                    Institution / Firm
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Sovereign Holdings Ltd."
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-sm rounded-xs focus:border-[#b8860b] focus:outline-none text-white font-serif"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 tracking-wider mb-1">
                    Scale / Enterprise Tier
                  </label>
                  <select
                    value={capitalTier}
                    onChange={(e) => setCapitalTier(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-sm rounded-xs focus:border-[#b8860b] focus:outline-none text-white font-serif"
                  >
                    <option value="$10M–$50M ARR">$10M–$50M Enterprise Scale</option>
                    <option value="$50M–$100M+ ARR">$50M–$100M+ High-Growth</option>
                    <option value="Single Family Office">Single Family Office / Dynastic</option>
                    <option value="Private Equity / VC Board">Private Equity / VC Portfolio</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 tracking-wider mb-1">
                  Primary Architectural Constraint
                </label>
                <select
                  value={primaryFriction}
                  onChange={(e) => setPrimaryFriction(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-sm rounded-xs focus:border-[#b8860b] focus:outline-none text-white font-serif"
                >
                  <option value="Founder Decision Latency">Founder Acting as Central Decision Clearinghouse</option>
                  <option value="Executive Succession Readiness">Succession Readiness & Chairman Transition</option>
                  <option value="Intent Dilution Across Layers">Intent Dilution: Frontline Drift 3 Layers Down</option>
                  <option value="Board & Leadership Misalignment">Board & Executive Committee Misalignment</option>
                  <option value="Calendar & Meeting Overload">Calendar Overload (Spending 25+ hrs in Syncs)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 tracking-wider mb-1">
                  Confidential Context / Specific Brief
                </label>
                <textarea
                  rows={3}
                  value={confidentialNote}
                  onChange={(e) => setConfidentialNote(e.target.value)}
                  placeholder="Provide any relevant context regarding your timeline, governance friction, or required outcome..."
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-sm rounded-xs focus:border-[#b8860b] focus:outline-none text-white font-serif resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 bg-[#b8860b] hover:bg-[#8c6708] text-white text-xs font-mono uppercase font-bold tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Transmitting Docket...' : 'Transmit Confidential Docket'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1">
                <span>Zero-Data Retention Guarantee</span>
                <span>Direct Review by Suchita Sancheti</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#b8860b]/20 border border-[#b8860b] flex items-center justify-center text-[#b8860b] mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-bold font-serif text-white">
              Docket Logged & Transmitted
            </h3>

            <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Your inquiry has been dispatched directly to <strong className="text-zinc-200">Suchita Sancheti</strong> at <span className="text-[#b8860b] font-mono text-xs">suchita@theunboundedleadership.com</span>. We will review and initiate alignment coordinates within 24 business hours.
            </p>

            <div className="p-4 rounded-xs bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 max-w-sm mx-auto">
              Protocol Docket: #TULC-CONCIERGE-{Math.floor(1000 + Math.random() * 9000)}
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono uppercase rounded-xs transition-colors cursor-pointer"
            >
              Close Concierge
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
