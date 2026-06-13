
import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Unlock } from 'lucide-react';

const Portal: React.FC = () => {
  const [isPaid, setIsPaid] = React.useState(false);

  // Check if simulated payment succeeded in URL
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('access') === 'granted' || localStorage.getItem('tulc_portal_access') === 'true') {
      setIsPaid(true);
      if (params.get('access') === 'granted') {
        localStorage.setItem('tulc_portal_access', 'true');
      }
    }
  }, []);

  const handlePaymentClick = () => {
    // In a real app, this would use the Razorpay Checkout SDK
    window.open('https://rzp.io/rzp/8H0bV3bW', '_blank');
    
    // For demo purposes in this environment, we'll provide a way to 'simulate' success
    // after the user returns or clicks a simulate button.
  };

  if (!isPaid) {
    return (
      <div className="bg-[#111111] min-h-screen text-white pt-36 pb-24 overflow-hidden relative flex items-center justify-center">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent z-20" />
        <div className="max-w-xl mx-auto px-6 relative z-10 text-center">
          <div className="w-20 h-20 border-2 border-[#b8860b] rotate-45 mb-16 mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#b8860b] -rotate-45" />
          </div>
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.5em] mb-4">Portal Locked</h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Corporate <br /><span className="italic text-[#b8860b]">Clearance Required.</span></h1>
          <p className="text-zinc-500 mb-12 text-sm italic font-light leading-relaxed">
            The Client Portal contains proprietary alignment analysis. To unlock your unique performance dashboard and initiate your evaluation, the Enterprise Intake Fee must be processed.
          </p>
          
          <div className="space-y-6">
            <button 
              onClick={handlePaymentClick}
              className="w-full py-6 bg-[#b8860b] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-2xl"
            >
              Process Engagement Fee (Razorpay)
            </button>
            <p className="text-[9px] text-zinc-600 uppercase tracking-widest">Secure Enterprise Gateway</p>
            
            <button 
              onClick={() => {
                setIsPaid(true);
                localStorage.setItem('tulc_portal_access', 'true');
              }}
              className="text-[8px] text-zinc-700 hover:text-zinc-500 transition-colors uppercase tracking-[0.2em] mt-12 block mx-auto underline"
            >
              [ Simulation Only: Manual Unlock ]
            </button>
          </div>
          
          <div className="mt-20">
            <Link to="/" className="text-zinc-600 hover:text-white transition-colors text-[9px] uppercase tracking-widest font-bold">
              Return to Surface Hub
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] min-h-screen text-white pt-36 pb-24 overflow-hidden relative">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent z-20" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#b8860b] transition-colors text-[10px] uppercase tracking-[0.3em] font-black mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Exit Interface
        </Link>

        <header className="max-w-4xl mb-24 flex flex-col items-start gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.5em]">Terminal Active</h2>
            <div className="w-2 h-2 rounded-full bg-[#b8860b] animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-12">The <br /><span className="italic text-[#b8860b]">Client Portal.</span></h1>
          <p className="text-zinc-400 text-xl leading-relaxed italic font-light">
            Welcome back. Your client dashboard for operational alignment metrics and real-time strategic monitoring is now online.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <div className="group border-l border-white/10 pl-8 transition-all hover:border-[#b8860b]">
              <div className="flex items-center gap-3 mb-4">
                <Unlock className="w-4 h-4 text-[#b8860b]" />
                <h3 className="text-xl font-bold">Alignment Index Tracking</h3>
              </div>
              <p className="text-zinc-500 text-sm italic font-light leading-relaxed">Quantify your organizational scaling potential and operational alignment across 12 strategic dimensions.</p>
            </div>
            <div className="group border-l border-white/10 pl-8 transition-all hover:border-[#b8860b]">
              <div className="flex items-center gap-3 mb-4">
                <Unlock className="w-4 h-4 text-[#b8860b]" />
                <h3 className="text-xl font-bold">The Dispatch Archive</h3>
              </div>
              <p className="text-zinc-500 text-sm italic font-light leading-relaxed">Direct, detailed operational optimization analyses customized for your organization.</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-8 border border-[#b8860b]/30 bg-[#b8860b]/5">
              <h4 className="text-[#b8860b] text-[10px] font-black uppercase tracking-widest mb-4">Active Engagement Status</h4>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-3xl font-bold mb-1 italic">Phase 01</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Structural Stabilization</div>
                </div>
                <div className="text-right">
                  <div className="text-zinc-400 text-[10px] uppercase tracking-widest mb-1">Completion</div>
                  <div className="w-32 h-1 bg-zinc-800">
                    <div className="w-1/4 h-full bg-[#b8860b]" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 border border-white/10 bg-white/[0.02]">
              <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-6">Latest Diagnostic Dispatch</h4>
              <p className="text-zinc-400 text-sm italic leading-relaxed mb-8">
                "The current leadership alignment is trending 12% below target standards. Operational adjustment is recommended in the Organizational Design domain."
              </p>
              <button className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b8860b] border-b border-[#b8860b]/30 pb-1">Read Full Dispatch →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;
