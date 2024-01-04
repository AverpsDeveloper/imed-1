import mongoose, { Document, model, Model, Schema, } from "mongoose";
import paginationPlugin from "../utils/paginationPlugin";

export interface IPropsType extends Document {
    name?: string;
    description?: string;
    isActive?: boolean;
}

const appointSchema = new Schema(
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
        description: {
            type: String,
        },
        date: {
            type: String,
            default: Date.now
        },
        status: {
            type: String
        },
        resone: [String],
        appointAt: {
            type: Date,
        },
        isExpired: Boolean,
        location: {
            String
        },
        reShedule: [Date],
        isActive: {
            type: Boolean,
            default: false
        },
        meetDetial:{
            type:Schema.Types.Mixed 
        },

        isCancel: {
            type: Boolean,
            default: false
        },

    },
    {
        timestamps: true,
    }
);

appointSchema.plugin(paginationPlugin);

export default (mongoose.models.appointment ||
    model<any, any>("appointment", appointSchema));
