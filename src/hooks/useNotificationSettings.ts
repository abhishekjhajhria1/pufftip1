import { useState, useEffect, useCallback } from 'react';

/**
 * Tier-based notification duration based on tip amount
 */
export interface NotificationTier {
  minAmount: number;
  durationMs: number;
}

/**
 * Complete notification preferences for a creator
 */
export interface NotificationPreferences {
  // Type: How the notification appears
  types: ('toast' | 'modal' | 'banner' | 'slide-in')[];

  // Content: What information is shown
  contentStyle: 'simple' | 'rich' | 'confetti' | 'coin' | 'all';

  // Audio settings
  audioEnabled: boolean;
  audioVolume: number; // 0-100
  customAudioUrl?: string;

  // Duration: How long notification stays visible
  autoDismissTiers: NotificationTier[];
  stackingMode: 'stack' | 'replace' | 'queue';
  maxOnScreen: number;

  // Overall control
  enabled: boolean;
}

/**
 * Default notification preferences
 */
const DEFAULT_PREFERENCES: NotificationPreferences = {
  types: ['toast'],
  contentStyle: 'rich',
  audioEnabled: true,
  audioVolume: 70,
  autoDismissTiers: [
    { minAmount: 50, durationMs: 15000 },
    { minAmount: 40, durationMs: 10000 },
    { minAmount: 30, durationMs: 8000 },
    { minAmount: 0, durationMs: 5000 },
  ],
  stackingMode: 'stack',
  maxOnScreen: 5,
  enabled: true,
};

/**
 * useNotificationSettings - Manage creator notification preferences
 *
 * Features:
 * - Loads from localStorage (instant)
 * - Falls back to defaults if nothing saved
 * - Handles errors gracefully
 *
 * @param creatorId - The creator's ID (for database sync)
 * @returns { preferences, updatePreferences, isLoading, error }
 */
export function useNotificationSettings(creatorId?: string) {
  const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const STORAGE_KEY = `pufftip_notifications_${creatorId || 'default'}`;

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to ensure all fields exist
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      }
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to load notification settings from localStorage:', err);
      setError('Failed to load settings');
      setIsLoading(false);
    }
  }, [STORAGE_KEY]);

  /**
   * Update preferences - saves to localStorage instantly
   */
  const updatePreferences = useCallback(
    (updates: Partial<NotificationPreferences>) => {
      try {
        const newPrefs = { ...preferences, ...updates };
        setPreferences(newPrefs);
        setError(null);

        // Save to localStorage immediately (instant)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));

      } catch (err) {
        console.error('Failed to update notification settings:', err);
        setError('Failed to save settings');
      }
    },
    [preferences, STORAGE_KEY]
  );

  /**
   * Get duration for a specific tip amount based on tiers
   */
  const getDurationForAmount = useCallback(
    (amount: number): number => {
      const tier = preferences.autoDismissTiers
        .sort((a, b) => b.minAmount - a.minAmount) // Sort descending
        .find((t) => amount >= t.minAmount);
      return tier?.durationMs || DEFAULT_PREFERENCES.autoDismissTiers[0].durationMs;
    },
    [preferences.autoDismissTiers]
  );

  /**
   * Reset to defaults
   */
  const resetToDefaults = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
    localStorage.removeItem(STORAGE_KEY);
  }, [STORAGE_KEY]);

  return {
    preferences,
    updatePreferences,
    getDurationForAmount,
    resetToDefaults,
    isLoading,
    error,
  };
}
