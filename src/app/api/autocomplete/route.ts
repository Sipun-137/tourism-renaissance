import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';


export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url)
    const pname = searchParams.get('pname');
    const options = {
        method: 'GET',
        url: 'https://place-autocomplete1.p.rapidapi.com/autocomplete/json',
        params: {
            input: pname,
            radius: '500'
        },
        headers: {
            'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY as string,
            'X-RapidAPI-Host': 'place-autocomplete1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return NextResponse.json({
            success:true,
            data:response.data.predictions
        })


    } catch (error: any) {
        NextResponse.json({
            success: false,
            message: "something went wrong! try after some time "
        })
    }
}