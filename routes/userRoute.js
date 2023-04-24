import _ from 'lodash'

import * as dotenv from 'dotenv' 
dotenv.config();

import express from 'express';
const router = express.Router();

import { User, validate } from "../database/models/user.js";
import { comparePassword, hashingPassword } from '../middleware/passwordSecurity.js';

import { renderPage } from '../render/render.js';

const signupPage = renderPage("/login/loginPage.html",
{
  tabTitle: "Signup Page",
  cssLink: `<link rel="stylesheet" href="/pages/login/login.css">`,
  scriptLink: ` <script src="/pages/login/login.js"></script>`,
   
});

router.get("/signup", (req,res) => {
  res.send(signupPage); 
})

router.post('/signup', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let newUser = await User.findOne({ email: req.body.email });
  if (newUser) return res.status(400).send('User already registered.');
  
  newUser = new User(_.pick(req.body, ['email','password','isAdmin']));
  newUser.password = await hashingPassword(req.body.password);
  
  await newUser.save();
  res.send(newUser)
})

export default router