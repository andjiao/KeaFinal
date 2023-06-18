// import Joi from 'joi';


import mongoose from 'mongoose'
const { Schema } = mongoose;

import ingredientSchema from './schema/ingredientSchema.js';
import categorySchema from './schema/categorySchema.js';

const recipeSchema = new mongoose.Schema({
    title: String,
    rating:{
        type: Number,
        default: 0,
    },
});

const Recipe = mongoose.model("recipes", recipeSchema);


export default Recipe;