import authOptons from "@/src/lib/auth";
import connectDb from "@/src/lib/db";
import User from "@/src/model/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb()
        const session = await getServerSession(authOptons)
        if (!session || !session.user.email || !session.user.id) {
            return NextResponse.json(
                { message: "User does not have session" },
                { status: 400 }
            )
        }
        const user = await User.findById(session.user.id).select("-password")
        if (!user) {
            return NextResponse.json(
                { message: "user not found" },
                { status: 400 }
            )
        }

        return NextResponse.json(
            user,
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: `get user erro${error}` },
            { status: 500 }
        )
    }
}