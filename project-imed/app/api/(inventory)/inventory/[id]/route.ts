import itemModel from "@/libs/models/itemModel";
import categoryModal from "@/libs/models/categoryModal";
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

    const inventroy = await itemModel.findById(id).populate('category', "name")
    if(!inventroy)  throw new Error("Data Not found");
    return res.json({
        result: {
        message: "inventry",
        data: inventroy,
        }
    });
});
