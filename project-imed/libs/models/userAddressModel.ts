import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IPropsType extends Document {
  name?: string;
  description?: string;
  isActive?: boolean;
}

const userAddressSchema = new Schema(
  {
    house: {
      type: String,
    },
    type: {
      type: String,
      trim: true
    },
    street: {
      type: String,
      unique: true,
      required: [true, "Please Enter Name"],
    },
    landmark: {
      type: String,
      unique: true,
      required: [true, "Please Enter Name"],
    },
    pincode: {
      type: String,
    },
    city: {
      type: String
    },
    district: {
      type: String
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    discription: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false
    },
    phone: [{
      type: String
    }],
    email: [{
      type: String
    }],
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.UserAddress ||
  model("UserAddress", userAddressSchema)) as Model<IPropsType>;
