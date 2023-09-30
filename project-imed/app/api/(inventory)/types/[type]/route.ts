import tcWrap from "@/libs/utils/tcWrap";
import appConfigModel from "@/libs/models/appConfigModel";

const valiedTypes = [""];
export const GET = tcWrap(async (req, res) => {
    const { type } = req.params;
    if (!type) {
        throw new Error("field `type` required");
    }
    const data: any = await appConfigModel.findOne();
    return res.json({ result: { message: "inventry", data: data?.typeConfig[type] ?? [] } });
});


