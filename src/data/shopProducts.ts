export interface ProductModule {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  keyInsight: string;
}

export interface EarlyBirdTier {
  badge: string;
  discountPercent: number;
  seatsRemaining: number;
  originalPriceUsd: number;
  earlyBirdPriceUsd: number;
  bonusTitle: string;
  bonusValue: string;
  expirationNote: string;
}

export interface ShopProduct {
  id: string;
  assetNumber: string;
  title: string;
  tagline: string;
  category: string;
  badge?: string;
  format: string;
  formatIcon: string;
  installTime: string;
  timeToResult: string;
  targetAudience: string;
  coreProblemSolved: string;
  
  // TULC Architecture Framework: Operational Truth -> The Architecture -> The Outcome
  harshTruth: {
    brutalReality: string;
    egoTrap: string;
    unfilteredDiagnosis: string;
  };
  theWeapon: {
    leverageMechanism: string;
    rulesOfEngagement: string[];
    executiveLaw: string;
  };
  theOutcome: {
    tangibleResult: string;
    immediateImpact: string;
    deliverables: string[];
    modules: ProductModule[];
  };

  // Legacy mappings for backwards-compatibility
  why: {
    unspokenPain: string;
    coreBelief: string;
    philosophicalShift: string;
  };
  how: {
    systemicMechanism: string;
    architecturalRules: string[];
    governancePrinciple: string;
  };
  what: {
    tangibleAsset: string;
    includedFiles: string[];
    modules: ProductModule[];
  };

  earlyBird: EarlyBirdTier;

  pricing: {
    usd: number;
    originalUsd: number;
    eur: number;
    gbp: number;
    inr: number;
    aed: number;
    estimatedBandwidthSavingsAnnualUsd: number;
  };

  socialProof: {
    quote: string;
    author: string;
    title: string;
    metric: string;
  };

