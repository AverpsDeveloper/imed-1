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

const inventryModel = new Schema({
    name : {
        type: String,
        unique:true,
        required: [true, "Please Enter Page Name"],
    },
    category : {
        type: String,
        required: [true, "Please Enter Page Name"],
    },
    unitofMeasure: {
        type: String,
        unique:true,
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
    medicineimages: [
        {
            type: String,
            url :  String
        }
    ],
    published: {
        type: Boolean,
        required: [true, "You Want to Publish This Page."],
    },
},{
    timestamps: true,
})

export const PagesModel = (mongoose.models.Page ||
    model('Inventry', inventryModel)) as Model<inventryProps>