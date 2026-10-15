export interface FAQItemData {
  question: string;
  redditContext: string;
  category: 'Decision Latency & Delegation' | 'Coaching vs Architecture' | 'Scaling & Sabbatical' | 'Board & Cap Table' | 'Payments & Engagement';
  answer: string;
}

export const REDDIT_FAQS: FAQItemData[] = [
  {
    category: 'Decision Latency & Delegation',
    redditContext: 'Top question on r/entrepreneur & r/startups: "How do I stop being the ultimate bottleneck for every approval?"',
    question: "How do I stop being the central decision bottleneck without operations crumbling?",
    answer: "A decision bottleneck is not a personal flaw—it is an architectural failure. When an enterprise grows beyond 15–20 people, founder intuition must be codified into explicit decision boundaries (signing ceilings, risk matrices, and exception filters). Direct reports escalate decisions upward because ambiguity defaults to fear. Once you establish clear boundary protocols—where teams have 100% autonomous signing authority under specified thresholds—over 80% of daily approval escalations disappear immediately."
  },
  {
    category: 'Decision Latency & Delegation',
    redditContext: 'Common debate on r/smallbusiness: "My executive team has impressive resumes, but they still ping me for everything."',
    question: "Why does my executive team keep asking for my sign-off on things they should own?",
    answer: "Because standard management delegation delegates tasks, not risk criteria. If an executive does not know your exact trade-off calculus (e.g., speed vs. margin, brand equity vs. short-term revenue), the safest career move is to ask you. Through Sovereign Decision Mapping, we extract your mental models and codify them into explicit organizational guardrails. Your executives no longer ask for permission because the boundary criteria are unambiguous."
  },
  {
    category: 'Coaching vs Architecture',
    redditContext: 'Frequent thread on r/consulting: "Executive coach vs McKinsey/Bain vs Boutique Strategy Firm—what do they actually deliver?"',
    question: "What is the difference between an executive coach, a traditional consulting firm, and a leadership architect?",
    answer: "An executive coach works on the individual leader's psychology, mindset, and habits. A traditional management consultancy (McKinsey, BCG, Bain) analyzes your market and leaves behind a 100-page slide deck of recommendations for your team to implement. A Leadership Architect designs and embeds the actual operating infrastructure—the decision protocols, reporting rhythms, and governance substrates—directly into your company so it executes autonomously without ongoing founder heroics."
  },
  {
    category: 'Scaling & Sabbatical',
    redditContext: 'Viral post on r/startups: "If I take a 2-week vacation, my company catches fire. Is this normal?"',
    question: "Can an enterprise founder really step away for a 14-to-30 day sabbatical without daily firefighting?",
    answer: "Yes, and we treat this as the definitive benchmark of institutional health: The Two-Week Step-Away Stress Test. If your business cannot run cleanly for 14 days without emergency Slack pings, you do not own an asset—you own an exhausting high-risk job. Our 90-day architectural sprint installs self-regulating execution substrates so operations compound smoothly whether you are in the boardroom or completely off the grid."
  },
  {
    category: 'Board & Cap Table',
    redditContext: 'Common friction on r/entrepreneur: "Co-founder & Board alignment is degrading as we scale past $20M."',
    question: "How do you resolve founder, co-founder, or board misalignment without blowing up the cap table?",
    answer: "Misalignment at the board level is rarely personal; it is an unmapped collision between unspoken assumptions. We utilize Seth Godin's principle of 'Constructive Tension' to surface the hidden friction between short-term quarterly velocity and long-term institutional permanence. We install formal Alignment Covenants that define non-negotiable boundaries, role demarcations, and voting thresholds, neutralizing politics before they dilute enterprise value."
  },
  {
    category: 'Valuation & Key-Person Risk',
    redditContext: 'Top PE / M&A question on r/SaaS: "Why did the private equity buyer discount our valuation by 30%?"',
    question: "How does a founder decision bottleneck actively hurt company valuation during M&A or capital raises?",
    answer: "Institutional buyers and private equity firms apply a heavy 'Key-Person Risk Discount' (typically 20% to 40% of valuation) if diligence reveals that core revenue, client relationships, or operational decisions depend on the founder's daily presence. An autonomous leadership substrate proves to acquirers that the enterprise generates cash flow independently, instantly protecting your multiple and maximizing enterprise value."
  },
  {
    category: 'Decision Latency & Delegation',
    redditContext: 'Reddit r/leadership: "How do we maintain quality standards without the founder micromanaging every deliverable?"',
    question: "How do we preserve high standards and culture as headcount scales from 25 to 100+?",
    answer: "As Seth Godin stated: 'People like us do things like this.' Culture is not slogans on an office wall; culture is the shared operating norms that frontline teams run when the founder is not in the room. By embedding your standards into hiring criteria, review gates, and automated feedback loops, standards stay elevated without manual policing."
  },
  {
    category: 'Payments & Engagement',
    redditContext: 'Client question on payment gateways & billing: "Are we using Razorpay for payments?"',
    question: "Are we using Razorpay for payments, and what billing methods are accepted?",
    answer: "Our digital systems and executive toolkits clear instantly via our encrypted Digital Clearance Gateway, which accepts all major international credit cards, debit cards, and Apple Pay. For enterprise mandates and institutional retainers, we issue formal Corporate Procurement Invoices via SWIFT/Wire transfer. For Indian institutional entities requiring UPI, NetBanking, or GST-compliant Razorpay clearance, custom Razorpay checkout links are generated directly upon request."
  },
  {
    category: 'Payments & Engagement',
    redditContext: 'Question on r/consulting: "How do institutional engagements start, and what is the vetting process?"',
    question: "How do I initiate a confidential engagement with Suchita Sancheti?",
    answer: "Engagements begin with our asynchronous 10-Point Yield Diagnostic or a direct inquiry to the Executive Concierge Desk. You can transmit your confidential docket directly through this platform or email Suchita Sancheti at suchita@theunboundedleadership.com. All initial inquiries are handled with strict Fiduciary Non-Disclosure protocols."
  }
];
