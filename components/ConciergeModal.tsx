import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Compass, 
  Sparkles, 
  Bot, 
  Loader2, 
  ArrowRight,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { EXECUTIVE_FAQS } from '../src/data/executiveFaqData';
import { INSTITUTIONAL_ARTICLES } from '../src/lib/articles';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const CURATED_QUESTIONS = [
  { label: 'Founder Bottlenecks', query: 'How does Suchita Sancheti eliminate founder decision bottlenecks without operations failing?' },
  { label: 'The Two-Week Test', query: 'What is the Two-Week Step-Away Stress Test and how does an enterprise pass it?' },
  { label: 'Coaching vs Architecture', query: 'What is the difference between executive coaching and leadership architecture?' },
  { label: 'Advisory Retainers', query: 'What are the firm’s core advisory mandates and how are they structured?' },
  { label: 'Corporate Procurement & NDAs', query: 'How are client confidentiality, bilateral NDAs, and corporate SWIFT or GST procurement handled?' },
  { label: 'About Suchita & Kamini', query: 'What is the professional background of Suchita Sancheti and Kamini Agnihotri?' },
  { label: 'Executive Dispatches', query: 'What core topics do your 19 research dispatches cover?' },
  { label: 'Inaction Tax', query: 'What is the Inaction Tax and how do you quantify annual coordination drag?' }
];

