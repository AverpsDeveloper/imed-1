import tcWrap from "@/libs/utils/tcWrap";
import aminUserModel from "@/libs/models/adminUserModel";

import { Types } from "mongoose";



export const GET = tcWrap(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      throw new Error("field id required");
    }
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("field `id` invalid");
    }
  
      const inventroy = await aminUserModel.findById(id)
      if(!inventroy)  throw new Error("Data Not found");
      return res.json({
          result: {
          message: "inventry",
          data: inventroy,
          }
      });
});
