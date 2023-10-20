import itemModel from "@/libs/models/itemModel";
import categoryModal from "@/libs/models/categoryModal";
import tcWrap from "@/libs/utils/tcWrap";
import { Types } from "mongoose";
import adminConfModel from "@/libs/models/adminConfModel";

export const GET = tcWrap(async (req, res) => {
    const { search, category, type, price, page, limit } = req.query;
    const paginat = {
        page: +page <= 0 ? 0 : parseInt(page, 10) - 1,
        limit: parseInt(limit, 1000) || 1000
    }
    let filter: any = [{ deletedAt: { $exists: false } }];
    if (search) {
        filter.push({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { altName: { $regex: search, $options: "i" } },
                { codeName: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ],
        });
    }

    if (type) {
        filter.push({ type });
    }
    if (price) {
        const [gt, lt] = price.split("-");
        filter.push({
            retailPrice: { $gte: +gt, ...(lt && { $lte: +lt }) },
        });
    }
    if (category) {
        console.log("category", category);
        if (Types.ObjectId.isValid(category)) {
            filter.push({
                category: { $in: [category] },
            });
        }
    }
    const [inventroy, total]: any = await Promise.all([
        itemModel.find({ $and: filter }, '',
            {
                skip: paginat.page * paginat.limit,
                limit: paginat.limit
            }),
        itemModel.count({ $and: filter })
    ]);

    return res.json({
        result: {
            message: "inventry",
            data: inventroy,
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
    if (!body.products) {
        throw new Error("field products required");
    }
    if (!Array.isArray(body.products)) {
        throw new Error("field `products` invalid");
    }

    const admin: any = await adminConfModel.findOne();

    const keyMap: any = {
        "type": "type",
        "name": "name",
        "alternativename": "altName",
        "form": "form",
        "dispanseForm": "dispanseForm",
        "category": "category",
        "itemcode": "codeName",
        "manufactureprice": "buildCostPrUnit",
        "preferredquantityon": "fixedQty",
        "preferredquantityone": "prefQtyOne",
        "preferredquantitytwo": "prefQtyTwo",
        "preferredquantitythree": "prefQtyThree",
        "retailPrice": "retailPrice",
        "strength": "strength",
        "yearLimit": "yearLimit",
        "measureUnit": "measureUnit",
        "description": "discription",
        "repeatConsult": "repeatConsult",
        "status": "isActive",
        "images": "images"
    }


    const bulkdata = body.products?.map((product: any) => {
        const modifiedProduct: any = {};
        for (let d in product) {
            modifiedProduct[keyMap[d.trim().replace(/\s/g, '')]] = product[d];
        }
        return ({
            ...modifiedProduct,
            prefQtyFixed: convertPrefQty(modifiedProduct, modifiedProduct.prefQtyFixed, admin.charge),
            prefQtyOne: convertPrefQty(modifiedProduct, modifiedProduct.prefQtyOne, admin.charge),
            prefQtyTwo: convertPrefQty(modifiedProduct, modifiedProduct.prefQtyTwo, admin.charge),
            prefQtyThree: convertPrefQty(modifiedProduct, modifiedProduct.prefQtyThree, admin.charge),
        })
    })
    console.log("bulkdata", bulkdata)
    const item = await itemModel.create(bulkdata);
    console.log("reqbody", body);
    return res.json({ result: { message: "item added to inventory", item } });
});



const convertPrefQty = (body: any, value: number, charge: any) => {
    const buildCost = body.buildCostPrUnit * value;
    const sellingPrice = (buildCost * charge.serviceRate) + charge.serviceCharge;
    return {
        qty: value,
        buildCost,
        sellingPrice,
        saving: body.retailPrice - sellingPrice
    }
}


