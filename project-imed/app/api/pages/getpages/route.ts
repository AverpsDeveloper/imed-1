import { NextResponse } from "next/server";
import connectToDatabase from "@/libs/config/dbInit";
import { PagesModel } from "@/libs/models/publicPages";
export async function GET(req:Request){
    await connectToDatabase();
    let page = await PagesModel.find({published:true}).select("page slug");
    return NextResponse.json({
        message : "Published Pages by Admin",
        success : true,
        page,
    },
    {status:200}
    )
}