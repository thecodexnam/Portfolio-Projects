import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import cors from "cors"


let app = express()
let port = process.env.PORT || 5000
app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174"],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.get('/', (req,res)=>{
    res.send("This is the home page of our Server")
})

app.listen(port,()=>{
    console.log(`The server is run on port:${port}`);
    connectDB()
})
