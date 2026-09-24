export interface ApiRequestOptions extends RequestInit {
  timeoutMs?: number;
  retries?: number;
  retryDelayMs?: number;
}

export class ApiError extends Error {
  public status?: number;
  public data?: any;

  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Robust API Client with built-in:
 * - Configurable request timeout
 * - Automatic exponential backoff retries for transient 5xx/network errors
 * - Error sanitization
 * - Silent error telemetry
 */
export async function apiRequest<T = any>(
  url: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const {
    timeoutMs = 15000,
    retries = 2,
    retryDelayMs = 500,
    headers = {},
    ...fetchOpts
  } = options;

  let lastError: any = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    try {
      const response = await fetch(url, {
        ...fetchOpts,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type');
      let data: any = null;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const errorMsg = data?.error || data?.message || `Request failed with status ${response.status}`;
        // If it's a 5xx server error and we have retries left, retry
        if (response.status >= 500 && attempt < retries) {
          lastError = new ApiError(errorMsg, response.status, data);
          await new Promise((r) => setTimeout(r, retryDelayMs * Math.pow(2, attempt)));
          continue;
        }
        throw new ApiError(errorMsg, response.status, data);
      }

      return data as T;
    } catch (err: any) {
      clearTimeout(timeoutId);

      if (err.name === 'AbortError') {
        const timeoutMsg = `Strategic gateway timed out after ${Math.round(timeoutMs / 1000)}s. Please check connection.`;
        lastError = new ApiError(timeoutMsg, 408);
      } else if (err instanceof ApiError) {
        lastError = err;
      } else {
        lastError = new ApiError(err.message || 'Network request failed', 0);
      }

      // Retry on network errors or timeouts if attempts remain
      if (attempt < retries && (err.name === 'AbortError' || !err.status || err.status >= 500)) {
        await new Promise((r) => setTimeout(r, retryDelayMs * Math.pow(2, attempt)));
        continue;
      }

      break;
    }
  }

  // Report error to client-errors telemetry silently without breaking UI
  reportClientError(lastError, url, fetchOpts.method || 'GET');

  throw lastError;
}

export function reportClientError(error: Error | any, route?: string, method?: string) {
  try {
    if (typeof window === 'undefined') return;
    const payload = {
      message: error?.message || String(error),
      stack: error?.stack,
      route: route || window.location.pathname,
      method: method || 'CLIENT',
      userAgent: navigator.userAgent,
      metadata: {
        status: error?.status,
        timestamp: Date.now(),
      }
    };

    fetch('/api/system/client-errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Ignore background telemetry failure
    });
  } catch {
    // Suppress telemetry crash
  }
}
