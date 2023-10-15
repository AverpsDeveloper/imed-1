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
        username: {
            type: String,
        },
        firstname: {
            type: String,
            required: [true, "Please Enter First Name"],
        },
        lastname: {
            type: String,
            required: [true, "Please Enter Last Name"],
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
        bio: {
            type: String,
        },
        age: {
            type: Number,
        },
        gender: {
            type: String
        },
        address: [{
            ref: "UserAddress",
            type: Schema.Types.ObjectId,
        }],
        isActive: {
            type: Boolean,
            default: false
        },
        isTfa: {
            type: Boolean,
            default: false
        },
        tfaHash: {
            type: String,
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
    }
);

export default (mongoose.models.AdminUser ||
    model("AdminUser", adminUserSchema)) as Model<IPropsType>;
