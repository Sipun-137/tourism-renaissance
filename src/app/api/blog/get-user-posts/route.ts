import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import BlogPost from "@/models/BlogPostModel";
import mongoose from "mongoose";
connect();
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
    const { searchParams } = await new URL(req.url)
    const id:string|null = searchParams.get("id")
    try {
        if (!id||!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({
                success: false,
                message: "id must be required "
            })
        }
        const allPost = await BlogPost.find({ userId: id });
        if (allPost) {
            return NextResponse.json({
                success: true,
                message: "data fetched successfully",
                data: allPost
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "failed to fetch !!! please try again "
            })
        }

    } catch (e: any) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "something went wrong please try again later"
        })
    }
}