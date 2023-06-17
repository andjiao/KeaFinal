
import mongoose from 'mongoose'
import reviewSchema from './schema/reviewSchema';
const { Schema } = mongoose;


const reviewRecipeSchema = new mongoose.Schema({
        member:{
            type: Schema.Types.ObjectId,
       ref: 'member',
        },
    title: String,
    reviews: [reviewSchema],
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

const ReviewRecipe = mongoose.model("reviewRecipe", reviewRecipeSchema);


export default ReviewRecipe;