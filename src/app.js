import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser';
const app=express()

//middleware 
app.use(cors({
    origin:process.origin.CORS_ORIGIN,
    credentials:true,
}))
 
app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extented:true,limit:"16kb"}))

app.use(express.static('public'))

app.use(cookieParser())

//routes import 
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter)

//For understanding
//http://localhost:8000/api/v1/users/register
//http://localhost:8000/user/api/v1/users/login



export {app}