import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()
const jwtSecret = process.env.JWT_SECRET as string;



export interface CustomRequest extends Request {
    user?: string | JwtPayload;
   }

const authMiddleware = async (req:Request, res:Response, next: NextFunction) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: "Unauthorized access"})
    }

    try{

    const decoded = await jwt.verify(token, jwtSecret) as JwtPayload;
    if(decoded){
        (req as CustomRequest).user = decoded;
        next()       
    }
    } catch(err){
        console.error(err);
    }

}

export default authMiddleware;