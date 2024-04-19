import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Booking from "@/models/BookingModel";
import { AuthUser } from "@/middleware";
connect();
export const dynamic = "force-dynamic"

export async function PUT(req: NextRequest) {
    const data=await req.json();
    try {
        const isAuthUser = await AuthUser(req);
        if (!isAuthUser) {
            return NextResponse.json({
                success: false,
                message: "unauthorized access!!!"
            })
        }
        const update=await Booking.updateOne({ _id: data.id }, {$set: { status :"booked"}})
        if(update){
            return NextResponse.json({
                success:true,
                message:"successfully cancelled"
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:"unable to update"
            })
        }
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "something went wrong!!! try after some time"
        })
    }

}


