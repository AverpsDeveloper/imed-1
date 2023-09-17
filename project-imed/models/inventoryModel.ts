import mongoose, { Document, model, Model, Schema } from 'mongoose'

export interface inventryProps extends Document {
    alternativeName:String,
    form:String,
    itemCategory:String,
    itemName:String,
    presetQuantity:String,
    price:Number,
    productDescription:String,
    unitOfMeasure:String,
}

const inventrySchema = new Schema({
    itemName : {
        type: String,
        required: [true, "Please Enter Item Name"],
    },
    alternativeName : {
        type: String,
        required: [true, "Please select alternative Name"],
    },
    itemCategory: {
        type: String,
        required: [true, "Please item Category"],
        maxLength: [60, "item category name cannot exceed 60 characters"],
    },
    form: {
        type: String,
        required: [true, "Please item form type"],
        maxLength: [60, "Form type cannot exceed 60 characters"],
    },

    productDescription : {
        type: String, 
        required: [true, "Please Enter Item Description"],
        maxLength: [60, "Item Description cannot exceed 60 characters"],
    },
    unitOfMeasure : {
        type: String,   
        required: [true, "Please enter unit Of Measure"],
        maxLength: [60, "unit Of Measure cannot exceed 60 characters"],
    },
    price : {
        type: Number, 
        required: [true, "Please Enter Price"],
    },
    medicineImages: [
        {
            type: String,
            url :  String
        } 
    ]
},{
    timestamps: true,
})

export const inventryModel = (mongoose.models.Inventry ||
    model('Inventry', inventrySchema)) as Model<inventryProps>