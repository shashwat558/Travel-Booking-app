import mongoose, { Schema, Document, model, Model } from "mongoose";

type IplaceType =Document & {
    
    title: string,
    address: string,
    photos: [string],
    description: string,
    perks: [string],
    extraInfo: string,
    checkIN: number,
    checkOut: number,
    maxGuest: number,

}

const placeSchema:Schema<IplaceType> = new Schema({
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIN: Number,
    checkOut: Number,
    maxGuest: Number
})


const placeModel:Model<IplaceType> =mongoose.model("Places", placeSchema)

export default placeModel;