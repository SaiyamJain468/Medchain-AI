import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import { Pharmacy } from "../../../../models/Pharmacy";
import { MedicineListing } from "../../../../models/MedicineListing";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const city = searchParams.get("city");
        const search = searchParams.get("search");

        await connectMongoDB();

        const query: Record<string, unknown> = {};
        if (city) {
            query.city = { $regex: new RegExp(city, "i") };
        }
        if (search) {
            query.name = { $regex: new RegExp(search, "i") };
        }

        // Fetch all matching pharmacies
        const pharmacies = await Pharmacy.find(query).lean();

        // Attach their respective medicine listings
        const pharmaciesWithListings = await Promise.all(
            pharmacies.map(async (pharmacy) => {
                const listings = await MedicineListing.find({ pharmacyId: pharmacy._id }).lean();
                return {
                    ...pharmacy,
                    listings
                };
            })
        );

        // Get unique cities for the filter dropdown
        const allCities = await Pharmacy.distinct("city");

        return NextResponse.json({
            success: true,
            pharmacies: pharmaciesWithListings,
            cities: allCities
        });
    } catch (error) {
        console.error("Error fetching marketplace data:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
