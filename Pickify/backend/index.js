import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

let app = express()
let port = process.env.PORT

app.get('/', (req,res)=>{
    res.send("This is the home page of our Server")
})

app.listen(port,()=>{
    console.log(`The server is run on port:${port}`);
})