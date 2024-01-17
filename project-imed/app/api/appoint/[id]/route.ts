import appointModel from "@/libs/models/appointModel";
import tcWrap from "@/libs/utils/tcWrap";
import { Types } from "mongoose";


export const GET = tcWrap(async (req, res) => {
    const { id } = req.params;
  
    const data = await appointModel.findById(id).populate("doctor user");
    if (!data) throw new Error("not found");
    return res.json({
        result: {
            message: "apointment detail",
            data,
        },
    }, { status: 200 });
});

export const POST = tcWrap(async (req, res) => {
    const body = await req.json()
    const data = await appointModel.create(body);
    if (!data) throw new Error("something went wrong");
    return res.json({
        result: {
            message: "apointment done",
            data: data,
        },
    }, { status: 201 });
});
export const PUT = tcWrap(async (req, res) => {
    const { id } = req.params;
  const body = await req.json();
  console.log("body::", body);
  if (!id) {
    throw new Error("field id required");
  }
  if (!body.appoimentStatus ) {
    throw new Error("Appoiment Status id required");
  }
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("field `id` invalid");
  }

  const appoint = await appointModel.findByIdAndUpdate(id, { appoimentStatus: body.appoimentStatus })
  if (!appoint) throw new Error("Data Not found");
  return res.json({
    result: {
      message: "Appointmet Status Updated",
      data: appoint,
    }
  });
});
