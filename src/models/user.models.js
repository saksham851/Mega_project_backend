import mongoose ,{Schema} from "mongoose"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
const useSchema=new Schema({
   usename:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true,
   },
   email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
   },
   fullname:{
    type:String,
    required:true,
    trim:true,
    index:true,
   },
   avatar:{
    type:String, //clounary service we will use
    required:true,
   },
   coverImage:{
    type:String,
   },
   watchHistory:[{
    type:Schema.Types.ObjectId,
    ref:"Video"
   }],
   password:{
    type:String,
    required:[true,"Password is required"],
   },
   refreshToken:{
    type:String,
   }
},{timestamps:true})
//we didn't use arrow function in useSchema cause there in no this ka reference in it
//uusa context ka pta nhi hota..
useSchema.pre("save",async function(next){
    if(this.isModified("password"))
    this.password=await bcrypt.hash(this.password,10)
    next()
})

useSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

useSchema.methods.generateAccessToken=function(){
   jwt.sign(
    {
        _id:this._id,
        email:this.email,
        usename:this.usename,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
   )
}
useSchema.methods.refreshAccessToken=function(){
    jwt.sign(
        {
            _id:this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
       )
}
export const User=mongoose.model('User',useSchema)