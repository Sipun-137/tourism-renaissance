import { ContentCutOutlined } from "@mui/icons-material";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic ='force-dynamic'

export async function POST(req:NextRequest){
    try {
        const data=await req.json();
        console.log(data)
        let formatDate = (date:Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const localDate = `${year}-${month}-${day}`;
            return localDate;
          };
          const d = new Date();
          const formattedDate = formatDate(d);
          console.log(formattedDate)
        const options = {
            method: 'GET',
            url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotelsByLocation',
            params: {
                latitude: data.lat,
                longitude: data.lng,
                checkIn: data.cindt,
                checkOut: data.coutdt,
                pageNumber: '1',
                currencyCode: 'INR'
              },
            headers: {
              'X-RapidAPI-Key': process.env.OUTLOOK_RAPID_API_KEY as string,
              'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
            }
          };
        const response = await axios.request(options);
        console.log(response.data.data)
        return NextResponse.json({
            success:true,
            message:"success fully called the api",
            data:response.data.data
        })
    } catch (e:any) {
        console.log(e)
        return NextResponse.json({
            success:false,
            message:"something went wrong"
        })
    }
}