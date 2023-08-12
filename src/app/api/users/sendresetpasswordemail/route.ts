import connect from "@/db_config/db_config";
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(req: NextRequest) {
    const reqBody = await req.json()
    // console.log(reqBody)
    const user = await User.findOne(reqBody)
    await sendEmail({ email: reqBody.email, emailType: 'RESET', userId: user._id })

    return NextResponse.json({
        success: true,
        message: 'Email sent successfully'
    }) 
}