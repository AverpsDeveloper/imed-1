import { NextResponse } from "next/server";
import { PagesModel } from "@/libs/models/publicPages";
import tcWrap from "@/libs/utils/tcWrap";
import { Types } from "mongoose";

export const GET = tcWrap(async (req, res) => {
  const data: any = await PagesModel.find().select("page title slug published createdAt updatedAt");;
  return res.json({ result: { data} });
});


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { page, slug, title, metaTitle, metaDescription, published, description,
    } = body;
    
    let pages = await PagesModel.create({
      page: page,
      slug : slug,
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

export const PUT = tcWrap(async (req, res) => {
  console.log("put");
  const body = await req.json();
  const id = body.id;

  if (!id) {
    throw new Error("field id required");
  }
  
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("field `id` invalid");
  }

  const item = await PagesModel.findByIdAndUpdate(id, body, {
    new: true, runValidators: true
  });
  
  return res.json({ result: { message: "Page Updated", item } });
});


export const DELETE = tcWrap(async (req, res) => {
  console.log("delete");
  const body = await req.json();

  if (!body.id) {
    throw new Error("field `id` required");
  }
  if (!Types.ObjectId.isValid(body.id)) {
    throw new Error("field `id` invalid");
  }

  const findItem: any = await PagesModel.findByIdAndDelete(body.id);
 
  return res.json({ result: { message: "Page Deleted" } });
});