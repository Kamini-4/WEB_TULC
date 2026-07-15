
import React, { useState, useEffect } from 'react';
import { SovereignDB } from '../lib/database.ts';

const ledgerMessages = [
  "INITIALIZING_HANDSHAKE...",
  "RSA_4096_ENCRYPTION_ACTIVE",
  "PARSING_SUBSTRATE_QUERY...",
  "TRANSMITTING_TO_SOVEREIGN_LEDGER...",
  "RECEIPT_CONFIRMED: TULC-INTAKE-01",
  "SECURITY_TUNNEL_CLOSED."
];

const Waitlist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [ledgerLog, setLedgerLog] = useState<string[]>([]);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEncrypting(true);
    
    // Commit to the Sovereign Ledger (Local Persistence)
    await SovereignDB.saveLead({
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      role: formData.role,
      message: formData.message
    });

    try {
      // Trigger Real-time Notification via Backend API and log email status
      await SovereignDB.sendContactEmail({
        name: formData.name,
        email: formData.email,
        organization: formData.organization,
        role: formData.role,
        message: formData.message,
        type: 'INTAKE_ENTRY'
      });
    } catch (error) {
      console.error("Notification Transmission Failed:", error);
    }
  };

  useEffect(() => {
    if (isEncrypting) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < ledgerMessages.length) {
          setLedgerLog(prev => [...prev, ledgerMessages[i]]);
          i++;
        } else {
          clearInterval(interval);
          setSubmitted(true);
        }
      }, 600);
      return () => clearInterval(interval);
    }
  }, [isEncrypting]);

  return (
    <section id="intake" className="py-16 sm:py-24 bg-[#0a0a0a] text-white border-t border-white/10">
      <style>
        {`
          @keyframes executivePulse {
            0% { box-shadow: 0 0 0 0 rgba(184, 134, 11, 0.2); }
            70% { box-shadow: 0 0 0 15px rgba(184, 134, 11, 0); }
            100% { box-shadow: 0 0 0 0 rgba(184, 134, 11, 0); }
          }
          .animate-pulse-executive-dark {
            animation: executivePulse 3s infinite cubic-bezier(0.66, 0, 0, 1);
          }
        `}
      </style>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-[#b8860b] text-[8px] sm:text-[10px] font-black uppercase mb-6 sm:mb-8 tracking-[0.3em]">The Sovereign Ledger</h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 text-white">Privileged <span className="italic text-[#b8860b]">Intake Terminal.</span></h3>
        
        {/* Social Proof Ticker */}
        <div className="mb-12 overflow-hidden border-y border-white/10 py-4">
          <div className="flex animate-marquee whitespace-nowrap gap-12 text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">
            <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#b8860b] rounded-full" /> RECENT INTAKE: CEO, GLOBAL LOGISTICS (LONDON)</span>
            <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#b8860b] rounded-full" /> RECENT INTAKE: PRINCIPAL, PRIVATE EQUITY (NYC)</span>
            <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#b8860b] rounded-full" /> RECENT INTAKE: FOUNDER, FINTECH UNICORN (SINGAPORE)</span>
            <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#b8860b] rounded-full" /> RECENT INTAKE: MANAGING DIRECTOR, INFRASTRUCTURE (DUBAI)</span>
            <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#b8860b] rounded-full" /> RECENT INTAKE: CEO, GLOBAL LOGISTICS (LONDON)</span>
            <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#b8860b] rounded-full" /> RECENT INTAKE: PRINCIPAL, PRIVATE EQUITY (NYC)</span>
          </div>
        </div>

        {!isOpen ? (
          <div className="max-w-2xl mx-auto py-12 px-6 border border-[#b8860b]/20 bg-[#111111] relative overflow-hidden group shadow-2xl rounded-xs">
            <div className="absolute top-0 right-0 p-4 font-mono text-[7px] text-zinc-600 tracking-widest">TULC-SECURE-01</div>
            <div className="relative z-10 space-y-6">
              <span className="text-[9px] font-black uppercase text-[#b8860b] tracking-[0.4em] block">Exclusive Advisory Intake</span>
              <h4 className="text-2xl sm:text-3xl font-bold font-serif italic text-white">Admittance of Strategic Capital & Legacy Architecture.</h4>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed italic font-light">
                To maintain sovereign fidelity and exceptional operational depth, the Principal Architect accepts exactly <strong className="text-white font-medium">3 new corporate clients per quarter</strong>. All inquiries are screened under zero-knowledge encryption protocols.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setIsOpen(true)}
                  className="px-10 py-5 bg-[#b8860b] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_50px_rgba(184,134,11,0.2)] animate-pulse-executive-dark cursor-pointer font-bold"
                >
                  Request Privileged Access & Secure Intake
                </button>
              </div>
              <p className="text-zinc-500 text-[9px] font-mono uppercase tracking-widest pt-2">
                🔒 Direct Calendly Booking & Encrypted Ledger Form Included
              </p>
            </div>
          </div>
        ) : isEncrypting && !submitted ? (
          <div className="bg-[#111111] p-8 sm:p-12 border border-[#b8860b]/30 text-left font-inter">
            <div className="flex items-center gap-4 mb-6 sm:mb-8">
              <div className="w-2 h-2 rounded-full bg-[#b8860b] animate-ping" />
              <span className="text-[8px] sm:text-[10px] font-black uppercase text-[#b8860b] tracking-[0.2em]">Securing Transmission...</span>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {ledgerLog.map((log, idx) => (
                <div key={idx} className="text-[9px] sm:text-[11px] uppercase font-bold text-white/60 animate-fade-in flex gap-3 sm:gap-4">
                  <span className="text-[#b8860b] opacity-100">[{idx}]</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        ) : submitted ? (
          <div className="p-10 sm:p-16 border border-[#b8860b]/30 bg-white/5 backdrop-blur-sm shadow-2xl">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#b8860b] rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">Intake Initialized.</h4>
            <p className="text-zinc-300 text-base sm:text-lg font-light italic leading-relaxed max-w-lg mx-auto mb-8 sm:mb-10">
              Your inquiry has been encrypted and placed in the Aligned Ledger. Suchita Sancheti will personally review your substrate within one business cycle.
            </p>
            <button 
              onClick={() => {
                setSubmitted(false);
                setIsEncrypting(false);
                setLedgerLog([]);
                setFormData({ name: '', email: '', organization: '', role: '', message: '' });
                setIsOpen(false);
              }}
              className="text-[8px] sm:text-[10px] font-black uppercase text-zinc-400 hover:text-white tracking-widest transition-all"
            >
              Close Ledger Entry
            </button>
          </div>
        ) : (
          <div className="space-y-12 animate-fade-in">
            {/* Direct Channel Booking Option */}
            <div className="bg-[#111111] p-6 sm:p-10 border border-[#b8860b]/30 text-left relative shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 bg-[#b8860b]/10 text-[#b8860b] text-[8px] font-black uppercase tracking-widest">
                DIRECT SECURE CHANNEL
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <span className="text-[#b8860b] text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] block mb-2">INTEGRATE OPERATIONS & LEADERSHIP</span>
                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">Direct Calibration Booking</h4>
                  <p className="text-zinc-400 text-xs sm:text-sm italic font-light leading-relaxed max-w-xl">
                    Skip standard queue review mechanisms. Consult Suchita Sancheti's calendar directly to reserve a private briefing segment and diagnose your firm's operational substrates immediately.
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <a 
                    href="https://calendly.com/d/d3jb-kpx-r6q" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-4 bg-[#b8860b] text-white text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 shadow-lg text-center cursor-pointer inline-block font-bold"
                  >
                    Book Direct Segment
                  </a>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Collapse Form
                  </button>
                </div>
              </div>
            </div>

            {/* Separator / Alternative Option */}
            <div className="flex items-center gap-4 py-2">
              <div className="h-[1px] flex-1 bg-white/10" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">OR SUBMIT MANUAL LEDGER INQUIRY</span>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="text-left space-y-6 sm:space-y-8 bg-white/5 p-8 sm:p-10 md:p-16 border border-white/10 shadow-2xl relative backdrop-blur-md">
              <div className="absolute top-0 right-0 p-4 sm:p-8">
                <span className="text-[7px] sm:text-[9px] uppercase font-black text-white/20 tracking-widest">FORM: TULC-SR-01</span>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-10">
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-[8px] sm:text-[10px] uppercase text-[#b8860b] font-black tracking-widest">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-white/10 py-2 sm:py-3 text-white focus:outline-none focus:border-[#b8860b] transition-colors font-medium text-base sm:text-lg italic"
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-[8px] sm:text-[10px] uppercase text-[#b8860b] font-black tracking-widest">Work Email</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b border-white/10 py-2 sm:py-3 text-white focus:outline-none focus:border-[#b8860b] transition-colors font-medium text-base sm:text-lg italic"
                  />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-10">
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-[8px] sm:text-[10px] uppercase text-[#b8860b] font-black tracking-widest">Organization Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    className="w-full bg-transparent border-b border-white/10 py-2 sm:py-3 text-white focus:outline-none focus:border-[#b8860b] transition-colors font-medium text-base sm:text-lg italic"
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-[8px] sm:text-[10px] uppercase text-[#b8860b] font-black tracking-widest">Institutional Role</label>
                  <input 
                    required
                    type="text" 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    placeholder="e.g. CEO, Principal Architect"
                    className="w-full bg-transparent border-b border-white/10 py-2 sm:py-3 text-white focus:outline-none focus:border-[#b8860b] transition-colors font-medium text-base sm:text-lg italic"
                  />
                </div>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <label className="text-[8px] sm:text-[10px] uppercase text-[#b8860b] font-black tracking-widest">Institutional Yield Target</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Briefly define the primary bottleneck in your current leadership substrate..."
                  className="w-full bg-white/5 border border-white/10 p-4 sm:p-6 text-white focus:outline-none focus:border-[#b8860b] transition-colors resize-none font-medium italic text-base sm:text-lg leading-relaxed"
                />
              </div>
              
              <div className="pt-4 sm:pt-6">
                <button 
                  type="submit"
                  className="w-full py-4 sm:py-6 bg-[#b8860b] text-white text-[9px] sm:text-[11px] font-bold uppercase hover:bg-white hover:text-black transition-all shadow-2xl tracking-[0.2em] sm:tracking-[0.3em] animate-pulse-executive-dark"
                >
                  Transmit to Sovereign Ledger
                </button>
                
                <div className="mt-6 sm:mt-8 flex flex-wrap justify-center items-center gap-4 sm:gap-6 opacity-40">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-zinc-400" />
                    <span className="text-[7px] sm:text-[8px] uppercase font-black tracking-widest text-white">End-to-End Encrypted</span>
                  </div>
                  <div className="hidden sm:block w-px h-3 bg-white/10" />
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-zinc-400" />
                    <span className="text-[7px] sm:text-[8px] uppercase font-black tracking-widest text-white">Zero Data Retention Active</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Waitlist;
