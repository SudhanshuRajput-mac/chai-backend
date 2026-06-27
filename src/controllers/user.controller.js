import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js" 
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req , res) => {
    // get user details from fronted .
    // validation lagana padega -> not empty 
    // check if user alredy exist : username and email 
    // check for images , check for avatar
    // upload then to cloudinary 
    // create user object -> create entry in database . 
    // remove password and refresh token field from response . 
    // check for user creation 
    // return response 


    const {fullName,email,username , password} = req.body
    console.log("email" , email) ; 
    // console.log("password is " , password) ; 

    // write for all four and check them seperately . using if condition . 
    // if(fullName === ''){
    //     throw new ApiError(400 , "FullName is required") ; 
    // }

    // using some method of javascript . 

    if ([fullName , email , username , password].some( (val) => val.trim() === "")
    ) {
        throw new ApiError(400 , "All fields are required") 
    }

    const ExistedUser = User.findOne({
        $or: [{email} , {username}]
    })

    if(ExistedUser){
        throw new ApiError(409 , "User already exist with email and username")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path ; 
    const coverImageLocalPath = req.files?.coverImage[0]?.path ; 

    if (!avatarLocalPath) {
        throw new ApiError(400 , "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath) 

    if(!avatar) {
        throw new ApiError(400 , "Avatar file is required")
    }

    const user = await User.create({
        fullName , 
        avatar : avatar.url , 
        coverImage : coverImage.url || "" , 
        email , 
        password , 
        username : username.toLowerCase() 
    })

    const createdUserCheck = await User.findById(user._id).select(
        "-password -refershToken"
    )

    if(!createdUserCheck){
        throw new ApiError(500 , "something went worng while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200 , createdUserCheck , "User registered successfully")
    )
})

export {registerUser} 