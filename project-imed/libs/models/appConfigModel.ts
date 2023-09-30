import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IModel extends Document {
  appVersion: String;
  typeConfig: any;
}

const appConfigSchema = new Schema(
  {
    appVersion: String,
    typeConfig: {
      itemTypes: [{ type: String }],
      unitsTypes: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.appConfig ||
  model("appConfig", appConfigSchema)) as Model<IModel>;
