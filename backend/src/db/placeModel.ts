import mongoose, { Schema, Document, model, Model } from "mongoose";
import appUserModel from "./userModel";

type IplaceType =Document & {
    owner: mongoose.Schema.Types.ObjectId,    
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
    owner: {type:mongoose.Schema.Types.ObjectId, ref:"appUser"},
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
