import mongoose, { Document, Model, Schema } from 'mongoose';

type userType  =Document &{
    name: string,
    email: string,
    password: string
}

const userSchema:Schema<userType> = new Schema({
    name: String,
    email: String,
    password: String
})

const appUserModel:Model<userType> = mongoose.model("appUser", userSchema);

export default appUserModel;