import express from "express" 

import cors from "cors" 
import cookieParser from "cookie-parser";
const app = express() ; 

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    Credential : true 
}))
// cofiguration karna hai . 
// json file ki limit set karna .
app.use(express.json({limit : "16kb"}))

// url configure 
app.use(express.urlencoded({extended: true , limit : '16kb'})) 

app.use(express.static("public"))

app.use(cookieParser())

// routes import 
import userRouter from './routes/user.routes.js'

// routes declaration 
app.use("/api/v1/users", userRouter)

// the url become 
// http://localhost:8000/api/v1/users/register

export {app}