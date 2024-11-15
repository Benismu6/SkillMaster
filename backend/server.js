import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";

const app = express();
dotenv.config();
mongoose.set('strictQuery', true)

// console.log("MongoDB URI:", process.env.MONGODB);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Connected to mongoDB!")
    } catch (error) {
        console.log(error);
    }
}

app.use("/api/users", userRoute)

app.listen(3000, ()=>{
    connect();
    console.log("Backend server is running!")
})