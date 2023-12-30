import appointModel from "@/libs/models/appointModel";
import userModel from "@/libs/models/userModel";
import tcWrap from "@/libs/utils/tcWrap";


export const GET = tcWrap(async (req, res) => {
    const { search, page, limit, date } = req.query;

    let filter: Record<string, Object>[] = [{}];
    
    // if (search) {
    //     filter.push({
    //         $or: [
    //             { name: { $regex: search, $options: "i" } },
    //             { description: { $regex: search, $options: "i" } },
    //         ],
    //     });
    // }

    if (date) {
        let [gt, lt] = date.split("|");
        gt = gt && new Date(gt);
        lt = lt && new Date(lt);
        console.log({ gt, lt })
        filter.push({
            date: {
                ...(gt && { $gte: gt }), ...(lt && { $lte: lt })
            },
        });
    }
    const { data, meta } = await appointModel.find({ $and: filter })
        .populate("doctor user")
        //@ts-ignore
        .paginate({ page, limit });
    if (!data) throw new Error("something went wrong");
    return res.json({
        result: {
            message: "apointment done",
            data, meta,
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
