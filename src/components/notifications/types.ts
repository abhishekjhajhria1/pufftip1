/**
 * Notification type definitions
 * Shared across all notification components
 */

export interface Tip {
  id: string;
  donorName: string;
  amount: number; // in SOL
  message: string;
  timestamp: Date;
  avatar?: string; // URL to donor avatar
}

export interface NotificationRendererProps {
  tip: Tip;
  duration: number; // milliseconds
  onDismiss: () => void;
}

export type NotificationType = 'toast' | 'modal' | 'banner' | 'slide-in';
export type ContentStyle = 'simple' | 'rich' | 'confetti' | 'coin' | 'all';
