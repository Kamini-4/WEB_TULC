import React, { useState, useRef } from 'react';
import { 
  Compass, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Sparkles, 
  Target, 
  Eye, 
  Phone, 
  Mail,
  Scale,
  Zap, 
  Clock, 
  Building2, 
  Check, 
  X, 
  Lock, 
  ChevronDown, 
  ChevronUp,
  Camera,
  Upload,
  RotateCcw,
  Maximize2
} from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from './SocialIcons';
import { useFounderPhoto } from '../utils/founderPhoto';

interface AboutSectionProps {
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenConsultation }) => {
  const [showFullVision, setShowFullVision] = useState(false);
  const [imageFit, setImageFit] = useState<'cover' | 'contain'>('cover');
  const { photoUrl, hasCustomPhoto, savePhoto, resetPhoto } = useFounderPhoto('/assets/suchita-portrait.svg');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadFeedback('Please select a valid image file (.jpg, .jpeg, .png).');
      setTimeout(() => setUploadFeedback(null), 4000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        savePhoto(result);
        setUploadFeedback('Authentic photo loaded & saved successfully!');
        setTimeout(() => setUploadFeedback(null), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <section id="about" className="py-4 sm:py-6 px-3 sm:px-6 lg:px-8 border-b border-[#dfd7c8] bg-[#f8f6f0] text-black relative">
      <div className="max-w-[1440px] mx-auto space-y-4 sm:space-y-5">
        
        {/* Section Header — Balanced Architectural Dignity */}
        <div className="max-w-3xl mx-auto text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-black text-[#d4af37] rounded-xs text-[10px] font-mono uppercase font-bold shadow-xs">
            <Compass className="w-3 h-3 text-[#d4af37]" />
            <span>The Architect & Sovereign Standard</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-black tracking-tight leading-tight">
            "You Didn't Build An Empire To Remain Trapped In Its Machinery."
          </h2>

          <p className="text-xs sm:text-[13px] text-zinc-900 leading-relaxed italic max-w-xl mx-auto">
            Founded by Suchita Sancheti — engineering permanent founder decoupling and sovereign enterprise architecture in 90 days.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* PART 1: FOUNDER TRUST CARD & LETTER (BALANCED OBSIDIAN & IVORY HARMONY)   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          
          {/* Left Column: Authentic Portrait & Direct Contact Card (Obsidian Black & Gold Anchor) */}
          <div className="lg:col-span-4 bg-[#0c0d14] border-2 border-[#d4af37] rounded-md p-4 sm:p-5 shadow-xl flex flex-col justify-between space-y-3.5 text-[#f5ebd7] relative">
            
            {/* Hidden Input for Instant Photo Upload */}
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange} 
            />

            {/* Founder Portrait & Insignia Frame — Proportional 3:4 Portrait Ratio with Fit Controls */}
            <div 
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative w-full aspect-[3/4] max-w-[310px] mx-auto min-h-[340px] sm:min-h-[380px] rounded-xs overflow-hidden border-2 ${
                isDragging ? 'border-[#d4af37] ring-4 ring-[#d4af37]/60 bg-[#1a1b26]' : 'border-[#d4af37]'
              } shadow-2xl bg-[#050608] group flex items-center justify-center`}
            >
              <img 
                src={photoUrl} 
                alt="Suchita Sancheti — Founder & Enterprise Architect, The Unbounded Leadership Co." 
                className={`w-full h-full transition-all duration-500 ${
                  imageFit === 'contain' 
                    ? 'object-contain p-1 bg-[#050608]' 
                    : 'object-cover object-[center_15%] group-hover:scale-[1.02]'
                }`}
                width="360"
                height="480"
                loading="eager"
              />

              {/* Ambient Vignette for Premium Depth */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#06070a]/90 via-transparent to-transparent"></div>

              {/* Status & Name Banner with Black Background & Golden Text */}
              <div className="absolute bottom-2 left-2 right-2 bg-[#0a0b0f]/95 backdrop-blur-md px-3 py-1.5 rounded-xs border border-[#d4af37]/70 flex items-center justify-between pointer-events-none shadow-xl">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#f3e5ab] font-bold">
                    Suchita Sancheti
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-[#d4af37]">
                    Founder & Enterprise Architect
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-950"></span>
                  <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest">Active</span>
                </div>
              </div>

              {/* Top Floating Control Bar: Fit Toggle & Photo Upload/Reset */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity z-10">
                <button
                  type="button"
                  onClick={() => setImageFit(imageFit === 'cover' ? 'contain' : 'cover')}
                  className="px-2 py-1 bg-[#090a0f]/95 hover:bg-[#1a1b24] text-[#d4af37] border border-[#d4af37]/70 rounded-xs text-[9px] font-mono flex items-center gap-1 shadow-md transition-colors cursor-pointer"
                  title={imageFit === 'cover' ? 'Switch to Fit Entire Photo (unclipped)' : 'Switch to Fill Portrait Frame'}
                >
                  <Maximize2 className="w-2.5 h-2.5 text-[#d4af37]" />
                  <span>{imageFit === 'cover' ? 'Fit Whole Photo' : 'Fill Frame'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2 py-1 bg-gradient-to-r from-[#d4af37] to-[#e6ca65] hover:brightness-110 text-[#0a0b0f] font-bold rounded-xs text-[9.5px] font-mono flex items-center gap-1 shadow-md transition-colors cursor-pointer"
                  title="Upload your authentic photo"
                >
                  <Camera className="w-3 h-3 text-[#0a0b0f]" />
                  <span>{hasCustomPhoto ? 'Change' : 'Upload'}</span>
                </button>
                {hasCustomPhoto && (
                  <button
                    type="button"
                    onClick={() => {
                      resetPhoto();
                      setUploadFeedback('Reset to default illustration.');
                      setTimeout(() => setUploadFeedback(null), 3000);
                    }}
                    className="p-1 bg-[#090a0f]/95 hover:bg-[#1a1b24] text-[#d4af37] border border-[#d4af37]/70 rounded-xs transition-colors cursor-pointer"
                    title="Reset photo"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Dragging Overlay */}
              {isDragging && (
                <div className="absolute inset-0 bg-[#07080d]/90 backdrop-blur-xs flex flex-col items-center justify-center p-3 text-center text-[#f3e5ab] z-20">
                  <Upload className="w-8 h-8 text-[#d4af37] mb-1 animate-bounce" />
                  <span className="text-xs font-mono font-bold text-[#d4af37]">Drop Photo Here</span>
                  <span className="text-[10px] text-[#ded8cc]">Replaces portrait instantly</span>
                </div>
              )}

              {/* Upload Feedback Toast */}
              {uploadFeedback && (
                <div className="absolute top-2 left-2 right-2 bg-[#090a0f]/95 text-[#f5ebd7] text-[10px] font-mono px-2 py-1.5 rounded-xs border border-[#d4af37] shadow-2xl flex items-center gap-1.5 z-30">
                  <Check className="w-3 h-3 text-[#34d399] shrink-0" />
                  <span className="truncate">{uploadFeedback}</span>
                </div>
              )}
            </div>

            {/* Quick Title & Bio */}
            <div className="space-y-1">
              <div className="text-xl font-bold text-[#f3e5ab] font-serif leading-tight">
                Suchita Sancheti
              </div>
              <div className="text-xs font-bold text-[#d4af37] uppercase font-mono tracking-wider">
                Founder & Enterprise Architect
              </div>
              <p className="text-xs text-[#ded8cb] leading-relaxed">
                Pioneering sovereign enterprise architecture, executive cadences, and founder decoupling across India, the Middle East, and globally.
              </p>
            </div>

            {/* 4 Concrete Sovereign Commitments */}
            <div className="py-2 px-2.5 rounded-xs bg-[#111219] border border-[#d4af37]/40 space-y-1.5 text-[11px] text-[#f5ebd7]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span className="font-semibold text-[#f3e5ab]">Direct 1-on-1 engagement (Zero junior staff handoffs)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Strict 90-day runway with definitive exit date</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Patent-Pending L.O.S.-P721 Operating Diagnostic™</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>In-Camera Board Privilege & Chatham House Protocol</span>
              </div>
            </div>

            {/* Verified Direct Channels & Consultation Trigger */}
            <div className="space-y-2 pt-1">
              <div className="p-2.5 rounded-xs bg-[#111219] border border-[#d4af37]/50 space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-bold">
                    Direct Advisory Desk
                  </span>
                  <div className="flex items-center gap-2.5">
                    <a href="https://www.linkedin.com/in/suchita-sancheti" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#d4af37] hover:text-[#f3e5ab] transition-colors">
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                    <a href="https://www.instagram.com/transformingleadership" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#d4af37] hover:text-[#f3e5ab] transition-colors">
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                  <a href="tel:+919325346704" className="flex items-center gap-1.5 text-[#f3e5ab] hover:text-[#d4af37] font-bold">
                    <Phone className="w-3 h-3 text-[#d4af37] shrink-0" />
                    <span>+91 9325346704</span>
                  </a>
                  <a href="mailto:suchita@theunboundedleadership.com" className="flex items-center gap-1.5 text-[#ded8cb] hover:text-[#f3e5ab] font-medium truncate">
                    <Mail className="w-3 h-3 text-[#d4af37] shrink-0" />
                    <span className="truncate">suchita@theunboundedleadership.com</span>
                  </a>
                </div>
              </div>

              <button
                onClick={onOpenConsultation}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-[#d4af37] via-[#f5e6b3] to-[#d4af37] hover:brightness-110 text-[#0c0d12] text-xs font-mono font-black uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-98"
              >
                <span>Initiate Private Dialogue</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0c0d12]" />
              </button>
            </div>

          </div>

          {/* Right Column: Personal Letter & Core Architecture Metrics (Warm Ivory Paper Card) */}
          <div className="lg:col-span-8 bg-white border-2 border-[#d8cebe] rounded-md p-4 sm:p-6 shadow-sm flex flex-col justify-between space-y-3.5 text-black">
            
            {/* Top Bar of Personal Letter */}
            <div className="flex items-center justify-between border-b border-[#ebdcc0] pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#9d7b38]" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-black font-black">
                  A Personal Letter From Suchita Sancheti
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-black bg-[#faf8f4] px-2.5 py-0.5 rounded-xs border border-[#d8cebe] font-bold">
                Executive In-Camera Brief
              </span>
            </div>

            {/* The Letter Body — Conversational, Direct, Jet Black Text */}
            <div className="space-y-2.5 text-xs sm:text-[13.5px] text-black font-serif leading-relaxed">
              <p>
                <strong className="text-black text-sm sm:text-base font-bold">Dear Founder & Executive Leader,</strong>
              </p>
              <p>
                You built your organization with extraordinary vision, grit, and personal instinct. In the early days, being in every room and approving every decision was your greatest competitive advantage.
              </p>
              <p>
                But past $5M or $20M in revenue, that exact superpower becomes your single biggest operational bottleneck. You hired smart, capable leaders. You pay top compensation. Yet somehow, every complex issue still reaches your desk at 8:00 PM. Your team hesitates not from lack of ambition, but because your decision boundaries are stored in your head rather than hard-coded into the architecture.
              </p>
              <p className="italic text-black bg-[#faf8f4] p-3 rounded-xs border-l-4 border-[#9d7b38] font-semibold">
                "When you scale without architecture, you just scale your personal exhaustion. True leadership isn't being indispensable to daily operations—it is building an enterprise that executes with sovereign clarity whether you are in the boardroom or halfway across the globe."
              </p>
              <p>
                We do not deliver theoretical slide decks. We partner with you directly for 90 days to codify decision rights, install asynchronous execution cadences, and build an autonomous operating system that returns your life and accelerates your company's valuation.
              </p>
            </div>

            {/* 4 Quantitative Sovereign Metrics Grid — Balanced High Contrast */}
            <div className="pt-3 border-t border-[#ebdcc0] grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-xs bg-[#faf8f4] border border-[#d8cebe] shadow-2xs">
                <div className="font-mono text-lg font-black text-black">90 Days</div>
                <div className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold">Strict Runway</div>
              </div>
              <div className="p-2.5 rounded-xs bg-[#faf8f4] border border-[#d8cebe] shadow-2xs">
                <div className="font-mono text-lg font-black text-black">20+ Hrs</div>
                <div className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold">Weekly Reclaimed</div>
              </div>
              <div className="p-2.5 rounded-xs bg-[#faf8f4] border border-[#d8cebe] shadow-2xs">
                <div className="font-mono text-lg font-black text-black">30%+ Bump</div>
                <div className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold">Valuation Multiple</div>
              </div>
              <div className="p-2.5 rounded-xs bg-[#faf8f4] border border-[#d8cebe] shadow-2xs">
                <div className="font-mono text-lg font-black text-black">100% Owned</div>
                <div className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold">IP In Perpetuity</div>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* PART 2: THE COMPARISON TABLE (BALANCED ARCHITECTURAL LEDGER)               */}
        {/* ========================================================================= */}
        <div id="comparison" className="bg-white border-2 border-[#d8cebe] rounded-md shadow-sm overflow-hidden scroll-mt-20">
          
          {/* Header Bar of the Comparison Table */}
          <div className="py-2.5 px-3 sm:px-4 bg-[#17181c] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#d4af37]">
            <div>
              <div className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-bold">
                  The Sovereign Transformation Ledger
                </span>
              </div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[#f3e5ab] mt-0.5">
                What You Get: The Unbounded Leadership Co. vs. Traditional Advisory Firms
              </h3>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] bg-[#0c0d14] px-2.5 py-0.5 rounded-xs border border-[#d4af37]/60 shrink-0 self-start sm:self-auto font-bold">
              Tangible Executive Outcomes
            </span>
          </div>

          {/* Compact Desktop Side-by-Side Table (Jet Black fonts, clear contrast) */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-[#d8cebe] bg-[#f0eade]">
                  <th className="py-2 px-3 text-[10px] font-mono uppercase tracking-wider text-black font-bold w-[22%]">
                    Strategic Dimension
                  </th>
                  <th className="py-2 px-3 text-[10px] font-mono uppercase tracking-wider text-rose-900 font-bold w-[39%] bg-[#fdf2f2] border-x border-[#ebdcc0]">
                    <div className="flex items-center gap-1">
                      <X className="w-3 h-3 text-rose-700" />
                      <span>Other Advisory Firms & Coaches</span>
                    </div>
                  </th>
                  <th className="py-2 px-3 text-[10px] font-mono uppercase tracking-wider text-black font-black w-[39%] bg-white border-l-2 border-[#d4af37]">
                    <div className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>The Unbounded Leadership Co. (Suchita Sancheti)</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebdcc0] text-xs leading-snug text-black">
                
                {/* Row 1: Deliverable */}
                <tr className="bg-white hover:bg-[#faf8f4] transition-colors">
                  <td className="py-2 px-3 font-serif font-bold text-black">
                    Primary Deliverable & Outcome
                  </td>
                  <td className="py-2 px-3 bg-[#fff8f8] border-x border-[#ebdcc0] text-zinc-900">
                    <span className="font-semibold text-rose-700 block mb-0.5">200-Slide Slide Deck & Theory</span>
                    Unimplemented advice; you stay trapped in the daily firefighting machinery.
                  </td>
                  <td className="py-2 px-3 bg-white border-l-2 border-r-2 border-[#d4af37] text-black">
                    <span className="font-bold text-black block mb-0.5">Codified Decoupled OS in 90 Days</span>
                    Autonomous infrastructure installed directly into your team with strict exit date.
                  </td>
                </tr>

                {/* Row 2: Time Drag */}
                <tr className="bg-[#faf8f4] hover:bg-white transition-colors">
                  <td className="py-2 px-3 font-serif font-bold text-black">
                    Your Weekly Operational Drag
                  </td>
                  <td className="py-2 px-3 bg-[#fff8f8] border-x border-[#ebdcc0] text-zinc-900">
                    <span className="font-semibold text-rose-700 block mb-0.5">+6–10 hrs/wk Added Overhead</span>
                    More status check-ins and homework that add work just managing the consultants.
                  </td>
                  <td className="py-2 px-3 bg-white border-l-2 border-r-2 border-[#d4af37] text-black">
                    <span className="font-bold text-black block mb-0.5">Reclaims 20+ Hours Every Week</span>
                    Dismantles 70% of consensus meetings with 14-day asynchronous execution loops.
                  </td>
                </tr>

                {/* Row 3: Valuation */}
                <tr className="bg-white hover:bg-[#faf8f4] transition-colors">
                  <td className="py-2 px-3 font-serif font-bold text-black">
                    Enterprise Valuation Impact
                  </td>
                  <td className="py-2 px-3 bg-[#fff8f8] border-x border-[#ebdcc0] text-zinc-900">
                    <span className="font-semibold text-rose-700 block mb-0.5">Zero Multiple Impact</span>
                    Acquirers and PE still penalize valuation due to heavy key-person dependency.
                  </td>
                  <td className="py-2 px-3 bg-white border-l-2 border-r-2 border-[#d4af37] text-black">
                    <span className="font-bold text-black block mb-0.5">30%–100%+ Multiple Expansion</span>
                    Eliminates key-man risk, unlocking institutional-grade capital and sovereign exit value.
                  </td>
                </tr>

                {/* Row 4: Engagement Runway */}
                <tr className="bg-[#faf8f4] hover:bg-white transition-colors">
                  <td className="py-2 px-3 font-serif font-bold text-black">
                    Engagement Runway & Dependency
                  </td>
                  <td className="py-2 px-3 bg-[#fff8f8] border-x border-[#ebdcc0] text-zinc-900">
                    <span className="font-semibold text-rose-700 block mb-0.5">Indefinite & Open-Ended</span>
                    Incentivized to stay forever by billing hourly or monthly without finishing.
                  </td>
                  <td className="py-2 px-3 bg-white border-l-2 border-r-2 border-[#d4af37] text-black">
                    <span className="font-bold text-black block mb-0.5">Strict 90 Days With Exit Date</span>
                    We build your self-running system, train your leads, and exit completely.
                  </td>
                </tr>

                {/* Row 5: Who Does The Work */}
                <tr className="bg-white hover:bg-[#faf8f4] transition-colors">
                  <td className="py-2 px-3 font-serif font-bold text-black">
                    Who Sits In Your Boardroom
                  </td>
                  <td className="py-2 px-3 bg-[#fff8f8] border-x border-[#ebdcc0] text-zinc-900">
                    <span className="font-semibold text-rose-700 block mb-0.5">Junior Analysts & Associates</span>
                    Sold by senior partners, but handed off to inexperienced recent graduates.
                  </td>
                  <td className="py-2 px-3 bg-white border-l-2 border-r-2 border-[#d4af37] text-black">
                    <span className="font-bold text-black block mb-0.5">Founder Suchita Sancheti Directly</span>
                    Zero juniors. Direct 1-on-1 strategic immersion with proven enterprise architect.
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Action Row Inside the Comparison Table */}
          <div className="py-2.5 px-3 sm:px-4 bg-[#faf8f4] border-t border-[#ebdcc0] flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <span className="text-xs text-black font-medium">
              Want to see exactly where your company lands on this matrix?
            </span>
            <div className="flex items-center gap-2">
              <a
                href="#simple-test"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = 'test';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 bg-black text-[#d4af37] hover:bg-zinc-800 text-xs font-mono uppercase font-bold rounded-xs transition-colors cursor-pointer"
              >
                Take 60-Sec Audit
              </a>
              <button
                onClick={onOpenConsultation}
                className="px-3.5 py-1.5 bg-[#9d7b38] hover:bg-[#88692c] text-white text-xs font-mono uppercase font-bold rounded-xs transition-colors cursor-pointer"
              >
                Book 20-Min Review
              </button>
            </div>
          </div>

        </div>

        {/* Collapsible Sovereign Vision & Philosophy Accordion (Compact) */}
        <div className="pt-1 text-center">
          <button
            onClick={() => setShowFullVision(!showFullVision)}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#faf8f4] border border-[#d8cebe] rounded-xs text-xs font-mono font-bold text-black transition-colors cursor-pointer shadow-2xs"
          >
            <span>{showFullVision ? 'Hide Institutional Philosophy' : 'Read Institutional Philosophy & Core Values'}</span>
            {showFullVision ? <ChevronUp className="w-3.5 h-3.5 text-[#9d7b38]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#9d7b38]" />}
          </button>

          {showFullVision && (
            <div className="mt-3 bg-white border-2 border-[#d8cebe] rounded-md p-4 sm:p-5 text-left space-y-4 animate-in fade-in duration-200 shadow-sm text-black">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-3.5 rounded-xs bg-[#faf8f4] border border-[#d8cebe] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#9d7b38] font-bold">
                    <Target className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>Our Sovereign Vision</span>
                  </div>
                  <h4 className="text-sm font-bold text-black font-serif">
                    Enterprises Operating Beyond Founder Dependency.
                  </h4>
                  <p className="text-xs text-zinc-800 leading-relaxed italic">
                    “A business world where great enterprises outlive the mortal stamina of their founders, executing with autonomous precision and moral gravity in perpetuity.”
                  </p>
                </div>

                <div className="p-3.5 rounded-xs bg-[#faf8f4] border border-[#d8cebe] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#9d7b38] font-bold">
                    <Building2 className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>Our Sovereign Mission</span>
                  </div>
                  <h4 className="text-sm font-bold text-black font-serif">
                    Permanent Founder Decoupling Within 90 Days.
                  </h4>
                  <p className="text-xs text-zinc-800 leading-relaxed italic">
                    “To systematically liberate visionary builders from daily operational drag by codifying executive decision boundaries into an autonomous operating architecture that endures.”
                  </p>
                </div>

              </div>

              {/* Architectural Philosophy Statement */}
              <div className="p-3.5 rounded-xs bg-[#faf8f4] border border-[#d8cebe] space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#9d7b38] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#9d7b38]" />
                  <span>The Governance Philosophy: Systems Engineering Meets Stewardship</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-zinc-800 font-serif">
                  <div>
                    <strong className="text-black block mb-0.5">1. Architectural Rigor (Suchita Sancheti):</strong>
                    Treating the leadership operating system as an engineering substrate. If an enterprise requires the founder's daily intervention to function, its architecture is flawed. We replace tacit instincts with invariant protocols.
                  </div>
                  <div>
                    <strong className="text-black block mb-0.5">2. Executive Stewardship & Governance Psychology:</strong>
                    Aligning founder psychology with board governance. Decoupling requires intentional transition—shifting from tactical identity into high-altitude stewardship and compounding enterprise valuation.
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
};