export const ConciergeModal: React.FC<ConciergeModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Welcome to The Unbounded Leadership Co. I am your Executive AI Concierge, fully synchronized with the firm’s entire institutional corpus—including all 19 research dispatches, advisory mandates, methodology, and governance doctrines.\n\nAsk me any question regarding founder bottleneck elimination, the Two-Week Step-Away Test, advisory retainers, or how Suchita Sancheti and Kamini Agnihotri partner with scaling enterprises.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: historyPayload })
      });

      if (!res.ok) {
        throw new Error(`API error ${res.status}`);
      }

      const data = await res.json();
      const assistantText = data.text || generateClientSideAnswer(trimmed);

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: assistantText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch {
      // Instant Client-Side Knowledge Base Fallback
      const fallbackReply = generateClientSideAnswer(trimmed);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-serif">
      <div className="relative w-full max-w-3xl bg-[#0e0d0b] border border-[#b8860b]/40 rounded-xs shadow-2xl text-zinc-100 flex flex-col h-[85vh] max-h-[740px] overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 bg-[#14120e] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xs bg-[#efebe2] border border-[#b8860b]/40 flex items-center justify-center text-[#8c6708] shadow-xs">
              <Compass className="w-5 h-5 text-[#8c6708]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-widest text-[#b8860b] font-bold">
                  Executive AI Concierge
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Connected to Full Website Corpus" />
                <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">• Full Website Knowledge Engine</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white font-serif">
                The Unbounded Leadership Co. • Advisory Intelligence
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#0d0c0a]">
          
          {/* Quick Questions Chips Strip */}
          <div className="p-3 border-b border-zinc-900 bg-[#12100d] shrink-0 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#b8860b]" /> Scan Topics:
              </span>
              {CURATED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.query)}
                  className="px-2.5 py-1 rounded-xs bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#b8860b]/50 text-zinc-300 hover:text-white text-[11px] whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Conversation Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  {m.role === 'assistant' ? (
                    <span className="text-[10px] font-mono uppercase text-[#b8860b] font-bold flex items-center gap-1">
                      <Bot className="w-3 h-3" /> TULC Concierge
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
                      Executive Leader
                    </span>
                  )}
                  <span className="text-[9px] font-mono text-zinc-600">• {m.timestamp}</span>
                </div>

                <div
                  className={`max-w-[90%] sm:max-w-[85%] rounded-xs p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#b8860b] text-black font-medium selection:bg-black selection:text-white'
                      : 'bg-zinc-900/90 text-zinc-200 border border-zinc-800/80 shadow-md whitespace-pre-line'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-zinc-400 p-2 font-mono">
                <Loader2 className="w-3.5 h-3.5 text-[#b8860b] animate-spin" />
                <span>Scanning institutional architecture, dispatches & synthesizing reply...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Input Field */}
          <div className="p-3 sm:p-4 border-t border-zinc-800 bg-[#14120e] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputText);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask any question about our services, dispatches, founders, or methodology..."
                className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-[#b8860b] px-3.5 py-2.5 rounded-xs text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus-visible:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="px-4 py-2.5 bg-[#b8860b] hover:bg-white text-black font-bold text-xs uppercase tracking-tight rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <span>Inquire</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
              <span>Direct knowledge retrieval • Zero data retention • No forms required</span>
              <a 
                href="mailto:suchita@theunboundedleadership.com"
                className="text-[#b8860b] hover:underline"
              >
                suchita@theunboundedleadership.com
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

// ==========================================
// CLIENT-SIDE KNOWLEDGE BASE SYNTHESIS ENGINE
// ==========================================
function generateClientSideAnswer(query: string): string {
  const q = query.toLowerCase();

  // 1. Direct FAQ match from executiveFaqData
  const matchedFaq = EXECUTIVE_FAQS.find(faq => {
    const fq = faq.question.toLowerCase();
    const words = q.split(/\s+/).filter(w => w.length > 3);
    const matches = words.filter(w => fq.includes(w));
    return matches.length >= 2;
  });

  if (matchedFaq) {
    let response = `${matchedFaq.answer}\n\n`;
    if (matchedFaq.executiveContext) {
      response += `Institutional Context: ${matchedFaq.executiveContext}\n\n`;
    }
    response += `You can explore all our answers on our Executive FAQ page (/faq) or connect directly with Suchita Sancheti at suchita@theunboundedleadership.com.`;
    return response;
  }

  // 2. Founder bottlenecks & delegation
  if (q.includes('bottleneck') || q.includes('delegate') || q.includes('approval') || q.includes('signing')) {
    return `Founder decision bottlenecks are systemic architectural failures, not personal flaws. When an enterprise scales beyond 15–20 people, founder intuition must be codified into explicit signing boundaries and exception filters.

At The Unbounded Leadership Co., Suchita Sancheti implements Sovereign Decision Mapping:
• Edge teams receive 100% autonomous signature authority under pre-calibrated financial and operational risk ceilings.
• Up to 80% of daily approval pings vanish immediately while protecting against downside risk.
• Routine escalations are filtered using a strict 3-condition gate: (1) Existential legal/brand hazard, (2) Strategic budget variance exceeding threshold, or (3) Cultural violation.

For full diagnostic detail, see our executive dispatch "The Delegation Fallacy" (/library/the-delegation-fallacy) or take the Two-Week Step-Away Test (/assessment).`;
  }

  // 3. Two-week test & sabbaticals
  if (q.includes('two-week') || q.includes('sabbatical') || q.includes('step away') || q.includes('vacation')) {
    return `The Two-Week Step-Away Test is our adversarial benchmark for institutional durability:

If your enterprise cannot operate for 14 continuous days without emergency pings or operational paralysis, you do not own a self-governing asset—you own an exhausting, high-risk job.

Our 90-day architectural sprint embeds self-regulating substrates, escalation filters, and decentralized signing envelopes so the business compounds seamlessly whether you are in the boardroom or completely off the grid.

You can benchmark your enterprise right now by taking the online Two-Week Test (/assessment).`;
  }

  // 4. Coaching vs. Architecture
  if (q.includes('coaching') || q.includes('consulting') || q.includes('difference') || q.includes('architect')) {
    return `The distinction between Executive Coaching, Traditional Consulting, and Leadership Architecture is fundamental:

• Executive Coaching focuses on the individual leader's psychology, emotional regulation, and personal habits.
• Traditional Consulting (McKinsey, BCG) analyzes market conditions and hands over static slide decks for internal teams to decipher.
• Leadership Architecture (TULC) engineers and installs the actual operational infrastructure—decision matrices, authority envelopes, asynchronous meeting hygiene, and governance substrates—directly into the firm's daily cadence. Performance becomes systemic, not dependent on continuous heroics.

For further reading, see our dispatch "Architecture of Authority: Why Systems Outperform Personal Brands" (/library/architecture-of-authority).`;
  }

  // 5. Inaction Tax & Cognitive Drag
  if (q.includes('inaction tax') || q.includes('latency') || q.includes('coordination') || q.includes('drag') || q.includes('cost')) {
    return `The Inaction Tax is the compounding, invisible financial penalty of decision latency. 

When directives stall between boardroom intent and frontline delivery, enterprises leak an estimated 12% to 22% of annual EBITDA. On our platform, leaders can run:
• The interactive Inaction Tax Diagnostic (/assessment)
• The Cognitive Tax Simulation Engine (/cognitive-tax) to quantify their organization's exact dollar drag within 4 minutes.

Research shows that compressing decision-to-execution cycles from 14 days down to 48 hours yields 2.5x strategic velocity and eliminates up to 15 hours of redundant meetings each week.`;
  }

  // 6. Suchita Sancheti & Kamini Agnihotri
  if (q.includes('suchita') || q.includes('sancheti') || q.includes('who are') || q.includes('background') || q.includes('founder') || q.includes('kamini')) {
    return `The Unbounded Leadership Co. was founded by Suchita Sancheti alongside Client Relations Coordinator Kamini Agnihotri.

• Suchita Sancheti (Founder & Enterprise Architect): A Computer Science Engineer and Industrial Psychologist who merges enterprise systems engineering (former SAP consultant) with human behavioral dynamics. She specializes in hard-coding founder intuition into autonomous operating substrates and strictly accepts only 3 active institutional calibrations per quarter.
(Forensic handwriting analysis is Suchita's core personal diagnostic strength, offered exclusively through private 1-on-1 consultations).

• Kamini Agnihotri (Client Relations Coordinator): Coordinates bilateral non-disclosure agreements, executive intake dockets, and confidential scheduling for enterprise CXOs and holding chairs.

Direct confidential communications: suchita@theunboundedleadership.com.`;
  }

  // 7. Retainers, Mandates, Pricing & Services
  if (q.includes('price') || q.includes('cost') || q.includes('fee') || q.includes('retainer') || q.includes('mandate') || q.includes('service') || q.includes('offer')) {
    return `Our engagements are structured across proven institutional formats:

1. The Founder Sovereignty Mandate: A hands-on 90-day implementation sprint to eliminate decision bottlenecks, install signing boundaries, and pass the Two-Week Step-Away Test.
2. The Executive Succession & Transition Mandate: A 6-month structured handover codifying founder judgment so an incoming CEO executes with identical strategic rigor while defending enterprise valuation.
3. Portfolio Enterprise Governance: Annual advisory partnership for PE operating partners and VC boards to eliminate key-person discounts across multiple holdings.
4. Turnkey Digital Leadership Workspaces: Production-ready digital operating systems and toolkits available directly at /products.

For institutional retainers, connect directly with Suchita Sancheti at suchita@theunboundedleadership.com or initiate intake at /intake.`;
  }

  // 8. Procurement, SWIFT, Invoicing & NDAs
  if (q.includes('nda') || q.includes('confidential') || q.includes('procurement') || q.includes('payment') || q.includes('invoice') || q.includes('wire') || q.includes('swift') || q.includes('razorpay') || q.includes('gst')) {
    return `Institutional engagements operate under strict Fiduciary Non-Disclosure protocols:

• Bilateral NDAs are executed prior to diagnostic intake to protect all strategic data.
• International Procurement: Invoiced via formal corporate SWIFT/Wire transfers in USD, EUR, GBP, and SGD with complete corporate documentation.
• Indian Institutional Entities: Full GST-compliant tax invoicing, NEFT/RTGS bank clearance, and Razorpay corporate checkout coordinates provided upon mandate confirmation.
• Zero Data Retention: All assessment telemetry and intake information are handled under zero-persistence security standards.`;
  }

  // 9. Research Dispatches & Library
  if (q.includes('dispatch') || q.includes('article') || q.includes('library') || q.includes('essay') || q.includes('research') || q.includes('reading')) {
    return `Our Research Library (/library) houses 19 definitive executive dispatches on leadership architecture, including:

1. Architecture of Authority: Why Systems Outperform Personal Brands (/library/architecture-of-authority)
2. Strategic Substrates: The Invisible Tax of Unaligned Mental Models (/library/strategic-substrates)
3. The Delegation Fallacy: Preserving Standards via Heuristic Architecture (/library/the-delegation-fallacy)
4. Succession Architecture: The Founder Dilemma (/library/founders-dilemma)
5. The Cognitive Tax of Leadership: Reclaiming Strategic Focus (/library/cognitive-tax-of-leadership)
6. Bridging the Strategy-Execution Gap: Board Alignment (/library/bridging-strategy-execution-gap)
7. Transitioning from Founder to Chairman: Systems Blueprint (/library/transitioning-founder-to-chairman)

Explore the complete collection directly at /library.`;
  }

  // Default response
  return `The Unbounded Leadership Co. focuses on re-architecting leadership operating systems for enterprise founders, CXOs, and boards ($10M to $100M+ revenue).

We replace fragile meeting dependency and founder bottlenecks with self-executing operational substrates, returning 15+ weekly hours of strategic cognitive bandwidth.

You can explore our 19 Executive Dispatches (/library), take the Two-Week Step-Away Test (/assessment), simulate your coordination drag (/cognitive-tax), or email Suchita Sancheti directly at suchita@theunboundedleadership.com.`;
}
