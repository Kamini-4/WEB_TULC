import React from 'react';
import { ShieldCheck, Lock, FileText, ArrowLeft, Mail, Phone, ExternalLink } from 'lucide-react';

interface PrivacyPolicyProps {
  onBackToHome: () => void;
  onNavigate: (view: string) => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBackToHome, onNavigate }) => {
  return (
    <div className="py-10 sm:py-14 lg:py-16 bg-[#f8f6f0] border-b border-[#e5decfe0] min-h-[80vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Kicker */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#e5decfe0]">
          <button
            onClick={onBackToHome}
            aria-label="Go back"
            title="Go back"
            className="p-2 -ml-2 rounded-full text-[#17181c] hover:text-[#9d7b38] hover:bg-[#ede5d6] transition-colors cursor-pointer flex items-center justify-center min-w-[36px] min-h-[36px]"
          >
            <ArrowLeft className="w-5 h-5 text-[#9d7b38]" />
          </button>
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#9d7b38] uppercase font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>Strict In-Camera Privilege</span>
          </div>
        </div>

        {/* Header Block with Singular H1 */}
        <header className="mb-8">
          <div className="inline-block px-2.5 py-1 bg-[#faf6ee] border border-[#ebdcc0] text-[10px] font-mono uppercase tracking-widest text-[#9d7b38] font-bold rounded-xs mb-3">
            Governance & Compliance Docket
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-tight font-serif tracking-tight">
            Privacy Policy & Institutional Data Covenant
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#5a5d66] italic leading-relaxed">
            Effective Date: January 1, 2026 · Last Audited: October 2026 · The Unbounded Leadership Co.
          </p>
        </header>

        {/* Content Body with Strict Heading Hierarchy: H2 for Sections, H3 for Subsections */}
        <div className="bg-white border border-[#e5decfe0] rounded-lg p-6 sm:p-8 lg:p-10 shadow-xs space-y-8 text-sm text-[#383a40] leading-relaxed">
          
          {/* Section 1: Institutional Sovereignty */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#17181c] font-serif border-b border-[#f0e9dc] pb-2">
              1. Institutional Commitment to Executive Privacy
            </h2>
            <p>
              The Unbounded Leadership Co. (“TULC”, “we”, “our”, or “the Firm”), founded by Suchita Sancheti, provides bespoke leadership operating system architecture for founders, CXOs, and enterprise boards.
            </p>
            <p>
              We operate under an institutional standard of executive confidentiality. We do not sell, rent, monetize, or broker executive disclosures, diagnostic results, organizational metrics, or contact information to any third party, broker, ad network, or algorithmic aggregator.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#17181c] font-serif border-b border-[#f0e9dc] pb-2">
              2. Information We Collect & Legal Bases
            </h2>
            <p>
              We collect only the minimal information strictly required to evaluate governance friction, administer executive diagnostics, and deliver advisory mandates:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded bg-[#faf8f5] border border-[#e8dfcf]">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#9d7b38] mb-1">
                  A. Voluntarily Disclosed Parameters
                </h3>
                <p className="text-xs text-[#52555e]">
                  Executive contact parameters (name, corporate email, role, phone number, and organization), submitted through our Confidential Mandate Dialogue, diagnostic forms, or concierge requests.
                </p>
              </div>
              <div className="p-4 rounded bg-[#faf8f5] border border-[#e8dfcf]">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#9d7b38] mb-1">
                  B. Diagnostic & Governance Data
                </h3>
                <p className="text-xs text-[#52555e]">
                  Answers provided during the 5-Domain Sovereign Operating Audit, friction benchmarks, and advisory intake questions, strictly protected under attorney-client and Chatham House privileges.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Chatham House Rules & In-Camera Privilege */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#17181c] font-serif border-b border-[#f0e9dc] pb-2">
              3. Chatham House Standard & Non-Disclosure Covenants
            </h2>
            <p>
              All advisory dialogues, diagnostic scoring, and Council Chambers conclaves are governed by the Chatham House Rule: participants are free to use the information received, but neither the identity nor the affiliation of the speaker(s), nor that of any other participant, may be revealed.
            </p>
            <p>
              Prior to any strategic disclosure, clients execute a mutual, binding Institutional Non-Disclosure Agreement (NDA) ensuring absolute immunity from external publicity or competitive leaks.
            </p>
          </section>

          {/* Section 4: GDPR, CCPA, and Global Data Rights */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#17181c] font-serif border-b border-[#f0e9dc] pb-2">
              4. Global Privacy Rights (GDPR & CCPA Compliance)
            </h2>
            <p>
              Regardless of your jurisdiction (including the European Union, United Kingdom, Switzerland, Singapore, and California), you retain full rights over your data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#484b52]">
              <li><strong>Right of Access & Portability:</strong> Request an encrypted copy of all stored diagnostic and mandate records.</li>
              <li><strong>Right to Complete Erasure ("Right to be Forgotten"):</strong> Request immediate cryptographic purging of all intake files and diagnostic data.</li>
              <li><strong>Right to Rectification:</strong> Amend or correct enterprise records at any time via written notice.</li>
              <li><strong>Right to Restrict Processing:</strong> Immediately halt all analytics processing or communication cadences.</li>
            </ul>
          </section>

          {/* Section 5: Direct Contact Points */}
          <section className="space-y-3 pt-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#17181c] font-serif border-b border-[#f0e9dc] pb-2">
              5. Data Protection Officer & Executive Reach
            </h2>
            <p>
              For privacy inquiries, formal NDA coordination, or immediate data erasure requests, contact our designated Data Protection Officer and Lead Enterprise Architect directly:
            </p>
            
            <div className="p-4 sm:p-5 rounded-md bg-[#faf6ee] border border-[#ebdcc0] space-y-2.5 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#17181c]">
                <ShieldCheck className="w-4 h-4 text-[#9d7b38]" />
                <span>The Unbounded Leadership Co. — Executive Privacy Desk</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#4e5159] pt-1">
                <div>
                  <span className="font-bold text-[#17181c]">Lead Architect & Founder:</span> Suchita Sancheti
                </div>
                <div>
                  <span className="font-bold text-[#17181c]">Primary Advisory Email:</span>{' '}
                  <a href="mailto:suchita@theunboundedleadership.com" className="text-[#9d7b38] font-bold hover:underline">
                    suchita@theunboundedleadership.com
                  </a>
                </div>
                <div>
                  <span className="font-bold text-[#17181c]">Direct Confidential Email:</span>{' '}
                  <a href="mailto:suchita135sancheti@gmail.com" className="text-[#9d7b38] font-bold hover:underline">
                    suchita135sancheti@gmail.com
                  </a>
                </div>
                <div>
                  <span className="font-bold text-[#17181c]">Direct Confidential Line:</span>{' '}
                  <a href="tel:+919325346704" className="text-[#9d7b38] font-bold hover:underline">
                    +91 9325346704
                  </a>
                </div>
                <div>
                  <span className="font-bold text-[#17181c]">Social Media Presence:</span>{' '}
                  <a href="https://www.linkedin.com/in/suchita-sancheti" target="_blank" rel="noopener noreferrer" className="text-[#9d7b38] font-bold hover:underline">
                    LinkedIn
                  </a>
                  {' · '}
                  <a href="https://www.instagram.com/transformingleadership" target="_blank" rel="noopener noreferrer" className="text-[#9d7b38] font-bold hover:underline">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-[#f0e9dc] flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 bg-[#17181c] hover:bg-[#282a30] text-white text-xs font-bold uppercase rounded-sm transition-colors cursor-pointer"
            >
              Contact Advisory Desk
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-5 py-2.5 bg-white border border-[#d8cebe] text-[#17181c] text-xs font-bold uppercase rounded-sm hover:bg-[#faf7f0] transition-colors cursor-pointer"
            >
              About The Firm
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
