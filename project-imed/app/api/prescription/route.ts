import tcWrap from "@/libs/utils/tcWrap";
import { Types } from "mongoose";
import prescriptionModal from "@/libs/models/prescriptionModal";
export const GET = tcWrap(async (req, res) => {
    const { page, limit, date, product, doctor } = req.query;

    let filter: any = [{ deletedAt: { $exists: false } }];

    if (product) {
        filter.push({
            item: product,
        });
    }
    if (doctor) {
        filter.push({
            doctor: product,
        });
    }

    if (date) {
        let [gt, lt] = date.split("|");
        gt = gt && new Date(gt);
        lt = lt && new Date(lt);
        console.log({ gt, lt })
        filter.push({
            createdAt: {
                ...(gt && { $gte: gt }), ...(lt && { $lte: lt })
            },
        });
    }

    const { data, meta } = await prescriptionModal.find({ $and: filter })
        .populate("item", "name codename")
        //@ts-ignore
        .paginate({ page, limit })//"item"

    return res.json({
        result: {
            message: "Prescription",
            data,
            meta,
        }
    });
});

export const POST = tcWrap(async (req, res) => {
    const body = await req.json();
    console.log("body::", body);
    if (!body.doctor) throw new Error("Doctor required");
    if (!body.user) throw new Error("User required");
    if (!body.items) throw new Error("items required");
    if (!Types.ObjectId.isValid(body.doctor)) {
        throw new Error("field `Doctor` invalid");
    }
    if (!Types.ObjectId.isValid(body.user)) {
        throw new Error("field `User` invalid");
    }
    const item = await prescriptionModal.create(body);
    console.log(item, "reqbody", body);
    return res.json({ result: { message: "Prescription added Successfully", item }});
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

    const item = await prescriptionModal.findByIdAndUpdate(id, body, {
        new: true, runValidators: true
    });
    console.log("item", item);

    console.log("reqbody", body);
    return res.json({ result: { message: "item updated to Prescription", item } });
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
    const findItem = await prescriptionModal.findById(body.id);
    if (!findItem) throw "Invalid Prescription item."
    const item = await prescriptionModal.findByIdAndDelete(
        body.id
    );
    console.log("item", item);

    console.log("reqbody", body);
    return res.json({ result: { message: "Prescription item deleted.", item } });
});