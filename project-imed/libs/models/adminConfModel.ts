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
        smtp: {
            google: {
                email: String,
                password: String,
            }
        },
        site: {
            name: String,
            url: String,
            adminEmail: String,
            supportEmail: String,
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
