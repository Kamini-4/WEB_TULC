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
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InternalLinksMatrix } from '../components/InternalLinksMatrix';

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
    <div className="min-h-screen bg-[#f7f4ee] text-[#1c1917] font-serif">
      <SEOHead
        title="Confidential Executive Intake & Mandate Calibration"
        description="Submit institutional parameters for direct adversarial review and yield calibration by Principal Enterprise Architect Suchita Sancheti."
        canonicalPath="/intake"
        keywords="executive intake, confidential advisory, mandate submission, suchita sancheti, sovereign governance"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Confidential Intake', path: '/intake' }
        ]}
      />
      <Breadcrumbs items={[{ name: 'Confidential Executive Intake', path: '/intake' }]} />

      <div className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-tight text-[#8c6708] font-bold">
              <Lock className="w-4 h-4 text-[#8c6708]" />
              <span>Encrypted Sovereign Intake</span>
            </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c1917] tracking-tight">
            Initiate Executive Mandate Advisory
          </h1>

          <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
            All inquiries are treated under strict attorney-client style confidentiality and reviewed directly by Principal Suchita Sancheti.
          </p>
        </div>

        {!submitted ? (
          <form 
            onSubmit={handleSubmit}
            className="bg-[#ffffff] border border-[#ded6c5] rounded-xs p-5 sm:p-8 shadow-xs space-y-6"
          >
            <div className="border-b border-[#ded6c5] pb-3.5 flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-[#8c6708] tracking-tight">Section 1: Leadership & Enterprise Parameters</span>
              <span className="text-[11px] text-[#78716c] tracking-tight">Fiduciary Encryption Active</span>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#57534e] font-bold tracking-tight">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alexandra Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#faf8f5] border border-[#ded6c5] focus:border-[#b8860b] rounded-xs text-sm text-[#1c1917] placeholder-[#a8a29e] focus-visible:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#57534e] font-bold tracking-tight">
                  Confidential Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alexandra@vanceholdings.com"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#faf8f5] border border-[#ded6c5] focus:border-[#b8860b] rounded-xs text-sm text-[#1c1917] placeholder-[#a8a29e] focus-visible:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#57534e] font-bold tracking-tight">
                  Enterprise / Fund Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vance Capital & Technologies"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#faf8f5] border border-[#ded6c5] focus:border-[#b8860b] rounded-xs text-sm text-[#1c1917] placeholder-[#a8a29e] focus-visible:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#57534e] font-bold tracking-tight">
                  Your Executive Role / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Founder & CEO / Managing Partner"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#faf8f5] border border-[#ded6c5] focus:border-[#b8860b] rounded-xs text-sm text-[#1c1917] placeholder-[#a8a29e] focus-visible:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#57534e] font-bold tracking-tight">
                  Enterprise Headcount
                </label>
                <select
                  value={formData.headcount}
                  onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#faf8f5] border border-[#ded6c5] focus:border-[#b8860b] rounded-xs text-sm text-[#1c1917] focus-visible:outline-none cursor-pointer"
                >
                  <option value="10-25">10 - 25 (Early Scale)</option>
                  <option value="25-100">25 - 100 (Core Expansion)</option>
                  <option value="100-500">100 - 500 (Mid-Market Institutional)</option>
                  <option value="500+">500+ (Global Enterprise / Multi-Entity)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#57534e] font-bold tracking-tight">
                  Target Mandate Type
                </label>
                <select
                  value={formData.mandateType}
                  onChange={(e) => setFormData({ ...formData, mandateType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#faf8f5] border border-[#ded6c5] focus:border-[#b8860b] rounded-xs text-sm text-[#1c1917] focus-visible:outline-none cursor-pointer"
                >
                  <option value="Sovereign Substrate (Decouple Founder)">Service I: The Founder Freedom Advisory Service</option>
                  <option value="Succession Architecture (Founder to Chairman)">Service II: The Executive Transition Service</option>
                  <option value="VC / PE Portfolio Telemetry">Service III: The Portfolio Governance Service</option>
                  <option value="Inaction Tax Audit & Diagnostic">Two-Week Tension Diagnostic Scan</option>
                </select>
              </div>

            </div>

            {/* Qualitative Notes */}
            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#57534e] font-bold tracking-tight">
                  Primary Operational Friction or Strategic Transition Focus
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., Every routine approval routes through the CEO; 25 hours spent in meetings; preparing for incoming COO handover..."
                  value={formData.currentFriction}
                  onChange={(e) => setFormData({ ...formData, currentFriction: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#faf8f5] border border-[#ded6c5] focus:border-[#b8860b] rounded-xs text-sm text-[#1c1917] placeholder-[#a8a29e] focus-visible:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase text-[#57534e] font-bold tracking-tight">
                  Confidential Context / Specific Desired Timeline
                </label>
                <textarea
                  rows={2}
                  placeholder="Any timing constraints, board expectations, or relevant fund dynamics..."
                  value={formData.confidentialNotes}
                  onChange={(e) => setFormData({ ...formData, confidentialNotes: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#faf8f5] border border-[#ded6c5] focus:border-[#b8860b] rounded-xs text-sm text-[#1c1917] placeholder-[#a8a29e] focus-visible:outline-none"
                />
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-[#ded6c5] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#78716c]">
                <ShieldCheck className="w-4 h-4 text-[#8c6708]" />
                <span>Reviewed directly by Principal Suchita Sancheti within 24 hours.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-black hover:bg-[#b8860b] text-white font-bold text-xs uppercase tracking-tight rounded-xs transition-colors cursor-pointer shadow-xs"
              >
                <span>{isSubmitting ? 'Transmitting Securely...' : 'Transmit Sovereign Dossier'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>
        ) : (
          /* Submission Confirmation Card */
          <div className="bg-[#ffffff] border border-[#b8860b]/40 rounded-xs p-6 sm:p-10 text-center space-y-5 shadow-sm animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-full bg-[#efebe2] border border-[#b8860b] text-[#8c6708] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-7 h-7 text-[#8c6708]" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-xs uppercase text-[#8c6708] font-bold tracking-tight">Transmission Acknowledged</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1c1917]">
                Dossier Received by Principal Advisory Desk
              </h2>
              <p className="text-sm text-[#57534e] leading-relaxed pt-1">
                Thank you, {formData.fullName}. Your confidential parameters for <strong className="text-[#1c1917]">{formData.companyName}</strong> have been secured. Principal Suchita Sancheti will review the parameters and reach out directly to <span className="text-[#8c6708] font-bold">{formData.workEmail}</span> within 24 business hours.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 bg-[#faf8f5] hover:bg-[#efebe2] text-xs text-[#57534e] hover:text-[#1c1917] border border-[#ded6c5] rounded-xs transition-colors cursor-pointer font-bold uppercase tracking-tight"
              >
                Submit Additional Inquiries
              </button>
            </div>
          </div>
        )}

      </div>
    </div>

    {/* Institutional Internal Linking Matrix */}
    <InternalLinksMatrix currentPath="/intake" />
  </div>
);
};
