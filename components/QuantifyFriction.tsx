import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Building, Users, Clock, AlertTriangle } from 'lucide-react';

const QuantifyFriction: React.FC = () => {
  const navigate = useNavigate();
  const [revenue, setRevenue] = useState<number>(500); // in Crores
  const [headcount, setHeadcount] = useState<number>(10); // number of direct reports
  const [meetingHours, setMeetingHours] = useState<number>(25); // meetings per week

  // Calculate estimated Cognitive Tax based on sliders
  const cognitiveTaxCost = useMemo(() => {
    // Basic math for opportunity cost of leadership friction in INR Rupees
    const executiveHourValue = (revenue * 10000000) / 2000; // estimated output value per hour
    const weeklyLostHours = meetingHours * 0.4; // 40% estimated meeting waste / cognitive tax
    const annualLostOpportunityValue = executiveHourValue * weeklyLostHours * 48; // 48 active weeks
    return Math.round(annualLostOpportunityValue);
  }, [revenue, meetingHours]);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Crores`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)} Lakhs`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <section className="py-16 bg-[#ECECE4] border-t border-zinc-300 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#b8860b 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] block mb-3">Diagnostic Simulation Tool</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 mb-4 tracking-tight leading-none">
            Quantify Your <span className="text-[#b8860b] italic font-light">Cognitive Tax.</span>
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm italic font-light leading-relaxed">
            Strategic drift and un-automated execution represent a major hidden loss. Adjust the sliders below to isolate your firm's annual metabolic leak.
          </p>
        </div>

        <div className="bg-zinc-950 text-white rounded-xs p-6 sm:p-8 md:p-10 border border-[#b8860b]/20 max-w-5xl mx-auto shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
            
            {/* Left Column: Sliders */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2.5 bg-[#b8860b]/10 text-[#b8860b] px-3 py-1 border border-[#b8860b]/20 text-[9px] uppercase tracking-widest font-black self-start">
                <Calculator className="w-3.5 h-3.5" />
                <span>Alignment Parameters</span>
              </div>

              <div className="space-y-6 pt-2">
                {/* Revenue Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs uppercase tracking-widest text-zinc-300">
                    <span className="flex items-center gap-2 font-medium"><Building className="w-3.5 h-3.5 text-zinc-500" /> Annual Org Revenue</span>
                    <span className="font-bold text-[#b8860b]">₹{revenue} Cr</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="2000" 
                    value={revenue} 
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full accent-[#b8860b] bg-zinc-850 h-1 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 mt-1 uppercase tracking-widest font-mono">
                    <span>₹10 Cr</span>
                    <span>₹2,000 Cr+</span>
                  </div>
                </div>

                {/* Headcount Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs uppercase tracking-widest text-zinc-300">
                    <span className="flex items-center gap-2 font-medium"><Users className="w-3.5 h-3.5 text-zinc-500" /> Direct Reports / Leaders</span>
                    <span className="font-bold text-[#b8860b]">{headcount} Leaders</span>
                  </div>
                  <input 
                    type="range" 
                    min="3" 
                    max="45" 
                    value={headcount} 
                    onChange={(e) => setHeadcount(Number(e.target.value))}
                    className="w-full accent-[#b8860b] bg-zinc-850 h-1 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 mt-1 uppercase tracking-widest font-mono">
                    <span>3 Key Players</span>
                    <span>45+ Enterprise Roles</span>
                  </div>
                </div>

                {/* Meeting Hours Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs uppercase tracking-widest text-zinc-300">
                    <span className="flex items-center gap-2 font-medium"><Clock className="w-3.5 h-3.5 text-zinc-500" /> Tactical Meeting Hours / Wk</span>
                    <span className="font-bold text-[#b8860b]">{meetingHours} Hours</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="60" 
                    value={meetingHours} 
                    onChange={(e) => setMeetingHours(Number(e.target.value))}
                    className="w-full accent-[#b8860b] bg-zinc-850 h-1 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 mt-1 uppercase tracking-widest font-mono">
                    <span>5 Hrs (Lean)</span>
                    <span>60 Hrs (Saturated)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Output Metrics */}
            <div className="lg:col-span-6">
              <div className="bg-zinc-900 border border-white/5 p-5 md:p-6 relative rounded-xs flex flex-col justify-between h-full">
                <div className="absolute top-4 right-4 text-[#b8860b]/20">
                  <AlertTriangle className="w-16 h-16" />
                </div>

                <div className="space-y-5 text-left">
                  <span className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.25em] block font-mono">Leaked Cognitive Equity Summary</span>
                  
                  <div>
                    <span className="text-zinc-400 text-xs italic font-light block mb-1">Estimated Annual Inaction Tax</span>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#b8860b] tracking-tight">
                      {formatCurrency(cognitiveTaxCost)}
                    </div>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />
                      <p className="text-xs text-zinc-400 italic">
                        Estimated <strong className="text-white">{(meetingHours * 0.4).toFixed(0)} hours per week</strong> of key leadership attention spent resolving systemic variances rather than compounding strategic advantage.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />
                      <p className="text-xs text-zinc-400 italic">
                        Current organizational velocity coefficient is throttled. Strategic decisions require <strong className="text-white">3.5x</strong> more coordination labor than custom logic-gate baselines.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-[#b8860b]/5 border border-[#b8860b]/20 flex flex-col sm:flex-row items-center gap-4 justify-between">
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-0.5">Audit Your Substrate</h4>
                    <p className="text-[10px] text-zinc-400 italic">Request your Phase 0.0 Diagnostic to engineer absolute performance.</p>
                  </div>
                  <button 
                    onClick={() => navigate('/intake')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#b8860b] text-white hover:bg-white hover:text-black text-[9px] font-black uppercase tracking-widest transition-all shrink-0 cursor-pointer"
                  >
                    Request Audit
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default QuantifyFriction;
