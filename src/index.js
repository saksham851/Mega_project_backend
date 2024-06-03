//require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import connectDB from "./db/connection.js"

dotenv.config({
    path:'./env'
})


connectDB()
























//IFE we professional people start IFE they put ; so that previous line may or 
//not have ; so their is no error
// ;(async()=>{
//     try {
//          await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     } catch (error) {
//         console.error("Error:",error)
//     }
// })()
