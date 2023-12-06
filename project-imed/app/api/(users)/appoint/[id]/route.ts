import appointModel from "@/libs/models/appointModel";
import userModel from "@/libs/models/userModel";
import tcWrap from "@/libs/utils/tcWrap";


export const GET = tcWrap(async (req, res) => {
    const { page, limit, date } = req.query;
    const id = req.params;


    let filter: Record<string, any>[] = [{ user: id }];

    if (date) {
        let [gt, lt] = date.split("|");
        gt = gt && new Date(gt);
        lt = lt && new Date(lt);
        console.log({ gt, lt })
        filter.push({
            arriveAt: {
                ...(gt && { $gte: gt }), ...(lt && { $lte: lt })
            },
        });
    }

    // @ts-ignore
    const { data, meta } = await appointModel.find({ $and: filter }).paginate({ page, limit });
    if (!data) throw new Error("something went wrong");
    return res.json({
        result: {
            message: "apointment done",
            data,
            meta
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
