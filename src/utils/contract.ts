export const PUFFTIP_ADDRESSES: { [chainId: number]: `0x${string}` } = {
    11155111: "0xA95909e607bbE85c6fdF0920F311189f7347ffb6", // Sepolia
    31337: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Localhost (Hardhat)
    1337: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Localhost (Alternative)
};

export const getPuffTipAddress = (chainId?: number) => {
    // Default to Sepolia if no chainId provided or unknown
    if (!chainId) return PUFFTIP_ADDRESSES[11155111];
    return PUFFTIP_ADDRESSES[chainId] || PUFFTIP_ADDRESSES[11155111];
};

// Deprecated: kept for backward compatibility during refactor, defaults to Sepolia
export const PUFFTIP_ADDRESS = PUFFTIP_ADDRESSES[11155111];
