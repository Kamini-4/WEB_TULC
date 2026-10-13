import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck, AlertCircle, Sparkles, CheckCircle2, Clock, Building2 } from 'lucide-react';
import { SovereignDB } from '../../lib/database';

const TARGET_APP_URL = "https://sovereign-audit-the-institutional-stress-test-942902734370.us-west1.run.app";

const Portal: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [passkey, setPasskey] = useState<string>(() => (searchParams.get('key') || searchParams.get('passkey') || '').toUpperCase());
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [clearanceData, setClearanceData] = useState<{
    organization?: string;
    tier?: string;
    expiresAt?: number;
    targetUrl?: string;
  } | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);

  const handleVerify = useCallback(async (keyToVerify?: string) => {
    const activeKey = (keyToVerify || passkey).trim().toUpperCase();
    if (!activeKey) {
      setError('Please enter your institutional access key.');
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const result = await SovereignDB.verifyPortalKey(activeKey);
      
      if (result.valid) {
        setClearanceData({
          organization: result.organization,
          tier: result.tier,
          expiresAt: result.expiresAt,
          targetUrl: result.targetUrl || TARGET_APP_URL
        });
        setRedirectCountdown(3);
      } else {
        setError(result.error || 'Invalid or unrecognized access key.');
      }
    } catch (err: any) {
      console.error("Verification exception:", err);
      setError(err.message || 'Access verification failed. Please check network connectivity.');
    } finally {
      setIsVerifying(false);
    }
  }, [passkey]);

  // Auto-verify if passkey is present in the URL query parameters
  useEffect(() => {
    const urlKey = (searchParams.get('key') || searchParams.get('passkey'))?.toUpperCase();
    if (urlKey) {
      const timer = setTimeout(() => {
        void handleVerify(urlKey);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [searchParams, handleVerify]);

  // Handle countdown and same-window redirection
  useEffect(() => {
    if (redirectCountdown === null) return;

    if (redirectCountdown === 0) {
      const destination = clearanceData?.targetUrl || TARGET_APP_URL;
      console.log(`[PORTAL REDIRECT] Clearance verified. Redirecting in same window to: ${destination}`);
      window.location.href = destination;
      return;
    }

    const timer = setTimeout(() => {
      setRedirectCountdown(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [redirectCountdown, clearanceData]);

  const executeImmediateRedirect = () => {
    const destination = clearanceData?.targetUrl || TARGET_APP_URL;
    window.location.href = destination;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="bg-[#111111] min-h-screen text-white pt-16 md:pt-24 pb-24 relative flex items-center justify-center w-full px-4 sm:px-6"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#b8860b]/10 via-black to-[#111111] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#b8860b]/40 to-transparent" />

      <div className="max-w-xl w-full mx-auto relative z-10">
        
        {/* Top Institutional Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/10 mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b]" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#b8860b] uppercase">
              Sovereign Clearance Gate
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Institutional <span className="italic text-[#b8860b]">Portal.</span>
          </h1>

          <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed max-w-md mx-auto">
            Authorized multi-user access terminal for the Sovereign Audit and Institutional Stress-Testing Suite.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#18181b]/80 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#b8860b]/10 blur-2xl pointer-events-none" />

          <AnimatePresence mode="wait">
            {!clearanceData ? (
              // KEY ENTRY FORM
              <motion.div
                key="entry-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <label 
                    htmlFor="passkey-input"
                    className="block text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2.5"
                  >
                    Enter Master Passkey
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                      <Lock className="w-4 h-4 text-[#b8860b]" />
                    </div>
                    <input
                      id="passkey-input"
                      type="text"
                      value={passkey}
                      onChange={(e) => {
                        setPasskey(e.target.value.toUpperCase());
                        if (error) setError(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleVerify();
                      }}
                      placeholder="e.g. TULC-BETA-7821-X9K"
                      className="w-full bg-[#111111] border border-white/15 text-white font-mono text-base tracking-widest pl-12 pr-4 py-4 focus:outline-none focus:border-[#b8860b] transition-colors placeholder:text-zinc-600 uppercase"
                      disabled={isVerifying}
                      autoFocus
                    />
                  </div>

                  <p className="mt-2 text-[11px] text-zinc-500 font-light flex items-center gap-1.5">
                    <span>* Multi-user clearance valid for all authorized members of your organization.</span>
                  </p>
                </div>

                {/* Error Banner */}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-start gap-3"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <p className="font-semibold text-red-300">Clearance Verification Failed</p>
                      <p className="mt-0.5 text-zinc-300">{error}</p>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  id="authorize-access-btn"
                  onClick={() => handleVerify()}
                  disabled={isVerifying || !passkey.trim()}
                  className={`w-full py-4 text-[11px] font-mono tracking-[0.2em] uppercase font-bold transition-all flex items-center justify-center gap-3 ${
                    isVerifying || !passkey.trim()
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-[#b8860b] text-black hover:bg-white hover:text-black shadow-lg shadow-[#b8860b]/20 cursor-pointer'
                  }`}
                >
                  {isVerifying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Validating Institutional Substrate...</span>
                    </>
                  ) : (
                    <>
                      <span>Authorize & Enter Stress Test</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Request Key Info */}
                <div className="pt-4 border-t border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
                  <span>Awaiting credentials?</span>
                  <Link 
                    to="/intake" 
                    className="text-[#b8860b] hover:text-white transition-colors underline font-medium"
                  >
                    Request Beta Access Key →
                  </Link>
                </div>
              </motion.div>
            ) : (
              // CLEARANCE GRANTED VIEW
              <motion.div
                key="clearance-granted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4 space-y-6"
              >
                <div className="w-16 h-16 bg-[#b8860b]/10 border border-[#b8860b] rounded-full flex items-center justify-center mx-auto text-[#b8860b] animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#b8860b]/20 text-[#b8860b] text-[10px] font-mono uppercase tracking-widest font-bold mb-3 border border-[#b8860b]/40">
                    <Sparkles className="w-3 h-3" />
                    Institutional Clearance Verified
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {clearanceData.organization}
                  </h3>
                  <p className="text-zinc-400 text-xs">
                    Master multi-user access unlocked. Launching sovereign diagnostic substrate.
                  </p>
                </div>

                {/* Details Box */}
                <div className="bg-black/50 border border-white/10 p-4 text-left font-mono text-xs space-y-2">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-[#b8860b]" /> Institution:</span>
                    <span className="text-white font-bold">{clearanceData.organization}</span>
                  </div>
                  {clearanceData.expiresAt && (
                    <div className="flex justify-between items-center text-zinc-400">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#b8860b]" /> Access Valid Until:</span>
                      <span className="text-[#b8860b]">
                        {new Date(clearanceData.expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  )}
                </div>

                {/* Redirection indicator */}
                <div className="pt-2">
                  <p className="text-xs text-zinc-400 mb-3 font-mono">
                    Redirecting in <span className="text-[#b8860b] font-bold text-sm">{redirectCountdown}s</span>...
                  </p>
                  
                  <button
                    id="immediate-redirect-btn"
                    onClick={executeImmediateRedirect}
                    className="w-full py-3.5 bg-[#b8860b] text-black font-mono font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Launch Stress Test Immediately</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Footer Navigation */}
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="text-zinc-500 hover:text-zinc-300 text-xs font-mono tracking-wider transition-colors inline-flex items-center gap-2"
          >
            ← Return to Surface Hub
          </Link>
        </div>

      </div>
    </motion.div>
  );
};

export default Portal;
