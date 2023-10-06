import { NextResponse } from "next/server";
// import connectToDatabase from "@/libs/models/publicPages";
// import { PagesModel } from "@/models/publicPages";
export async function GET(req:Request){
    // await connectToDatabase();
    //  let page = await PagesModel.find()
    // create({
    //     page : "contact",
    //     title: "contact us Page",
    //     slug: "contact-us",
    //     metaTitle: "contact",
    //     metaDescription: "i'm contact page",
    //     Description: "contact String",
    //     published: true,
    // })
    // console.log(page);
    
    return NextResponse.json({
        message : "Hello India33333333",
    })
}