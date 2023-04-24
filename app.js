import bodyParser from "body-parser"

import express from "express";
const app = express();

import cors from "cors";
app.use(cors({ credentials: true, origin: true }));

import helmet from "helmet"
app.use(helmet())

import session from "express-session"
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false, //if something goes wrong changes this to true
}))

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

import { connectDB } from "./database/connect.js";
connectDB()

import userRoute from "./routes/userRoute.js";
app.use(userRoute);


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT,(error)=>{
    if(error){
        console.log(error)
    }
    console.log("Server is running on port", server.address().port)
})