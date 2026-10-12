import React from 'react';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Heart,
  Smile,
  Clock,
  Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
  const partnerships = [
    {
      id: 'founder_freedom',
      title: '1. The Founder Freedom Advisory Service',
      tagline: 'Stop Being the Bottleneck in Your Own Business',
      description: 'For enterprise founders running 20 to 500+ headcount teams who are exhausted from living in Slack and adjudicating every decision. We map your judgment into self-executing operational guidelines, liberating your calendar and stepping you into true sovereignty.',
      benefits: [
        'Your Decision Playbook: Clear, simple rules for hiring, pricing, and capital commitments',
        'Safe Team Guardrails: Your direct reports make $10,000 choices without asking you',
        'Meeting Detox: Reclaim 15+ hours a week from repetitive status syncs',
        'The Two-Week Step-Away Test: You take 14 days off and your business compounds'
      ],
      idealFor: 'Founders who built a high-value enterprise, but feel trapped inside its daily operations.',
      timeframe: '90 Days to Freedom'
    },
    {
      id: 'smooth_handover',
      title: '2. The Executive Transition Service',
      tagline: 'Step Back as Chairman Without Dropping Enterprise Value',
      description: 'Over half of executive leadership transitions stumble because the founder’s wisdom was never written down. We turn your tacit intuition into explicit governance law so incoming leadership operates with your exact strategic standards.',
      benefits: [
        'Clear Role Boundaries: Crystal-clear lines between Executive Chair and CEO',
        'Protected Core Values: Your standards for brand, culture, and capital stay intact',
        'Zero Valuation Discount: Buyers and boards witness a business that governs itself',
        'Genuine Sovereign Peace of Mind: Step back knowing your life work endures'
      ],
      idealFor: 'Founders preparing to elevate a CEO, hand over to successors, or prepare for institutional recapitalization.',
      timeframe: '6-Month Guided Handover'
    },
    {
      id: 'portfolio_freedom',
      title: '3. The Portfolio Governance Service',
      tagline: 'Help Portfolio CEOs Build Companies That Don’t Burn Them Out',
      description: 'For board chairs, VCs, and PE sponsors who need their CEOs to scale institutional systems rather than personal exhaustion. We install clear decision rules across portfolio companies so founders stay healthy and businesses compound.',
      benefits: [
        'Bottleneck Elimination: CEOs cease to be the operational single point of failure',
        'Early Warning Signals: Detect organizational friction weeks before revenue impact',
        'True Enterprise Sovereignty: Companies built to scale smoothly to the next round',
        'Saved Board Bandwidth: Fewer emergency firefighting calls on weekends'
      ],
      idealFor: 'Venture Capital partners, Private Equity directors, and Board Chairs.',
      timeframe: 'Annual Advisory Partnership'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#1c1917] py-16 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header - The Artisan's Covenant */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-tight text-[#b8860b] font-bold">
            <Compass className="w-4 h-4 text-[#8c6708]" />
            <span>The Artisan's Covenant</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c1917] tracking-tight">
            Executive Advisory Services: <span className="italic font-bold text-[#b8860b]">Step Back From Daily Fires</span>
          </h1>

          <p className="text-base sm:text-lg text-[#57534e] leading-relaxed">
            We don’t deliver motivational speeches or generic slide decks. We work side-by-side with you to turn your intuition into <strong className="font-bold text-[#1c1917]">unambiguous, self-executing rules</strong> your leaders run autonomously. We partner with <em className="italic font-semibold text-[#b8860b]">only three founders per quarter</em>.
          </p>
        </div>

        {/* Partnerships Grid */}
        <div className="space-y-8">
          {partnerships.map((p) => (
            <div 
              key={p.id}
              className="bg-[#ffffff] border border-[#ded6c5] hover:border-[#b8860b] transition-all rounded-xs p-6 sm:p-10 shadow-xs space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#e2dcce] gap-2">
                <div>
                  <span className="text-xs text-[#b8860b] uppercase tracking-wider font-bold">{p.timeframe}</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
                    {p.title}
                  </h2>
                </div>
                <div className="text-xs text-[#57534e] bg-[#efebe2] px-3.5 py-1.5 rounded-xs self-start md:self-auto border border-[#ded6c5] font-medium">
                  {p.tagline}
                </div>
              </div>

              <p className="text-base text-[#57534e] leading-relaxed">
                {p.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <h3 className="text-xs uppercase font-bold text-[#1c1917] tracking-wider">
                    What You Gain
                  </h3>
                  <ul className="space-y-2.5">
                    {p.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#57534e]">
                        <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#faf8f5] p-5 rounded-xs border border-[#ded6c5] space-y-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs uppercase font-bold text-[#b8860b] tracking-wider mb-1">
                      Who This Is For
                    </h3>
                    <p className="text-xs text-[#57534e] leading-relaxed">
                      {p.idealFor}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#ded6c5]">
                    <Link
                      to="/intake"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#b8860b] hover:text-[#1c1917] transition-colors"
                    >
                      <span>Inquire About Working Together</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* This Is Not For Everyone */}
        <div className="bg-gradient-to-br from-[#ffffff] via-[#faf8f5] to-[#efebe2] border border-[#b8860b]/40 rounded-xs p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-tight text-[#b8860b]">
              An Honest Sovereign Boundary
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1c1917]">
              This Is <span className="italic font-bold text-[#b8860b]">Not For Everyone</span>
            </h2>
            <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
              If you are looking for quick motivational advice or pre-packaged slide decks, we are not the right fit. But if you are ready to do the deep, rewarding work of building an enterprise that runs without your daily sweat, we have room for <strong className="font-bold text-[#b8860b]">three sovereign partners</strong> this quarter.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/intake"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-black hover:bg-[#b8860b] text-white font-bold text-xs uppercase tracking-tight rounded-xs transition-colors shadow-sm"
            >
              <span>Initiate Advisory Dialogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/assessment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#ffffff] hover:bg-[#efebe2] text-[#1c1917] font-semibold text-xs uppercase tracking-tight rounded-xs border border-[#ded6c5] transition-colors"
            >
              <span>Take The Two-Week Test</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServicesPage;
