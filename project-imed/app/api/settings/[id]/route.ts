import tcWrap from "@/libs/utils/tcWrap";
import adminConfModel from "@/libs/models/adminConfModel";

export const GET = tcWrap(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new Error("field `id` required");
    }
    const data: any = await adminConfModel.findOne();
    return res.json({ result: { message: id, data: data[id] } });
});

export const POST = tcWrap(async (req, res) => {
    const { id } = req.params;
    const body = await req.json();

    if (!body) {
        throw new Error("fields  required!");
    }

    const find: any = await adminConfModel.findOne();

    const data: any = await adminConfModel.findByIdAndUpdate(find.id,
        {
            [id]: body
        }, { new: true });
    return res.json({ result: { message: `${id} updated`, data: data[id] } });
});