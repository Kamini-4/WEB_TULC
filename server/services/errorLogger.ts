export interface SystemErrorLog {
  id: string;
  timestamp: number;
  source: 'server' | 'client';
  severity: 'error' | 'warning' | 'fatal';
  message: string;
  stack?: string;
  route?: string;
  method?: string;
  statusCode?: number;
  ip?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

// In-memory circular buffer of recent errors (max 100)
const MAX_IN_MEMORY_LOGS = 100;
const errorLogBuffer: SystemErrorLog[] = [];

export const errorLogger = {
  log: (error: {
    source?: 'server' | 'client';
    severity?: 'error' | 'warning' | 'fatal';
    message: string;
    stack?: string;
    route?: string;
    method?: string;
    statusCode?: number;
    ip?: string;
    userAgent?: string;
    metadata?: Record<string, unknown>;
  }): SystemErrorLog => {
    const entry: SystemErrorLog = {
      id: `err_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      source: error.source || 'server',
      severity: error.severity || 'error',
      message: error.message || 'Unknown error occurred',
      stack: error.stack,
      route: error.route,
      method: error.method,
      statusCode: error.statusCode,
      ip: error.ip ? error.ip.replace(/:\d+$/, '') : undefined,
      userAgent: error.userAgent,
      metadata: error.metadata
    };

    // Prepend to circular buffer
    errorLogBuffer.unshift(entry);
    if (errorLogBuffer.length > MAX_IN_MEMORY_LOGS) {
      errorLogBuffer.pop();
    }

    console.error(`[SYSTEM_ERROR] [${entry.source.toUpperCase()}] [${entry.severity.toUpperCase()}] ${entry.route ? `${entry.method || 'GET'} ${entry.route} - ` : ''}${entry.message}`);
    if (entry.stack && entry.severity === 'fatal') {
      console.error(entry.stack);
    }

    return entry;
  },

  getRecentErrors: (limit = 50, filter?: { source?: 'server' | 'client'; severity?: string }): SystemErrorLog[] => {
    let filtered = [...errorLogBuffer];
    if (filter?.source) {
      filtered = filtered.filter(l => l.source === filter.source);
    }
    if (filter?.severity) {
      filtered = filtered.filter(l => l.severity === filter.severity);
    }
    return filtered.slice(0, limit);
  },

  clearErrors: () => {
    errorLogBuffer.length = 0;
    return { success: true, message: 'In-memory error buffer cleared' };
  },

  getErrorStats: () => {
    const now = Date.now();
    const oneHourAgo = now - 3600000;
    const pastHourErrors = errorLogBuffer.filter(e => e.timestamp >= oneHourAgo);
    
    return {
      totalLogged: errorLogBuffer.length,
      pastHourCount: pastHourErrors.length,
      serverCount: errorLogBuffer.filter(e => e.source === 'server').length,
      clientCount: errorLogBuffer.filter(e => e.source === 'client').length,
      fatalCount: errorLogBuffer.filter(e => e.severity === 'fatal').length,
      lastErrorTimestamp: errorLogBuffer.length > 0 ? errorLogBuffer[0].timestamp : null
    };
  }
};
