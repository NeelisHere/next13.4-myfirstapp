import connect from "@/db_config/db_config";
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

connect()

export async function POST (request: NextRequest) {
    try {
        const reqBody = await request.json()
        console.log(reqBody)
        const {username, password} = reqBody
        
        //check if user already exists
        const user = await User.findOne({username})
        if(!user){
            return NextResponse.json({error: 'User not found!'}, {status: 400})
        }

        //check if password is correct
        const passwordValid = await bcryptjs.compare(password, user.password)
        if(!passwordValid){
            return NextResponse.json({error: 'Invalid username or password!'}, {status: 400})
        }

        //create token 
        const token_data = { id: user._id, username: user.username }
        const token_config = { httpOnly: true }

        const token = await jwt.sign(
            token_data,
            process.env.JWT_SECRET_KEY!,
            { expiresIn: '1h' }
        )
        const response = NextResponse.json({ 
            success: true,
            message: 'Login successfull!',
        })
        response.cookies.set('token', token, token_config)
        return response

    } catch (error: any) {
        return NextResponse.json({error}, {status: 200});
    }
}