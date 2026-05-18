export type TipCardStyle = "sticky-note" | "clean" | "minimal";

export interface StoredCreator {
  username: string;
  displayName: string;
  bio: string;
  walletAddress: string;
  accentColor?: string;
  tipCardStyle?: TipCardStyle;
}

const STORAGE_KEY = "pufftip_creator";

export function getStoredCreator(): StoredCreator | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredCreator;
  } catch {
    return null;
  }
}

export function setStoredCreator(creator: StoredCreator) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(creator));
}

export function clearStoredCreator() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
