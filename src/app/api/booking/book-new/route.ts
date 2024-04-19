import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Booking from "@/models/BookingModel";
import Joi from "joi";
import { AuthUser } from "@/middleware";
connect();

const schema = Joi.object({
    hotelId: Joi.string().required(),
    userID: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    aadharNo: Joi.string().length(12).required(),
    ContactNo: Joi.string().length(10).required(),
    CheckInDate: Joi.string().required(),
    CheckOutDate: Joi.string().required(),
    address: Joi.string().required()
})

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { hotelId, userID, name, email, aadharNo, ContactNo, CheckInDate, CheckOutDate, address } = data;
    console.log(data)
    const { error } = schema.validate({ hotelId: hotelId, userID: userID, name: name, email: email, aadharNo: aadharNo, ContactNo: ContactNo, CheckInDate: CheckInDate, CheckOutDate: CheckOutDate, address: address })
    if (error) return NextResponse.json({ success: false, message: error.details[0].message });

    const exchangeRate = 83.24; // Assuming 1 USD = 83.24INR

    // Original string
    const originalString = data.price;

    // Remove the "$" sign from the string
    const amountString = originalString.substring(1); // This removes the first character, which is "$"

    // Convert the string to a number
    const amountUSD = parseFloat(amountString);

    // Convert USD to INR
    const amountINR = amountUSD * exchangeRate;

    // Format the amount as INR
    const formattedAmount = "₹" + amountINR.toFixed(2);
    data.price=formattedAmount;
    try {
        const isAuthUser = await AuthUser(req);
        if (!isAuthUser) {
            return NextResponse.json({
                success: false,
                message: "unauthorized access!!!"
            })
        }
        const newPost = await Booking.create(data);
        if (newPost) {
            return NextResponse.json({
                success: true,
                message: "booking successfully"
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "failed to book !!! please try again "
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