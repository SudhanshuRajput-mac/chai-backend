import mongoose, { Schema } from "mongoose"
import Jwt from "jsonwebtoken"
import bcrypt from "bcrypt" 

const userSchema = new mongoose.Schema({
    username : {
        type : String , 
        required : true , 
        lowercase : true , 
        unique: true,
        trim: true,
        lowercase: true,
        index : true
        // minlength: [3, "Minimum 3 characters"],
        // maxlength: [20, "Maximum 20 characters"],
        // match: [/^[a-z0-9_]+$/, "Invalid username"]
    }, 
    email : {
        type : String , 
        required : true , 
        lowercase : true , 
        unique: true,
        trim: true,
        lowercase: true,
    }, 
    fullName :  {
        type : String , 
        required : true , 
        trim: true,
        index : true
    },
    avatar : {
        type : String , // cloudinary url 
        required : true 
    }, 
    coverImage : {
        type : String , // cloudinary url 
    }, 
    watchHistory : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "Video"
        }
    ],
    password : {
        type : String , 
        required : [true , "Password is required"]
    }, 
    refreshToken : {
        type : String 
    }
} ,
{timestamps : true}
)
// using arrow function we can face many problems due to this keyword . 
// since it is middleware so we need next . 
userSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next() ; 
    this.password = await bcrypt.hash(this.password , 10)
    next() ; 
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}

// acess token schema me injected . 
userSchema.methods.generateAcessToken = function(){
    return Jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET ,
        //expiary object ke indar jata hai 
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
// refresh_token me kam cheje rahte hai . 
userSchema.methods.generateRefreshToken = function(){
    return Jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET ,
        //expiary object ke indar jata hai 
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User" , userSchema) 