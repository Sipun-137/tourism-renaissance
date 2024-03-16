import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import BlogPost from "@/models/BlogPostModel";
import Joi from "joi";
import { AuthUser } from "@/middleware";
connect();

const schema = Joi.object({
    userID: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
})

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
    const { userID, title, content } = await req.json();
    const { error } = schema.validate({ userID: userID, title: title, content: content });
    if (error) return NextResponse.json({ success: false, message: error.details[0].message });
    try {
        const isAuthUser = await AuthUser(req);
        if (!isAuthUser) {
            return NextResponse.json({
                success: false,
                message: "unauthorized access!!!"
            })
        }
        const newPost = await BlogPost.create({ userID, title, content });
        if (newPost) {
            return NextResponse.json({
                success: true,
                message: "sent successfully"
            })
        }else{
            return NextResponse.json({
                success: false,
                message:"failed to create !!! please try again "
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