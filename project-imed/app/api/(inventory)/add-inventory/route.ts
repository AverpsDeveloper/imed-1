import { NextResponse } from "next/server";
import connectToDatabase from "@/libs/mongooDB";
import { inventryModel } from "@/models/inventoryModel";
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const {
      alternativeName,
      form,
      itemCategory,
      itemName,
      presetQuantity,
      price,
      productDescription,
      unitOfMeasure,
    } = body;
    
    let newCategory = await inventryModel.create({
      alternativeName,
      form,
      itemCategory,
      itemName,
      presetQuantity,
      price,
      productDescription,
      unitOfMeasure,
    });
    console.log("newCategory::",newCategory);
    
    return NextResponse.json({
      message: "Add New Product",
      status: true,
      data: newCategory,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error occured in adding new Product",
      status: false,
    });
  }
}
