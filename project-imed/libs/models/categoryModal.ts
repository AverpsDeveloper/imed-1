import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IPropsType extends Document {
  title: String;
  status: String;
}

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Please Enter Name"],
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.category ||
  model("category", categorySchema)) as Model<IPropsType>;