  guaranteeText: string;
}

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'asset-00-founder-severance-starter-pack',
    assetNumber: 'ENTRY WEAPON',
    title: 'The 72-Hour Founder Severance Protocol & Delegation Filter',
    tagline: 'An agile, low-risk operational filter to test your firm’s autonomy. Cut micro-decision drag and empower team leads under $5,000.',
    category: 'Bandwidth Architecture',
    badge: 'Starter Gateway • Under $100',
    format: 'Notion Quick-Deploy + Delegation Triage Tree + PDF Checklist',
    formatIcon: 'FileCode',
    installTime: '15 minutes flat',
    timeToResult: 'Within 24 hours',
    targetAudience: 'Founders and managing partners seeking an immediate, low-friction tool to stop fielding tactical approvals.',
    coreProblemSolved: 'Establishes clear delegation ceilings and decision filters so your leadership team resolves operational problems autonomously.',
    harshTruth: {
      brutalReality: 'If your team asks permission for expenditures under $5,000 or basic process adjustments, you do not have a team—you have a bottleneck centered directly on your inbox.',
      egoTrap: 'Believing that signing off on every tactical invoice or copy change maintains quality, when in reality it trains your executive bench to abdicate responsibility.',
      unfilteredDiagnosis: 'The fastest path to executive burnout is acting as the universal approval checkpoint for a company with capable department leads.'
    },
    theWeapon: {
      leverageMechanism: 'A binary Single-Page Delegation Covenant and 72-Hour Severance Audit that forces decisions downward with mathematical governance.',
      rulesOfEngagement: [
        'Rule 1: Under $5,000 expenditure with clear ROI requires zero executive sign-off.',
        'Rule 2: Type-2 reversible decisions are executed without prior permission.',
        'Rule 3: If an issue escalates to your desk, the lead must submit 2 viable solutions and a chosen path.'
      ],
      executiveLaw: 'Delegate authority, not just tasks. When you withhold decision rights, you purchase operational inertia with your own life.'
    },
    theOutcome: {
      tangibleResult: 'Immediately eliminate 4 to 8 hours of tactical approvals and low-level inquiries each week.',
      immediateImpact: 'Empowered team leads who make decisions with owner-level conviction while your mental bandwidth stays preserved.',
      deliverables: [
        'Interactive Notion Delegation Filter (1-Click Workspace Duplicate)',
        'Printable Executive Delegation Covenant Template',
        '72-Hour Founder Absence Readiness Audit',
        'Word-for-Word Team Delegation Rollout Script'
      ],
      modules: [
        {
          number: '01',
          title: 'The Expenditure & Authority Matrix',
          subtitle: 'Define Clear Spending & Hiring Ceilings',
          description: 'A pre-calibrated matrix assigning exact fiscal and strategic approval limits across VPs, managers, and team leads.',
          deliverables: ['Authorization threshold table', 'Exception protocol sheet'],
          keyInsight: '80% of approval pings can be permanently eliminated with explicit numerical thresholds.'
        },
        {
          number: '02',
          title: 'The 72-Hour Severance Test',
          subtitle: 'Audit Team Autonomy in 3 Days',
          description: 'A structured 72-hour trial run where founders step back from Slack and email to expose operational fragility safely.',
          deliverables: ['Severance simulation checklist', 'Post-test vulnerability diagnostic'],
          keyInsight: 'You cannot fix what breaks in your absence until you deliberately step back to let it surface.'
        }
      ]
    },
    why: {
      unspokenPain: 'Micro-approvals secretly bleed the mental stamina required for high-stakes enterprise strategy.',
      coreBelief: 'Great leaders construct self-governing guardrails rather than personal tollbooths.',
      philosophicalShift: 'From approving daily details to designing the parameters within which high-performers thrive.'
    },
    how: {
      systemicMechanism: 'Binary decision logic and pre-authorized delegation parameters that protect founder cognition.',
      architecturalRules: [
        'Decide once: create the parameter so you never have to answer the question again.',
        'Reward autonomous decisions even when minor errors occur.'
      ],
      governancePrinciple: 'Autonomy without guardrails is anarchy; guardrails without autonomy is prison.'
    },
    what: {
      tangibleAsset: 'Instant-access Notion workspace and PDF delegation contract with team rollout scripts.',
      includedFiles: [
        'Notion Delegation Master Workspace',
        'Printable Executive Covenant Guide',
        '72-Hour Severance Simulation Protocol'
      ],
      modules: []
    },
    earlyBird: {
      badge: 'Lead Gateway • Under $30',
      discountPercent: 82,
      seatsRemaining: 12,
      originalPriceUsd: 150,
      earlyBirdPriceUsd: 27,
      bonusTitle: 'Bonus: The 1-Page Delegation Contract Template',
      bonusValue: '$95 Value Included Free',
      expirationNote: 'Introductory lead-generation gateway rate open at $27.'
    },
    pricing: {
      usd: 27,
      originalUsd: 150,
      eur: 25,
      gbp: 22,
      inr: 1999,
      aed: 99,
      estimatedBandwidthSavingsAnnualUsd: 95000
    },
    socialProof: {
      quote: 'Installing this single delegation protocol cleared 6 hours of invoice and contract approvals out of my week immediately.',
      author: 'Karan Mehra',
      title: 'Founder & CEO, ScaleOps Logistics',
      metric: '6 Hours Saved First Week'
    },
    guaranteeText: 'The TULC Performance Commitment: Deploy this delegation filter with your managers. If you do not reclaim immediate focus within 14 days, contact our advisory desk for an immediate full refund.'
  },
  {
    id: 'asset-01-bandwidth-reclamation-os',
    assetNumber: '01/05',
    title: 'The 15-Hour Founder Bandwidth Reclamation OS',
    tagline: 'Eliminate tactical communication drag and redundant status meetings. Reclaim 15 hours of executive focus this week.',
    category: 'Bandwidth Architecture',
    badge: 'High Demand • 4 Early Bird Spots Left',
    format: 'Turnkey Notion Master + Coda OS + Executive Walkthrough',
    formatIcon: 'FileCode',
    installTime: '35 minutes flat',
    timeToResult: 'Within 72 hours',
    targetAudience: 'Founders and CEOs billing $500–$2,500/hr whose days are consumed by operational inquiries that documented guidelines should resolve.',
    coreProblemSolved: 'Filters calendar requests, transitions status reporting to asynchronous briefs, and equips teams to present solutions rather than open-ended questions.',
    
    harshTruth: {
      brutalReality: 'Working 70-hour weeks is rarely an indicator of business complexity—it is the natural symptom of missing operational boundaries. When an executive answers every inquiry within seconds, the organization learns to rely on founder reflexes rather than autonomous systems.',
      egoTrap: 'Resolving every crisis personally provides immediate reassurance, but being the central problem-solver unintentionally creates the ceiling that caps enterprise valuation.',
      unfilteredDiagnosis: 'If daily operations pause whenever you are unreachable, the firm carries critical key-person risk. Sustainable enterprise value requires an organization that executes on documented architecture.'
    },
    theWeapon: {
      leverageMechanism: 'A deterministic 4-Lane Triage Matrix and Asynchronous Exception Protocol that bars low-leverage requests from ever reaching your desk.',
      rulesOfEngagement: [
        'Rule 1: If it can be written in 5 bullet points, it is banned from the calendar. Period.',
        'Rule 2: Never accept a meeting where someone asks "what should we do?" They bring 2 options and a recommendation, or the meeting is canceled.',
        'Rule 3: The 4-D Defense: Delete, Delegate, Delay, Diminish. Any recurring meeting older than 30 days must fight for its life.',
        'Rule 4: Sunday Async Dispatch replaces Monday morning verbal rambling.'
      ],
      executiveLaw: 'Meetings should never be forums for open-ended speculation. They exist to unblock key decisions when the analysis is complete. Protect your calendar, or operations will consume it by default.'
    },
    theOutcome: {
      tangibleResult: 'Reclaim up to 15 hours every single week. Free your calendar while your leadership team executes with razor-sharp autonomy.',
      immediateImpact: 'Instant $360,000+ annual reclaimed cognitive equity. Zero frantic Slack fires after 6:00 PM.',
      deliverables: [
        'Interactive Notion Bandwidth OS (1-Click Workspace Duplicate)',
        'Coda Master Production Workspace',
        'Executive Loom Scripts for Team Rollout (High-Adoption Briefing Framework)',
        'Desk Triage Reference Card for Executive Assistants',
        '38-Minute High-Leverage Masterclass Walkthrough'
      ],
      modules: [
        {
          number: '01',
          title: 'The 4-Lane Triage Matrix',
          subtitle: 'The Ingress Filter That Shields Your Brain',
          description: 'A mathematical decision tree that categorizes every incoming request, email, and task before it ever touches your eyes.',
          deliverables: ['Automated drag-and-drop kanban', 'Context handover templates', 'Elimination criteria checklist'],
          keyInsight: '85% of what lands on your desk requires an authorization threshold, not your creative energy.'
        },
        {
          number: '02',
          title: 'The Async Weekly Sync Protocol',
          subtitle: 'Kills the 1-Hour Monday Status Meeting',
          description: 'Replaces verbal status round-robins with a structured Sunday written brief and a 12-minute exception-only clinic.',
          deliverables: ['Sunday sync schema', 'Exception escalation trigger', 'Automated Slack/Teams notification bot scripts'],
          keyInsight: 'Status updates belong in text. Conversations are reserved for closing deals and unblocking bottlenecks.'
        },
        {
          number: '03',
          title: 'The Calendar Guillotine',
          subtitle: 'Execution Protocol for Recurring Calendar Drain',
          description: 'Forensic calendar pruning protocol that strips 8 to 12 hours of zombie meetings off your schedule in your first 48 hours.',
          deliverables: ['Meeting kill audit sheet', 'Diplomatic declination templates', 'Time-block fortress schedule grid'],
          keyInsight: 'Every unassigned hour on your calendar will be stolen by someone else’s lack of preparation.'
        },
        {
          number: '04',
          title: 'Team Onboarding Script & Autonomy Agreement',
          subtitle: 'Roll It Out in 48 Hours Without Friction',
          description: 'Word-for-word executive scripts that position this shift not as micromanagement, but as handing them the keys to execute like owners.',
          deliverables: ['4-minute team video script', 'Internal lead FAQ', 'Slack launch announcement'],
          keyInsight: 'When you make their autonomy dependent on clear written inputs, execution speed triples.'
        },
        {
          number: '05',
          title: 'Sovereign Reclaimed Hours Telemetry',
          subtitle: 'Track Your Saved Hours in Hard Dollars',
          description: 'Live scorecard measuring hours clawed back, decision cycle acceleration, and executive bandwidth ROI over 30, 60, and 90 days.',
          deliverables: ['Weekly bandwidth reclamation tracker', 'Cognitive equity balance sheet', 'Diagnostic benchmark dashboard'],
          keyInsight: 'Every hour you take back from operational sludge is an hour poured into revenue offense.'
        }
      ]
    },

    // Legacy wrappers for seamless compatibility
    why: {
      unspokenPain: 'Working 70-hour weeks is rarely an indicator of business complexity; it is the natural consequence of missing operational filters between executive attention and routine coordination.',
      coreBelief: 'You didn’t build an enterprise to spend your days answering tactical pings. Deliberate systems ensure you direct the firm rather than react to it.',
      philosophicalShift: 'From the reactive firefighter responding to every ping, to the strategic architect whose operating systems handle routine execution.'
    },
    how: {
      systemicMechanism: 'A deterministic 4-Lane Triage Matrix and Asynchronous Exception Protocol that bars low-leverage requests from ever reaching your desk.',
      architecturalRules: [
        'If it can be written in 5 bullet points, it is banned from the calendar.',
        'Never accept a meeting where someone asks "what should we do?" They bring options, or they don’t get your time.',
        'The 4-D Defense: Delete, Delegate, Delay, Diminish zombie meetings.',
        'Sunday Async Dispatch replaces Monday morning verbal rambling.'
      ],
      governancePrinciple: 'Your time is worth $1,000/hour. Stop giving it away for free to solve $20 problems.'
    },
    what: {
      tangibleAsset: 'Complete Turnkey Notion & Coda Bandwidth OS with 5 production modules, team onboarding scripts, and executive walkthrough.',
      includedFiles: [
        'Turnkey Notion Master Workspace (1-Click Duplicate)',
        'Coda Master Production Workspace',
        'Executive Video Masterclass with Suchita Sancheti',
        'Word-for-Word Team Rollout Loom Scripts',
        'Printable Executive Triage Desk Card'
      ],
      modules: []
    },

    earlyBird: {
      badge: 'Irresistible Value • Save 15 Hrs/Wk',
      discountPercent: 84,
      seatsRemaining: 7,
      originalPriceUsd: 290,
      earlyBirdPriceUsd: 47,
      bonusTitle: 'Bonus: The 15-Minute Executive Morning Ritual Guide',
      bonusValue: '$195 Value Included Free',
      expirationNote: 'Lead-generation allocation open at $47 (Save $243 today).'
    },

    pricing: {
      usd: 47,
      originalUsd: 290,
      eur: 44,
      gbp: 38,
      inr: 3499,
      aed: 172,
      estimatedBandwidthSavingsAnnualUsd: 360000
    },

    socialProof: {
      quote: 'I got 17 hours back in my very first week. My team stopped treating me like a search engine and started making decisions on their own.',
      author: 'Marcus Vance',
      title: 'Founder & CEO, Series B Fintech ($32M ARR)',
      metric: '17 Hours/Week Reclaimed'
    },

    guaranteeText: 'The TULC Performance Commitment: Deploy this system across your team. If it does not provide demonstrable, measurable executive bandwidth within your first 14 days, contact our advisory desk for an immediate courtesy refund. We stand behind our architecture without reservation.'
  },

  {
    id: 'asset-02-30-day-decoupling-runbook',
    assetNumber: '02/05',
    title: 'The 30-Day Decoupling Runbook & Continuity Insurance',
    tagline: 'Disappear for 30 straight days. Return to a company that grew without you instead of one that collapsed.',
    category: 'Continuity & Decoupling',
    badge: 'Critical Asset • 3 Early Bird Spots',
    format: 'Executive Playbook (PDF/Word) + Notion Continuity Vault',
    formatIcon: 'ShieldCheck',
    installTime: '60 minutes',
    timeToResult: '14 days to first test',
    targetAudience: 'Visionary founders who hesitate to step away because operations still rely heavily on their personal real-time oversight.',
    coreProblemSolved: 'Eradicates single-point founder failure, codifies strategic principles into operational rules, and establishes true institutional independence.',

    harshTruth: {
      brutalReality: 'If a company cannot function smoothly during a 30-day founder absence, it lacks institutional continuity. True enterprise ownership means building a firm that thrives without your daily tactical presence.',
      egoTrap: 'Believing that only the founder can manage critical relationships or make key calls is understandable, but it reflects uncodified knowledge rather than an irreplaceable skill.',
      unfilteredDiagnosis: 'Institutional acquirers and investors discount valuations when key-person dependency is high. Systematically decoupling founder oversight is the fastest path to expanding enterprise equity.'
    },
    theWeapon: {
      leverageMechanism: 'A battle-tested 4-week systematic decoupling drill with delegated authority thresholds and emergency protocol triggers.',
      rulesOfEngagement: [
        'Week 1: Silent Observation. You attend meetings on mute; your second-in-command drives.',
        'Week 2: 72-Hour Severance Drill. Zero Slack, zero email. The firm must run on written SOPs.',
        'Week 3: Financial & Legal Ceilings. Exact dollar thresholds where team signs off without you.',
        'Week 4: 14-Day Disappearance. Proving institutional durability before full 30-day exit.'
      ],
      executiveLaw: 'The measure of real power is that things move because you built the machine, not because you are turning the crank by hand.'
    },
    theOutcome: {
      tangibleResult: 'Step away for 30 days without checking Slack once. Your enterprise continues closing deals, executing sprints, and generating cash flow.',
      immediateImpact: 'Instant 2x–3x enterprise multiple expansion when private equity or strategic acquirers evaluate key-person risk.',
      deliverables: [
        'Complete 30-Day Decoupling Playbook (Executive PDF & Notion Vault)',
        'Delegated Financial & Contractual Signing Authority Matrix',
        'Emergency Red-Phone Protocol (Defines true structural emergencies vs routine operational noise)',
        'Second-in-Command Shadowing Guidebook',
        'Board Continuity & Succession Briefing Deck'
      ],
      modules: [
        {
          number: '01',
          title: 'The Single-Point-of-Failure Audit',
          subtitle: 'Map Every Wire That Runs Exclusively Into Your Head',
          description: 'Uncovers the 12 invisible operational dependencies where approvals, logins, vendor ties, and client relationships stall if you vanish.',
          deliverables: ['Vulnerability heat map', 'Key-person exposure index', 'Immediate de-risking roadmap'],
          keyInsight: 'The things you assume your team knows are almost always trapped exclusively in your head.'
        },
        {
          number: '02',
          title: 'Statutory Delegation Authority Ceilings',
          subtitle: 'Giving Them Clear Spending & Signing Power',
          description: 'Hard financial thresholds ($5K, $25K, $100K) and contractual rules so directors make binding decisions without seeking your blessing.',
          deliverables: ['Financial sign-off matrix', 'Client concession playbook', 'Hiring authority boundaries'],
          keyInsight: 'Hesitation occurs when authority limits are fuzzy. Clear boundaries create fearless execution.'
        },
        {
          number: '03',
          title: 'The Emergency "Red Phone" Protocol',
          subtitle: 'Strict Filters for Breaking Founder Radio Silence',
          description: 'Defines the exact 3 conditions where a founder can be contacted during absence. Everything else is handled by the operational leads.',
          deliverables: ['Escalation triage chart', 'Emergency contact runbook', 'Incident log template'],
          keyInsight: 'If everything is urgent, your leadership team is running on fear instead of architecture.'
        },
        {
          number: '04',
          title: 'The 4-Stage Progressive Decoupling Drill',
          subtitle: 'From 48-Hour Test to 30-Day Absence',
          description: 'A phased stress-test protocol: 2 days offline, then 5 days, then 14 days, leading to complete 30-day sovereign operation.',
          deliverables: ['Drill schedule & milestones', 'Debrief scorecard', 'Post-absence friction audit'],
          keyInsight: 'You don’t test an parachute at 10,000 feet. You build tolerance through staged stress tests.'
        },
        {
          number: '05',
          title: 'The Acquirer’s Key-Person Risk Insurance Brief',
          subtitle: 'Documenting Continuity for Institutional Investors',
          description: 'Executive documentation ready for board meetings or M&A due diligence proving the enterprise operates independently of the founder.',
          deliverables: ['Due diligence binder template', 'Operational redundancy statement', 'Board resolution packet'],
          keyInsight: 'Investors don’t buy genius founders. They buy cash flow machines with zero key-man risk.'
        }
      ]
    },

    why: {
      unspokenPain: 'If daily operations stall when you step away, your business is carrying severe key-person risk. Long-term equity requires building institutional continuity.',
      coreBelief: 'True leadership authority is proven by your absence, never your perpetual presence.',
      philosophicalShift: 'From indispensable bottleneck to sovereign equity owner.'
    },
    how: {
      systemicMechanism: 'A battle-tested 4-week systematic decoupling drill with delegated authority thresholds and emergency protocol triggers.',
      architecturalRules: [
        'Week 1: Silent Observation.',
        'Week 2: 72-Hour Severance Drill.',
        'Week 3: Financial & Legal Ceilings.',
        'Week 4: 14-Day Disappearance.'
      ],
      governancePrinciple: 'Real enterprise equity exists only when the business creates value without the founder’s hands on the wheel.'
    },
    what: {
      tangibleAsset: 'The Complete 30-Day Decoupling Runbook & Continuity Insurance Vault (PDF, Notion, and Board Briefing Pack).',
      includedFiles: [
        '30-Day Decoupling Runbook (Interactive Notion & Coda)',
        'Executive PDF Playbook (48 Pages)',
        'Delegated Authority Matrix',
        'Emergency Red-Phone Protocol Guide',
        'M&A Key-Person Risk Assessment Deck'
      ],
      modules: []
    },

    earlyBird: {
      badge: 'Decoupling Weapon • Save 81%',
      discountPercent: 81,
      seatsRemaining: 5,
      originalPriceUsd: 350,
      earlyBirdPriceUsd: 67,
      bonusTitle: 'Bonus: Private Equity Continuity Due Diligence Checklist',
      bonusValue: '$295 Value Included Free',
      expirationNote: 'Lead-generation allocation open at $67.'
    },

    pricing: {
      usd: 67,
      originalUsd: 350,
      eur: 62,
      gbp: 54,
      inr: 4999,
      aed: 245,
      estimatedBandwidthSavingsAnnualUsd: 520000
    },

    socialProof: {
      quote: 'I took my family to Japan for 3 weeks with zero phone calls. Revenue actually beat target while I was gone. This runbook changed my life.',
      author: 'David Sterling',
      title: 'Founder, Apex Logistics Group ($48M Turnover)',
      metric: '21 Days Offline With 104% Target'
    },

    guaranteeText: 'The TULC Performance Commitment: Run the 4-week decoupling drill. If your second-in-command is not executing with enhanced institutional autonomy within 30 days, notify us for a prompt, friction-free refund.'
  },

  {
    id: 'asset-03-decision-guardrails-matrix',
    assetNumber: '03/05',
    title: 'The Cross-Functional Decision Guardrails Matrix',
    tagline: 'Kill the 3-week committee bottleneck. Force 85% of decisions to close in under 72 hours.',
    category: 'Decision Architecture',
    badge: 'Velocity Multiplier • 5 Early Bird Spots',
    format: 'Figma Canvas + Miro Board + Notion Decision OS',
    formatIcon: 'GitPullRequest',
    installTime: '45 minutes',
    timeToResult: 'Instant on next decision',
    targetAudience: 'Leaders who watch multi-million dollar initiatives stall for weeks because departments keep passing the buck.',
    coreProblemSolved: 'Eliminates cross-department stalemates, Type-1 vs Type-2 decision confusion, and prolonged consensus loops.',

    harshTruth: {
      brutalReality: 'Over-reliance on consensus dilutes accountability. When decision rights are ambiguous, teams naturally default to endless discussion and committee reviews rather than decisive execution.',
      egoTrap: 'Seeking input is healthy, but open-ended deliberation without a clear decision owner slows organizational velocity and obscures individual ownership.',
      unfilteredDiagnosis: 'The vast majority of operational decisions are reversible two-way doors. Treating routine choices like permanent risks drains momentum and lets faster organizations outpace you.'
    },
    theWeapon: {
      leverageMechanism: 'A mathematical Type-1 (One-Way Door) vs Type-2 (Two-Way Door) Decision Grid with hard 72-Hour Escalation Logic Gates.',
      rulesOfEngagement: [
        'Rule 1: If it can be reversed in 30 days for under $10K, the frontline lead makes the call immediately without asking.',
        'Rule 2: The 72-Hour Invariant: Disagreements escalate with a hard 72-hour timer. When the timer expires, the designated Single Directly Responsible Individual (DRI) rules.',
        'Rule 3: Disagree and Commit is standard institutional protocol. Once the call is made, the entire team executes behind the single direction.',
        'Rule 4: Zero consensus theater. We do not count votes; we assign ownership.'
      ],
      executiveLaw: 'Calculated risk is the cost of enterprise momentum. Clarify the thresholds, assign single-point ownership, and move forward without bureaucratic hesitation.'
    },
    theOutcome: {
      tangibleResult: 'Compress cross-functional decision cycles from 21 days to 72 hours. Ship product, sign partnerships, and execute marketing 3x faster.',
      immediateImpact: 'Eliminate 8–10 hours of circular debate meetings weekly across your senior engineering, sales, and product leaders.',
      deliverables: [
        'Interactive Figma Decision Architecture Board (Visual Flow)',
        'Miro Collaborative Canvas for Executive Team Alignment',
        'Notion Decision Log & 72-Hour Escalation Tracker',
        'Type-1 vs Type-2 Decision Diagnostic Cheat Sheet',
        'The DRI (Directly Responsible Individual) Operational Charter'
      ],
      modules: [
        {
          number: '01',
          title: 'The Reversibility Gate (Type 1 vs Type 2)',
          subtitle: 'Sort Permanent Risks from Reversible Bets',
          description: 'A fast diagnostic filter that categorizes decisions into one-way doors (slow, deliberate) vs two-way doors (fast, aggressive edge execution).',
          deliverables: ['Reversibility calculator', 'Risk severity scoring matrix', 'Frontline delegation rights checklist'],
          keyInsight: 'Speed beats precision on 85% of operational decisions.'
        },
        {
          number: '02',
          title: 'The 72-Hour Invariant Engine',
          subtitle: 'The Antidote to Indefinite Committee Drift',
          description: 'A strict protocol with built-in timers. When two department heads disagree, they have 72 hours to resolve or escalate to the DRI.',
          deliverables: ['Escalation workflow template', 'Timer-driven dispute protocol', 'Executive arbitration brief'],
          keyInsight: 'A bad decision made quickly is often cheaper than a great decision made 6 months too late.'
        },
        {
          number: '03',
          title: 'Single DRI Operational Charter',
          subtitle: 'Eradicate Ambiguous Decision Ownership Once and For All',
          description: 'Assigns singular decision rights for product, marketing, finance, and operations so there is never confusion about who owns the outcome.',
          deliverables: ['DRI role assignment schema', 'Accountability covenant', 'RACI replacement playbook'],
          keyInsight: 'When two people are responsible for an outcome, nobody is responsible.'
        },
        {
          number: '04',
          title: 'The Disagree-and-Commit Legal Codex',
          subtitle: 'Align Multi-Disciplinary Teams Behind Chosen Direction',
          description: 'A codified operational pact that obligates dissenters to throw 100% of their operational muscle behind the chosen path once decided.',
          deliverables: ['Commitment agreement template', 'Post-decision retrospective schema', 'Dissent documentation channel'],
          keyInsight: 'You can argue like you’re right, but when the gavel falls, you execute like you designed it.'
        },
        {
          number: '05',
          title: 'Executive Decision Velocity Telemetry',
          subtitle: 'Measure Cycle Time from Idea to Execution',
          description: 'An executive dashboard tracking average hours from decision proposal to execution start across all key business units.',
          deliverables: ['Velocity scorecard', 'Lagging indicator audit', 'Quarterly board speed report'],
          keyInsight: 'The company that iterates twice as fast learns twice as fast and eats everyone else.'
        }
      ]
    },

    why: {
      unspokenPain: 'Unstructured consensus loops bleed strategic momentum while more agile competitors capture market opportunities.',
      coreBelief: 'Speed is the ultimate competitive moat. When you remove consensus theater, execution explodes.',
      philosophicalShift: 'From protracted consensus loops to clear, single-owner decisive execution.'
    },
    how: {
      systemicMechanism: 'A mathematical Type-1 (One-Way Door) vs Type-2 (Two-Way Door) Decision Grid with hard 72-Hour Escalation Logic Gates.',
      architecturalRules: [
        'If it can be reversed in 30 days, make the call immediately.',
        'The 72-Hour Invariant: Disputes resolve or escalate on a hard timer.',
        'Disagree and Commit is non-negotiable law.',
        'Single DRI ownership replaces committee voting.'
      ],
      governancePrinciple: 'A wrong decision made in 2 days can be corrected. A decision delayed 2 months will bankrupt you.'
    },
    what: {
      tangibleAsset: 'The Complete Cross-Functional Decision Guardrails Matrix (Figma, Miro, and Notion Decision OS).',
      includedFiles: [
        'Interactive Figma Decision Architecture Board',
        'Miro Collaborative Canvas for Leadership Workshops',
        'Notion Decision Log & 72-Hour Escalation Engine',
        'Type-1 vs Type-2 Fast Reference Desk Card',
        'DRI Statutory Assignment Kit'
      ],
      modules: []
    },

    earlyBird: {
      badge: 'Decision Velocity • Save 79%',
      discountPercent: 79,
      seatsRemaining: 6,
      originalPriceUsd: 320,
      earlyBirdPriceUsd: 67,
      bonusTitle: 'Bonus: The 72-Hour Conflict Resolution Playbook',
      bonusValue: '$245 Value Included Free',
      expirationNote: 'Lead-generation allocation open at $67.'
    },

    pricing: {
      usd: 67,
      originalUsd: 320,
      eur: 62,
      gbp: 54,
      inr: 4999,
      aed: 245,
      estimatedBandwidthSavingsAnnualUsd: 280000
    },

    socialProof: {
      quote: 'We cut product feature rollout delays from 6 weeks of debate to 4 days flat. This single matrix saved our Q3 roadmap.',
      author: 'Elena Rostova',
      title: 'Chief Product Officer, Enterprise Cloud Platform',
      metric: '3.5x Decision Velocity'
    },

    guaranteeText: 'The TULC Performance Commitment: Deploy this matrix in your next executive meeting. If cross-functional decision cycles do not compress substantially within 30 days, reach out for an instant, full refund.'
  },

  {
    id: 'asset-04-c-suite-onboarding-codex',
    assetNumber: '04/05',
    title: 'The C-Suite Onboarding Codex & Performance Covenant',
    tagline: 'Protect your capital and culture when hiring senior leaders. Establish rigorous clarity from Day 1.',
    category: 'Executive Bench',
    badge: 'De-Risking Hires • 2 Early Bird Spots',
    format: '4-Document Executive Kit (PDF, Word, Notion)',
    formatIcon: 'UserCheck',
    installTime: '50 minutes',
    timeToResult: 'First 30 days of hire',
    targetAudience: 'CEOs who have experienced the costly setback of senior executive hires who struggle to translate past credentials into tangible company outcomes.',
    coreProblemSolved: 'De-risks executive onboarding, shortens the ramp-up curve, and establishes transparent milestones from the start.',

    harshTruth: {
      brutalReality: 'A misaligned executive hire costs months of lost momentum and significant capital. Relying on good intentions without structured milestones puts both the leader and the organization at risk.',
      egoTrap: 'Hiring impressive pedigrees without embedding them in clear operational boundaries leaves even exceptional leaders without the context needed to succeed.',
      unfilteredDiagnosis: 'Traditional executive onboarding is often too informal: weeks of introductory meetings without explicit 30/60/90-day deliverables or cultural non-negotiables.'
    },
    theWeapon: {
      leverageMechanism: 'A 4-part structured onboarding covenant that locks in 30/60/90-day deliverables, contextual DNA transfer, and explicit non-negotiables before their first day.',
      rulesOfEngagement: [
        'Document 1: The Context Codex. Download all unwritten company history, customer landmines, and cultural rules.',
        'Document 2: The 30/60/90 Contract. Not fluffy goals, but binary deliverables: either it shipped or it didn’t.',
        'Document 3: Cultural Non-Negotiables. The exact behaviors that protect team morale and operating rhythm.',
        'Document 4: The 45-Day Health Check. An objective score audit to identify alignment early before friction grows.'
      ],
      executiveLaw: 'Pedigree is a starting point, but execution defines leadership. Great leaders appreciate objective scorecards because clarity allows their real contribution to shine.'
    },
    theOutcome: {
      tangibleResult: 'New C-suite hires produce net-positive revenue output by Day 30 instead of Day 180. Cut executive mis-hire risk by 80%.',
      immediateImpact: 'Saves an estimated $300,000+ in potential executive turnover costs and protects team alignment.',
      deliverables: [
        'The Complete 4-Document Executive Onboarding Kit (Notion & Word)',
        '30/60/90-Day Binary Metric Performance Contract',
        'Cultural Non-Negotiables & Red-Line Behavior Protocol',
        'Executive Shadowing & Strategic Context Transfer Framework',
        '45-Day Leadership Calibration Evaluation Rubric'
      ],
      modules: [
        {
          number: '01',
          title: 'The Context Codex (Institutional DNA)',
          subtitle: 'Transferring 5 Years of Founder Brain in 48 Hours',
          description: 'A structured blueprint that documents your company’s unwritten history, past failed experiments, sacred customer relationships, and landmines.',
          deliverables: ['Institutional history questionnaire', 'Past post-mortems repository', 'Stakeholder landmine map'],
          keyInsight: 'New hires fail not from lack of intelligence, but from lack of historical context.'
        },
        {
          number: '02',
          title: 'The 30/60/90 Binary Milestone Contract',
          subtitle: 'No Fluff, No Hand-Waving, Just Evidence',
          description: 'Translates high-level executive responsibilities into clearly measurable, binary deliverables for the first three months.',
          deliverables: ['30-day quick win scorecard', '60-day process audit rubric', '90-day strategic output target'],
          keyInsight: 'If success cannot be measured in numbers and shipped assets, you cannot hold them accountable.'
        },
        {
          number: '03',
          title: 'The Red-Line Cultural Boundaries Charter',
          subtitle: 'Explicit Non-Negotiables and Behavioral Laws',
          description: 'Codifies the exact behaviors that are celebrated vs the political friction that disrupts execution speed.',
          deliverables: ['Cultural charter document', 'Leadership behavior standard', 'Team interaction covenant'],
          keyInsight: 'Culture is defined by the worst behavior leadership is willing to tolerate.'
        },
        {
          number: '04',
          title: 'The 45-Day Early-Warning Audit',
          subtitle: 'Calibrate Alignment Before Friction Multiplies',
          description: 'An objective review session at Day 45 that evaluates cultural fidelity, execution speed, and peer feedback with structured candor.',
          deliverables: ['360-degree feedback scorecard', 'Friction diagnostic checklist', 'Correction vs severance action plan'],
          keyInsight: 'Calibrate early when the data is clear. Leaving leadership ambiguity unresolved for 9 months compromises organizational velocity.'
        },
        {
          number: '05',
          title: 'Executive Autonomy Handover Protocol',
          subtitle: 'Stepping Back Without Losing Quality Control',
          description: 'The step-by-step gate to transfer budgetary, hiring, and operational authority to the new leader while keeping strict telemetry intact.',
          deliverables: ['Authority transition checklist', 'Reporting cadence contract', 'Board introduction brief'],
          keyInsight: 'Delegate the execution fully, but never abdicate the telemetry.'
        }
      ]
    },

    why: {
      unspokenPain: 'A misaligned executive hire costs months of lost momentum and significant capital. Relying on hope without structured milestones puts the company at risk.',
      coreBelief: 'Exceptional operators welcome unambiguous scorecards. Clear expectations protect both the organization and the leader.',
      philosophicalShift: 'From hoping they succeed to engineering their accountability from Day 1.'
    },
    how: {
      systemicMechanism: 'A 4-part structured onboarding covenant that locks in 30/60/90-day deliverables, contextual DNA transfer, and explicit non-negotiables before their first day.',
      architecturalRules: [
        'Document 1: The Context Codex.',
        'Document 2: The 30/60/90 Contract.',
        'Document 3: Cultural Non-Negotiables.',
        'Document 4: The 45-Day Health Check.'
      ],
      governancePrinciple: 'Clear expectations are kindness. Ambiguity is cruelty that costs millions.'
    },
    what: {
      tangibleAsset: 'The Complete C-Suite Onboarding Codex & Performance Covenant (4-Document Executive Pack in PDF, Word, and Notion).',
      includedFiles: [
        'The Context Codex Master Template',
        '30/60/90-Day Executive Performance Contract',
        'Cultural Non-Negotiables Charter',
        '45-Day Leadership Calibration Evaluation Rubric',
        'Executive Handover Checklist'
      ],
      modules: []
    },

    earlyBird: {
      badge: 'Executive Ramp • Save 77%',
      discountPercent: 77,
      seatsRemaining: 4,
      originalPriceUsd: 380,
      earlyBirdPriceUsd: 87,
      bonusTitle: 'Bonus: The Executive Severance & Clean Exit Protocol',
      bonusValue: '$295 Value Included Free',
      expirationNote: 'Lead-generation allocation open at $87.'
    },

    pricing: {
      usd: 87,
      originalUsd: 380,
      eur: 80,
      gbp: 69,
      inr: 6499,
      aed: 319,
      estimatedBandwidthSavingsAnnualUsd: 400000
    },

    socialProof: {
      quote: 'We onboarded our new COO using this Codex. By Day 30 she had already restructured our supply chain without a single misstep. Worth 50x what I paid.',
      author: 'Jonathan Reed',
      title: 'Managing Director, Horizon Industrial Holdings',
      metric: '30-Day Net Output'
    },

    guaranteeText: 'The TULC Performance Commitment: Put your next senior hire through this Codex. If they are not fully onboarded with measurable milestone clarity by Day 45, contact us for a prompt, complete refund.'
  },

  {
    id: 'asset-05-sovereign-diagnostic-assessment',
    assetNumber: '05/05',
    title: 'The Sovereign Diagnostic & Executive Assessment Suite',
    tagline: 'Audit your company with private equity rigor. Uncover hidden operational drag in 45 minutes.',
    category: 'Enterprise Telemetry',
    badge: 'Institutional Grade • 3 Early Bird Spots',
    format: 'Enterprise Diagnostic App + Board Radar + PDF Report',
    formatIcon: 'Activity',
    installTime: '45 minutes',
    timeToResult: 'Instant interactive score',
    targetAudience: 'Founders, Boards, and Managing Partners preparing for an exit, a major fundraising round, or high-stakes restructuring.',
    coreProblemSolved: 'Uncovers invisible organizational drag, cognitive tax, and execution leaks before the board or buyers do.',

    harshTruth: {
      brutalReality: 'Every founder has operational blind spots. Senior team members may hesitate to point out internal bottlenecks unless an objective, data-driven diagnostic makes it safe to speak plainly.',
      egoTrap: 'Top-line revenue growth can easily mask underlying organizational friction, coordinator burnout, and decision drag that need timely structural attention.',
      unfilteredDiagnosis: 'Sophisticated investors examine operational friction closely during due diligence. Identifying and resolving structural vulnerabilities early protects your valuation and strategic leverage.'
    },
    theWeapon: {
      leverageMechanism: 'A 5-domain empirical diagnostic scoring engine measuring Cognitive Tax, Systemic Integrity, Strategic Velocity, Moral Gravity, and Cultural Fidelity.',
      rulesOfEngagement: [
        'Domain 1: Cognitive Tax (How much founder bandwidth is consumed by noise).',
        'Domain 2: Systemic Integrity (Does intent dilute across departments?).',
        'Domain 3: Strategic Velocity (Decision-to-execution compression speed).',
        'Domain 4: Moral Gravity (The unbending ethical and structural backbone).',
        'Domain 5: Cultural Fidelity (Autonomous self-governance without policing).'
      ],
      executiveLaw: 'Never rely on intuition where empirical telemetry is possible. When you have clear organizational data, you lead from strength and make confident strategic commitments.'
    },
    theOutcome: {
      tangibleResult: 'Receive a definitive board-ready radar chart and an empirical diagnostic report diagnosing exact operational friction points across your senior team.',
      immediateImpact: 'Provides ruthless clarity on where to deploy capital and restructuring resources for maximum enterprise yield.',
      deliverables: [
        'Executive Team Diagnostic Suite (5 Leadership Accounts Included)',
        'Automated Visual Radar Chart & Systemic Health Scorecard',
        'Board-Level PDF Diagnostic Synthesis Report Generator',
        'Priority Friction Remediation Action Matrix',
        'Direct Calibration Voucher for TULC Advisory'
      ],
      modules: [
        {
          number: '01',
          title: 'The 5-Domain Empirical Diagnostic Engine',
          subtitle: 'The Definitive Assessment of Enterprise Health',
          description: 'A rigorous 25-metric evaluation covering bandwidth drain, decision lag, delegation ceilings, cultural integrity, and key-person risk.',
          deliverables: ['Interactive web-based assessment', 'Domain score breakdown', 'Benchmarking against top 10% performers'],
          keyInsight: 'Intuition is great for vision; empirical telemetry is required for scale.'
        },
        {
          number: '02',
          title: 'Board-Level Radar Synthesis & Export',
          subtitle: 'Visualize Institutional Strength Instantly',
          description: 'Generates a sleek, institutional radar visual chart comparing your team’s self-assessment across all 5 operational pillars.',
          deliverables: ['Vector radar chart export', 'Executive summary slide deck', 'Presentation talking points'],
          keyInsight: 'Visual metrics communicate urgency to boards faster than 50 pages of text.'
        },
        {
          number: '03',
          title: 'Executive Team Alignment Diagnostic',
          subtitle: 'Compare How Your Leadership Team Views Reality',
          description: 'Enables your CEO, COO, CFO, and department heads to take the audit independently, revealing dangerous perception gaps.',
          deliverables: ['Executive team aggregate view', 'Discrepancy heat map', 'Alignment debrief agenda'],
          keyInsight: 'When the founder thinks execution velocity is 9/10 and the VP says 4/10, you found the crisis.'
        },
        {
          number: '04',
          title: 'The Inaction Tax Financial Calculator',
          subtitle: 'Put a Exact Dollar Figure on Doing Nothing',
          description: 'Calculates the real financial cost of unresolved leadership stalemates and coordination drag across your payroll.',
          deliverables: ['Inaction tax balance sheet', 'Payroll friction calculation', 'Opportunity cost schedule'],
          keyInsight: 'Inaction is never free; it is the most expensive check you write every month.'
        },
        {
          number: '05',
          title: 'The 90-Day Remediation Playbook',
          subtitle: 'Immediate Surgical Fixes for Low Scores',
          description: 'Prescriptive action items corresponding to your lowest diagnostic domain to quickly restore operational sovereignty.',
          deliverables: ['Domain-specific action items', '90-day progress tracker', 'Diagnostic re-test protocol'],
          keyInsight: 'Diagnosis without remediation is just expensive worrying. Fix the architecture.'
        }
      ]
    },

    why: {
      unspokenPain: 'Every enterprise has invisible friction points. Without structured telemetry, teams struggle to surface the bottlenecks that are holding back strategic execution.',
      coreBelief: 'You cannot optimize what you do not measure. Strategic leadership begins with clear, objective operational data.',
      philosophicalShift: 'From guessing operational health to holding empirical diagnostic proof.'
    },
    how: {
      systemicMechanism: 'A 5-domain empirical diagnostic scoring engine measuring Cognitive Tax, Systemic Integrity, Strategic Velocity, Moral Gravity, and Cultural Fidelity.',
      architecturalRules: [
        'Domain 1: Cognitive Tax.',
        'Domain 2: Systemic Integrity.',
        'Domain 3: Strategic Velocity.',
        'Domain 4: Moral Gravity.',
        'Domain 5: Cultural Fidelity.'
      ],
      governancePrinciple: 'Numbers don’t lie. Politics do.'
    },
    what: {
      tangibleAsset: 'The Complete Sovereign Diagnostic & Executive Assessment Suite (Web tool, PDF Report, and Enterprise License).',
      includedFiles: [
        'Online Assessment Access (Up to 5 Executive Accounts)',
        'Board-Level Radar Chart Generator',
        'Executive PDF Diagnostic Audit Report',
        'The Inaction Tax Balance Sheet Model',
        '90-Day Surgical Remediation Guide'
      ],
      modules: []
    },

    earlyBird: {
      badge: 'Diagnostic Telemetry • Save 75%',
      discountPercent: 75,
      seatsRemaining: 5,
      originalPriceUsd: 390,
      earlyBirdPriceUsd: 97,
      bonusTitle: 'Bonus: Board-Ready Executive Summary Deck Template',
      bonusValue: '$195 Value Included Free',
      expirationNote: 'Lead-generation allocation open at $97.'
    },

    pricing: {
      usd: 97,
      originalUsd: 390,
      eur: 89,
      gbp: 78,
      inr: 7499,
      aed: 355,
      estimatedBandwidthSavingsAnnualUsd: 650000
    },

    socialProof: {
      quote: 'This audit exposed a $450K annual drag in our cross-functional decision cycles that our board had no idea existed. Fixed it in 60 days.',
      author: 'Sarah Chen-Moriarty',
      title: 'Managing Partner, Sovereign Capital Partners',
      metric: '$450K Blind Spot Resolved'
    },

    guaranteeText: 'The TULC Performance Commitment: Run this diagnostic with your senior team. If it does not surface actionable, high-dollar operational insights across your organization, email our advisory desk for an immediate full refund.'
  }
];

