import orderModal from "@/libs/models/orderModal";
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

  const inventroy = await orderModal.findById(id)
  if (!inventroy) throw new Error("Data Not found");
  return res.json({
    result: {
      message: "Order Details",
      data: inventroy,
    }
  });
});
export const PUT = tcWrap(async (req, res) => {
  const { id } = req.params;
  const body = await req.json();
  console.log("body::", body);
  if (!id) {
    throw new Error("field id required");
  }
  if (!body.orderStatus ) {
    throw new Error("Order Status id required");
  }
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("field `id` invalid");
  }

  const inventroy = await orderModal.findByIdAndUpdate(id, { orderStatus: body.orderStatus })
  if (!inventroy) throw new Error("Data Not found");
  return res.json({
    result: {
      message: "Order Status Updated",
      data: inventroy,
    }
  });
});
