import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic ='force-dynamic'

export async function POST(req:NextRequest){
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const options = {
          method: 'GET',
          url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/getHotelDetails',
          params: {
            id: id,
            checkIn: '2024-04-02',
            checkOut: '2024-04-02',
            currency: 'INR'
          },
          headers: {
            'X-RapidAPI-Key': process.env.Z_RAPID_API_KEY as string,
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
          }
        };
        const response = await axios.request(options);
        console.log(response.data)
        return NextResponse.json({
            success:true,
            message:"success fully called the api",
            data:response.data
        })
    } catch (e:any) {
        console.log(e)
        return NextResponse.json({
            success:false,
            message:"something went wrong"
        })
    }
}