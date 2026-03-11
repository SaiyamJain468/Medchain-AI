const hre = require("hardhat");

async function main() {
    console.log("Deploying DrugRegistry contract...");

    const DrugRegistry = await hre.ethers.getContractFactory("DrugRegistry");
    const drugRegistry = await DrugRegistry.deploy();

    await drugRegistry.waitForDeployment();
    const address = await drugRegistry.getAddress();

    console.log(`DrugRegistry deployed to: ${address}`);

    // NOTE: Save this address to `.env.local` for the Next.js API to use
    console.log("Add this to your .env.local:");
    console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
