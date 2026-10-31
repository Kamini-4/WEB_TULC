import React, { useState, useRef } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Compass, 
  Mail, 
  Share2,
  BookOpen,
  CheckCircle2,
  Camera,
  Maximize2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InternalLinksMatrix } from '../components/InternalLinksMatrix';
import { useFounderPhoto } from '../utils/founderPhoto';

export const About: React.FC = () => {
  const { photoUrl, hasCustomPhoto, savePhoto } = useFounderPhoto('/assets/suchita-portrait.svg');
  const [imageFit, setImageFit] = useState<'cover' | 'contain'>('cover');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const res = ev.target?.result as string;
        if (res) savePhoto(res);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-[#f4ecd8] font-serif">
      <SEOHead
        title="Suchita Sancheti & Leadership Philosophy | The Unbounded Leadership Co."
        description="Computer Science Engineer and Industrial Psychologist synthesizing cybernetic systems design and executive leadership governance for enterprise scale."
        canonicalPath="/about"
        type="profile"
        keywords="Suchita Sancheti, enterprise architect, cybernetic design, founder decoupling, executive governance, leadership operating systems"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About the Founders', path: '/about' }
        ]}
      />
      <Breadcrumbs items={[{ name: 'About Suchita Sancheti & Firm', path: '/about' }]} />

      <div className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#12131c] border border-[#d4af37] rounded-xs text-xs uppercase tracking-wider text-[#d4af37] font-bold font-mono shadow-md">
            <UserCheck className="w-4 h-4 text-[#d4af37]" />
            <span>Founder & Enterprise Architect</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f3e5ab] tracking-tight font-serif">
            Suchita Sancheti
          </h1>

          <p className="text-base sm:text-lg text-[#ded8cb] font-serif leading-relaxed">
            Architecting institutional governance systems, sovereign substrates, and founder decoupling frameworks for high-stakes enterprise leadership.
          </p>
        </div>

        {/* Profile Biography Card — Black Background & Golden Text */}
        <div className="bg-[#0c0d14] border-2 border-[#d4af37] rounded-md p-6 sm:p-8 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start font-serif">
          
          {/* Avatar / Portrait Column — 3:4 Proportional Frame with Fit Toggle */}
          <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange} 
            />
            
            <div className="w-full max-w-[270px] aspect-[3/4] min-h-[350px] rounded-xs bg-[#050608] border-2 border-[#d4af37] flex flex-col items-center justify-center text-[#d4af37] shadow-xl relative overflow-hidden group">
              <img 
                src={photoUrl} 
                alt="Suchita Sancheti" 
                className={`w-full h-full transition-all duration-500 ${
                  imageFit === 'contain' 
                    ? 'object-contain p-1 bg-[#050608]' 
                    : 'object-cover object-[center_15%] group-hover:scale-[1.02]'
                }`}
              />

              {/* Ambient Vignette */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050608]/90 via-transparent to-transparent"></div>

              {/* Action Buttons: Fit & Upload */}
              <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity z-10">
                <button
                  type="button"
                  onClick={() => setImageFit(imageFit === 'cover' ? 'contain' : 'cover')}
                  className="px-2 py-1 bg-[#08090e]/95 text-[#d4af37] border border-[#d4af37]/70 rounded-xs text-[9px] font-mono flex items-center gap-1 shadow-md hover:bg-[#141520] transition-colors cursor-pointer"
                  title="Toggle fit mode"
                >
                  <Maximize2 className="w-2.5 h-2.5 text-[#d4af37]" />
                  <span>{imageFit === 'cover' ? 'Fit All' : 'Fill'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2 py-1 bg-gradient-to-r from-[#d4af37] to-[#e6ca65] text-[#0a0b0f] font-bold rounded-xs text-[9.5px] font-mono flex items-center gap-1 shadow-md hover:brightness-110 transition-all cursor-pointer"
                  title="Upload authentic WhatsApp photo"
                >
                  <Camera className="w-3 h-3 text-[#0a0b0f]" />
                  <span>{hasCustomPhoto ? 'Update' : 'Upload'}</span>
                </button>
              </div>

              {/* Lower Badge */}
              <div className="absolute bottom-2 left-2 right-2 bg-[#090a0f]/95 px-2.5 py-1 rounded-xs border border-[#d4af37]/60 text-left pointer-events-none shadow-md">
                <div className="text-[10.5px] font-mono font-bold text-[#f3e5ab] uppercase tracking-wider">Suchita Sancheti</div>
                <div className="text-[8.5px] font-mono text-[#d4af37] uppercase tracking-widest">Enterprise Architect</div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-base font-bold text-[#f3e5ab]">Suchita Sancheti</div>
              <div className="text-xs text-[#d4af37] font-mono font-bold uppercase tracking-wider">Founder & Enterprise Architect</div>
              <div className="text-[11px] text-[#ded8cb]">The Unbounded Leadership Co.</div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="mailto:suchita@theunboundedleadership.com"
                className="p-2 bg-[#12131c] hover:bg-[#1b1d2a] text-[#f3e5ab] hover:text-[#d4af37] border border-[#d4af37]/60 rounded-xs transition-colors"
                title="Email Suchita Sancheti"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/suchita-sancheti"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#12131c] hover:bg-[#1b1d2a] text-[#f3e5ab] hover:text-[#d4af37] border border-[#d4af37]/60 rounded-xs transition-colors"
                title="LinkedIn Profile"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Biography Text Column — Black Background & Golden Text */}
          <div className="md:col-span-8 space-y-6 text-[#ded8cb] font-serif text-base sm:text-lg leading-[1.85]">
            <h2 className="text-2xl font-bold font-serif text-[#f3e5ab] pb-3 border-b border-[#d4af37]/40">
              The Sovereign Philosophy
            </h2>

            <p>
              Leadership advice for decades has suffered from a critical misconception: that scaling a company requires the founder to work longer hours, attend more meetings, or develop superhuman charisma.
            </p>

            <p>
              At <strong className="text-[#f3e5ab] font-serif">The Unbounded Leadership Co. (TULC)</strong>, Suchita Sancheti works directly with CXOs, boards of directors, and venture partners to introduce an engineering perspective to corporate governance. When an enterprise moves slowly, burns executive bandwidth, or stumbles during leadership succession, the solution is never to blame individuals—it is to fix the underlying decision architecture.
            </p>

            <blockquote className="my-6 pl-5 py-3.5 border-l-4 border-[#d4af37] bg-[#12131c] italic text-[#f3e5ab] text-lg rounded-r-xs shadow-md font-serif">
              "Your ultimate legacy as a founder is not being indispensable to every daily decision; it is engineering a company so clear and resilient that your wisdom governs seamlessly long after you transition."
            </blockquote>

            <p>
              Suchita has advised high-growth tech founders, mid-market enterprises, and investment partners on codifying executive heuristics, eliminating multi-million-dollar coordination drag, and executing frictionless succession transitions.
            </p>

            <div className="pt-4 border-t border-[#d4af37]/30 space-y-3">
              <h3 className="text-xs uppercase font-bold text-[#d4af37] tracking-wider font-mono">
                Core Governance Commitments:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-serif text-[#ded8cb]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span className="text-[#f3e5ab] font-medium">Completely confidential 1-on-1 advisory</span>
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4af37] via-[#f5e6b3] to-[#d4af37] hover:brightness-110 text-[#0c0d12] font-black text-xs uppercase tracking-wider rounded-xs transition-all shadow-lg font-mono"
              >
                <span>Initiate Mandate Calibration Dialogue</span>
                <ArrowRight className="w-4 h-4 text-[#0c0d12]" />
              </Link>
            </div>
          </div>

        </div>

        {/* Internal Hub Links */}
        <InternalLinksMatrix />

        </div>
      </div>
    </div>
  );
};
