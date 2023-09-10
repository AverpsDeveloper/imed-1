import { NextResponse } from "next/server";
import { connectToDatabase } from "@/libs/mongooDB";
import { PagesModel } from "@/models/publicPages";
export async function GET(req: Request) {
  await connectToDatabase();
  let pageName = await PagesModel.find({ published: true }).select("page slug");
  return NextResponse.json(
    {
      message: "Published Pages by Admin",
      pageName,
    },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const {
      pageName,
      seoSlug,
      title,
      metaTitle,
      metaDescription,
      published,
      description,
    } = body;
    console.log(body);

    let pages = await PagesModel.create({
      page: pageName,
      slug : seoSlug,
      title: title,
      metaTitle:metaTitle,
      metaDescription:metaDescription,
      published: published,
      description : description,
    });
    if (!pages) {
        console.log(pages);
        
      throw new Error("There is some issues with creating pages.");
    }
    return NextResponse.json(
      {
        message: "New Page Created successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({
        message: error.message,
        success : false,
      });
  }
}
