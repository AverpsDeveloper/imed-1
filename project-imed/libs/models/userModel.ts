import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IPropsType extends Document {
    username?: string;
    email?: string;
    phone?: string;
    isActive?: boolean;
    deletedAt?: any;
}

const userSchema = new Schema(
    {
        
        username : {
            type: String,
            required: [true, "Please Enter Username"],
        },
        firstName : {
            type: String,
        },
        lastName : {
            type: String,
        },
        email : {
            unique: true,
            type: String,
            required: [true, "Please Enter Email"],
        },
        age : {
            type: String,
        },
        // DOB : {
        //     type: Date,
        // },
        gender : {
            type: String,
        },
        nationality : {
            type: String,
        },
        phoneNumber : {
            type: String,
        },
        idType : {
            type: String,
        },
        idNumber : {
            type: String,
        },
        postCode : {
            type: String,
        },
        unitCode : {
            type: String,
        },
        isAllergy : {
            type: Boolean,
        },
        isG6PD : {
            type: Boolean,
        },
        address : {
            type: String,
        },
        password: {
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
        // name: {
        //     type: String,
        // },
        // phone: {
        //     type: String,
        // },
        // hp: String,
        // dob: Date,
        // idType: String,
        // idNumber: String,
        // nationality: String,
        // address: String,
        // PostCode: String,
        // isAllergy: Boolean,
        // isG6PD: Boolean,
        // isLimousine: Boolean,
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
