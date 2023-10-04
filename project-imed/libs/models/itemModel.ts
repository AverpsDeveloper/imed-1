import mongoose, { Document, model, Model, Schema } from "mongoose";
import { getCongig } from "@/libs/config/dbInit";

export interface Iitem extends Document {
  itemType: String;
  type: String,
  alternativeName: String;
  form: String;
  itemCategory: String;
  itemName: String;
  presetQuantity: String;
  price: Number;
  productDescription: String;
  unitOfMeasure: String;
}

const prefQtySchema: any = {
  type: {
    qty: { type: Number },
    buildCost: { type: Number },
    sellingPrice: { type: Number },
    saving: { type: Number }
  },
  set: function (value: number) {
    const buildCost = this.buildCostPrUnit * value;
    const sellingPrice = (buildCost * 1.15) + 3;
    return {
      qty: value,
      buildCost,
      sellingPrice
    }
  },
  required: true,
}

const itemSchema = new Schema(
  {
    type: {
      type: String,
      validate: {
        validator: async (v: string) =>
          getCongig()?.typeConfig?.itemTypes?.includes(v),

        message: "path `{PATH}` invalid enum value {VALUE}",
      },
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
      // required: [true, "Please Enter Item Name"],
    },
    category: {
      type: [{ type: Schema.Types.ObjectId, ref: "category" }],

      // required: [true, "Please item Category"],
      // maxLength: [60, "item category name cannot exceed 60 characters"],
    },
    form: {
      type: String,
      validate: {
        validator: async (v: string) =>
          getCongig()?.typeConfig?.formTypes?.includes(v),
        message: "path `{PATH}` invalid enum value {VALUE}",
      },
      required: [true, "Please Enter form Type"],
    },
    dispanseForm: {
      type: String,
      validate: {
        validator: async (v: string) =>
          getCongig()?.typeConfig?.fromTypes?.includes(v),
        message: "path `{PATH}` invalid enum value {VALUE}",
      },
      required: [true, "Please item dispanseForm type"],
    },
    buildCostPrUnit: {
      type: Number,
      required: [true, "Please enter build Cost Pr Unit"],
    },
    fixedQty: {
      type: Number,
      required: [true, "Please enter quantity prmoth"],
    },
    prefQtyOne: prefQtySchema,
    prefQtyTwo: prefQtySchema,
    prefQtyThree: prefQtySchema,
    retailPrice: {
      type: Number,
      set: function (value: number) {
        return this.fixedQty * this.buildCostPrUnit;
      },
      required: [true, "Please enter retail price"],
    },
    saving: {
      type: Number,
      set: function (value: number) {
        return this.retailPrice - this.prefQtyOne.sellingPrice;
      },
      required: [true, "Please enter saving"],
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
    totalCount: {
      type: Number,
      required: [true, "Please enter totalCount"],
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

export default (mongoose.models.item ||
  model("item", itemSchema)) as Model<Iitem>;