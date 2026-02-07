export const PUFFTIP_ABI = [
    {
        "type": "constructor",
        "inputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "PLATFORM_FEE_BPS",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "profileUpdateFee",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "profiles",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "metadataURI",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "exists",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setProfileUpdateFee",
        "inputs": [
            {
                "name": "_newFee",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "tip",
        "inputs": [
            {
                "name": "_recipient",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_message",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "updateProfile",
        "inputs": [
            {
                "name": "_metadataURI",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "withdrawFees",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "FeesWithdrawn",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "name": "previousOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ProfileUpdateFeeChanged",
        "inputs": [
            {
                "name": "newFee",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ProfileUpdated",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newMetadataURI",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TipSent",
        "inputs": [
            {
                "name": "tipper",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "recipient",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "message",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "OwnableInvalidOwner",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "OwnableUnauthorizedAccount",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ReentrancyGuardReentrantCall",
        "inputs": []
    }
] as const;
