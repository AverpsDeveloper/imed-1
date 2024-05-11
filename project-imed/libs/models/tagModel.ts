import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IPropsType extends Document {
  name?: string;
  description?: string;
  isActive?: boolean;
}

const tagSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.tag ||
  model("tag", tagSchema)) as Model<IPropsType>;
