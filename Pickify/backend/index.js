import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/DB.js'
dotenv.config()

let app = express()
let port = process.env.PORT || 5000

app.get('/', (req,res)=>{
    res.send("This is the home page of our Server")
})

app.listen(port,()=>{
    console.log(`The server is run on port:${port}`);
    connectDB()
})
