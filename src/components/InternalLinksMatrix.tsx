import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Shield, 
  Activity, 
  Calculator, 
  BookOpen, 
  FileText, 
  Layers, 
  UserCheck, 
  HelpCircle,
  Lock,
  ArrowRight
} from 'lucide-react';

interface InternalLinksMatrixProps {
  currentPath?: string;
  className?: string;
}

export const InternalLinksMatrix: React.FC<InternalLinksMatrixProps> = ({ currentPath = '', className = '' }) => {
  const hubs = [
    {
      title: 'Executive Diagnostics',
      links: [
        { name: 'The Two-Week Test', path: '/assessment', desc: 'Audit founder dependency & key-person risk' },
        { name: 'Cognitive Tax Calculator', path: '/cognitive-tax', desc: 'Quantify annual EBITDA lost to coordination drag' }
      ]
    },
    {
      title: 'Advisory & Governance',
      links: [
        { name: 'Services & Mandates', path: '/services', desc: '10-Node audits, 90-day protocol installations' },
        { name: 'Systemic Methodology', path: '/methodology', desc: '4-Phase alignment protocol & cybernetic design' },
        { name: 'About the Founder', path: '/about', desc: 'Suchita Sancheti & sovereign institutional engineering' }
      ]
    },
    {
      title: 'Intelligence & Research',
      links: [
        { name: 'Executive Library', path: '/library', desc: '19 institutional dispatches & whitepapers' },
        { name: 'Founder Governance FAQs', path: '/faq', desc: 'Direct answers to top scale dilemmas' }
      ]
    },
    {
      title: 'Operational Substrates',
      links: [
        { name: 'Turnkey Digital Toolkits', path: '/products', desc: 'Production-ready workspaces & delegation systems' },
        { name: 'Confidential Intake Docket', path: '/intake', desc: 'Submit enterprise parameters for calibration' },
        { name: 'Client Clearance Portal', path: '/portal', desc: 'Encrypted docket for active retainer clients' }
      ]
    }
  ];

  return (
    <section className={`py-12 px-4 sm:px-6 lg:px-8 border-t border-[#ded6c5] bg-[#fbf9f4] font-serif ${className}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#ded6c5]/80">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#8c6708] font-bold">
              Institutional Ecosystem Matrix
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#1c1917] tracking-tight">
              Interconnected Strategic Resources & Operational Infrastructure
            </h2>
          </div>
          <Link
            to="/intake"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1c1917] hover:bg-[#8c6708] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors self-start sm:self-auto shadow-xs"
          >
            <span>Initiate Sovereign Mandate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {hubs.map((hub) => (
            <div key={hub.title} className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1c1917] pb-1 border-b border-[#ded6c5]/60">
                {hub.title}
              </h3>
              <ul className="space-y-2.5">
                {hub.links.map((link) => {
                  const isCurrent = currentPath === link.path;
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className={`group block p-2 rounded-xs transition-colors ${
                          isCurrent
                            ? 'bg-[#efebe2] border-l-2 border-[#8c6708]'
                            : 'hover:bg-[#efebe2]/60'
                        }`}
                      >
                        <span className={`text-xs font-bold block transition-colors ${
                          isCurrent ? 'text-[#8c6708]' : 'text-[#1c1917] group-hover:text-[#8c6708]'
                        }`}>
                          {link.name}
                        </span>
                        <span className="text-[11px] text-[#78716c] leading-tight block mt-0.5">
                          {link.desc}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InternalLinksMatrix;
