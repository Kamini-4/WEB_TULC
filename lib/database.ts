
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
  type: 'waitlist';
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

// Test connection
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. ");
    }
  }
}
testConnection();

export const SovereignDB = {
  saveLead: async (data: Omit<LeadEntry, 'id' | 'timestamp' | 'type'>) => {
    const path = 'leads';
    try {
      const docRef = await addDoc(collection(db, path), {
        ...data,
        timestamp: serverTimestamp(),
        type: 'waitlist'
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
      const leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LeadEntry));
      callback(leads);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  },

  subscribeToAssessments: (callback: (assessments: AssessmentEntry[]) => void) => {
    const path = 'assessments';
    const q = query(collection(db, path), orderBy('timestamp', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const assessments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AssessmentEntry));
      callback(assessments);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  },

  subscribeToBlog: (callback: (posts: BlogEntry[]) => void) => {
    const path = 'blog';
    const q = query(collection(db, path), orderBy('timestamp', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogEntry));
      callback(posts);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  },

  exportToCSV: async () => {
    const path = 'leads';
    try {
      const snapshot = await getDocs(collection(db, path));
      const leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LeadEntry));
      
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
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  }
};
