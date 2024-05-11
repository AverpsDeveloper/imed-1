import appointModel from "@/libs/models/appointModel";
import prescriptionModal from "@/libs/models/prescriptionModal";
import userModel from "@/libs/models/userModel";
import tcWrap from "@/libs/utils/tcWrap";


export const GET = tcWrap(async (req, res) => {
    const body = await req.json();
    const id = req.params;

    const data = await prescriptionModal.find({});
    if (!data) throw new Error("something went wrong");
    return res.json({
        result: {
            message: "precription list",
            data: data,
        },
    }, { status: 201 });
});

export const POST = tcWrap(async (req, res) => {
    const body = await req.json()
    if (!body.doctor) throw new Error("Doctor required");
    if (!body.user) throw new Error("User required");

    // const isExist = await prescriptionModal.findOne(req.body);
    // if (isExist) {
    //     //@ts-ignore
    //     if (isExist.doctor._id == body.doctor) {
    //         throw new Error("Already booked with this Doctor");
    //     } else {
    //         throw new Error("Already booked with Other Doctor");
    //     }
    // }

    const data = await prescriptionModal.create(body);
    if (!data) throw new Error("something went wrong");
    return res.json({
        result: {
            message: "prescription done",
            data: data,
        },
    }, { status: 201 });
});
