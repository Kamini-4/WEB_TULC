import React from 'react';
import { LucideIcon, Inbox, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`p-8 sm:p-12 text-center bg-white border border-dashed border-zinc-300 rounded-xs flex flex-col items-center justify-center ${className}`}>
      <div className="w-11 h-11 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-3.5 text-zinc-400">
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="text-xs sm:text-sm font-bold uppercase font-mono tracking-wider text-zinc-800 mb-1">
        {title}
      </h4>
      <p className="text-xs text-zinc-500 font-serif italic max-w-md mx-auto mb-4 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111111] hover:bg-[#b8860b] text-white text-[10px] font-mono uppercase font-bold tracking-wider rounded-2xs transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
