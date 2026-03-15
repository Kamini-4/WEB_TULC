import React from 'react';
import { DISPATCHES, Dispatch } from '../lib/dispatches.ts';

interface ThoughtLeadershipProps {
  onDispatchClick: (dispatch: Dispatch) => void;
}

const ThoughtLeadership: React.FC<ThoughtLeadershipProps> = ({ onDispatchClick }) => {
  return (
    <section id="thought-leadership" className="py-32 bg-white border-y border-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
          <div className="max-w-3xl">
            <h2 className="text-[#b8860b] text-[10px] font-black uppercase mb-8 tracking-[0.5em]">The Sovereign Dispatches</h2>
            <h3 className="text-5xl md:text-7xl font-bold text-[#111111] leading-[0.9] tracking-tighter">
              Architectural <span className="italic text-[#b8860b]">Discourse.</span>
            </h3>
            <p className="mt-10 text-zinc-500 text-xl italic font-light leading-relaxed max-w-2xl">
              A sequential 15-part series engineered to move the Principal from institutional entropy to absolute sovereignty.
            </p>
          </div>
          <div className="flex flex-col gap-6 w-full lg:w-auto">
            <div className="p-8 bg-zinc-50 border border-zinc-100">
              <span className="text-[8px] font-black uppercase text-zinc-400 tracking-widest block mb-4">Current Phase</span>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-[#111111]">01 / 03</span>
                <span className="text-xs text-zinc-500 italic">The Diagnosis</span>
              </div>
            </div>
            <a 
              href="https://www.linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-12 py-6 bg-[#111111] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#b8860b] transition-all duration-500 text-center shadow-2xl"
            >
              Follow the Series on LinkedIn
            </a>
          </div>
        </div>

        <div className="space-y-px bg-zinc-200 border border-zinc-200">
          {DISPATCHES.map((topic, idx) => (
            <div 
              key={idx} 
              onClick={() => onDispatchClick(topic)}
              className="bg-white p-8 md:p-12 group hover:bg-[#fcfcfc] transition-all duration-700 flex flex-col md:flex-row items-start md:items-center gap-8 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-[#b8860b] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              
              <div className="flex-shrink-0 w-20">
                <span className="text-[#b8860b] text-[12px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                  {topic.id.split('-')[1]}
                </span>
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-[8px] font-black uppercase text-zinc-400 tracking-widest">{topic.focus}</span>
                  <div className="h-px w-4 bg-zinc-200"></div>
                  <span className="text-[8px] font-black uppercase text-[#b8860b] tracking-widest">Yield: {topic.yield}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-bold text-[#111111] group-hover:text-[#b8860b] transition-colors duration-500">
                  {topic.title}
                </h4>
                <p className="mt-2 text-zinc-500 text-sm italic font-light group-hover:text-zinc-800 transition-colors">
                  {topic.tagline}
                </p>
              </div>

              <div className="flex-shrink-0 md:text-right">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 group-hover:text-[#111111] transition-colors">
                  Read Dispatch →
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
          <EditorialStat label="Series Depth" value="15 Dispatches" />
          <EditorialStat label="Strategic Focus" value="Substrate Integrity" />
          <EditorialStat label="Target Audience" value="Principals & Boards" />
        </div>

        <div className="mt-32 p-12 bg-[#111111] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#b8860b]/10 blur-[100px] rounded-full"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h4 className="text-2xl font-bold mb-4">Subscribe to the Sovereign Substrate</h4>
              <p className="text-zinc-400 text-sm italic font-light">
                Receive these dispatches directly in your inbox, along with privileged strategic diagnostics reserved for our LinkedIn community.
              </p>
            </div>
            <button 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-6 bg-[#b8860b] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 whitespace-nowrap"
            >
              Join the Registry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const EditorialStat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="border-t border-zinc-100 pt-8">
    <span className="text-[8px] font-black uppercase text-zinc-400 tracking-[0.4em] block mb-4">{label}</span>
    <span className="text-xl font-bold text-[#111111]">{value}</span>
  </div>
);

export default ThoughtLeadership;
