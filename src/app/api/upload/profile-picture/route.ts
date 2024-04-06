import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect()
export async function PUT(req: NextRequest) {
    try {
        const { _id, imgurl } = await req.json()
        const filter = { _id: _id };
        const valid = await User.findById({ _id })
        if (valid) {
            const update = { $set: { imgurl: imgurl } };
            const res = await User.updateOne(filter, update);
            if (res) {
                return NextResponse.json({
                    success: true,
                    message: "profile picture updated Successfully updated after next login you are able to see your profile picture"
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "unable to upload the picture"
                })
            }
        }
    } catch (e: any) {
        return NextResponse.json({
            success: false,
            message: "unable to process the information"
        })
    }
}