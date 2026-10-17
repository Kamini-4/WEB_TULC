export interface PlaybookLetter {
  letter: string;
  title: string;
  tagline: string;
  category: 'Tribal Attraction' | 'Constructive Tension' | 'Generosity & Proof' | 'Prestige Scarcity';
  strategicRule: string;
  strategicRule?: string;
  tulcExecution: string;
  executiveScript: string;
  keyTakeaway: string;
  reflectionQuestion: string;
}

export const SOVEREIGN_PLAYBOOK: PlaybookLetter[] = [
  {
    letter: 'A',
    title: 'Audience (The Smallest Viable Market)',
    tagline: 'Refuse to market to "everyone." Win by serving the exact 100 leaders who need you.',
    category: 'Tribal Attraction',
    strategicRule: 'Do not find customers for your products; find products for your customers. When you aim at everyone, you connect with no one.',
    tulcExecution: 'We never pitch broad management consulting. We narrow our universe solely to enterprise CXOs and scale-up founders ($20M–$500M ARR) trapped in operational firefighting who crave sovereign systems governance.',
    executiveScript: '"We do not serve general management. We exist exclusively for 100 enterprise leaders whose companies cannot double without their systems being fundamentally recoded."',
    keyTakeaway: 'Specificity is not a limit; it is the ultimate institutional moat. Exclusivity creates irresistible gravitational pull.',
    reflectionQuestion: 'If you were legally restricted to only ever serving 50 clients for the rest of your career, who would you immediately disqualify today?'
  },
  {
    letter: 'B',
    title: 'Belonging & Tribal Belief',
    tagline: 'Sovereign leaders hold standards that transcend the crowd.',
    category: 'Tribal Attraction',
    strategicRule: 'Human beings are desperate to connect with a tribe. Marketing is the generous act of helping others become who they seek to become.',
    tulcExecution: 'TULC is not a transactional vendor; it is a sovereign guild. When a founder partners with us, they cross an identity threshold: they cease to be an overwhelmed operator and step into the posture of an institutional architect.',
    executiveScript: '"Leaders inside our circle do not spend Sundays reviewing operational tickets. In our tribe, systems govern the routine so founders govern the vision."',
    keyTakeaway: 'You do not sell services; you sell admission to an elevated peer identity.',
    reflectionQuestion: 'What belief do the leaders in your circle hold that the rest of the market considers impossible or arrogant?'
  },
  {
    letter: 'C',
    title: 'Constructive Tension',
    tagline: 'Expose the chasm between where they are and where they belong.',
    category: 'Constructive Tension',
    strategicRule: 'Tension is not coercion. Tension is the uncomfortable realization that remaining the same costs far more than transforming.',
    tulcExecution: 'We hold up an unflinching institutional mirror: "If you stepped away for 90 days, would your business compound or collapse?" We let that question generate its own undeniable gravity.',
    executiveScript: '"You have built a formidable balance sheet, yet you are still the chief triage officer of your company. That is not leadership; that is high-paying operational imprisonment."',
    keyTakeaway: 'Relief cannot exist without honest confrontation. Great advisory begins by respectfully naming the unsaid.',
    reflectionQuestion: 'What truth about your daily schedule are you actively avoiding because admitting it would require rewiring your entire executive team?'
  },
  {
    letter: 'D',
    title: 'Ditching the RFP',
    tagline: 'Never submit a pitch deck. Sovereign institutions don’t audition.',
    category: 'Prestige Scarcity',
    strategicRule: 'If you are competing on price and answering RFPs, you have already commoditized yourself into a compliant supplier.',
    tulcExecution: 'TULC deliberately declines bidding processes, competitive tenders, and procurement audits. Clients do not hire us; they apply for an institutional calibration. If a board requests 3 competing bids, we politely withdraw.',
    executiveScript: '"We decline to participate in competitive tenders. Our calibration protocol requires unconditional institutional alignment, not comparative procurement math."',
    keyTakeaway: 'The moment you agree to audition in a lineup, you surrender the moral authority required to transform them.',
    reflectionQuestion: 'How much enterprise authority are you destroying each year by begging for business through corporate RFP processes?'
  },
  {
    letter: 'E',
    title: 'Empathy for the Founder’s Trap',
    tagline: 'The heavier the crown, the quieter the isolation.',
    category: 'Tribal Attraction',
    strategicRule: 'Empathy is understanding that people make choices based on their worldviews, fears, and the stories they tell themselves.',
    tulcExecution: 'We honor the private burden of the scale-up CEO: being the smartest person in the room with nobody to confide in, unable to show vulnerability to staff or weakness to the board. We meet them with peer-level understanding, not academic jargon.',
    executiveScript: '"We know what it feels like to have 400 people looking to you for answers while you wonder who is actually safeguarding your own strategic clarity."',
    keyTakeaway: 'Deep empathy disarms skepticism faster than any case study.',
    reflectionQuestion: 'When was the last time you spoke completely candidly to someone who had zero financial incentive to flatter you?'
  },
  {
    letter: 'F',
    title: 'Frictionless Proof',
    tagline: 'Show the schematics, not just the accolades.',
    category: 'Generosity & Proof',
    strategicRule: 'Don’t tell me how great you are. Show me how your mechanism works so clearly that belief becomes inevitable.',
    tulcExecution: 'Rather than vanity client logos and canned testimonials, TULC reveals the actual operating schematics: the 5 Governance Protocols, the Cognitive Load Calculator, and the Autonomy Transfer Matrix.',
    executiveScript: '"Do not take our word for it. Review this 1-page Autonomous Operating Framework and run your executive team through it this Friday."',
    keyTakeaway: 'Transparency of methodology is the highest form of commercial self-confidence.',
    reflectionQuestion: 'Does your methodology speak for itself, or does it require twenty slides of sales justification?'
  },
  {
    letter: 'G',
    title: 'Generosity First',
    tagline: 'Give away your best blueprints. Teach so well they crave your execution.',
    category: 'Generosity & Proof',
    strategicRule: 'Generosity creates asymmetric reciprocity. If your ideas need to be hoarded behind paywalls, they probably aren’t that valuable.',
    tulcExecution: 'We publish un-gated, world-class executive governance architectures. When founders see how lucid our diagnostic models are, they realize implementing them without our architectural calibration is foolish.',
    executiveScript: '"Here is the entire Sovereign Operating System blueprint. You can read it in 12 minutes. If you want us to help install it into your leadership team, let us know."',
    keyTakeaway: 'Hoarding knowledge attracts bargain-hunters; radiating mastery attracts sovereigns.',
    reflectionQuestion: 'What proprietary insight are you hiding behind a form that, if made freely accessible, would establish you as the definitive authority?'
  },
  {
    letter: 'H',
    title: 'Hook & Contrast',
    tagline: 'The Firefighting Operator vs. The Sovereign Architect.',
    category: 'Constructive Tension',
    strategicRule: 'Contrast creates clarity. If the difference between the old way and your way is subtle, people will stay put.',
    tulcExecution: 'We draw the sharpest line in the market: The Heroic Operator (14-hour days, endless Slack pings, emotional burnout, fragile scale) versus The Sovereign Architect (autonomous cadence, institutional compounding, deep peace, durable value).',
    executiveScript: '"Heroic leadership is an organizational design failure disguised as hustle. Sovereign architecture replaces heroic strain with mathematical clarity."',
    keyTakeaway: 'When the contrast is visceral, the choice makes itself.',
    reflectionQuestion: 'Which side of this contrast is your daily routine currently endorsing?'
  },
  {
    letter: 'I',
    title: 'Identity Transformation',
    tagline: 'They don’t buy a sprint; they buy who they become.',
    category: 'Tribal Attraction',
    strategicRule: 'Every purchase is an investment in self-identity. We buy things to reinforce the story we tell ourselves about who we are.',
    tulcExecution: 'Our clients do not hire an advisory service to get a list of action items; they partner with TULC to shed the identity of the frazzled bottleneck and embody the statesman who commands an enduring institution.',
    executiveScript: '"Our work finishes when your presence in the room becomes optional, yet your strategic vision is more present than ever."',
    keyTakeaway: 'Sell the transformation of character, not the delivery of documents.',
    reflectionQuestion: 'Who does your leadership posture signal that you are to your board right now: a manager or a statesman?'
  },
  {
    letter: 'J',
    title: 'Judicious Scarcity',
    tagline: 'Capacity capped at 4 enterprise calibrations per quarter.',
    category: 'Prestige Scarcity',
    strategicRule: 'Scarcity creates value only when paired with uncompromising quality. Artificial urgency is sleaze; real structural capacity is luxury.',
    tulcExecution: 'We maintain strict operational limits: exactly four institutional engagements per calendar quarter. We never take on a fifth. When prospective clients hear that our calendar is filled, their perceived value of our time surges.',
    executiveScript: '"We accept four institutional partnerships each quarter to protect the depth of our advisory immersion. We are currently booking Q3."',
    keyTakeaway: 'Saying no to 90% of requests is the prerequisite for commanding reverence from the 10%.',
    reflectionQuestion: 'If you capped your client volume by 50% tomorrow, what would have to change about your delivery quality?'
  },
  {
    letter: 'K',
    title: 'Kinetic Storytelling',
    tagline: 'Quiet revolutions, mathematical outcomes.',
    category: 'Generosity & Proof',
    strategicRule: 'Stories are how we make sense of change. A good story doesn’t exaggerate; it illustrates the human soul inside a systemic shift.',
    tulcExecution: 'We tell real stories of quiet revolutions: The CEO of a $120M fintech who went from 72 weekly hours and panic attacks to 32 focused hours, zero operational meetings, and record EBITDA growth within 6 months.',
    executiveScript: '"He didn’t need more resilience training. He needed a leadership operating system that didn’t depend on his nervous system to survive."',
    keyTakeaway: 'Share the emotional turning point, then back it with financial physics.',
    reflectionQuestion: 'What is the personal story of relief you want to be able to tell your spouse one year from today?'
  },
  {
    letter: 'L',
    title: 'Linchpin Architecture',
    tagline: 'From indispensable bottleneck to indispensable visionary.',
    category: 'Tribal Attraction',
    strategicRule: 'The Linchpin does not hoard knowledge. The Linchpin invents the conditions under which other people flourish without supervision.',
    tulcExecution: 'We dismantle the myth that the leader must be the linchpin of everyday decision-making. We re-engineer the leader into the linchpin of philosophical clarity, governance design, and capital allocation.',
    executiveScript: '"If you are the only one who can solve a customer complaint, you are not a linchpin—you are a bottleneck holding your enterprise hostage."',
    keyTakeaway: 'The highest calling of a leader is to make themselves dispensable to operations and indispensable to direction.',
    reflectionQuestion: 'What decision was made in your company this week that you personally should never have been asked to make?'
  },
  {
    letter: 'M',
    title: 'Micro-Commitments',
    tagline: 'Replace the intimidating contract with an enlightened 5-minute diagnostic.',
    category: 'Generosity & Proof',
    strategicRule: 'Never ask a stranger to marry you on the first date. Design small, low-risk steps that naturally escalate commitment.',
    tulcExecution: 'We don’t begin with a 6-month contract discussion. We invite executives to take the 5-Minute Sovereign Operating Index Diagnostic. The diagnostic delivers instant value and surfaces their exact friction points.',
    executiveScript: '"Do not commit to working with us. Take our 5-minute diagnostic to determine where your leadership system leaks the most energy."',
    keyTakeaway: 'Remove commercial friction; increase intellectual curiosity.',
    reflectionQuestion: 'How easy is it for an interested prospective client to experience your brilliance before opening their wallet?'
  },
  {
    letter: 'N',
    title: 'Non-Interruption (Permission Marketing)',
    tagline: 'A private dispatch read by choice, never spam.',
    category: 'Tribal Attraction',
    strategicRule: 'Permission marketing is the privilege (not the right) of delivering anticipated, personal, and relevant messages to people who want to get them.',
    tulcExecution: 'We do not run cold outreach cadences on LinkedIn or scrape email lists. Our readership comes through word-of-mouth recommendations among founders and board chairs who forward our Sovereign Briefing to their peers.',
    executiveScript: '"We never spam inboxes. We publish when we have a structural revelation worth commanding an executive’s undivided focus."',
    keyTakeaway: 'Attention earned with consent is worth 100x attention stolen with interruption.',
    reflectionQuestion: 'Would your audience actively miss your emails if you stopped sending them for 60 days?'
  },
  {
    letter: 'O',
    title: 'Opinionated Stance',
    tagline: 'Stand firmly against managerial fads and performative hustle.',
    category: 'Constructive Tension',
    strategicRule: 'Bland brands die in obscurity. If nobody disagrees with your philosophy, nobody cares about your existence.',
    tulcExecution: 'We publicly condemn "hustle porn", 200-page slide decks, OKR theater, and toxic consensus culture. We stand for radical clarity, minimal meetings, and institutional sovereignty.',
    executiveScript: '"We believe 80% of management meetings are an expensive substitute for clear governance rules."',
    keyTakeaway: 'Your enemies define your tribe just as much as your values do.',
    reflectionQuestion: 'What common industry dogma are you secretly disgusted by but afraid to publicly challenge?'
  },
  {
    letter: 'P',
    title: 'Purple Cow (Remarkable Contrast)',
    tagline: 'Be so remarkably distinct that people have to talk about you.',
    category: 'Constructive Tension',
    strategicRule: 'In a crowded marketplace, fitting in is failure. In a busy marketplace, not standing out is the same as being invisible.',
    tulcExecution: 'While other consulting firms send armies of junior analysts in suits to bill hourly rates, TULC installs a 1-page Sovereign Operating System backed by a binding 90-day institutional transformation guarantee.',
    executiveScript: '"We do not bill by the hour. We do not deliver 150 slides. We install five foundational governance circuits that return 15 hours a week to your executive suite."',
    keyTakeaway: 'Remarkable means worth making a remark about.',
    reflectionQuestion: 'When a CEO describes your firm to their fellow board members over dinner, what single remarkable sentence do they say?'
  },
  {
    letter: 'Q',
    title: 'Quality as Aesthetic Culture',
    tagline: 'Obsidian clarity, editorial dignity, zero clutter.',
    category: 'Generosity & Proof',
    strategicRule: 'Design is not superficial decoration; design is how you demonstrate respect for the customer’s intelligence and time.',
    tulcExecution: 'Every interface, report, and document created by TULC reflects uncompromising typographic discipline, restrained palette harmony, and intellectual poise. The aesthetic itself signals institutional permanence.',
    executiveScript: '"Our documents look like museum catalogs and executive treaties, not PowerPoint templates."',
    keyTakeaway: 'Beauty in execution is the ultimate sign of internal organizational rigor.',
    reflectionQuestion: 'Does the visual presence of your brand reflect the multimillion-dollar caliber of your intellect?'
  },
  {
    letter: 'R',
    title: 'Relational Trust Protocol',
    tagline: 'Confidentiality as sacred institutional doctrine.',
    category: 'Prestige Scarcity',
    strategicRule: 'Trust is built in drops and lost in buckets. You cannot engineer trust; you earn it through predictable, courageous integrity.',
    tulcExecution: 'We operate with Swiss banking-level discretion. We never parade our client roster for social clout. We create a vault where leaders can voice their deepest fears without exposure.',
    executiveScript: '"What happens in our calibration sessions never leaves the room. Your vulnerability is treated with absolute sovereign discretion."',
    keyTakeaway: 'High-caliber founders value confidential safety far above public case studies.',
    reflectionQuestion: 'Do your prospects believe you are keeping their strategic challenges safe, or do they fear becoming a case study?'
  },
  {
    letter: 'S',
    title: 'Status Elevation',
    tagline: 'From overworked manager to institutional statesman.',
    category: 'Tribal Attraction',
    strategicRule: 'Status is not vanity. Status is how human beings negotiate safety, belonging, and leadership inside an organization.',
    tulcExecution: 'We shift the leader’s perceived status from someone who reacts to crises into the architect whose presence grounds the room with effortless poise. Boards treat them differently; investors treat them differently.',
    executiveScript: '"You are not paid for your effort. You are paid for the caliber of your judgment and the resilience of the systems you commission."',
    keyTakeaway: 'When you elevate their internal status, their external effectiveness compounds automatically.',
    reflectionQuestion: 'In what ways are you degrading your own executive status by jumping in to solve problems your team should own?'
  },
  {
    letter: 'T',
    title: 'The Tribe Doctrine',
    tagline: 'Sovereign architects build institutions that outlive their presence.',
    category: 'Tribal Attraction',
    strategicRule: 'A group needs only two things to become a tribe: a shared interest and a way to communicate.',
    tulcExecution: 'We cultivate the Sovereign Leadership Guild: a closed community of high-growth founders and executives who reject burnout as a badge of honor and embrace systemic architecture as the true art of compounding.',
    executiveScript: '"In our circle, exhaustion is not respected; it is diagnosed as an architectural defect. Sovereign leaders engineer what outlives them."',
    keyTakeaway: 'A strong tribe defends the culture and recruits its own members with zero sales friction.',
    reflectionQuestion: 'What are the sacred rituals and shared idioms that unify the leaders who resonate with your mission?'
  },
  {
    letter: 'U',
    title: 'Unbounded Operating Architecture',
    tagline: 'The proprietary 5-domain governance engine.',
    category: 'Generosity & Proof',
    strategicRule: 'A proprietary mechanism gives people something tangible to anchor their faith to when traditional methods fail.',
    tulcExecution: 'We don’t offer generic advice; we install the Unbounded Operating Architecture across 5 domains: Cognitive Surplus, Governance Clarity, Capital Velocity, Systemic Autonomy, and Sovereign Voice.',
    executiveScript: '"We don’t give you tips. We install five institutional circuits that run autonomously whether you are in Tokyo or Aspen."',
    keyTakeaway: 'A named, proprietary mechanism creates category exclusivity.',
    reflectionQuestion: 'Have you codified your secret sauce into an unmistakable 5-part architecture that can be taught in 10 minutes?'
  },
  {
    letter: 'V',
    title: 'Value Upfront',
    tagline: 'Solve their real pain before asking for a signature.',
    category: 'Generosity & Proof',
    strategicRule: 'The best way to show someone what you can do tomorrow is to do something miraculous for them right now.',
    tulcExecution: 'During the introductory calibration debrief, we resolve one thorny governance knot for the client on the spot, free of charge. They walk away with immense value regardless of whether they retain us.',
    executiveScript: '"Let us take your worst bottleneck right now. In 20 minutes, we will map the exact delegation circuit to eliminate it permanently."',
    keyTakeaway: 'When you deliver immediate breakthrough value upfront, charging for full implementation is obvious.',
    reflectionQuestion: 'What is the highest-value breakthrough you can deliver in an introductory session that makes hiring you inevitable?'
  },
  {
    letter: 'W',
    title: 'Word-of-Mouth Architecture',
    tagline: 'Make your ideas so clear they are quoted at dinner tables.',
    category: 'Tribal Attraction',
    strategicRule: 'Ideas that spread, win. Make your ideas portable, sticky, and generous enough that people sound smarter when they repeat them.',
    tulcExecution: 'We coin unforgettable, punchy mental models: "Cognitive Surplus vs. Cognitive Debt", "The Sovereign Hour", "The Delegation Voltage Drop". Founders repeat them to their executive boards, sparking curiosity.',
    executiveScript: '"A board member heard our phrase \'The Delegation Voltage Drop\' and called us the next morning asking to audit their executive layer."',
    keyTakeaway: 'Design your concepts to be conversational currency among executives.',
    reflectionQuestion: 'What phrase or concept do you own that a CEO will quote to another CEO at a private dinner?'
  },
  {
    letter: 'X',
    title: 'eXclusion Criteria (Polarization)',
    tagline: 'Unapologetically declare who we turn away.',
    category: 'Prestige Scarcity',
    strategicRule: 'The quickest way to fail is to try to please everyone. The greatest brands are beloved precisely because they repel the wrong people.',
    tulcExecution: 'We publicly state our disqualifiers: micromanagers who derive identity from control, vanity founders seeking yes-men, and organizations unwilling to let junior talent own autonomous decisions.',
    executiveScript: '"If you love being the center of every conversation and micromanaging project trackers, TULC will make you deeply uncomfortable. We are not for you."',
    keyTakeaway: 'The clearest signal of high value is the willingness to refuse money from the wrong client.',
    reflectionQuestion: 'Who should you turn away immediately, and why have you been hesitating to say so publicly?'
  },
  {
    letter: 'Y',
    title: 'Yield & Cognitive ROI',
    tagline: 'Measure return in peace of mind, not just EBITDA multiples.',
    category: 'Constructive Tension',
    strategicRule: 'Real value is multidimensional. If you only measure the spreadsheets, you miss what human beings truly thirst for: freedom and autonomy.',
    tulcExecution: 'While our systems routinely generate 3x–10x enterprise ROI, our primary metric is Cognitive Yield: the number of deep, uninterrupted strategic hours reclaimed by the CEO and the reduction of executive turnover to zero.',
    executiveScript: '"We measure success by two numbers: enterprise valuation growth and whether you sleep through the night without checking Slack."',
    keyTakeaway: 'Frame your ROI in the emotional currency leaders secretly crave most.',
    reflectionQuestion: 'What is the monetary and emotional cost of your current level of executive fatigue over the next 3 years?'
  },
  {
    letter: 'Z',
    title: 'Zero-Resistance Calibration',
    tagline: 'A white-glove, 48-hour diagnostic debrief that feels like destiny.',
    category: 'Prestige Scarcity',
    strategicRule: 'Remove friction at the moment of truth. Make the step across the threshold seamless, natural, and dignified.',
    tulcExecution: 'Our onboarding is frictionless. No 40-page contract legal battles. A 1-page Institutional Treaty, a 48-hour calibration timeline, and an immediate start to systemic liberation.',
    executiveScript: '"No procurement bureaucracy. We sign a single-page Sovereign Treaty and begin your leadership architectural overhaul on Monday."',
    keyTakeaway: 'Dignified velocity beats corporate delay every single time.',
    reflectionQuestion: 'How many unnecessary bureaucratic hurdles have you placed between an excited prospect and their first breakthrough with you?'
  }
];

export const STRATEGIC_PLAYBOOK = SOVEREIGN_PLAYBOOK;
