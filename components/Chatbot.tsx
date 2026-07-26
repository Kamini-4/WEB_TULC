import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Loader2, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Helper to scrub all raw markdown tags (stars, hashes, bullet symbols) to render pristine human-like text
const sanitizeContent = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/\*\*/g, '')          // Strip bold markers
    .replace(/\*/g, '')            // Strip italic markers
    .replace(/###/g, '')           // Strip H3 markers
    .replace(/##/g, '')            // Strip H2 markers
    .replace(/#/g, '')             // Strip single hashes
    .replace(/^[-+*]\s+/gm, '• ') // Convert raw markdown bullets to elegant bullet characters
    .replace(/^\s*[-+*]\s+/gm, '• ')
    .trim();
};

interface ChatbotProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen: propIsOpen, setIsOpen: propSetIsOpen }) => {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : localIsOpen;
  const setIsOpen = propSetIsOpen !== undefined ? propSetIsOpen : setLocalIsOpen;

  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Welcome to The Unbounded Leadership Co. I am the Sovereign AI Concierge, here to answer your questions, outline our core strategic objectives, or guide you through our methodology.\n\nHow can I assist you with your leadership alignment today?',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const SUGGESTIONS = [
    { label: 'How does the workflow work?', query: 'Please detail your exact 4-step institutional calibration workflow.' },
    { label: 'Tell me about Phase 0.0 Audit', query: 'What does the 14-day Phase 0.0 Substrate Diagnostic Audit entail?' },
    { label: 'How can Suchita help me?', query: 'How does Suchita\'s engineer and industrial psychologist background help reclaim my bandwidth?' },
    { label: 'How do we begin?', query: 'What is the first step to initiate our diagnostic alignment?' }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const formattedHistory = history.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: formattedHistory
        })
      });

      if (!response.ok) {
        throw new Error('The connection to the Concierge service was interrupted.');
      }

      const data = await response.json();
      const sanitizedText = sanitizeContent(data.text || 'I apologize. I was unable to retrieve a response from the central alignment servers.');
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: sanitizedText,
        timestamp: new Date()
      };

      setHistory(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setHistory(prev => [...prev, {
        role: 'assistant',
        content: 'Greetings. The digital concierge link is currently operating on our secure backup channel.\nFor prioritized scheduling, custom diagnostic proposals, or to coordinate directly with Suchita Sancheti\'s office, please contact Kamini Agnihotri at kaminiagnihotri249@gmail.com.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 md:right-8 md:bottom-8 z-50">
      <AnimatePresence>
        {/* Chat window */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px] max-h-[600px] h-[80vh] bg-[#fdfdfc] border border-[#b8860b]/40 shadow-2xl flex flex-col rounded-sm overflow-hidden text-left"
          >
            {/* Header */}
            <div className="bg-[#111111] text-white p-4 border-b border-[#b8860b]/30 flex justify-between items-center relative">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#b8860b] via-[#e5c158] to-[#b8860b]" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xs border border-[#b8860b] flex items-center justify-center bg-zinc-900">
                  <Bot className="w-4 h-4 text-[#b8860b]" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-white">Sovereign Concierge</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-mono uppercase text-zinc-400">Institutional Channel</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors rounded-xs border border-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Shield Notice */}
            <div className="bg-zinc-50 border-b border-zinc-200/60 py-2 px-4 flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b]" />
              <span>Privileged alignment query | Ephemeral diagnostic channel.</span>
            </div>

            {/* Messages log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fbfbfa] custom-scrollbar">
              {history.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-sm p-4 text-xs leading-relaxed border ${
                    msg.role === 'user' 
                      ? 'bg-[#111111] text-[#f5f5f0] border-zinc-950 font-medium' 
                      : 'bg-white text-zinc-800 border-zinc-200/80 italic font-light shadow-xs'
                  }`}>
                    {/* Preserve line breaks */}
                    {msg.content.split('\n').map((para, pIdx) => (
                      <p key={pIdx} className={pIdx > 0 ? 'mt-2' : ''}>
                        {para}
                      </p>
                    ))}
                    <div className={`text-[8px] font-mono mt-2 text-right ${
                      msg.role === 'user' ? 'text-zinc-500' : 'text-zinc-400'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-zinc-200/80 rounded-sm p-4 max-w-[85%] flex items-center gap-3">
                    <Loader2 className="w-4 h-4 text-[#b8860b] animate-spin" />
                    <span className="text-[10px] font-mono uppercase text-zinc-500">Formulating response...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Chips - displayed only when input is empty */}
            {message.trim() === '' && !isLoading && (
              <div className="px-4 py-2 bg-zinc-50 border-t border-zinc-100 flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                {SUGGESTIONS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip.query)}
                    className="text-[9px] uppercase font-semibold border border-zinc-200 bg-white hover:border-[#b8860b] hover:text-[#b8860b] text-zinc-600 px-2.5 py-1.5 transition-all text-left flex items-center gap-1"
                  >
                    {chip.label} <ArrowUpRight className="w-2.5 h-2.5 shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {/* Input Footer */}
            <div className="p-3 border-t border-zinc-200 bg-white flex items-center gap-2">
              <input
                type="text"
                placeholder="Submit your leadership or alignment query..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(message);
                  }
                }}
                disabled={isLoading}
                className="flex-1 text-xs border border-zinc-200 hover:border-zinc-300 focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b]/20 outline-none p-3 rounded-xs font-light"
              />
              <button
                onClick={() => handleSendMessage(message)}
                disabled={isLoading || !message.trim()}
                className="bg-[#111111] hover:bg-[#b8860b] disabled:bg-zinc-200 text-white disabled:text-zinc-400 p-3 rounded-xs border border-zinc-950 disabled:border-zinc-200 transition-colors shrink-0"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-5 py-4 shadow-2xl transition-all duration-500 relative border ${
          isOpen 
            ? 'bg-[#111111] text-[#f5f5f0] border-zinc-800' 
            : 'bg-white text-zinc-900 border-[#b8860b]/40 hover:border-[#b8860b]'
        }`}
      >
        <div className="relative">
          <MessageSquare className={`w-5 h-5 ${isOpen ? 'text-[#b8860b]' : 'text-[#b8860b]'}`} />
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#b8860b] rounded-full border border-white animate-pulse" />
          )}
        </div>
        <span className="text-[10px] font-black uppercase ">
          {isOpen ? 'Close Concierge' : 'Sovereign Concierge'}
        </span>
        
        {/* Subtle border pulse when closed */}
        {!isOpen && (
          <div className="absolute inset-0 border border-[#b8860b]/30 animate-pulse pointer-events-none" />
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
