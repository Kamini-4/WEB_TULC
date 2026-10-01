import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';

interface HeaderProps {
  onAdminTrigger?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminTrigger }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (e.altKey && onAdminTrigger) {
      onAdminTrigger();
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'How It Works', path: '/methodology' },
    { label: 'Services', path: '/services' },
    { label: 'Toolkits', path: '/toolkits' },
    { label: 'Blogs', path: '/library' },
  ];

  const handleNavClick = (path: string, e: React.MouseEvent, external?: boolean) => {
    if (external) {
      return;
    }
    if (path.includes('#')) {
      e.preventDefault();
      const [route, hash] = path.split('#');
      const normalizedCurrent = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '');
      const normalizedTarget = route === '/' ? '/' : route.replace(/\/$/, '');
      
      if (normalizedCurrent === normalizedTarget) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(path);
      }
    }
    setIsMenuOpen(false);
  };

  const scrollToWaitlist = () => {
    navigate('/intake');
    setIsMenuOpen(false);
  };

  return (
    <header className="relative z-[100] bg-[#f5f5f0]/95 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          className="flex flex-col cursor-pointer group min-w-0 shrink-0 select-none py-1" 
          onClick={handleLogoClick}
          title="Hold Alt to access Sovereign Ledger"
        >
          <span className="text-base sm:text-xl md:text-2xl font-bold font-serif tracking-tight text-[#111111] group-hover:text-[#b8860b] transition-colors duration-300 truncate">
            THE UNBOUNDED
          </span>
          <div className="flex items-center gap-2 -mt-0.5 sm:-mt-1">
            <div className="h-[1px] w-3 sm:w-5 bg-[#b8860b] shrink-0" />
            <span className="text-[7px] sm:text-[8px] md:text-[9px] uppercase text-[#b8860b] font-mono font-bold tracking-widest sm:truncate">
              LEADERSHIP CO.
            </span>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="flex items-center gap-4 lg:gap-6 xl:gap-8 ml-auto">
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/toolkits' && (location.pathname === '/shop' || location.pathname === '/systems' || location.pathname === '/vault' || location.pathname === '/operational-vault'));
              return (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavClick(item.path, e)}
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className={`text-sm xl:text-base font-serif font-bold tracking-wide transition-all duration-200 relative py-1 flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    isActive 
                      ? 'text-[#b8860b] font-black' 
                      : 'text-[#111111] hover:text-[#b8860b]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#b8860b]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Utility Zone: Client Portal & CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link 
              to="/portal"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs xl:text-sm font-serif font-bold tracking-wide text-[#111111] hover:text-[#b8860b] border border-zinc-300 hover:border-[#b8860b] rounded-xs transition-all duration-200 bg-white"
              title="Client Portal Access"
            >
              <Lock className="w-3 h-3 text-[#b8860b]" />
              <span>Portal</span>
            </Link>

            <button 
              onClick={scrollToWaitlist}
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="inline-flex items-center justify-center px-4 lg:px-5 py-2 bg-[#111111] hover:bg-[#b8860b] text-white text-xs xl:text-sm font-serif font-bold tracking-wide transition-all duration-300 shadow-sm cursor-pointer border border-black/20"
            >
              Book Consultation
            </button>
          </div>
          
          {/* Mobile Menu Hamburger Toggle */}
          <button 
            className="lg:hidden p-2 text-[#111111] hover:text-[#b8860b] cursor-pointer transition-colors focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
          >
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 mb-1.5 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 mb-1.5 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[95px] sm:top-[102px] bg-[#f5f5f0] z-[90] p-6 sm:p-8 animate-fade-in overflow-y-auto border-t border-zinc-200">
          <div className="flex flex-col gap-5 max-w-lg mx-auto">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold tracking-widest mb-1">
              Executive Directory
            </span>

            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/toolkits' && (location.pathname === '/shop' || location.pathname === '/systems' || location.pathname === '/vault' || location.pathname === '/operational-vault'));
              return (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavClick(item.path, e)}
                  className={`text-lg sm:text-xl font-extrabold font-serif tracking-wide border-b border-zinc-200/80 pb-3 flex items-center justify-between transition-colors ${
                    isActive ? 'text-[#b8860b]' : 'text-[#111111] hover:text-[#b8860b]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                  </div>
                  {isActive ? (
                    <span className="text-[10px] font-mono text-[#b8860b] font-bold">CURRENT</span>
                  ) : (
                    <span className="text-zinc-400 text-sm font-mono">→</span>
                  )}
                </Link>
              );
            })}

            <Link 
              to="/assessment" 
              onClick={(e) => handleNavClick('/assessment', e)}
              className="text-lg sm:text-xl font-extrabold font-serif tracking-wide border-b border-zinc-200/80 pb-3 flex items-center justify-between text-[#111111] hover:text-[#b8860b]"
            >
              <span>90-Sec Diagnostic</span>
              <span className="text-zinc-400 text-sm font-mono">→</span>
            </Link>

            <Link 
              to="/portal"
              onClick={(e) => handleNavClick('/portal', e)}
              className="text-base sm:text-lg font-bold uppercase tracking-wide border-b border-zinc-200/80 pb-2.5 flex items-center justify-between text-zinc-800 hover:text-[#b8860b]"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>Client Portal</span>
              </div>
              <span className="text-zinc-400 text-sm font-mono">→</span>
            </Link>

            <button 
              onClick={scrollToWaitlist}
              className="mt-2 py-3 bg-[#111111] hover:bg-[#b8860b] text-white text-xs font-mono font-bold uppercase tracking-widest cursor-pointer transition-colors shadow-md text-center"
            >
              Book Confidential Consultation
            </button>

            {/* Direct Contact In Mobile Drawer */}
            <div className="flex flex-col gap-2 pt-4 border-t border-zinc-300 text-xs font-mono text-zinc-650">
              <a href="tel:+919325346704" aria-label="Call Direct: +91 9325346704" className="text-[#b8860b] hover:underline font-bold py-1.5 flex items-center gap-2">
                <span>📞</span>
                <span>Direct Line: +91 9325346704</span>
              </a>
              <a href="mailto:suchita@theunboundedleadership.com" aria-label="Email suchita@theunboundedleadership.com" className="text-zinc-700 hover:text-[#b8860b] py-1 flex items-center gap-2">
                <span>✉️</span>
                <span>suchita@theunboundedleadership.com</span>
              </a>
              <span className="text-[10px] text-zinc-500 pt-2">
                🔒 Zero Data Retention • Confidential Advisory
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
