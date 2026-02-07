// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title PuffTip
 * @dev A contract for tipping content creators with a platform fee.
 */
contract PuffTip is Ownable, ReentrancyGuard {
    // --- State Variables ---

    // Platform fee percentage (basis points: 200 = 2%)
    uint256 public constant PLATFORM_FEE_BPS = 200;
    
    // Fee required to update profile (to prevent spam)
    uint256 public profileUpdateFee = 0.001 ether;

    struct Profile {
        string metadataURI; // IPFS hash or URL to profile JSON
        bool exists;
    }

    // Mapping from user address to their profile
    mapping(address => Profile) public profiles;

    // --- Events ---

    event TipSent(address indexed tipper, address indexed recipient, uint256 amount, string message, uint256 timestamp);
    event ProfileUpdated(address indexed user, string newMetadataURI);
    event FeesWithdrawn(address indexed owner, uint256 amount);
    event ProfileUpdateFeeChanged(uint256 newFee);

    // --- Constructor ---

    constructor() Ownable(msg.sender) {}

    // --- Main Functions ---

    /**
     * @notice Send a tip to a recipient.
     * @param _recipient The address of the content creator to tip.
     * @param _message A message to send along with the tip.
     */
    function tip(address _recipient, string calldata _message) external payable nonReentrant {
        require(msg.value > 0, "Tip amount must be greater than 0");
        require(_recipient != address(0), "Cannot tip the zero address");
        
        uint256 platformFee = (msg.value * PLATFORM_FEE_BPS) / 10000;
        uint256 recipientAmount = msg.value - platformFee;

        // Transfer tip to recipient
        (bool successRecipient, ) = _recipient.call{value: recipientAmount}("");
        require(successRecipient, "Failed to send tip to recipient");

        // Emit event for UI/Indexer
        emit TipSent(msg.sender, _recipient, msg.value, _message, block.timestamp);
    }

    /**
     * @notice Update the sender's profile metadata.
     * @param _metadataURI The new URI for the profile metadata.
     */
    function updateProfile(string calldata _metadataURI) external payable {
        if (!profiles[msg.sender].exists) {
            // First time creating profile? Maybe free? Or just charge update fee.
            // For now, simple logic: pay the fee.
        }
        
        require(msg.value >= profileUpdateFee, "Insufficient fee for profile update");

        profiles[msg.sender] = Profile({
            metadataURI: _metadataURI,
            exists: true
        });

        emit ProfileUpdated(msg.sender, _metadataURI);
    }

    // --- Admin Functions ---

    /**
     * @notice Withdraw accumulated platform fees.
     */
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");

        (bool success, ) = owner().call{value: balance}("");
        require(success, "Withdraw failed");

        emit FeesWithdrawn(owner(), balance);
    }

    /**
     * @notice Update the fee required to update a profile.
     * @param _newFee The new fee amount in wei.
     */
    function setProfileUpdateFee(uint256 _newFee) external onlyOwner {
        profileUpdateFee = _newFee;
        emit ProfileUpdateFeeChanged(_newFee);
    }
}
