import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Medicine } from "@/models/Medicine";

export async function POST(req: NextRequest) {
  try {
    const { batchId } = await req.json();

    if (!batchId) {
      return NextResponse.json(
        { message: "Batch ID or Barcode is required.", status: "error" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Query for the medicine by batchNumber or barcode
    const medicine = await Medicine.findOne({
      $or: [{ batchNumber: batchId }, { barcode: batchId }]
    });

    if (!medicine) {
      return NextResponse.json({
        status: "unregistered",
        message: "Medicine not found in the global registry."
      });
    }

    const isAuthentic = medicine.status === "AUTHENTIC";

    return NextResponse.json({
      status: isAuthentic ? "success" : "suspicious",
      medicine: {
        name: medicine.name,
        batch: medicine.batchNumber,
        manufacturer: medicine.manufacturer,
        expiry: medicine.expiryDate.toLocaleDateString(),
        mfgDate: medicine.manufacturingDate.toLocaleDateString(),
      },
      blockchainTx: "0x" + Math.random().toString(16).slice(2) + "deadbeef", // Mock for now
      blockNumber: 912808 + Math.floor(Math.random() * 1000),
      supplyChain: medicine.transitHistory || [
        { step: "Manufactured", location: "Global Hub", status: "Verified" }
      ]
    });
  } catch (error) {
    console.error("Error verifying medicine:", error);
    return NextResponse.json(
      { message: "Verification Node Connection Error", status: "error" },
      { status: 500 }
    );
  }
}
