import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight, Lock } from 'lucide-react';

interface CalibrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalibrationModal: React.FC<CalibrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    companyRevenue: '$20M - $50M ARR',
    primaryFriction: 'Founder bottleneck in everyday decisions',
    confidentialNotes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [protocolId] = useState(() => Math.floor(1000 + Math.random() * 9000));

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-zinc-950 border border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-zinc-100 max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Private Institutional Protocol
            </div>

            <h3 className="serif-heading text-2xl sm:text-3xl font-bold text-zinc-100 mb-2">
              Request an Executive Calibration Debrief
            </h3>

            <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-light">
              Limited to four enterprise partnerships per calendar quarter. All inquiries are held in strict Swiss-banking tier institutional confidentiality.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                  Full Name & Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Alexandra Vance, CEO & Co-Founder"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                  Corporate / Executive Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="alexandra@enterprise.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Enterprise Scale (ARR)
                  </label>
                  <select
                    value={formData.companyRevenue}
                    onChange={(e) => setFormData({ ...formData, companyRevenue: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option>$10M - $20M ARR</option>
                    <option>$20M - $50M ARR</option>
                    <option>$50M - $100M ARR</option>
                    <option>$100M+ ARR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Primary Friction Point
                  </label>
                  <select
                    value={formData.primaryFriction}
                    onChange={(e) => setFormData({ ...formData, primaryFriction: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option>Founder bottleneck in everyday decisions</option>
                    <option>Lack of autonomous peer accountability</option>
                    <option>Severe cognitive overload / Slack churn</option>
                    <option>Scaling beyond $50M without breaking culture</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                  Confidential Context / Single Biggest Knot (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="What is the one decision loop or operational drag currently consuming your focus?"
                  value={formData.confidentialNotes}
                  onChange={(e) => setFormData({ ...formData, confidentialNotes: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono py-1">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Protected by Non-Disclosure Covenant. Zero sales harassment.</span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/20"
                >
                  <span>Submit Calibration Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="serif-heading text-2xl font-bold text-zinc-100 mb-2">
              Calibration Protocol Initiated
            </h3>

            <p className="text-sm text-zinc-300 font-light max-w-md mx-auto mb-6 leading-relaxed">
              Thank you, <strong className="text-zinc-100">{formData.name || 'Leader'}</strong>. Your executive context has been securely transmitted. A senior partner will review your institutional profile and respond within 48 hours with our confidential debrief agenda.
            </p>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-850 text-xs font-mono text-amber-300/90 mb-6">
              Assigned Protocol ID: #TULC-CALIB-{protocolId}
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono transition-colors cursor-pointer"
            >
              Return to Platform
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
