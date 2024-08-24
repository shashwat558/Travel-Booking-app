import mongoose, { Document, Model, Schema } from 'mongoose';

type userType  =Document &{
    name: string,
    email: string,
    password: string
}
type IUserDocument = userType & Document<{ _id: string }>

const userSchema:Schema<IUserDocument> = new Schema({
    name: String,
    email: String,
    password: String
})

const appUserModel:Model<IUserDocument> = mongoose.model("appUser", userSchema);

export default appUserModel;