export interface BundleProduct {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  pricing: {
    usd: number;
    originalUsd: number;
    savingsUsd: number;
    eur: number;
    gbp: number;
    inr: number;
    aed: number;
  };
  earlyBird: EarlyBirdTier;
  includes: string[];
  bonuses: string[];
  guaranteeText: string;
}

export const SOVEREIGN_VAULT_BUNDLE: BundleProduct = {
  id: 'tulc-complete-founder-systems-suite',
  title: 'The Complete Founder Systems Suite (All Digital Toolkits)',
  tagline: 'The complete digital operating system for high-growth founders. Replace daily operational fires with permanent written architecture.',
  badge: 'Complete Suite: 86% Off • Only 6 Bundles Left',
  description: 'Instant access to every digital toolkit in the library. Pre-built Notion workspaces, Coda templates, decision matrices, onboarding codexes, and team diagnostics. Ready to duplicate with 1 click.',
  pricing: {
    usd: 197,
    originalUsd: 1450,
    savingsUsd: 1253,
    eur: 180,
    gbp: 155,
    inr: 14999,
    aed: 720
  },
  earlyBird: {
    badge: 'Founder Lead-Gen Suite • Save $1,253',
    discountPercent: 86,
    seatsRemaining: 6,
    originalPriceUsd: 1450,
    earlyBirdPriceUsd: 197,
    bonusTitle: 'Master Unified Notion Workspace + Digital Bonus Pack',
    bonusValue: '$590 Value Included Free',
    expirationNote: 'Only 6 complete system suites remaining at $197 before introductory allocation closes.'
  },
  includes: [
    'Asset 00: The 72-Hour Founder Severance Protocol & Delegation Filter',
    'Asset 01: The 15-Hour Founder Bandwidth Reclamation OS (Notion & Coda Master)',
    'Asset 02: The 30-Day Decoupling Runbook & Continuity System (PDF + Notion Vault)',
    'Asset 03: The Cross-Functional Decision Guardrails Matrix (Figma + Miro Boards)',
    'Asset 04: The Executive Onboarding Codex (4-Document Management Pack)',
    'Asset 05: The Team Operational Diagnostic & Assessment Suite'
  ],
  bonuses: [
    'Bonus 1: The Master Enterprise Unified Index (All toolkits pre-connected in a single command Notion workspace) — $250 Value',
    'Bonus 2: The Plug-and-Play Delegation Agreement & Decision Tree (Digital PDF + DOCX) — $145 Value',
    'Bonus 3: The Board-Ready Executive Summary Presentation Template (Figma & Slides) — $195 Value',
    'Bonus 4: Lifetime Digital Updates, Template Revisions & New Module Drops Forever'
  ],
  guaranteeText: '30-Day Digital Performance Guarantee: Duplicate these templates into your company. If they do not save your leadership team hours of weekly operational drag within 30 days, simply notify us for an unconditional full refund. No questions asked.'
};
