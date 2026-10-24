import React from 'react';
import { 
  Brain, 
  Cpu, 
  Zap, 
  Shield, 
  Layers, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Target,
  DollarSign
} from 'lucide-react';

interface DomainDescriptionsProps {
  onTakeTest: () => void;
  onOpenConsultation: () => void;
}

export const FIVE_DOMAINS_DATA = [
  {
    number: '01',
    name: 'Clear Thinking & Focus',
    subtitle: 'Protecting your calendar from daily operational firefighting',
    oneSentence: 'Frees your mind from daily emergencies so you can focus on major growth moves and get back 15+ hours every single week.',
    icon: Brain,
    theProblem: 'Founders start their days with ambition, but are instantly pulled into reactive operational pings, tactical sign-offs, and resolving minor employee disputes. By 5:00 PM, zero deep strategic thinking has occurred.',
    whatWeAchieve: 'We install strict communication guardrails and asynchronous escalation filters. Routine tactical noise is resolved by middle management, leaving your calendar protected for capital allocation and market expansion.',
    keyMetrics: [
      '15–20 hours reclaimed weekly',
      'Zero impromptu operational pings during deep work',
      'Protected 4-hour morning focus blocks'
    ],
    financialImpact: 'Eliminates up to 4.5% of annual EBITDA lost to executive decision fragmentation.'
  },
  {
    number: '02',
    name: 'Execution & Delegation',
    subtitle: 'Giving teams clear authority so they execute without asking permission',
    oneSentence: 'Puts your decision rules in writing so your team executes projects correctly without asking your permission for every small step.',
    icon: Cpu,
    theProblem: 'When directives are handed down, teams hesitate. They seek endless verbal alignment meetings or deliver work that drifts off-target, forcing the founder to personally rewrite decks, redo work, or micromanage outcomes.',
    whatWeAchieve: 'We translate your unwritten founder standards into explicit boundary covenants and pre-approved spending limits ($50,000+). Direct reports know the exact decision criteria and execute with 100% of your fidelity.',
    keyMetrics: [
      '100% execution fidelity on delegated mandates',
      'Zero founder rework required on senior deliverables',
      'Clear $50k+ autonomous capital deployment limits'
    ],
    financialImpact: 'Recovers up to 5.5% of operating margin siphoned by managerial hesitation and rework.'
  },
  {
    number: '03',
    name: 'Speed to Market',
    subtitle: 'Cutting out meetings so ideas turn into results in days, not weeks',
    oneSentence: 'Cuts out endless consensus meetings so your team turns ideas into market action in 72 hours instead of 6 weeks.',
    icon: Zap,
    theProblem: 'New initiatives get bogged down in multi-layered review cycles, committee syncs, and consensus debates. By the time green lights are granted, agile competitors have already captured the market opening.',
    whatWeAchieve: 'We replace multi-week committee reviews with fast 14-day asynchronous execution loops. Clear single-threaded owners deploy talent and capital immediately without waiting for cross-departmental permission.',
    keyMetrics: [
      'Decision latency compressed from 60 days to 72 hours',
      '70% reduction in synchronous status meetings',
      'Rapid prototype-to-market deployment cycles'
    ],
    financialImpact: 'Accelerates strategic revenue generation by 3.2x while stopping consensus delay.'
  },
  {
    number: '04',
    name: 'Team Standards & Accountability',
    subtitle: 'Holding leaders accountable so low-quality work never reaches your desk',
    oneSentence: 'Creates a team culture where leaders hold each other accountable and catch poor work before it ever reaches your desk.',
    icon: Shield,
    theProblem: 'The CEO acts as the company’s chief proofreader and quality cop. If you do not catch sloppy decks or substandard customer deliverables, nobody does—because peers avoid uncomfortable confrontation.',
    whatWeAchieve: 'We engineer an autonomous peer-regulated immune system. Senior leaders review and critique each other’s work against codified institutional covenants before anything ever lands on the executive desk.',
    keyMetrics: [
      'Peer-enforced quality standards across all units',
      'Substandard work caught and resolved at the edge',
      'Radical peer transparency replacing polite corporate silence'
    ],
    financialImpact: 'Protects client retention and brand enterprise value while eliminating founder review burden.'
  },
  {
    number: '05',
    name: 'Business Independence',
    subtitle: 'Making the business grow even when you take a 2-week vacation',
    oneSentence: 'Removes single-person dependence so your company compounds faster during a 14-day absence than when you are in the room.',
    icon: Layers,
    theProblem: 'If the founder takes two weeks off completely unplugged, major client deals freeze, employee disputes stall in the inbox, and the company coasts on past momentum without steering forward.',
    whatWeAchieve: 'We decouple founder physical presence from enterprise operations. Senior leadership holds sovereign authority matrices to close enterprise contracts, allocate capital, and grow margins independently.',
    keyMetrics: [
      'Passes the 14-Day Complete Step-Away Test',
      'Enterprise compounds faster while founder is away',
      'Up to 35% higher institutional valuation multiple'
    ],
    financialImpact: 'Transforms an exhausting owner-operator job into a durable, self-governing sovereign asset.'
  }
];

