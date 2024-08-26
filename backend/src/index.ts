import express  from "express";
import cors from 'cors'
import cookieParser from'cookie-parser';
import userRouter from './router/userRouter';
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port:number = 8080;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

app.use('/api/user', userRouter);

app.listen(port, () => {console.log(`listening on the port ${port}`)})

mongoose.connect(process.env.DB_URL as string);


