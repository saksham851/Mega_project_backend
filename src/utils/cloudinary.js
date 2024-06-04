import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';    

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret
});

const uploadOnCloudinary=asyn(localFilePath)
{
    try {
        if(!localFilePath)return null
        //upload on cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded successfully.
          return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) //removed the locally saved fie temporary file as the 
        //upload operation got failed
        return null;
    }
}

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });

//   export {cloudinary};