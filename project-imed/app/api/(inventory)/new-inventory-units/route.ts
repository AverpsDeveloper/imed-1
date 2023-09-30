import { NextResponse } from "next/server";
import connectToDatabase from "@/libs/config/dbInit";
import { MedicinesUnitsModel } from "@/libs/models/medicinesUnits";

export async function POST(req: Request) {
  try {    
    await connectToDatabase();
    const body = await req.json();
    const { medicinesUnitsName, medicinesUnitsStatus } = body;
    if(medicinesUnitsName && medicinesUnitsStatus === "Active" || medicinesUnitsStatus === "Inactive"){     
        let newCategory = await MedicinesUnitsModel.create({
          medicinesUnitsName,
          medicinesUnitsStatus,
        });
    
        return NextResponse.json({
          message: "Add New Unit",
          success: true,
          data: newCategory,
        });
    }else{
        throw new Error("Invalid Unit Name");
    }
  } catch (error) {
    return NextResponse.json({
        message: "Error occured in adding new Unit",
        success: false,
      });
  }
}
