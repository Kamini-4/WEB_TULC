export interface WhitePaper {
  title: string;
  subtitle: string;
  category: string;
  author: string;
  date: string;
  sections: {
    title: string;
    paragraphs: string[];
  }[];
  exhibits?: {
    title: string;
    headers: string[];
    rows: string[][];
  }[];
}

export const WHITE_PAPERS: Record<string, WhitePaper> = {
  "alignment_protocol": {
    title: "Strategic Alignment Protocol: A Total Architectural Audit",
    subtitle: "A Cybernetic Framework for Institutional Velocity & Autonomic Stability",
    category: "PHYSICS OF POWER",
    author: "Suchita Sancheti, Founder & Enterprise Architect",
    date: "Spring 2026",
    sections: [
      {
        title: "I. The Epistemological Crisis of Charismatic Authority",
        paragraphs: [
          "Modern enterprise sits at an evolutionary precipice. For over a century, the prevailing myth of corporate progress has centered on the individual: the charismatic executive source whose sheer willpower holds structural decay at bay. This is heroic leadership. It is intuitive, magnetic, and completely unsustainable.",
          "In high-complexity ecosystems, charismatic authority inevitably reaches its scaling limit. When an organization's variables exceed the real-time processing capacity of a single human cognitive node—or even a tight executive circle—a quiet, terminal pathology sets in: Institutional Lag. Decisions begin to decouple from the operational edge, middle management resorts to defensive alignment consensus, and the core strategic intent is diluted to the point of operational noise.",
          "To survive, the modern institution must transition from heroic governance to architectural governance. We must stop asking how to optimize the behavior of individual human assets and instead ask how to design a highly aligned substrate. The Strategic Alignment Protocol is the formalization of this transition. It is the practice of hard-coding the Principal's decision filters into the organizational architecture, creating a self-correcting, autonomous entity that projects intent with absolute fidelity."
        ]
      },
      {
        title: "II. Second-Order Cybernetics and Substrate Modeling",
        paragraphs: [
          "To audit an institution is to map its informational metabolism. Traditional management consulting approaches this through the lens of organizational charts and process optimization. These are cosmetic interventions. The real engine of stability is feedback. In the vocabulary of cybernetics, we model the firm as a dynamic, self-regulatory system.",
          "A classic error of corporate design is the reliance on first-order feedback systems—simple thermostat loops that respond to external deviations after they occur. Active fire-fighting is a symptom of first-order failure. The Strategic Alignment Protocol implements self-regulating system processes: feedback designs that analyze the rules governing decision actions themselves.",
          "By introducing what we call the 'Logic Substrate,' we decouple the execution of routine decisions from human discretion. The substrate is a system of hard-coded, nested heuristic filters that operate on the margin. When an operational node encounters a variable, the substrate resolves it according to pre-calibrated parameters. The human executive node is only alerted when a deviation represents a fundamental structural anomaly—a systemic code violation that requires architectural redesign, rather than tactical triage."
        ]
      },
      {
        title: "III. The Audit Protocols: Baseline, Intervention, and Autonomy",
        paragraphs: [
          "The implementation of the Strategic Alignment Protocol proceeds through four rigorous phases, mapped in our baseline audit. Each phase is designed to systematically dismantle operational noise and re-establish executive resonance.",
          "Phase 01: The Noise Demarcation. In this phase, we run a high-fidelity diagnostic to map the 'Invisible Tax'—the metabolic energy currently lost to circular meetings, reports designed for defensive posturing, and decision bottlenecks. We separate 'Signal' (pure strategic intent) from 'Noise' (bureaucratic defensive loops).",
          "Phase 02: Structural Crystallization. We redesign the executive decision matrix. Rather than relying on managers to interpret guidelines, we compile the Principal's core intuition into clear, binary heuristic circuits. We establish the first layers of the logic substrate, delegating tactical control to the edge while maintaining absolute central control over the design parameters.",
          "Phase 03: Substrate Calibration. The logic substrate is stress-tested. We simulate major market shifts, executive attrition, and organizational pivots to ensure that the system's self-correcting feedback loops operate with zero-delay. The organization undergoes automatic calibration, tightening its internal alignment without manual oversight.",
          "Phase 04: The Alignment Handover. The organization transitions to strategic stability. The Principal steps back from everyday fire-fighting to occupy the 'Architect's Seat'—focusing exclusively on the maintenance of the logic substrate and long-range strategic redirection. The firm operates as a self-governing, highly accelerated entity."
        ]
      },
      {
        title: "IV. Systemic Metrics of Alignment Velocity",
        paragraphs: [
          "A protocol cannot claim complete strategic alignment unless its metrics are verifiable. Our audits measure three primary indicators of institutional health:",
          "1. Information Dilution Rate (IDR): The percentage of strategic intent lost as a directive passes down each layer of management. In charismatic organizations, the IDR can reach up to 15% per layer, meaning a brand's core strategy meets less than 40% compliance at the operational edge. An aligned operating substrate reduces IDR to under 1.5%.",
          "2. Decision Decoupling Time (DDT): The latency between detecting a market anomaly and executing an aligned corporate change. Our designs aim to bring PDT from quarters down to hours, converting velocity into an un-copyable competitive advantage.",
          "3. Cognitive Solvency Index (CSI): The ratio of high-stakes strategic creation to tactical fire-fighting hours on the Principal's calendar. A highly aligned executive displays a CSI of at least 8.5—meaning 85% of their attention is deployed toward architectural futures, and only 15% is spent on variance response."
        ]
      }
    ],
    exhibits: [
      {
        title: "Table 1.1: Systemic Performance Gap (Charismatic vs. Strategic Architecture)",
        headers: ["Performance Metric", "Charismatic Model (Baseline)", "Strategic Alignment Protocol (Calibrated)"],
        rows: [
          ["Information Dilution Rate", "12.0% - 15.5% per layer", "< 1.5% overall across all tiers"],
          ["Decision Decoupling Time", "14 to 45 business days", "72 minutes (Autonomic Edge Resolution)"],
          ["Cognitive Burn Rate", "78% (Insolvency Risk)", "12% (Architectural Cushion)"],
          ["Surplus Strategic Bandwidth", "< 10 hours weekly", "32 - 40 hours weekly (Reclaimed)"],
          ["Systemic Integrity Score", "3.2 / 10 (Fragile)", "9.8 / 10 (Highly Aligned & Antifragile)"]
        ]
      }
    ]
  },
  "cognitive_equity": {
    title: "Cognitive Equity: Reclaiming the Architect's Seat",
    subtitle: "Quantifying the Metabolic Cash Flow of High-Stakes Focus in the Unbounded Organization",
    category: "STRATEGIC SUBSTRATES",
    author: "Suchita Sancheti, Founder & Enterprise Architect",
    date: "Summer 2026",
    sections: [
      {
        title: "I. The Bio-Economics of the Executive Attention Node",
        paragraphs: [
          "Attention is not a psychological resource; it is a metabolic input. Every decision made by an executive architect represents a precise energetic transaction inside the prefrontal cortex. This is the biological foundation of governance. When an organization forces its founders and executives to constantly navigate routine, low-risk operational decisions, it is effectively depleting its most valuable asset.",
          "We define Cognitive Equity as the surplus biological capacity of the executive source to engage in non-linear, high-yield architectural creation. This equity is the primary driver of enterprise value in the modern epoch. Yet, on the standard balance sheet, it is invisible. It is treated as an infinite, free resource, leading to systemic bankruptcy.",
          "To reclaim this equity, we must view the design of the institution as a resource-allocation problem. A poorly designed organization acts as an attention sponge, absorbing executive bandwidth through endless status updates, consensus meetings, and tactical course corrections. A well-designed organization acts as an attention amplifier, filtering noise and magnifying the impact of every executive keystroke."
        ]
      },
      {
        title: "II. Measuring the Invisible Tax: The Metabolic Leak",
        paragraphs: [
          "The primary threat to Cognitive Equity is the 'Invisible Tax.' This tax is computed by auditing how executive focus is distributed throughout the business week. Our assessments indicate that in typical $1B+ enterprises, up to 40% of the CEO's bandwidth is permanently consumed by things that could—and should—be governed by hard-coded algorithmic filters.",
          "The tax manifests as 'Consensus Drift.' Because the organization lacks a clear, absolute logic substrate, projects are perpetually stuck in a state of 'review.' Managers schedules meetings to gain alignment, which is often just a defensive mechanism to distribute personal accountability. The result is a sluggish, fearful hierarchy that moves at the speed of committees.",
          "Our diagnostic methodologies mathematically isolate this leak. We map the meeting networks, the decision chains, and the escalation protocols to quantify the exact financial and strategic cost of your system's design flaws. The numbers are often shocking: a single hour of misallocated chief attention over a fiscal year equates to millions of dollars in lost organizational execution speed."
        ]
      },
      {
        title: "III. The Architecture of De-Escalation",
        paragraphs: [
          "How do we restore Cognitive Equity? The solution is not time management, meditation, or hiring more administrative staff. The solution is structural de-escalation.",
          "There must be a clear boundary between 'Governance Rules' and 'Running Code.' Running Code consists of the everyday operations that execute standard business processes. These must be entirely autonomous, guided by a robust, self-correcting logic substrate. Governance Rules represent the core principles, risk appetites, and aesthetic directives that define the firm. These are the exclusive domain of the Architect.",
          "By separating these two layers, we establish a strict quarantine around the executive calendar. Every operational dispute, metric deviation, or tactical opportunity must attempt to resolve itself at the operational edge using the logic substrate. It may only escalate to the executive node if it cannot be resolved by the existing rules. If an escalation occurs, the Architect's task is not just to make the decision, but to immediately update the logic substrate to ensure that a similar issue never escalates again. This is second-order decision engineering."
        ]
      },
      {
        title: "IV. Reclaiming the Chair: An Aligned Core",
        paragraphs: [
          "Reclaiming the Architect's seat changes how leadership is experienced. You are no longer the bottleneck who must authorize every action; you are the Strategic Architect behind the system.",
          "In this state of cognitive solvency, your relationship with the institution becomes elegant. You no longer interact with it through the frantic exchange of emails and messages. You interact with it by updating its system parameters. You monitor the dashboard, evaluate the system's alignment and telemetry, and make surgical adjustments to the substrate's code.",
          "The yield is a profound transformation. Your stress levels decline, your clarity returns, and your enterprise gains the capacity to make massive, landscape-shifting moves with minimal friction. You have transitioned from managing an operational container to presiding over an enduring, aligned institution."
        ]
      }
    ],
    exhibits: [
      {
        title: "Exhibit 2.1: Reallocation of Executive Energy (Pre vs. Post Alignment Calibration)",
        headers: ["Operational Category", "Pre-Alignment Allocation (%)", "Post-Alignment Allocation (%)", "Systemic Impact"],
        rows: [
          ["Tactical Problem Solving", "45%", "5%", "Resolved via Edge Substrate autonomously"],
          ["Defensive Consensus Alignment", "30%", "0%", "Replaced by Absolute Direct Heuristics"],
          ["Operational Performance Auditing", "15%", "10%", "Monitored via Automatic Telemetry"],
          ["Architectural Design & Vision", "10%", "60%", "Massive strategic compound growth"],
          ["Strategic Cushions (High Stakes Reflection)", "0%", "25%", "Zero-friction incubation of future strategy"]
        ]
      }
    ]
  }
};
