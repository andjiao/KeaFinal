import Joi from'joi';
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin:{
    type: Boolean,
    default:false,
    required: false,
  } 
});


const User = mongoose.model("User", userSchema);


function validateUser(userSchema) {
  const schema = Joi.object({
    email:Joi.string().min(5).max(255).required().email(),
    password:Joi.string().min(5).max(255).required(),
    isAdmin:Joi.boolean(),
  });

  return schema.validate(userSchema);
}

export {User, validateUser as validate};

