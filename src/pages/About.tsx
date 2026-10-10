import React from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Compass, 
  Mail, 
  Share2,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e0e2ec] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#d4af37]">
            <UserCheck className="w-4 h-4 text-[#d4af37]" />
            <span>Principal Leadership Architect</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-prestige font-bold text-white tracking-tight">
            Suchita Sancheti
          </h1>

          <p className="text-base sm:text-lg text-[#9aa1b2] font-serif-prestige leading-relaxed">
            Architecting institutional governance systems, sovereign substrates, and founder decoupling frameworks for high-stakes enterprise leadership.
          </p>
        </div>

        {/* Profile Biography Card */}
        <div className="bg-[#12141a] border border-[#1f232d] rounded-xs p-6 sm:p-12 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Avatar / Monogram Column */}
          <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="w-48 h-48 rounded-xs bg-gradient-to-br from-[#1a1e2b] to-[#12141a] border-2 border-[#b8860b]/40 flex flex-col items-center justify-center text-[#d4af37] shadow-xl relative overflow-hidden group">
              <Compass className="w-16 h-16 text-[#d4af37]/80 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-monumental tracking-widest text-lg font-bold text-white">SS</span>
              <span className="text-[10px] uppercase font-mono-tech text-[#9aa1b2]">Principal Architect</span>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-white">Suchita Sancheti</div>
              <div className="text-xs text-[#d4af37] font-mono-tech">Founder & Principal Architect</div>
              <div className="text-[11px] text-[#646b7a]">The Unbounded Leadership Co.</div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="mailto:suchita135sancheti@gmail.com"
                className="p-2 bg-[#171a23] hover:bg-[#202432] text-[#9aa1b2] hover:text-[#d4af37] border border-[#232734] rounded-xs transition-colors"
                title="Email Principal Desk"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#171a23] hover:bg-[#202432] text-[#9aa1b2] hover:text-[#d4af37] border border-[#232734] rounded-xs transition-colors"
                title="LinkedIn Profile"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Biography Text Column */}
          <div className="md:col-span-8 space-y-6 text-[#c8cde0] font-serif-prestige text-base sm:text-lg leading-[1.85]">
            <h2 className="text-2xl font-bold font-serif-prestige text-white pb-3 border-b border-[#1f232d]">
              The Sovereign Philosophy
            </h2>

            <p>
              Leadership advice for decades has suffered from a critical misconception: that scaling a company requires the founder to work longer hours, attend more meetings, or develop superhuman charisma.
            </p>

            <p>
              At <strong className="text-white font-sans">The Unbounded Leadership Co. (TULC)</strong>, Suchita Sancheti works directly with CXOs, boards of directors, and venture partners to introduce an engineering perspective to corporate governance. When an enterprise moves slowly, burns executive bandwidth, or stumbles during leadership succession, the solution is never to blame individuals—it is to fix the underlying decision architecture.
            </p>

            <blockquote className="my-6 pl-5 py-3 border-l-4 border-[#b8860b] bg-[#b8860b]/5 italic text-white text-lg rounded-r-xs">
              "Your ultimate legacy as a founder is not being indispensable to every daily decision; it is engineering a company so clear and resilient that your wisdom governs seamlessly long after you transition."
            </blockquote>

            <p>
              Suchita has advised high-growth tech founders, mid-market enterprises, and investment partners on codifying executive heuristics, eliminating multi-million-dollar coordination drag, and executing frictionless succession transitions.
            </p>

            <div className="pt-4 border-t border-[#1f232d] space-y-3">
              <h3 className="text-xs uppercase font-bold text-[#d4af37] tracking-wider font-mono-tech">
                Core Governance Commitments:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-[#9aa1b2]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Strictly confidential 1-on-1 advisory</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>No generic slide decks or coaching fluff</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Zero-latency operating substrates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Permanent institutional memory codification</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/intake"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#b8860b] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xs transition-colors"
              >
                <span>Initiate Private Mandate Dialogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
