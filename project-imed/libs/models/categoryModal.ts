import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IPropsType extends Document {
  name?: string;
  description?: string;
  isActive?: boolean;
  deletedAt?: any;
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
    parent: {
      type: Schema.Types.ObjectId, ref: "category"
    }
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.category ||
  model("category", categorySchema)) as Model<IPropsType>;
