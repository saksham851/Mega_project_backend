import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiError.js'
import {User} from '../models/user.models.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/apiResponse.js';

const registerUser=asyncHandler(async(req,res)=>{
   //get user detail from frontend   
   //validate the details provided by the user are up to the format not null check
   // check the user is already exist or not
   //check coverimage , check avatar
   //upload them on cloudinary ,avatar
   //create the user object =create a db entry
   //remove password filed and refresh token from the response
   //check if user is creation
   //return response

   const{fullname,email,usename,password}=req.body
   console.log("email:",email);
   

    //validation
   //  if(fullname ==="")
   //    {
   //       throw new ApiError(400,"fullname is reqiured")
   //    }

   //multiple if sa bacchna ka liya we use some method
   if ([fullname, email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(404, "All fields are compulsory");
  }
  
  //Now checking for user present before or not..

   const existedUser =User.findOne({
      $or:[{usename},{email}]
    })

    if(existedUser)
      {
         throw new ApiError(409,"User with this email or usename already exists");
      }

   //middleware req field me addition cheeza add karta ha 
   //added avatar image and cover image to local path public/temp
   const avatarLocalPath=req.files?.avatar[0]?.path;

   const coverImageLocalPath=req.files?.coverImage[0]?.path;

   if(!avatarLocalPath)
      {
         throw new ApiError(400,"Avatar file is complusory")
      }


   //Now upload image on cloudinay from local path
   const avatar= await uploadOnCloudinary(avatarLocalPath)
   const coverImage=await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar)
      {
         throw new ApiError(400,"Avatar file is complusory")
      }

   const user = await User.create({
      fullName,
      avatar:avatar.url,
      coverImage:coverImage?.url ||"",
      email,
      password,
      username:username.toLowerCase()
   })
   
  const createdUser=await User.findById(user._id).select(
   "-password -refreshToken"
  );

  if(!createdUser)
   {
      throw new ApiError(500,"something while registering user")
   }

   return res.status(201).json(
      new ApiResponse(200,createdUser,"User registered Succesfully")
   )
    

})  
   

export {registerUser}
