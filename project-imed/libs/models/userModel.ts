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
        hp: String,
        dob: Date,
        idType: String,
        idNumber: String,
        nationality: String,
        address: String,
        PostCode: String,
        isAllergy: Boolean,
        isG6PD: Boolean,
        isLimousine: Boolean,

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
