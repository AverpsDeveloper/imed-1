import userModel from "@/libs/models/userModel";
import tcWrap from "@/libs/utils/tcWrap";
import { Types } from "mongoose";



export const GET = tcWrap(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("field id required");
  }
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("field `id` invalid");
  }

  const user = await userModel.findById(id)
  if (!user) throw new Error("Data Not found");
  return res.json({
    result: {
      message: "User Details",
      data: user,
    }
  });
});


export const PUT = tcWrap(async (req, res) => {
  const { id } = req.params;
  const body = await req.json();
  
  if (!id) {
    throw new Error("field id required");
  }
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("field `id` invalid");
  }
  console.log()
  const user = await userModel.findByIdAndUpdate(id, body, { new: true })
  if (!user) throw new Error("Data Not found");
  return res.json({
    result: {
      message: "User Details Updated",
      data: user,
    }
  });
});
