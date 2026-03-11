import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { FraudReport } from "@/models/FraudReport";

export async function GET() {
    try {
        await dbConnect();

        // Fetch all fraud reports
        const reports = await FraudReport.find().sort({ reportedAt: -1 }).lean();

        // Calculate total count
        const totalCount = reports.length;

        // Calculate Top 5 Hotspot Cities
        const cityCounts = reports.reduce((acc: Record<string, number>, report: { city: string }) => {
            acc[report.city] = (acc[report.city] || 0) + 1;
            return acc;
        }, {});

        const topCities = Object.entries(cityCounts)
            .map(([city, count]) => ({ city, count: count as number }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        return NextResponse.json({
            success: true,
            totalCount,
            topCities,
            reports
        });
    } catch (error) {
        console.error("Error fetching fraud reports:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { barcode, medicineName, latitude, longitude, city, reason } = body;

        if (latitude === undefined || longitude === undefined || !city || !reason) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        await dbConnect();

        const newReport = await FraudReport.create({
            barcode,
            medicineName,
            latitude,
            longitude,
            city,
            reason
        });

        return NextResponse.json({
            success: true,
            message: "Fraud report logged successfully",
            report: newReport
        });
    } catch (error) {
        console.error("Error creating fraud report:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
