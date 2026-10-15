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
  const [photoError, setPhotoError] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#1c1917] py-10 sm:py-12 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-tight text-[#8c6708] font-bold">
            <UserCheck className="w-4 h-4 text-[#8c6708]" />
            <span>Principal Leadership Architect</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c1917] tracking-tight font-serif">
            Suchita Sancheti
          </h1>

          <p className="text-base sm:text-lg text-[#57534e] font-serif leading-relaxed">
            Architecting institutional governance systems, sovereign substrates, and founder decoupling frameworks for high-stakes enterprise leadership.
          </p>
        </div>

        {/* Profile Biography Card */}
        <div className="bg-[#ffffff] border border-[#ded6c5] rounded-xs p-5 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-start font-serif">
          
          {/* Avatar / Portrait Column */}
          <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="w-48 h-48 rounded-xs bg-[#efebe2] border-2 border-[#b8860b]/30 flex flex-col items-center justify-center text-[#8c6708] shadow-sm relative overflow-hidden group">
              {!photoError ? (
                <img 
                  src="/Suchita.jpeg" 
                  alt="Suchita Sancheti" 
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500"
                  onError={() => setPhotoError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-4">
                  <Compass className="w-16 h-16 text-[#8c6708]/80 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="tracking-tight text-lg font-bold text-[#1c1917] font-serif">SS</span>
                  <span className="text-[10px] uppercase font-serif text-[#78716c]">Principal Architect</span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-[#1c1917]">Suchita Sancheti</div>
              <div className="text-xs text-[#8c6708] font-serif font-bold">Founder & Principal Architect</div>
              <div className="text-[11px] text-[#78716c]">The Unbounded Leadership Co.</div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="mailto:suchita@theunboundedleadership.com"
                className="p-2 bg-[#faf8f5] hover:bg-[#efebe2] text-[#57534e] hover:text-[#8c6708] border border-[#ded6c5] rounded-xs transition-colors"
                title="Email Principal Desk"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#faf8f5] hover:bg-[#efebe2] text-[#57534e] hover:text-[#8c6708] border border-[#ded6c5] rounded-xs transition-colors"
                title="LinkedIn Profile"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Biography Text Column */}
          <div className="md:col-span-8 space-y-6 text-[#57534e] font-serif text-base sm:text-lg leading-[1.85]">
            <h2 className="text-2xl font-bold font-serif text-[#1c1917] pb-3 border-b border-[#e2dcce]">
              The Sovereign Philosophy
            </h2>

            <p>
              Leadership advice for decades has suffered from a critical misconception: that scaling a company requires the founder to work longer hours, attend more meetings, or develop superhuman charisma.
            </p>

            <p>
              At <strong className="text-[#1c1917] font-serif">The Unbounded Leadership Co. (TULC)</strong>, Suchita Sancheti works directly with CXOs, boards of directors, and venture partners to introduce an engineering perspective to corporate governance. When an enterprise moves slowly, burns executive bandwidth, or stumbles during leadership succession, the solution is never to blame individuals—it is to fix the underlying decision architecture.
            </p>

            <blockquote className="my-6 pl-5 py-3 border-l-4 border-[#b8860b] bg-[#faf8f5] italic text-[#1c1917] text-lg rounded-r-xs shadow-2xs font-serif">
              "Your ultimate legacy as a founder is not being indispensable to every daily decision; it is engineering a company so clear and resilient that your wisdom governs seamlessly long after you transition."
            </blockquote>

            <p>
              Suchita has advised high-growth tech founders, mid-market enterprises, and investment partners on codifying executive heuristics, eliminating multi-million-dollar coordination drag, and executing frictionless succession transitions.
            </p>

            <div className="pt-4 border-t border-[#e2dcce] space-y-3">
              <h3 className="text-xs uppercase font-bold text-[#8c6708] tracking-wider font-serif">
                Core Governance Commitments:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-serif text-[#57534e]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8c6708] shrink-0" />
                  <span>Completely confidential 1-on-1 advisory</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8c6708] shrink-0" />
                  <span>No generic slide decks or coaching fluff</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8c6708] shrink-0" />
                  <span>Zero-latency operating substrates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8c6708] shrink-0" />
                  <span>Permanent institutional memory codification</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/intake"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b8860b] to-[#8c6708] hover:from-[#c99518] hover:to-[#9e7610] text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-sm font-serif"
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
