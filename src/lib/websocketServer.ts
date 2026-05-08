/**
 * WebSocket Server for Real-Time Updates
 *
 * This server broadcasts tip events to connected clients (stream overlays)
 * so they can display real-time pop-up notifications.
 *
 * Theory:
 * - WebSocket creates persistent bidirectional connection
 * - Server can push events to clients without polling
 * - Perfect for stream overlays that need instant notifications
 * - Each stream overlay connects with their creator's public key
 * - Only receives tips sent to them
 */

import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import pino from "pino";

const logger = pino();

interface ClientMessage {
  type: string;
  payload?: Record<string, unknown>;
}

interface ConnectedClient {
  ws: WebSocket;
  creatorId: string;
  subscriptions: Set<string>;
}

// In-memory store of connected clients
const connectedClients = new Map<string, ConnectedClient>();

/**
 * Create WebSocket server
 */
export function createWebSocketServer(httpServer: http.Server): WebSocketServer {
  const wss = new WebSocketServer({ server: httpServer });

   wss.on("connection", (ws: WebSocket) => {
    const clientId = `${Date.now()}-${Math.random()}`;
    logger.info({ clientId }, "Client connected");

    ws.on("message", (message: string) => {
      try {
        const data = JSON.parse(message) as ClientMessage;

        if (data.type === "subscribe") {
          const creatorId = data.payload?.creatorId as string | undefined;

          if (!creatorId) {
            ws.send(JSON.stringify({ type: "error", message: "creatorId required" }));
            return;
          }

          // Store client subscription
          connectedClients.set(clientId, {
            ws,
            creatorId,
            subscriptions: new Set([creatorId]),
          });

          ws.send(
            JSON.stringify({
              type: "subscribed",
              creatorId,
              message: `Subscribed to tips for creator ${creatorId}`,
            })
          );

          logger.info({ clientId, creatorId }, "Client subscribed");
        }
      } catch (error) {
        logger.error({ error, clientId }, "Error handling message");
        ws.send(JSON.stringify({ type: "error", message: "Invalid message format" }));
      }
    });

    ws.on("close", () => {
      connectedClients.delete(clientId);
      logger.info({ clientId }, "Client disconnected");
    });

    ws.on("error", (error) => {
      logger.error({ error, clientId }, "WebSocket error");
    });
  });

  return wss;
}

/**
 * Broadcast a tip to connected clients
 * This would be called by the event listener when a TipSent event occurs
 */
export function broadcastTip(creatorId: string, tipData: Record<string, unknown>) {
  const message = JSON.stringify({
    type: "tip",
    creatorId,
    data: tipData,
    timestamp: new Date().toISOString(),
  });

  let broadcastCount = 0;

  connectedClients.forEach((client, clientId) => {
    if (client.subscriptions.has(creatorId) && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(message);
      broadcastCount++;
    }
  });

  if (broadcastCount > 0) {
    logger.info({ 
      creatorId,
      recipientCount: broadcastCount,
    }, "Tip broadcasted");
  }
}

/**
 * Get connected clients count
 */
export function getConnectedClientsCount(): number {
  return connectedClients.size;
}

/**
 * Graceful shutdown
 */
export function shutdownWebSocket(wss: WebSocketServer) {
  logger.info("Shutting down WebSocket server");

  connectedClients.forEach(({ ws }) => {
    ws.close(1000, "Server shutting down");
  });

  wss.close(() => {
    logger.info("WebSocket server shut down");
  });
}
