import connectDb from "@/src/lib/db";
import User from "@/src/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const {name, email, password} = await request.json()
        await connectDb()

        let existUser = await User.findOne({email})

        if(existUser) {
            return NextResponse.json(
                {message: "User already exist!"},
                {status:400}
            )
        }

        if(password.length < 6) {
            return NextResponse.json(
                {message: "Password must be contain atleast 6 character !"},
                {status:400}
            ) 
        }

        const hashedPassword =  await bcrypt.hash(password, 10)
        const user = await User.create({
            name, email, password:hashedPassword
        })

        return NextResponse.json(
                user,
                {status: 201}
            )

        
    } catch(e) {
        return NextResponse.json(
            {message: `registor error ${e}`},
            {status: 500}
        )
    }
}

// signup
// check exiting user
// password checks
// hash passwor using bcryptjs
// created user only when user is not exist

