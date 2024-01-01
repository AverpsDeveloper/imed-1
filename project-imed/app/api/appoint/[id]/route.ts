import appointModel from "@/libs/models/appointModel";
import tcWrap from "@/libs/utils/tcWrap";


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
