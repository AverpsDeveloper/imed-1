import mongoose, { Document, model, Model, Schema } from "mongoose";

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
        item: { type: Schema.Types.ObjectId, ref: "item" },
        description: {
            type: String,
        },
        qty: {
            Number
        },
        arriveAt: {
            Date
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

export default (mongoose.models.itemBatch ||
    model("itemBatch", itemBatchSchema)) as Model<IPropsType>;
