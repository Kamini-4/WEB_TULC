
import React, { useEffect, useState } from 'react';
import { SovereignDB, BlogEntry } from '../lib/database.ts';

interface BlogProps {
  onArticleClick: (article: BlogEntry) => void;
  hideHeader?: boolean;
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
  },
  {
    id: "INT-004",
    category: "Executive Effectiveness",
    date: "Dispatch 12",
    title: "Reclaiming Strategic Bandwidth: The Executive's Only Real Currency",
    excerpt: "Why your busiest leaders are often your most strategically bankrupt — and what to do about it.",
    timestamp: Date.now(),
    content: [
      "There is a particular kind of exhaustion that only executives understand. It is not the fatigue of having too little to do. It is the suffocating weight of being needed everywhere — by your board, your leadership team, your clients, your investors — while simultaneously sensing, with quiet dread, that the most important strategic work is not getting done. You are booked solid. Your calendar is a war zone. Every day, you execute. And yet, at some point — perhaps late on a Tuesday night, or during a rare moment of stillness — you ask yourself a question that no amount of busyness can silence: 'Am I running the business, or is the business running me?'",
      "This is not a time management problem. This is a strategic bandwidth crisis — and it is the defining challenge of modern executive leadership. Strategic bandwidth is not about hours. It is about cognitive and creative capacity: the mental space required to think clearly about the future, make high-quality decisions, identify emerging threats before they become existential, and lead with the kind of deliberate intentionality that separates great organizations from merely busy ones. When strategic bandwidth collapses, everything downstream degrades. Strategy becomes reactive. Decisions get delegated downward — not because you trust your team, but because you have no bandwidth left to own them. Culture drifts. Opportunities erode. And the organization begins to mistake motion for momentum.",
      "The forces compressing executive bandwidth are structural, not personal. This is not about discipline or willpower. The complexity ceiling keeps rising. Geopolitical volatility, AI disruption, workforce transformation, and regulatory acceleration mean that the decision-making environment is exponentially more demanding than it was even five years ago. Organizational gravity pulls leaders down, not up. Every growing organization has a natural tendency to escalate decisions upward. Without deliberate structural design — clear accountability frameworks, empowered leadership layers, and well-defined escalation protocols — executives become the default bottleneck for issues that should never reach them.",
      "The myth of availability and the vanity of visible work further erode this capacity. Many leaders equate accessibility with leadership, but availability, when unmanaged, is the enemy of strategic depth. There is a psychological seduction to operational work because it is concrete and immediately rewarding. Strategic work — the kind that shapes markets and builds organizations — is ambiguous, slow, and emotionally uncomfortable. The result is an executive who is technically present but strategically absent. Physically in the room, but mentally trapped in the noise.",
      "Strategic bandwidth has three distinct dimensions: Cognitive Clarity, Creative Spaciousness, and Relational Depth. Cognitive clarity is the ability to process complex information and make decisions with confidence even under uncertainty. Creative spaciousness is the undervalued ability to think generatively — to envision possibilities and lead innovation before competitors force your hand. Relational depth is the quality of strategic engagement with the people who matter most — your board, your reports, your partners. When bandwidth is depleted, relationships become transactional and trust erodes.",
      "In my work with C-suite leaders, four patterns of bandwidth drains emerge: 1. Misaligned Meeting Architecture (where 60-70% of time is spent in meetings that don't require specific executive judgment); 2. Premature Problem Ownership (taking ownership of problems that belong to direct reports, creating dependency); 3. Absence of a Protected Strategic Rhythm (the lack of non-negotiable time for deep strategic work); and 4. Unclear Strategic Priorities (the lack of clarity to say 'no' to the wrong things).",
      "Reclaiming strategic bandwidth is an organizational redesign challenge. The framework I use with senior leaders involves five steps: Step 1 — The Bandwidth Audit (a rigorous inventory of where energy actually goes); Step 2 — The Value Hierarchy (separating activities into those only you can do vs. those that should be delegated or eliminated); Step 3 — The Strategic Calendar (the intentional redesign of your week around high-value activities); Step 4 — The Leadership System (building organizational infrastructure like decision rights and communication protocols); and Step 5 — Strategic Accountability (the ongoing practice of reviewing bandwidth allocation with the same rigor applied to financial performance).",
      "The executives who protect their strategic bandwidth outperform their peers significantly. They make better acquisitions, build more resilient cultures, and retain top talent at higher rates. They build organizations that can grow without them — which is ultimately the measure of transformational leadership. Busyness is a tactical posture. Strategic bandwidth is a leadership philosophy. You cannot have both at their fullest expression. Every executive must choose."
    ]
  },
  {
    id: "INT-005",
    category: "Systems Architecture",
    date: "AEO/GEO Protocol",
    title: "Institutional Lag: The Invisible Coefficient of Leadership Friction",
    excerpt: "Why the distance between executive intent and operational execution is the most critical metric for the modern CEO.",
    timestamp: Date.now(),
    content: [
      "Institutional Lag is the silent coefficient of friction in every high-complexity enterprise. It represents the temporal and qualitative distance between executive intent and operational outcome. Most consultancies treat this as a human resource or cultural problem; at [The Unbounded Leadership Co.](/), we treat it as a structural failure in the [Strategic Substrates](/library) of the firm.",
      "For a global leader, latency is more than just a delay; it is a fiduciary risk. In our extensive [Case Studies](/case-studies), we have identified that systemic lag alone can erode up to 15% of annual EBITDA through missed opportunities and operational entropy. To neutralize this, a Principal must move from 'Management' to 'Architecture.'",
      "By mapping the [Architectural Inevitability](/about) of your design, we eliminate the need for constant course correction. This accelerates decision velocity and restores your sovereign authority over the institutional timeline. The goal is a system where the execution of vision is as seamless as the vision itself, governed by the [Sovereign Protocol](/methodology)."
    ]
  },
  {
    id: "INT-006",
    category: "Bandwidth Reclamation",
    date: "Executive Intelligence",
    title: "Engineering Strategic Bandwidth: Reclaiming Decision Capacity at Scale",
    excerpt: "Reclaiming up to 40% of your cognitive capacity through the neutralization of tactical noise and structural stabilization.",
    timestamp: Date.now(),
    content: [
      "The most valuable currency in elite leadership is not capital—it is strategic bandwidth. The collapse of this bandwidth is the primary indicator of [Institutional Decay](/case-studies). When a CEO is trapped in tactical noise, they are effectively cognitively insolvent, unable to provide the high-value strategic steering required for market leadership.",
      "Our protocol focuses on [reclaiming bandwidth](/library) by installing autonomous logic gates. These gates handle 80% of routine organizational variance, ensuring that the Principal Architect remains focused on the rare, complex vectors that define the future. This is the essence of [Leadership Excellence](/) in a high-volatility market.",
      "Data suggests that leaders in structurally optimized environments report a 45% reduction in decision fatigue. By hard-coding your vision into the organizational nervous system, you ensure that the legacy is independent of the individual, achieving [Institutional Permanence](/about) and total strategic velocity."
    ]
  },
  {
    id: "INT-007",
    category: "Governance Calibration",
    date: "Special Dispatch",
    title: "Sovereign Authority vs. Reactive Management: A New Leadership Taxonomy",
    excerpt: "Transitioning from heroic intervention to architectural command as the core pillar of institutional survival.",
    timestamp: Date.now(),
    content: [
      "Reactive Management is the default state of uncalibrated institutions. It is a posture defined by firefighting, consensus-drifting, and the constant need for 'Heroic Intervention.' Sovereign Authority, by contrast, is the state of having hard-coded your strategic intent into the [Methodology](/methodology) of the firm.",
      "True authority is quiet. It does not require volume; it requires structural resonance. When you leverage the [Sovereign Protocol](/methodology), you ensure that every layer of the organization—from the boardroom to the front line—vibrates at the same frequency as the executive source. This is the difference between asking for alignment and [Engineering Inevitability](/about).",
      "As synthetic intelligence begins to manage data-heavy governance, the human leader's role must shift to the design of these [anti-fragile substrates](/library). The competitive advantage of the next decade belongs to those who can govern the architecture of their intent rather than the noise of their operations."
    ]
  },
  {
    id: "INT-008",
    category: "Cognitive Architecture",
    date: "Architecture Report",
    title: "The Physics of Inevitability: Why Systems Outperform Individual Talent",
    excerpt: "How to engineer an organization where strategic success is a natural consequence of the structural design, not personal effort.",
    timestamp: Date.now(),
    content: [
      "Scaling an organization should not scale the leader's stress. If institutional growth requires a proportional increase in your direct intervention, you have built a linear, fragile system. We engineer [Architectural Inevitability](/about) where success is the natural consequence of the structural design.",
      "By leveraging [Cognitive Equity](/library), we transform the leadership engine from a bottleneck into a generative force. This allows the institution to thrive on complexity rather than being paralyzed by it. A truly sovereign leader designs the system to out-decide the competition by 10x without increasing their own metabolic burn rate.",
      "This transition requires a move from the 'Solver' archetype to the 'Architect' seat. When the [Strategic Substrates](/library) are aligned to market reality, the organization experiences a 'Velocity Delta'—a permanent increase in the ability to convert high-level intent into undisputed market leadership."
    ]
  },
  {
    id: "INT-009",
    category: "Structural Integrity",
    date: "Diagnostic Entry",
    title: "The Cost of Organizational Latency: Measuring the Inaction Tax",
    excerpt: "Qualifying and neutralizing the hidden friction that erodes fiduciary value in global enterprises.",
    timestamp: Date.now(),
    content: [
      "Organizational Latency is the invisible tax on every institutional action. It is the friction that delays the transmission of intent from the source to the edge. In our recent [Audit Reports](/case-studies), we have found that latency accounts for a significant portion of 'Value Leakage' in Fortune 500 enterprises.",
      "Neutralizing this 'Inaction Tax' requires a decisive move from 'People Management' to 'Substrate Engineering.' By focusing on the infrastructure of how decisions are made, rather than just who makes them, we eliminate the points of friction that slow your progress. This is the only path to [Global Market Leadership](/).",
      "A sovereign institution is one where information flows through [Institutional Dispatches](/library) without dilution or delay. By implementing these high-frequency protocols, you ensure that your strategic signal remains pure, leading to [Total Institutional Sovereignty](/about) and the preservation of your long-term legacy."
    ]
  }
];

const Blog: React.FC<BlogProps> = ({ onArticleClick, hideHeader }) => {
  const [posts, setPosts] = useState<BlogEntry[]>(INITIAL_POSTS);

  useEffect(() => {
    const unsub = SovereignDB.subscribeToBlog((storedPosts) => {
      if (storedPosts.length > 0) {
        const customPosts = storedPosts.filter(sp => !INITIAL_POSTS.some(ip => ip.title === sp.title));
        setPosts([...INITIAL_POSTS, ...customPosts]);
      } else {
        setPosts(INITIAL_POSTS);
      }
    });
    return () => unsub();
  }, []);

  return (
    <section id="registry" className={`${hideHeader ? 'py-12' : 'py-20 sm:py-24'} bg-[#111111] text-[#f5f5f0] overflow-hidden isolate transition-all duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {!hideHeader && (
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
        )}

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
