/**
 * WebSocket Hook for Real-Time Tip Notifications
 * 
 * Custom React hook that manages WebSocket connection to the real-time server.
 * Automatically connects/disconnects based on mount/unmount lifecycle.
 * 
 * Usage:
 * const { isConnected, latestTip } = useWebSocketTips("creator_username");
 * 
 * Features:
 * - Auto-reconnect on connection loss
 * - Cleanup on unmount
 * - Type-safe tip data
 * - Error handling
 */

import { useEffect, useState, useCallback, useRef } from "react";

export interface TipNotification {
  id: string;
  donorName: string;
  amount: string;
  message?: string;
  timestamp: string;
}

interface UseWebSocketTipsReturn {
  isConnected: boolean;
  latestTip: TipNotification | null;
  error: string | null;
  tips: TipNotification[];
}

/**
 * Hook to connect to WebSocket server and receive real-time tip notifications
 * @param creatorUsername - The username to subscribe to tips for
 * @returns Connection status, latest tip, error state, and all tips received
 */
export function useWebSocketTips(
  creatorUsername: string
): UseWebSocketTipsReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [latestTip, setLatestTip] = useState<TipNotification | null>(null);
  const [tips, setTips] = useState<TipNotification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    try {
      // Determine WebSocket URL based on environment
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}`;

      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
        setError(null);
        reconnectAttempts.current = 0;

        // Subscribe to creator's tips
        ws.send(
          JSON.stringify({
            type: "subscribe",
            payload: {
              creatorId: creatorUsername,
            },
          })
        );
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // Handle different message types
          if (data.type === "tip") {
            const payload = data.data || data;
            const newTip: TipNotification = {
              id: payload.id,
              donorName: payload.donorName || "Anonymous",
              amount: payload.amount,
              message: payload.message,
              timestamp: new Date().toISOString(),
            };

            setLatestTip(newTip);
            setTips((prev) => [newTip, ...prev].slice(0, 50)); // Keep last 50 tips
          }
        } catch (err) {
          console.error("Failed to parse WebSocket message:", err);
        }
      };

      ws.onerror = (event) => {
        console.error("WebSocket error:", event);
        setError("Connection error occurred");
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);

        // Auto-reconnect with exponential backoff
        if (reconnectAttempts.current < maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 10000);
          reconnectAttempts.current += 1;
          console.log(`Reconnecting in ${delay}ms...`);
          setTimeout(() => connect(), delay);
        } else {
          setError("Failed to maintain connection");
        }
      };

      wsRef.current = ws;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Connection failed";
      setError(errorMsg);
      console.error("WebSocket connection error:", err);
    }
  }, [creatorUsername]);

  // Connect on mount, cleanup on unmount
  useEffect(() => {
    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return {
    isConnected,
    latestTip,
    error,
    tips,
  };
}
