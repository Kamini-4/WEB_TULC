import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Compass, 
  Menu, 
  X, 
  ArrowRight,
  Shield,
  Activity,
  UserCheck,
  Lock,
  Headphones,
  ChevronDown,
  Layers,
  Calculator,
  FileText,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { ConciergeModal } from './ConciergeModal';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const location = useLocation();

  // Essential Primary Links (Uncrowded, focused)
  const primaryLinks = [
    { name: 'Services', path: '/services', icon: Shield },
    { name: 'Two-Week Test', path: '/assessment', icon: Activity }
  ];

  // Secondary & Strategic items housed cleanly inside Menu dropdown
  const menuLinks = [
    { name: 'About Principal & Firm', path: '/about', icon: UserCheck, desc: 'Suchita Sancheti & the sovereign governance philosophy' },
    { name: 'Systemic Methodology', path: '/methodology', icon: Compass, desc: 'Cybernetics, invariant substrates & cognitive load' },
    { name: 'Turnkey Digital Toolkits', path: '/products', icon: Layers, desc: 'Notion & Coda operating workspaces ($27–$197)' },
    { name: 'Cognitive Tax Calculator', path: '/cognitive-tax', icon: Calculator, desc: 'Quantify annual EBITDA lost to coordination drag' },
    { name: 'Seth Godin Strategic Playbook', path: '/playbook', icon: BookOpen, desc: 'A–Z strategic doctrine on tension, tribes & permission' },
    { name: 'Intellectual Dispatches', path: '/library', icon: FileText, desc: 'Research briefings on authority, governance & scale' },
    { name: 'Reddit Founder FAQs', path: '/faq', icon: HelpCircle, desc: 'Answers to the top questions asked on r/entrepreneur' }
  ];

  const isActive = (path: string) => {
    if (path === '/products') return location.pathname === '/products' || location.pathname === '/shop' || location.pathname === '/toolkits';
    return location.pathname === path;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#f7f4ee]/95 backdrop-blur-md border-b border-[#e2dcce] transition-all font-serif">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
          
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8860b] shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xs bg-[#efebe2] border border-[#b8860b]/30 flex items-center justify-center text-[#8c6708] shadow-xs group-hover:border-[#8c6708] transition-colors">
              <Compass className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#8c6708]" />
            </div>
            <div className="flex flex-col">
              <span className="tracking-tighter text-xs sm:text-sm font-bold text-[#1c1917] uppercase group-hover:text-[#8c6708] transition-colors font-serif" style={{ letterSpacing: '-0.035em' }}>
                The Unbounded
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-tight text-[#78716c] uppercase font-serif" style={{ letterSpacing: '-0.025em' }}>
                Leadership Co.
              </span>
            </div>
          </Link>

          {/* Clean, Uncrowded Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs uppercase tracking-tight font-medium">
            {primaryLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors py-1 border-b-2 ${
                    active 
                      ? 'text-[#8c6708] border-[#8c6708] font-bold' 
                      : 'text-[#57534e] border-transparent hover:text-[#1c1917] hover:border-[#b8860b]/40'
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* Strategic Menu Dropdown (Houses all secondary items without top crowding) */}
            <div 
              className="relative"
              onMouseEnter={() => setMenuDropdownOpen(true)}
              onMouseLeave={() => setMenuDropdownOpen(false)}
            >
              <button 
                type="button"
                onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
                className={`flex items-center gap-1.5 py-1 border-b-2 text-[#57534e] hover:text-[#1c1917] transition-colors cursor-pointer border-transparent ${
                  menuLinks.some(l => isActive(l.path)) ? 'text-[#8c6708] font-bold border-[#8c6708]' : ''
                }`}
                aria-expanded={menuDropdownOpen}
              >
                <span>Strategic Menu</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${menuDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {menuDropdownOpen && (
                <div className="absolute top-full right-0 pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-[#ffffff] border border-[#ded6c5] shadow-2xl rounded-xs p-2.5 space-y-1">
                    <div className="px-2.5 py-1 text-[9px] font-mono uppercase font-bold text-[#8c6708] tracking-widest border-b border-[#efebe2]">
                      Executive Architecture & Knowledge
                    </div>
                    {menuLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setMenuDropdownOpen(false)}
                          className={`flex items-start gap-2.5 p-2 rounded-xs transition-colors ${
                            isActive(link.path)
                              ? 'bg-[#efebe2] text-[#8c6708]'
                              : 'text-[#1c1917] hover:bg-[#faf8f5] hover:text-[#8c6708]'
                          }`}
                        >
                          <Icon className="w-4 h-4 text-[#8c6708] shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-bold uppercase tracking-tight">{link.name}</span>
                            <span className="block text-[10px] text-[#78716c] font-normal normal-case leading-snug">{link.desc}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Action Hub: Unmistakable Portal, Concierge, and Initiate Mandate */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* High-Visibility Institutional Portal Button */}
            <Link
              to="/portal"
              title="Enter Institutional Clearance Portal"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 border text-xs font-mono uppercase font-bold tracking-wider rounded-xs transition-all shadow-xs ${
                location.pathname === '/portal'
                  ? 'bg-[#b8860b] text-black border-[#b8860b] font-black'
                  : 'bg-[#1c1917] text-[#b8860b] border-[#b8860b] hover:bg-[#b8860b] hover:text-black'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Portal</span>
            </Link>

            {/* Direct Executive Concierge Trigger */}
            <button
              type="button"
              onClick={() => setConciergeOpen(true)}
              title="Confidential Executive Concierge"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#ded6c5] hover:border-[#b8860b] bg-white hover:bg-[#faf8f5] text-[#8c6708] hover:text-[#1c1917] text-xs font-bold uppercase tracking-tight rounded-xs transition-colors cursor-pointer shadow-2xs"
            >
              <Headphones className="w-3.5 h-3.5 text-[#8c6708]" />
              <span>Concierge</span>
            </button>

            {/* Primary Action Button */}
            <Link
              to="/intake"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-[#8c6708] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6708]"
            >
              <span>Initiate Mandate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Navigation Bar: Portal, Concierge, and Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/portal"
              className="px-2.5 py-1.5 text-xs font-mono uppercase font-bold rounded-xs bg-[#1c1917] border border-[#b8860b] text-[#b8860b] flex items-center gap-1 shadow-2xs"
            >
              <Lock className="w-3 h-3 text-[#b8860b]" />
              <span>Portal</span>
            </Link>

            <button
              type="button"
              onClick={() => setConciergeOpen(true)}
              className="px-2.5 py-1.5 text-xs font-bold uppercase rounded-xs bg-white border border-[#ded6c5] text-[#8c6708] flex items-center gap-1"
            >
              <Headphones className="w-3 h-3 text-[#8c6708]" />
              <span>Concierge</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#57534e] hover:text-[#1c1917] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8860b]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#e2dcce] bg-[#f7f4ee] px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-150">
            <div className="space-y-1">
              {primaryLinks.map((link) => {
                const active = isActive(link.path);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xs text-xs uppercase tracking-tight font-medium ${
                      active 
                        ? 'bg-[#efebe2] text-[#8c6708] font-bold' 
                        : 'text-[#57534e] hover:bg-[#efebe2] hover:text-[#1c1917]'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#8c6708]" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              <div className="pt-2 pb-1 text-[10px] font-mono uppercase font-bold text-[#8c6708] tracking-widest px-3 border-t border-[#e2dcce]">
                Strategic Vault & Systems
              </div>

              {menuLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xs text-xs uppercase tracking-tight text-[#57534e] hover:bg-[#efebe2] hover:text-[#1c1917]"
                  >
                    <Icon className="w-4 h-4 text-[#8c6708]" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              {/* Portal & Concierge Quick Launch */}
              <div className="pt-3 border-t border-[#e2dcce] grid grid-cols-2 gap-2">
                <Link
                  to="/portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#1c1917] border border-[#b8860b] rounded-xs text-xs font-mono font-bold uppercase text-[#b8860b]"
                >
                  <Lock className="w-3.5 h-3.5 text-[#b8860b]" />
                  <span>Enter Portal</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setConciergeOpen(true);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-[#b8860b]/40 rounded-xs text-xs font-bold uppercase text-[#8c6708] cursor-pointer"
                >
                  <Headphones className="w-3.5 h-3.5 text-[#8c6708]" />
                  <span>Concierge</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-[#e2dcce]">
              <Link
                to="/intake"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black hover:bg-[#8c6708] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-colors"
              >
                <span>Initiate Mandate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Concierge Modal */}
      <ConciergeModal isOpen={conciergeOpen} onClose={() => setConciergeOpen(false)} />
    </>
  );
};

export default Header;
