//require('dotenv').config({path:'./env'})
import express from 'express'
const app=express();
import dotenv from "dotenv"
import connectDB from "./db/connection.js"

dotenv.config({
    path:'./env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Servering is running at port:${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongo db connection failed !!!",err)
})
























//IFE we professional people start IFE they put ; so that previous line may or 
//not have ; so their is no error
// ;(async()=>{
//     try {
//          await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     } catch (error) {
//         console.error("Error:",error)
//     }
// })()
