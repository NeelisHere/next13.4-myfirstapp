import connect from "@/db_config/db_config";
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import bcryptjs from  'bcryptjs'


connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { updatedPassword, token } = reqBody.data
        // console.log('->', token)
        const user = await User.findOne({ 
            forgotPasswordToken: token, 
            forgotPasswordTokenExpiry: { $gt: Date.now() } 
        })
        if (!user) {
            // console.log('>>')
            return NextResponse.json({error: 'Invalid Token'}, {status: 400})
        }
        console.log(user)

        const salt = await bcryptjs.genSalt(10)
        const hashedUpdatedPassword = await bcryptjs.hash(updatedPassword, salt)

        user.password = hashedUpdatedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            success: true,
            message: 'Password updated successfully!',
            user
        })

    } catch (error) {
        return NextResponse.json({error}, {status: 200});
    }
}