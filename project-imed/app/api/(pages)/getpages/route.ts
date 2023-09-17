import { NextResponse } from "next/server";
import connectToDatabase from "@/libs/mongooDB";
import { PagesModel } from "@/models/publicPages";
export async function GET(req:Request){
    
    let page = await PagesModel.find({published:true}).select("page slug");
    return NextResponse.json({
        message : "Published Pages by Admin",
        page,
    },
    {status:200}
    )
}