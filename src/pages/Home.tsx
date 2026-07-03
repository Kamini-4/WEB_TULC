
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../../components/Hero.tsx';
import WhoWeBuildFor from '../../components/WhoWeBuildFor.tsx';
import InstitutionalMetrics from '../../components/InstitutionalMetrics.tsx';
import Problem from '../../components/Problem.tsx';
import Assessment from '../../components/Assessment.tsx';
import Program from '../../components/Program.tsx';
import Methodology from '../../components/Methodology.tsx';
import ScaleEvidence from '../../components/ScaleEvidence.tsx';
import ImpactLedger from '../../components/ImpactLedger.tsx';
import EliteReasoning from '../../components/EliteReasoning.tsx';
import Insights from '../../components/Insights.tsx';
import Blog from '../../components/Blog.tsx';
import PrincipalDispatch from '../../components/PrincipalDispatch.tsx';
import FiveDomains from '../../components/FiveDomains.tsx';
import TrustProtocol from '../../components/TrustProtocol.tsx';
import StrategicOutcomes from '../../components/StrategicOutcomes.tsx';
import YieldStatement from '../../components/YieldStatement.tsx';
import ThoughtLeadership from '../../components/ThoughtLeadership.tsx';
import FAQ from '../../components/FAQ.tsx';
import Waitlist from '../../components/Waitlist.tsx';
import Newsletter from '../../components/Newsletter.tsx';

import StrategicMandates from '../../components/StrategicMandates.tsx';

interface HomeProps {
  onBriefClick: (id?: string) => void;
  onArticleClick: (article: any) => void;
}

const Home: React.FC<HomeProps> = ({ onBriefClick, onArticleClick }) => {
  const navigate = useNavigate();
  return (
    <>
      <Hero onBriefClick={onBriefClick} />
      <WhoWeBuildFor />
      <PrincipalDispatch />
      <FiveDomains />
      <InstitutionalMetrics />
      <ScaleEvidence onBriefClick={onBriefClick} />
      
      {/* Modular Entry - Visual Authority Upgrade */}
      <section className="py-32 bg-[#111111] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #b8860b 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] mb-8">Modular Entry Track</h2>
              <h3 className="text-5xl md:text-7xl font-bold mb-10 leading-[1.1]">
                Neutralize <span className="italic text-[#b8860b]">Risk.</span> <br />
                Verify the <span className="italic font-light">Signal.</span>
              </h3>
              <p className="text-zinc-200 text-xl leading-relaxed mb-12 italic font-light max-w-2xl">
                For principals requiring architectural proof before full institutional integration. A 14-day high-fidelity diagnostic of your leadership substrate.
              </p>
              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-px bg-[#b8860b] mt-3" />
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Cognitive Calibration</h4>
                    <p className="text-xs text-zinc-300 italic">Mapping your personal decision frequency.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-px bg-[#b8860b] mt-3" />
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Logic Leak Audit</h4>
                    <p className="text-xs text-zinc-300 italic">Identifying the 30% bandwidth drain.</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <button 
                  onClick={() => navigate('/intake')}
                  className="px-10 py-5 bg-[#b8860b] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-[0_0_50px_rgba(184,134,11,0.2)]"
                >
                  Inquire for Diagnostic Audit
                </button>
                <div className="hidden sm:block">
                  <div className="text-[10px] font-black uppercase text-[#b8860b] tracking-widest mb-1">Pricing Model</div>
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Upon Request</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-[4/5] bg-zinc-900 border border-white/10 p-1 flex flex-col items-center justify-center relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#b8860b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="w-16 h-16 border-2 border-[#b8860b] mb-8 rotate-45 flex items-center justify-center">
                  <div className="w-6 h-6 bg-[#b8860b]/50 animate-pulse" />
                </div>
                <h4 className="text-2xl font-bold italic mb-4">Phase 0.0</h4>
                <div className="text-[9px] font-black uppercase tracking-[0.5em] text-[#b8860b] mb-8">Diagnostic Protocol</div>
                <ul className="text-center space-y-3 text-zinc-300 text-xs italic font-light">
                  <li>Institutional Telemetry Scan</li>
                  <li>Principal Logic Synthesis</li>
                  <li>Substrate Integrity Report</li>
                  <li>Execution Velocity Map</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Problem />
      
      {/* Strategic Newsletter Placement - Capture audience after introducing operational friction */}
      <section className="bg-white py-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="border border-zinc-200">
            <Newsletter />
          </div>
        </div>
      </section>

      <YieldStatement />
      <StrategicMandates />
      
      {/* Methodology Preview - Driving to sub-page */}
      <section className="py-32 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] mb-8">The Architecture</h2>
              <h3 className="text-4xl md:text-6xl font-bold leading-tight">Systemic Alignment. <br /><span className="italic text-[#b8860b]">Zero Coordination Lag.</span></h3>
            </div>
            <button 
              onClick={() => window.location.href = '/methodology'}
              className="px-8 py-4 border border-[#111111] text-[#111111] text-[9px] font-black uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all flex items-center gap-4"
            >
              Alignment Protocol <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { id: '01', title: 'The Alignment Audit', desc: 'Identifying structural friction in your leadership layer.' },
              { id: '02', title: 'Process Optimization', desc: 'Translating your strategic intent into clear operational channels.' },
              { id: '03', title: 'Organizational Alignment', desc: 'Aligning the team to your core scaling targets.' },
              { id: '04', title: 'Delegated Alignment', desc: 'Leading as an Architect, rather than a reactive solver.' }
            ].map((pillar) => (
              <div key={pillar.id} className="p-8 bg-white border border-zinc-200 hover:border-[#b8860b] transition-all group">
                <div className="text-[#b8860b] text-xl font-bold italic mb-6">{pillar.id}</div>
                <h4 className="text-lg font-bold mb-4">{pillar.title}</h4>
                <p className="text-zinc-700 text-sm italic font-light leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Assessment />
      <ImpactLedger />
      <TrustProtocol />
      
      <Insights onArticleClick={onArticleClick} />
      <div className="max-w-4xl mx-auto px-6 mb-24">
        <Newsletter />
      </div>
      <FAQ />
      <Waitlist />
    </>
  );
};

export default Home;
