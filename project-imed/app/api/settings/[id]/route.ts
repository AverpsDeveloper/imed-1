import tcWrap from "@/libs/utils/tcWrap";
import adminConfModel from "@/libs/models/adminConfModel";

export const GET = tcWrap(async (req, res) => {
    const { type } = req.params;
    if (!type) {
        throw new Error("field `type` required");
    }
    const data: any = await adminConfModel.findOne();
    return res.json({ result: { message: type, data: data[type] } });
});

export const POST = tcWrap(async (req, res) => {
    const { type } = req.params;
    const body = await req.json();

    if (!body) {
        throw new Error("fields  required!");
    }
    
    const find: any = await adminConfModel.findOne();

    const data: any = await adminConfModel.findByIdAndUpdate(find.id,
        {
            $addToSet: {
                [type]: body
            }
        }, { new: true });
    return res.json({ result: { message: `${type} updated`, data: data[type] } });
});