
import mongoose from 'mongoose'
const { Schema } = mongoose;

const reviewSchema = mongoose.Schema(
    {
      name: { type: String },
      rating: { type: Number },
      comment: { type: String },
      member: {
       type: Schema.Types.ObjectId,
       ref: 'member',
             },
     },
    {
      timestamps: true,
    }
  )

  export default reviewSchema;