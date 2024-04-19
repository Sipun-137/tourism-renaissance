import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Booking from "@/models/BookingModel";
import { AuthUser } from "@/middleware";
connect();

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest){
    const {searchParams}=await new URL(req.url);
    const id=searchParams.get('id');
    try {
        const isAuthUser = await AuthUser(req);
        if (!isAuthUser) {
            return NextResponse.json({
                success: false,
                message: "unauthorized access!!!"
            })
        }
        const filter=!id?{}:{userID:id}
        const bookingdata=await Booking.find(filter)
        if(!bookingdata){
            return NextResponse.json({
                success:false,
                message:"unable to fetch the data"
            }) 
        }
        return NextResponse.json({
            success:true,
            message:"data fetched successfully",
            data: bookingdata
        })
    } catch (e:any) {
        console.log(e)
        return NextResponse.json({
            success:false,
            message:"something went wrong"
        })
    }
}