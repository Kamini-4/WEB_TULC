export interface FAQItem {
  id: string;
  number: number;
  question: string;
  answer: string;
  category: 'overview' | 'founder-dependency' | 'accountability' | 'strategic-alignment' | 'approach';
  categoryLabel: string;
  relevantLink?: {
    label: string;
    target: string;
    path: string;
  };
}

export interface FAQCategory {
  id: string;
  label: string;
  description: string;
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'all',
    label: 'All Questions (27)',
    description: 'Comprehensive institutional knowledge base for enterprise leaders and boards.'
  },
  {
    id: 'overview',
    label: 'The Firm & Leadership Architecture',
    description: 'Overview of The Unbounded Leadership Co., our global positioning, and core architectural principles.'
  },
  {
    id: 'founder-dependency',
    label: 'Founder Dependency & Delegation',
    description: 'Practical frameworks for identifying bottlenecks, outcome delegation, and stepping back without losing control.'
  },
  {
    id: 'accountability',
    label: 'Accountability & Team Ownership',
    description: 'Designing clear decision rights, eliminating micromanagement, and cultivating genuine team responsibility.'
  },
  {
    id: 'strategic-alignment',
    label: 'Strategic Alignment & Global Leadership',
    description: 'Bridging strategy with everyday execution across countries, time zones, and decentralized operating units.'
  },
  {
    id: 'approach',
    label: 'Our Approach & Engagements',
    description: 'The 3-stage Alignment Protocol, 5 aligned domains, family office dynamics, and expected institutional outcomes.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  // Category 1: Overview & Leadership Architecture
  {
    id: 'faq-1',
    number: 1,
    category: 'overview',
    categoryLabel: 'The Firm & Leadership Architecture',
    question: 'What is The Unbounded Leadership Co.?',
    answer: 'The Unbounded Leadership Co. is a global leadership consultancy founded by Suchita Sancheti. We help founders, CEOs and leadership teams address founder dependency, decision-making bottlenecks and organisational misalignment. Our approach focuses on leadership architecture: designing clearer ownership, decision authority and operating structures so that organisational performance depends less on constant intervention from individual leaders.',
    relevantLink: {
      label: 'Explore The Firm & Suchita Sancheti',
      target: 'about',
      path: '/about'
    }
  },
  {
    id: 'faq-2',
    number: 2,
    category: 'overview',
    categoryLabel: 'The Firm & Leadership Architecture',
    question: 'Who does The Unbounded Leadership Co. work with?',
    answer: 'The Unbounded Leadership Co. works with founders, CEOs and senior leadership teams in enterprise organisations, high-growth scale-ups and family offices. Our work is relevant when growth, organisational complexity or concentrated decision-making makes it harder to translate leadership intent into consistent execution.',
    relevantLink: {
      label: 'View Partnership Pathways',
      target: 'partnerships',
      path: '/services'
    }
  },
  {
    id: 'faq-3',
    number: 3,
    category: 'overview',
    categoryLabel: 'The Firm & Leadership Architecture',
    question: 'Is The Unbounded Leadership Co. a global leadership consultancy?',
    answer: 'Yes. The Unbounded Leadership Co. is positioned to serve leaders and organisations globally. Our focus is on leadership challenges that cross markets and industries, including founder dependency, unclear accountability, slow decisions and inconsistent execution. The scope of an engagement should reflect the organisation’s structure, operating context and leadership priorities.',
    relevantLink: {
      label: 'Review Global Strategic Dispatches',
      target: 'library',
      path: '/library'
    }
  },
  {
    id: 'faq-4',
    number: 4,
    category: 'overview',
    categoryLabel: 'The Firm & Leadership Architecture',
    question: 'What is leadership architecture?',
    answer: 'Leadership architecture is the design of how leadership works across an organisation. It connects strategic priorities, decision rights, accountability, escalation boundaries and cultural expectations. Instead of relying on a founder or CEO to resolve every issue, leadership architecture makes it clearer who owns an outcome, who can act and when senior intervention is necessary.',
    relevantLink: {
      label: 'Examine the 5 Core Operating Domains',
      target: 'domains',
      path: '/domains'
    }
  },
  {
    id: 'faq-5',
    number: 5,
    category: 'overview',
    categoryLabel: 'The Firm & Leadership Architecture',
    question: 'How is leadership architecture different from leadership coaching or training?',
    answer: 'Leadership coaching typically focuses on an individual leader’s development, while training builds knowledge and skills. Leadership architecture focuses on the organisational structures through which leaders make decisions and deliver results. The Unbounded Leadership Co. examines how ownership, authority, operating practices and alignment support—or obstruct—effective leadership. These approaches can complement one another.',
    relevantLink: {
      label: 'Read Comparative Outcomes',
      target: 'comparison',
      path: '/services'
    }
  },

  // Category 2: Founder Dependency and Delegation
  {
    id: 'faq-6',
    number: 6,
    category: 'founder-dependency',
    categoryLabel: 'Founder Dependency & Delegation',
    question: 'What is founder dependency?',
    answer: 'Founder dependency occurs when a business relies heavily on its founder for routine decisions, approvals, problem-solving or relationships. Work slows when the founder is unavailable because authority, knowledge or judgement remains concentrated in one person. Reducing founder dependency means building appropriate ownership and decision-making capability across the organisation—not removing the founder from every important decision.',
    relevantLink: {
      label: 'Take the Free 60-Second Assessment',
      target: 'test',
      path: '/assessment'
    }
  },
  {
    id: 'faq-7',
    number: 7,
    category: 'founder-dependency',
    categoryLabel: 'Founder Dependency & Delegation',
    question: 'How can I tell if I am the bottleneck in my business?',
    answer: 'You may be the bottleneck if routine decisions wait for your approval, teams repeatedly escalate similar issues or progress slows whenever you are unavailable. Review the decisions reaching you and ask why each requires your involvement. Distinguish decisions that genuinely need your authority from those reaching you because ownership, information or boundaries are unclear.',
    relevantLink: {
      label: 'Run the Bottleneck Self-Test',
      target: 'test',
      path: '/assessment'
    }
  },
  {
    id: 'faq-8',
    number: 8,
    category: 'founder-dependency',
    categoryLabel: 'Founder Dependency & Delegation',
    question: 'How can a business reduce founder dependency without losing control?',
    answer: 'A business can reduce founder dependency by defining outcomes, assigning accountable owners and establishing clear decision boundaries. Leaders retain oversight through agreed measures, review points and escalation triggers rather than approving every action. The objective is to distribute appropriate authority while preserving visibility into performance, material risks and strategic decisions.',
    relevantLink: {
      label: 'Explore Executive Playbooks & Blueprints',
      target: 'shop',
      path: '/shop'
    }
  },
  {
    id: 'faq-9',
    number: 9,
    category: 'founder-dependency',
    categoryLabel: 'Founder Dependency & Delegation',
    question: 'Why does my team still need my approval after I delegate?',
    answer: 'Your team may have responsibility for completing the work without authority to make the decisions it requires. Effective delegation clarifies the expected outcome, available resources, independent decisions and escalation conditions. At The Unbounded Leadership Co., we distinguish between handing over tasks and defining the boundaries within which another person can genuinely own a result.',
    relevantLink: {
      label: 'Read Dispatch on Boundary Covenants',
      target: 'library',
      path: '/library'
    }
  },
  {
    id: 'faq-10',
    number: 10,
    category: 'founder-dependency',
    categoryLabel: 'Founder Dependency & Delegation',
    question: 'What is the difference between delegating tasks and delegating outcomes?',
    answer: 'Delegating a task assigns an activity, such as preparing a proposal. Delegating an outcome assigns responsibility for a defined result, such as progressing a proposal to a clear customer decision. Outcome ownership also requires appropriate authority, resources and boundaries. Without these, the person may remain dependent on the leader despite being accountable for the result.',
    relevantLink: {
      label: 'View Phase 2 Forensic Diagnostic',
      target: 'diagnostic',
      path: '/diagnostic'
    }
  },
  {
    id: 'faq-11',
    number: 11,
    category: 'founder-dependency',
    categoryLabel: 'Founder Dependency & Delegation',
    question: 'How can a founder step back from daily operations without becoming disconnected?',
    answer: 'A founder can step back by separating strategic responsibilities from operational decisions and assigning appropriate ownership for each. Agreed reporting, review rhythms and escalation thresholds provide visibility without requiring constant involvement. The aim is not absence; it is a more deliberate role in which the founder contributes where their judgement creates the most value.',
    relevantLink: {
      label: 'Watch Founder Video Briefing',
      target: 'briefing',
      path: '/briefing'
    }
  },

  // Category 3: Accountability and Team Ownership
  {
    id: 'faq-12',
    number: 12,
    category: 'accountability',
    categoryLabel: 'Accountability & Team Ownership',
    question: 'How do you create accountability without micromanaging?',
    answer: 'Accountability starts with a clear outcome, a named owner, appropriate authority and an agreed review process. Micromanagement occurs when the leader unnecessarily controls how every step is performed. To strengthen accountability, clarify what success looks like, establish boundaries and review progress at agreed points rather than becoming the approval stage for every action.',
    relevantLink: {
      label: 'Explore Systems & Toolkits',
      target: 'shop',
      path: '/shop'
    }
  },
  {
    id: 'faq-13',
    number: 13,
    category: 'accountability',
    categoryLabel: 'Accountability & Team Ownership',
    question: 'Why does my team complete tasks but not take ownership?',
    answer: 'A team may complete tasks without taking ownership when expectations emphasise activities rather than results, or when decision authority remains unclear. Before attributing the problem to motivation, check whether people understand the outcome, can influence the dependencies and have the capability and authority to act. Ownership requires a workable agreement, not simply an instruction to “be more accountable.”',
    relevantLink: {
      label: 'Review Case Studies & Performance Logs',
      target: 'case-studies',
      path: '/case-studies'
    }
  },
  {
    id: 'faq-14',
    number: 14,
    category: 'accountability',
    categoryLabel: 'Accountability & Team Ownership',
    question: 'Why am I constantly fixing my team’s work?',
    answer: 'Repeatedly fixing work can indicate unclear standards, capability gaps, insufficient resources or poorly defined responsibilities. Start by checking whether the expected quality and decision criteria were clear before work began. Make standards explicit, use appropriate early checkpoints and ask the owner to propose corrections before automatically taking the responsibility back.',
    relevantLink: {
      label: 'Explore Forensic Diagnostic',
      target: 'diagnostic',
      path: '/diagnostic'
    }
  },
  {
    id: 'faq-15',
    number: 15,
    category: 'accountability',
    categoryLabel: 'Accountability & Team Ownership',
    question: 'What are decision rights, and why do they matter?',
    answer: 'Decision rights define who can make a decision, who must contribute, who approves it when necessary and who needs to be informed. Clear decision rights help teams distinguish independent action from consultation and escalation. They are especially useful when responsibilities overlap or when several leaders believe they have final authority.',
    relevantLink: {
      label: 'Read Systemic Integrity Principles',
      target: 'domains',
      path: '/domains'
    }
  },

  // Category 4: Strategic Alignment and Global Leadership
  {
    id: 'faq-16',
    number: 16,
    category: 'strategic-alignment',
    categoryLabel: 'Strategic Alignment & Global Leadership',
    question: 'What is organisational alignment?',
    answer: 'Organisational alignment means that strategy, leadership decisions, responsibilities and everyday execution support the same priorities. Alignment requires more than agreement in meetings. People need a shared understanding of the outcomes that matter, the trade-offs they can make and how their responsibilities connect to the organisation’s direction.',
    relevantLink: {
      label: 'View 5 Core Domains of Decoupled Leadership',
      target: 'domains',
      path: '/domains'
    }
  },
  {
    id: 'faq-17',
    number: 17,
    category: 'strategic-alignment',
    categoryLabel: 'Strategic Alignment & Global Leadership',
    question: 'Why does execution break down even when the leadership team agrees on the strategy?',
    answer: 'Execution can break down when agreement is not translated into clear ownership, resource decisions, priorities and measures. Leaders may interpret the same strategy differently or leave competing commitments unresolved. The next step is to clarify who owns each outcome, what must change operationally and how progress and exceptions will be reviewed.',
    relevantLink: {
      label: 'Read Intelligence Dispatches',
      target: 'library',
      path: '/library'
    }
  },
  {
    id: 'faq-18',
    number: 18,
    category: 'strategic-alignment',
    categoryLabel: 'Strategic Alignment & Global Leadership',
    question: 'How can global leadership teams improve alignment across countries and time zones?',
    answer: 'Global leadership teams can improve alignment by making decision ownership, shared priorities, handoffs and escalation expectations explicit. They should distinguish decisions requiring organisation-wide consistency from those best made locally. Written decision records and agreed review practices can support coordination without requiring every issue to wait for a meeting attended by all regions.',
    relevantLink: {
      label: 'Explore Retainer & Fractional COO Mandates',
      target: 'partnerships',
      path: '/services'
    }
  },
  {
    id: 'faq-19',
    number: 19,
    category: 'strategic-alignment',
    categoryLabel: 'Strategic Alignment & Global Leadership',
    question: 'How do you balance global consistency with local decision-making?',
    answer: 'Start by identifying what must remain consistent, such as strategic direction, ethical standards and required controls. Then define where local leaders can adapt decisions to their markets and operating conditions. The objective is clear boundaries: local autonomy where appropriate, with explicit escalation when a decision affects wider organisational commitments or risks.',
    relevantLink: {
      label: 'Read Moral Gravity & Governance Blueprint',
      target: 'domains',
      path: '/domains'
    }
  },
  {
    id: 'faq-20',
    number: 20,
    category: 'strategic-alignment',
    categoryLabel: 'Strategic Alignment & Global Leadership',
    question: 'What is strategic bandwidth?',
    answer: 'Strategic bandwidth is the leadership attention available for consequential work such as direction-setting, organisational design and major decisions. It becomes constrained when leaders spend excessive time on recurring approvals, avoidable escalations and repeated problem-solving. Reclaiming strategic bandwidth means examining why those demands arise and which responsibilities can be owned elsewhere.',
    relevantLink: {
      label: 'Calculate Restored CEO Bandwidth',
      target: 'test',
      path: '/assessment'
    }
  },

  // Category 5: Our Approach and Engagements
  {
    id: 'faq-21',
    number: 21,
    category: 'approach',
    categoryLabel: 'Our Approach & Engagements',
    question: 'How does The Unbounded Leadership Co. approach organisational transformation?',
    answer: 'The Unbounded Leadership Co. uses an Alignment Protocol with three stages: Baseline Audit, Structural Transformation and Sustained Alignment. The approach begins by examining the organisation’s current leadership structure and sources of friction, then addresses structural priorities and the practices needed to maintain alignment. The focus is on moving beyond repeated individual intervention.',
    relevantLink: {
      label: 'Review 3 Engagement Pathways',
      target: 'partnerships',
      path: '/services'
    }
  },
  {
    id: 'faq-22',
    number: 22,
    category: 'approach',
    categoryLabel: 'Our Approach & Engagements',
    question: 'What are the five aligned domains of leadership?',
    answer: 'The Unbounded Leadership Co.’s five aligned domains are Cognitive Clarity, Systemic Integrity, Strategic Velocity, Moral Gravity and Cultural Fidelity. Together, they provide a framework for examining decision-making, organisational structure, execution, ethical foundations and the connection between leadership intent and everyday behaviour.',
    relevantLink: {
      label: 'Explore Architecture Guide & Domains',
      target: 'domains',
      path: '/domains'
    }
  },
  {
    id: 'faq-23',
    number: 23,
    category: 'approach',
    categoryLabel: 'Our Approach & Engagements',
    question: 'Can leadership architecture help a growing business scale?',
    answer: 'Leadership architecture can support a growing business by clarifying how decisions, accountability and coordination should work as complexity increases. The focus is on identifying where existing ways of working still depend on a small number of people and establishing appropriate ownership across the organisation. The required changes depend on the business’s stage, structure and risks.',
    relevantLink: {
      label: 'Explore Systems-Driven Scale Tracks',
      target: 'partnerships',
      path: '/services'
    }
  },
  {
    id: 'faq-24',
    number: 24,
    category: 'approach',
    categoryLabel: 'Our Approach & Engagements',
    question: 'How can family offices benefit from clearer leadership structures?',
    answer: 'Family offices can use clearer leadership structures to distinguish strategic direction, operational responsibilities and decision authority. This can help make expectations explicit where family stakeholders, executives and advisers have different roles. Leadership architecture addresses organisational clarity; it does not replace specialist legal, tax, investment or fiduciary advice.',
    relevantLink: {
      label: 'Initiate Confidential Advisory Dialogue',
      target: 'contact',
      path: '/contact'
    }
  },
  {
    id: 'faq-25',
    number: 25,
    category: 'approach',
    categoryLabel: 'Our Approach & Engagements',
    question: 'What results should an organisation look for from leadership architecture work?',
    answer: 'Relevant measures may include fewer avoidable escalations, clearer decision ownership, less waiting for routine approvals and more leadership attention available for strategic work. The appropriate measures should be agreed against an initial baseline. Outcomes depend on the organisation’s starting conditions, the scope of the work and how consistently changes are implemented.',
    relevantLink: {
      label: 'View Measured Case Proof & Performance',
      target: 'case-studies',
      path: '/case-studies'
    }
  },
  {
    id: 'faq-26',
    number: 26,
    category: 'approach',
    categoryLabel: 'Our Approach & Engagements',
    question: 'How do I know whether my organisation needs leadership architecture support?',
    answer: 'Leadership architecture support may be relevant if growth has increased complexity, responsibilities overlap, execution repeatedly stalls or the founder remains central to routine decisions. It is also worth considering when leaders agree on direction but struggle to establish consistent ownership. A useful starting point is identifying which recurring problems stem from unclear structures rather than isolated performance issues.',
    relevantLink: {
      label: 'Take Complimentary 60-Second Assessment',
      target: 'test',
      path: '/assessment'
    }
  },
  {
    id: 'faq-27',
    number: 27,
    category: 'approach',
    categoryLabel: 'Our Approach & Engagements',
    question: 'How can I contact The Unbounded Leadership Co.?',
    answer: 'Visit theunboundedleadership.com to explore our approach and use the contact options provided on the website. When making an enquiry, describe your organisation, the leadership challenge you are addressing and the decisions or outcomes that currently depend too heavily on individual intervention.',
    relevantLink: {
      label: 'Open Confidential Advisory Desk',
      target: 'contact',
      path: '/contact'
    }
  }
];

export const getFaqsByCategory = (category: string) => {
  if (category === 'all') return FAQ_ITEMS;
  return FAQ_ITEMS.filter((item) => item.category === category);
};

export const getFaqSubset = (ids: string[]) => {
  return FAQ_ITEMS.filter((item) => ids.includes(item.id));
};
