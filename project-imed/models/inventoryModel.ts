import mongoose, { Document, model, Model, Schema } from 'mongoose'

export interface inventryProps extends Document {
    page : String,
    slug: String,
    title: String,
    metaTitle: String,
    metaDescription: String,
    Description: String,
    published: Boolean,
}

const inventrySchema = new Schema({
    itemName : {
        type: String,
        required: [true, "Please Enter Name"],
    },
    alternativeName : {
        type: String,
        required: [true, "Please select Category Name"],
    },
    itemCategory: {
        type: String,
        required: [true, "Please Enter SEO slug"],
        maxLength: [60, "Slug cannot exceed 60 characters"],
    },
    form: {
        type: String, //Form (Tab/ caps/ Bottle / pack / Unit etc )
        required: [true, "Please Enter metaTitle"],
        maxLength: [60, "metaTitle cannot exceed 60 characters"],
    },
    Strength : {
        type: String, //Strength (same drug different potency, for eg 10mg 20mg 40mg)   
        required: [true, "Please Enter metaTitle"],
        maxLength: [60, "metaTitle cannot exceed 60 characters"],
    },
    productDescription : {
        type: String, //Strength (same drug different potency, for eg 10mg 20mg 40mg)   
        required: [true, "Please Enter metaTitle"],
        maxLength: [60, "metaTitle cannot exceed 60 characters"],
    },
    unitOfMeasure : {
        type: String, //Strength (same drug different potency, for eg 10mg 20mg 40mg)   
        required: [true, "Please Enter metaTitle"],
        maxLength: [60, "metaTitle cannot exceed 60 characters"],
    },
    price : {
        type: Number, //Strength (same drug different potency, for eg 10mg 20mg 40mg)   
        required: [true, "Please Enter metaTitle"],
        maxLength: [60, "metaTitle cannot exceed 60 characters"],
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