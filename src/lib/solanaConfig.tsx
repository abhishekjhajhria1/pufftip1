/**
 * Solana Wallet Configuration
 * 
 * This file sets up the wallet adapter configuration for supporting Solana wallets.
 * The @solana/wallet-adapter-react library provides a unified interface for wallet management.
 */

import { useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// CSS for wallet modal
import '@solana/wallet-adapter-react-ui/styles.css';

/**
 * SolanaConfigProvider: Wraps the app with wallet connection context
 */
export function SolanaConfigProvider({ children }: { children: React.ReactNode }) {
  // Get network from environment variable or default to devnet
  const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet') as
    | 'devnet'
    | 'testnet'
    | 'mainnet-beta';

  // Use custom RPC endpoint if provided, otherwise use Solana's public endpoint
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT || clusterApiUrl(network);

  // Initialize wallet adapters - empty for now, will auto-detect
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}

export { WalletMultiButton };
