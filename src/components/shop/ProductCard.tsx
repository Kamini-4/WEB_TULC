import React from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  FileCode, 
  GitPullRequest, 
  UserCheck, 
  Activity,
  Layers,
  Flame,
  Target
} from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';

interface ProductCardProps {
  product: ShopProduct;
  onInspect: (product: ShopProduct) => void;
  onAcquire: (product: ShopProduct) => void;
  currencySymbol: string;
  currencyPrice: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onInspect,
  onAcquire,
  currencySymbol,
  currencyPrice
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCode':
        return <FileCode className="w-4 h-4 text-[#b8860b]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-[#6a8caa]" />;
      case 'GitPullRequest':
        return <GitPullRequest className="w-4 h-4 text-[#3f5f58]" />;
      case 'UserCheck':
        return <UserCheck className="w-4 h-4 text-[#b8860b]" />;
      case 'Activity':
        return <Activity className="w-4 h-4 text-[#6a8caa]" />;
      default:
        return <Layers className="w-4 h-4 text-[#b8860b]" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-zinc-200/90 hover:border-[#b8860b] transition-all duration-300 rounded-xs shadow-xs hover:shadow-lg flex flex-col justify-between overflow-hidden group"
    >
      {/* Early Bird Top Banner */}
      <div className="bg-[#111111] text-white px-4 py-1.5 flex items-center justify-between text-[8px] font-mono uppercase tracking-wider border-b border-[#b8860b]/30">
        <span className="flex items-center gap-1.5 font-black text-[#b8860b]">
          <Flame className="w-3 h-3 text-red-500 animate-pulse" />
          {product.earlyBird.badge}
        </span>
        <span className="text-zinc-300 font-bold bg-white/10 px-1.5 py-0.5 rounded-2xs">
          Only {product.earlyBird.seatsRemaining} Allocations Left
        </span>
      </div>

      {/* Card Header */}
      <div className="p-6 sm:p-7 border-b border-zinc-100 relative">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] font-black uppercase text-[#111111] px-2 py-0.5 bg-zinc-100 border border-zinc-200">
              ASSET {product.assetNumber}
            </span>
            <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-500">
              {product.category}
            </span>
          </div>

          <span className="text-[8px] font-mono uppercase font-black px-2 py-0.5 bg-[#b8860b]/10 text-[#b8860b] border border-[#b8860b]/20 rounded-2xs">
            {product.installTime}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-[#111111] group-hover:text-[#b8860b] transition-colors leading-snug">
          {product.title}
        </h3>

        <p className="text-xs text-zinc-600 font-light mt-1.5 leading-relaxed">
          {product.tagline}
        </p>

        {/* Format & Velocity metadata */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-zinc-100 text-[9px] font-mono text-zinc-500">
          <div className="flex items-center gap-1">
            {getIcon(product.formatIcon)}
            <span className="truncate max-w-[170px]">{product.format}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>Result: {product.timeToResult}</span>
          </div>
        </div>
      </div>

      {/* Harsh Truth Reality Check */}
      <div className="p-5 bg-red-50/40 border-b border-red-100/80 space-y-1.5">
        <div className="flex items-center gap-1.5 text-red-700 text-[8px] font-mono uppercase font-black">
          <Zap className="w-3 h-3" /> THE BRUTAL REALITY
        </div>
        <p className="text-xs text-zinc-800 font-light leading-relaxed">
          {product.harshTruth.brutalReality}
        </p>
      </div>

      {/* The Delivered Outcome */}
      <div className="p-5 bg-[#b8860b]/5 border-b border-zinc-100 space-y-1.5">
        <div className="flex items-center gap-1.5 text-[#b8860b] text-[8px] font-mono uppercase font-black">
          <Target className="w-3 h-3" /> THE DELIVERED OUTCOME
        </div>
        <p className="text-xs text-[#111111] font-medium leading-relaxed">
          {product.theOutcome.tangibleResult}
        </p>
        <p className="text-[10px] text-zinc-500 font-light">
          {product.theOutcome.immediateImpact}
        </p>
      </div>

      {/* Modules List Snapshot */}
      <div className="p-6 space-y-2.5 flex-1">
        <div className="text-[8px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
          System Modules (5 Total)
        </div>
        <ul className="space-y-1.5">
          {product.theOutcome.modules.slice(0, 3).map((mod) => (
            <li key={mod.number} className="flex items-start gap-2 text-xs text-zinc-700">
              <span className="font-mono text-[9px] text-[#b8860b] font-bold shrink-0 mt-0.5">
                •
              </span>
              <span className="text-[11px] font-medium leading-snug">
                {mod.title}
              </span>
            </li>
          ))}
          <li className="text-[9px] font-mono text-zinc-400 pl-3 italic">
            + 2 tactical operating protocols & templates
          </li>
        </ul>
        <div className="mt-4 pt-3 border-t border-zinc-100 text-[10px] text-zinc-600 bg-white p-2.5 rounded-2xs border border-zinc-200/60">
          <span className="font-bold text-[#111111]">{product.socialProof.metric}:</span>{' '}
          <span className="italic text-zinc-600">"{product.socialProof.quote}"</span>
        </div>
      </div>

      {/* Pricing & Dual CTA Footer with Early Bird Guarantee */}
      <div className="p-6 bg-zinc-50/90 border-t border-zinc-200/80 space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-mono text-[#111111]">
                {currencySymbol}{currencyPrice.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-zinc-400 line-through">
                {currencySymbol}{Math.round(product.pricing.originalUsd * (currencyPrice / product.pricing.usd)).toLocaleString()}
              </span>
              <span className="text-[9px] font-mono font-bold text-red-600">
                Save {product.earlyBird.discountPercent}% Lead Gen Rate
              </span>
            </div>
            <div className="text-[8px] font-mono text-[#b8860b] uppercase font-bold">
              Includes {product.earlyBird.bonusTitle}
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 border border-green-200 text-[8px] font-mono uppercase font-bold">
              30-Day Commitment
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onInspect(product)}
            className="w-full py-2.5 px-3 bg-white border border-zinc-300 hover:border-[#111111] text-[#111111] text-[9px] font-mono uppercase font-bold tracking-wider transition-colors rounded-2xs cursor-pointer text-center"
          >
            Inspect System
          </button>
          <button
            onClick={() => onAcquire(product)}
            className="w-full py-2.5 px-3 bg-[#111111] hover:bg-[#b8860b] text-white text-[9px] font-mono uppercase font-black tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 rounded-2xs cursor-pointer shadow-sm"
          >
            <span>Lock Early Bird</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
