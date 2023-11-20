import mongoose, { Document, model, Model, Schema, } from "mongoose";
import paginationPlugin from "../utils/paginationPlugin";

export interface IPropsType extends Document {
    name?: string;
    description?: string;
    isActive?: boolean;
}

const itmeChild = new Schema({
    item: { type: Schema.Types.ObjectId, ref: "Item" },
    qty: Number
}, { _id: false });

const orderSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "user" },
        items: [itmeChild],
        orderStatus: {
            type: String,
            default: "initial"
        },
        paymentId: { type: String, unique: true },
        paymentUrl: String,
        paymentStatus: String,
        amount: Number,
        isPaid: { type: Boolean, default: false },
        address: {
            String
        },
        description: {
            type: String,
        },
        discount: {
            type: Number
        },
        payments: [{ type: Schema.Types.Mixed }],
        dispatchAt: { type: Date },
        deliverAt: { type: Date },
        totalPrice: { type: Number },
    },
    {
        timestamps: true,
    }
);

orderSchema.plugin(paginationPlugin);

export default (mongoose.models.Order ||
    model<any, any>("Order", orderSchema));
