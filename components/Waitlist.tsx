
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
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Commit to local DB
    await SovereignDB.saveLead({
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      role: formData.role,
      message: formData.message
    });

    try {
      await SovereignDB.sendContactEmail({
        name: formData.name,
        email: formData.email,
        organization: formData.organization,
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
    <section id="intake" className="py-16 sm:py-20 bg-[#0a0a0a] text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.3em] block mb-2 font-mono">
            Direct Intake & Consultation
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white mb-3">
            Initiate Your Strategic <span className="text-[#b8860b] italic font-light">Calibration.</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-light italic leading-relaxed">
            Choose your preferred path to engage Suchita Sancheti, Principal Architect.
          </p>
        </div>

        {/* 2-Column Structured Conversion Cards */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Path 1: Direct Calendar Segment */}
          <div className="md:col-span-5 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-[#b8860b]/30 p-6 sm:p-8 rounded-xs flex flex-col justify-between h-full relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 px-3 py-1 bg-[#b8860b]/20 text-[#b8860b] text-[8px] font-black uppercase tracking-widest font-mono">
              Fast Track
            </div>

            <div className="space-y-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/30 flex items-center justify-center text-[#b8860b]">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white">Direct Executive Booking</h3>
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
              className="w-full py-4 bg-[#b8860b] text-white text-[10px] font-black uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-300 text-center cursor-pointer block font-bold shadow-md"
            >
              Open Direct Calendar
            </a>
          </div>

          {/* Path 2: Private Ledger Inquiry */}
          <div className="md:col-span-7 bg-zinc-900 border border-white/10 p-6 sm:p-8 rounded-xs shadow-xl relative">
            <div className="absolute top-0 right-0 px-3 py-1 bg-white/5 text-zinc-400 text-[8px] font-black uppercase tracking-widest font-mono">
              Form TULC-01
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#b8860b] mx-auto" />
                <h3 className="text-2xl font-bold text-white font-serif">Inquiry Transmitted</h3>
                <p className="text-zinc-300 text-xs italic font-light max-w-md mx-auto leading-relaxed">
                  Your inquiry has been placed in the Aligned Ledger. Suchita Sancheti will review your parameters within 24 hours.
                </p>
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', organization: '', role: '', message: '' });
                  }}
                  className="text-[9px] uppercase font-bold text-[#b8860b] hover:underline tracking-widest pt-4"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <h3 className="text-lg font-bold font-serif text-white mb-4">Submit Private Inquiry</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black uppercase text-[#b8860b] tracking-wider block mb-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-black/40 border border-white/10 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#b8860b] transition-colors rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-[#b8860b] tracking-wider block mb-1">Work Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="e.g. rahul@enterprise.com"
                      className="w-full bg-black/40 border border-white/10 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#b8860b] transition-colors rounded-xs"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black uppercase text-[#b8860b] tracking-wider block mb-1">Organization</label>
                    <input 
                      required
                      type="text" 
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      placeholder="e.g. Acme Global"
                      className="w-full bg-black/40 border border-white/10 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#b8860b] transition-colors rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-[#b8860b] tracking-wider block mb-1">Role</label>
                    <input 
                      required
                      type="text" 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      placeholder="e.g. Founder & CEO"
                      className="w-full bg-black/40 border border-white/10 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#b8860b] transition-colors rounded-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase text-[#b8860b] tracking-wider block mb-1">Primary Bottleneck / Yield Target</label>
                  <textarea 
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Describe your current leadership friction or alignment goal..."
                    className="w-full bg-black/40 border border-white/10 p-3.5 text-xs text-white focus:outline-none focus:border-[#b8860b] transition-colors resize-none rounded-xs"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-white text-black hover:bg-[#b8860b] hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Transmit Inquiry'}</span>
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
