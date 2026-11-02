// Calendly Configuration & Storage Utility
const DEFAULT_CALENDLY_URL = 'https://calendly.com/suchita-sancheti/20min';
const STORAGE_KEY = 'tulc_calendly_url';

export const getCalendlyUrl = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved.trim().length > 0) {
      return saved.trim();
    }
  }
  return DEFAULT_CALENDLY_URL;
};

export const setCalendlyUrl = (url: string): void => {
  if (typeof window !== 'undefined') {
    if (url && url.trim().length > 0) {
      localStorage.setItem(STORAGE_KEY, url.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
};
