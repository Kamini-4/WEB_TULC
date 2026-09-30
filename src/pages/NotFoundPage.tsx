import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Compass, ShieldAlert } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404: Strategic Signal Not Found | The Unbounded Leadership Co.";
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex, nofollow');
    }
    return () => {
      if (metaRobots) {
        metaRobots.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      }
    };
  }, []);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 py-16 bg-[#111111] text-[#f5f5f0]">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b8860b]/10 border border-[#b8860b]/30 text-[#b8860b] text-[10px] font-mono uppercase tracking-widest">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Error Code 404 • Institutional Deviation</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight leading-tight">
          Strategic Signal <span className="italic text-[#b8860b] font-light">Not Found.</span>
        </h1>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto font-light">
          The requested coordinate does not resolve within our leadership architecture graph. The record may have been relocated, archived, or decommissioned.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#b8860b] hover:bg-white text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Command</span>
          </button>
          <Link
            to="/services"
            className="w-full sm:w-auto px-6 py-3.5 border border-zinc-700 hover:border-[#b8860b] text-white hover:text-[#b8860b] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>View Services</span>
          </Link>
          <Link
            to="/assessment"
            className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>Run Diagnostic</span>
          </Link>
        </div>

        <div className="pt-8 border-t border-white/5 text-[10px] font-mono text-zinc-500 uppercase">
          Inquiries: <a href="mailto:suchita@theunboundedleadership.com" className="text-[#b8860b] hover:underline">suchita@theunboundedleadership.com</a> | <a href="tel:+18005550199" className="text-[#b8860b] hover:underline">+1 (800) 555-0199</a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
