import connect from "@/db_config/db_config";
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()


export async function POST (request: NextRequest) {
    try {
        const reqBody = await request.json()
        console.log(reqBody)
        const {username, email, password} = reqBody
        
        //check if user already exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: 'User already exists'}, {status: 400})
        }

        //hash the password
        const salt = await bcryptjs.genSalt(10)
        const hash = await bcryptjs.hash(password, salt)
        
        const newUser = new User({username, email, password: hash})
        const savedUser = await newUser.save()
        console.log(savedUser)
        return NextResponse.json({ 
            success: true,
            message: 'User created successfully!',
            savedUser 
        })


    } catch (error: any) {
        return NextResponse.json({error}, {status: 200});
    }
}