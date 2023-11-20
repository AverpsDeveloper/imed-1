import tcWrap from "@/libs/utils/tcWrap";
import hitpay from "@/libs/config/getHitpay";
import orderModal from "@/libs/models/orderModal";
import itemBatchModel from "@/libs/models/itemBatchModel";



export const GET = tcWrap(async (req, res) => {
    const { reference } = await req.query;
    const { data } = await hitpay.getPayment(reference);

    const order = await orderModal.findOneAndUpdate({ paymentId: reference }, {
        paymentId: data.id,
        paymentUrl: data.url,
        paymentStatus: data.status,
        payments: data.payments,
        amount: data.amount,
        isPaid: true,
        orderStatus: "confirm",
    });
    console.log("order", order);

    const batchItem = await Promise.allSettled(
        order.items.map(
            (p: any) => itemBatchModel.findOneAndUpdate({ item: p.item }, { $inc: { qty: -p.qty ?? -1 } }, { new: true })
        ));

    console.log(batchItem, "batchItem");

    const isRejectedIndex = batchItem?.findIndex((d: any) => !d.value);
    if (isRejectedIndex !== -1) {
        const { data: refundData } = await hitpay.refundPayment({
            id: data.id,
            amout: data.amount,
        });
        console.log("refundData", refundData);
        throw new Error("item Exasted Your amount will be refunded");
    }

    return res.json({ result: { reference, order } }, { status: 200 });
});






