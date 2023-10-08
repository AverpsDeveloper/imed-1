import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IModel extends Document {
    appVersion: String;
    typeConfig: any;
}

const adminConfigSchema = new Schema(
    {
        appVersion: String,
        charge: {
            serviceCharge: Number,
            serviceRate: Number,
        },
        payment: {

        },
        aws: {

        }
    },
    {
        timestamps: true,
    }
);

export default (mongoose.models.adminConfig ||
    model("adminConfig", adminConfigSchema)) as Model<IModel>;
