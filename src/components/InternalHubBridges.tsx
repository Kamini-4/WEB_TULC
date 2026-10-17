import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Calculator, 
  Shield, 
  Compass, 
  Layers, 
  FileText, 
  HelpCircle, 
  BookOpen, 
  UserCheck, 
  Lock, 
  ArrowRight,
  Send
} from 'lucide-react';

export interface InternalHubBridgesProps {
  className?: string;
}

export const InternalHubBridges: React.FC<InternalHubBridgesProps> = ({ className = '' }) => {
  const location = useLocation();

  const hubs = [
    {
      group: 'Diagnostics & Systems',
      links: [
        { name: 'Two-Week Diagnostic', path: '/assessment', icon: Activity, badge: 'Audit' },
        { name: 'Cognitive Tax Engine', path: '/cognitive-tax', icon: Calculator, badge: 'EBITDA' },
        { name: 'Turnkey Digital Toolkits', path: '/toolkits', icon: Layers, badge: '$27–$197' }
      ]
    },
    {
      group: 'Advisory & Mandates',
      links: [
        { name: 'Executive Mandates & Services', path: '/services', icon: Shield, badge: 'Retainers' },
        { name: '4-Phase Governance Protocol', path: '/methodology', icon: Compass, badge: 'Substrates' },
        { name: 'Private Mandate Intake', path: '/intake', icon: Send, badge: 'Confidential' }
      ]
    },
    {
      group: 'Intelligence & Doctrine',
      links: [
        { name: 'Intellectual Dispatches & Library', path: '/library', icon: FileText, badge: '19 Briefs' },
        { name: 'Founder Governance FAQs', path: '/faq', icon: HelpCircle, badge: 'Executive FAQ' },
        { name: 'Sovereign Strategic Playbook', path: '/playbook', icon: BookOpen, badge: 'A–Z Doctrine' }
      ]
    },
    {
      group: 'Governance & Principal',
      links: [
        { name: 'Suchita Sancheti & Firm', path: '/about', icon: UserCheck, badge: 'Principal' },
        { name: 'Clearance Portal', path: '/portal', icon: Lock, badge: 'Client Desk' }
      ]
    }
  ];

  const isCurrent = (path: string) => {
    if (path === '/toolkits') return location.pathname === '/toolkits' || location.pathname === '/products' || location.pathname === '/shop';
    return location.pathname === path;
  };

  return (
    <section 
      aria-label="Institutional Cross-Domain Operational Hubs"
      className={`border-t border-[#ded6c5] bg-[#f2ede4]/80 py-8 sm:py-10 text-[#1c1917] font-serif ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-5 border-b border-[#ded6c5]/80 mb-6">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8c6708] font-bold block">
              Architectural Continuity & Internal Graph
            </span>
            <h3 className="text-base sm:text-lg font-bold font-serif text-[#1c1917]">
              Operational Hubs & Institutional Bridges
            </h3>
          </div>
          <p className="text-xs text-[#78716c] font-serif italic max-w-md">
            Direct navigation coordinates linking diagnostics, sovereign advisory, digital toolkits, and intellectual research.
          </p>
        </div>

        {/* 4-Column Internal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {hubs.map((section, sIdx) => (
            <div key={sIdx} className="space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-[#78716c] tracking-wider block px-1">
                {section.group}
              </span>
              <div className="space-y-1.5">
                {section.links.map((link) => {
                  const Icon = link.icon;
                  const active = isCurrent(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`group flex items-center justify-between p-2.5 rounded-xs border transition-all duration-200 text-xs font-serif ${
                        active
                          ? 'bg-[#ffffff] border-[#8c6708] text-[#8c6708] font-bold shadow-xs'
                          : 'bg-[#ffffff]/80 hover:bg-[#ffffff] border-[#ded6c5] hover:border-[#b8860b] text-[#292524] shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <Icon className={`w-3.5 h-3.5 shrink-0 transition-colors ${active ? 'text-[#8c6708]' : 'text-[#78716c] group-hover:text-[#8c6708]'}`} />
                        <span className="truncate">{link.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {link.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#efebe2] border border-[#ded6c5] rounded-3xs text-[#78716c] group-hover:text-[#1c1917]">
                            {link.badge}
                          </span>
                        )}
                        <ArrowRight className={`w-3 h-3 transition-transform ${active ? 'text-[#8c6708]' : 'text-[#a8a29e] group-hover:translate-x-0.5 group-hover:text-[#8c6708]'}`} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
