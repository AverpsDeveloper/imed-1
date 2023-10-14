import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IPropsType extends Document {
    name?: string;
    email?: string;
    phone?: string;
    isActive?: boolean;
    deletedAt?: any;
}

const adminUserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Name"],
        },
        email: {
            unique: true,
            type: String,
        },
        password: {
            type: String,
        },
        phone: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: false
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        bio: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

export default (mongoose.models.adminUser ||
    model("adminUser", adminUserSchema)) as Model<IPropsType>;
