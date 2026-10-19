import React, { useState, useEffect } from 'react';
import { Home, Layers, Activity, ShieldAlert, Send } from 'lucide-react';

interface MobileBottomNavProps {
  onNavigate: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>('top');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['contact', 'proof', 'war-room', 'diagnostic', 'council-chambers', 'partnerships', 'top'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'top', label: 'Overview', icon: Home },
    { id: 'partnerships', label: 'Pathways', icon: Layers },
    { id: 'diagnostic', label: 'Diagnostic', icon: Activity, badge: 'PAT' },
    { id: 'war-room', label: 'War Room', icon: ShieldAlert },
    { id: 'contact', label: 'Briefing', icon: Send },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation Dock"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#f8f6f0]/95 backdrop-blur-md border-t border-[#e5decfe0] lg:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-5 items-center h-14 max-w-md mx-auto px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = 
            item.id === activeSection || 
            (item.id === 'top' && (activeSection === 'top' || activeSection === '')) ||
            (item.id === 'partnerships' && (activeSection === 'partnerships' || activeSection === 'council-chambers'));

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative active:scale-95 ${
                isActive ? 'text-[#9d7b38]' : 'text-[#6b6e76] hover:text-[#17181c]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.75px]'}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 text-[8px] font-bold text-[#8f6d28] bg-[#eae2d3] px-1 rounded-full leading-none py-0.5">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium tracking-normal ${isActive ? 'font-bold text-[#17181c]' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#9d7b38]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
