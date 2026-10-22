import React from 'react';
import { Home, Zap, Layers, BookOpen, User } from 'lucide-react';

interface MobileBottomNavProps {
  onNavigate: (sectionId: string) => void;
  currentView?: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ 
  onNavigate,
  currentView = 'home'
}) => {
  const navItems = [
    { id: 'top', label: 'Home', icon: Home },
    { id: 'test', label: 'The Test', icon: Zap, badge: 'FREE' },
    { id: 'partnerships', label: 'Services', icon: Layers },
    { id: 'shop', label: 'The Codex', icon: BookOpen },
    { id: 'about', label: 'About', icon: User },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation Dock"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#f8f6f0]/95 backdrop-blur-md border-t border-[#e5decfe0] md:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-5 items-center h-14 max-w-md mx-auto px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = 
            (item.id === 'top' && (currentView === 'home' || currentView === 'top')) ||
            (item.id === 'test' && (currentView === 'test' || currentView === 'diagnostic')) ||
            (item.id === 'partnerships' && currentView === 'partnerships') ||
            (item.id === 'shop' && currentView === 'shop') ||
            (item.id === 'about' && currentView === 'about');

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative active:scale-95 cursor-pointer ${
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
