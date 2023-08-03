import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


//initializing app
const app = express()
dotenv.config()

//connecting to mongodb
const Connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to mongoDB")
    }catch(error){
        throw error
    }
}

//code to run if mongodb connection is lost
mongoose.connection.on("disconnected",() => {
    console.log("mongoDB disconnected!")
})

//middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//endpoints for accessing the API





//error Handling middleware
app.use((err,req,res,next)=> {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})

//initializing server
app.listen(8000,() =>{
    console.log("Server Running")
    Connect()
})