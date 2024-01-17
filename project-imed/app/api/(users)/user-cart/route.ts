import prescriptionModal from "@/libs/models/prescriptionModal";
import userCartModel from "@/libs/models/userCartModel";
import tcWrap from "@/libs/utils/tcWrap";


export const GET = tcWrap(async (req, res) => {
    const body = await req.json();

    const data = await userCartModel.find({});
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
    if (!body.user) throw new Error("User required");
    const isExist = await userCartModel.findOne({ user: req.body.user });
    const data = await userCartModel.findByIdAndUpdate(
        isExist?._id,
        body, { new: true, upsert: true, runValidators: true });
    if (!data) throw new Error("something went wrong");
    return res.json({
        result: {
            message: "Added to cart done",
            data: data,
        },
    }, { status: 201 });
});
export const PUT = tcWrap(async (req, res) => {
    const body = await req.json()
    if (!body.user) throw new Error("User required");

    const isExist = await userCartModel.findOne({ user: req.body.user });
    const data = await userCartModel.findByIdAndUpdate(
        isExist?._id,
        body, { new: true, upsert: true, runValidators: true });
    if (!data) throw new Error("something went wrong");
    return res.json({
        result: {
            message: "Refill to cart done",
            data: data,
        },
    }, { status: 201 });
});
