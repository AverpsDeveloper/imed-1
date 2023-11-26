import tcWrap from "@/libs/utils/tcWrap";
import { Types } from "mongoose";
import orderModal from "@/libs/models/orderModal";
import itemBatchModel from "@/libs/models/itemBatchModel";
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import hitpay from "@/libs/config/getHitpay";
import itemModel from "@/libs/models/itemModel";


export const GET = tcWrap(async (req, res) => {
    const { search, arriveAt, price, page, limit, date, product } = req.query;

    let filter: Record<string, Object>[] = [{}];
    // if (search) {
    //     filter.push({
    //         $or: [
    //             { name: { $regex: search, $options: "i" } },
    //             { description: { $regex: search, $options: "i" } },
    //         ],
    //     });
    // }

    // if (product) {
    //     filter.push({
    //         item: product,
    //     });
    // }

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
    if (price) {
        const [gt, lt] = arriveAt.split("-");
        filter.push({
            sellingPrice: { $gte: +gt, ...(lt && { $lte: +lt }) },
        });
    }



    const { data, meta } = await orderModal.find({ $and: filter })
        .populate({ path: "items", populate: { path: "item", select: "name categories price" } })
        // @ts-ignore
        .paginate({ page, limit })

    return res.json({
        result: {
            message: "inventry",
            data,
            meta,
        }
    });
});

export const POST = tcWrap(async (req, res) => {
    const { items, user } = await req.json();
    // console.log("body::", body);
    if (!user) {
        throw new Error("field user required");
    }
    if (!Types.ObjectId.isValid(user)) {
        throw new Error("field user Invalid");
    }
    if (!items) {
        throw new Error("field itmeId required");
    }

    if (!items.every((d: { item: string, qty: number }) => Types.ObjectId.isValid(d.item))) {
        throw new Error("field `item` invalid");
    }

    const batchItem = await Promise.allSettled(
        items.map(
            (p: any) => itemBatchModel.findOne({ item: p.item, qty: { $gte: p.qty ?? 1 } }).populate("item")
        ))
    console.log(batchItem, "batchItem");

    const isRejectedIndex = batchItem?.findIndex((d: any) => !d.value);
    if (isRejectedIndex !== -1) {
        throw new Error(`item not avalable id:${items[isRejectedIndex].item}`);
    }

    const totalPrice = batchItem.reduce((acc: number, item: any) => {
        return acc + item.value.item.prefQtyFixed.sellingPrice
    }, 0).toFixed(2);
    console.log(totalPrice, "totalPrice");

    const { data } = await hitpay.createPayment({
        amount: totalPrice,
        currency: 'SGD',
        // webhook: "https://8120-103-176-136-222.ngrok-free.app/api/order-webhook",
        redirect_url: "http://localhost:3000/api/order-callback"
    });

    if (!data) {
        throw new Error("Unable to generate Payment");
    }

    console.log(data, "createPaymentRes");

    const order = await orderModal.create({
        user: user,
        items: items,
        paymentId: data.id,
        paymentUrl: data.url,
        paymentStatus: data.status,
        amount: totalPrice
    });
    console.log(order, "order");
    if (!order) {
        throw new Error("Unable to generat Order");
    }

    // return redirect(createPaymentRes.data as string);

    return res.json({ result: { data: order } });
});




