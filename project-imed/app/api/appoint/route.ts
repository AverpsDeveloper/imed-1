import appointModel from "@/libs/models/appointModel";
import userModel from "@/libs/models/userModel";
import { genMeeting } from "@/libs/utils/meetingUtils";
import tcWrap from "@/libs/utils/tcWrap";
import moment from "moment";


export const GET = tcWrap(async (req, res) => {
    const { search, page, limit, date, doctor } = req.query;

    let filter: Record<string, Object>[] = [{ isCancel: false }];

    // if (search) {
    //     filter.push({
    //         $or: [
    //             { name: { $regex: search, $options: "i" } },
    //             { description: { $regex: search, $options: "i" } },
    //         ],
    //     });
    // }
    if (doctor) {
        filter.push({ doctor })
    }

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
    const meet = await genMeeting({
        "topic": "Doctor Appointment",
        "type": 2,
        // "start_time": "2024-02-30",
        "start_time": moment().format('yyyy-mm-dd'),
        "duration": 30,
        "timezone": "America/Mexico_City",
        "password": ""
    });
    console.log("meet", meet);
    const data = await appointModel.create({ ...body, meetDetial: meet });
    if (!data) throw new Error("something went wrong");
    return res.json({
        result: {
            message: "apointment done",
            data: data,
        },
    }, { status: 201 });
});
