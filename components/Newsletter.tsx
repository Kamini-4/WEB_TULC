
import React, { useState } from 'react';
import { SovereignDB } from '../lib/database.ts';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await SovereignDB.saveLead({
        name: 'Newsletter Subscriber',
        email: email,
        organization: 'N/A',
        role: 'Subscriber',
        message: 'Subscribed to Institutional Dispatches'
      });

      // Notify Admin
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: email,
          organization: 'N/A',
          message: 'New Newsletter Subscription',
          type: 'NEWSLETTER_SUBSCRIPTION'
        })
      });

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error("Subscription failed:", error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#111111] p-8 sm:p-12 border border-[#b8860b]/20 relative overflow-hidden group">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#b8860b]/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-[#b8860b]/10 transition-all duration-700" />
      
      <div className="relative z-10">
        <h3 className="text-[#b8860b] text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] mb-4">Institutional Dispatches</h3>
        <h4 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-tight">
          Receive the <span className="italic text-[#b8860b]">Sovereign Intelligence</span> brief directly to your terminal.
        </h4>
        
        {status === 'success' ? (
          <div className="flex items-center gap-4 text-[#b8860b] animate-fade-in">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest">Handshake Confirmed. Welcome to the Registry.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter work email..."
              className="flex-1 bg-white/5 border border-white/10 p-4 text-white text-sm focus:outline-none focus:border-[#b8860b] transition-colors placeholder:text-white/20 italic"
            />
            <button
              disabled={status === 'loading'}
              type="submit"
              className="px-8 py-4 bg-[#b8860b] text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#d4af37] transition-all duration-300 disabled:opacity-50"
            >
              {status === 'loading' ? 'Transmitting...' : 'Subscribe'}
            </button>
          </form>
        )}
        
        <p className="mt-6 text-[9px] text-white/50 uppercase font-bold tracking-widest flex items-center gap-3">
          <span className="w-1 h-1 bg-[#b8860b] rounded-full" />
          Zero Data Retention Active
          <span className="w-1 h-1 bg-[#b8860b] rounded-full" />
          Privileged Disclosure Protocol
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
