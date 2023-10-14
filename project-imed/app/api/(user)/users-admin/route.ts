import aminUserModel from "@/libs/models/aminUserModel";
import tcWrap from "@/libs/utils/tcWrap";
import { Types } from "mongoose";



export const GET = tcWrap(async (req, res) => {
    const { search, role, page, limit } = req.query;
    const paginat = {
        page: +page <= 0 ? 0 : parseInt(page, 10) - 1,
        limit: parseInt(limit, 10) || 10
    }
    let filter: any = [{ isBlocked: false }];
    if (search) {
        filter.push({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { bio: { $regex: search, $options: "i" } },
            ],
        });
    }

    if (role) {
        filter.push({ role });
    }

    const [data, total]: any = await Promise.all([
        aminUserModel.find({ $and: filter }, '',
            {
                skip: paginat.page * paginat.limit,
                limit: paginat.limit
            }),
        aminUserModel.count({ $and: filter })
    ]);

    return res.json({
        result: {
            message: "admin users",
            data: data,
            meta: {
                total,
                page: paginat.page + 1,
                limit: paginat.limit
            }
        }
    });
});


export const POST = tcWrap(async (req, res) => {
    const body = await req.json();
    console.log("body::", body);
    const item = await aminUserModel.create(body);
    console.log("reqbody", body);
    return res.json({ result: { message: "admin  user", item } });
});

export const PUT = tcWrap(async (req, res) => {
    console.log("put");
    const body = await req.json();
    const id = body.id;
    console.log("id", id);
    if (!id) {
        throw new Error("field id required");
    }
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("field `id` invalid");
    }
    // delete body.id;
    console.log("bodyData::", body);
    const item = await aminUserModel.findByIdAndUpdate(id, body, {
        new: true, runValidators: true
    });
    
    console.log("item", item);
    return res.json({ result: { message: "admin user update", item } });
});

export const DELETE = tcWrap(async (req, res) => {
    console.log("delete");
    const body = await req.json();

    if (!body.id) {
        throw new Error("field `id` required");
    }
    if (!Types.ObjectId.isValid(body.id)) {
        throw new Error("field `id` invalid");
    }
    console.log("bodyData", body.id);
    
    const item = await aminUserModel.findByIdAndDelete(
        body.id,
    );

    if (!item) {
        throw new Error("User not Found");
    }
   

    console.log("reqbody", body);
    return res.json({ result: { message: "admin User Deleted", item } });
});