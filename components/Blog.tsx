
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Link as LinkIcon, X, Check } from 'lucide-react';
import { Linkedin } from './BrandIcons';
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
      "The Founder Trap is the most common structural failure in global leadership. It occurs when an organization's growth becomes strictly tethered to the individual cognitive limits of its creator. Research consistently shows that over 50% of CEO successions in multi-billion dollar firms fail to meet board expectations within the first 18 months. This is rarely a failure of talent; it is a fundamental failure of architecture.",
      "The hidden cost of this failure is staggering. A failed transition often carries an 'Execution Tax' that erodes 15-20% of share value in the first two years. This erosion occurs because the organization's 'Operating System' was hard-coded to the founder's unique, unmapped intuitive logic. When the founder leaves, the logic leaves with them, leaving the institution in a state of cognitive insolvency.",
      "To solve this, leaders must transition from 'Heroic Intervention' to 'Systemic Sovereignty.' This requires building a leadership substrate that operates with the founder's integrity but carries autonomous momentum. This substrate serves as the organization's nervous system, processing strategic intent into operational reality without dilution.",
      "Our three-phase 'Handover Invariant' methodology addresses this directly. Phase 1: Structural Stabilization involves implementation of a clear registry of accountability. Phase 2: Logic Layer Installation translates intuitive judgment into verifiable Decision Logic Gates. Phase 3: Sovereign Authority Transfer ensures that the board's vision resonates with absolute fidelity across all layers, protecting the institution's most critical decision engine for decades to come."
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
      "Modern executive burnout is frequently misdiagnosed. It is rarely a result of workload; it is a direct consequence of 'Architectural Friction.' Our research into high-stakes leadership environments indicates that 'Heroic' CEOs spend up to 40% of their time resolving tactical variances that a properly designed system should handle autonomously. This 'Cognitive Tax' is the ultimate bottleneck for organizational scaling.",
      "Drawing from John Sweller's Cognitive Load Theory, we identify that 'extraneous load'—the tactical noise of daily operations—drastically diminishes the 'germane load' required for high-level strategic brilliance. When a system requires a hero to function every day, that system is fragile. We believe that executive excellence is achieved when the system is anti-fragile, gaining momentum from complexity rather than being paralyzed by it.",
      "By reclaiming this lost 40% of bandwidth, a Principal can focus on 'Infinite Resonance'—the ability to project strategic intent with near-absolute fidelity across all layers of the firm. For a CEO of a global enterprise, this reclaimed bandwidth represents billions in 'Cognitive Equity.' It is the primary driver of Alpha in markets defined by high volatility and rapid technological shifts.",
      "Solving the bandwidth crisis requires a surgical audit of your 'Execution Architecture.' We identify the specific logic levers that are currently out of phase with your operational goals. By recalibrating these levers and installing autonomous logic gates, we ensure your leadership operating system allows you to focus on the future while the system handles the present."
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
      "Industry benchmarks suggest that 67% of well-formulated strategies fail to achieve their intended market impact. This 'Strategy-Execution Gap' is not a failure of communication; it is a deep-seated calibration problem between board-level intent and operational reality. This gap creates a 'Governance Tax' that typically erodes up to 15% of annual EBITDA through friction and lost market arbitrage.",
      "Effective board governance requires a shared architectural logic. Using the 'Resource-Based View' (RBV) of the firm, we demonstrate that sustainable competitive advantage stems from internal structural configurations. A calibrated board ensures that strategic execution is a natural law of the design, not a constant struggle against the organization's inherent inertia.",
      "Our 'Sovereign Substrate' audit provides boards with the tools needed to close this gap. By stabilizing both the relational and operational substrates, we ensure that every strategic directive is projected with absolute fidelity across all layers. Data indicates that firms achieving this high level of board-operational alignment outperform their industry peers by 2.5x in total shareholder return over a 5-year cycle.",
      "The result is a permanent increase in the institution's 'Velocity Delta'—the ability to convert strategic thought into market leadership with zero tactical intervention. This is the hallmark of a truly sovereign institution, where authority is autonomous and leadership is defined by the quality of the architecture rather than the volume of the command."
    ]
  },
  {
    id: "INT-004",
    category: "Executive Effectiveness",
    date: "Dispatch 12",
    title: "Reclaiming Strategic Bandwidth: The Executive's Only Real Currency",
    excerpt: "Why busiest leaders are often strategically bankrupt — and how to architect your return to high-value command.",
    timestamp: Date.now(),
    content: [
      "There is a pervasive exhaustion among modern executives that is often misattributed to a high workload. It is not the fatigue of doing too much; it is the suffocating weight of being needed everywhere—by your board, leadership team, and investors—while sensing that the most critical strategic work remains untouched. This is a strategic bandwidth crisis, and it is the defining challenge of contemporary leadership.",
      "Strategic bandwidth is not about managing your calendar; it is about protecting your cognitive and creative capacity. It is the mental space required to process absolute complexity, identify emerging market threats before they become existential, and lead with deliberate intentionality. When this bandwidth collapses, every decision downstream degrades in quality, and the organization begins to experience strategic drift.",
      "We find that traditional time management 'hacks' are insufficient for this challenge. Instead, successful leaders must engineer a 'Logic Architecture.' By implementing hard-coded decision filters and Sovereign Protocols, you ensure that only the most critical architectural deviations reach your desk. This reclaiming of space generates what we call 'Cognitive Equity'—the most valuable and underutilized asset in the C-suite.",
      "The goal is a permanent transition from the archetype of the 'Solver' to that of the 'Architect.' When the system handles the tactical noise autonomously, you are free to design the future. Protecting your strategic bandwidth is not just a personal benefit; it is a fiduciary responsibility to your shareholders to ensure the institution's most critical decision engine remains sharp and future-focused."
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
      "Institutional Lag is the silent coefficient of friction that erodes value in every high-complexity enterprise. It represents the temporal and qualitative distance between an executive's strategic intent and the actual operational outcome. While most consultancies treat this as a cultural or HR issue, we identify it as a structural failure in the organization's foundational substrates.",
      "This lag manifests in two primary dimensions: Temporal Drift and Qualitative Decay. Temporal Drift is the simple clock-speed delay between a decision and its first edge action. Qualitative Decay is the 'Signal Dilution' that occurs as intent passes through management layers. Our research suggests that in uncalibrated firms, strategic intent can lose up to 15% of its fidelity at every management layer, leading to total operational stagnation.",
      "To neutralize this lag, a Principal must move from 'People Management' to 'Substrate Engineering.' This requires a surgical audit and recalibration of the organization's execution frequency. By mapping the 'Architectural Inevitability' of your design, you ensure that the vision is hard-coded into the internal structure, allowing the firm to move with autonomous, zero-latency momentum.",
      "The future of competitive advantage belongs to the 'Zero-Latency Institution.' By achieving a state where the distance between strategic thought and operational action is effectively zero, you secure total institutional sovereignty. This leads to undisputed market leadership and ensures that your strategic signal remains pure from the boardroom to the front line, protecting long-term shareholder value."
    ]
  },
  {
    id: "INT-006",
    category: "Bandwidth Reclamation",
    date: "Executive Intelligence",
    title: "Engineering Strategic Bandwidth: Reclaiming Decision Capacity at Scale",
    excerpt: "Reclaiming up to 40% of your cognitive capacity by neutralizing tactical noise and stabilizing institutional logic.",
    timestamp: Date.now(),
    content: [
      "Strategic bandwidth is the most critical currency in elite leadership. However, in many organizations, this bandwidth is constantly being eroded by unresolved tactical friction. This erosion leads to 'Institutional Decay,' where the leadership's ability to provide high-value steering is compromised. A CEO trapped in tactical noise is a CEO who is cognitively insolvent.",
      "Our protocol focuses on bandwidth reclamation through the installation of autonomous logic gates. These gates are designed to handle 80% of routine organizational variance, filtering out the noise and ensuring the Principal remains focused on the rare, complex vectors that truly define the future. This is how high-stakes performance engineering is applied at the institutional level.",
      "By stabilizing the leadership substrate and hard-coding your vision into the organizational nervous system, you achieve total strategic velocity. Leaders in optimized environments report a 45% reduction in decision fatigue, allowing them to focus on the 'Infinite Bets' that drive legacy. Reclaiming your bandwidth is the only way to ensure institutional permanence in an increasingly volatile global market."
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
      "Reactive Management is the default state of uncalibrated institutions, defined by constant firefighting and a perpetual need for 'Heroic Intervention.' Contrast this with Sovereign Authority—a state where strategic intent is hard-coded into the firm's very methodology. Sovereign leaders do not manage people; they govern the architecture of intent.",
      "True authority doesn't require volume; it requires structural resonance. By leveraging the Sovereign Protocol, you ensure that every layer of your organization vibrates at the same frequency as the executive source. This structural alignment eliminates the need for constant consensus-drifting and allows for the seamless execution of even the most complex global strategies.",
      "As we move further into the age of synthetic governance, the leader's role must shift towards designing anti-fragile substrates. The competitive advantage of the next decade will belong to those who can effectively architect their vision into the institutional DNA, ensuring their authority is autonomous and their strategic signal remains pure across all global operations."
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
      "A common mistake in leadership is believing that scaling an organization requires a proportional increase in the leader's direct effort. This belief leads to fragile, bottlenecked systems. Instead, we advocate for 'Architectural Inevitability'—a state where success is the natural and inescapable consequence of the organizational design.",
      "By transforming the leadership engine into a generative force through 'Cognitive Equity,' we allow organizations to thrive on complexity rather than being paralyzed by it. A sovereign leader's goal is to design a system that can out-decide the competition by 10x without requiring a corresponding increase in the leader's own metabolic burn rate.",
      "This shift requires moving from the role of a 'Solver' to that of an 'Architect.' When the strategic substrates are properly aligned with market reality, the organization experiences a permanent increase in its 'Velocity Delta.' This allows for the effortless conversion of high-level strategic thought into market-defining actions, securing a lasting and undisputed institutional legacy."
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
      "Organizational Latency is an invisible tax that erodes the fiduciary value of even the most successful global enterprises. It is the friction that delays and dilutes strategic intent as it travels from the source to the operational edge. Our audits frequently show that this latency is a significant driver of value leakage, often accounting for millions in lost opportunities.",
      "Neutralizing this 'Inaction Tax' requires a decisive move from traditional 'People Management' towards 'Substrate Engineering.' By focusing on the infrastructure of decision-making rather than just the individuals involved, we can eliminate the structural points of friction that slow progress and hinder innovation. This is the only path to achieving sustainable, global market leadership.",
      "A truly sovereign institution ensures that its strategic signal remains pure through high-frequency protocols and Institutional Dispatches. By implementing these architectural safeguards, you stabilize your leadership substrate, maximize strategic velocity, and ensure the preservation of your institutional sovereignty for decades to come."
    ]
  }
];

