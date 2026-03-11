
export interface LeadEntry {
  id: string;
  timestamp: number;
  name: string;
  email: string;
  organization: string;
  message: string;
  type: 'waitlist';
}

export interface AssessmentEntry {
  id: string;
  timestamp: number;
  email: string;
  score: string;
  analysis: string;
  constraint: string;
  leverage: string;
  type: 'assessment';
}

export interface BlogEntry {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  content: string[];
  timestamp: number;
}

const STORAGE_KEYS = {
  LEADS: 'tulc_sovereign_leads',
  ASSESSMENTS: 'tulc_sovereign_assessments',
  BLOG: 'tulc_sovereign_blog'
};

export const SovereignDB = {
  // ... existing methods ...
  saveLead: (data: Omit<LeadEntry, 'id' | 'timestamp' | 'type'>) => {
    const leads = SovereignDB.getLeads();
    const newLead: LeadEntry = {
      ...data,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      type: 'waitlist'
    };
    leads.push(newLead);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    return newLead;
  },

  saveAssessment: (data: Omit<AssessmentEntry, 'id' | 'timestamp' | 'type'>) => {
    const assessments = SovereignDB.getAssessments();
    const newEntry: AssessmentEntry = {
      ...data,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      type: 'assessment'
    };
    assessments.push(newEntry);
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(assessments));
    return newEntry;
  },

  saveBlogPost: (data: Omit<BlogEntry, 'id' | 'timestamp'>) => {
    const posts = SovereignDB.getBlogPosts();
    const newPost: BlogEntry = {
      ...data,
      id: `INT-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      timestamp: Date.now()
    };
    posts.push(newPost);
    localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(posts));
    return newPost;
  },

  deleteBlogPost: (id: string) => {
    const posts = SovereignDB.getBlogPosts().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(posts));
  },

  getLeads: (): LeadEntry[] => {
    const data = localStorage.getItem(STORAGE_KEYS.LEADS);
    return data ? JSON.parse(data) : [];
  },

  getAssessments: (): AssessmentEntry[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
    return data ? JSON.parse(data) : [];
  },

  getBlogPosts: (): BlogEntry[] => {
    const data = localStorage.getItem(STORAGE_KEYS.BLOG);
    return data ? JSON.parse(data) : [];
  },

  getAllData: () => {
    return {
      leads: SovereignDB.getLeads(),
      assessments: SovereignDB.getAssessments(),
      blog: SovereignDB.getBlogPosts()
    };
  },

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEYS.LEADS);
    localStorage.removeItem(STORAGE_KEYS.ASSESSMENTS);
  },

  exportToCSV: () => {
    const leads = SovereignDB.getLeads();
    if (leads.length === 0) return null;

    const headers = ['ID', 'Timestamp', 'Name', 'Email', 'Organization', 'Message'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.timestamp).toISOString(),
      l.name,
      l.email,
      l.organization,
      l.message.replace(/,/g, ';')
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `TULC_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
