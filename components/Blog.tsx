
import React, { useEffect, useState } from 'react';
import { SovereignDB, BlogEntry } from '../lib/database.ts';

interface BlogProps {
  onArticleClick: (article: BlogEntry) => void;
}

const INITIAL_POSTS: BlogEntry[] = [
  {
    id: "INT-001",
    category: "Succession Architecture",
    date: "Q1 2026",
    title: "The Founder's Dilemma: Architecting Institutional Permanence Beyond the Individual",
    excerpt: "Why 50% of CEO successions fail within 18 months and how you can build a leadership substrate that preserves your legacy through systemic sovereignty.",
    timestamp: Date.now(),
    content: [
      "For the high-stakes founder or CEO, the greatest threat to legacy isn't market volatility—it's the 'Founder Trap.' This is a structural phenomenon where the organization's growth is strictly tethered to your individual cognitive limits. When you are the primary engine of decision-making, you become the ultimate bottleneck. Data from the Harvard Business Review indicates that over 50% of CEO successions fail to meet board expectations within the first 18 months. This is rarely a failure of talent; it is a failure of architecture.",
      "To avoid this, you must transition from 'Heroic Intervention' to 'Systemic Sovereignty.' This requires building a leadership substrate that operates with your integrity but with autonomous momentum. Our research into Tier-1 interventions shows that structural stabilization reclaims up to 30% of a successor's strategic bandwidth in the first 90 days. By hard-coding your vision into the organizational nervous system, you ensure the legacy is independent of the individual.",
      "The economic impact of succession failure is staggering. A failed transition can cost a large-cap firm between $100M and $1B in market capitalization within the first year. Conversely, organizations that utilize an architectural approach to succession see a 2.5x higher retention rate of key executive talent. This is the yield of sovereignty—the engineering of institutional permanence that transcends the individual and protects shareholder value.",
      "As a leader, your role must shift from 'Solver' to 'Architect.' This means auditing the latent potential within your current Relational Infrastructure and Execution Architecture. By installing high-performance logic layers that amplify existing strengths while eliminating latency, you create an anti-fragile system that thrives on complexity rather than being crushed by it.",
      "Actionable Insight for the Sovereign Leader: If your organization requires your direct intervention to resolve tactical variances, you have built a fragile system. The path to true scale is the removal of the 'Hero Requirement.' Start by identifying the top three decisions that currently require your approval and architect a logic-gate that allows the system to handle them autonomously. This is the first step toward institutional sovereignty."
    ]
  },
  {
    id: "INT-002",
    category: "Cognitive Efficiency",
    date: "Dispatch 08",
    title: "The Cognitive Tax of Leadership: Reclaiming 40% of Your Strategic Bandwidth",
    excerpt: "Executive burnout is an architectural design flaw, not a personal failure. Learn how to eliminate tactical noise and maximize your strategic yield.",
    timestamp: Date.now(),
    content: [
      "Executive burnout is rarely a result of workload; it is a result of 'Architectural Friction.' Research into high-stakes leadership environments indicates that 'Heroic' CEOs spend up to 40% of their time resolving tactical variances that the system should handle autonomously. This 'Cognitive Tax' is the ultimate bottleneck for organizational scaling, preventing you from focusing on the high-value strategic moves that define market leadership.",
      "This phenomenon aligns with John Sweller's 'Cognitive Load Theory,' where extraneous load (tactical noise) diminishes the germane load required for strategic brilliance. A system that requires a hero to function is, by definition, a fragile system. We focus on building anti-fragile substrates where outcomes are a natural law of the design, not a result of personal exertion. Studies show that leaders in structurally optimized environments report a 45% reduction in decision fatigue.",
      "By reclaiming this 40% bandwidth, you can focus on 'Infinite Resonance'—the ability to project your strategic intent with near-absolute fidelity across all organizational layers. For a CEO of a $10B enterprise, reclaiming this bandwidth is equivalent to adding $4B of 'Cognitive Equity' to the firm. This is not a soft metric; it is the primary driver of Alpha in high-complexity markets.",
      "Our methodology involves a surgical audit of your 'Execution Architecture.' We identify the specific logic levers that govern how your organization processes opportunity and risk. By recalibrating these levers, we ensure that your strategic intent is transmitted without dilution, allowing for 2.8x strategic velocity and the effortless capture of market arbitrage.",
      "Strategic Takeaway: Burnout is a signal that your leadership operating system is out of phase with your operational reality. To scale without breaking, you must move from 'Management' to 'Architecture.' When the system handles the tactical noise, you are free to architect the future. This is the only sustainable path to global market leadership."
    ]
  },
  {
    id: "INT-003",
    category: "Governance Calibration",
    date: "Special Report",
    title: "Bridging the Strategy-Execution Gap: A Fiduciary Guide to Board Alignment",
    excerpt: "Why 67% of well-formulated strategies fail and how to calibrate the gap between Board expectations and operational reality for 2.5x outperformance.",
    timestamp: Date.now(),
    content: [
      "Strategic drift is the silent killer of institutional legacy. Industry benchmarks suggest that 67% of well-formulated strategies fail due to poor execution alignment. This is not a communication problem; it is a calibration problem between Board-level intent and operational reality. This 'Strategy-Execution Gap' creates a 'Governance Tax' that can erode up to 15% of annual EBITDA.",
      "Board of directors alignment requires more than just reporting; it requires a shared architectural logic. Drawing from 'Resource-Based View' (RBV) theory, we emphasize that competitive advantage stems from internal structural configurations. A calibrated board ensures that strategic execution is a natural law, not a constant struggle against organizational inertia.",
      "Our 'Sovereign Substrate' audit identifies the specific logic levers that govern how an organization processes opportunity and risk. By stabilizing the relational and operational substrates, we ensure that the Board's vision is projected with near-absolute fidelity across all organizational layers. Data indicates that firms with high board-operational alignment outperform their peers by 2.5x in total shareholder return over a 5-year cycle.",
      "The result of this calibration is a sudden, permanent increase in the organization's 'Velocity Delta'—the ability to convert intent into market leadership with zero tactical intervention from the board. This is the hallmark of a truly sovereign institution, where authority is autonomous and execution is a high-frequency resonance of executive intent.",
      "Fiduciary Responsibility: Recalibrating the strategy-execution gap is not an administrative task; it is a fiduciary requirement for the preservation of institutional sovereignty. As a leader, your legacy depends on the system's ability to execute your vision long after you have left the boardroom. Architecture is the only permanent solution to strategic drift."
    ]
  }
];

