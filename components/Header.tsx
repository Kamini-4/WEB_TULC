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
    { name: 'Services', path: '/services', icon: Shield },
    { name: 'Digital Products', path: '/products', icon: Layers, highlight: true },
    { name: 'How It Works', path: '/methodology', icon: Activity },
    { name: 'Two-Week Test', path: '/assessment', icon: Activity },
    { name: 'Freedom Calculator', path: '/cognitive-tax', icon: Calculator },
    { name: 'Dispatches', path: '/library', icon: FileText },
    { name: 'About Suchita', path: '/about', icon: UserCheck },
  ];

  const isActive = (path: string) => location.pathname === path || (path === '/products' && (location.pathname === '/shop' || location.pathname === '/toolkits'));

  return (
    <header className="sticky top-0 z-50 bg-[#f7f4ee]/95 backdrop-blur-md border-b border-[#e2dcce] transition-all font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Identity with Tight Kerning */}
        <Link to="/" className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8860b]">
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-xs uppercase tracking-tight font-medium">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors py-1 border-b-2 flex items-center gap-1.5 ${
                  active 
                    ? 'text-[#8c6708] border-[#8c6708] font-bold' 
                    : link.highlight
                      ? 'text-[#1c1917] font-semibold border-transparent hover:text-[#8c6708] hover:border-[#8c6708]'
                      : 'text-[#57534e] border-transparent hover:text-[#1c1917] hover:border-[#b8860b]/40'
                }`}
              >
                <span>{link.name}</span>
                {link.highlight && (
                  <span className="px-1.5 py-0.2 bg-[#1c1917] text-[#f7f4ee] text-[9px] font-sans font-bold uppercase tracking-wider rounded-2xs border border-[#b8860b]/30">
                    Lead OS
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/intake"
            className="inline-flex items-center gap-2 px-4.5 py-2 bg-black hover:bg-[#b8860b] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6708]"
          >
            <span>Start A Conversation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#57534e] hover:text-[#1c1917] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8860b]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#e2dcce] bg-[#f7f4ee] px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const IconComponent = link.icon;
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
                  <IconComponent className="w-4 h-4 text-[#8c6708]" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="pt-3 border-t border-[#e2dcce]">
            <Link
              to="/intake"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#b8860b] text-white text-xs font-bold uppercase tracking-tight rounded-xs"
            >
              <span>Start A Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
