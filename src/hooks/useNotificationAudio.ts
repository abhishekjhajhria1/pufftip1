import { useState, useCallback, useEffect } from 'react';

/**
 * Available built-in notification sounds
 */
export const BUILT_IN_SOUNDS = {
  coin: { name: 'Coin Sound', url: '/sounds/coin-drop.mp3', description: 'Bright coin drop' },
  bell: { name: 'Bell Chime', url: '/sounds/bell-chime.mp3', description: 'Classic notification bell' },
  celebration: {
    name: 'Celebration',
    url: '/sounds/celebration.mp3',
    description: 'Festive celebration sound',
  },
  ping: { name: 'Ping', url: '/sounds/ping.mp3', description: 'Simple minimalist ping' },
};

export type SoundType = keyof typeof BUILT_IN_SOUNDS | 'custom' | 'none';

/**
 * useNotificationAudio - Manage notification audio playback
 *
 * Features:
 * - Multiple built-in sounds
 * - Custom sound upload
 * - Volume control (0-100)
 * - Mute/unmute
 * - Remembers preferences in localStorage
 * - Graceful error handling
 *
 * @param creatorId - The creator's ID (for storage)
 * @returns { play, setSound, setVolume, isMuted, setIsMuted, soundType, volume }
 */
export function useNotificationAudio(creatorId?: string) {
  const [soundType, setSoundType] = useState<SoundType>('coin');
  const [customSoundUrl, setCustomSoundUrl] = useState<string | null>(null);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const STORAGE_KEY = `pufftip_audio_${creatorId || 'default'}`;

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { soundType: st, customSoundUrl: csu, volume: vol, isMuted: muted } = JSON.parse(stored);
        if (st) setSoundType(st);
        if (csu) setCustomSoundUrl(csu);
        if (vol !== undefined) setVolume(vol);
        if (muted !== undefined) setIsMuted(muted);
      }
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to load audio preferences:', err);
      setIsLoading(false);
    }
  }, [STORAGE_KEY]);

  /**
   * Save preferences to localStorage
   */
  const savePreferences = useCallback(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          soundType,
          customSoundUrl,
          volume,
          isMuted,
        })
      );
    } catch (err) {
      console.error('Failed to save audio preferences:', err);
    }
  }, [STORAGE_KEY, soundType, customSoundUrl, volume, isMuted]);

  // Save preferences whenever they change
  useEffect(() => {
    if (!isLoading) {
      savePreferences();
    }
  }, [soundType, customSoundUrl, volume, isMuted, isLoading, savePreferences]);

  /**
   * Get the actual audio URL for the current sound
   */
  const getAudioUrl = useCallback((): string | null => {
    if (soundType === 'none' || isMuted) return null;
    if (soundType === 'custom' && customSoundUrl) return customSoundUrl;
    if (soundType === 'coin' || soundType === 'bell' || soundType === 'celebration' || soundType === 'ping') {
      return BUILT_IN_SOUNDS[soundType]?.url || null;
    }
    return null;
  }, [soundType, customSoundUrl, isMuted]);

  /**
   * Play the notification sound
   */
  const play = useCallback(async () => {
    try {
      const url = getAudioUrl();
      if (!url) return; // Muted or no sound selected

      const audio = new Audio(url);
      audio.volume = volume / 100; // Convert 0-100 to 0-1

      // Try to play, handle errors gracefully
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Failed to play notification sound:', err);
          // Silently fail - don't break the notification
        });
      }
    } catch (err) {
      console.error('Error playing audio:', err);
    }
  }, [getAudioUrl, volume]);

  /**
   * Change the sound type
   */
  const changeSoundType = useCallback((newType: SoundType) => {
    setSoundType(newType);
  }, []);

  /**
   * Set custom sound from file
   */
  const setCustomSound = useCallback((url: string) => {
    setCustomSoundUrl(url);
    setSoundType('custom');
  }, []);

  /**
   * Change volume
   */
  const changeVolume = useCallback((newVolume: number) => {
    setVolume(Math.max(0, Math.min(100, newVolume))); // Clamp 0-100
  }, []);

  /**
   * Toggle mute
   */
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  /**
   * Get human-readable name of current sound
   */
  const getCurrentSoundName = useCallback((): string => {
    if (soundType === 'custom') return customSoundUrl ? 'Custom Sound' : 'No custom sound set';
    if (soundType === 'none') return 'Disabled';
    return BUILT_IN_SOUNDS[soundType]?.name || 'Unknown';
  }, [soundType, customSoundUrl]);

  return {
    play,
    soundType,
    changeSoundType,
    customSoundUrl,
    setCustomSound,
    volume,
    changeVolume,
    isMuted,
    toggleMute,
    getCurrentSoundName,
    isLoading,
  };
}
