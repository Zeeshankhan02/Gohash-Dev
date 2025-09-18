import {v2 as cloudinary } from "cloudinary"
import fs from "fs"

 // Configuration
 cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_SECRET_KEY  
});


const uploadOnCloudinary=async (localFilePath) => {
  try {
    if (!localFilePath) return null

    // upload the file on cloudinary

    const response = await cloudinary.uploader.upload(localFilePath,{
      resource_type:"video",
      folder: "clientVideos"
    })

    // file has been uploaded successfully
    console.log("File is uploaded on cloudinary",response.secure_url);

     fs.unlinkSync(localFilePath) //deleting the video from the local server after successfull upload
    return response
  } catch (error) {
    fs.unlinkSync(localFilePath) // removes the locally saved temp file if the upload operatoin failed
    console.log(error);
    
    return null
  }
}

const deleteOnCloudinary=async(publicId)=>{
  const response = await cloudinary.uploader.destroy(publicId,{
    resource_type: "video",
  })

  if (!response) {
    throw new Error(500,"Error while deleting")
  }
  return response
}

export {uploadOnCloudinary,deleteOnCloudinary}