
import React, { useState } from 'react';
import { SovereignDB } from '../lib/database.ts';
import { Calendar, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';

interface WaitlistProps {
  defaultOpen?: boolean;
}

const Waitlist: React.FC<WaitlistProps> = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    scale: '50-200 Headcount',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Commit to local DB
    await SovereignDB.saveLead({
      name: formData.name,
      email: formData.email,
      organization: `${formData.organization} [Scale: ${formData.scale}]`,
      role: formData.role,
      message: formData.message
    });

    try {
      await SovereignDB.sendContactEmail({
        name: formData.name,
        email: formData.email,
        organization: `${formData.organization} [Scale: ${formData.scale}]`,
        role: formData.role,
        message: formData.message,
        type: 'INTAKE_ENTRY'
      });
    } catch (error) {
      console.error("Transmission Failed:", error);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="intake" className="py-8 sm:py-12 bg-[#0a0a0a] text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-full mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] animate-pulse" />
            <span className="text-[#b8860b] text-[9px] font-mono font-bold uppercase tracking-wider">
              Q3 Intake: 1 Final Opening • 10-Node Triangulation Audit
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-white mb-2 leading-snug">
            Initiate Your Strategic <span className="text-[#b8860b] italic font-light">Calibration.</span>
          </h2>
          <p className="text-zinc-400 text-xs font-light italic leading-relaxed">
            Choose your preferred path to engage Suchita Sancheti, Founder & Alignment Architect. Includes the complete Sovereign Board Dossier—100% credited toward full-scale protocol integration.
          </p>
        </div>

        {/* 2-Column Structured Conversion Cards */}
        <div className="grid md:grid-cols-12 gap-6 items-start">
          
          {/* Path 1: Direct Calendar Segment */}
          <div className="md:col-span-5 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-[#b8860b]/30 p-5 sm:p-6 rounded-xs flex flex-col justify-between h-full relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-[#b8860b]/20 text-[#b8860b] text-[8px] font-black uppercase font-mono">
              Fast Track
            </div>

            <div className="space-y-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/30 flex items-center justify-center text-[#b8860b]">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-serif text-white">Direct Executive Booking</h3>
              <p className="text-zinc-400 text-xs italic font-light leading-relaxed">
                Reserve a private 30-minute calibration briefing directly on Suchita Sancheti's calendar to diagnose your leadership substrate immediately.
              </p>
              
              <div className="pt-4 space-y-2 font-mono text-[11px] border-t border-white/10">
                <div className="flex items-center gap-2 text-zinc-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b]" />
                  <span>Confidential 1-on-1 Session</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b]" />
                  <span>Substrate Leak Identification</span>
                </div>
              </div>
            </div>

            <a 
              href="https://calendly.com/d/d3jb-kpx-r6q" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#b8860b] text-white text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all duration-300 text-center cursor-pointer block font-bold shadow-md"
            >
              Open Direct Calendar
            </a>
          </div>

          {/* Path 2: Private Ledger Inquiry */}
          <div className="md:col-span-7 bg-zinc-900 border border-white/10 p-5 sm:p-6 rounded-xs shadow-xl relative">
            <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-white/5 text-zinc-400 text-[8px] font-black uppercase font-mono">
              Form TULC-01
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#b8860b] mx-auto" />
                <h3 className="text-xl font-bold text-white font-serif">Inquiry Transmitted</h3>
                <p className="text-zinc-300 text-xs italic font-light max-w-md mx-auto leading-relaxed">
                  Your inquiry has been placed in the Aligned Ledger. Suchita Sancheti will review your parameters within 24 hours.
                </p>
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', organization: '', role: '', scale: '50-200 Headcount', message: '' });
                  }}
                  className="text-[9px] uppercase font-bold text-[#b8860b] hover:underline pt-2 cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                <h3 className="text-base font-bold font-serif text-white mb-2">Submit Private Inquiry</h3>
                
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[8px] font-black uppercase text-[#b8860b] block mb-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-black/40 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#b8860b] transition-colors rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-black uppercase text-[#b8860b] block mb-1">Work Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="e.g. rahul@enterprise.com"
                      className="w-full bg-black/40 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#b8860b] transition-colors rounded-xs"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[8px] font-black uppercase text-[#b8860b] block mb-1">Organization</label>
                    <input 
                      required
                      type="text" 
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      placeholder="e.g. Acme Global"
                      className="w-full bg-black/40 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#b8860b] transition-colors rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-black uppercase text-[#b8860b] block mb-1">Role</label>
                    <input 
                      required
                      type="text" 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      placeholder="e.g. Founder & CEO"
                      className="w-full bg-black/40 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#b8860b] transition-colors rounded-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[8px] font-black uppercase text-[#b8860b] block mb-1">Enterprise Scale / Structure</label>
                  <select
                    value={formData.scale}
                    onChange={(e) => setFormData({...formData, scale: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#b8860b] transition-colors rounded-xs"
                  >
                    <option value="10-50 Headcount" className="bg-zinc-900 text-white">10–50 Headcount (High-Growth Founder)</option>
                    <option value="50-200 Headcount" className="bg-zinc-900 text-white">50–200 Headcount (Scaling Enterprise)</option>
                    <option value="200+ Enterprise" className="bg-zinc-900 text-white">200+ Headcount (Institutional C-Suite)</option>
                    <option value="VC / PE Portfolio" className="bg-zinc-900 text-white">VC / PE Portfolio Firm</option>
                    <option value="Family Office / Holding" className="bg-zinc-900 text-white">Family Office / Dynastic Holding</option>
                  </select>
                </div>

                <div>
                  <label className="text-[8px] font-black uppercase text-[#b8860b] block mb-1">Primary Strategic Bottleneck / Yield Target</label>
                  <textarea 
                    required
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Describe where executive bandwidth is bleeding or your primary alignment goal..."
                    className="w-full bg-black/40 border border-white/10 p-2.5 text-xs text-white focus:outline-none focus:border-[#b8860b] transition-colors resize-none rounded-xs"
                  />
                </div>

                <div className="text-[9px] text-zinc-400 italic font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                  <span>Limited to 3 private engagements per quarter. All submissions protected under NDA.</span>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-white text-black hover:bg-[#b8860b] hover:text-white text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md font-bold tracking-wider"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Submit Confidential Application'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Waitlist;
