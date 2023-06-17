import Joi from'joi';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const memberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "name is required"],
    minlength: 2,
    maxlength: 255,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
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
  },
  recipes:[
    {type: Schema.Types.ObjectId, ref:"recipe"}
  ],
  myLists:[
    {type: Schema.Types.ObjectId, ref:"myList"}
  ]
});
const Member = mongoose.model("member", memberSchema);


function validateMember(memberSchema) {
  const schema = Joi.object({
    firstName:Joi.string().min(2).max(255).required(),
    lastName:Joi.string().min(2).max(255).required(),
    email:Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin:Joi.boolean(),
  });

  return schema.validate(memberSchema);
}


/* function validateMember(memberSchema) {
  const schema = Joi.object({
    firstName:Joi.string().min(2).max(255).required(),
    lastName:Joi.string().min(2).max(255).required(),
    email:Joi.string().min(5).max(255).required().email(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    .messages({
      "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
        "string.empty": `Password cannot be empty`,
        "any.required": `Password is required`,
    }),
    repeatPassword: Joi.ref('password'),
    isAdmin:Joi.boolean(),
  });

  return schema.validate(memberSchema);
} */

export {Member, validateMember as validate};

/* repeatPassword: Joi.valid(memberData.password).messages({
  "any.only": "The two passwords do not match",
  "any.required": "Please re-enter the password",
}) */

