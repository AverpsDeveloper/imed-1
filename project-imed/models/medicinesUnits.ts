import mongoose, { Document, model, Model, Schema } from 'mongoose'

export interface medicinesUnitsProps extends Document {
    categoryName : String,
    status: String,
}

const medicinesUnits = new Schema({
    medicinesUnitsName : {
        type: String,
        unique : true,
        required: [true, "Please Enter Name"],
    },
    medicinesUnitsStatus : {
        type: String,
        required: [true, "Please Enter Name"],
    }
},{
    timestamps: true,
})

export const MedicinesUnitsModel = (mongoose.models.medicinesUnits ||
    model('medicinesUnits', medicinesUnits)) as Model<medicinesUnitsProps>