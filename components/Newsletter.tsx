
import React, { useState } from 'react';
import { SovereignDB } from '../lib/database.ts';
import { GooglePreferredSource } from './GooglePreferredSource.tsx';
import { Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already_subscribed' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || status === 'loading') return;

    const trimmedEmail = email.trim().toLowerCase();

    // 1. Client-side duplicate check
    const alreadyRegistered = await SovereignDB.checkExistingSubscription(trimmedEmail);
    if (alreadyRegistered) {
      setStatus('already_subscribed');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    
    try {
      // 2. Server deduplicated dispatch with timeout protection
      const result = await SovereignDB.subscribeNewsletter(trimmedEmail);

      if (result.alreadySubscribed) {
        setStatus('already_subscribed');
      } else {
        setStatus('success');
        setEmail('');
      }
    } catch (error: any) {
      console.error("Subscription failed:", error);
      setStatus('error');
      setErrorMessage(error.message || 'Strategic gateway timed out. Please retry.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="bg-[#111111] p-8 sm:p-12 border border-[#b8860b]/20 relative overflow-hidden group">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#b8860b]/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-[#b8860b]/10 transition-all duration-700" />
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h3 className="text-[#b8860b] text-[8px] sm:text-[10px] font-black uppercase tracking-wider font-mono">The Newsletter & Intelligence Feed</h3>
          <GooglePreferredSource variant="compact" />
        </div>
        <h4 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-tight">
          Receive the <span className="italic text-[#b8860b]">Strategic Alignment Newsletter</span> directly to your inbox.
        </h4>
        
        {status === 'success' ? (
          <div className="flex items-center gap-3 p-4 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-2xs text-[#d4af37]">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider font-mono block">Handshake Confirmed</span>
              <span className="text-xs text-white/80 font-serif italic">Your address has been registered to the sovereign intelligence dispatch.</span>
            </div>
          </div>
        ) : status === 'already_subscribed' ? (
          <div className="flex items-center justify-between gap-3 p-4 bg-zinc-900 border border-zinc-700 rounded-2xs text-zinc-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#b8860b] shrink-0" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider font-mono text-white block">Active Registry Confirmed</span>
                <span className="text-xs text-zinc-400 font-serif italic">This executive address is already subscribed. Zero duplicate records created.</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-[10px] font-mono uppercase text-zinc-300 rounded-2xs transition-colors"
            >
              Add Another
            </button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                required
                type="email"
                disabled={status === 'loading'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter executive work email..."
                className="flex-1 bg-white/5 border border-white/10 p-4 text-white text-sm focus:outline-none focus:border-[#b8860b] transition-colors placeholder:text-white/20 italic disabled:opacity-50"
              />
              <button
                disabled={status === 'loading'}
                type="submit"
                className="px-8 py-4 bg-[#b8860b] text-white text-[10px] font-black uppercase hover:bg-[#d4af37] transition-all duration-300 disabled:opacity-50 inline-flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </form>

            {status === 'error' && (
              <div className="mt-3 flex items-center justify-between gap-2 p-3 bg-red-950/40 border border-red-800/40 rounded-2xs text-red-200 text-xs">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-red-300 hover:text-white underline cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Retry
                </button>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-[9px] text-white/50 uppercase font-bold">
          <div className="flex items-center gap-3">
            <span className="w-1 h-1 bg-[#b8860b] rounded-full" />
            Zero Data Retention Active
            <span className="w-1 h-1 bg-[#b8860b] rounded-full" />
            Privileged Disclosure Protocol
            <span className="w-1 h-1 bg-[#b8860b] rounded-full" />
            Deduplication Verified
          </div>
          <span className="text-zinc-500 font-mono text-[8px]">
            Google Search Source Integration Active
          </span>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
export { Newsletter };
