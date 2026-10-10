import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Compass, 
  Layers, 
  FileText, 
  Calculator, 
  Menu, 
  X, 
  ArrowRight,
  Shield,
  Activity,
  UserCheck
} from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Dispatches & Library', path: '/library', icon: FileText },
    { name: 'Methodology', path: '/methodology', icon: Layers },
    { name: 'Mandates & Services', path: '/services', icon: Shield },
    { name: 'Inaction Tax Diagnostic', path: '/assessment', icon: Activity },
    { name: 'Cognitive Tax Engine', path: '/cognitive-tax', icon: Calculator },
    { name: 'About Principal', path: '/about', icon: UserCheck },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#0b0c10]/90 backdrop-blur-md border-b border-[#1f232d] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Identity */}
        <Link to="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8860b]">
          <div className="w-10 h-10 rounded-xs bg-gradient-to-br from-[#1c1f2b] to-[#12141a] border border-[#b8860b]/40 flex items-center justify-center text-[#d4af37] shadow-sm group-hover:border-[#d4af37] transition-colors">
            <Compass className="w-5 h-5 text-[#d4af37]" />
          </div>
          <div className="flex flex-col">
            <span className="font-monumental tracking-widest text-sm font-bold text-white uppercase group-hover:text-[#d4af37] transition-colors">
              The Unbounded
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#9aa1b2] uppercase font-mono-tech">
              Leadership Co.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-wider font-medium">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors py-1 border-b-2 ${
                  active 
                    ? 'text-[#d4af37] border-[#d4af37] font-semibold' 
                    : 'text-[#9aa1b2] border-transparent hover:text-white hover:border-[#1f232d]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Executive Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/intake"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#b8860b] to-[#8c6708] hover:from-[#d4af37] hover:to-[#a17812] text-black text-xs font-bold uppercase tracking-wider rounded-xs transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
          >
            <span>Sovereign Intake</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#9aa1b2] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8860b]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#1f232d] bg-[#12141a] px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xs text-xs uppercase tracking-wider font-medium ${
                    active 
                      ? 'bg-[#1f232d] text-[#d4af37] font-bold' 
                      : 'text-[#9aa1b2] hover:bg-[#1a1c24] hover:text-white'
                  }`}
                >
                  <IconComponent className="w-4 h-4 text-[#d4af37]" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="pt-3 border-t border-[#1f232d]">
            <Link
              to="/intake"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#b8860b] text-black text-xs font-bold uppercase tracking-wider rounded-xs"
            >
              <span>Initiate Sovereign Intake</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
