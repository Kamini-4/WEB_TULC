import { useState, useEffect } from 'react';

const STORAGE_KEY = 'tulc_founder_photo_data';
const PHOTO_UPDATED_EVENT = 'tulc_founder_photo_updated';

export const getStoredFounderPhoto = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return null;
  }
};

export const saveFounderPhoto = (dataUrl: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, dataUrl);
    window.dispatchEvent(new Event(PHOTO_UPDATED_EVENT));
  } catch (e) {
    console.error('Failed to save founder photo to localStorage', e);
  }
};

export const resetFounderPhoto = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(PHOTO_UPDATED_EVENT));
  } catch (e) {
    console.error('Failed to clear founder photo', e);
  }
};

export const useFounderPhoto = (fallbackUrl: string = '/assets/suchita-portrait.svg') => {
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    return getStoredFounderPhoto() || fallbackUrl;
  });

  const [hasCustomPhoto, setHasCustomPhoto] = useState<boolean>(() => {
    return !!getStoredFounderPhoto();
  });

  useEffect(() => {
    const handleUpdate = () => {
      const stored = getStoredFounderPhoto();
      if (stored) {
        setPhotoUrl(stored);
        setHasCustomPhoto(true);
      } else {
        setPhotoUrl(fallbackUrl);
        setHasCustomPhoto(false);
      }
    };

    window.addEventListener(PHOTO_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    // Initial check in case it was stored in another component mount
    handleUpdate();

    return () => {
      window.removeEventListener(PHOTO_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [fallbackUrl]);

  return {
    photoUrl,
    hasCustomPhoto,
    savePhoto: saveFounderPhoto,
    resetPhoto: resetFounderPhoto
  };
};
