import mongoose, { Document, model, Model, Schema } from "mongoose";
import paginationPlugin from "../utils/paginationPlugin";

export interface IPropsType extends Document {
    name?: string;
    description?: string;
    isActive?: boolean;
    deletedAt?: any;
}

const prescriptionSchema = new Schema(
    {
        doctor: {
            type: Schema.Types.ObjectId,
            ref: "AdminUser",
            required: true,
        },
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

prescriptionSchema.plugin(paginationPlugin);
export default (mongoose.models.Prescription ||
    model("Prescription", prescriptionSchema)) as Model<IPropsType>;
