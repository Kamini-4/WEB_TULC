import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  subMessage?: string;
  variant?: 'inline' | 'card' | 'fullscreen';
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Retrieving institutional telemetry...',
  subMessage = 'Connecting to high-fidelity data substrate',
  variant = 'card'
}) => {
  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 py-2">
        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#b8860b]" />
        <span>{message}</span>
      </div>
    );
  }

  if (variant === 'fullscreen') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-xs p-6 text-center">
        <div className="w-12 h-12 rounded-full border-2 border-zinc-200 border-t-[#b8860b] animate-spin mb-4" />
        <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 font-mono mb-1">{message}</h4>
        <p className="text-xs text-zinc-500 font-serif italic max-w-sm">{subMessage}</p>
      </div>
    );
  }

  return (
    <div className="w-full p-8 sm:p-12 bg-white border border-zinc-200 rounded-xs flex flex-col items-center justify-center text-center my-4 animate-pulse">
      <div className="w-9 h-9 rounded-full bg-zinc-100 border border-[#b8860b]/30 flex items-center justify-center mb-3">
        <Loader2 className="w-4 h-4 animate-spin text-[#b8860b]" />
      </div>
      <div className="text-xs font-mono uppercase font-bold text-zinc-800 tracking-wider mb-1">
        {message}
      </div>
      <div className="text-[10px] text-zinc-500 font-serif italic">
        {subMessage}
      </div>
    </div>
  );
};
