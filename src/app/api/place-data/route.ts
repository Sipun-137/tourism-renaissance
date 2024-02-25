import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic ='force-dynamic'

export async function POST(req:NextRequest){
    const data=await req.json();
    const {type,sw,ne}=data
    try{
        const {data}=await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY as string,
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          })
          console.log(data.data)

        console.log(data)
        return NextResponse.json({
            success:true,
            data: data.data
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"something went wrong in fetching the data"
        })
    }

}