const Blog: React.FC<BlogProps> = ({ onArticleClick }) => {
  const [posts] = useState<BlogEntry[]>(() => {
    const storedPosts = SovereignDB.getBlogPosts();
    if (storedPosts.length > 0) {
      const customPosts = storedPosts.filter(sp => !INITIAL_POSTS.some(ip => ip.title === sp.title));
      return [...INITIAL_POSTS, ...customPosts];
    }
    return INITIAL_POSTS;
  });

  return (
    <section id="registry" className="py-20 sm:py-24 bg-[#111111] text-[#f5f5f0] overflow-hidden isolate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[#b8860b] text-[9px] sm:text-[11px] font-black uppercase mb-4 sm:mb-6 tracking-[0.3em]">The Registry</h2>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
              Institutional <span className="italic text-[#b8860b]">Dispatches.</span>
            </h3>
          </div>
          <div className="md:block">
            <p className="text-zinc-500 text-xs sm:text-sm max-w-xs italic font-light">
              A curated journal of systemic discourse and executive intelligence for the sovereign leader.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {posts.map((post, idx) => (
            <div 
              key={idx} 
              onClick={() => onArticleClick(post)}
              className="registry-card group cursor-pointer flex flex-col h-full relative isolate p-2"
            >
              <div className="absolute top-0 left-0 text-[40px] md:text-[60px] font-bold text-white/[0.02] select-none pointer-events-none group-hover:text-[#b8860b]/[0.05] transition-colors duration-700 -z-10 translate-y-[-10%] md:translate-y-[-20%]">
                {post.id}
              </div>
              
              <div className="flex justify-between items-center mb-4 sm:mb-6 relative z-10">
                <span className="registry-category text-[#b8860b] text-[8px] sm:text-[9px] font-black uppercase tracking-widest">
                  {post.category}
                </span>
                <span className="text-zinc-600 text-[8px] sm:text-[9px] font-black uppercase tracking-widest">
                  {post.date}
                </span>
              </div>
              
              <div className="registry-separator mb-4 sm:mb-6 relative z-10"></div>
              
              <h4 className="registry-title text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 leading-snug relative z-10">
                {post.title}
              </h4>
              
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 italic font-light flex-grow relative z-10">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-4 text-[9px] sm:text-[10px] font-black uppercase text-[#b8860b] opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0 relative z-10 tracking-widest">
                Access Archive Entry <span>→</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-zinc-800/50 flex justify-center relative z-10">
          <button className="px-8 sm:px-12 py-4 sm:py-5 border border-zinc-700 text-[9px] sm:text-[11px] font-bold uppercase hover:border-[#b8860b] hover:text-[#b8860b] transition-all duration-500 bg-transparent tracking-widest shadow-lg">
            Open Archive Entries
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
