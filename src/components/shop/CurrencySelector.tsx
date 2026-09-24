import React from 'react';
import { CurrencyCode, SUPPORTED_CURRENCIES } from '../../lib/currency';

interface CurrencySelectorProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (newCurrency: CurrencyCode) => void;
  size?: 'sm' | 'md' | 'xs';
  variant?: 'light' | 'dark' | 'glass';
  className?: string;
  showLabel?: boolean;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currentCurrency,
  onCurrencyChange,
  size = 'sm',
  variant = 'light',
  className = '',
  showLabel = true
}) => {
  const getContainerStyle = () => {
    switch (variant) {
      case 'dark':
        return 'bg-zinc-900 border border-zinc-700/80 text-white';
      case 'glass':
        return 'bg-white/10 backdrop-blur-md border border-white/20 text-white';
      case 'light':
      default:
        return 'bg-white border border-zinc-300 text-[#111111] shadow-2xs';
    }
  };

  const getButtonPadding = () => {
    switch (size) {
      case 'xs':
        return 'px-1.5 py-0.5 text-[8px]';
      case 'md':
        return 'px-3 py-1.5 text-[10px]';
      case 'sm':
      default:
        return 'px-2 py-0.5 text-[9px]';
    }
  };

  const getActiveButtonStyle = () => {
    switch (variant) {
      case 'dark':
        return 'bg-[#b8860b] text-[#111111] font-black shadow-xs';
      case 'glass':
        return 'bg-white text-[#111111] font-black shadow-xs';
      case 'light':
      default:
        return 'bg-[#111111] text-white font-black shadow-xs';
    }
  };

  const getInactiveButtonStyle = () => {
    switch (variant) {
      case 'dark':
        return 'text-zinc-400 hover:text-white hover:bg-zinc-800/80';
      case 'glass':
        return 'text-zinc-300 hover:text-white hover:bg-white/10';
      case 'light':
      default:
        return 'text-zinc-600 hover:text-black hover:bg-zinc-100';
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 font-mono ${className}`}>
      {showLabel && (
        <span className={`text-[9px] uppercase tracking-wider font-bold ${
          variant === 'dark' || variant === 'glass' ? 'text-zinc-400' : 'text-zinc-500'
        }`}>
          Currency:
        </span>
      )}
      <div className={`flex items-center p-0.5 rounded-2xs ${getContainerStyle()}`}>
        {SUPPORTED_CURRENCIES.map((curr) => {
          const isActive = currentCurrency === curr.code;
          return (
            <button
              key={curr.code}
              type="button"
              onClick={() => onCurrencyChange(curr.code)}
              title={curr.name}
              aria-label={`Switch currency to ${curr.name}`}
              className={`rounded-2xs transition-all duration-150 cursor-pointer font-bold ${getButtonPadding()} ${
                isActive ? getActiveButtonStyle() : getInactiveButtonStyle()
              }`}
            >
              <span>{curr.code}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
