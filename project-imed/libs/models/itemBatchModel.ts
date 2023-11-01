import mongoose, { Document, model, Model, Schema, } from "mongoose";
import paginationPlugin from "../utils/paginationPlugin";

export interface IPropsType extends Document {
    name?: string;
    description?: string;
    isActive?: boolean;
}

const itemBatchSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, "Please Enter Name"],
        },
        item: { type: Schema.Types.ObjectId, ref: "Item" },
        description: {
            type: String,
        },
        qty: {
          type:  Number
        },
        arriveAt: {
            type: Date,
        },
        location: {
            String
        },
        isActive: {
            type: Boolean,
            default: false
        },
        batchCost: { type: Number },
        sellingPrice: { type: Number },

    },
    {
        timestamps: true,
    }
);

itemBatchSchema.plugin(paginationPlugin);

export default (mongoose.models.ItemBatch ||
    model<any, any>("ItemBatch", itemBatchSchema));
