import appointModel from "@/libs/models/appointModel";
import userModel from "@/libs/models/userModel";
import tcWrap from "@/libs/utils/tcWrap";


export const GET = tcWrap(async (req, res) => {

    const data = await appointModel.find({}).populate("doctor user");
    if (!data) throw new Error("something went wrong");
    return res.json({
        result: {
            message: "apointment done",
            data: data,
        },
    }, { status: 201 });
});

export const POST = tcWrap(async (req, res) => {
    const body = await req.json()
    if (!body.doctor) throw new Error("Doctor required");
    if (!body.user) throw new Error("User required");
    if (!body.date) throw new Error("Date required");

    const isExist = await appointModel.findOne({ user: body.user, date: body.date });

    if (isExist) {
        if (isExist.doctor._id == body.doctor) {
            throw new Error("Already booked with this Doctor");
        } else {
            throw new Error("Already booked with Other Doctor");
        }
    }

    const data = await appointModel.create(body);
    if (!data) throw new Error("something went wrong");
    return res.json({
        result: {
            message: "apointment done",
            data: data,
        },
    }, { status: 201 });
});
