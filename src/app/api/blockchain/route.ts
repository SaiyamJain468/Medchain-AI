import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";

// IMPORTANT: We would typically import the ABI from the compiled Hardhat artifacts
// e.g. import DrugRegistryABI from "../../../artifacts/contracts/DrugRegistry.sol/DrugRegistry.json"
// For demonstration, we embed the core ABI here:
const ABI = [
    "function registerBatch(string _batchId, string _drugName, string _manufacturer, uint256 _manufactureDate, uint256 _expiryDate, string _initialLocation) external",
    "function addSupplyChainStep(string _batchId, string _location, string _handler, string _status) external",
    "function getBatchInfo(string _batchId) external view returns (string drugName, string manufacturer, uint256 manufactureDate, uint256 expiryDate, bool isRegistered)",
    "function getSupplyChainSteps(string _batchId) external view returns (tuple(string location, uint256 timestamp, string handler, string status)[])"
];

// Provide your Contract Address and RPC URL in `.env.local`
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";
const RPC_URL = process.env.POLYGON_AMOY_RPC_URL || "https://rpc-amoy.polygon.technology/";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Local Hardhat Default #0

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const batchId = searchParams.get("batchId");

        if (!batchId) {
            return NextResponse.json({ error: "batchId is required" }, { status: 400 });
        }

        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

        const batchInfo = await contract.getBatchInfo(batchId);
        const steps = await contract.getSupplyChainSteps(batchId);

        return NextResponse.json({
            success: true,
            data: {
                drugName: batchInfo.drugName,
                manufacturer: batchInfo.manufacturer,
                manufactureDate: new Date(Number(batchInfo.manufactureDate) * 1000).toISOString(),
                expiryDate: new Date(Number(batchInfo.expiryDate) * 1000).toISOString(),
                isRegistered: batchInfo.isRegistered,
                supplyChainSteps: steps.map((step: { location: string; timestamp: string | number | bigint; handler: string; status: string }) => ({
                    location: step.location,
                    timestamp: new Date(Number(step.timestamp) * 1000).toISOString(),
                    handler: step.handler,
                    status: step.status
                }))
            }
        });
    } catch (error: unknown) {
        console.error("Blockchain read error:", error);
        return NextResponse.json({ error: "Failed to read from blockchain", details: (error as Error).message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action, batchId, location, status, handler, drugName, manufacturer, manufactureDate, expiryDate } = body;

        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

        if (action === "register") {
            if (!batchId || !drugName || !manufacturer || !manufactureDate || !expiryDate || !location) {
                return NextResponse.json({ error: "Missing required fields for registration" }, { status: 400 });
            }

            // Convert ISO string dates to Unix Timestamps
            const mfgTs = Math.floor(new Date(manufactureDate).getTime() / 1000);
            const expTs = Math.floor(new Date(expiryDate).getTime() / 1000);

            const tx = await contract.registerBatch(batchId, drugName, manufacturer, mfgTs, expTs, location);
            const receipt = await tx.wait();

            return NextResponse.json({ success: true, transactionHash: receipt.hash, action: "registerBatch" });
        }
        else if (action === "updateNode") {
            if (!batchId || !location || !status || !handler) {
                return NextResponse.json({ error: "Missing required fields for updating supply node" }, { status: 400 });
            }

            const tx = await contract.addSupplyChainStep(batchId, location, handler, status);
            const receipt = await tx.wait();

            return NextResponse.json({ success: true, transactionHash: receipt.hash, action: "addSupplyChainStep" });
        }
        else {
            return NextResponse.json({ error: "Invalid action type. Expected 'register' or 'updateNode'" }, { status: 400 });
        }

    } catch (error: unknown) {
        console.error("Blockchain write error:", error);
        return NextResponse.json({ error: "Transaction failed", details: (error as Error).message }, { status: 500 });
    }
}
