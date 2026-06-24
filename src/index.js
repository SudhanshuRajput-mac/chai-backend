// Second Apporach 
// require('dotenv').config({path: './env'})

// using import statement 

import dotenv from "dotenv"
import { app } from "./app.js"

import connectDB from "./db/index.js"

dotenv.config({
    path: './env'
})


connectDB()
.then(() => {
    let portat = process.env.PORT || 8000 ; 
    app.listen( portat , () => {
        console.log(`Server is running at ${portat}`)
    })
})
.catch((error) => {
    console.log("Mongo db connection failled : " , error) ; 
})




// Apporach First
/*
import mongoose from "mongoose"

import { DB_NAME } from "./constants"

import express from "express"

const app = express()

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

        app.on("error" , (error)=>{
            console.log("Error : " , error);
            throw error ; 
        })

        app.listen(process.env.PORT , () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("Error occured in db connection : ",error)
    }
})()

*/