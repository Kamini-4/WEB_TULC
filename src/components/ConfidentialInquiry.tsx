import React, { useState } from 'react';
import { ConsultationInquiry, PartnershipModelId } from '../types';
import { Lock, ShieldCheck, CheckCircle2, Send, Clock, FileText, Loader2, Phone, Mail, ArrowLeft } from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from './SocialIcons';

interface InquiryProps {
  initialPartnership?: PartnershipModelId | 'council-chambers';
  initialContext?: string;
}

export const ConfidentialInquiry: React.FC<InquiryProps> = ({
  initialPartnership = 'retainer',
  initialContext = '',
}) => {
  const [formData, setFormData] = useState<ConsultationInquiry>({
    fullName: '',
    corporateEmail: '',
    role: '',
    organization: '',
    enterpriseScale: 'Global Multi-Market Enterprise',
    selectedPartnership: initialPartnership,
    frictionNotes: initialContext,
    ndaRequired: true,
    meetingPreference: 'virtual-briefing',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    referenceId: string;
    timestamp: string;
    leadPartner: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const refId = 'UBC-' + Math.floor(100000 + Math.random() * 900000);
      setSubmissionReceipt({
        referenceId: refId,
        timestamp: new Date().toISOString(),
        leadPartner: 'Advisory Governance Board',
      });
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <section id="contact" className="py-10 sm:py-12 lg:py-14 bg-[#f5f1e8] border-b border-[#e5decfe0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          
          {/* Left 5 Columns: Confidential Protocol & Trust Anchors */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase text-[#9d7b38] font-bold mb-2">
                <Lock className="w-4 h-4 text-[#9d7b38]" />
                <span>Strict In-Camera Protocol</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-tight">
                Initiate Confidential Mandate Dialogue
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#4e5159] leading-relaxed italic">
                Leadership is a choice, not a title. When you are ready to stop managing compliance and start installing sovereign authority, we are ready to convene.
              </p>
            </div>

            {/* Protocol Guarantees */}
            <div className="p-4 sm:p-5 rounded-lg bg-[#141416] text-white border border-[#2b2d33] shadow-lg space-y-3">
              <div className="text-[11px] uppercase text-[#d4af37] font-bold">
                Privilege & Protocol Commitments
              </div>
              
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Chatham House & Attorney-Client Privilege</div>
                    <div className="text-[11px] text-[#a6a9b2] mt-0.5 italic">
                      Zero disclosure to market analysts, external press, or advisory intermediaries.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Direct Senior Partner Response Within 4 Hours</div>
                    <div className="text-[11px] text-[#a6a9b2] mt-0.5 italic">
                      Every inquiry is triaged exclusively by former Fortune 500 Chairs and Managing Directors.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Immediate Mutual Sovereign NDA Execution</div>
                    <div className="text-[11px] text-[#a6a9b2] mt-0.5 italic">
                      Automated digital execution of institutional confidentiality before any strategic disclosures.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Concierge Contact with Clickable Tel and Mailto Links */}
            <div className="p-4 sm:p-5 rounded-lg bg-white border border-[#e5decfe0] shadow-xs space-y-3">
              <div>
                <div className="text-xs font-bold text-[#17181c] uppercase mb-0.5">
                  Executive Concierge Desk
                </div>
                <div className="text-xs text-[#54575f] leading-relaxed">
                  Direct private line for Lead Directors, Nominating Committee Chairs, and Sovereign Fund Principals.
                </div>
              </div>

              <div className="pt-2 border-t border-[#f0eade] space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold block">Direct Telephone</span>
                  <a href="tel:+919325346704" className="flex items-center gap-1.5 text-sm font-bold text-[#17181c] hover:text-[#9d7b38] transition-colors mt-0.5">
                    <Phone className="w-4 h-4 text-[#9d7b38]" />
                    <span>+91 9325346704</span>
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold block">Executive Advisory</span>
                  <a href="mailto:suchita@theunboundedleadership.com" className="flex items-center gap-1.5 text-[#17181c] hover:text-[#9d7b38] font-semibold transition-colors mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>suchita@theunboundedleadership.com</span>
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold block">Institutional Governance</span>
                  <a href="mailto:kaminiagnihotri249@gmail.com" className="flex items-center gap-1.5 text-[#17181c] hover:text-[#9d7b38] font-semibold transition-colors mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>kaminiagnihotri249@gmail.com</span>
                  </a>
                </div>

                <div className="pt-2 border-t border-[#f0eade] flex items-center gap-4 text-xs font-semibold">
                  <a href="https://www.linkedin.com/in/suchita-sancheti" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#0077b5] hover:underline">
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>Suchita Sancheti</span>
                  </a>
                  <a href="https://www.instagram.com/transformingleadership" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#e4405f] hover:underline">
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>@transformingleadership</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: The Interactive Briefing Request Form */}
          <div className="lg:col-span-7 bg-white border border-[#e5decfe0] rounded-lg p-4 sm:p-6 lg:p-7 shadow-xs relative">
            
            {submissionReceipt ? (
              <div className="py-6 space-y-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-[#faf6ee] border border-[#ebdcc0] flex items-center justify-center mx-auto sm:mx-0">
                  <CheckCircle2 className="w-6 h-6 text-[#9d7b38]" />
                </div>
                <div>
                  <span className="text-[11px] text-[#9d7b38] font-bold uppercase">
                    Privileged Transmission Confirmed
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#17181c] mt-0.5">
                    Confidential Briefing Dossier Initiated
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#4e5159] leading-relaxed italic">
                    A mutual Sovereign NDA and partner-level briefing calendar invitation have been dispatched to <strong className="text-[#17181c] font-bold not-italic">{formData.corporateEmail}</strong>.
                  </p>
                </div>

                {/* Receipt Box */}
                <div className="p-4 rounded bg-[#fcfaf7] border border-[#ebdcc0] shadow-xs space-y-1.5 text-xs">
                  <div className="flex justify-between border-b border-[#e8e2d5] pb-1.5">
                    <span className="text-[#6b6e76]">Dossier Reference:</span>
                    <span className="font-bold text-[#17181c]">{submissionReceipt.referenceId}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#e8e2d5] pb-1.5">
                    <span className="text-[#6b6e76]">Triage Remit:</span>
                    <span className="font-bold text-[#9d7b38]">{submissionReceipt.leadPartner}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#e8e2d5] pb-1.5">
                    <span className="text-[#6b6e76]">Selected Partnership:</span>
                    <span className="font-bold text-[#17181c] uppercase">{formData.selectedPartnership}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b6e76]">Privilege Classification:</span>
                    <span className="font-bold text-red-800">Strict In-Camera Non-Disclosure</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setSubmissionReceipt(null);
                      setFormData((prev) => ({ ...prev, fullName: '', corporateEmail: '', frictionNotes: '' }));
                    }}
                    className="px-5 py-2.5 text-xs uppercase text-[#17181c] hover:text-black bg-[#f8f6f0] border border-[#d8cebe] rounded-sm transition-colors font-bold text-center min-h-[40px] cursor-pointer"
                  >
                    Submit Another Briefing Request
                  </button>

                  <button
                    onClick={() => {
                      window.location.hash = 'top';
                    }}
                    aria-label="Go back"
                    title="Go back"
                    className="p-2.5 rounded-full text-[#17181c] hover:text-[#9d7b38] hover:bg-[#ede5d6] border border-[#d8cebe] transition-colors flex items-center justify-center min-w-[42px] min-h-[42px] cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#9d7b38]" />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#17181c]">
                    Schedule a Private Advisory Briefing
                  </h3>
                  <p className="text-xs text-[#54575f] mt-0.5 italic">
                    All disclosures are subject to binding mutual non-disclosure prior to consultation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#17181c] uppercase mb-1">
                      Executive Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Helena Vance"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#fcfaf7] border border-[#e5decfe0] rounded px-3 py-2 text-base sm:text-xs text-[#17181c] placeholder:text-[#999] focus:outline-none focus:border-[#9d7b38] shadow-xs min-h-[40px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#17181c] uppercase mb-1">
                      Corporate / Institutional Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vance@enterprise-holdings.com"
                      value={formData.corporateEmail}
                      onChange={(e) => setFormData({ ...formData, corporateEmail: e.target.value })}
                      className="w-full bg-[#fcfaf7] border border-[#e5decfe0] rounded px-3 py-2 text-base sm:text-xs text-[#17181c] placeholder:text-[#999] focus:outline-none focus:border-[#9d7b38] shadow-xs min-h-[40px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#17181c] uppercase mb-1">
                      Role / Board Title *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      required
                      className="w-full bg-[#fcfaf7] border border-[#e5decfe0] rounded px-3 py-2 text-base sm:text-xs text-[#17181c] focus:outline-none focus:border-[#9d7b38] shadow-xs min-h-[40px]"
                    >
                      <option value="">Select Executive Role...</option>
                      <option value="Chief Executive Officer">Chief Executive Officer</option>
                      <option value="Board Chair / Lead Independent Director">Board Chair / Lead Independent Director</option>
                      <option value="Managing Partner / General Partner">Managing Partner / General Partner</option>
                      <option value="Chief Operating Officer / President">Chief Operating Officer / President</option>
                      <option value="Chief Financial Officer">Chief Financial Officer</option>
                      <option value="Sovereign Fund Trustee">Sovereign Fund Trustee</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#17181c] uppercase mb-1">
                      Enterprise / Institution Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Global Syndicate"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full bg-[#fcfaf7] border border-[#e5decfe0] rounded px-3 py-2 text-base sm:text-xs text-[#17181c] placeholder:text-[#999] focus:outline-none focus:border-[#9d7b38] shadow-xs min-h-[40px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#17181c] uppercase mb-1">
                      Institutional Scope
                    </label>
                    <select
                      value={formData.enterpriseScale}
                      onChange={(e) => setFormData({ ...formData, enterpriseScale: e.target.value })}
                      className="w-full bg-[#fcfaf7] border border-[#e5decfe0] rounded px-3 py-2 text-base sm:text-xs text-[#17181c] focus:outline-none focus:border-[#9d7b38] shadow-xs min-h-[40px]"
                    >
                      <option value="High-Growth Pre-IPO Organization">High-Growth Pre-IPO Organization</option>
                      <option value="Mid-Market Enterprise">Mid-Market Enterprise</option>
                      <option value="Global Multi-Market Enterprise">Global Multi-Market Enterprise</option>
                      <option value="Mega-Cap / Sovereign Wealth Entity">Mega-Cap / Sovereign Wealth Entity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#17181c] uppercase mb-1">
                      Partnership Category
                    </label>
                    <select
                      value={formData.selectedPartnership}
                      onChange={(e) => setFormData({ ...formData, selectedPartnership: e.target.value as any })}
                      className="w-full bg-[#faf6ee] border border-[#ebdcc0] rounded px-3 py-2 text-base sm:text-xs text-[#9d7b38] font-bold focus:outline-none focus:border-[#9d7b38] shadow-xs min-h-[40px]"
                    >
                      <option value="retainer">Category 03 · Sovereign Strategic Counsel (Annual Mandate)</option>
                      <option value="embedding">Category 02 · Operating Architecture Embedding (90-Day In-Situ)</option>
                      <option value="diagnostic">Category 01 · Mandate Forensic Diagnostic (14-Day Audit)</option>
                      <option value="council-chambers">The Council Chambers (Annual Fellowship Seat)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#17181c] uppercase mb-1">
                    Core Institutional Dilemma / Governance Latency
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Briefly characterize the friction vector (e.g., board impasse over capital allocation, founder succession transition, committee decision lag)..."
                    value={formData.frictionNotes}
                    onChange={(e) => setFormData({ ...formData, frictionNotes: e.target.value })}
                    className="w-full bg-[#fcfaf7] border border-[#e5decfe0] rounded px-3 py-2 text-base sm:text-xs text-[#17181c] placeholder:text-[#999] focus:outline-none focus:border-[#9d7b38] shadow-xs resize-none"
                  />
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded bg-[#faf6ee] border border-[#ebdcc0]">
                  <input
                    type="checkbox"
                    id="nda-checkbox"
                    checked={formData.ndaRequired}
                    onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                    className="w-4 h-4 text-[#9d7b38] rounded border-[#d8cebe] focus:ring-[#9d7b38]"
                  />
                  <label htmlFor="nda-checkbox" className="text-xs text-[#33353a] cursor-pointer">
                    <strong className="text-[#17181c]">Require Mutual Sovereign NDA Execution:</strong> Automatically dispatch binding two-way institutional NDA prior to session.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 text-xs font-bold uppercase text-[#f8f6f0] bg-[#17181c] hover:bg-[#282a30] transition-all rounded-sm flex items-center justify-center gap-2 shadow-md hover:shadow-[#c5a059]/20 active:scale-[0.99] disabled:opacity-50 min-h-[46px] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                      <span>Encrypting & Dispatching Mandate Briefing...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Privileged Mandate Request</span>
                      <Send className="w-4 h-4 text-[#d4af37]" />
                    </>
                  )}
                </button>

                <div className="pt-1 flex items-center justify-between text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      window.location.hash = 'top';
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    aria-label="Go back"
                    title="Go back"
                    className="p-2 -ml-2 rounded-full text-[#17181c] hover:text-[#9d7b38] hover:bg-[#ede5d6] transition-colors cursor-pointer flex items-center justify-center min-w-[36px] min-h-[36px]"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#9d7b38]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      window.location.hash = 'shop';
                    }}
                    className="text-[#9d7b38] hover:text-[#7d5f24] transition-colors py-1 cursor-pointer font-bold"
                  >
                    View Executive Shop →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
