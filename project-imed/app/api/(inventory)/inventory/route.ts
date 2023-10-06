import itemModel from "@/libs/models/itemModel";
import categoryModal from "@/libs/models/categoryModal";
import tcWrap from "@/libs/utils/tcWrap";
import { Types } from "mongoose";

export const GET = tcWrap(async (req, res) => {
  const { search, category, type, price, page, limit } = req.query;
  const paginat = {
    page: +page <= 0 ? 0 : parseInt(page, 10) - 1,
    limit: parseInt(limit, 10) || 10
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
        category: { $all: [category] },
      });
    } else {
      const categoryDoc = await categoryModal.find({ name: category });
      filter.push({
        category: { $all: categoryDoc.map((d) => new Types.ObjectId(d._id)) },
      });
    }
  }
  const [inventroy, total]: any = await Promise.all([
    itemModel.find({ $and: filter }, '',
      {
        skip: paginat.page * paginat.limit,
        limit: paginat.limit
      }).populate('category', "name"),
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

  let cat: any;
  if (Array.isArray(body.category)) {
    if (!body.category.every((c: any) => Types.ObjectId.isValid(c))) {
      throw new Error("field categories is invalid!");
    }
  } else {
    console.log("category", body.category);// add if data aready axist
    const isCatExist: any = await categoryModal.findOne({ name: body.category });
    if (isCatExist) {
      if (isCatExist.deletedAt) {
        throw new Error("field category is deleted! change category or restore category");
      }
      cat = isCatExist;
    } else {
      cat = await categoryModal.create({ name: body.category });
    }
    console.log("categoryDoc", cat);
  }

  const item = await itemModel.create({
    ...body,
    ...(cat?._id && { category: cat._id }),
  });

  console.log("reqbody", body);
  return res.json({ result: { message: "item add to inventory", item } });
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
  let bodyData = {
    ...body,
    prefQtyOne: convertPrefQty(body, body.prefQtyOne),
    prefQtyTwo: convertPrefQty(body, body.prefQtyTwo),
    prefQtyThree: convertPrefQty(body, body.prefQtyThree),
  }

  if (Array.isArray(body.category)) {
    if (!body.category.every((c: any) => Types.ObjectId.isValid(c))) {
      throw new Error("field categories is invalid!");
    }
  } else {
    const getCat = async () => {
      const categoryDoc = await categoryModal.find({
        name: body.category,
      });
      return categoryDoc.map((d) => d._id);
    };
    bodyData = {
      ...bodyData,
      category: Types.ObjectId.isValid(body.category)
        ? [body.category]
        : await getCat(),
    };
  }

  console.log("bodyData::", bodyData);
  const item = await itemModel.findByIdAndUpdate(id, bodyData, {
    new: true, runValidators: true
  });
  console.log("item", item);

  console.log("reqbody", body);
  return res.json({ result: { message: "item updated to inventory", item } });
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
  const findItem: any = await itemModel.findById(body.id);
  if (findItem.deletedAt as any) {
    throw new Error("Aready deleted");
  }
  const item = await itemModel.findByIdAndUpdate(
    body.id,
    {
      deletedAt: new Date().toISOString(),
    },
    { new: true }
  );
  console.log("item", item);

  console.log("reqbody", body);
  return res.json({ result: { message: "item delted to inventory", item } });
});


const convertPrefQty = (body: any, value: number) => {
  console.log("body", body);
  const buildCost = body.buildCostPrUnit * value;
  const sellingPrice = (buildCost * 1.15) + 3;
  return {
    qty: value,
    buildCost,
    sellingPrice
  }
}


