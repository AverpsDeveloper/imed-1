import mongoose, { Document, model, Model, Schema } from "mongoose";
import { getCongig } from "@/libs/config/dbInit";

export interface Iitem extends Document {
  itemType?: string;
  type?: string,
  alternativeName?: string;
  form?: string;
  dispanseForm?: string;
  category?: any;
  name?: string;
  altName?: string;
  codeName?: string;
  presetQuantity?: string;
  buildCostPrUnit?: number;
  fixedQty?: number;
  prefQtyOne?: any;
  prefQtyTwo?: any;
  prefQtyThree?: any;
  retailPrice?: number;
  saving?: number;
  strength?: String;
  yearLimit?: number;
  measureUnit?: string;
  description?: string;
  repeatConsult?: boolean;
  isActive?: boolean;
  deletedAt?: any;
  totalCount?: number;
  unitOfMeasure?: string;
  images?: any;
}

const itemSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, "Please Enter Item Type"],
    },
    name: {
      type: String,
      unique: true,
      required: [true, "Please Enter Item Name"],
    },
    altName: {
      type: String,
      // required: [true, "Please select alternative Name"],
    },
    codeName: {
      type: String,
      required: [true, "Please Enter Item Name"],
    },
    categories: {
      type: [{ type: String }],
      required: [true, "Please item Category"],
    },
    healthConditions: {
      type: [{ type: String }],
    },
    tags: {
      type: [{ type: String }],
    },
    form: {
      type: String,
      required: [true, "Please Enter form Type"],
    },
    dispanseForm: {
      type: String,
      required: [true, "Please item dispanseForm type"],
    },
    buildCostPrUnit: {
      type: Number,
      required: [true, "Please enter build Cost Pr Unit"],
    },
    prefQtyOne: {
      type: {
        qty: { type: Number },
        buildCost: { type: Number },
        sellingPrice: { type: Number },
        saving: { type: Number }
      },
      required: true,
    },
    prefQtyTwo: {
      type: {
        qty: { type: Number },
        buildCost: { type: Number },
        sellingPrice: { type: Number },
        saving: { type: Number }
      },
      required: true,
    },
    prefQtyThree: {
      type: {
        qty: { type: Number },
        buildCost: { type: Number },
        sellingPrice: { type: Number },
        saving: { type: Number }
      },
      required: true,
    },
    prefQtyFixed: {
      type: {
        qty: { type: Number },
        buildCost: { type: Number },
        sellingPrice: { type: Number },
        saving: { type: Number }
      },
      required: true,
    },
    retailPrice: {
      type: Number,
      required: [true, "Please enter retail price"],
    },
    strength: {
      type: String,
      required: [true, "Please enter strength "],
    },
    measureUnit: {
      type: String,
    },
    description: {
      type: String,
    },
    yearLimit: {
      type: Number
    },
    repeatConsult: {
      type: Boolean,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: undefined,
    },
    thumbnail: {
      type: String
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.Item ||
  model("Item", itemSchema)) as Model<Iitem>;