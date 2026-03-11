import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import { MedicineListing } from "../../../../../models/MedicineListing";
import mongoose from "mongoose";

// In a real app we would get the auth session to determine pharmacyId securely.
// For this hackathon scope, we'll accept it via headers or body.

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const pharmacyId = searchParams.get("pharmacyId");

        if (!pharmacyId) {
            return NextResponse.json({ success: false, message: "pharmacyId required" }, { status: 400 });
        }

        await connectMongoDB();
        const listings = await MedicineListing.find({ pharmacyId: new mongoose.Types.ObjectId(pharmacyId) }).sort({ updatedAt: -1 }).lean();

        return NextResponse.json({ success: true, listings });
    } catch (error) {
        console.error("Error fetching listings:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { pharmacyId, drugName, manufacturer, price, stock, isBlockchainVerified, batchIds } = body;

        if (!pharmacyId || !drugName || price === undefined || stock === undefined) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        await connectMongoDB();

        const newListing = await MedicineListing.create({
            pharmacyId: new mongoose.Types.ObjectId(pharmacyId),
            drugName,
            manufacturer,
            price: Number(price),
            stock: Number(stock),
            isBlockchainVerified: Boolean(isBlockchainVerified),
            batchIds: batchIds || []
        });

        return NextResponse.json({ success: true, listing: newListing }, { status: 201 });
    } catch (error) {
        console.error("Error creating listing:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
