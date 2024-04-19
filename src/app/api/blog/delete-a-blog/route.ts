import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import { AuthUser } from "@/middleware";
import BlogPost from "@/models/BlogPostModel";
connect();
export const dynamic = "force-dynamic"

export async function DELETE(req: NextRequest) {
    const {searchParams}=new URL(req.url);
    const id=searchParams.get('id');

    try {
        const isAuthUser = await AuthUser(req);
        if (!id) return NextResponse.json({ success: false, message: "cart Item id is required " })
        if (!isAuthUser) {
            return NextResponse.json({
                success: false,
                message: "unauthorized access!!!"
            })
        }
        const deletestatus=await BlogPost.findByIdAndDelete(id);
        if(deletestatus){
            return NextResponse.json({
                success:true,
                message:"successfully deletedted"
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:"unable to delete "
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