const Blog: React.FC<BlogProps> = ({ onArticleClick, hideHeader }) => {
  const [posts, setPosts] = useState<BlogEntry[]>(INITIAL_POSTS);
  const [sharingId, setSharingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleShare = (e: React.MouseEvent, post: BlogEntry) => {
    e.stopPropagation();
    if (sharingId === post.id) {
      setSharingId(null);
    } else {
      setSharingId(post.id);
    }
  };

  const handleCopyLink = (e: React.MouseEvent, post: BlogEntry) => {
    e.stopPropagation();
    const url = `https://theunboundedleadership.com/library/${post.id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
    setSharingId(null);
  };

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
              onClick={() => {
                onArticleClick(post);
                if (post.id) navigate(`/library/${post.id}`);
              }}
              className="registry-card group cursor-pointer flex flex-col h-full relative isolate p-2"
            >
              <div className="absolute top-0 left-0 text-[40px] md:text-[60px] font-bold text-white/[0.02] select-none pointer-events-none group-hover:text-[#b8860b]/[0.05] transition-colors duration-700 -z-10 translate-y-[-10%] md:translate-y-[-20%]">
                {post.id}
              </div>
              
              <div className="flex justify-between items-center mb-4 sm:mb-6 relative z-10">
                <span className="registry-category text-[#b8860b] text-[8px] sm:text-[9px] font-black uppercase tracking-widest">
                  {post.category}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-600 text-[8px] sm:text-[9px] font-black uppercase tracking-widest">
                    {post.date}
                  </span>
                  <div className="relative">
                    <button 
                      onClick={(e) => handleShare(e, post)}
                      className="p-1 text-zinc-600 hover:text-[#b8860b] transition-colors"
                    >
                      <Share2 size={12} />
                    </button>
                    {sharingId === post.id && (
                      <div className="absolute right-0 top-6 bg-[#1a1a1a] border border-white/10 p-2 z-20 shadow-2xl flex flex-col gap-2 min-w-[100px] animate-fade-in text-left">
                        <button 
                          onClick={(e) => handleCopyLink(e, post)}
                          className="flex items-center gap-2 text-[9px] uppercase font-bold text-zinc-400 hover:text-white transition-colors p-1 w-full"
                        >
                          {copiedId === post.id ? <Check size={10} className="text-green-500" /> : <LinkIcon size={10} />}
                          {copiedId === post.id ? 'Copied' : 'Copy Link'}
                        </button>
                        <a 
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://theunboundedleadership.com/library/' + post.id)}&text=${encodeURIComponent(post.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-[9px] uppercase font-bold text-zinc-400 hover:text-white transition-colors p-1"
                        >
                          <X size={10} /> X / Twitter
                        </a>
                        <a 
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://theunboundedleadership.com/library/' + post.id)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-[9px] uppercase font-bold text-zinc-400 hover:text-white transition-colors p-1"
                        >
                          <Linkedin size={10} /> LinkedIn
                        </a>
                      </div>
                    )}
                  </div>
                </div>
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
