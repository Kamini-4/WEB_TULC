import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  Lock, 
  Building2, 
  Clock, 
  Compass,
  AlertCircle
} from 'lucide-react';

export const IntakePage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    title: '',
    headcount: '25-100',
    mandateType: 'Sovereign Substrate (Decouple Founder)',
    currentFriction: '',
    confidentialNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Process intake submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e0e2ec] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#d4af37]">
            <Lock className="w-4 h-4 text-[#d4af37]" />
            <span>Encrypted Sovereign Intake</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-prestige font-bold text-white tracking-tight">
            Initiate Executive Mandate Advisory
          </h1>

          <p className="text-sm sm:text-base text-[#9aa1b2] font-serif-prestige leading-relaxed">
            All inquiries are treated under strict attorney-client style confidentiality and reviewed directly by Principal Suchita Sancheti.
          </p>
        </div>

        {!submitted ? (
          <form 
            onSubmit={handleSubmit}
            className="bg-[#12141a] border border-[#1f232d] rounded-xs p-6 sm:p-10 shadow-2xl space-y-8"
          >
            <div className="border-b border-[#1f232d] pb-4 flex items-center justify-between">
              <span className="text-xs uppercase font-mono-tech text-[#d4af37]">Section 1: Leadership & Enterprise Parameters</span>
              <span className="text-[11px] font-mono-tech text-[#5e6575]">Fiduciary Encryption Active</span>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="space-y-1.5">
                <label className="text-xs font-mono-tech uppercase text-[#9aa1b2]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alexandra Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#171a23] border border-[#232734] focus:border-[#b8860b] rounded-xs text-sm text-white placeholder-[#5e6575] focus-visible:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono-tech uppercase text-[#9aa1b2]">
                  Confidential Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alexandra@vanceholdings.com"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#171a23] border border-[#232734] focus:border-[#b8860b] rounded-xs text-sm text-white placeholder-[#5e6575] focus-visible:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono-tech uppercase text-[#9aa1b2]">
                  Enterprise / Fund Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vance Capital & Technologies"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#171a23] border border-[#232734] focus:border-[#b8860b] rounded-xs text-sm text-white placeholder-[#5e6575] focus-visible:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono-tech uppercase text-[#9aa1b2]">
                  Your Executive Role / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Founder & CEO / Managing Partner"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#171a23] border border-[#232734] focus:border-[#b8860b] rounded-xs text-sm text-white placeholder-[#5e6575] focus-visible:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono-tech uppercase text-[#9aa1b2]">
                  Enterprise Headcount
                </label>
                <select
                  value={formData.headcount}
                  onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#171a23] border border-[#232734] focus:border-[#b8860b] rounded-xs text-sm text-white focus-visible:outline-none cursor-pointer"
                >
                  <option value="10-25">10 - 25 (Early Scale)</option>
                  <option value="25-100">25 - 100 (Core Expansion)</option>
                  <option value="100-500">100 - 500 (Mid-Market Institutional)</option>
                  <option value="500+">500+ (Global Enterprise / Multi-Entity)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono-tech uppercase text-[#9aa1b2]">
                  Target Mandate Type
                </label>
                <select
                  value={formData.mandateType}
                  onChange={(e) => setFormData({ ...formData, mandateType: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#171a23] border border-[#232734] focus:border-[#b8860b] rounded-xs text-sm text-white focus-visible:outline-none cursor-pointer"
                >
                  <option value="Sovereign Substrate (Decouple Founder)">Mandate I: Sovereign Substrate (Decouple Founder)</option>
                  <option value="Succession Architecture (Founder to Chairman)">Mandate II: Succession Architecture (Founder to Chairman)</option>
                  <option value="VC / PE Portfolio Telemetry">Mandate III: VC / PE Portfolio Telemetry Substrates</option>
                  <option value="Inaction Tax Audit & Diagnostic">Executive Inaction Tax Comprehensive Audit</option>
                </select>
              </div>

            </div>

            {/* Qualitative Notes */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-mono-tech uppercase text-[#9aa1b2]">
                  Primary Operational Friction or Strategic Transition Focus
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., Every routine approval routes through the CEO; 25 hours spent in meetings; preparing for incoming COO handover..."
                  value={formData.currentFriction}
                  onChange={(e) => setFormData({ ...formData, currentFriction: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#171a23] border border-[#232734] focus:border-[#b8860b] rounded-xs text-sm text-white placeholder-[#5e6575] focus-visible:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono-tech uppercase text-[#9aa1b2]">
                  Confidential Context / Specific Desired Timeline
                </label>
                <textarea
                  rows={2}
                  placeholder="Any timing constraints, board expectations, or relevant fund dynamics..."
                  value={formData.confidentialNotes}
                  onChange={(e) => setFormData({ ...formData, confidentialNotes: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#171a23] border border-[#232734] focus:border-[#b8860b] rounded-xs text-sm text-white placeholder-[#5e6575] focus-visible:outline-none"
                />
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-[#1f232d] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#646b7a] font-mono-tech">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>Reviewed directly by Principal Suchita Sancheti within 24 hours.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#b8860b] hover:bg-[#d4af37] disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
              >
                <span>{isSubmitting ? 'Transmitting Securely...' : 'Transmit Sovereign Dossier'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>
        ) : (
          /* Submission Confirmation Card */
          <div className="bg-[#12141a] border border-[#b8860b]/40 rounded-xs p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#1b202c] border border-[#b8860b] text-[#d4af37] flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8 text-[#d4af37]" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-xs uppercase font-mono-tech text-[#d4af37]">Transmission Acknowledged</span>
              <h2 className="text-2xl sm:text-3xl font-serif-prestige font-bold text-white">
                Dossier Received by Principal Advisory Desk
              </h2>
              <p className="text-sm text-[#9aa1b2] font-serif-prestige leading-relaxed pt-1">
                Thank you, {formData.fullName}. Your confidential parameters for <strong className="text-white">{formData.companyName}</strong> have been secured. Principal Suchita Sancheti will review the parameters and reach out directly to <span className="text-[#d4af37]">{formData.workEmail}</span> within 24 business hours.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-[#171a23] hover:bg-[#202432] text-xs font-mono-tech text-[#9aa1b2] hover:text-white border border-[#2b3040] rounded-xs transition-colors cursor-pointer"
              >
                Submit Additional Inquiries
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