export const DomainDescriptions: React.FC<DomainDescriptionsProps> = ({
  onTakeTest,
  onOpenConsultation
}) => {
  return (
    <div className="py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto space-y-10 sm:space-y-12">
      
      {/* Header Banner */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#17181c] text-[#d4af37] text-xs font-mono uppercase font-bold rounded-xs shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>The Architectural Framework</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17181c] leading-tight tracking-tight [text-wrap:balance]">
          The 5 Sovereign Domains: <br />
          <span className="text-[#9d7b38]">What Each Domain Does & What We Achieve</span>
        </h1>
        <p className="text-sm sm:text-base text-[#4e5159] leading-relaxed italic">
          Every organization lives or dies by five invisible operating circuits. When these circuits are unmapped, founders burn out and companies stall. When they are codified into architecture, enterprises compound autonomously.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={onTakeTest}
            className="px-6 py-3 bg-[#17181c] hover:bg-[#282a30] text-[#f8f6f0] text-xs font-bold uppercase rounded-sm transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Take The Free 60-Sec Audit Across All 5 Domains</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
          </button>
          <button
            onClick={onOpenConsultation}
            className="px-5 py-3 bg-white hover:bg-[#f6f2e9] text-[#17181c] border border-[#d8cebe] text-xs font-bold uppercase rounded-sm transition-colors cursor-pointer"
          >
            <span>Request Private Advisory Briefing</span>
          </button>
        </div>
      </div>

      {/* The 5 Dedicated Domain Deep-Dive Cards */}
      <div className="space-y-6 sm:space-y-8">
        {FIVE_DOMAINS_DATA.map((domain) => {
          const Icon = domain.icon;
          return (
            <div
              key={domain.number}
              id={`domain-${domain.number}`}
              className="p-6 sm:p-8 rounded-lg bg-[#ffffff] border border-[#d8cebe] shadow-sm hover:shadow-md transition-shadow space-y-6"
            >
              {/* Domain Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#f0eade] gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md bg-[#faf8f5] border border-[#d8cebe] flex items-center justify-center text-[#9d7b38] shadow-2xs shrink-0">
                    <Icon className="w-6 h-6 text-[#9d7b38]" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-[#9d7b38] font-bold">
                      Domain {domain.number}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#17181c]">
                      {domain.name}
                    </h2>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-[#78716c] font-medium italic sm:text-right">
                  {domain.subtitle}
                </div>
              </div>

              {/* One Sentence Mission Callout */}
              <div className="p-4 rounded-md bg-[#faf8f5] border-l-4 border-[#9d7b38] space-y-1">
                <div className="text-[11px] font-mono uppercase text-[#9d7b38] font-bold flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  <span>What We Are Trying to Achieve (In One Sentence):</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-[#17181c] leading-snug">
                  "{domain.oneSentence}"
                </p>
              </div>

              {/* The Reality Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                
                {/* The Unvarnished Problem */}
                <div className="p-4 rounded-md bg-[#faf6f6] border border-rose-200/80 space-y-2">
                  <div className="font-bold text-rose-900 uppercase text-xs flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-rose-600" />
                    <span>The Unvarnished Pain (Where It Hurts)</span>
                  </div>
                  <p className="text-[#555861] leading-relaxed">
                    {domain.theProblem}
                  </p>
                </div>

                {/* What We Architect & Deliver */}
                <div className="p-4 rounded-md bg-[#f4f9f5] border border-emerald-200/80 space-y-2">
                  <div className="font-bold text-emerald-900 uppercase text-xs flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>The Installed Architecture & Outcome</span>
                  </div>
                  <p className="text-[#3d5244] leading-relaxed">
                    {domain.whatWeAchieve}
                  </p>
                </div>

              </div>

              {/* Key Deliverables & Financial Impact */}
              <div className="pt-3 border-t border-[#f0eade] flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
                
                <div className="space-y-1.5">
                  <span className="font-bold uppercase text-[#17181c] font-mono text-[11px]">
                    Tangible Verified Markers:
                  </span>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[#4a4d55]">
                    {domain.keyMetrics.map((metric, idx) => (
                      <span key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38]" />
                        <span>{metric}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-3.5 py-2 rounded bg-[#faf8f5] border border-[#ebdcc0] text-[#8f6d28] font-medium shrink-0 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#9d7b38] shrink-0" />
                  <span><strong>EBITDA Yield:</strong> {domain.financialImpact}</span>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Conversion Card */}
      <div className="p-6 sm:p-8 rounded-lg bg-gradient-to-br from-[#17181c] via-[#21232b] to-[#17181c] text-white border-2 border-[#d4af37] space-y-4 shadow-xl text-center max-w-3xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Ready to See Where Your Company Leaks Margin?
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl mx-auto">
          Take the 60-second Free Audit. It measures your organization across each of these 5 domains, calculates your exact decision latency, and gives you a clear outcome report.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onTakeTest}
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#b8860b] hover:opacity-95 text-[#17181c] font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Launch Free 5-Domain Audit (60 Sec)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#2a2d36] hover:bg-[#343844] text-white font-semibold text-xs uppercase tracking-wider rounded-sm border border-[#434856] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Confidential Executive Inquiry</span>
          </button>
        </div>

        {/* Navigation Back Button */}
        <div className="pt-4 border-t border-stone-800 flex items-center justify-center">
          <button
            onClick={() => {
              window.location.hash = 'top';
            }}
            aria-label="Go back"
            title="Go back"
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer flex items-center justify-center min-w-[36px] min-h-[36px]"
          >
            <ArrowLeft className="w-5 h-5 text-[#d4af37]" />
          </button>
        </div>
      </div>

    </div>
  );
};
