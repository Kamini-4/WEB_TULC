import React, { useState, useEffect } from 'react';
import { SovereignDB, LeadEntry, AssessmentEntry, BlogEntry, EmailLogEntry, PortalLicenseEntry, PortalTierType } from '../lib/database.ts';
import { auth, signInWithGoogle } from '../src/firebase.ts';
import { DISPATCH_TOPICS } from '../data/thoughtLeadershipContent.ts';
import { 
  Shield, 
  Lock, 
  Trash2, 
  Mail, 
  ExternalLink, 
  Calendar, 
  Award, 
  BarChart, 
  ChevronRight, 
  X, 
  FileText, 
  CheckCircle2, 
  User, 
  Activity, 
  Fingerprint, 
  Briefcase,
  Check,
  Key,
  Copy,
  Send,
  RefreshCw,
  Sparkles,
  Building2,
  Clock
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [data, setData] = useState<{
    leads: LeadEntry[];
    assessments: AssessmentEntry[];
    blog: BlogEntry[];
    emailLogs: EmailLogEntry[];
    licenses: PortalLicenseEntry[];
  }>({ leads: [], assessments: [], blog: [], emailLogs: [], licenses: [] });
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'registry' | 'outreach' | 'email_logs' | 'licenses'>('leads');
  const [newPost, setNewPost] = useState({ category: '', title: '', excerpt: '', content: '' });
  const [recentlyAddedUrl, setRecentlyAddedUrl] = useState<string | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState<string | null>(null);

  // License Generator State
  const [licenseForm, setLicenseForm] = useState<{
    orgName: string;
    contactEmail: string;
    tier: PortalTierType;
    validityDays: number;
    customKey: string;
    notes: string;
    sendEmail: boolean;
  }>({
    orgName: '',
    contactEmail: '',
    tier: 'BETA',
    validityDays: 14,
    customKey: '',
    notes: '',
    sendEmail: true
  });
  const [isGeneratingLicense, setIsGeneratingLicense] = useState(false);
  const [lastGeneratedLicense, setLastGeneratedLicense] = useState<PortalLicenseEntry | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [isResendingEmail, setIsResendingEmail] = useState<string | null>(null);

  // Executive Outreach Copilot State
  const [outreachForm, setOutreachForm] = useState({
    targetName: '',
    targetTitle: 'Chief Executive Officer',
    targetCompany: '',
    targetEmail: '',
    theme: 'Cognitive Tax over leadership (reclaiming 40% bandwidth)',
    tone: 'Sovereign Academic & Inevitable',
    linkedinUrl: '',
    companyWebsiteUrl: '',
    pastedContext: '',
    enableSearchGrounding: true,
    embedResearch: true
  });
  const [activeOutreachId, setActiveOutreachId] = useState<string | null>(null);
  const [isGeneratingOutreach, setIsGeneratingOutreach] = useState(false);
  const [generatedOutreach, setGeneratedOutreach] = useState<{
    brief: string;
    subject: string;
    body: string;
  } | null>(null);
  const [outreachHistory, setOutreachHistory] = useState<Array<{
    id: string;
    timestamp: number;
    targetName: string;
    targetTitle: string;
    targetCompany: string;
    targetEmail: string;
    theme: string;
    subject: string;
    body: string;
    status: 'Draft' | 'Sent' | 'Engaged';
  }>>(() => {
    try {
      const saved = localStorage.getItem('tulc_outreach_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveOutreachHistory = (newHistory: typeof outreachHistory) => {
    setOutreachHistory(newHistory);
    try {
      localStorage.setItem('tulc_outreach_history', JSON.stringify(newHistory));
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateOutreach = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingOutreach(true);
    setGeneratedOutreach(null);

    try {
      const response = await fetch('/api/outreach/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(outreachForm)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to generate');
      
      setGeneratedOutreach(data);
      const newId = `OUT-${Math.floor(Math.random() * 900000 + 100000)}`;
      setActiveOutreachId(newId);

      const newEntry = {
        id: newId,
        timestamp: Date.now(),
        targetName: outreachForm.targetName || 'Sovereign Leader',
        targetTitle: outreachForm.targetTitle || 'Chief Executive',
        targetCompany: outreachForm.targetCompany || 'Elite Institution',
        targetEmail: outreachForm.targetEmail,
        theme: outreachForm.theme,
        subject: data.subject,
        body: data.body,
        status: 'Draft' as const
      };
      saveOutreachHistory([newEntry, ...outreachHistory]);

    } catch (err: any) {
      alert(`Outreach synthesis failed: ${err.message || err}`);
    } finally {
      setIsGeneratingOutreach(false);
    }
  };

  const handleStartManualDraft = () => {
    const newId = `OUT-${Math.floor(Math.random() * 900000 + 100000)}`;
    setActiveOutreachId(newId);
    
    const initialSubject = outreachForm.targetCompany 
      ? `Strategic Performance Inquiry // ${outreachForm.targetCompany}` 
      : "Strategic Growth Inquiry";
      
    const initialBody = `Dear ${outreachForm.targetName || 'Leader'},\n\nI have been observing your progress at ${outreachForm.targetCompany || 'your institution'} as you navigate current scaling thresholds. The strategic friction inherent to rapid execution can often result in significant cognitive tax.\n\nLet us benchmark your institutional substrate under active pressure protocols.\n\nWith respect,\n\nSuchita Sancheti\nFounder & Enterprise Architect\nThe Unbounded Leadership Co.`;

    setGeneratedOutreach({
      brief: "Custom manual alignment draft designed exclusively by Suchita Sancheti.",
      subject: initialSubject,
      body: initialBody
    });

    const newEntry = {
      id: newId,
      timestamp: Date.now(),
      targetName: outreachForm.targetName || 'Sovereign Leader',
      targetTitle: outreachForm.targetTitle || 'Chief Executive',
      targetCompany: outreachForm.targetCompany || 'Elite Institution',
      targetEmail: outreachForm.targetEmail,
      theme: 'Custom Outbound Correspondence',
      subject: initialSubject,
      body: initialBody,
      status: 'Draft' as const
    };
    saveOutreachHistory([newEntry, ...outreachHistory]);
  };

  const handleUpdateDraft = () => {
    if (!generatedOutreach) return;
    
    let currentId = activeOutreachId;
    let updatedHistory = [...outreachHistory];
    
    if (currentId) {
      const index = updatedHistory.findIndex(h => h.id === currentId);
      if (index !== -1) {
        updatedHistory[index] = {
          ...updatedHistory[index],
          subject: generatedOutreach.subject,
          body: generatedOutreach.body,
          targetName: outreachForm.targetName || updatedHistory[index].targetName,
          targetTitle: outreachForm.targetTitle || updatedHistory[index].targetTitle,
          targetCompany: outreachForm.targetCompany || updatedHistory[index].targetCompany,
          targetEmail: outreachForm.targetEmail || updatedHistory[index].targetEmail,
        };
      } else {
        currentId = null;
      }
    }
    
    if (!currentId) {
      const newId = `OUT-${Math.floor(Math.random() * 900000 + 100000)}`;
      setActiveOutreachId(newId);
      const newEntry = {
        id: newId,
        timestamp: Date.now(),
        targetName: outreachForm.targetName || 'Sovereign Leader',
        targetTitle: outreachForm.targetTitle || 'Chief Executive',
        targetCompany: outreachForm.targetCompany || 'Elite Institution',
        targetEmail: outreachForm.targetEmail,
        theme: 'Custom Outbound Correspondence',
        subject: generatedOutreach.subject,
        body: generatedOutreach.body,
        status: 'Draft' as const
      };
      updatedHistory = [newEntry, ...updatedHistory];
    }
    
    saveOutreachHistory(updatedHistory);
    alert('Outreach draft saved & archived successfully in Registry!');
  };

  const handleLaunchMailto = (subject: string, body: string, email?: string) => {
    const to = email || '';
    const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  // Authentication & Passkey State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('tulc_sovereign_auth') === 'true';
  });
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user);
      if (user && (user.email === 'suchita135sancheti@gmail.com' || user.email === 'kaminiagnihotri249@gmail.com')) {
        setIsAuthenticated(true);
        sessionStorage.setItem('tulc_sovereign_auth', 'true');
      }
    });
    return unsubscribe;
  }, []);
  
  // Selected Lead Report state
  const [selectedEntry, setSelectedEntry] = useState<any>(null);

  // Derive unique subscriber emails dynamically
  const subscribers = data.leads.filter(l => 
    l.role === 'Subscriber' || 
    l.message?.includes('Subscribed') || 
    l.message?.includes('Subscription')
  );
  const subscriberEmails = Array.from(new Set(subscribers.map(s => s.email.trim().toLowerCase())));

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === '@Nn!e24091305') {
      setIsAuthenticated(true);
      setAuthError(null);
      sessionStorage.setItem('tulc_sovereign_auth', 'true');
    } else {
      setAuthError('Verification failure. Sovereign coordinate rejected.');
    }
  };

  const handleBroadcastNewsletter = async (article: { id: string, title: string, category: string, tagline?: string, content: string[] }) => {
    if (subscriberEmails.length === 0) {
      alert("No active subscribers have registered yet. Cannot proceed with broadcast.");
      return;
    }

    const confirmSend = window.confirm(
      `CONFIRM COMPLIANT DISPATCH BROADCAST:\n\n` +
      `Dispatch: "${article.title}"\n` +
      `Audience Volume: ${subscriberEmails.length} active subscriber(s)\n\n` +
      `This triggers direct delivery via Resend free layer with $0 cost. Confirm transmission?`
    );

    if (!confirmSend) return;

    setIsBroadcasting(article.id);
    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscribers: subscriberEmails,
          title: article.title,
          category: article.category,
          tagline: article.tagline || '',
          content: article.content,
          id: article.id,
          url: article.id.startsWith('DISPATCH-') ? `${window.location.origin}/library` : `${window.location.origin}/library/${article.id}`
        })
      });

      const result = await response.json();
      if (response.ok && result.success) {
        // Save database log for each recipient in the broadcast
        if (result.results && Array.isArray(result.results)) {
          for (const item of result.results) {
            try {
              await SovereignDB.saveEmailLog({
                type: 'newsletter_broadcast',
                recipient: item.recipient,
                sender: item.sender || 'concierge@theunboundedleadership.com',
                subject: item.subject,
                status: item.success ? 'sent' : 'failed',
                error: item.error || null,
                resendId: item.id || null,
                metadata: { articleId: article.id, articleTitle: article.title }
              });
            } catch (logErr) {
              console.error("Failed to save newsletter log entry:", logErr);
            }
          }
        }

        alert(
          `TRANSMISSION DISPATCHED SUCCESSFULLY:\n\n` +
          `Successfully routed to ${result.sentCount} active subscribers.\n` +
          `${result.failedCount > 0 ? `Failed nodes: ${result.failedCount}` : 'All routes cleared.'}`
        );
      } else {
        throw new Error(result.error || 'Failed to dispatch newsbrief.');
      }
    } catch (err: any) {
      console.error(err);
      alert(`BROADCAST DISPATCH COMPROMISED: ${err.message || err}`);
    } finally {
      setIsBroadcasting(null);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    let unsubLeads = () => {};
    let unsubAssessments = () => {};
    let unsubEmailLogs = () => {};

    if (firebaseUser) {
      unsubLeads = SovereignDB.subscribeToLeads((leads) => {
        setData(prev => ({ ...prev, leads }));
      });
      unsubAssessments = SovereignDB.subscribeToAssessments((assessments) => {
        setData(prev => ({ ...prev, assessments }));
      });
      unsubEmailLogs = SovereignDB.subscribeToEmailLogs((emailLogs) => {
        setData(prev => ({ ...prev, emailLogs }));
      });
    }

    const unsubLicenses = SovereignDB.subscribeToPortalLicenses((licenses) => {
      setData(prev => ({ ...prev, licenses }));
    });

    const unsubBlog = SovereignDB.subscribeToBlog((blog) => {
      setData(prev => ({ ...prev, blog }));
    });

    return () => {
      unsubLeads();
      unsubAssessments();
      unsubEmailLogs();
      unsubBlog();
      unsubLicenses();
    };
  }, [isAuthenticated, firebaseUser]);

  // Generate Institutional Passkey Helper
  const generateRandomKey = (tier: PortalTierType, customPrefix?: string) => {
    if (customPrefix && customPrefix.trim()) {
      return customPrefix.trim().toUpperCase();
    }
    const prefixMap: Record<string, string> = {
      'BETA': 'TULC-BETA',
      'TIER_1_DIAGNOSTIC': 'TULC-APEX',
      'TIER_2_SPRINT': 'TULC-SPRINT',
      'TIER_3_SOVEREIGN_RETAINER': 'TULC-SOVEREIGN',
      'CUSTOM': 'TULC-AUTH'
    };
    const p = prefixMap[tier] || 'TULC-KEY';
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let randCode = '';
    for (let i = 0; i < 3; i++) {
      randCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${p}-${randNum}-${randCode}`;
  };

  const handleGenerateLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseForm.orgName.trim() || !licenseForm.contactEmail.trim()) {
      alert('Please provide both the Organization Name and Contact Email.');
      return;
    }

    setIsGeneratingLicense(true);
    setLastGeneratedLicense(null);

    const generatedKey = generateRandomKey(licenseForm.tier, licenseForm.customKey);
    const now = Date.now();
    const durationMs = Number(licenseForm.validityDays) * 24 * 60 * 60 * 1000;
    const expiresAt = now + durationMs;

    const licensePayload: Omit<PortalLicenseEntry, 'id'> = {
      key: generatedKey,
      organization: licenseForm.orgName.trim(),
      contactEmail: licenseForm.contactEmail.trim().toLowerCase(),
      tier: licenseForm.tier,
      validityDays: Number(licenseForm.validityDays),
      createdAt: now,
      expiresAt: expiresAt,
      status: 'active',
      accessCount: 0,
      lastAccessedAt: null,
      issuedBy: firebaseUser?.email || 'suchita135sancheti@gmail.com',
      notes: licenseForm.notes.trim()
    };

    try {
      const savedDoc = await SovereignDB.savePortalLicense(licensePayload);
      const fullLicense: PortalLicenseEntry = {
        id: savedDoc?.id || `LIC-${Date.now()}`,
        ...licensePayload
      };

      setLastGeneratedLicense(fullLicense);

      // If email dispatch is requested, trigger through backend endpoint
      if (licenseForm.sendEmail) {
        try {
          await fetch('/api/portal/email-passkey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              key: generatedKey,
              organization: fullLicense.organization,
              contactEmail: fullLicense.contactEmail,
              tier: fullLicense.tier,
              validityDays: fullLicense.validityDays,
              expiresAt: fullLicense.expiresAt,
              customNotes: fullLicense.notes
            })
          });
        } catch (emailErr) {
          console.error('Email dispatch non-blocking error:', emailErr);
        }
      }

      // Reset form fields
      setLicenseForm(prev => ({
        ...prev,
        orgName: '',
        contactEmail: '',
        customKey: '',
        notes: ''
      }));

      alert(`PASSKEY ISSUED FOR ${fullLicense.organization}:\nKey: ${generatedKey}\nActive Window: ${fullLicense.validityDays} Days\nDirect Portal URL ready.`);
    } catch (err: any) {
      console.error('Error generating portal license:', err);
      alert(`License generation failed: ${err.message || err}`);
    } finally {
      setIsGeneratingLicense(false);
    }
  };

  const handleCopyPortalLink = (key: string, id: string) => {
    const portalUrl = `${window.location.origin}/portal?key=${encodeURIComponent(key)}`;
    navigator.clipboard.writeText(portalUrl);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2500);
  };

  const handleToggleLicenseStatus = async (license: PortalLicenseEntry) => {
    const newStatus = license.status === 'active' ? 'revoked' : 'active';
    const confirmMsg = newStatus === 'revoked'
      ? `Revoke access passkey for ${license.organization}? Multi-user clients using key "${license.key}" will be locked out.`
      : `Reactivate access passkey for ${license.organization}?`;
    
    if (window.confirm(confirmMsg)) {
      await SovereignDB.updatePortalLicenseStatus(license.id, newStatus);
    }
  };

  const handleResendLicenseEmail = async (license: PortalLicenseEntry) => {
    setIsResendingEmail(license.id);
    try {
      const response = await fetch('/api/portal/email-passkey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: license.key,
          organization: license.organization,
          contactEmail: license.contactEmail,
          tier: license.tier,
          validityDays: license.validityDays,
          expiresAt: license.expiresAt,
          customNotes: license.notes
        })
      });
      const resData = await response.json();
      if (response.ok && resData.success) {
        alert(`Passkey credentials resent to ${license.contactEmail} for ${license.organization}.`);
      } else {
        throw new Error(resData.error || 'Failed to dispatch email');
      }
    } catch (err: any) {
      alert(`Resend failed: ${err.message || err}`);
    } finally {
      setIsResendingEmail(null);
    }
  };

  const handleDeleteLicense = async (license: PortalLicenseEntry) => {
    if (window.confirm(`Permanently delete passkey "${license.key}" for ${license.organization}? This action is irreversible.`)) {
      await SovereignDB.deletePortalLicense(license.id);
    }
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;
    
    const result = await SovereignDB.saveBlogPost({
      category: newPost.category || 'General',
      date: `Q${Math.floor(Math.random() * 4) + 1} ${new Date().getFullYear()}`,
      title: newPost.title,
      excerpt: newPost.excerpt,
      content: newPost.content.split('\n\n')
    });

    if (result?.id) {
      const fullUrl = `${window.location.origin}/library/${result.id}`;
      setRecentlyAddedUrl(fullUrl);
      // Trigger IndexNow (Instant Discovery Protocol)
      try {
        await fetch('/api/indexnow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: fullUrl })
        });
        console.log(`Institutional Signal Broadcast: ${fullUrl}`);
      } catch (err) {
        console.error("IndexNow broadcast failure:", err);
      }
    }
    
    setNewPost({ category: '', title: '', excerpt: '', content: '' });
    alert("Dispatch successfully archived in the Registry. Direct link is displayed in the panel.");
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm("Are you certain you wish to purge this dispatch?")) {
      SovereignDB.deleteBlogPost(id);
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm("ARCHIVE PERMANENTLY: Are you certain you wish to purge the Sovereign Ledger? (This feature is currently restricted for data integrity)")) {
      // SovereignDB.clearAll();
    }
  };

  // Grade calculator helper
  const getEntryGrade = (score: number) => {
    if (score >= 20) return { title: 'Sovereign', desc: 'Strategic Inevitability & Autonomous Integration' };
    if (score >= 15) return { title: 'Architectural', desc: 'Systemic Continuity & Calibrated Structure' };
    if (score >= 10) return { title: 'Systemic', desc: 'Resilient Capabilities with Local Oversight' };
    return { title: 'Manual', desc: 'Heroic Firefighting & Fragile Core-Dependence' };
  };

  // Option Mapping helper matching QUESTIONS
  const optionDescriptions = [
    { name: "Cognitive Clarity", index: 0, 1: "Obscured (Intent is lost in translation)", 3: "Coherent (Vision understood but lacks sharp edge)", 5: "Absolute (Clarity is a structural property)" },
    { name: "Systemic Integrity", index: 1, 1: "Fragile (Hero-dependent, dissolves quickly)", 3: "Resilient (Protocols exist but require constant validation)", 5: "Sovereign (Integrity built in, order is inevitable)" },
    { name: "Strategic Velocity", index: 2, 1: "Rigid (Slow to adapt, high energy consumed)", 3: "Adaptive (Can pivot but manual and energy intensive)", 5: "Antifragile (Velocity is built-in, gains from disruption)" },
    { name: "Moral Gravity", index: 3, 1: "Variable (Ethics and trust depend on individual behaviors)", 3: "Principled (Values are documented but need oversight)", 5: "Gravitational (Moral alignment is inevitable and built-in)" },
    { name: "Cultural Fidelity", index: 4, 1: "Diluted (Culture suffers from tier/edge drift)", 3: "Aligned (Team understands but lacks resonance of source)", 5: "Embodied (Fidelity is organic, culture executes autonomously)" }
  ];

  const handlePrintDossier = (entry: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const score = entry.assessment?.totalScore || 0;
    const grade = getEntryGrade(score);

    printWindow.document.write(`
      <html>
        <head>
          <title>Diagnostic Dossier: ${entry.name}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;600;900&family=JetBrains+Mono&display=swap');
            body { font-family: 'Playfair Display', serif; padding: 60px; line-height: 1.6; color: #111111; background-color: #ffffff; }
            .header { border-bottom: 2px solid #b8860b; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end; }
            .logo { font-family: 'Cinzel', serif; font-size: 14px;  text-transform: uppercase; color: #111; font-weight: bold; }
            .title { font-size: 30px; font-weight: bold; margin: 15px 0 5px 0; font-family: 'Cinzel', serif; }
            .category { font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 900;  text-transform: uppercase; color: #b8860b; }
            
            .meta-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 20px; margin-bottom: 40px; font-family: 'Inter', sans-serif; font-size: 12px; border-bottom: 1px solid #eee; padding-bottom: 30px; }
            .meta-item { display: flex; flex-direction: column; }
            .meta-lbl { font-weight: 900; color: #888; text-transform: uppercase;  font-size: 9px; margin-bottom: 4px; }
            .meta-val { font-weight: bold; }

            .score-card { background-color: #fafaf6; border: 1px solid #e5e5d8; padding: 25px; margin-bottom: 45px; }
            .score-num { font-size: 40px; font-weight: bold; font-family: 'Cinzel', serif; color: #b8860b; }
            .grade-title { font-family: 'Cinzel', serif; font-size: 18px; font-weight: bold; text-transform: uppercase; margin-top: 10px; }
            .grade-desc { font-size: 13px; color: #555; font-style: italic; }

            .section-title { font-family: 'Cinzel', serif; font-size: 15px; font-weight: bold; text-transform: uppercase;  border-bottom: 1px solid #b8860b; padding-bottom: 8px; margin-top: 40px; margin-bottom: 20px; }
            .domain-row { display: grid; grid-template-cols: 150px 100px 1fr; gap: 20px; margin-bottom: 15px; font-family: 'Inter', sans-serif; font-size: 11px; align-items: center; border-bottom: 1px solid #f9f9f9; padding-bottom: 10px; }
            .domain-name { font-weight: bold; color: #111; }
            .domain-score-box { background-color: #eee; height: 6px; border-radius: 3px; position: relative; overflow: hidden; }
            .domain-score-fill { background-color: #b8860b; height: 100%; }
            .choice-desc { font-style: italic; color: #555; }
            
            .cert-box { border: 1px dashed #b8860b; padding: 25px; margin-top: 60px; text-align: center; }
            .footer { margin-top: 80px; border-top: 1px solid #eee; padding-top: 20px; font-size: 8px; color: #999; text-align: center; font-family: 'Inter', sans-serif;  }
          </style>
        </head>
        <body>
          <div class="header" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #b8860b; padding-bottom: 20px; margin-bottom: 30px;">
            <div>
              <h1 class="title" style="margin-top: 0;">Diagnostic Report Dossier</h1>
              <div class="category">Sovereign Registry Diagnostic Archive</div>
            </div>
            <div style="flex-shrink: 0; margin-left: 20px;">
              <svg viewBox="0 0 500 240" style="width: 180px; height: auto;" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gold-grad-dash" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#8a640f" />
                    <stop offset="30%" stop-color="#d1b46a" />
                    <stop offset="50%" stop-color="#f3e5ab" />
                    <stop offset="70%" stop-color="#d1b46a" />
                    <stop offset="100%" stop-color="#8a640f" />
                  </linearGradient>
                </defs>
                <g>
                  <!-- Monogram TUC -->
                  <path d="M 215 35 L 215 80 C 215 105, 230 115, 250 115 C 270 115, 285 105, 285 80 L 285 35 L 297 35 L 297 80 C 297 112, 275 126, 250 126 C 225 126, 203 112, 203 80 L 203 35 Z" fill="url(#gold-grad-dash)" />
                  <path d="M 190 25 L 310 25 L 310 35 L 256 35 L 256 112 L 244 112 L 244 35 L 190 35 Z" fill="url(#gold-grad-dash)" />
                  <path d="M 285 55 C 295 55, 305 62, 308 72 L 318 67 C 314 52, 300 43, 285 43 C 255 43, 240 65, 240 85 C 240 105, 255 127, 285 127 C 300 127, 314 118, 318 103 L 308 98 C 305 108, 295 115, 285 105 C 265 105, 252 90, 252 85 C 252 70, 265 55, 285 55 Z" fill="url(#gold-grad-dash)" />
                  <path d="M 195 118 L 305 118 L 295 124 L 205 124 Z" fill="url(#gold-grad-dash)" />
                </g>
                
                <!-- Text -->
                <text x="250" y="165" text-anchor="middle" fill="url(#gold-grad-dash)" font-size="28" font-weight="bold"  font-family="'Cinzel', 'Playfair Display', serif">THE UNBOUNDED</text>
                <line x1="85" y1="185" x2="185" y2="185" stroke="url(#gold-grad-dash)" stroke-width="1.2" />
                <text x="250" y="190" text-anchor="middle" fill="url(#gold-grad-dash)" font-size="14" font-weight="900"  font-family="'Inter', sans-serif">LEADERSHIP CO.</text>
                <line x1="315" y1="185" x2="415" y2="185" stroke="url(#gold-grad-dash)" stroke-width="1.2" />
                <text x="250" y="215" text-anchor="middle" fill="#8a640f" font-size="10.5"  font-family="'Inter', sans-serif" font-weight="300" font-style="italic">Elevating Cultures, Transforming Leadership</text>
              </svg>
            </div>
          </div>
          
          <div class="meta-grid">
            <div class="meta-item"><span class="meta-lbl">Client Identity</span><span class="meta-val">${entry.name}</span></div>
            <div class="meta-item"><span class="meta-lbl">Email 좌표</span><span class="meta-val">${entry.email}</span></div>
            <div class="meta-item"><span class="meta-lbl">Organization</span><span class="meta-val">${entry.organization}</span></div>
            <div class="meta-item"><span class="meta-lbl">Classification Context</span><span class="meta-val uppercase">${entry.assessment?.context || 'No context logged'}</span></div>
          </div>

          <div class="score-card">
            <div class="meta-lbl">Systemic Alignment Score</div>
            <div style="display: flex; align-items: center; gap: 20px;">
              <span class="score-num">${score} / 25</span>
              <div>
                <div class="grade-title">Grade Alignment: ${grade.title}</div>
                <div class="grade-desc">${grade.desc}</div>
              </div>
            </div>
          </div>

          <div class="section-title">Institutional Domains Detailed Metrics</div>
          ${optionDescriptions.map(block => {
            const domainScore = entry.assessment?.answers?.[block.index] || 1;
            const chosenText = (block as any)[domainScore] || 'Inquiry registered without answer';
            const widthPct = (domainScore / 5) * 100;
            return `
              <div class="domain-row">
                <div class="domain-name">${block.name}</div>
                <div style="display: flex; flex-direction: column;">
                  <span style="font-weight: bold; margin-bottom: 4px;">Score: ${domainScore} / 5</span>
                  <div class="domain-score-box">
                    <div class="domain-score-fill" style="width: ${widthPct}%;"></div>
                  </div>
                </div>
                <div class="choice-desc">"${chosenText}"</div>
              </div>
            `;
          }).join('')}

          <div class="cert-box">
            <p style="font-family: 'Cinzel', serif; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #b8860b; margin: 0 0 10px 0;">Sovereign Security Authorization Seal</p>
            <p style="font-size: 11px; font-family: 'Inter', sans-serif; color: #777; margin: 0; line-height: 1.6;">
              This diagnostic docket carries an authorized digital signature registered in the Private Sovereign Registry of The Unbounded Leadership Co.<br/>
              Receipt Index ID: <strong>TULC-REC-${Math.floor(Math.random() * 900000 + 100000)}</strong> • Founder: <strong>Suchita Sancheti</strong>
            </p>
          </div>

          <div class="footer">
            THE UNBOUNDED LEADERSHIP CO. • CONFIDENTIAL AUDITING SYSTEMS • DUPLICATION OR EXCLUSIONS RESTRICTED
          </div>
          
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Standard secure passcode interface checks
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#0c0c0b] flex flex-col items-center justify-center font-inter text-white p-6">
        <div className="max-w-md w-full bg-[#141413] border border-[#b8860b]/30 p-8 shadow-2xl relative overflow-hidden rounded-sm">
          {/* Subtle scanning grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#b8860b_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none"></div>

          <div className="text-center mb-8 relative z-11">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#b8860b]/40 bg-[#b8860b]/10 text-[#b8860b] mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white uppercase font-sans">Sovereign Decryption Core</h2>
            <p className="text-[9px] text-[#b8860b] uppercase mt-1 font-black">Authentication Portal Required</p>
            <p className="text-xs text-zinc-500 italic mt-4 max-w-sm mx-auto leading-relaxed">
              Protected administration interface. Provide the Principal Passkey to decrypt client records, intake files, and strategic assessment reports.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4 relative z-10">
            <div>
              <label className="text-[9px] font-black uppercase text-zinc-400 block mb-2">Master Code</label>
              <input
                type="password"
                required
                autoFocus
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                className="w-full px-4 py-3 bg-[#1e1e1d] border border-zinc-800 text-sm text-center font-mono focus:outline-none focus:border-[#b8860b] text-white "
                placeholder="••••••••••••"
              />
            </div>

            {authError && (
              <div className="text-red-500 font-mono text-[9px] text-center bg-red-950/20 py-2 border border-red-500/10 rounded">
                ⚠ {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-[#b8860b] hover:bg-amber-600 hover:text-black text-black font-black text-[10px] uppercase transition-all"
            >
              Verify Credentials
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-zinc-800"></div>
              <span className="px-3 text-[9px] text-zinc-500 font-mono uppercase ">OR</span>
              <div className="flex-grow border-t border-zinc-800"></div>
            </div>

            <button
              type="button"
              onClick={async () => {
                try {
                  const u = await signInWithGoogle();
                  if (u) {
                    setIsAuthenticated(true);
                    sessionStorage.setItem('tulc_sovereign_auth', 'true');
                  }
                } catch (err: any) {
                  setAuthError(`Google Authentication failed: ${err.message || err}`);
                }
              }}
              className="w-full py-4 bg-transparent hover:bg-white/10 border border-zinc-700 text-white font-bold text-[10px] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Fingerprint className="w-4 h-4 text-[#b8860b]" /> Sign In with Google Admin
            </button>
          </form>

          <div className="mt-6 text-center relative z-10">
            <button
              onClick={onClose}
              className="text-[9px] font-bold text-zinc-500 hover:text-white uppercase transition-all border-b border-transparent hover:border-zinc-500 pb-0.5"
            >
              Cancel Access
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-[#f5f5f0] overflow-y-auto font-inter">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-zinc-200 px-8 py-6 flex justify-between items-center z-10 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#111111]">SOVEREIGN DASHBOARD</span>
            <span className="text-[9px] font-black text-[#b8860b] uppercase ">Institutional Lead Management v1.0</span>
          </div>
          <div className="h-8 w-px bg-zinc-200" />
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('leads')}
              className={`text-[10px] font-bold uppercase px-4 py-2 ${activeTab === 'leads' ? 'text-[#b8860b] border-b-2 border-[#b8860b]' : 'text-zinc-400'}`}
            >
              Leads & Reports
            </button>
            <button 
              onClick={() => setActiveTab('registry')}
              className={`text-[10px] font-bold uppercase px-4 py-2 ${activeTab === 'registry' ? 'text-[#b8860b] border-b-2 border-[#b8860b]' : 'text-zinc-400'}`}
            >
              Registry
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`text-[10px] font-bold uppercase px-4 py-2 ${activeTab === 'analytics' ? 'text-[#b8860b] border-b-2 border-[#b8860b]' : 'text-zinc-400'}`}
            >
              Telemetry
            </button>
            <button 
              onClick={() => setActiveTab('outreach')}
              className={`text-[10px] font-bold uppercase px-4 py-2 ${activeTab === 'outreach' ? 'text-[#b8860b] border-b-2 border-[#b8860b]' : 'text-zinc-400'}`}
            >
              Executive Outbound
            </button>
            <button 
              onClick={() => setActiveTab('email_logs')}
              className={`text-[10px] font-bold uppercase px-4 py-2 ${activeTab === 'email_logs' ? 'text-[#b8860b] border-b-2 border-[#b8860b]' : 'text-zinc-400'}`}
            >
              Email Tracker
            </button>
            <button 
              onClick={() => setActiveTab('licenses')}
              className={`text-[10px] font-bold uppercase px-4 py-2 flex items-center gap-1.5 ${activeTab === 'licenses' ? 'text-[#b8860b] border-b-2 border-[#b8860b]' : 'text-zinc-400'}`}
            >
              <Key className="w-3 h-3" />
              <span>Passkeys & Licenses</span>
              {data.licenses.length > 0 && (
                <span className="bg-[#b8860b]/20 text-[#b8860b] text-[9px] px-1.5 py-0.2 rounded-full font-mono">
                  {data.licenses.filter(l => l.status === 'active').length}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => SovereignDB.exportToCSV()}
            className="px-6 py-2 border border-zinc-300 text-[10px] font-bold uppercase hover:bg-zinc-100 transition-all "
          >
            Export CSV
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-[#111111] text-white text-[10px] font-bold uppercase hover:bg-black transition-all "
          >
            Exit Terminal
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {activeTab === 'leads' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Total Substrates Logged" value={(data.leads.length + data.assessments.length).toString()} />
              <StatCard label="Completed Diagnostics" value={data.assessments.length.toString()} />
              <StatCard label="Average System Resonance" value={`${data.assessments.length > 0 ? Math.floor(data.assessments.reduce((acc, current) => acc + current.totalScore, 0) / data.assessments.length * 4) : 74}%`} />
            </div>

            {!firebaseUser && (
              <div className="bg-amber-50/40 border border-amber-300/60 p-6 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-inter text-[#4d3c0c]">
                <div>
                  <h4 className="font-extrabold uppercase text-[#b8860b]">🔐 Client Registry Secure Encryption Gate</h4>
                  <p className="text-zinc-600 mt-1 max-w-2xl leading-relaxed">
                    Client leads and diagnostic dossiers are cryptographically shielded. To initiate a secure decryption sync, please authenticate via your Google Admin account.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await signInWithGoogle();
                    } catch (err: any) {
                      alert(`Google Admin login failed: ${err.message || err}`);
                    }
                  }}
                  className="px-5 py-3 bg-[#b8860b] hover:bg-amber-600 text-white font-black text-[10px] uppercase transition-all rounded-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Fingerprint className="w-4 h-4" /> Authenticate Google Admin
                </button>
              </div>
            )}

            <div className="bg-white border border-zinc-200 shadow-xl overflow-hidden rounded-sm">
              <div className="p-6 bg-zinc-50 border-b border-zinc-200 flex justify-between items-center">
                <span className="text-xs font-bold text-zinc-700 uppercase ">Active Client Registry Ledgers</span>
                <span className="text-[10px] font-mono text-zinc-400">Click any row to reveal detailed Dossiers & printable reports</span>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-100 border-b border-zinc-200">
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 ">Inquiry Date</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 ">Identity & Designation</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 ">Organization</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 ">Yield Target / Message</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 ">Calibration Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {(() => {
                    const allEmails = new Set([
                      ...data.leads.map(l => l.email.toLowerCase()),
                      ...data.assessments.map(a => a.email.toLowerCase())
                    ]);
                    
                    const mergedData = Array.from(allEmails).map(email => {
                      const lead = data.leads.find(l => l.email.toLowerCase() === email);
                      const assessment = data.assessments.find(a => a.email.toLowerCase() === email);
                      
                      return {
                        id: lead?.id || assessment?.id || email,
                        timestamp: lead?.timestamp || assessment?.timestamp || Date.now(),
                        name: lead?.name || assessment?.name || 'Unknown User',
                        email: email,
                        organization: lead?.organization || assessment?.organization || 'Unknown Institution',
                        message: lead?.message || 'Handshake Protocol Sign-In',
                        assessment: assessment
                      };
                    }).sort((a, b) => b.timestamp - a.timestamp);

                    if (mergedData.length === 0) {
                      return (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-zinc-400 italic font-light">
                            No Sovereign Entries Detected.
                          </td>
                        </tr>
                      );
                    }

                    return mergedData.map((entry) => (
                      <tr 
                        key={entry.id} 
                        onClick={() => setSelectedEntry(entry)}
                        className="hover:bg-zinc-50 transition-colors group cursor-pointer"
                      >
                        <td className="px-6 py-6 text-xs text-zinc-500 font-mono">
                          {new Date(entry.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#111111] group-hover:text-[#b8860b] transition-colors">{entry.name}</span>
                            <span className="text-[10px] text-zinc-400 font-mono">{entry.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-6 text-xs font-bold uppercase text-[#111111]">
                          {entry.organization}
                        </td>
                        <td className="px-6 py-6">
                          <p className="text-xs text-zinc-600 italic line-clamp-2 max-w-xs">{entry.message}</p>
                        </td>
                        <td className="px-6 py-6">
                          {entry.assessment ? (
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-extrabold text-[#111111] uppercase ">
                                  {entry.assessment.totalScore} / 25
                                </span>
                              </div>
                              <div className={`text-[8px] font-black uppercase text-[#b8860b]`}>
                                {getEntryGrade(entry.assessment.totalScore).title} Alignment
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-zinc-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                              <span className="text-[9px] font-bold uppercase italic">Intake Contact</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={handleDeleteAll}
                className="text-[9px] font-black text-red-700 uppercase hover:underline"
              >
                Clear Ledger History
              </button>
            </div>
          </div>
        )}

        {activeTab === 'registry' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-fade-in">
            <div className="lg:col-span-1">
              <div className="bg-white border border-zinc-200 p-8 shadow-xl sticky top-32 rounded-sm">
                <h3 className="text-sm font-black uppercase mb-6 border-b border-zinc-100 pb-4">New Dispatch</h3>
                {recentlyAddedUrl && (
                  <div id="new-post-success-banner" className="mb-6 p-4 bg-amber-50 border border-amber-200 text-xs text-amber-950 rounded space-y-2 animate-fadeIn">
                    <div className="flex justify-between items-center font-bold">
                      <span>✓ DISPATCH ARCHIVED</span>
                      <button onClick={() => setRecentlyAddedUrl(null)} className="text-zinc-400 hover:text-zinc-600 font-bold text-lg leading-none">&times;</button>
                    </div>
                    <p className="text-[11px] text-zinc-600">The post is live and ready to share. Permanent address:</p>
                    <div className="bg-white p-2 border border-zinc-200 rounded font-mono text-[10px] break-all flex justify-between items-center gap-2">
                      <span className="truncate select-all text-zinc-700">{recentlyAddedUrl}</span>
                      <button 
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(recentlyAddedUrl);
                          alert("Permanent URL copied to clipboard!");
                        }}
                        className="text-[#b8860b] hover:text-amber-800 font-bold uppercase shrink-0"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}
                <form onSubmit={handleAddPost} className="space-y-4">
                  <div>
                    <label className="text-[9px] font-black uppercase text-zinc-400 block mb-2">Category</label>
                    <input 
                      type="text" 
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b]"
                      placeholder="e.g. Succession Architecture"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-zinc-400 block mb-2">Title</label>
                    <input 
                      type="text" 
                      required
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b]"
                      placeholder="The Future of..."
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-zinc-400 block mb-2">Excerpt</label>
                    <textarea 
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] h-20"
                      placeholder="Brief summary..."
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-zinc-400 block mb-2">Content (Double line break for new paragraph)</label>
                    <textarea 
                      required
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] h-64 font-mono"
                      placeholder="Elaborative content here..."
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#111111] text-white text-[10px] font-black uppercase hover:bg-black transition-all"
                  >
                    Archive Dispatch
                  </button>
                </form>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-8">
              
              {/* Sovereign Subscribers Ledger (Zero-Cost Campaign Center) */}
              <div className="bg-white border border-zinc-200 p-8 shadow-xl rounded-sm">
                <div className="flex justify-between items-center border-b border-zinc-100 pb-4 mb-4">
                  <div>
                    <h3 className="text-sm font-black uppercase text-[#111111]">Sovereign Subscription Hub</h3>
                    <p className="text-[10px] text-zinc-400 font-mono mt-1">Direct Zero-Cost Pipeline to Active Registry Readers</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded">
                    <span className="text-[10px] font-black uppercase text-[#b8860b] block">Subscribers</span>
                    <span className="text-xl font-bold font-mono text-zinc-900 leading-none">{subscriberEmails.length}</span>
                  </div>
                </div>

                {subscriberEmails.length === 0 ? (
                  <p className="text-xs text-zinc-400 italic">No registered subscribers found in leads database yet.</p>
                ) : (
                  <div className="space-y-3">
                    <details className="group border border-zinc-100 rounded bg-zinc-50 p-3">
                      <summary className="text-xs font-bold text-zinc-600 hover:text-zinc-800 cursor-pointer flex justify-between items-center select-none">
                        <span>View Active Registry Email List</span>
                        <span className="text-[10px] text-zinc-400 uppercase font-mono group-open:hidden">Expand</span>
                        <span className="text-[10px] text-[#b8860b] uppercase font-mono hidden group-open:inline">Collapse</span>
                      </summary>
                      <div className="mt-3 pt-3 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                        {subscriberEmails.map((email) => (
                          <div key={email} className="bg-white px-3 py-1.5 border border-zinc-200 text-[10px] font-mono text-zinc-600 rounded truncate hover:border-[#b8860b] transition-colors">
                            ● {email}
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                )}
              </div>

              {/* Custom Active Registry Entries */}
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase border-b border-zinc-100 pb-2">Custom Active Registry Entries</h3>
                {data.blog.length === 0 ? (
                  <div className="p-8 border-2 border-dashed border-zinc-200 text-center text-zinc-400 italic text-xs">
                    No custom dispatches found in the database. Use the left form to write and archive.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {data.blog.map((post) => {
                      const postUrl = `${window.location.origin}/library/${post.id}`;
                      const isPostBroadcasting = isBroadcasting === post.id;
                      return (
                        <div key={post.id} className="bg-white border border-zinc-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group rounded-sm">
                          <div className="flex-1 min-w-0 font-inter">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-[8px] font-black text-[#b8860b] uppercase ">{post.category}</span>
                              <span className="text-[8px] text-zinc-400 font-mono">{post.id}</span>
                            </div>
                            <h4 className="text-sm font-bold text-[#111111] truncate">{post.title}</h4>
                            <p className="text-xs text-zinc-500 italic mt-1 line-clamp-1">{post.excerpt}</p>
                            <div className="mt-3 text-[10px] text-zinc-500 font-mono bg-zinc-50 p-2 border border-zinc-100 rounded flex justify-between items-center gap-2">
                              <span className="truncate select-all pr-2 text-zinc-400">{postUrl}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(postUrl);
                                  alert("Dispatch address copied to clipboard.");
                                }}
                                className="text-[9px] font-black text-[#b8860b] hover:text-amber-800 transition-colors uppercase shrink-0"
                              >
                                Copy Link
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <button
                              disabled={isBroadcasting !== null}
                              type="button"
                              onClick={() => handleBroadcastNewsletter({
                                id: post.id,
                                title: post.title,
                                category: post.category,
                                tagline: post.excerpt,
                                content: post.content
                              })}
                              className={`px-4 py-2 border font-bold text-[9px] uppercase transition-all duration-200 ${
                                isPostBroadcasting 
                                  ? 'bg-[#b8860b] text-white border-[#b8860b] animate-pulse' 
                                  : 'border-[#b8860b] text-[#b8860b] hover:bg-[#b8860b] hover:text-white'
                              }`}
                            >
                              {isPostBroadcasting ? 'Broadcasting...' : `Mail to ${subscriberEmails.length}`}
                            </button>
                            <button 
                              type="button"
                              onClick={() => handleDeletePost(post.id)}
                              className="p-2 text-zinc-300 hover:text-red-600 transition-colors shrink-0"
                              title="Purge Dispatch"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Pre-compiled Core Dispatches */}
              <div className="space-y-4 pt-4 border-t border-zinc-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-black uppercase text-[#111111]">Core Systemic Dispatches</h3>
                  <span className="text-[9px] text-zinc-400 font-mono font-bold uppercase">Pre-Built Treasury (Value Driven 1%)</span>
                </div>
                <div className="bg-white border border-zinc-200 divide-y divide-zinc-100 max-h-96 overflow-y-auto shadow-sm rounded-sm">
                  {DISPATCH_TOPICS.map((topic) => {
                    const isTopicBroadcasting = isBroadcasting === topic.id;
                    return (
                      <div key={topic.id} className="p-4 flex justify-between items-center gap-4 hover:bg-zinc-50 transition-colors group">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-[8px] font-mono text-[#b8860b] font-black uppercase ">{topic.category}</span>
                            <span className="text-[8px] text-zinc-400 font-mono font-bold">{topic.id}</span>
                          </div>
                          <h4 className="text-xs font-bold text-zinc-900 truncate mt-0.5">{topic.title}</h4>
                          <p className="text-[10px] text-zinc-500 italic truncate">{topic.tagline}</p>
                        </div>
                        <button
                          disabled={isBroadcasting !== null}
                          type="button"
                          onClick={() => handleBroadcastNewsletter({
                            id: topic.id,
                            title: topic.title,
                            category: topic.category,
                            tagline: topic.tagline,
                            content: topic.content
                          })}
                          className={`px-3 py-1.5 border font-bold text-[8px] uppercase transition-all duration-200 ${
                            isTopicBroadcasting 
                              ? 'bg-[#b8860b] text-white border-[#b8860b] animate-pulse' 
                              : 'border-zinc-300 text-zinc-600 hover:border-[#b8860b] hover:text-[#b8860b]'
                          }`}
                        >
                          {isTopicBroadcasting ? 'Broadcasting...' : `Mail`}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="p-20 text-center border-2 border-dashed border-zinc-200 rounded-sm bg-white">
             <Activity className="w-12 h-12 text-zinc-300 mx-auto mb-4 animate-pulse" />
             <h3 className="text-zinc-400 font-black uppercase text-sm">Analytics Engine Idle</h3>
             <p className="text-zinc-400 text-xs italic mt-2">Sovereign telemetry requires active calibration nodes to generate resonance scores.</p>
          </div>
        )}

        {activeTab === 'outreach' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-fade-in font-inter text-neutral-900">
            {/* Target Settings form */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-zinc-200 p-8 shadow-xl rounded-sm sticky top-32">
                <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 mb-6">
                  <Mail className="w-5 h-5 text-[#b8860b]" />
                  <div>
                    <h3 className="text-sm font-black uppercase text-zinc-900">Outbound Intelligence</h3>
                    <p className="text-[10px] text-zinc-400 font-mono">Calibrated Sovereign Pitch Builder</p>
                  </div>
                </div>

                <form onSubmit={handleGenerateOutreach} className="space-y-4">
                  <div>
                    <label className="text-[9px] font-black uppercase text-zinc-400 block mb-2">Target Executive Name</label>
                    <input 
                      type="text" 
                      required
                      value={outreachForm.targetName}
                      onChange={(e) => setOutreachForm({...outreachForm, targetName: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] text-zinc-900"
                      placeholder="e.g. Johnathan Vance"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] font-black uppercase text-zinc-400 block mb-2">Executive Title</label>
                      <input 
                        type="text" 
                        required
                        value={outreachForm.targetTitle}
                        onChange={(e) => setOutreachForm({...outreachForm, targetTitle: e.target.value})}
                        className="w-full px-3 py-3 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] text-zinc-900"
                        placeholder="e.g. Chief Executive"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black uppercase text-zinc-400 block mb-2">Company Name</label>
                      <input 
                        type="text" 
                        required
                        value={outreachForm.targetCompany}
                        onChange={(e) => setOutreachForm({...outreachForm, targetCompany: e.target.value})}
                        className="w-full px-3 py-3 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] text-zinc-900"
                        placeholder="e.g. Apex Holdings"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-black uppercase text-zinc-400 block mb-2">Direct Email (Optional)</label>
                    <input 
                      type="email"
                      value={outreachForm.targetEmail}
                      onChange={(e) => setOutreachForm({...outreachForm, targetEmail: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] text-zinc-900"
                      placeholder="e.g. j.vance@apexholdings.com"
                    />
                  </div>

                  {/* High-End Swiss Style Pre-Research Hub */}
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xs space-y-4">
                    <div className="flex items-center gap-2 border-b border-zinc-200 pb-2">
                      <span className="text-[10px] font-black text-[#b8860b] uppercase block">
                        🔍 Target Pre-Research Intelligence
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[8px] font-bold uppercase text-zinc-400 block mb-1">Company Website URL</label>
                        <input 
                          type="url"
                          value={outreachForm.companyWebsiteUrl}
                          onChange={(e) => setOutreachForm({...outreachForm, companyWebsiteUrl: e.target.value})}
                          className="w-full px-3 py-2.5 bg-white border border-zinc-200 text-[10px] focus:outline-none focus:border-[#b8860b] text-zinc-900"
                          placeholder="e.g. https://apex.com"
                        />
                      </div>
                      <div>
                        <label className="text-[8px] font-bold uppercase text-zinc-400 block mb-1">LinkedIn / Profile URL</label>
                        <input 
                          type="url"
                          value={outreachForm.linkedinUrl}
                          onChange={(e) => setOutreachForm({...outreachForm, linkedinUrl: e.target.value})}
                          className="w-full px-3 py-2.5 bg-white border border-zinc-200 text-[10px] focus:outline-none focus:border-[#b8860b] text-zinc-900"
                          placeholder="e.g. linkedin.com/in/jvance"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[8px] font-bold uppercase text-zinc-400 block">📋 Copied Bio, Recent Post, or Homepage text</label>
                        <span className="text-[8px] text-zinc-400 font-mono lowercase">Free Tier Precision</span>
                      </div>
                      <textarea
                        rows={3}
                        value={outreachForm.pastedContext}
                        onChange={(e) => setOutreachForm({...outreachForm, pastedContext: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 text-[10px] focus:outline-none focus:border-[#b8860b] text-zinc-900 leading-relaxed font-sans"
                        placeholder="Paste text copy here. The AI will read this exact biography or company message to extract highly personalized friction hooks instantly."
                      />
                    </div>

                    <div className="space-y-2 pt-1 border-t border-zinc-200">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox"
                          id="enableSearchGrounding"
                          checked={outreachForm.enableSearchGrounding}
                          onChange={(e) => setOutreachForm({...outreachForm, enableSearchGrounding: e.target.checked})}
                          className="w-3.5 h-3.5 text-[#b8860b] border-zinc-350 rounded focus:ring-0 accent-[#b8860b] cursor-pointer"
                        />
                        <label htmlFor="enableSearchGrounding" className="text-[8px] font-bold text-zinc-500 uppercase cursor-pointer select-none">
                          Enable Real-Time Google Search Grounding
                        </label>
                      </div>

                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox"
                          id="embedResearch"
                          checked={outreachForm.embedResearch}
                          onChange={(e) => setOutreachForm({...outreachForm, embedResearch: e.target.checked})}
                          className="w-3.5 h-3.5 text-[#b8860b] border-zinc-350 rounded focus:ring-0 accent-[#b8860b] cursor-pointer"
                        />
                        <label htmlFor="embedResearch" className="text-[8px] font-bold text-[#b8860b] uppercase cursor-pointer select-none flex items-center gap-1">
                          ✨ Embed Specific Founder / Company Facts inside Draft
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-black uppercase text-zinc-400 block mb-2">Friction Point / Theme Focus</label>
                    <select
                      value={outreachForm.theme}
                      onChange={(e) => setOutreachForm({...outreachForm, theme: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] text-zinc-950"
                    >
                      <option>Cognitive Tax over leadership (reclaiming 40% bandwidth)</option>
                      <option>Succession Architecture & handovers of enterprise perpetuity</option>
                      <option>Reducing Institutional Lag and executive intent conversion gaps</option>
                      <option>Protecting operational edge focus and scaling sovereign culture</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] font-black uppercase text-zinc-400 block mb-2">Pitch Style Tone</label>
                    <select
                      value={outreachForm.tone}
                      onChange={(e) => setOutreachForm({...outreachForm, tone: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] text-zinc-950"
                    >
                      <option>Sovereign Academic & Inevitable</option>
                      <option>Formal Swiss Concierge</option>
                      <option>Direct, Provocative & Metric-Driven</option>
                      <option>Discreet Family Office Style</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    disabled={isGeneratingOutreach}
                    className="w-full py-4 bg-[#b8860b] hover:bg-[#a07409] text-white text-[10px] font-black uppercase transition-all rounded-sm flex justify-center items-center gap-2 cursor-pointer"
                  >
                    {isGeneratingOutreach ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Synthesizing Strategic Dispatch...
                      </>
                    ) : (
                      'Assemble Expert Outbound Pitch'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Generated results & history list */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Active generation showcase */}
              <div className="bg-white border border-zinc-200 p-8 shadow-xl rounded-sm">
                <div className="flex justify-between items-center border-b border-zinc-100 pb-4 mb-6">
                  <div>
                    <h3 className="text-sm font-black uppercase text-zinc-900">Sovereign Dispatch Preview Stationery</h3>
                    <p className="text-[10px] text-zinc-400 font-mono">Highly personalized alignment pitch crafted by TULC Copilot</p>
                  </div>
                  <span className="px-3 py-1 bg-zinc-100 border border-zinc-200 text-[8px] font-mono font-black text-zinc-500 uppercase ">
                    Internal Workspace Draft
                  </span>
                </div>

                {generatedOutreach ? (
                  <div className="space-y-6 animate-fade-in text-neutral-900">
                    {/* Analyst Strategic Brief and Active Draft Info */}
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-4 bg-zinc-50 border border-zinc-200 rounded text-xs leading-relaxed text-zinc-800">
                      <div>
                        <span className="text-[9px] font-black text-[#b8860b] uppercase block mb-1">Active Ledger Document ID:</span>
                        <code className="text-[10px] font-mono text-zinc-600 bg-zinc-100 px-1 rounded">{activeOutreachId || "Unsaved Draft"}</code>
                        <span className="text-zinc-600 block mt-1">"{generatedOutreach.brief}"</span>
                      </div>
                      
                      {activeOutreachId && (
                        <div className="flex items-center gap-2 shrink-0 bg-white border border-zinc-200 px-3 py-1.5 rounded shadow-sm">
                          <span className="text-[8px] font-black uppercase text-zinc-400 ">Status:</span>
                          <div className="flex gap-1">
                            {(['Draft', 'Sent', 'Engaged'] as const).map((stage) => {
                              const isCurrent = outreachHistory.find(h => h.id === activeOutreachId)?.status === stage;
                              return (
                                <button
                                  key={stage}
                                  type="button"
                                  onClick={() => {
                                    const updated = outreachHistory.map(h => 
                                      h.id === activeOutreachId ? { ...h, status: stage } : h
                                    );
                                    saveOutreachHistory(updated);
                                  }}
                                  className={`text-[8px] font-black px-2 py-0.5 rounded border transition-all cursor-pointer ${
                                    isCurrent 
                                      ? 'bg-amber-150 text-[#b8860b] border-[#b8860b] font-extrabold' 
                                      : 'bg-transparent text-zinc-400 border-zinc-100 hover:text-zinc-600'
                                  }`}
                                >
                                  {stage}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Copyable & editable fields */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[9px] font-black uppercase text-zinc-400 ">Email Subject Line (Fully Editable)</label>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedOutreach.subject);
                              alert('Subject line copied to clipboard!');
                            }}
                            className="text-[9px] font-black text-[#b8860b] hover:underline uppercase"
                          >
                            Copy Subject
                          </button>
                        </div>
                        <input 
                          type="text"
                          value={generatedOutreach.subject}
                          onChange={(e) => setGeneratedOutreach({...generatedOutreach, subject: e.target.value})}
                          className="w-full px-4 py-3 bg-[#fdfdfb] border border-zinc-300 text-xs focus:outline-none focus:border-[#b8860b] font-serif font-bold text-zinc-900 shadow-inner"
                          placeholder="Strategic Subject Line..."
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[9px] font-black uppercase text-zinc-400 ">Letter Body Content (Type or Edit Freely)</label>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedOutreach.body);
                              alert('Dynamic body copy copied to clipboard!');
                            }}
                            className="text-[9px] font-black text-[#b8860b] hover:underline uppercase"
                          >
                            Copy Letter Text
                          </button>
                        </div>
                        <textarea
                          rows={14}
                          value={generatedOutreach.body}
                          onChange={(e) => setGeneratedOutreach({...generatedOutreach, body: e.target.value})}
                          className="w-full px-5 py-4 bg-[#fdfdfb] border border-zinc-300 text-xs focus:outline-none focus:border-[#b8860b] font-serif text-zinc-800 leading-relaxed rounded-xs shadow-inner"
                          placeholder="Type your strategic outbound letter content here..."
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        type="button"
                        onClick={handleUpdateDraft}
                        className="flex-1 py-4 bg-[#b8860b] hover:bg-[#a07409] text-white text-[10px] font-black uppercase transition-all rounded-sm flex justify-center items-center gap-2 cursor-pointer"
                      >
                        <Check className="w-4 h-4" /> Approve & Save Draft Variations
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLaunchMailto(generatedOutreach.subject, generatedOutreach.body, outreachForm.targetEmail)}
                        className="flex-1 py-4 bg-[#111111] hover:bg-black text-white text-[10px] font-black uppercase transition-all rounded-sm flex justify-center items-center gap-2 cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" /> Launch Live Native Mail Client
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-16 text-center border-2 border-dashed border-zinc-200 rounded-sm bg-zinc-50 flex flex-col items-center justify-center">
                    <Mail className="w-12 h-12 text-zinc-300 mb-4 animate-pulse" />
                    <h3 className="text-zinc-400 font-black uppercase text-xs">Construct Sovereign Correspondence</h3>
                    <p className="text-zinc-400 text-[11px] italic mt-2 max-w-md mx-auto mb-6">
                      Fill out target metrics on the left, or skip the AI and immediately formulate a manual customized letter template to suit your strict stylistic specifications.
                    </p>
                    <button
                      type="button"
                      onClick={handleStartManualDraft}
                      className="px-6 py-3 bg-[#111111] hover:bg-black text-white text-[9px] font-black uppercase transition-all rounded-sm flex items-center gap-2 cursor-pointer"
                    >
                      📝 Begin Blank Custom Draft
                    </button>
                  </div>
                )}
              </div>

              {/* Outreach history CRM registry */}
              <div className="bg-white border border-zinc-200 p-8 shadow-xl rounded-sm">
                <div className="flex justify-between items-center border-b border-zinc-100 pb-4 mb-4">
                  <div>
                    <h3 className="text-sm font-black uppercase text-[#111111]">Outreach Target Registry Ledger</h3>
                    <p className="text-[10px] text-zinc-400 font-mono mt-1">Sovereign outbound dispatch audit log</p>
                  </div>
                  <span className="bg-amber-50 border border-amber-200 px-3 py-1 rounded text-[10px] font-black uppercase font-mono text-[#b8860b]">
                    Saved Drafts: {outreachHistory.length}
                  </span>
                </div>

                {outreachHistory.length === 0 ? (
                  <p className="text-xs text-zinc-400 italic text-[#777]">No historical target dispatches logged. Completed syntheses appear here automatically.</p>
                ) : (
                  <div className="divide-y divide-zinc-100 max-h-80 overflow-y-auto">
                    {outreachHistory.map((item) => (
                      <div key={item.id} className="py-4 flex justify-between items-start gap-4 group hover:bg-zinc-50/50 px-2 rounded transition-colors text-neutral-800">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[8px] font-mono text-[#b8860b] font-black uppercase ">{item.targetCompany}</span>
                            <span className="text-[8px] text-zinc-400 font-mono">{new Date(item.timestamp).toLocaleDateString()}</span>
                          </div>
                          <h4 className="text-xs font-bold text-zinc-900">{item.targetName} — <span className="text-zinc-500 font-normal italic">{item.targetTitle}</span></h4>
                          <p className="text-[10px] text-zinc-400 truncate mt-0.5">Subject: {item.subject}</p>
                        </div>
                        <div className="flex items-center gap-2 self-center">
                          <button
                            type="button"
                            onClick={() => {
                              setOutreachForm({
                                targetName: item.targetName,
                                targetTitle: item.targetTitle,
                                targetCompany: item.targetCompany,
                                targetEmail: item.targetEmail || '',
                                theme: item.theme,
                                tone: 'Sovereign Academic & Inevitable'
                              });
                              setGeneratedOutreach({
                                brief: `Restored historical outbound draft for ${item.targetName} at ${item.targetCompany}.`,
                                subject: item.subject,
                                body: item.body
                              });
                              setActiveOutreachId(item.id);
                            }}
                            className="px-3 py-1.5 border border-zinc-200 hover:border-[#b8860b] hover:text-[#b8860b] font-bold text-[8px] uppercase transition-all cursor-pointer"
                          >
                            Restore Draft
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to remove this record?')) {
                                saveOutreachHistory(outreachHistory.filter(h => h.id !== item.id));
                              }
                            }}
                            className="p-1 px-2 text-zinc-300 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {activeTab === 'email_logs' && (
          <div className="space-y-8 animate-fade-in text-neutral-900 font-inter">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-zinc-200 p-6 shadow-sm rounded-sm flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase text-[#b8860b] block mb-2">Total Transmissions Attempted</span>
                  <span className="text-4xl font-bold font-mono text-[#111111]">{data.emailLogs.length}</span>
                </div>
                <div className="text-[10px] text-zinc-400 mt-2 font-mono">Telemetry of all outbound traffic</div>
              </div>
              <div className="bg-white border border-zinc-200 p-6 shadow-sm rounded-sm flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase text-green-700 block mb-2">Clear & Delivered Routes</span>
                  <span className="text-4xl font-bold font-mono text-green-700">
                    {data.emailLogs.filter(l => l.status === 'sent').length}
                  </span>
                </div>
                <div className="text-[10px] text-zinc-500 mt-2 font-mono">
                  Success Rate: {data.emailLogs.length > 0 ? Math.round((data.emailLogs.filter(l => l.status === 'sent').length / data.emailLogs.length) * 100) : 0}%
                </div>
              </div>
              <div className="bg-white border border-zinc-200 p-6 shadow-sm rounded-sm flex flex-col justify-between bg-rose-50/10">
                <div>
                  <span className="text-[9px] font-black uppercase text-rose-700 block mb-2">Delivery Blockages</span>
                  <span className="text-4xl font-bold font-mono text-rose-700">
                    {data.emailLogs.filter(l => l.status === 'failed').length}
                  </span>
                </div>
                <div className="text-[10px] text-zinc-500 mt-2 font-mono">Action required for failed nodes</div>
              </div>
            </div>

            {/* Diagnostic Alert Advice */}
            <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-sm text-xs text-zinc-600 space-y-2">
              <h4 className="font-bold text-[#b8860b] uppercase text-[10px]">RECIPIENT & DOMAIN VERIFICATION GUIDE:</h4>
              <p>
                1. <strong>Free-tier constraint:</strong> If you are using Resend's free tier, you can only send emails to the address you signed up with (the verified owner email <strong>suchita135sancheti@gmail.com</strong>) unless you verify your domain.
              </p>
              <p>
                2. <strong>Domain Configuration:</strong> To send emails to external clients, verify your domain (e.g. <code>theunboundedleadership.com</code>) under the "Domains" tab in your Resend Dashboard. Once active, set <code>VITE_SENDER_EMAIL</code> and <code>VITE_ADMIN_EMAIL</code> to matching addresses.
              </p>
            </div>

            {/* Log List View */}
            <div className="bg-white border border-zinc-200 rounded-sm shadow-sm">
              <div className="p-6 border-b border-zinc-100">
                <h3 className="text-xs font-black uppercase text-[#111111]">Outbound Logs</h3>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">Real-time delivery registry & status checks</p>
              </div>

              {data.emailLogs.length === 0 ? (
                <div className="p-12 text-center text-zinc-400 italic text-xs">
                  No outbound email log nodes generated yet. Execute waitlist or assessments to trigger traffic.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-zinc-600 font-inter">
                    <thead className="bg-zinc-50 text-[9px] font-black uppercase text-zinc-400 border-b border-zinc-200">
                      <tr>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Timestamp</th>
                        <th className="px-6 py-4">Dispatch Class</th>
                        <th className="px-6 py-4">Recipient</th>
                        <th className="px-6 py-4">Subject</th>
                        <th className="px-6 py-4">Diagnostics</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {data.emailLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${
                              log.status === 'sent' 
                                ? 'bg-green-50 text-green-700 border-green-200/50' 
                                : 'bg-rose-50 text-rose-700 border-rose-200/50'
                            }`}>
                              {log.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-zinc-400 font-mono text-[10px]">
                            {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() + ' ' + new Date(log.timestamp).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-mono text-[10px]">
                            <span className="text-zinc-500 uppercase ">
                              {log.type.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-zinc-900 font-mono text-[10px]">
                            {log.recipient}
                          </td>
                          <td className="px-6 py-4 font-mono text-[10px] max-w-xs truncate">
                            {log.subject}
                          </td>
                          <td className="px-6 py-4 text-[10px] font-mono">
                            {log.status === 'sent' ? (
                              <span className="text-zinc-400">ID: {log.resendId || 'N/A'}</span>
                            ) : (
                              <span className="text-rose-600 block max-w-sm overflow-hidden text-ellipsis whitespace-nowrap" title={log.error || ''}>
                                {log.error || 'Unknown Error'}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'licenses' && (
          <div className="space-y-8 animate-fade-in text-neutral-900 font-inter">
            {/* Top Metrics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white border border-zinc-200 p-6 shadow-sm rounded-sm">
                <span className="text-[9px] font-black uppercase text-[#b8860b] block mb-1">Total Passkeys Issued</span>
                <span className="text-3xl font-bold font-mono text-[#111111]">{data.licenses.length}</span>
                <p className="text-[10px] text-zinc-400 mt-1 font-mono">Multi-user organization licenses</p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 shadow-sm rounded-sm">
                <span className="text-[9px] font-black uppercase text-green-700 block mb-1">Active Windows</span>
                <span className="text-3xl font-bold font-mono text-green-700">
                  {data.licenses.filter(l => l.status === 'active' && Date.now() <= l.expiresAt).length}
                </span>
                <p className="text-[10px] text-zinc-400 mt-1 font-mono">Unrestricted portal entry</p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 shadow-sm rounded-sm">
                <span className="text-[9px] font-black uppercase text-amber-700 block mb-1">Expired / Revoked</span>
                <span className="text-3xl font-bold font-mono text-amber-700">
                  {data.licenses.filter(l => l.status === 'revoked' || Date.now() > l.expiresAt).length}
                </span>
                <p className="text-[10px] text-zinc-400 mt-1 font-mono">Requires renewal or extension</p>
              </div>

              <div className="bg-white border border-zinc-200 p-6 shadow-sm rounded-sm">
                <span className="text-[9px] font-black uppercase text-blue-700 block mb-1">Total Portal Logins</span>
                <span className="text-3xl font-bold font-mono text-blue-700">
                  {data.licenses.reduce((acc, l) => acc + (l.accessCount || 0), 0)}
                </span>
                <p className="text-[10px] text-zinc-400 mt-1 font-mono">Cumulative client sessions</p>
              </div>
            </div>

            {/* Main Action Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Form: Generate New Passkey */}
              <div className="lg:col-span-1 bg-white border border-zinc-200 p-6 shadow-sm rounded-sm">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
                  <div>
                    <h3 className="text-xs font-black uppercase text-[#111111] flex items-center gap-2">
                      <Key className="w-3.5 h-3.5 text-[#b8860b]" />
                      Generate Passkey
                    </h3>
                    <p className="text-[10px] text-zinc-400 font-mono mt-0.5">Issue new client authorization window</p>
                  </div>
                  <Sparkles className="w-4 h-4 text-[#b8860b]" />
                </div>

                <form onSubmit={handleGenerateLicense} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-zinc-500 mb-1">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Global Capital"
                      value={licenseForm.orgName}
                      onChange={(e) => setLicenseForm({ ...licenseForm, orgName: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-[#b8860b] text-zinc-900 rounded-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase text-zinc-500 mb-1">
                      Executive Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. principal@apexcapital.com"
                      value={licenseForm.contactEmail}
                      onChange={(e) => setLicenseForm({ ...licenseForm, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-[#b8860b] text-zinc-900 rounded-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase text-zinc-500 mb-1">
                      Service / Mandate Tier
                    </label>
                    <select
                      value={licenseForm.tier}
                      onChange={(e) => {
                        const newTier = e.target.value as PortalTierType;
                        let defaultDays = 14;
                        if (newTier === 'BETA') defaultDays = 14;
                        else if (newTier === 'TIER_1_DIAGNOSTIC') defaultDays = 14;
                        else if (newTier === 'TIER_2_SPRINT') defaultDays = 90;
                        else if (newTier === 'TIER_3_SOVEREIGN_RETAINER') defaultDays = 365;
                        else defaultDays = 30;

                        setLicenseForm({
                          ...licenseForm,
                          tier: newTier,
                          validityDays: defaultDays
                        });
                      }}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-[#b8860b] text-zinc-900 rounded-sm text-xs"
                    >
                      <option value="BETA">🎟️ Beta Testing Access (Free Trial - 14 Days)</option>
                      <option value="TIER_1_DIAGNOSTIC">🥉 Tier 1: Phase 0.0 Diagnostic Audit (14 Days)</option>
                      <option value="TIER_2_SPRINT">🥈 Tier 2: 90-Day Protocol Transformation (90 Days)</option>
                      <option value="TIER_3_SOVEREIGN_RETAINER">🥇 Tier 3: Sovereign Retainer & Board Seat (365 Days)</option>
                      <option value="CUSTOM">⚙️ Custom Engagement Window</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase text-zinc-500 mb-1">
                      Validity Window (Days)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="730"
                      required
                      value={licenseForm.validityDays}
                      onChange={(e) => setLicenseForm({ ...licenseForm, validityDays: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-[#b8860b] text-zinc-900 rounded-sm font-mono"
                    />
                    <span className="text-[10px] text-zinc-400 font-mono mt-0.5 block">
                      Expires: {new Date(Date.now() + licenseForm.validityDays * 86400000).toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase text-zinc-500 mb-1">
                      Custom Passkey Code (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Leave blank to auto-generate"
                      value={licenseForm.customKey}
                      onChange={(e) => setLicenseForm({ ...licenseForm, customKey: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-[#b8860b] text-zinc-900 rounded-sm font-mono uppercase text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase text-zinc-500 mb-1">
                      Private Administrative Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Free beta cohort #1. Board sponsor: Suchita Sancheti."
                      value={licenseForm.notes}
                      onChange={(e) => setLicenseForm({ ...licenseForm, notes: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-[#b8860b] text-zinc-900 rounded-sm font-sans text-xs resize-none"
                    />
                  </div>

                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-[11px] text-zinc-700">
                      <input
                        type="checkbox"
                        checked={licenseForm.sendEmail}
                        onChange={(e) => setLicenseForm({ ...licenseForm, sendEmail: e.target.checked })}
                        className="rounded border-zinc-300 text-[#b8860b] focus:ring-[#b8860b]"
                      />
                      <span>Email credentials to client automatically</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isGeneratingLicense}
                    className="w-full py-3 bg-[#b8860b] hover:bg-[#a07409] text-white text-[10px] uppercase font-black tracking-widest text-center transition-all flex items-center justify-center gap-2 rounded-sm shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isGeneratingLicense ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Generating & Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <Key className="w-3.5 h-3.5" />
                        <span>Issue & Authorize Passkey</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Last Generated Quick Card */}
                {lastGeneratedLicense && (
                  <div className="mt-6 p-4 bg-[#111111] text-white border border-[#b8860b] rounded-sm animate-fade-in">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-mono text-[#b8860b] uppercase tracking-widest">
                        ✓ Passkey Active
                      </span>
                      <button
                        onClick={() => handleCopyPortalLink(lastGeneratedLicense.key, 'last-gen')}
                        className="text-[9px] text-zinc-300 hover:text-white flex items-center gap-1 font-mono underline"
                      >
                        {copiedKeyId === 'last-gen' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                        {copiedKeyId === 'last-gen' ? 'Copied Link' : 'Copy Direct URL'}
                      </button>
                    </div>
                    <div className="font-mono text-sm font-bold text-white tracking-widest">
                      {lastGeneratedLicense.key}
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-1 font-mono">
                      {lastGeneratedLicense.organization} • Valid until {new Date(lastGeneratedLicense.expiresAt).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>

              {/* Table / Ledger of All Passkeys */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Active Passes Ledger */}
                <div className="bg-white border border-zinc-200 rounded-sm shadow-sm">
                  <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-black uppercase text-[#111111]">Institutional Passkey Ledger</h3>
                      <p className="text-[10px] text-zinc-400 font-mono mt-0.5">Multi-user access control & telemetry</p>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      Target App: <a href="https://sovereign-audit-the-institutional-stress-test-942902734370.us-west1.run.app" target="_blank" rel="noreferrer" className="text-[#b8860b] underline font-bold">Cloud Run App ↗</a>
                    </div>
                  </div>

                  {data.licenses.length === 0 ? (
                    <div className="p-12 text-center text-zinc-400 italic text-xs">
                      No client access passkeys have been generated yet. Use the tool on the left to issue your first key.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-zinc-600 font-inter">
                        <thead className="bg-zinc-50 text-[9px] font-black uppercase text-zinc-400 border-b border-zinc-200">
                          <tr>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Passkey</th>
                            <th className="px-6 py-4">Organization & Email</th>
                            <th className="px-6 py-4">Tier</th>
                            <th className="px-6 py-4">Window Expiration</th>
                            <th className="px-6 py-4">Usage</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 font-sans">
                          {data.licenses.map((lic) => {
                            const isExpired = Date.now() > lic.expiresAt;
                            const isActive = lic.status === 'active' && !isExpired;

                            return (
                              <tr key={lic.id} className="hover:bg-zinc-50/50 transition-colors">
                                
                                {/* Status */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {lic.status === 'revoked' ? (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-rose-50 text-rose-700 border border-rose-200">
                                      Revoked
                                    </span>
                                  ) : isExpired ? (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200">
                                      Expired
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-green-50 text-green-700 border border-green-200">
                                      Active
                                    </span>
                                  )}
                                </td>

                                {/* Passkey */}
                                <td className="px-6 py-4 whitespace-nowrap font-mono text-[11px] font-bold text-zinc-900">
                                  <div className="flex items-center gap-2">
                                    <span className="bg-zinc-100 px-2 py-1 border border-zinc-200 rounded tracking-wider">
                                      {lic.key}
                                    </span>
                                    <button
                                      title="Copy Direct Portal URL"
                                      onClick={() => handleCopyPortalLink(lic.key, lic.id)}
                                      className="p-1 hover:bg-zinc-200 rounded text-zinc-500 hover:text-black transition-colors"
                                    >
                                      {copiedKeyId === lic.id ? (
                                        <Check className="w-3.5 h-3.5 text-green-600" />
                                      ) : (
                                        <Copy className="w-3.5 h-3.5" />
                                      )}
                                    </button>
                                  </div>
                                </td>

                                {/* Org & Email */}
                                <td className="px-6 py-4">
                                  <div className="font-bold text-zinc-900 text-xs">{lic.organization}</div>
                                  <div className="text-[10px] text-zinc-400 font-mono">{lic.contactEmail}</div>
                                  {lic.notes && (
                                    <div className="text-[9px] text-zinc-500 italic mt-0.5 line-clamp-1">"{lic.notes}"</div>
                                  )}
                                </td>

                                {/* Tier */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-zinc-100 text-zinc-700 border border-zinc-200">
                                    {lic.tier.replace(/_/g, ' ')}
                                  </span>
                                </td>

                                {/* Expiration */}
                                <td className="px-6 py-4 whitespace-nowrap font-mono text-[10px]">
                                  <div className={isExpired ? 'text-rose-600 font-bold' : 'text-zinc-600'}>
                                    {new Date(lic.expiresAt).toLocaleDateString()}
                                  </div>
                                  <div className="text-[9px] text-zinc-400">
                                    {isExpired ? 'Ended' : `${Math.ceil((lic.expiresAt - Date.now()) / (1000 * 60 * 60 * 24))}d remaining`}
                                  </div>
                                </td>

                                {/* Usage */}
                                <td className="px-6 py-4 whitespace-nowrap font-mono text-[10px]">
                                  <span className="font-bold text-zinc-900">{lic.accessCount || 0}</span> logins
                                  {lic.lastAccessedAt && (
                                    <div className="text-[8px] text-zinc-400">
                                      Last: {new Date(lic.lastAccessedAt).toLocaleDateString()}
                                    </div>
                                  )}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                                  <button
                                    title="Resend Passkey Email to Client"
                                    disabled={isResendingEmail === lic.id}
                                    onClick={() => handleResendLicenseEmail(lic)}
                                    className="p-1.5 bg-zinc-100 hover:bg-[#b8860b] hover:text-white rounded text-zinc-600 transition-colors inline-flex items-center gap-1 text-[9px] font-bold uppercase disabled:opacity-50"
                                  >
                                    <Send className="w-3 h-3" />
                                    <span>{isResendingEmail === lic.id ? 'Sending...' : 'Email'}</span>
                                  </button>

                                  <button
                                    title={lic.status === 'active' ? 'Revoke Passkey' : 'Reactivate Passkey'}
                                    onClick={() => handleToggleLicenseStatus(lic)}
                                    className={`px-2 py-1 rounded text-[9px] font-bold uppercase transition-colors ${
                                      lic.status === 'active'
                                        ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                                    }`}
                                  >
                                    {lic.status === 'active' ? 'Revoke' : 'Reactivate'}
                                  </button>

                                  <button
                                    title="Delete Passkey Record"
                                    onClick={() => handleDeleteLicense(lic)}
                                    className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors inline-flex items-center"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>

                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Master Clearance Information for Admins */}
                <div className="bg-[#111111] text-zinc-300 p-6 border border-[#b8860b]/40 rounded-sm space-y-3">
                  <div className="flex items-center gap-2 text-[#b8860b]">
                    <Shield className="w-4 h-4" />
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                      Master Clearance Backdoor Coordinates
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    For internal review, testing, or instant board demonstrations by Suchita Sancheti, the following master keys bypass all expiration timers:
                  </p>
                  <div className="flex flex-wrap gap-3 font-mono text-xs">
                    <span className="bg-black border border-white/20 text-[#b8860b] px-3 py-1.5 rounded">
                      TULC-MASTER
                    </span>
                    <span className="bg-black border border-white/20 text-[#b8860b] px-3 py-1.5 rounded">
                      TULC-ARCHITECT-2026
                    </span>
                    <span className="bg-black border border-white/20 text-[#b8860b] px-3 py-1.5 rounded">
                      SOVEREIGN-CLEARANCE
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    Clients using any valid passkey are redirected seamlessly to <code className="text-zinc-300">https://sovereign-audit-the-institutional-stress-test-942902734370.us-west1.run.app</code> in the same browser window without popup blockers or external navigation tabs.
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}
      </div>

      {/* Selected Entry Detail Modal Drawer */}
      {selectedEntry && (
        <div className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-2xl bg-white h-screen overflow-y-auto shadow-2xl p-8 flex flex-col justify-between animate-slide-in">
            <div>
              {/* Header */}
              <div className="flex justify-between items-start border-b border-zinc-200 pb-6 mb-6">
                <div>
                  <span className="text-[9px] font-black text-[#b8860b] uppercase block mb-1">
                    {selectedEntry.assessment ? 'Diagnostic Dossier Calibrated' : 'Contact File Open'}
                  </span>
                  <h3 className="text-2xl font-bold text-neutral-900">{selectedEntry.name}</h3>
                  <p className="text-xs font-mono text-zinc-500 mt-1">{selectedEntry.email}</p>
                </div>
                <button 
                  onClick={() => setSelectedEntry(null)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-500" />
                </button>
              </div>

              {/* Coordinates Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8 bg-zinc-50 p-4 border border-zinc-200 rounded-sm">
                <div>
                  <span className="text-[8px] font-black uppercase text-zinc-400 block mb-1">Organization</span>
                  <span className="text-xs font-bold text-neutral-900">{selectedEntry.organization}</span>
                </div>
                <div>
                  <span className="text-[8px] font-black uppercase text-zinc-400 block mb-1">Date Logged</span>
                  <span className="text-xs text-neutral-600 font-mono">{new Date(selectedEntry.timestamp).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[8px] font-black uppercase text-zinc-400 block mb-1">Classification Context</span>
                  <span className="text-xs font-bold text-[#b8860b] uppercase ">
                    {selectedEntry.assessment?.context || 'Sovereign Contact Only'}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] font-black uppercase text-zinc-400 block mb-1">Entry Id</span>
                  <span className="text-[10px] text-zinc-400 font-mono">{selectedEntry.id}</span>
                </div>
              </div>

              {/* Initial message */}
              <div className="mb-8">
                <span className="text-[8px] font-black uppercase text-zinc-400 block mb-1">Inquiry coordinates / notes</span>
                <p className="text-xs text-zinc-700 font-light italic bg-[#fafaf8] border border-zinc-100 px-4 py-3 rounded-sm leading-relaxed">
                  "{selectedEntry.message}"
                </p>
              </div>

              {/* IF client has an assessment */}
              {selectedEntry.assessment ? (
                <div className="space-y-6">
                  {/* Score circle */}
                  <div className="border border-zinc-200 p-6 bg-zinc-50 rounded-sm">
                    <span className="text-[8px] font-black uppercase text-[#b8860b] block mb-2">Systemic Resonant Level</span>
                    <div className="flex items-center gap-6">
                      <div className="relative flex items-center justify-center w-16 h-16 rounded-full border-2 border-amber-600/50 bg-[#b8860b]/10 text-xl font-bold font-mono text-zinc-900">
                        {selectedEntry.assessment.totalScore}
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-neutral-900 uppercase">
                          Alignment: {getEntryGrade(selectedEntry.assessment.totalScore).title}
                        </div>
                        <p className="text-[11px] text-zinc-500 italic mt-0.5">
                          {getEntryGrade(selectedEntry.assessment.totalScore).desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Detailed question results */}
                  <div>
                    <h4 className="text-xs font-black uppercase text-[#111111] mb-4 border-b border-zinc-100 pb-2">Domain Audit Results</h4>
                    <div className="space-y-4">
                      {optionDescriptions.map((domainMeta) => {
                        const scoreVal = selectedEntry.assessment.answers?.[domainMeta.index] || 1;
                        const matchedDesc = (domainMeta as any)[scoreVal] || 'Not answered';
                        return (
                          <div key={domainMeta.index} className="border border-zinc-100 p-4 rounded-sm hover:border-[#b8860b]/30 transition-all bg-white shadow-xs">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-bold text-neutral-800">{domainMeta.name}</span>
                              <span className="text-xs font-extrabold text-[#b8860b]">{scoreVal} / 5</span>
                            </div>
                            <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden mb-2">
                              <div className="bg-[#b8860b] h-full rounded-full" style={{ width: `${(scoreVal / 5) * 100}%` }}></div>
                            </div>
                            <p className="text-[10px] text-zinc-500 italic">"{matchedDesc}"</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-zinc-100 p-6 text-center border border-zinc-200">
                  <Fingerprint className="w-8 h-8 text-zinc-300 mx-auto mb-2 animate-pulse" />
                  <p className="text-xs text-zinc-500 italic">No diagnostic questionnaire available for this subscriber.</p>
                </div>
              )}
            </div>

            {/* Sticky print controls */}
            <div className="border-t border-zinc-200 pt-6 mt-8 flex gap-4">
              {selectedEntry.assessment && (
                <button
                  type="button"
                  onClick={() => handlePrintDossier(selectedEntry)}
                  className="flex-1 py-3 bg-[#b8860b] hover:bg-[#a07409] text-white text-[10px] uppercase font-black text-center transition-all flex items-center justify-center gap-2 rounded-sm shadow-md"
                >
                  <FileText className="w-4 h-4" /> Print Diagnostic Dossier
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                className="py-3 px-8 border border-zinc-200 hover:bg-zinc-50 text-[10px] text-zinc-600 uppercase font-bold transition-all rounded-sm text-center"
              >
                Close File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="bg-white border border-zinc-200 p-8 shadow-sm rounded-sm">
    <span className="text-[9px] font-black uppercase text-[#b8860b] block mb-2">{label}</span>
    <span className="text-4xl font-bold font-mono text-[#111111]">{value}</span>
  </div>
);

export default AdminDashboard;
