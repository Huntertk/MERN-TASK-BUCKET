import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import UserRoutes from './routes/userRouter.js'
import mongoose from 'mongoose'
import errorHandler from './error/errorHandler.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT

//Middlewares
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173', 
    credentials: true
}))
app.use(cookieParser())

//Api Endpoints
app.use("/api/v1/auth", UserRoutes)

app.use(errorHandler)

const dbConn = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Application is Connected to database successfully");
        app.listen(port, () => {
            console.log("Server is Running on PORT", port);
        })
    } catch (error) {
        console.log(error);
    }
}

dbConn()
