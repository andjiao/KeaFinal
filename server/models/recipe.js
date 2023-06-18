import Joi from 'joi';

import mongoose from 'mongoose'
const { Schema } = mongoose;

import ingredientSchema from './schema/ingredientSchema.js';
import categorySchema from './schema/categorySchema.js';

const recipeSchema = new mongoose.Schema({
    title: String,
    prepTime: String,
    numbPersons: Number,
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

const Recipe = mongoose.model("recipes", recipeSchema);

function validateRecipe(memberSchema) {
    const schema = Joi.object({
      title:Joi.string().min(2).max(255).required(),
      prepTime:Joi.string(),
      numbPersons:Joi.number(),
      numbIngre:Joi.number(),
      ingredients: Joi.array(),
      method: Joi.string(),
      categories: Joi.array(),
      type: Joi.array(),
      rating: Joi.number(),
      numbReview: Joi.number(),
      level: Joi.string()
   
    });
  
    return schema.validate(memberSchema);
  }




export {Recipe, validateRecipe as validate};