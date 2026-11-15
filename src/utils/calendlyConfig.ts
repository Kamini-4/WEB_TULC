// Calendly Configuration & Strict URL Allowlist Utility
const DEFAULT_CALENDLY_URL = 'https://calendly.com/suchita-sancheti/20min';
const STORAGE_KEY = 'tulc_calendly_url';

export function sanitizeCalendlyUrl(rawUrl: string): string | null {
  try {
    const trimmed = rawUrl.trim();
    if (!trimmed || trimmed.length > 300) return null;
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') return null;
    if (parsed.username || parsed.password) return null;
    const host = parsed.hostname.toLowerCase();
    if (host !== 'calendly.com' && !host.endsWith('.calendly.com')) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

export const getCalendlyUrl = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const safe = sanitizeCalendlyUrl(saved);
      if (safe) return safe;
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  return DEFAULT_CALENDLY_URL;
};

export const setCalendlyUrl = (url: string): boolean => {
  if (typeof window === 'undefined') return false;
  const trimmed = (url || '').trim();
  if (!trimmed) {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  }
  const safe = sanitizeCalendlyUrl(trimmed);
  if (!safe) {
    return false;
  }
  localStorage.setItem(STORAGE_KEY, safe);
  return true;
};
