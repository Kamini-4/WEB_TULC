
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

  const navItems = [
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Mandates', path: '/mandates' },
    { label: 'Assessment', path: '/assessment' },
    { label: 'Library', path: '/library' },
    { label: 'Portal', path: '/portal' },
  ];

  const handleNavClick = (path: string, e: React.MouseEvent, external?: boolean) => {
    if (external) {
      return; // Let the Link or a tag handle it
    }
    if (path.includes('#')) {
      e.preventDefault();
      const [route, hash] = path.split('#');
      // Normalize routes for comparison (e.g., remove leading/trailing slashes or empty strings)
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
    <header className="relative z-[100] bg-[#f5f5f0] border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 md:h-18 flex items-center justify-between">
        <div 
          className="flex flex-col cursor-pointer group min-w-0 shrink-0" 
          onClick={handleLogoClick}
          title="Hold Alt to access Sovereign Ledger"
        >
          <span className="text-base sm:text-xl md:text-2xl font-bold text-[#111111] group-hover:text-[#b8860b] transition-colors duration-500 truncate">THE UNBOUNDED</span>
          <div className="flex items-center gap-2 -mt-1">
            <div className="h-[1px] w-3 md:w-6 bg-[#b8860b] shrink-0"></div>
            <span className="text-[6px] sm:text-[8px] md:text-[9px] uppercase text-[#b8860b] font-black sm:truncate">LEADERSHIP CO.</span>
          </div>
        </div>
        
        <nav className="flex items-center gap-3 sm:gap-4 md:gap-8 ml-auto">
          <div className="hidden md:flex items-center gap-6 lg:gap-10 mr-4">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-black uppercase text-[#111111] hover:text-[#b8860b] transition-colors "
                >
                  {item.label}
                </a>
              ) : (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavClick(item.path, e)}
                  className="text-[9px] font-black uppercase text-[#111111] hover:text-[#b8860b] transition-colors "
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
          <button 
            onClick={scrollToWaitlist}
            className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-[#111111] text-white hover:bg-black transition-all duration-500 shadow-xl text-[8px] sm:text-[10px] uppercase font-bold border border-white/10"
          >
            REQUEST ACCESS
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-[#111111]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-5 h-px bg-[#111111] mb-1.5"></div>
            <div className="w-5 h-px bg-[#111111] mb-1.5"></div>
            <div className="w-5 h-px bg-[#111111]"></div>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[124px] sm:top-[124px] bg-[#f5f5f0] z-[90] p-8 animate-fade-in overflow-y-auto">
          <div className="flex flex-col gap-8">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-[#111111] text-left uppercase border-b border-zinc-200 pb-4"
                >
                  {item.label}
                </a>
              ) : (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavClick(item.path, e)}
                  className="text-xl font-bold text-[#111111] text-left uppercase border-b border-zinc-200 pb-4"
                >
                  {item.label}
                </Link>
              )
            ))}
            <button 
              onClick={scrollToWaitlist}
              className="mt-4 py-5 bg-[#111111] text-white text-xs font-black uppercase "
            >
              REQUEST SOVEREIGN ACCESS
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

const StatusIndicator: React.FC<{ label: string; value: string; active?: boolean }> = ({ label, value, active }) => (
  <div className="flex flex-col">
    <span className="text-[7px] uppercase font-black text-zinc-400 mb-1">{label}</span>
    <div className="flex items-center gap-2">
      <div className={`w-1 h-1 rounded-full ${active ? 'bg-green-500 animate-pulse' : 'bg-[#b8860b]'}`} />
      <span className="text-[9px] uppercase font-bold text-[#111111] ">{value}</span>
    </div>
  </div>
);

export default Header;
