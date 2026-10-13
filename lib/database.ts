
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot,
  getDocFromServer,
  serverTimestamp,
  limit,
  where
} from 'firebase/firestore';
import { db, auth } from '../src/firebase';
import { reportClientError } from '../src/lib/apiClient';

// In-memory query cache for read-heavy operations
const queryCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 30000; // 30 seconds TTL

function getFromCache<T>(key: string): T | null {
  const item = queryCache.get(key);
  if (!item) return null;
  if (Date.now() - item.timestamp > CACHE_TTL_MS) {
    queryCache.delete(key);
    return null;
  }
  return item.data as T;
}

function setToCache<T>(key: string, data: T): void {
  queryCache.set(key, { data, timestamp: Date.now() });
}

export interface LeadEntry {
  id: string;
  timestamp: number;
  name: string;
  email: string;
  organization: string;
  role?: string;
  message: string;
  type: 'intake';
}

export interface AssessmentEntry {
  id: string;
  userId: string;
  name: string;
  email: string;
  organization: string;
  context: 'dynamic' | 'established' | 'generational';
  answers: Record<number, number>;
  totalScore: number;
  percentage: number;
  timestamp: number;
  type: 'assessment';
  paid?: boolean;
  domainScores?: { domain: string; score: number }[];
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

export interface EmailLogEntry {
  id: string;
  timestamp: number;
  type: 'contact_admin' | 'contact_user' | 'newsletter_broadcast' | 'passkey_dispatch';
  recipient: string;
  sender: string;
  subject: string;
  status: 'sent' | 'failed';
  error: string | null;
  resendId: string | null;
  metadata?: Record<string, any>;
}

export type PortalTierType = 'BETA' | 'TIER_1_DIAGNOSTIC' | 'TIER_2_SPRINT' | 'TIER_3_SOVEREIGN_RETAINER' | 'CUSTOM';

export interface PortalLicenseEntry {
  id: string;
  key: string;
  organization: string;
  contactEmail: string;
  tier: PortalTierType;
  validityDays: number;
  createdAt: number;
  expiresAt: number;
  status: 'active' | 'revoked' | 'expired';
  accessCount: number;
  lastAccessedAt: number | null;
  issuedBy?: string;
  notes?: string;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  const errorMessage = JSON.stringify(errInfo);
  console.error('Firestore Error: ', errorMessage);
  
  // For read operations (LIST, GET), we log the error but don't throw to avoid crashing the UI
  if (operationType === OperationType.LIST || operationType === OperationType.GET) {
    return;
  }
  
