import mongoose from "mongoose";

import * as dotenv from 'dotenv' 
dotenv.config();

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
    saveUninitialized: false, 
}))

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const url = `mongodb+srv://andjiao:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.rujjilh.mongodb.net/recipes`;
 
mongoose.set('strictQuery', true);
mongoose.connect(url)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'))

import  recipeRouter from "./routes/recipeRoute.js";
app.use("api/recipes", recipeRouter)

import  memberRoute from './routes/memberRoute.js';
app.use('/api/members', memberRoute);


import reviewRoute from "./routes/reviewRoute.js";
app.use("/api/reviewRecipe", reviewRoute);



/* 

import signinRoute from "./routes/signinRoute.js";
app.use("/api", signinRoute)


import myListsRoute from "./routes/myListsRoute.js";
app.use("/api/members/myLists", myListsRoute) */


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT,(error)=>{
    if(error){
        console.log(error)
    }
    console.log("Server is running on port", server.address().port)
})