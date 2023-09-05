import mongoose, { Document, model, Model, Schema } from 'mongoose'

export interface PublicPages extends Document {
    page : String,
    title: String,
    slug: String,
    metaTitle: String,
    metaDescription: String,
    Description: String,
    published: Boolean,
}

const pagesSchama = new Schema({
    page : {
        type: String,
        required: [true, "Please Enter Page Name"],
    },
    title: {
        type: String,
        required: [true, "Please Enter Page Title"],
        minLength: [4, "Title should have more than 4 characters"],
        maxLength: [70, "Title cannot exceed 70 characters"],
    },
    slug: {
        type: String,
        required: [true, "Please Enter SEO slug"],
        minLength: [4, "Slug should have more than 4 characters"],
        maxLength: [60, "Slug cannot exceed 60 characters"],
    },
    metaTitle: {
        type: String,
        required: [true, "Please Enter metaTitle"],
        minLength: [4, "metaTitle should have more than 4 characters"],
        maxLength: [60, "metaTitle cannot exceed 60 characters"],
    },
    metaDescription: {
        type: String,
        required: [true, "Please Enter metaTitle"],
        minLength: [4, "metaTitle should have more than 4 characters"],
        maxLength: [60, "metaTitle cannot exceed 60 characters"],
    },
    Description: String,
    published: {
        type: Boolean,
        required: [true, "You Want to Publish This Page."],
    },
},{
    timestamps: true,
})

export const PagesModel = (mongoose.models.Page ||
    model('Page', pagesSchama)) as Model<PublicPages>