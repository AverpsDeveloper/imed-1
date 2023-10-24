import mongoose, { Document, model, Model, Schema } from "mongoose";

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
