import mongoose, { Document, model, Model, Schema } from "mongoose";
import paginationPlugin from "../utils/paginationPlugin";

export interface IPropsType extends Document {
    username?: string;
    email?: string;
    phone?: string;
    isActive?: boolean;
    deletedAt?: any;
}

const adminUserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        firstName: {
            type: String,
            required: [true, "Please Enter First Name"],
        },
        lastName: {
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
        phoneNumber: {
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
        avatar: {
            type: String
        },
        senior: {
            type: Schema.Types.ObjectId
        },
        // address: [{
        //     ref: "UserAddress",
        //     type: Schema.Types.ObjectId,
        // }],
        address: { type: String },
        speciality: { type: String },
        role: { type: String, require: true },
        isActive: {
            type: Boolean,
            default: false
        },
        lastActive: {
            type: Date,
            default: Date.now
        },
        availableHours: { type: String },
        availablity: [{
            start: String,
            end: String,
            duration: { type: Number, max: 180, min: 0 }
        }],
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


adminUserSchema.plugin(paginationPlugin);


export default (mongoose.models.AdminUser ||
    model("AdminUser", adminUserSchema)) as Model<IPropsType>;
