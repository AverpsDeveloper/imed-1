import mongoose, { Document, model, Model, Schema } from 'mongoose'

export interface inventoryCategoryProps extends Document {
    categoryName : String,
    status: String,
}

const inventoryCategory = new Schema({
    categoryName : {
        type: String,
        unique : true,
        required: [true, "Please Enter Name"],
    },
    categoryStatus : {
        type: String,
        required: [true, "Please Enter Name"],
    }
},{
    timestamps: true,
})

export const InventoryCategoryModel = (mongoose.models.inventoryCategorys ||
    model('inventoryCategorys', inventoryCategory)) as Model<inventoryCategoryProps>