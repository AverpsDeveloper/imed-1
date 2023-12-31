import appointModel from "@/libs/models/appointModel";
import tcWrap from "@/libs/utils/tcWrap";

export const POST = tcWrap(async (req, res) => {
    const { id } = req.params;
    // const body = await req.json()
    const data = await appointModel.findByIdAndUpdate(id, { isCancel: true });
    if (!data) throw new Error("something went wrong");
    return res.json({
        result: {
            message: "apointment Cancel",
            data: data,
        },
    }, { status: 201 });
});
