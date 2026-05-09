/**
 * Event Listener for PuffTip
 *
 * This module subscribes to on-chain events from the Solana program and syncs them to PostgreSQL.
 *
 * Theory:
 * - Solana emits events that can be subscribed to via program logs
 * - We use Solana web3.js to connect to the blockchain
 * - Parse events and store in PostgreSQL for fast queries
 * - This allows real-time sync of blockchain data to our database
 */

import { Connection, PublicKey, Logs } from "@solana/web3.js";
import pino from "pino";
import { prisma } from "@/lib/prisma";
import { broadcastTip } from "@/lib/websocketServer";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

// Program ID - replace with actual deployed program ID
const PROGRAM_ID = new PublicKey(process.env.PROGRAM_ID || "11111111111111111111111111111111");

interface CreatorInitializedEvent {
  creator: string;
  username: string;
  timestamp: number;
}

interface TipSentEvent {
  tipper: string;
  creator: string;
  amount: number;
  creator_amount: number;
  platform_fee: number;
  timestamp: number;
}

interface ParsedEventLog {
  [key: string]: unknown;
}

/**
 * Parse Anchor event logs
 * Anchor emits events as structured logs that we can parse
 */
function parseEventLog(log: string): ParsedEventLog | null {
  try {
    // Anchor events are logged in a specific format
    // Look for the event data in the log string
    if (log.includes("data:")) {
      const eventData = log.split("data:")[1];
      return JSON.parse(eventData);
    }
  } catch {
    logger.debug(`Could not parse log as event: ${log}`);
  }
  return null;
}

/**
 * Handle CreatorInitialized events
 */
async function handleCreatorInitialized(event: CreatorInitializedEvent) {
  logger.info({ event }, "CreatorInitialized event received");

  try {
    const user = await prisma.user.upsert({
      where: { walletAddress: event.creator },
      update: {
        displayName: event.username,
      },
      create: {
        username: event.username,
        walletAddress: event.creator,
        displayName: event.username,
        isPremium: false,
      },
    });

    logger.info({ userId: user.id, username: user.username }, "User created/updated");
  } catch (err) {
    const error = err as Error;
    logger.error({ error, event }, "Error handling CreatorInitialized");
  }
}

/**
 * Handle TipSent events
 */
async function handleTipSent(event: TipSentEvent) {
  logger.info({ event }, "TipSent event received");

  try {
    const recipient =
      (await prisma.user.findUnique({
        where: { walletAddress: event.creator },
      })) ||
      (await prisma.user.create({
        data: {
          username: event.creator.slice(0, 8),
          walletAddress: event.creator,
        },
      }));

    const tip = await prisma.tip.create({
      data: {
        donorWalletAddress: event.tipper,
        recipientId: recipient.id,
        amount: (event.amount / 1_000_000_000).toString(),
        message: "Tip via blockchain",
        transactionHash: `${event.timestamp}-${event.tipper}-${event.creator}`, // Placeholder
        platformFee: (event.platform_fee / 1_000_000_000).toString(),
        creatorAmount: (event.creator_amount / 1_000_000_000).toString(),
        confirmationStatus: "finalized",
      },
    });

    broadcastTip(recipient.username, {
      id: tip.id,
      donorName: tip.donorWalletAddress,
      amount: Number(tip.amount),
      message: tip.message,
      timestamp: tip.createdAt.toISOString(),
    });

    logger.info({ tipId: tip.id }, "Tip recorded");
  } catch (err) {
    const error = err as Error;
    logger.error({ error, event }, "Error handling TipSent");
  }
}

/**
 * Subscribe to program events
 */
export async function startEventListener() {
  const connection = new Connection(
    process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com",
    "confirmed"
  );

  logger.info({ programId: PROGRAM_ID.toString() }, "Starting event listener");

  // Subscribe to program logs
  const logsSubscriptionId = connection.onLogs(
    PROGRAM_ID,
    (logs: Logs) => {
      logger.debug({ logs: logs.logs }, "Received logs");

      // Parse each log for events
      logs.logs.forEach((log) => {
        if (log.includes("CreatorInitialized")) {
          const event = parseEventLog(log) as CreatorInitializedEvent | null;
          if (event) handleCreatorInitialized(event);
        } else if (log.includes("TipSent")) {
          const event = parseEventLog(log) as TipSentEvent | null;
          if (event) handleTipSent(event);
        }
      });
    },
    "confirmed"
  );

  logger.info({ subscription: logsSubscriptionId }, "Event listener started");

  return { connection, logsSubscriptionId };
}

/**
 * Graceful shutdown
 */
export async function stopEventListener(logsSubscription: number) {
  void logsSubscription;
  await prisma.$disconnect();
  logger.info("Event listener stopped");
}

// Run if executed directly
if (require.main === module) {
  startEventListener()
    .then(({ connection, logsSubscriptionId }) => {
      logger.info("Event listener running");
      process.on("SIGINT", async () => {
        logger.info("Shutting down...");
        await connection.removeOnLogsListener(logsSubscriptionId);
        await stopEventListener(logsSubscriptionId);
        process.exit(0);
      });
    })
    .catch((error) => {
      logger.error({ error }, "Failed to start event listener");
      process.exit(1);
    });
}
