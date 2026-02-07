import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const PuffTip = await ethers.getContractFactory("PuffTip");
    const puffTip = await PuffTip.deploy();

    await puffTip.waitForDeployment();

    console.log("PuffTip deployed to:", await puffTip.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