  throw new Error(errorMessage);
}

export const SovereignDB = {
  saveLead: async (data: Omit<LeadEntry, 'id' | 'timestamp' | 'type'>) => {
    const path = 'leads';
    try {
      const docRef = await addDoc(collection(db, path), {
        ...data,
        timestamp: serverTimestamp(),
        type: 'intake'
      });
      return { id: docRef.id, ...data };
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  saveAssessment: async (data: Omit<AssessmentEntry, 'id' | 'timestamp' | 'type'>) => {
    const path = 'assessments';
    try {
      const docRef = await addDoc(collection(db, path), {
        ...data,
        timestamp: serverTimestamp(),
        type: 'assessment',
        paid: false
      });
      return { id: docRef.id, ...data };
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  updateAssessmentPayment: async (id: string) => {
    const path = 'assessments';
    try {
      const { updateDoc, doc } = await import('firebase/firestore');
      await updateDoc(doc(db, path, id), {
        paid: true
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  saveBlogPost: async (data: Omit<BlogEntry, 'id' | 'timestamp'>) => {
    const path = 'blog';
    try {
      const docRef = await addDoc(collection(db, path), {
        ...data,
        timestamp: Date.now()
      });
      return { id: docRef.id, ...data };
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  deleteBlogPost: async (id: string) => {
    const path = `blog/${id}`;
    try {
      await deleteDoc(doc(db, 'blog', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  subscribeToLeads: (callback: (leads: LeadEntry[]) => void) => {
    const path = 'leads';
    if (!auth.currentUser) return () => {};
    const q = query(collection(db, path), orderBy('timestamp', 'desc'), limit(50));
    return onSnapshot(q, (snapshot) => {
      const leads = snapshot.docs.map(doc => {
        const data = doc.data();
        // Convert Firestore Timestamp to number for consistent UI handling
        const timestamp = data.timestamp?.toMillis ? data.timestamp.toMillis() : data.timestamp;
        return { ...data, id: doc.id, timestamp } as LeadEntry;
      });
      callback(leads);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  },

  subscribeToAssessments: (callback: (assessments: AssessmentEntry[]) => void) => {
    const path = 'assessments';
    if (!auth.currentUser) return () => {};
    const q = query(collection(db, path), orderBy('timestamp', 'desc'), limit(50));
    return onSnapshot(q, (snapshot) => {
      const assessments = snapshot.docs.map(doc => {
        const data = doc.data();
        const timestamp = data.timestamp?.toMillis ? data.timestamp.toMillis() : data.timestamp;
        return { ...data, id: doc.id, timestamp } as AssessmentEntry;
      });
      callback(assessments);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  },

  subscribeToBlog: (callback: (posts: BlogEntry[]) => void) => {
    const path = 'blog';
    const cacheKey = 'blog_posts_cached';
    const cached = getFromCache<BlogEntry[]>(cacheKey);
    if (cached) {
      callback(cached);
    }
    const q = query(collection(db, path), orderBy('timestamp', 'desc'), limit(30));
    return onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => {
        const data = doc.data();
        const timestamp = data.timestamp?.toMillis ? data.timestamp.toMillis() : data.timestamp;
        return { ...data, id: doc.id, timestamp } as BlogEntry;
      });
      setToCache(cacheKey, posts);
      callback(posts);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  },

  exportToCSV: async () => {
    const path = 'leads';
    try {
      const snapshot = await getDocs(collection(db, path));
      const leads = snapshot.docs.map(doc => {
        const data = doc.data();
        const timestamp = data.timestamp?.toMillis ? data.timestamp.toMillis() : data.timestamp;
        return { ...data, id: doc.id, timestamp } as LeadEntry;
      });
      
      if (leads.length === 0) return null;

      const headers = ['ID', 'Timestamp', 'Name', 'Email', 'Organization', 'Message'];
      const rows = leads.map(l => [
        l.id,
        l.timestamp ? new Date(l.timestamp).toISOString() : 'N/A',
        l.name,
        l.email,
        l.organization,
        l.message ? l.message.replace(/,/g, ';') : ''
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
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },

  saveEmailLog: async (data: Omit<EmailLogEntry, 'id' | 'timestamp'>) => {
    const path = 'email_logs';
    try {
      const docRef = await addDoc(collection(db, path), {
        ...data,
        timestamp: serverTimestamp()
      });
      return { id: docRef.id, ...data };
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  subscribeToEmailLogs: (callback: (logs: EmailLogEntry[]) => void) => {
    const path = 'email_logs';
    if (!auth.currentUser) return () => {};
    const q = query(collection(db, path), orderBy('timestamp', 'desc'), limit(50));
    return onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map(doc => {
        const data = doc.data();
        const timestamp = data.timestamp?.toMillis ? data.timestamp.toMillis() : data.timestamp;
        return { ...data, id: doc.id, timestamp } as EmailLogEntry;
      });
      callback(logs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  },

  sendContactEmail: async (payload: any) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((fetchErr) => {
        console.warn('[CONTACT_EMAIL] API endpoint unreachable (running in decoupled/static hosting mode):', fetchErr);
        return null;
      });

      if (!response || !response.ok) {
        console.warn(`[CONTACT_EMAIL] Service endpoint status: ${response ? response.status : 'offline'}. Form data remains safely stored in institutional database.`);
        return { success: false, mode: 'database_only' };
      }

      const result = await response.json().catch(() => null);
      
      // Save logs of emails attempted
      if (result) {
        if (result.adminEmail) {
          await SovereignDB.saveEmailLog({
            type: 'contact_admin',
            recipient: result.adminEmail.recipient,
            sender: result.adminEmail.sender || 'suchita@theunboundedleadership.com',
            subject: result.adminEmail.subject,
            status: result.adminEmail.success ? 'sent' : 'failed',
            error: result.adminEmail.error || null,
            resendId: result.adminEmail.id || null,
            metadata: { name: payload.name || 'N/A', organization: payload.organization || 'N/A', type: payload.type }
          });
        }
        if (result.userEmail) {
          await SovereignDB.saveEmailLog({
            type: 'contact_user',
            recipient: result.userEmail.recipient,
            sender: result.userEmail.sender || 'suchita@theunboundedleadership.com',
            subject: result.userEmail.subject,
            status: result.userEmail.success ? 'sent' : 'failed',
            error: result.userEmail.error || null,
            resendId: result.userEmail.id || null,
            metadata: { name: payload.name || 'N/A', organization: payload.organization || 'N/A', type: payload.type }
          });
        }
      }
      return result || { success: true };
    } catch (error) {
      console.warn('sendContactEmail non-critical error:', error);
      // Log failure to send contact email without disrupting user experience
      try {
        await SovereignDB.saveEmailLog({
          type: 'contact_admin',
          recipient: payload.email || 'unknown',
          sender: 'suchita@theunboundedleadership.com',
          subject: `Form Submission: ${payload.type || 'Intake'}`,
          status: 'failed',
          error: error instanceof Error ? error.message : String(error),
          resendId: null,
          metadata: { name: payload.name || 'N/A', organization: payload.organization || 'N/A', type: payload.type }
        });
      } catch (logErr) {
        // Suppress logging error
      }
      return { success: false, error };
    }
  },

  // Portal License Management
  savePortalLicense: async (data: Omit<PortalLicenseEntry, 'id'>) => {
    const path = 'portal_licenses';
    try {
      const docRef = await addDoc(collection(db, path), {
        ...data,
      });
      return { id: docRef.id, ...data };
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  updatePortalLicenseStatus: async (id: string, status: 'active' | 'revoked' | 'expired') => {
    const path = 'portal_licenses';
    try {
      const { updateDoc, doc } = await import('firebase/firestore');
      await updateDoc(doc(db, path, id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  deletePortalLicense: async (id: string) => {
    const path = `portal_licenses/${id}`;
    try {
      await deleteDoc(doc(db, 'portal_licenses', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  subscribeToPortalLicenses: (callback: (licenses: PortalLicenseEntry[]) => void) => {
    const path = 'portal_licenses';
    if (!auth.currentUser) return () => {};
    const q = query(collection(db, path), orderBy('createdAt', 'desc'), limit(50));
    return onSnapshot(q, (snapshot) => {
      const licenses = snapshot.docs.map(doc => {
        const data = doc.data();
        return { ...data, id: doc.id } as PortalLicenseEntry;
      });
      callback(licenses);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  },

  verifyPortalKey: async (passkey: string) => {
    const trimmedKey = passkey.trim().toUpperCase();
    try {
      const response = await fetch('/api/portal/verify-passkey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: trimmedKey })
      });
      const resData = await response.json();

      // If verified directly as valid (e.g. Master Clearance)
      if (resData.valid) {
        return resData;
      }

      // If rejected with an explicit error (e.g., invalid format)
      if (resData.reason === 'invalid_format' || resData.reason === 'missing_key') {
        return resData;
      }

      // If requires institutional database verification
      if (resData.requiresDbLookup || !response.ok) {
        return await SovereignDB.verifyLicenseInDatabase(trimmedKey);
      }

      return resData;
    } catch (err: any) {
      console.warn('Server passkey verification unreachable, falling back to database check:', err);
      return await SovereignDB.verifyLicenseInDatabase(trimmedKey);
    }
  },

  verifyLicenseInDatabase: async (trimmedKey: string) => {
    try {
      const { getDocs, query, collection, where, updateDoc, doc, increment } = await import('firebase/firestore');
      const q = query(collection(db, 'portal_licenses'), where('key', '==', trimmedKey));
      const snap = await getDocs(q);

      if (snap.empty) {
        return { valid: false, reason: 'invalid', error: 'Unrecognized institutional access key.' };
      }

      const docItem = snap.docs[0];
      const lic = docItem.data() as PortalLicenseEntry;
      const now = Date.now();

      if (lic.status === 'revoked') {
        return { valid: false, reason: 'revoked', error: 'This institutional key has been revoked by administration.' };
      }

      if (now > lic.expiresAt || lic.status === 'expired') {
        return { 
          valid: false, 
          reason: 'expired', 
          organization: lic.organization, 
          expiresAt: lic.expiresAt,
          error: `Your institutional access window for ${lic.organization} expired on ${new Date(lic.expiresAt).toLocaleDateString()}.` 
        };
      }

      // Increment access count
      try {
        await updateDoc(doc(db, 'portal_licenses', docItem.id), {
          accessCount: increment(1),
          lastAccessedAt: now
        });
      } catch (incrementErr) {
        console.warn("Failed to increment license access count:", incrementErr);
      }

      return {
        valid: true,
        organization: lic.organization,
        tier: lic.tier,
        expiresAt: lic.expiresAt,
        targetUrl: "https://sovereign-audit-the-institutional-stress-test-942902734370.us-west1.run.app"
      };
    } catch (clientErr) {
      console.error("Client license verification check failed:", clientErr);
      return { valid: false, reason: 'error', error: 'Unable to complete verification check. Please check permissions.' };
    }
  },

  // ====================================================
  // DUPLICATE PREVENTION & RESILIENT SUBSCRIPTION
  // ====================================================
  checkExistingSubscription: async (email: string): Promise<boolean> => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const localSubs = localStorage.getItem('tulc_subscribers_cache');
      if (localSubs) {
        const parsed: string[] = JSON.parse(localSubs);
        if (parsed.includes(normalizedEmail)) {
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  },

  subscribeNewsletter: async (email: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    // Call server API endpoint with atomic deduplication & timeout handling
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail })
      });

      if (response.ok) {
        const data = await response.json();
        // Update client-side cache
        try {
          const localSubs = localStorage.getItem('tulc_subscribers_cache');
          const list: string[] = localSubs ? JSON.parse(localSubs) : [];
          if (!list.includes(normalizedEmail)) {
            list.push(normalizedEmail);
            localStorage.setItem('tulc_subscribers_cache', JSON.stringify(list));
          }
        } catch {
          // Ignore localStorage quotas
        }
        return data;
      }
    } catch (netErr) {
      console.warn('[NEWSLETTER] API endpoint unreachable, committing subscription directly to database:', netErr);
    }

    // Direct database persistence fallback (100% reliable on static/Hostinger hosting)
    try {
      await SovereignDB.saveLead({
        name: 'Newsletter Subscriber',
        email: normalizedEmail,
        organization: 'The Unbounded Leadership Co',
        role: 'Subscriber',
        message: 'Subscribed to Strategic Dispatch / Newsletter'
      });

      try {
        const localSubs = localStorage.getItem('tulc_subscribers_cache');
        const list: string[] = localSubs ? JSON.parse(localSubs) : [];
        if (!list.includes(normalizedEmail)) {
          list.push(normalizedEmail);
          localStorage.setItem('tulc_subscribers_cache', JSON.stringify(list));
        }
      } catch {
        // Ignore localStorage quotas
      }

      return { success: true, message: 'Subscription confirmed successfully.' };
    } catch (dbErr) {
      console.error('Subscription error:', dbErr);
      throw new Error('Failed to complete subscription request.');
    }
  },

  // ====================================================
  // PAGINATED ENTITY QUERIES
  // ====================================================
  fetchPaginatedLeads: async (pageSize = 10, page = 1): Promise<{ items: LeadEntry[]; total: number }> => {
    const path = 'leads';
    const cacheKey = `paginated_leads_${page}_${pageSize}`;
    const cached = getFromCache<{ items: LeadEntry[]; total: number }>(cacheKey);
    if (cached) return cached;

    try {
      const snapshot = await getDocs(query(collection(db, path), orderBy('timestamp', 'desc'), limit(100)));
      const all = snapshot.docs.map(d => {
        const data = d.data();
        const timestamp = data.timestamp?.toMillis ? data.timestamp.toMillis() : data.timestamp;
        return { ...data, id: d.id, timestamp } as LeadEntry;
      });

      const startIndex = (page - 1) * pageSize;
      const items = all.slice(startIndex, startIndex + pageSize);
      const result = { items, total: all.length };
      setToCache(cacheKey, result);
      return result;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return { items: [], total: 0 };
    }
  },

  fetchPaginatedAssessments: async (pageSize = 10, page = 1): Promise<{ items: AssessmentEntry[]; total: number }> => {
    const path = 'assessments';
    const cacheKey = `paginated_assessments_${page}_${pageSize}`;
    const cached = getFromCache<{ items: AssessmentEntry[]; total: number }>(cacheKey);
    if (cached) return cached;

    try {
      const snapshot = await getDocs(query(collection(db, path), orderBy('timestamp', 'desc'), limit(100)));
      const all = snapshot.docs.map(d => {
        const data = d.data();
        const timestamp = data.timestamp?.toMillis ? data.timestamp.toMillis() : data.timestamp;
        return { ...data, id: d.id, timestamp } as AssessmentEntry;
      });

      const startIndex = (page - 1) * pageSize;
      const items = all.slice(startIndex, startIndex + pageSize);
      const result = { items, total: all.length };
      setToCache(cacheKey, result);
      return result;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return { items: [], total: 0 };
    }
  },

  fetchPaginatedEmailLogs: async (pageSize = 10, page = 1): Promise<{ items: EmailLogEntry[]; total: number }> => {
    const path = 'email_logs';
    const cacheKey = `paginated_email_logs_${page}_${pageSize}`;
    const cached = getFromCache<{ items: EmailLogEntry[]; total: number }>(cacheKey);
    if (cached) return cached;

    try {
      const snapshot = await getDocs(query(collection(db, path), orderBy('timestamp', 'desc'), limit(100)));
      const all = snapshot.docs.map(d => {
        const data = d.data();
        const timestamp = data.timestamp?.toMillis ? data.timestamp.toMillis() : data.timestamp;
        return { ...data, id: d.id, timestamp } as EmailLogEntry;
      });

      const startIndex = (page - 1) * pageSize;
      const items = all.slice(startIndex, startIndex + pageSize);
      const result = { items, total: all.length };
      setToCache(cacheKey, result);
      return result;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return { items: [], total: 0 };
    }
  },

  fetchPaginatedLicenses: async (pageSize = 10, page = 1): Promise<{ items: PortalLicenseEntry[]; total: number }> => {
    const path = 'portal_licenses';
    const cacheKey = `paginated_licenses_${page}_${pageSize}`;
    const cached = getFromCache<{ items: PortalLicenseEntry[]; total: number }>(cacheKey);
    if (cached) return cached;

    try {
      const snapshot = await getDocs(query(collection(db, path), orderBy('createdAt', 'desc'), limit(100)));
      const all = snapshot.docs.map(d => {
        const data = d.data();
        return { ...data, id: d.id } as PortalLicenseEntry;
      });

      const startIndex = (page - 1) * pageSize;
      const items = all.slice(startIndex, startIndex + pageSize);
      const result = { items, total: all.length };
      setToCache(cacheKey, result);
      return result;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return { items: [], total: 0 };
    }
  }
};
