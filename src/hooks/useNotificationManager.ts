import { useCallback } from 'react';
import { Tip } from '../components/notifications/types';
import { showNotificationFromWebSocket } from '../components/NotificationManager';

/**
 * useNotificationManager - Simple hook to trigger notifications
 *
 * Usage:
 * const { showNotification } = useNotificationManager(creatorId);
 *
 * // Trigger notification
 * showNotification({
 *   id: '123',
 *   donorName: 'John',
 *   amount: 5.5,
 *   message: 'Love your content!',
 *   timestamp: new Date(),
 * });
 */
export function useNotificationManager(creatorId?: string) {
  const showNotification = useCallback(
    (tip: Tip) => {
      showNotificationFromWebSocket(tip);
    },
    []
  );

  return {
    showNotification,
  };
}

export type { Tip };
