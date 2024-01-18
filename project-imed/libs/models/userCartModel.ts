import mongoose, { Document, model, Model, Schema } from "mongoose";
import paginationPlugin from "../utils/paginationPlugin";

export interface IPropsType extends Document {
    name?: string;
    description?: string;
    isActive?: boolean;
    deletedAt?: any;
}

const userCartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        items: {
            type: [
                {
                    item: { type: Schema.Types.ObjectId, ref: "Item" },
                    qty: Number,
                    desc: String,
                }
            ],
            _id: false
        },
        description: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: false
        },
        deletedAt: { type: Date } 
    },
    {
        timestamps: true,
    }
);

userCartSchema.plugin(paginationPlugin);
export default (mongoose.models.UserCart ||
    model("UserCart", userCartSchema)) as Model<IPropsType>;
