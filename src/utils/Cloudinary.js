import { v2 as cloudinary } from 'cloudinary';
import fs from "fs" 

 // Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null 

        // upload the file o cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath ,{
            resource_type : "auto"
        })
        // file has uploaded sucessfully 
        console.log("file is uploaded on cloudinary" , response.url) ;
        return response ;  
        // console.log(response.)
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally save temporary file 
        // as the upload operation got failed . 
        return null ;
    }
}

export {uploadOnCloudinary}