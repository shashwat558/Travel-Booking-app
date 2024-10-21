import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt, {JwtPayload} from 'jsonwebtoken';
import  dotenv from 'dotenv';
import download from 'image-downloader';
import fs from 'fs';
import multer, { Multer } from "multer";


import express from "express";
import appUserModel from "../db/userModel";
import authMiddleware, { CustomRequest } from "../middleware";
import path from "path";
import placeModel from "../db/placeModel";
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
        console.log("hahs")
        if(userExists){
            return res.json(409).json({message: "user already exist. Please sign-in"})
        }
        const salt = await bcrypt.genSalt(8);
        const hashedPassword =await bcrypt.hash(password, salt)
        const user =  await appUserModel.create({name, email, password: hashedPassword});
        res.status(200).json({message: "User created successfully", user});
        

    }catch(err){
        console.log(err)
    }

})

router.post('/login', async(req:Request, res:Response) => {
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
        
        const token = jwt.sign({email, id: existingUser._id.toString()}, jwtSecret as string);
        
        

        res.cookie("token", token)
        return res.status(200).json({existingUser})
         

    }catch(err){
        console.log(err)
    }
})

router.get('/profile', authMiddleware,async(req:CustomRequest, res:Response) => {

    console.log("ehy")
    try{
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        //@ts-ignore
        const user = await appUserModel.findById(req.user?.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
    }
)

router.post('/logout', (req:Request, res:Response)=> {
    res.clearCookie('token').json(true);
    res.status(200).json({message: "Logged out successfully"})
})


router.post('/uploadByLink', async(req: Request, res: Response) => {
    
    try{
        const { link } = req.body;
        
        const imageName ="image" +  Date.now() + '.jpg'
        const dest = path.join(__dirname, 'uploads', imageName)
    
    const options = await download.image({
        url: link,
        dest: dest
    })
    
    res.status(200).json(imageName as string)
    
} catch(err){
    console.log(err)
    res.status(500).json({message: "oo"})
}})

const dest = path.join(__dirname, 'uploads')
const photoMiddleware = multer({dest: dest})
router.post('/upload', photoMiddleware.array('photos', 100),(req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[] | undefined;
    const uploadFiles: string[] = [];
    if (!files || !Array.isArray(files)) {
        return res.status(400).json({ message: 'No files uploaded' });
    }
    for(let i = 0; i< files?.length; i++){
        const {path, originalname} = files[i]
        console.log(files)
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        fs.renameSync(path, newPath);
        uploadFiles.push(newPath.replace('uploads/', ''))
        console.log(uploadFiles)
    }
    return res.status(200).json(uploadFiles)
    

})

router.post('/places', authMiddleware, async(req:CustomRequest, res:Response) => {
   try {
    const {title, address, description, perks, addedPhotos, extraInfo, maxGuest, checkIn, checkOut} = req.body;
    console.log(req.body);
    //@ts-ignore
    const user = await appUserModel.findById(req.user.id);
    const userId = user?._id;
    const username = user?.name;
    const newPlace = await placeModel.create({
        owner: userId,
        ownerName:  username || "John",       
        title, address, description, perks, addedPhotos, extraInfo, maxGuest, checkIn, checkOut
    })
    res.status(200).json(newPlace)
   } catch (error) {
    console.log(error)
    
   }
    
})

router.get('/places', authMiddleware, async(req: CustomRequest, res:Response) => {
    //@ts-ignore
    const user = await appUserModel.findById(req.user?.id);
    const userId = user?._id;
    const getPlaces = await placeModel.find({owner: userId});
    console.log(getPlaces);
    res.json(getPlaces);

});

router.get('/places/:id', async(req:Request, res: Response) => {
   const {id} = req.params;
   const place = await placeModel.findById(id);
   res.status(200).json(place);
})

export default router;