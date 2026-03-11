import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { name, email, password, role } = await req.json();

        // Validate inputs
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Please provide all required fields." },
                { status: 400 }
            );
        }

        await dbConnect();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists with this email." },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "patient",
        });

        return NextResponse.json(
            { message: "User registered successfully", user: { id: newUser._id, email: newUser.email, role: newUser.role } },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "An error occurred during registration.", errorDetails: error?.message || String(error) },
            { status: 500 }
        );
    }
}
