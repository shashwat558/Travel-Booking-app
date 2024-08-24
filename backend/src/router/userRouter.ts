import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt, {JwtPayload} from 'jsonwebtoken';
import  dotenv from 'dotenv';


import express from "express";
import appUserModel from "../db/userModel";
const router = express.Router();
dotenv.config()
const jwtSecret = process.env.JWT_SECRET;

router.post("/register", async(req:Request, res:Response) => {
    const {name, email, password} = req.body;
    if(!(email||password)){
        return res.status(400).json({message: "Please provide the required data"})
    }
    try{
        const userExists = await appUserModel.findOne({email});
        if(userExists){
            return res.json(409).json({message: "user already exist. Please sign-in"})
        }
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = bcrypt.hash(password, salt)
        const user =  await appUserModel.create({name, email, password: hashedPassword});
        res.status(200).json({message: "User created succesfully", user});
        

    }catch(err){
        console.log(err)
    }

})

router.post('/sign-up', async(req:Request, res:Response) => {
    const {email, password} = req.body;
    if(!(email||password)){
        return res.status(500).json({message: "Please provide username and password"});
    }
    try{
        const existingUser = await appUserModel.findOne({email});
        if(!existingUser){
            return res.status(404).json({message: "Email does not exist"});
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword){
            return res.status(500).json({message: "Incorrect username or password"})
        }
        const token = jwt.sign({email, id: existingUser._id}, jwtSecret as string);
        res.cookie("token", token)
        res.status(200)
         

    }catch(err){
        console.log(err)
    }
})


