import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import { AuthUser } from "@/middleware";
import BlogPost from "@/models/BlogPostModel";
connect();
export const dynamic = "force-dynamic"
interface updateData {
    id: string,
    title: string,
    description: string
}
export async function PUT(req: NextRequest) {
    const data:updateData=await req.json();
    try {
        const isAuthUser = await AuthUser(req);
        if (!isAuthUser) {
            return NextResponse.json({
                success: false,
                message: "unauthorized access!!!"
            })
        }
        const update=await BlogPost.updateOne({ _id: data.id }, {$set: { title:data.title,description:data.description}})
        if(update){
            return NextResponse.json({
                success:true,
                message:"successfully updated"
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:"unable to update"
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


