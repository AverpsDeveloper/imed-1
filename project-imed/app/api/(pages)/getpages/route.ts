import { NextResponse } from "next/server";
import { PagesModel } from "@/libs/models/publicPages";
export async function GET(req:Request){
    let page = await PagesModel.find({published:true}).select("page slug");
    return NextResponse.json({
        message : "Published Pages by Admin",
        success : true,
        page,
    },
    {status:200}
    )
}