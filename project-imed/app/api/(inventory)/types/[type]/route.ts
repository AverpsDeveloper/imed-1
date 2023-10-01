import tcWrap from "@/libs/utils/tcWrap";
import appConfigModel from "@/libs/models/appConfigModel";

const valiedTypes = ["itemTypes", "formTypes", "unitsTypes","strengthTypes"];
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
    console.log("body:::",body);
    
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
        console.log("data:::",data.typeConfig["strengthTypes"]);
        
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
    if (!body.name) {
        throw new Error("field `name` required!");
    }
    if (!body.update) {
        throw new Error("field `update` required!");
    }
    const find: any = await appConfigModel.findOne();
    const typ = find?.typeConfig[type];

    if (typ.length && !typ.includes(body.name)) {
        throw new Error("field `name` not found");
    }

    const index = typ.indexOf(body.name)
    console.log("index", index, typ);

    const data: any = await appConfigModel.findByIdAndUpdate(find.id,
        {

            [`typeConfig.${type}.${index}`]: body.update

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

