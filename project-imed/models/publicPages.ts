import mongoose, { Document, model, Model, Schema } from 'mongoose'

export interface PublicPages extends Document {
    page : String,
    slug: String,
    title: String,
    metaTitle: String,
    metaDescription: String,
    Description: String,
    published: Boolean,
}

const pagesSchama = new Schema({
    page : {
        type: String,
        unique:true,
        required: [true, "Please Enter Page Name"],
    },
    title : {
        type: String,
        required: [true, "Please Enter Page Name"],
    },
    slug: {
        type: String,
        unique:true,
        required: [true, "Please Enter SEO slug"],
        maxLength: [60, "Slug cannot exceed 60 characters"],
    },
    metaTitle: {
        type: String,
        required: [true, "Please Enter metaTitle"],
        maxLength: [60, "metaTitle cannot exceed 60 characters"],
    },
    metaDescription: {
        type: String,
        required: [true, "Please Enter metaTitle"],
        maxLength: [60, "metaTitle cannot exceed 60 characters"],
    },
    description: {
        type: String
    },
    published: {
        type: Boolean,
        required: [true, "You Want to Publish This Page."],
    },
},{
    timestamps: true,
})

export const PagesModel = (mongoose.models.Page ||
    model('Page', pagesSchama)) as Model<PublicPages>