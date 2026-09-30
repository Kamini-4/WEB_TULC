
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, Instagram, Linkedin, Twitter, Youtube, MapPin } from './BrandIcons';
import { GooglePreferredSource } from './GooglePreferredSource';

interface FooterProps {
  onLegalClick: (type: 'disclosure' | 'terms' | 'disclaimer') => void;
}

const Footer: React.FC<FooterProps> = ({ onLegalClick }) => {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#111111] text-[#f5f5f0] pt-8 sm:pt-12 pb-6 sm:pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Detailed Manifesto Section */}
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 mb-8 sm:mb-12 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-[#b8860b] text-[9px] sm:text-[10px] font-black uppercase mb-4 sm:mb-6 sm:">The Strategic Manifesto</h2>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.15] text-white">
                Leadership is not a performance. It is an <span className="italic text-[#b8860b]">Architectural Fact.</span>
              </p>
              <div className="h-[1.5px] w-12 sm:w-16 bg-[#b8860b]"></div>
              <div className="space-y-3 text-zinc-350 text-sm sm:text-base font-light italic leading-relaxed max-w-2xl">
                <p>
                  Advice is secondary; the engineering of aligned leadership systems is primary. The Unbounded exists to establish operational integrity across scaling layers.
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 bg-white/[0.03] p-4 sm:p-6 md:p-8 border border-white/10 backdrop-blur-3xl relative group overflow-hidden mt-4 lg:mt-0">
             <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#b8860b]/10 blur-[120px] rounded-full group-hover:bg-[#b8860b]/20 transition-all duration-1000" />
             <h3 className="text-[8px] sm:text-[9px] font-black uppercase text-[#b8860b] mb-4 sm:mb-6 sm:">Operational Pillars</h3>
             <ul className="space-y-4 sm:space-y-6">
               <ManifestoPoint 
                title="Architectural Determinism" 
                desc="Structure dictates destiny. Outcomes are not hoped for; systems make them mandatory." 
               />
               <ManifestoPoint 
                title="High-Fidelity Intent" 
                desc="Vision must maintain frequency across every scaling layer." 
               />
             </ul>
          </div>
        </div>

        {/* Major Final CTA Block */}
        <div className="border border-[#b8860b]/30 p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 bg-gradient-to-b from-white/[0.02] to-transparent relative overflow-hidden rounded-xs text-left">
          <div className="absolute top-0 right-0 p-3 font-mono text-[7px] text-[#b8860b] uppercase font-black bg-[#b8860b]/10">Direct Action Gateway</div>
          <div className="relative z-10 grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 border border-[#b8860b]/20 bg-[#b8860b]/5 text-[8px] font-mono uppercase text-[#b8860b]">
                ⚡ Verified Performance Impact
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white leading-tight">
                Eliminate Operational Bleed. <br/>
                <span className="italic text-[#b8860b] font-light">Claim Sovereign Command.</span>
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed italic font-light max-w-xl">
                Elite leadership operates with systems precision, not guesswork. Align with the Principal Architect to reclaim up to 40% of your strategic capacity.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-white/5">
                <div>
                  <div className="text-[10px] font-black text-white uppercase ">98% Retainer Renewal</div>
                  <div className="text-[8px] text-zinc-500 font-mono uppercase">Fortune 500 & Unicorn Principals</div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-white uppercase ">10-Node Triangulation Audit</div>
                  <div className="text-[8px] text-zinc-500 font-mono uppercase">Apex → Edge Telemetry</div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-[#b8860b] uppercase ">3 Client Limit / Qtr</div>
                  <div className="text-[8px] text-zinc-500 font-mono uppercase">Uncompromising Architecture</div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col gap-2.5 w-full">
              <button 
                onClick={() => navigate('/assessment')}
                className="w-full px-5 py-3 bg-[#b8860b] text-white hover:bg-white hover:text-black text-[9px] font-black uppercase transition-all duration-300 font-bold shadow-[0_0_30px_rgba(184,134,11,0.15)] text-center cursor-pointer"
              >
                1. Start Private Calibration (90s)
              </button>
              <button 
                onClick={() => navigate('/intake')}
                className="w-full px-5 py-3 bg-transparent border border-zinc-700 text-white hover:border-[#b8860b] hover:text-[#b8860b] text-[9px] font-black uppercase transition-all duration-300 font-bold text-center cursor-pointer"
              >
                2. Request Admittance & File Intake
              </button>
              <a 
                href="https://calendly.com/d/d3jb-kpx-r6q" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full px-5 py-3 bg-zinc-900 border border-white/5 text-zinc-350 hover:text-white hover:bg-zinc-800 text-[9px] font-black uppercase transition-all duration-300 font-bold text-center inline-block cursor-pointer"
              >
                3. Book Direct Briefing Segment
              </a>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[8px] font-mono uppercase text-zinc-500">
                  🔒 Zero-Knowledge secure protocol.
                </span>
                <GooglePreferredSource variant="compact" />
              </div>
            </div>
          </div>
        </div>

        {/* Verified Headquarters & Google Business Profile Embed Block */}
        <div className="border border-white/10 bg-white/[0.02] p-5 sm:p-6 mb-10 rounded-xs">
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-[#b8860b]/30 bg-[#b8860b]/10 text-[9px] font-mono uppercase text-[#b8860b]">
                <MapPin className="w-3 h-3" />
                <span>Verified Google Business Profile &amp; Location</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
                The Unbounded Leadership Co.
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-light">
                Boutique executive consultancy delivering institutional leadership architecture and governance advisory. Direct telephone, digital briefings, and verified Google Business Profile.
              </p>
              <div className="space-y-1.5 text-xs font-mono text-zinc-300 pt-1">
                <div><span className="text-zinc-500 uppercase text-[9px] block sm:inline sm:mr-2">Direct Telephone:</span> <a href="tel:+919325346704" aria-label="Call +91 9325346704" className="text-[#b8860b] hover:underline font-bold">+91 9325346704</a></div>
                <div><span className="text-zinc-500 uppercase text-[9px] block sm:inline sm:mr-2">Principal Email:</span> <a href="mailto:suchita@theunboundedleadership.com" aria-label="Email Suchita Sancheti" className="text-white hover:underline">suchita@theunboundedleadership.com</a></div>
                <div><span className="text-zinc-500 uppercase text-[9px] block sm:inline sm:mr-2">Operating Hours:</span> Mon–Fri, 09:00 – 18:00 IST (Global Mandates)</div>
              </div>
              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href="https://business.google.com/n/14240239232288232619/searchprofile?hl=en-GB"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Google Business Profile"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-[#b8860b] hover:bg-white text-black text-[10px] font-bold uppercase tracking-wider transition-all"
                >
                  <MapPin className="w-3 h-3" />
                  <span>Google Business Profile</span>
                </a>
                <a
                  href="https://maps.google.com/?q=The+Unbounded+Leadership+Co."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open location in Google Maps"
                  className="inline-flex items-center gap-2 px-3 py-2 border border-zinc-700 hover:border-[#b8860b] text-white hover:text-[#b8860b] text-[10px] font-bold uppercase tracking-wider transition-all"
                >
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-7 overflow-hidden rounded border border-white/10 bg-zinc-900/60 h-52 sm:h-64 relative">
              <iframe
                title="The Unbounded Leadership Co. Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15129.588827926887!2d73.8477967!3d18.5204303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711440000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.85) invert(0.92) contrast(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Global Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 sm:gap-12 mb-10 sm:mb-12 border-t border-white/5 pt-8 sm:pt-10">
          <div className="col-span-2">
            <div className="text-xl sm:text-2xl font-bold mb-3 text-white ">THE UNBOUNDED</div>
            <div className="text-[#b8860b] text-[8px] sm:text-[9px] font-black uppercase mb-4">Suchita Sancheti | Founder & Enterprise Architect</div>
            <p className="text-white/60 text-[9px] sm:text-[10px] leading-relaxed max-w-sm uppercase font-black mb-4 sm:mb-6 leading-loose">
              Re-architecting leadership operating systems for global organizational scaling.
            </p>
            <div className="flex flex-col gap-2 font-mono text-[9px] text-zinc-300">
              <span className="text-[7px] font-black uppercase text-zinc-500 block mb-0.5">Verified Contact &amp; Channels</span>
              <a href="tel:+919325346704" aria-label="Call +91 9325346704" className="hover:text-[#b8860b] text-zinc-300 transition-colors flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                <span className="font-bold">+91 9325346704</span>
              </a>
              <a href="mailto:suchita@theunboundedleadership.com" aria-label="Email suchita@theunboundedleadership.com" className="hover:text-[#b8860b] text-zinc-300 transition-colors flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                <span>suchita@theunboundedleadership.com</span>
              </a>
              <a href="https://business.google.com/n/14240239232288232619/searchprofile?hl=en-GB" target="_blank" rel="noopener noreferrer" aria-label="Google Business Profile" className="hover:text-[#b8860b] text-zinc-300 transition-colors flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                <span>Google Business Profile (Verified)</span>
              </a>
              <a href="https://www.linkedin.com/company/theunboundedleadership" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="hover:text-[#b8860b] text-zinc-300 transition-colors flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                <span>LinkedIn / The Unbounded Leadership</span>
              </a>
              <a href="https://www.instagram.com/transformingleadership" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile" className="hover:text-[#b8860b] text-zinc-300 transition-colors flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                <span>Instagram / @transformingleadership</span>
              </a>
              <a href="https://twitter.com/UnboundedLead" target="_blank" rel="noopener noreferrer" aria-label="Twitter profile" className="hover:text-[#b8860b] text-zinc-300 transition-colors flex items-center gap-2">
                <Twitter className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                <span>Twitter / @UnboundedLead</span>
              </a>
              <a href="https://www.youtube.com/@TheUnboundedLeadership" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel" className="hover:text-[#b8860b] text-zinc-300 transition-colors flex items-center gap-2">
                <Youtube className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                <span>YouTube / @TheUnboundedLeadership</span>
              </a>
              <div className="pt-0.5 flex items-center gap-2">
                <a 
                  href="https://www.f6s.com/member/suchita-sancheti?follow=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Follow Suchita Sancheti on F6S"
                  aria-label="Follow Suchita Sancheti on F6S"
                  className="hover:opacity-85 transition-opacity inline-block"
                >
                  <img 
                    src="https://www.f6s.com/images/f6s-follow-secondary.png" 
                    width="78" 
                    height="22" 
                    alt="Follow Suchita Sancheti on F6S" 
                    referrerPolicy="no-referrer"
                    style={{ width: '78px', height: '22px', padding: '0px', margin: '0px' }}
                  />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="text-white text-[9px] uppercase font-black mb-4 font-mono">Architecture</h5>
            <ul className="text-white/50 text-[9px] uppercase space-y-2 font-bold font-mono">
              <li><Link to="/#domains" className="hover:text-[#b8860b] transition-colors uppercase">5 Sovereign Domains</Link></li>
              <li><Link to="/methodology" className="hover:text-[#b8860b] transition-colors uppercase">Strategic Protocol</Link></li>
              <li><Link to="/services" className="hover:text-[#b8860b] transition-colors uppercase">Services Spectrum</Link></li>
              <li><Link to="/mandates" className="hover:text-[#b8860b] transition-colors uppercase">Strategic Mandates</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white text-[9px] uppercase font-black mb-4 font-mono">Diagnostics</h5>
            <ul className="text-white/50 text-[9px] uppercase space-y-2 font-bold font-mono">
              <li><Link to="/cognitive-tax" className="hover:text-[#b8860b] transition-colors uppercase">Cognitive Tax Simulator</Link></li>
              <li><Link to="/assessment" className="hover:text-[#b8860b] transition-colors uppercase">Domain Diagnostic Audit</Link></li>
              <li><Link to="/intake" className="hover:text-[#b8860b] transition-colors uppercase">Executive Intake Portal</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-[9px] uppercase font-black mb-4 font-mono">Registry</h5>
            <ul className="text-white/50 text-[9px] uppercase space-y-2 font-bold font-mono">
              <li><Link to="/library" className="hover:text-[#b8860b] transition-colors uppercase">Research Library</Link></li>
              <li><Link to="/library" className="hover:text-[#b8860b] transition-colors uppercase">Patent White Papers</Link></li>
              <li><Link to="/about" className="hover:text-[#b8860b] transition-colors uppercase">Principal Pedigree</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-[9px] uppercase font-black mb-4 font-mono">Client Access</h5>
            <ul className="text-white/50 text-[9px] uppercase space-y-2 font-bold font-mono">
              <li><Link to="/shop" className="hover:text-[#b8860b] transition-colors uppercase text-[#b8860b]">Operating Toolkits (Shop)</Link></li>
              <li><Link to="/portal" className="hover:text-[#b8860b] transition-colors uppercase">Client Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 sm:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
            <div className="max-w-md text-center md:text-left">
              <p className="text-[#b8860b] text-[9px] sm:text-[10px] uppercase font-black mb-2">
                "Apply → Yield Calibration → Scalable Performance."
              </p>
              <div className="text-white/20 text-[8px] sm:text-[9px] uppercase font-bold">© {new Date().getFullYear()} THE UNBOUNDED LEADERSHIP CO. • PROVISIONAL PATENT PENDING</div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[7px] sm:text-[8px] uppercase text-white/10 font-black ">
              <button onClick={() => onLegalClick('disclosure')} className="hover:text-white transition-colors cursor-pointer">Information Disclosure</button>
              <button onClick={() => onLegalClick('terms')} className="hover:text-white transition-colors cursor-pointer">Terms of Consultation</button>
              <button onClick={() => onLegalClick('disclaimer')} className="hover:text-white transition-colors cursor-pointer">Corporate Disclaimer</button>
            </div>
        </div>

        {/* Base Legal Disclaimer */}
        <div className="mt-8 pt-4 border-t border-white/[0.03] text-center">
          <p className="text-white/10 text-[7px] sm:text-[8px] uppercase font-black sm:max-w-5xl mx-auto leading-relaxed">
            DISCLOSURE: THE UNBOUNDED LEADERSHIP CO. IS A STRATEGIC ARCHITECTURE AND OPERATIONAL DIAGNOSTIC ADVISORY. ALL DATA TRANSMITTED DURING THE YIELD CALIBRATION PROCESS IS PROCESSED VIA COMPLIANT ZERO DATA RETENTION PROTOCOLS.
          </p>
        </div>
      </div>
    </footer>
  );
};

const ManifestoPoint: React.FC<{ title: string, desc: string }> = ({ title, desc }) => (
  <li className="flex gap-6 group">
    <div className="w-[1px] h-14 bg-[#b8860b]/20 group-hover:bg-[#b8860b] transition-all duration-700" />
    <div>
      <div className="text-white text-base font-bold uppercase mb-2">{title}</div>
      <div className="text-zinc-500 text-sm italic font-light leading-relaxed">{desc}</div>
    </div>
  </li>
);

export default Footer;
