'use client';

import React, { useState, useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import { useNotificationSettings } from '../hooks/useNotificationSettings';
import { useNotificationAudio } from '../hooks/useNotificationAudio';
import { NotificationToast } from './notifications/NotificationToast';
import { NotificationBanner } from './notifications/NotificationBanner';
import { NotificationModal } from './notifications/NotificationModal';
import { NotificationSlideIn } from './notifications/NotificationSlideIn';
import { ConfettiRenderer } from './notifications/ConfettiRenderer';
import { CoinAnimationRenderer } from './notifications/CoinAnimationRenderer';
import { Tip } from './notifications/types';

interface NotificationItemState {
  id: string;
  tip: Tip;
  type: 'toast' | 'modal' | 'banner' | 'slide-in';
  duration: number;
}

interface NotificationManagerProps {
  creatorId?: string;
}

/**
 * NotificationManager - Orchestrates all notifications
 *
 * Responsibilities:
 * - Listens for incoming tips from WebSocket
 * - Applies user preferences (type, content, audio, tiers)
 * - Manages notification queue/stacking
 * - Triggers animations and sounds
 * - Handles dismissals
 *
 * Usage: Place once on creator profile page
 */
export const NotificationManager: React.FC<NotificationManagerProps> = ({ creatorId }) => {
  const [notifications, setNotifications] = useState<NotificationItemState[]>([]);
  const { preferences, getDurationForAmount } = useNotificationSettings(creatorId);
  const { play } = useNotificationAudio(creatorId);

  /**
   * Show a new notification
   * Called when a tip arrives (from WebSocket or direct trigger)
   */
  const handleShowNotification = useCallback(
    (tip: Tip) => {
      if (!preferences.enabled || preferences.types.length === 0) return;

      // Get duration based on tip amount
      const duration = getDurationForAmount(tip.amount);

      // Handle stacking mode
      if (preferences.stackingMode === 'replace') {
        // Clear all existing notifications
        setNotifications([]);
      } else if (preferences.stackingMode === 'queue') {
        // Will show when previous ones are dismissed (handled below)
      }

      // Don't exceed max on screen
      setNotifications((prev) => {
        const filtered = prev.slice(0, preferences.maxOnScreen - 1);

        // Pick a random notification type from enabled types
        const randomType = preferences.types[Math.floor(Math.random() * preferences.types.length)];

        return [
          ...filtered,
          {
            id: tip.id,
            tip,
            type: randomType,
            duration,
          },
        ];
      });

      // Play audio
      play();
    },
    [preferences, getDurationForAmount, play]
  );

  /**
   * Handle notification dismissal
   */
  const handleDismiss = useCallback((notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  }, []);

  // Show animations based on content style
  const shouldShowConfetti = preferences.contentStyle === 'confetti' || preferences.contentStyle === 'all';
  const shouldShowCoins = preferences.contentStyle === 'coin' || preferences.contentStyle === 'all';

  return (
    <Box>
      {/* Animations layer (behind notifications) */}
      {notifications.length > 0 && shouldShowConfetti && <ConfettiRenderer />}
      {notifications.length > 0 && shouldShowCoins && notifications[0] && (
        <CoinAnimationRenderer amount={notifications[0].tip.amount} />
      )}

      {/* Notifications layer */}
      {notifications.map((notification) => {
        const { id, tip, type, duration } = notification;

        switch (type) {
          case 'toast':
            return (
              <NotificationToast key={id} tip={tip} duration={duration} onDismiss={() => handleDismiss(id)} />
            );

          case 'banner':
            return (
              <NotificationBanner key={id} tip={tip} duration={duration} onDismiss={() => handleDismiss(id)} />
            );

          case 'modal':
            return <NotificationModal key={id} tip={tip} duration={duration} onDismiss={() => handleDismiss(id)} />;

          case 'slide-in':
            return (
              <NotificationSlideIn key={id} tip={tip} duration={duration} onDismiss={() => handleDismiss(id)} />
            );

          default:
            return null;
        }
      })}

      {/* Export showNotification for external use (WebSocket events, etc) */}
      {/* This will be exposed via useNotificationManager hook */}
    </Box>
  );
};

/**
 * Hook to get notification manager instance
 * Used to trigger notifications from WebSocket events
 */
let notificationManagerInstance: ((tip: Tip) => void) | null = null;

export function setNotificationManager(fn: (tip: Tip) => void) {
  notificationManagerInstance = fn;
}

export function showNotificationFromWebSocket(tip: Tip) {
  if (notificationManagerInstance) {
    notificationManagerInstance(tip);
  }
}

export default NotificationManager;
