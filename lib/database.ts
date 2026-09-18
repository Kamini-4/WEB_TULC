
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
  serverTimestamp
} from 'firebase/firestore';
import { db, auth } from '../src/firebase.ts';

export interface LeadEntry {
  id: string;
  timestamp: number;
  name: string;
  email: string;
  organization: string;
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
    const q = query(collection(db, path), orderBy('timestamp', 'desc'));
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
    const q = query(collection(db, path), orderBy('timestamp', 'desc'));
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
    const q = query(collection(db, path), orderBy('timestamp', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => {
        const data = doc.data();
        const timestamp = data.timestamp?.toMillis ? data.timestamp.toMillis() : data.timestamp;
        return { ...data, id: doc.id, timestamp } as BlogEntry;
      });
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
    const q = query(collection(db, path), orderBy('timestamp', 'desc'));
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
      });
      const result = await response.json();
      
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
      return result;
    } catch (error) {
      console.error('sendContactEmail error:', error);
      // Log failure to send contact email
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
      throw error;
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
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
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
      return resData;
    } catch (err: any) {
      console.error('Server passkey verification failed, checking direct fallback:', err);
      // Client-side fallback query
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
        return { valid: false, reason: 'error', error: 'Unable to complete verification check. Please retry.' };
      }
    }
  }
};
