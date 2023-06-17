
import mongoose from 'mongoose'

const ingredientSchema = new mongoose.Schema({
    name: String,
    amount: String

    } )


export default ingredientSchema;