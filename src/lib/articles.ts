
// Institutional Knowledge Graph: Centralized Articles Registry
export interface Article {
  id?: string;
  category: string;
  title: string;
  excerpt?: string;
  content: string[];
  date?: string;
}

export const INSTITUTIONAL_ARTICLES: Article[] = [
  {
    id: "INT-001",
    category: "Succession Architecture",
    date: "Q1 2026",
    title: "The Founder's Dilemma: Architecting Institutional Permanence Beyond the Individual",
    content: [
      "The 'Founder Trap' is a structural phenomenon where the organization's growth is strictly tethered to the founder's individual cognitive limits. To transcend this, one must architect systems that reproduce intent without direct intervention.",
      "True sovereignty isn't about being in control; it's about the system performing with fidelity in your absence. We call this 'Institutional Permanence.'",
      "By engineering logic gates into governance, we remove the hero-dependency that plagues high-growth ventures."
    ]
  },
  {
    id: "INT-002",
    category: "Cognitive Clarity",
    title: "The Cognitive Tax of Leadership: Recapturing the 40% Bandwidth",
    content: [
      "Most CEOs lose 40% of their strategic capacity to 'tactical noise'—slack threads, reactive meetings, and vision-diluting politics.",
      "We quantify this as the Cognitive Tax. Our methodology focuses on removing this tax through structural substrate audits and intent-fidelity engineering.",
      "When the tax is removed, you don't just work faster; you think at a higher altitude."
    ]
  },
  {
    id: "INT-004",
    category: "Executive Bandwidth",
    title: "Cognitive Equity Architecture: Designing for Maximum Leverage",
    content: [
      "Bandwidth is your primary institutional currency. Most organizations spend it inefficiently. Cognitive Equity Architecture is about treating executive attention as a zero-sum asset.",
      "The goal is simple: Every cognitive cycle must yield maximum strategic leverage. If it doesn't, it belongs in the substrate, not the CPU.",
      "Architecture, not effort, is the solution to executive burnout."
    ]
  },
  {
    id: "INT-005",
    category: "Institutional Velocity",
    title: "Institutional Lag: The Invisible Coefficient of Decay",
    content: [
      "Institutional Lag is the delta between a decision being made and its absolute, undistorted execution at the edge.",
      "In high-stakes environments, lag is lethal. It creates a permanent deficit that competitors exploit. We identify the strategic friction points and dissolve them.",
      "Velocity is not about rushing; it's about the removal of drag."
    ]
  },
  {
    id: "INT-010",
    category: "Sovereign Authority",
    title: "Architecture of Authority: Why Systems Outperform Brands",
    content: [
      "Personal brands are fragile. Systems are sovereign. The shift from leader-led to system-architected is the definitive move of the top 0.1%.",
      "An architected authority radiates from the system's performance, not the leader's personality. This creates a gravity well that attracts top-tier talent and capital.",
      "Focus on the substrate, and the brand takes care of itself."
    ]
  }
];

export const getArticleById = (id: string): Article | undefined => {
    return INSTITUTIONAL_ARTICLES.find(a => a.id === id);
};
