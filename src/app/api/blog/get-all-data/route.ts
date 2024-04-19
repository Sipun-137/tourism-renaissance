import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import BlogPost from "@/models/BlogPostModel";
import User from "@/models/UserModel";


connect();
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
    try {
        const users = await User.find();
        if (users.length > 0) {
            const allPost = await BlogPost.find().populate('userId');
            if (allPost) {
                return NextResponse.json({
                    success: true,
                    message: "post successfully",
                    data: allPost
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "failed to find the posts !!! please try again "
                })
            }
        }


    } catch (e: any) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "something went wrong please try again later"
        })
    }
}