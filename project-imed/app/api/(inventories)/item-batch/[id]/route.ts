import tcWrap from "@/libs/utils/tcWrap";
import { Types } from "mongoose";
import itemBatchModel from "@/libs/models/itemBatchModel";

export const GET = tcWrap(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new Error("field id required");
    }
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("field `id` invalid");
    }

    const inventroy = await itemBatchModel.findById(id).populate('item', "name categories")
    if (!inventroy) throw new Error("Data Not found");
    return res.json({
        result: {
            message: "item batch",
            data: inventroy,
        }
    });
});

