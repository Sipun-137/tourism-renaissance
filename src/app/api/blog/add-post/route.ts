import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import BlogPost from "@/models/BlogPostModel";
import Joi from "joi";
import { AuthUser } from "@/middleware";
connect();

const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
})

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
    const { userId, pid, title, description } = await req.json();
    const { error } = schema.validate({ title: title, content: description });
    if (error) return NextResponse.json({ success: false, message: error.details[0].message });
    try {
        const isAuthUser = await AuthUser(req);
        if (!isAuthUser) {
            return NextResponse.json({
                success: false,
                message: "unauthorized access!!!"
            })
        }
        const newPost = await BlogPost.create({ userId, pid, title, description });
        if (newPost) {
            return NextResponse.json({
                success: true,
                message: "post successfully"
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "failed to create !!! please try again "
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