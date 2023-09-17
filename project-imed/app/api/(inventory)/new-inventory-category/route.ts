import { NextResponse } from "next/server";
import connectToDatabase from "@/libs/mongooDB";
import { InventoryCategoryModel } from "@/models/inventoryCategoryModel";
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { categoryName, categoryStatus } = body;
    if(categoryName && categoryStatus === "Active" || categoryStatus === "Inactive"){     
        let newCategory = await InventoryCategoryModel.create({
          categoryName,
          categoryStatus,
        });
    
        return NextResponse.json({
          message: "Add New category",
          status: true,
          data: newCategory,
        });
    }else{
        throw new Error("Invalid category");
    }
  } catch (error) {
    return NextResponse.json({
        message: "Error occured in adding new category",
        status: false,
      });
  }
}
