import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/db_config/db_config";

connect()

export async function GET(req: NextRequest) {
    try {
        const id = await getDataFromToken(req)
        const user = await User.findById(id).select('-password')
        return NextResponse.json({
            message: 'User found',
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}