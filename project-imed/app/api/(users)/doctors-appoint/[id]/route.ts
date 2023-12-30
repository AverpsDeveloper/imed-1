import adminUserModel from "@/libs/models/adminUserModel";
import appointModel from "@/libs/models/appointModel";
import tcWrap from "@/libs/utils/tcWrap";
import moment from "moment";

export const GET = tcWrap(async (req, res) => {
    const { date } = req.query;
    const { id } = req.params;

    if (!id) throw new Error("doctor id required");
    const apointDate = date ?? moment().format("YYYY-MM-DD");
    let filter: Record<string, any>[] = [{ doctor: id }, {
        date: {
            $gte: apointDate, $lte: moment(apointDate).add(1, "d")
        },
    }];

    const [doctor, appointments]: any = await Promise.all([
        adminUserModel.findById(id),
        // @ts-ignore
        appointModel.find({ $and: filter })
    ]);

    const bookedAppontmentMap = appointments.reduce((acc: Record<string, any>, apoint: any) => {
        acc[String(apoint.date)] = 1;
        return acc;
    }, {});

    const availablity = doctor.availablity.map((d: any) => {
        const start = moment(`${apointDate} ${d.start}`, 'YYYY-MM-DD HH:mm');
        const from = moment(`${apointDate} ${d.start}`, 'YYYY-MM-DD HH:mm');
        const end = moment(`${apointDate} ${d.end}`, 'YYYY-MM-DD HH:mm');
        let slots = [];
        let isoString = '';
        for (let current = start; current <= end; current.add(d.duration ?? 30, 'm')) {
            isoString = current.toISOString();
            slots.push({
                isAvailable: !Boolean(bookedAppontmentMap[isoString]),
                time: current.toISOString()
            })
        }
        return { start: from, end, slots };
    });

    return res.json({
        result: {
            data: { apointDate, doctor, apointments: availablity },
            message: "apointment slots"
        },
    }, { status: 200 });
});