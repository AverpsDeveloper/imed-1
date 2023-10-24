import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IPropsType extends Document {
    name?: string;
    email?: string;
    phone?: string;
    isActive?: boolean;
    deletedAt?: any;
}

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Name"],
        },
        role: {
            type: String,
            required: [true, "Please Enter Role"]
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

export default (mongoose.models.user ||
    model("user", userSchema)) as Model<IPropsType>;
