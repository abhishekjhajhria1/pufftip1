import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("PuffTip", function () {
    async function deployPuffTipFixture() {
        const [owner, otherAccount, creator] = await ethers.getSigners();
        const PuffTip = await ethers.getContractFactory("PuffTip");
        const puffTip = await PuffTip.deploy();

        return { puffTip, owner, otherAccount, creator };
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { puffTip, owner } = await loadFixture(deployPuffTipFixture);
            expect(await puffTip.owner()).to.equal(owner.address);
        });
    });

    describe("Tipping", function () {
        it("Should transfer 98% to recipient and 2% to contract owner", async function () {
            const { puffTip, owner, otherAccount, creator } = await loadFixture(
                deployPuffTipFixture
            );

            const tipAmount = ethers.parseEther("1.0"); // 1 ETH
            const expectedFee = (tipAmount * 200n) / 10000n; // 2%
            const expectedRecipientAmount = tipAmount - expectedFee;

            // Send tip
            const tx = await (puffTip as any).connect(otherAccount).tip(creator.address, "Great stream!", { value: tipAmount });
            const receipt = await tx.wait();
            const block = await ethers.provider.getBlock(receipt.blockHash);

            await expect(tx)
                .to.emit(puffTip, "TipSent")
                .withArgs(otherAccount.address, creator.address, tipAmount, "Great stream!", block?.timestamp);

            expect(await ethers.provider.getBalance(await puffTip.getAddress())).to.equal(expectedFee);

            await expect(
                (puffTip as any).connect(otherAccount).tip(creator.address, "Another tip", { value: tipAmount })
            ).to.changeEtherBalances(
                [creator, await puffTip.getAddress()],
                [expectedRecipientAmount, expectedFee]
            );
        });

        it("Should allow owner to withdraw fees", async function () {
            const { puffTip, owner, otherAccount, creator } = await loadFixture(deployPuffTipFixture);
            const tipAmount = ethers.parseEther("1.0");
            await (puffTip as any).connect(otherAccount).tip(creator.address, "Tip", { value: tipAmount });

            const expectedFee = (tipAmount * 200n) / 10000n;

            await expect((puffTip as any).connect(owner).withdrawFees())
                .to.changeEtherBalances(
                    [owner, await puffTip.getAddress()],
                    [expectedFee, -expectedFee]
                );
        });
    });

    describe("Profile Updates", function () {
        it("Should allow users to update profile with a fee", async function () {
            const { puffTip, otherAccount } = await loadFixture(deployPuffTipFixture);
            const updateFee = await (puffTip as any).profileUpdateFee();

            await expect((puffTip as any).connect(otherAccount).updateProfile("ipfs://new-hash", { value: updateFee }))
                .to.emit(puffTip, "ProfileUpdated")
                .withArgs(otherAccount.address, "ipfs://new-hash");

            const profile = await (puffTip as any).profiles(otherAccount.address);
            expect(profile.metadataURI).to.equal("ipfs://new-hash");
        });
    });
});
