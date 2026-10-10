export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  hook: string;
  mythBusted: string;
  controversialOpening: string;
  readTime: string;
  category: string;
  keywords: string[];
  executiveSummary: string;
  bodySections: {
    heading: string;
    subheading?: string;
    content: string[];
    conceptAngles: {
      angle1PlainEnglish: string;
      angle2ExecutiveMetaphor: string;
      angle3MathematicalOrFinancial: string;
    };
  }[];
  keyTakeaways: string[];
  introspectiveQuestion: string;
  tulcSolutionCallout: string;
  callToAction: {
    primaryText: string;
    description: string;
  };
  linkedInPostSummary: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'the-exhaustion-lie-why-hard-work-is-killing-your-company',
    title: 'The Exhaustion Lie: Why Working 80 Hours a Week Is Ruining Your Company (And What High-Caliber Founders Do Instead)',
    subtitle: 'Challenging the myth of the heroic executive: how unchaining yourself from daily operations unlocks real enterprise valuation.',
    hook: 'Hard work didn\'t build your bottleneck. Bad architecture did.',
    mythBusted: 'MYTH: "If the founder works harder and stays involved in everything, the company will scale faster." REALITY: When a leader is everywhere, their organization goes nowhere.',
    controversialOpening: 'Let\'s address the elephant in every modern board meeting: Working yourself into the ground is not a badge of honor. It is an architectural failure. The highest-performing leaders in the world do not work 80-hour weeks—they install systems that do the heavy lifting for them.',
    readTime: '6 min read',
    category: 'Executive Operating Systems',
    keywords: ['Executive Burnout', 'Leadership Architecture', 'Founder Bottleneck', 'TULC', 'Scale Up Operations', 'CEO Productivity'],
    executiveSummary: 'When you are the smartest person in the room answering every Slack ping, you haven\'t built an enterprise; you\'ve built an expensive prison. This essay uncovers why working harder produces diminishing returns and how installing an autonomous leadership circuit returns 15+ hours weekly while compounding enterprise value.',
    bodySections: [
      {
        heading: '1. The Hero Trap: Why Being "Indispensable" Is Actually Your Biggest Liability',
        subheading: 'Stop wearing 14-hour days like a medal of valor.',
        content: [
          'Most entrepreneurs start their journeys believing they must be **the hero who saves the day**. In the early days, that grit was essential. You answered the phones, negotiated contracts, and resolved every fire.',
          'But here is the uncomfortable truth: *The very superpowers that took you from zero to five million dollars will actively sabotage you from five million to fifty million.*',
          'When your team cannot make a decision without your personal blessing, **you are not leading—you are choking progress**.'
        ],
        conceptAngles: {
          angle1PlainEnglish: 'Think of yourself as traffic controller who insists on inspecting every car\'s tires before letting it through the intersection. The resulting traffic jam isn\'t the drivers\' fault; it is yours.',
          angle2ExecutiveMetaphor: 'An architect doesn\'t carry bricks up the scaffold; an architect designs blueprints that allow hundred of masons to build skyscrapers without asking for daily permission.',
          angle3MathematicalOrFinancial: 'Every hour a $1,000/hr founder spends solving a $40/hr operational ticket represents an enterprise value deficit of $960 per hour, compounding into a six-figure drag annually.'
        }
      },
      {
        heading: '2. The Shift From Heroic Operator to Sovereign Architect',
        subheading: 'Installing autonomous circuits so your vision compounds without your physical presence.',
        content: [
          'True leadership sovereignty means your company grows *faster* when you step out of the room than when you stay in it.',
          'To achieve this, you must transition from **answering questions** to **authoring decision boundaries**. Your managers do not lack talent; they lack unambiguous rules of engagement.',
          'When rules are lucid, autonomy is effortless. When rules are murky, dependence is guaranteed.'
        ],
        conceptAngles: {
          angle1PlainEnglish: 'Instead of telling people what to do every morning, give them three golden rules that tell them when they can spend money and make calls without ever asking you.',
          angle2ExecutiveMetaphor: 'A high-speed train doesn\'t require constant manual steering by the conductor; the rails guarantee the direction, freeing the conductor to focus on safety and arrival times.',
          angle3MathematicalOrFinancial: 'Autonomous decision-making reduces decision latency from an average of 48 hours to under 15 minutes, accelerating enterprise go-to-market velocity by 300%.'
        }
      },
      {
        heading: '3. Where The Unbounded Leadership Co. (TULC) Rewires the System',
        subheading: 'We don\'t coach your habits. We re-engineer your governance.',
        content: [
          'At **The Unbounded Leadership Co. (TULC)**, we do not hand you another generic meditation app or tell you to "delegate better." That is patronizing advice.',
          'Instead, we install the **Unbounded Operating System** directly into your executive tier. We map out your five core decision loops, eliminate cognitive drag, and calibrate your leadership team into an autonomous governing body.',
          'The result? You reclaim **15 to 20 uninterrupted hours each week** to focus on pure strategic vision, capital allocation, and market conquest.'
        ],
        conceptAngles: {
          angle1PlainEnglish: 'TULC doesn\'t give you homework; we come in, remove the clutter from your calendar, and give your managers the exact tools to solve their own problems.',
          angle2ExecutiveMetaphor: 'Think of TULC as institutional mechanics who upgrade your engine from a manual hand-crank to a precision-engineered twin-turbo system while the plane is in flight.',
          angle3MathematicalOrFinancial: 'Deploying the TULC Sovereign Architecture recovers an average of 800 executive hours annually and cuts middle-management decision churn by 78%.'
        }
      }
    ],
    keyTakeaways: [
      'Heroic firefighting is not dedication—it is an organizational design flaw.',
      'If your company collapses during a 30-day vacation, you own a job, not an enterprise.',
      'True leadership sovereignty transforms you from an operational bottleneck into a systemic architect.',
      'TULC installs the governance protocols that make operational independence permanent.'
    ],
    introspectiveQuestion: 'If you were forbidden by doctor\'s orders from attending a single meeting next week, what percentage of your company\'s decisions would grind to a dead halt?',
    tulcSolutionCallout: 'The Unbounded Leadership Co. installs the exact 5-domain governance protocols that turn frazzled founders into sovereign institutional statesmen. Book an Executive Calibration to discover your Sovereign Operating Index.',
    callToAction: {
      primaryText: 'Request an Executive Calibration Debrief',
      description: 'Receive a confidential, white-glove audit of your leadership operating system within 48 hours.'
    },
    linkedInPostSummary: '🚨 Controversial truth for enterprise founders:\n\nIf you are working 80 hours a week, you aren\'t "dedicated." You are the biggest bottleneck in your company.\n\nIn the early days, grit was your edge.\nAt scale, your grit becomes your prison.\n\nWhen your team needs your stamp of approval on every Slack thread, progress stalls. You don\'t need better time management. You need better architecture.\n\nAt The Unbounded Leadership Co. (TULC), we teach founders to transition from Heroic Operators to Sovereign Architects.\n\nWhat would happen to your company if you stepped away for 30 days today?\n\nRead the full strategic breakdown below. ⬇️'
  },
  {
    id: 'blog-2',
    slug: 'the-death-of-the-200-page-consulting-deck',
    title: 'The Death of the 200-Page Slide Deck: Why Big Consulting Fails and What Actually Scales Companies',
    subtitle: 'Why Fortune 500s and ambitious founders are firing traditional consulting firms in favor of nimble institutional architecture.',
    hook: 'If your consulting firm gives you a 150-slide deck, they didn’t solve your problem. They just billed you for documenting it.',
    mythBusted: 'MYTH: "The thicker the slide deck and the bigger the consulting brand, the safer the board decision." REALITY: Slide decks sit on digital shelves; lean, sovereign governance circuits change behavior on Monday morning.',
    controversialOpening: 'Corporate boardrooms have spent decades trapped in an expensive optical illusion. We hire prestigious consulting firms who send twenty junior associates in suits to interview our staff for six months, only to hand us a 200-page PDF of things we already knew. That era is dead.',
    readTime: '7 min read',
    category: 'Consulting Disruption & Governance',
    keywords: ['Management Consulting', 'Strategy Execution', 'TULC Governance', 'Board Advisory', 'Organizational Agility'],
    executiveSummary: 'Traditional consulting profits from complexity and prolonged dependency. Real institutional transformation requires the exact opposite: radical simplicity, instant operational clarity, and sovereign systems that require zero ongoing billable hours.',
    bodySections: [
      {
        heading: '1. The Billable-Hour Incentive Problem',
        subheading: 'Why traditional firms are economically motivated to never truly fix your system.',
        content: [
          'Let\'s be clear: consulting partners are smart people. But the business model of traditional management consulting is structurally misaligned with executive freedom.',
          'They get paid by **the billable hour** and **the size of their deployment team**. If they install a clean, self-governing protocol that solves your issue in 14 days, their revenue evaporates.',
          'Their economic incentive is to make your problem look so vastly intricate that only their continuous presence can manage the fallout.'
        ],
        conceptAngles: {
          angle1PlainEnglish: 'A mechanic who charges you by the hour has no reason to tighten the bolt properly if leaving it slightly loose guarantees you come back next month.',
          angle2ExecutiveMetaphor: 'Big consulting sells you elaborate architectural scaffolding that never comes down, whereas true partners build steel foundations and remove the supports so the building stands alone.',
          angle3MathematicalOrFinancial: 'Retaining legacy consulting practices burns $250k–$750k in advisory fees while yielding less than 12% realized implementation of strategic recommendations after 12 months.'
        }
      },
      {
        heading: '2. The Seth Godin Purple Cow Rule in Enterprise Advisory',
        subheading: 'Be remarkable, deliver radical transparency, and exit quickly.',
        content: [
          'Seth Godin taught us that in a noisy, crowded world, **fitting in is failing**. Generic consulting slides are invisible because everyone has seen them a thousand times.',
          'What is truly remarkable? Handing a CEO a **one-page Sovereign Operating Treaty** that aligns their entire C-suite on their five unshakeable decision boundaries before noon.',
          'When you give leaders the exact playbook without withholding the secret sauce, you earn unconditional trust.'
        ],
        conceptAngles: {
          angle1PlainEnglish: 'Instead of an encyclopedia of theory, give your team a simple one-page cheat sheet that eliminates 80% of arguments before they start.',
          angle2ExecutiveMetaphor: 'A master chef doesn\'t write a 500-page manual on knife physics; they show you the single, precise wrist motion that cuts the onion in five seconds.',
          angle3MathematicalOrFinancial: 'One-page sovereign operating models boost organizational alignment scores by 92% compared to traditional 100+ page corporate handbooks.'
        }
      },
      {
        heading: '3. How TULC Replaces Advisory Theater With Institutional Permanence',
        subheading: 'A sovereign framework that belongs to you, not your advisors.',
        content: [
          'At **The Unbounded Leadership Co.**, we refuse to camp in your offices or bill you by the hour. We despise advisory theater.',
          'We come in for a calibrated, intensive immersion. We diagnose the friction using mathematical precision, install the **Unbounded Operating Framework**, train your leaders to run it autonomously, and step back.',
          'We measure our success not by how long we stay, but by how quickly your organization outgrows the need for external consultants.'
        ],
        conceptAngles: {
          angle1PlainEnglish: 'We teach you how to fish, install the world\'s best fishing rod, and leave so you can feed your team forever without us.',
          angle2ExecutiveMetaphor: 'TULC acts as the sovereign catalyst—sparking the chemical reaction of high autonomy, leaving pure institutional gold in its wake.',
          angle3MathematicalOrFinancial: 'TULC clients achieve an average 5.8x enterprise valuation multiplier on our engagement cost within 180 days by permanently cutting external advisory bloat.'
        }
      }
    ],
    keyTakeaways: [
      'Complexity in consulting is a billing strategy, not a leadership solution.',
      'A one-page sovereign treaty that gets executed beats a 200-page strategy deck that collects dust.',
      'Your goal as a leader is to build internal institutional permanence, not external reliance.',
      'TULC partners with boards and CXOs to install autonomous operating clarity and exit swiftly.'
    ],
    introspectiveQuestion: 'How many consulting reports from the past three years are currently sitting in your company\'s cloud drive, completely unread and unexecuted?',
    tulcSolutionCallout: 'TULC rejects the billable hour and the 200-page slide deck. We install lean, sovereign operating systems that empower your team immediately. Book your Executive Calibration today.',
    callToAction: {
      primaryText: 'Audit Your Governance Efficiency',
      description: 'Discover how much time and capital your enterprise leaks to advisory bloat.'
    },
    linkedInPostSummary: 'Why are modern CEOs canceling traditional consulting contracts?\n\nBecause nobody has time for 200-page slide decks anymore.\n\nTraditional consulting business models are built on billable hours. That means complexity is rewarded, and quick, decisive autonomy is penalized.\n\nAt The Unbounded Leadership Co. (TULC), we believe in radical simplicity:\n- No armies of analysts.\n- No endless retainer billing.\n- Just a 1-page Sovereign Operating System installed with surgical precision.\n\nIf your strategy doesn’t fit on one page, your team won’t execute it on Monday.\n\nDo you agree? Let’s discuss in the comments. ⬇️'
  },
  {
    id: 'blog-3',
    slug: 'the-tribal-code-people-like-us-do-things-like-this',
    title: 'The Tribal Code: Why Culture Isn\'t Ping-Pong Tables, It\'s "People Like Us Do Things Like This"',
    subtitle: 'How legendary institutions cultivate sovereign peer accountability without micro-managing or policing.',
    hook: 'If you have to police your employees, your culture was dead on arrival.',
    mythBusted: 'MYTH: "Company culture is perks, free lunches, inspirational slogans, and annual offsites." REALITY: Culture is the unspoken peer standard that dictates what behavior is tolerated when the boss leaves the room.',
    controversialOpening: 'Let\'s dispense with the corporate HR nonsense: Ping-pong tables, catered lunches, and motivational posters on the wall do not constitute culture. They are pacifiers. Real culture is ruthless in its simplicity: It is the shared standard of what "people like us" do—and what we will never tolerate.',
    readTime: '6 min read',
    category: 'Tribal Culture & Identity',
    keywords: ['Company Culture', 'Seth Godin Tribe', 'Executive Standards', 'Peer Accountability', 'TULC Framework'],
    executiveSummary: 'When high-growth companies scale past 50 employees, founders often watch their standards slip and resort to heavy-handed rules. Seth Godin\'s doctrine of tribal identity provides the real antidote: turning culture into a self-reinforcing immune system where excellence is defended by the team, not enforced by the boss.',
    bodySections: [
      {
        heading: '1. The Disintegration of Standards in Fast-Growing Companies',
        subheading: 'Why scaling headcount often dilutes the very brilliance that made you successful.',
        content: [
          'In the beginning, your early team shared your heartbeat. You didn\'t need handbooks; everyone knew what quality meant.',
          'Then you doubled headcount. Suddenly, mediocre work started slipping through. Deadlines became suggestions. Leaders started complaining about "lack of ownership."',
          'Most founders respond by creating more rules, more status meetings, and more surveillance. **That only drives away your best talent and codifies mediocrity.**'
        ],
        conceptAngles: {
          angle1PlainEnglish: 'Trying to fix low standards with more paperwork is like spraying perfume on a messy room instead of actually cleaning it up.',
          angle2ExecutiveMetaphor: 'A healthy human body doesn\'t need conscious thought to attack bacteria; its immune system neutralizes threats instantly because of genetic memory.',
          angle3MathematicalOrFinancial: 'Employee disengagement and lack of ownership cost businesses $1.9 trillion annually in lost productivity globally, according to Gallup data.'
        }
      },
      {
        heading: '2. The Seth Godin Antidote: The Power of Tribal Identity',
        subheading: '"People like us do things like this."',
        content: [
          'Seth Godin articulated the single most powerful psychological lever in human history: **Identity precedes behavior.**',
          'Human beings will happily disobey rules from management, but they will fight fiercely to remain respected members of their chosen tribe.',
          'When you define the identity of your team—*"In this company, we treat client confidentiality with sacred rigor. We do not pass half-baked work down the line"*—peer accountability replaces managerial oversight.'
        ],
        conceptAngles: {
          angle1PlainEnglish: 'People don\'t wear seatbelts because a policeman is watching them; they wear seatbelts because people like them protect their families.',
          angle2ExecutiveMetaphor: 'An elite sports franchise like the New Zealand All Blacks doesn\'t need the coach to enforce locker-room cleanup; the senior players sweep the sheds because that is the tribal code.',
          angle3MathematicalOrFinancial: 'Tribal identity-driven organizations report a 40% reduction in executive oversight hours and a 52% reduction in unforced operational errors.'
        }
      },
      {
        heading: '3. Codifying the Tribe With The Unbounded Leadership Co.',
        subheading: 'From unwritten rules to a sovereign institutional code.',
        content: [
          'Culture cannot remain an intangible vibe locked inside the founder\'s brain. It must be codified into institutional language.',
          'At **TULC**, we guide leadership teams through the **Tribal Code Calibration**. We define the polarizing truths that differentiate your company, write the boundary conditions for decision-making, and install peer rituals that make high standards automatic.',
          'We transform your workforce from compliant salary-drawers into passionate defenders of your institutional legacy.'
        ],
        conceptAngles: {
          angle1PlainEnglish: 'We help you put down on paper the exact DNA of what makes your best people succeed, so every new hire understands the standard on day one.',
          angle2ExecutiveMetaphor: 'TULC acts as the sovereign scribe, transcribing the oral wisdom of your founding vision into an enduring constitutional treaty.',
          angle3MathematicalOrFinancial: 'Enterprises with codified tribal codes achieve 2.4x higher employee retention among top quintile performers and cut onboarding ramp times in half.'
        }
      }
    ],
    keyTakeaways: [
      'Perks and slogans do not build culture; shared standards build culture.',
      'Identity drives behavior: human beings naturally conform to the standards of the tribe they respect.',
      'Stop policing your managers; give them a clear tribal code so peer accountability flourishes.',
      'TULC helps enterprise leaders codify and install unshakeable institutional culture.'
    ],
    introspectiveQuestion: 'What is the most damaging piece of mediocre behavior currently tolerated inside your leadership meetings that nobody has had the courage to call out?',
    tulcSolutionCallout: 'TULC helps founders build enduring corporate cultures anchored in peer sovereignty and uncompromising quality. Request an Executive Calibration to align your leadership team.',
    callToAction: {
      primaryText: 'Install the Sovereign Tribal Code',
      description: 'Replace managerial policing with autonomous peer-driven excellence.'
    },
    linkedInPostSummary: 'Culture is NOT ping pong tables or free kombucha.\n\nCulture is what happens in the room when the CEO leaves.\n\nSeth Godin nailed it:\n"People like us do things like this."\n\nWhen you scale, you can’t micromanage 100 people. If you try, your best people leave, and the rest just learn to look busy.\n\nThe real secret? Tribal identity.\nWhen peer accountability replaces managerial surveillance, quality becomes automatic.\n\nAt The Unbounded Leadership Co. (TULC), we help founders transform vague values into an unshakeable Sovereign Tribal Code.\n\nWhat is your company\'s unspoken standard? Let me know below. ⬇️'
  },
  {
    id: 'blog-4',
    slug: 'the-sovereign-leader-cognitive-surplus-over-slack-chaos',
    title: 'The Sovereign Leader: Why Cognitive Surplus Beats Slack Chaos Every Single Day',
    subtitle: 'The math behind reclaiming your brain: how 4 hours of sovereign focus creates 10x more enterprise value than 60 hours of frantic responsiveness.',
    hook: 'Being reachable 24/7 doesn’t prove your importance. It proves your fragility.',
    mythBusted: 'MYTH: "Great executives must be instantly reachable on Slack, WhatsApp, and email at all hours of the day and night." REALITY: Constant responsiveness shreds your prefrontal cortex and destroys high-stakes strategic judgment.',
    controversialOpening: 'Here is an uncomfortable reality that tech culture has spent a decade ignoring: The hyper-responsive founder who responds to Slack messages in 30 seconds is not a visionary leader. They are an executive slot machine. Every notification is a pull of the lever, and your company\'s enterprise value is what\'s being gambled away.',
    readTime: '8 min read',
    category: 'Cognitive Strategy & Time Sovereignty',
    keywords: ['Cognitive Surplus', 'Deep Work for CEOs', 'TULC', 'Slack Distraction', 'Strategic Focus', 'Board Performance'],
    executiveSummary: 'High-stakes judgment requires cognitive surplus—the quiet mental space to see around corners, evaluate macroeconomic shifts, and make high-conviction decisions. This article breaks down the neuroscience of executive distraction and details how TULC installs the "Sovereign Hour" architecture.',
    bodySections: [
      {
        heading: '1. The Neuroscience of Executive Fragmentation',
        subheading: 'Why context switching is making your leadership dull, reactive, and tired.',
        content: [
          'Neuroscience is unambiguous: the human brain cannot multitask. When you switch from reviewing a multimillion-dollar acquisition term sheet to answering a Slack question about office catering, your brain suffers **attention residue**.',
          'It takes up to 23 minutes for your prefrontal cortex to return to deep, synthesis-level thinking after a single notification interrupt.',
          'If you are interrupted 30 times a day, you spend **zero minutes in deep cognitive processing**. You are making boardroom bets with a fragmented, exhausted mind.'
        ],
        conceptAngles: {
          angle1PlainEnglish: 'It\'s like trying to bake a gourmet cake while running outside every three minutes to check the mailbox. You will end up burning the cake and forgetting the sugar.',
          angle2ExecutiveMetaphor: 'A high-precision sniper does not fire while sprinting across an obstacle course; they regulate their breathing, steady their posture, and shoot from absolute stillness.',
          angle3MathematicalOrFinancial: 'Executive context-switching reduces effective cognitive capacity by up to 10 IQ points—the equivalent of working after staying awake for 36 consecutive hours.'
        }
      },
      {
        heading: '2. The Sovereign Hour: Protecting the Sacred Synthesis Block',
        subheading: 'How the world\'s most enduring leaders create asymmetric enterprise value.',
        content: [
          'Warren Buffett, Bill Gates, and sovereign CEOs share one non-negotiable habit: their calendars are shockingly empty.',
          'They do not fill their days with back-to-back 30-minute status meetings. They protect multi-hour blocks of **Cognitive Surplus**.',
          'In those hours, they don\'t reply to messages. They ponder, read, calculate, and design. One profound strategic insight born in quiet contemplation will generate more wealth than five years of frantic operational busywork.'
        ],
        conceptAngles: {
          angle1PlainEnglish: 'Set aside two hours every morning where nobody can call you, email you, or book a meeting with you. Guard that time like your company\'s life depends on it—because it does.',
          angle2ExecutiveMetaphor: 'A master ship captain spends 95% of their time reading the stars and the ocean currents, not personally shoveling coal into the boiler room.',
          angle3MathematicalOrFinancial: 'Companies whose CEOs dedicate at least 20% of their weekly time to uninterrupted strategic planning outperform their sector peers by 31% in EBITDA margin.'
        }
      },
      {
        heading: '3. Installing Cognitive Sovereignty With TULC',
        subheading: 'We rebuild your information diet and communications architecture.',
        content: [
          'You cannot achieve cognitive surplus through sheer willpower alone. If the system around you expects instant answers, willpower fails by Tuesday afternoon.',
          'At **The Unbounded Leadership Co. (TULC)**, we restructure your organization\'s communication hierarchy. We install **Asynchronous Decision Protocols**, train your direct reports to bring proposals instead of open-ended problems, and build an executive moat around your focus.',
          'We give you your brain back. And with your brain restored, your company becomes unstoppable.'
        ],
        conceptAngles: {
          angle1PlainEnglish: 'We set up rules so your team only comes to you with solutions already thought through, saving you hundreds of hours of back-and-forth chatter.',
          angle2ExecutiveMetaphor: 'TULC constructs a sovereign palace guard around your intellect, filtering out the noise of the village so you can govern the kingdom in absolute peace.',
          angle3MathematicalOrFinancial: 'Implementing TULC Asynchronous Protocols cuts weekly internal email/Slack volume by 64% and frees up an average of 14 high-value strategic hours for each C-suite member.'
        }
      }
    ],
    keyTakeaways: [
      'Instant responsiveness is not leadership; it is an addiction to low-value stimulation.',
      'Attention residue destroys high-stakes judgment and costs companies millions in poor decisions.',
      'True institutional value is created in quiet blocks of uninterrupted cognitive surplus.',
      'TULC installs the asynchronous governance circuits that protect founder genius and unlock scale.'
    ],
    introspectiveQuestion: 'When was the last time you spent four completely uninterrupted hours thinking about the next three years of your company without looking at your phone once?',
    tulcSolutionCallout: 'Reclaim your cognitive sovereignty and liberate your company from the chaos of instant messaging. Schedule your Executive Calibration with The Unbounded Leadership Co.',
    callToAction: {
      primaryText: 'Reclaim Your Cognitive Sovereignty',
      description: 'Step into the executive rhythm that compounds enterprise value.'
    },
    linkedInPostSummary: '🚨 Being reachable 24/7 on Slack doesn’t make you a great CEO.\n\nIt makes you a high-priced bottleneck.\n\nNeuroscience shows that every notification creates "attention residue." It takes 23 minutes for your brain to regain deep focus after a single interruption.\n\nIf you answer Slack all day, you are making multimillion-dollar board decisions with a brain running at half capacity.\n\nThe world’s most effective leaders protect Cognitive Surplus.\n\nAt The Unbounded Leadership Co. (TULC), we help founders install Asynchronous Governance Protocols that cut internal communication noise by 64%.\n\nGive yourself your brain back.\n\nFull essay linked in the comments. ⬇️'
  }
];
