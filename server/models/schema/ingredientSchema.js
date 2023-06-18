
import mongoose from 'mongoose'

const ingredientSchema = new mongoose.Schema({
    name: String,
    quantity: String
    } )


export default ingredientSchema;