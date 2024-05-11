import tagModel from "@/libs/models/tagModel";
import tcWrap from "@/libs/utils/tcWrap";
import { Types } from "mongoose";

export const GET = tcWrap(async (req, res) => {
    const { search, name } = req.query;
    let filter: any = [{ deletedAt: { $exists: false } }];
    if (search) {
        filter.push({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ],
        });
    }
    if (name) {
        filter.push({
            name: name
        });
    }
    const data = await tagModel.find({ $and: filter });
    return res.json({ result: { message: "tags", data: data } });
});

export const POST = tcWrap(async (req, res) => {
    const body = await req.json();
    if (body.tags && !body.tags.length) {
        throw new Error("field tags can't empty");
    }
    if(body.status == "active"){
        body.isActive = true;
    }else{
        body.isActive = false;
    }
    const item = await tagModel.create(
        body.tags
            ? body.tags : { ...body }
    );
    console.log("reqbody", body);
    return res.json({ result: { message: "item add to tags", item } });
});

export const PUT = tcWrap(async (req, res) => {
    console.log("put");
    const body = await req.json();
    const id = body.id;
    if(body.status == "active"){
        body.isActive = true;
    }else{
        body.isActive = false;
    }
    if (!id) {
        throw new Error("field `id` required");
    }
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("field `id` invalid");
    }
 
    let bodyData = body;

    console.log("bodyData", bodyData);
    const data = await tagModel.findByIdAndUpdate(id, bodyData, {
        new: true,
    });
    console.log("item", data);

    console.log("reqbody", body);
    return res.json({ result: { message: "item updated to tags", data } });
});

export const DELETE = tcWrap(async (req, res) => {
    console.log("delete");
    const body = await req.json();
    console.log("BBB",body);
    
    if (!body.id) {
        throw new Error("field `id` required");
    }
    if (!Types.ObjectId.isValid(body.id)) {
        throw new Error("field `id` invalid");
    }
    console.log("bodyData", body.id);
    const findItem: any = await tagModel.findById(body.id);
    if (findItem.deletedAt as any) {
        throw new Error("Aready deleted");
    }
    const item = await tagModel.findByIdAndDelete(
        body.id
    );
    console.log("item", item);

    console.log("reqbody", body);
    return res.json({ result: { message: "item delted to tags", item } });
});
