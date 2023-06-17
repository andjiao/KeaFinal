import mongoose from 'mongoose'
const { Schema } = mongoose;

const myListSchema = new mongoose.Schema({
    name: String,
    recipes:[ 
        {type: Schema.Types.ObjectId, ref:"recipe"}
    ],
    } )

    const MyList = mongoose.model("myList", myListSchema);


export default MyList;