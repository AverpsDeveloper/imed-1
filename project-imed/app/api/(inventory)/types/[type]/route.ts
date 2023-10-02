import tcWrap from "@/libs/utils/tcWrap";
import appConfigModel from "@/libs/models/appConfigModel";

const valiedTypes = ["itemTypes", "formTypes", "unitsTypes"];
export const GET = tcWrap(async (req, res) => {
    const { type } = req.params;
    if (!type) {
        throw new Error("field `type` required");
    }
    if (!valiedTypes.includes(type)) {
        throw new Error("field `type` invalid");
    }
    const data: any = await appConfigModel.findOne();
    return res.json({ result: { message: "inventry", data: data?.typeConfig[type] ?? [] } });
});

export const POST = tcWrap(async (req, res) => {
    const { type } = req.params;
    const body = await req.json();
    if (!type) {
        throw new Error("field `type` required!");
    }

    if (!valiedTypes.includes(type)) {
        throw new Error("field `type` invalid!");
    }
    if (!body.name) {
        throw new Error("field `name` required!");
    }
    const find: any = await appConfigModel.findOne();
    const typ = find?.typeConfig[type];

    if (typ.length && typ.includes(body.name)) {
        throw new Error("field `name` already exist");
    }

    const data: any = await appConfigModel.findByIdAndUpdate(find.id,
        {
            $addToSet: {
                [`typeConfig.${type}`]: body.name
            }
        }, { new: true });
    return res.json({ result: { message: `item added to ${type}`, data: data.typeConfig[type] } });
});

export const PUT = tcWrap(async (req, res) => {
    const { type } = req.params;
    const body = await req.json();
    if (!type) {
        throw new Error("field `type` required!");
    }
    if (!valiedTypes.includes(type)) {
        throw new Error("field `type` invalid!");
    }
    if (!body.target) {
        throw new Error("field `target` required!");
    }
    if (!body.name) {
        throw new Error("field `name` required!");
    }
    const find: any = await appConfigModel.findOne();
    const typ = find?.typeConfig[type];

    if (typ.length && !typ.includes(body.target)) {
        throw new Error("field `target` not found");
    }

    const index = typ.indexOf(body.target)
    console.log("index", index, typ);

    const data: any = await appConfigModel.findByIdAndUpdate(find.id,
        {
            [`typeConfig.${type}.${index}`]: body.name
        }, { new: true });
    return res.json({ result: { message: `item added to ${type}`, data: data.typeConfig[type] } });
});

export const DELETE = tcWrap(async (req, res) => {
    const { type } = req.params;
    const body = await req.json();
    if (!type) {
        throw new Error("field `type` required!");
    }
    if (!valiedTypes.includes(type)) {
        throw new Error("field `type` invalid!");
    }
    if (!body.name) {
        throw new Error("field `name` required!");
    }
    const find: any = await appConfigModel.findOne();
    const typ = find?.typeConfig[type];

    if (typ.length && !typ.includes(body.name)) {
        throw new Error("field `name` not found");
    }

    const data: any = await appConfigModel.findByIdAndUpdate(find.id,
        {
            $pull: {
                [`typeConfig.${type}`]: body.name
            }
        }, { new: true });
    return res.json({ result: { message: `item deleted to ${type}`, data: data.typeConfig[type] } });
});

