import itemModel from "@/libs/models/itemModel";
import categoryModal from "@/libs/models/categoryModal";
import tcWrap from "@/libs/utils/tcWrap";
import { Types } from "mongoose";
import adminConfModel from "@/libs/models/adminConfModel";
import itemBatchModel from "@/libs/models/itemBatchModel";

export const GET = tcWrap(async (req, res) => {
    const { search, arriveAt, price, page, limit } = req.query;
    const paginat = {
        page: +page <= 0 ? 0 : parseInt(page, 10) - 1,
        limit: parseInt(limit, 1000) || 1000
    }
    let filter: any = [{ deletedAt: { $exists: false } }];
    if (search) {
        filter.push({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ],
        });
    }

    if (arriveAt) {
        const [gt, lt] = arriveAt.split("-");
        filter.push({
            retailPrice: { $gte: +gt, ...(lt && { $lte: +lt }) },
        });
    }
    if (price) {
        const [gt, lt] = arriveAt.split("-");
        filter.push({
            sellingPrice: { $gte: +gt, ...(lt && { $lte: +lt }) },
        });
    }
    const [batch, total]: any = await Promise.all([
        itemBatchModel.find({ $and: filter }, '',
            {
                skip: paginat.page * paginat.limit,
                limit: paginat.limit
            }).populate("name"), //"item"
        itemBatchModel.count({ $and: filter })
    ]);

    return res.json({
        result: {
            message: "inventry",
            data: batch,
            meta: {
                total,
                page: paginat.page + 1,
                limit: paginat.limit
            }
        }
    });
});

export const POST = tcWrap(async (req, res) => {
    const body = await req.json();
    console.log("body::", body);
    if (!body.item) {
        throw new Error("field itmeId required");
    }
    if(body.isActive == "isActive"){
      body.isActive = true
    }else{
      body.isActive = false
    } 
    const item = await itemBatchModel.create(body);
    console.log(item,"reqbody", body);
    return res.json({ result: { message: "item added to batch", item } });
});

export const PUT = tcWrap(async (req, res) => {
    console.log("put");
    const body = await req.json();
    const id = body.id;
    console.log("id", id);
    if (!id) {
      throw new Error("field id required");
    }
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("field `id` invalid");
    }
   
    const item = await itemBatchModel.findByIdAndUpdate(id, body, {
      new: true, runValidators: true
    });
    console.log("item", item);
  
    console.log("reqbody", body);
    return res.json({ result: { message: "item updated to batch", item } });
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
    console.log("bodyData", body.id);
    const findItem: any = await itemBatchModel.findById(body.id);
    if(!findItem) throw "Invalid Batch item."
    const item = await itemBatchModel.findByIdAndDelete(
      body.id
    );
    console.log("item", item);
  
    console.log("reqbody", body);
    return res.json({ result: { message: "Batch item deleted.", item } });
  });

