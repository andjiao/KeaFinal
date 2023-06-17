// import Joi from 'joi';


import mongoose from 'mongoose'
const { Schema } = mongoose;

import ingredientSchema from './schema/ingredientSchema.js';
import categorySchema from './schema/categorySchema.js';

const recipeSchema = new mongoose.Schema({
    title: String,
    prepTime: Number,
    numbPerson: Number,
    numbIngre: String,
    ingredients: [ingredientSchema],
    method: String,
    categories: [categorySchema],
    type:[String ],
    rating:{
        type: Number,
        default: 0,
    },
    numbReview: {
        type: Number,
        default:0,
    },
    level: String
});

const Recipe = mongoose.model("recipe", recipeSchema);


export default Recipe;