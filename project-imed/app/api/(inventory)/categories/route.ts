import categoryModal from "@/libs/models/categoryModal";
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
    const data = await categoryModal.find({ $and: filter });
    return res.json({ result: { message: "categories", data: data } });
});

export const POST = tcWrap(async (req, res) => {
    const body = await req.json();
    if (body.categories && !body.categories.length) {
        throw new Error("field categories can't empty");
    }
    if(body.status == "active"){
        body.isActive = true;
    }else{
        body.isActive = false;
    }
    const item = await categoryModal.create(
        body.categories
            ? body.categories : { ...body }
    );
    console.log("reqbody", body);
    return res.json({ result: { message: "item add to categories", item } });
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
    delete body.id;
    let bodyData = body;

    console.log("bodyData", bodyData);
    const data = await categoryModal.findByIdAndUpdate(id, bodyData, {
        new: true,
    });
    console.log("item", data);

    console.log("reqbody", body);
    return res.json({ result: { message: "item updated to categories", data } });
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
    const findItem: any = await categoryModal.findById(body.id);
    if (findItem.deletedAt as any) {
        throw new Error("Aready deleted");
    }
    const item = await categoryModal.findByIdAndUpdate(
        body.id,
        {
            deletedAt: new Date(),
        },
        { new: true }
    );
    console.log("item", item);

    console.log("reqbody", body);
    return res.json({ result: { message: "item delted to categories", item } });
});
