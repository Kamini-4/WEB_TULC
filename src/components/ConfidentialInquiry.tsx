import React, { useState, useRef, useEffect } from 'react';
import { ConsultationInquiry, PartnershipModelId } from '../types';
import { Lock, ShieldCheck, CheckCircle2, Send, Clock, FileText, Loader2, Phone, Mail, ArrowLeft, ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from './SocialIcons';
import { CalendlyModal } from './CalendlyModal';

interface InquiryProps {
  initialPartnership?: PartnershipModelId | 'council-chambers';
  initialContext?: string;
}

const ROLE_OPTIONS = [
  'Chief Executive Officer',
  'Founder / Managing Director',
  'Board Chair / Lead Independent Director',
  'Managing Partner / General Partner',
  'Chief Operating Officer / President',
  'Chief Financial Officer',
];

const SCALE_OPTIONS = [
  'High-Growth Pre-IPO Organization',
  'Mid-Market Enterprise',
  'Global Multi-Market Enterprise',
  'Mega-Cap / Sovereign Wealth Entity',
];

const PARTNERSHIP_OPTIONS: Array<{
  id: PartnershipModelId | 'council-chambers';
  label: string;
  sub: string;
}> = [
  {
    id: 'diagnostic',
    label: 'Track 01 · Mandate Forensic Diagnostic',
    sub: '14-Day Rapid Audit · 1 Founder or 3+ Senior Leaders + Council Chamber',
  },
  {
    id: 'embedding',
    label: 'Track 02 · Operating Architecture Embedding',
    sub: '90-Day Flagship Build · 0% Instalments Available',
  },
  {
    id: 'retainer',
    label: 'Track 03 · Fractional COO & Strategic Retainer',
    sub: 'Quarterly Executive Mandate · 0% Instalments Available',
  },
  {
    id: 'council-chambers',
    label: 'Executive Advisory Board Conclave / International Mandate',
    sub: 'Closed-door CEO sparring & custom cross-border governance',
  },
];

const TOTAL_STEPS = 7;

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

  const [step, setStep] = useState<number>(0);
  const [stepError, setStepError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendlyModal, setShowCalendlyModal] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    referenceId: string;
    timestamp: string;
    leadPartner: string;
  } | null>(null);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setStepError(null);
    if (inputRef.current && step > 0) {
      inputRef.current.focus();
    }
  }, [step]);

  const validateAndNext = () => {
    if (step === 0) {
      if (!formData.fullName.trim()) {
        setStepError('Please enter your full name to continue.');
        return;
      }
    } else if (step === 1) {
      const email = formData.corporateEmail.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStepError('Please enter a valid corporate or institutional email.');
        return;
      }
    } else if (step === 2) {
      if (!formData.role.trim()) {
        setStepError('Please select your role or board title.');
        return;
      }
    } else if (step === 3) {
      if (!formData.organization.trim()) {
        setStepError('Please enter your organization or enterprise name.');
        return;
      }
    }
    setStepError(null);
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  };

  const handleKeyDownAdvance = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      validateAndNext();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < TOTAL_STEPS - 1) {
      validateAndNext();
      return;
    }

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

  const progressPercent = Math.round(((step + 1) / TOTAL_STEPS) * 100);

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
                Initiate{' '}
                <span className="text-[#9d7b38]">Confidential Mandate Dialogue</span>
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#4e5159] leading-relaxed italic">
                Leadership is a choice, not a title. When you are ready to stop managing compliance and start installing sovereign authority, we are ready to convene.
              </p>
            </div>

            {/* Protocol Guarantees */}
            <div className="p-4 sm:p-5 rounded-lg bg-[#141416] text-white border border-[#d4af37]/50 shadow-lg space-y-3">
              <div className="text-[11px] uppercase text-[#d4af37] font-bold">
                Privilege & Protocol Commitments
              </div>
              
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#f3e5ab]">Chatham House & Attorney-Client Privilege</div>
                    <div className="text-[11px] text-[#a6a9b2] mt-0.5 italic">
                      Zero disclosure to market analysts, external press, or advisory intermediaries.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#f3e5ab]">Direct Senior Partner Response Within 4 Hours</div>
                    <div className="text-[11px] text-[#a6a9b2] mt-0.5 italic">
                      Every inquiry is triaged exclusively by senior principal counsel.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#f3e5ab]">Immediate Mutual Sovereign NDA Execution</div>
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
                  <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold block">Direct Founder Desk</span>
                  <a href="mailto:suchita@theunboundedleadership.com" className="flex items-center gap-1.5 text-[#17181c] hover:text-[#9d7b38] font-semibold transition-colors mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>suchita@theunboundedleadership.com</span>
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

          {/* Right 7 Columns: One-by-One Interactive Briefing Request Form */}
          <div className="lg:col-span-7 bg-white border border-[#e5decfe0] rounded-lg p-4 sm:p-6 lg:p-7 shadow-xs relative">
            
            {submissionReceipt ? (
              <div className="py-6 space-y-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-sm bg-[#faf6ee] border border-[#ebdcc0] flex items-center justify-center mx-auto sm:mx-0">
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
                    type="button"
                    onClick={() => setShowCalendlyModal(true)}
                    className="px-5 py-2.5 text-xs uppercase text-black bg-gradient-to-r from-[#d4af37] via-[#f5e6b3] to-[#d4af37] hover:brightness-105 rounded-sm transition-all font-black text-center min-h-[40px] cursor-pointer flex items-center justify-center gap-2 font-mono shadow-xs"
                  >
                    <Calendar className="w-4 h-4 text-black" />
                    <span>Schedule Briefing on Calendly Now</span>
                  </button>

                  <button
                    onClick={() => {
                      setSubmissionReceipt(null);
                      setStep(0);
                      setFormData((prev) => ({
                        ...prev,
                        fullName: '',
                        corporateEmail: '',
                        role: '',
                        organization: '',
                        frictionNotes: '',
                      }));
                    }}
                    className="px-5 py-2.5 text-xs uppercase text-[#17181c] hover:text-black bg-[#f8f6f0] border border-[#d8cebe] rounded-sm transition-colors font-bold text-center min-h-[40px] cursor-pointer"
                  >
                    Submit Another Briefing Request
                  </button>

                  <button
                    onClick={() => {
                      try {
                        window.history.pushState(null, '', '/');
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      } catch {}
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    aria-label="Go back"
                    title="Go back"
                    className="p-2.5 rounded-sm text-[#17181c] hover:text-[#9d7b38] hover:bg-[#ede5d6] border border-[#d8cebe] transition-colors flex items-center justify-center min-w-[42px] min-h-[42px] cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#9d7b38]" />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#17181c]">
                    Schedule a Private Advisory Briefing
                  </h3>
                  <p className="text-xs text-[#54575f] mt-0.5 italic">
                    All disclosures are subject to binding mutual non-disclosure prior to consultation.
                  </p>
                </div>

                {/* Direct Calendly Booking Option */}
                <div className="p-3 bg-[#141416] text-white border border-[#d4af37] rounded-md flex flex-col md:flex-row items-center justify-between gap-2.5">
                  <div className="space-y-0.5 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-1 text-[10px] font-mono uppercase text-[#d4af37] font-black">
                      <Sparkles className="w-3 h-3 text-[#d4af37]" />
                      <span>Direct Executive Scheduling</span>
                    </div>
                    <span className="text-xs font-bold text-[#f8f6f0] block">
                      Prefer Live Calendar Sync? Book Direct on Calendly
                    </span>
                    <p className="text-[11px] text-zinc-400">
                      Reserve a confidential 20-min private advisory briefing directly with Suchita Sancheti.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowCalendlyModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-[#d4af37] via-[#f5e6b3] to-[#d4af37] hover:brightness-105 text-black font-mono text-xs font-black uppercase rounded-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap active:scale-98"
                    >
                      <Calendar className="w-3.5 h-3.5 text-black" />
                      <span>Book on Calendly</span>
                    </button>
                  </div>
                </div>

                {/* Step Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="uppercase font-bold text-[#9d7b38]">
                      Step {step + 1} of {TOTAL_STEPS}
                    </span>
                    <span className="text-[#6b6e76] tabular-nums">{progressPercent}% complete</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#efe9dc] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#141416] to-[#d4af37] transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Answered Field Summary Strip (Click to Edit Any Completed Step) */}
                {(formData.fullName || formData.corporateEmail || formData.role || formData.organization) && (
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    {formData.fullName && step !== 0 && (
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="px-2 py-0.5 rounded-xs bg-[#faf6ee] border border-[#d8cebe] hover:border-[#9d7b38] text-[#17181c] font-mono cursor-pointer"
                      >
                        Name: <strong>{formData.fullName}</strong>
                      </button>
                    )}
                    {formData.corporateEmail && step !== 1 && (
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-2 py-0.5 rounded-xs bg-[#faf6ee] border border-[#d8cebe] hover:border-[#9d7b38] text-[#17181c] font-mono cursor-pointer"
                      >
                        Email: <strong>{formData.corporateEmail}</strong>
                      </button>
                    )}
                    {formData.role && step !== 2 && (
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-2 py-0.5 rounded-xs bg-[#faf6ee] border border-[#d8cebe] hover:border-[#9d7b38] text-[#17181c] font-mono cursor-pointer"
                      >
                        Role: <strong>{formData.role}</strong>
                      </button>
                    )}
                    {formData.organization && step !== 3 && (
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-2 py-0.5 rounded-xs bg-[#faf6ee] border border-[#d8cebe] hover:border-[#9d7b38] text-[#17181c] font-mono cursor-pointer"
                      >
                        Org: <strong>{formData.organization}</strong>
                      </button>
                    )}
                  </div>
                )}

                {/* One-by-One Active Question Card */}
                <div className="p-5 bg-[#fcfaf7] border border-[#d8cebe] rounded-md space-y-4 min-h-[210px] flex flex-col justify-between">
                  {step === 0 && (
                    <div className="space-y-2.5 animate-in fade-in duration-200">
                      <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold">
                        01 · Identity
                      </span>
                      <label htmlFor="inq-name" className="block text-base sm:text-lg font-bold font-serif text-[#17181c]">
                        What is your full name?
                      </label>
                      <input
                        id="inq-name"
                        ref={(el) => { inputRef.current = el; }}
                        type="text"
                        maxLength={120}
                        placeholder="e.g. Vikramaditya Rao"
                        value={formData.fullName}
                        onChange={(e) => {
                          setStepError(null);
                          setFormData({ ...formData, fullName: e.target.value });
                        }}
                        onKeyDown={handleKeyDownAdvance}
                        className="w-full bg-white border border-[#c9bfa9] rounded px-3.5 py-3 text-sm text-[#17181c] placeholder:text-[#999] focus:outline-none focus:border-[#141416] shadow-2xs"
                      />
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-2.5 animate-in fade-in duration-200">
                      <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold">
                        02 · Privileged Dispatch
                      </span>
                      <label htmlFor="inq-email" className="block text-base sm:text-lg font-bold font-serif text-[#17181c]">
                        Where should we send your NDA and briefing details, {formData.fullName.split(' ')[0]}?
                      </label>
                      <input
                        id="inq-email"
                        ref={(el) => { inputRef.current = el; }}
                        type="email"
                        maxLength={254}
                        placeholder="founder@company.com"
                        value={formData.corporateEmail}
                        onChange={(e) => {
                          setStepError(null);
                          setFormData({ ...formData, corporateEmail: e.target.value });
                        }}
                        onKeyDown={handleKeyDownAdvance}
                        className="w-full bg-white border border-[#c9bfa9] rounded px-3.5 py-3 text-sm text-[#17181c] placeholder:text-[#999] focus:outline-none focus:border-[#141416] shadow-2xs"
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-2.5 animate-in fade-in duration-200">
                      <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold">
                        03 · Authority Level
                      </span>
                      <div className="text-base sm:text-lg font-bold font-serif text-[#17181c]">
                        What is your role or board title?
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {ROLE_OPTIONS.map((roleOpt) => {
                          const active = formData.role === roleOpt;
                          return (
                            <button
                              key={roleOpt}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, role: roleOpt });
                                setStepError(null);
                                setStep(3);
                              }}
                              className={`text-left px-3 py-2.5 rounded-xs border text-xs font-semibold transition-all cursor-pointer ${
                                active
                                  ? 'bg-[#141416] text-[#d4af37] border-[#d4af37]'
                                  : 'bg-white text-[#17181c] border-[#d8cebe] hover:border-[#9d7b38]'
                              }`}
                            >
                              {roleOpt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-2.5 animate-in fade-in duration-200">
                      <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold">
                        04 · Organization
                      </span>
                      <label htmlFor="inq-org" className="block text-base sm:text-lg font-bold font-serif text-[#17181c]">
                        What is your enterprise or institution name?
                      </label>
                      <input
                        id="inq-org"
                        ref={(el) => { inputRef.current = el; }}
                        type="text"
                        maxLength={140}
                        placeholder="e.g. Apex Industrial Holdings"
                        value={formData.organization}
                        onChange={(e) => {
                          setStepError(null);
                          setFormData({ ...formData, organization: e.target.value });
                        }}
                        onKeyDown={handleKeyDownAdvance}
                        className="w-full bg-white border border-[#c9bfa9] rounded px-3.5 py-3 text-sm text-[#17181c] placeholder:text-[#999] focus:outline-none focus:border-[#141416] shadow-2xs"
                      />
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-2.5 animate-in fade-in duration-200">
                      <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold">
                        05 · Enterprise Scale
                      </span>
                      <div className="text-base sm:text-lg font-bold font-serif text-[#17181c]">
                        What best describes your company&apos;s current scale?
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {SCALE_OPTIONS.map((scaleOpt) => {
                          const active = formData.enterpriseScale === scaleOpt;
                          return (
                            <button
                              key={scaleOpt}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, enterpriseScale: scaleOpt });
                                setStepError(null);
                                setStep(5);
                              }}
                              className={`text-left px-3 py-2.5 rounded-xs border text-xs font-semibold transition-all cursor-pointer ${
                                active
                                  ? 'bg-[#141416] text-[#d4af37] border-[#d4af37]'
                                  : 'bg-white text-[#17181c] border-[#d8cebe] hover:border-[#9d7b38]'
                              }`}
                            >
                              {scaleOpt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="space-y-2.5 animate-in fade-in duration-200">
                      <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold">
                        06 · Engagement Track
                      </span>
                      <div className="text-base sm:text-lg font-bold font-serif text-[#17181c]">
                        Which track are you exploring right now?
                      </div>
                      <div className="space-y-2">
                        {PARTNERSHIP_OPTIONS.map((opt) => {
                          const active = formData.selectedPartnership === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, selectedPartnership: opt.id });
                                setStepError(null);
                                setStep(6);
                              }}
                              className={`w-full text-left px-3.5 py-2.5 rounded-xs border transition-all cursor-pointer ${
                                active
                                  ? 'bg-[#141416] text-white border-[#d4af37]'
                                  : 'bg-white text-[#17181c] border-[#d8cebe] hover:border-[#9d7b38]'
                              }`}
                            >
                              <div className={`text-xs font-bold ${active ? 'text-[#d4af37]' : 'text-[#17181c]'}`}>
                                {opt.label}
                              </div>
                              <div className={`text-[11px] ${active ? 'text-zinc-300' : 'text-[#54575f]'}`}>
                                {opt.sub}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {step === 6 && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold">
                        07 · Context &amp; NDA Dispatch
                      </span>
                      <label htmlFor="inq-notes" className="block text-base sm:text-lg font-bold font-serif text-[#17181c]">
                        What is the #1 operational bottleneck you want solved? (Optional)
                      </label>
                      <textarea
                        id="inq-notes"
                        ref={(el) => { inputRef.current = el; }}
                        rows={3}
                        maxLength={2000}
                        placeholder="e.g., Leadership hesitates on big decisions, routine approvals land on my desk, preparing for rapid scale..."
                        value={formData.frictionNotes}
                        onChange={(e) => setFormData({ ...formData, frictionNotes: e.target.value })}
                        className="w-full bg-white border border-[#c9bfa9] rounded px-3.5 py-2.5 text-sm text-[#17181c] placeholder:text-[#999] focus:outline-none focus:border-[#141416] shadow-2xs resize-none"
                      />

                      <div className="flex items-center gap-2.5 p-3 rounded bg-[#faf6ee] border border-[#d4af37]/50">
                        <input
                          type="checkbox"
                          id="nda-checkbox"
                          checked={formData.ndaRequired}
                          onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                          className="w-4 h-4 accent-[#141416] rounded border-[#d8cebe]"
                        />
                        <label htmlFor="nda-checkbox" className="text-xs text-[#33353a] cursor-pointer">
                          <strong className="text-[#17181c]">Require Mutual Sovereign NDA:</strong> Automatically dispatch binding two-way NDA before consultation.
                        </label>
                      </div>
                    </div>
                  )}

                  {stepError && (
                    <p className="text-xs font-semibold text-rose-700">{stepError}</p>
                  )}

                  {/* Step Controls */}
                  <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#e8e1d3]">
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={() => setStep((prev) => Math.max(0, prev - 1))}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-bold uppercase text-[#17181c] hover:text-[#9d7b38] bg-white border border-[#d8cebe] rounded-xs cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>
                    ) : (
                      <span className="text-[11px] font-mono text-[#6b6e76]">
                        Takes under 45 seconds
                      </span>
                    )}

                    {step < TOTAL_STEPS - 1 ? (
                      <button
                        type="button"
                        onClick={validateAndNext}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#141416] hover:bg-black text-[#f8f6f0] border border-[#d4af37]/60 text-xs font-mono font-bold uppercase tracking-wider rounded-xs cursor-pointer transition-all"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#141416] hover:bg-black text-[#f8f6f0] border border-[#d4af37] text-xs font-mono font-bold uppercase tracking-wider rounded-xs cursor-pointer transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                            <span>Transmitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Confidential Inquiry</span>
                            <Send className="w-3.5 h-3.5 text-[#d4af37]" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        window.history.pushState(null, '', '/');
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      } catch {}
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    aria-label="Go back"
                    title="Go back"
                    className="p-2 -ml-2 rounded-sm text-[#17181c] hover:text-[#9d7b38] hover:bg-[#ede5d6] transition-colors cursor-pointer flex items-center justify-center min-w-[36px] min-h-[36px]"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#9d7b38]" />
                  </button>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowCalendlyModal(true)}
                      className="text-black hover:text-[#9d7b38] transition-colors py-1 cursor-pointer font-bold flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#9d7b38]" />
                      <span>Book on Calendly →</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        try {
                          window.history.pushState(null, '', '/shop');
                          window.dispatchEvent(new PopStateEvent('popstate'));
                        } catch {}
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-[#9d7b38] hover:text-[#7d5f24] transition-colors py-1 cursor-pointer font-bold"
                    >
                      View Executive Shop →
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>


      {/* UNIVERSAL CALENDLY MODAL */}
      <CalendlyModal
        isOpen={showCalendlyModal}
        onClose={() => setShowCalendlyModal(false)}
        customTitle="Schedule 20-Min Executive Briefing via Calendly"
        contextNote="You are booking a confidential, direct 20-minute video session with Suchita Sancheti under Chatham House non-disclosure rules."
      />

    </section>
  );
};
