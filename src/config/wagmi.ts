import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    mainnet,
    sepolia,
    hardhat,
} from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'PuffTip',
    projectId: 'YOUR_PROJECT_ID', // TODO: Get a project ID from WalletConnect
    chains: [
        mainnet,
        sepolia,
        hardhat,
    ],
    ssr: true,
});
