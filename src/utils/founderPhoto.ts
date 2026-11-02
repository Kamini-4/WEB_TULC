// Institutional Executive Insignia & Founder Asset Configuration
// Locked: Public visitors cannot tamper with or upload arbitrary photos.

export const DEFAULT_FOUNDER_ASSET = '/assets/tulc-gold-navy-crest.jpg';

export const useFounderPhoto = (fallbackUrl: string = DEFAULT_FOUNDER_ASSET) => {
  return {
    photoUrl: fallbackUrl || DEFAULT_FOUNDER_ASSET,
    hasCustomPhoto: false,
    savePhoto: () => {},
    resetPhoto: () => {}
  };
};
