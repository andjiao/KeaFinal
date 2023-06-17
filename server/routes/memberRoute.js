import _ from 'lodash'

import * as dotenv from 'dotenv' 
dotenv.config();

import express from 'express';
const router = express.Router();

import  { Member, validate } from "../models/member.js";
import { comparePassword, hashingPassword } from '../utill/passwordSecurity.js';


router.post('/signup', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let newMember = await Member.findOne({ email: req.body.email });
  if (newMember) return res.status(400).send('Member already registered.');
  
  newMember = new Member(_.pick(req.body, ["firstName","lastName","email","password", "isAdmin"]));
  newMember.password = await hashingPassword(req.body.password);
  
  await newMember.save();
  res.send(newMember)
})


router.post('/login', async (req, res) => {
  try {
    let member = await Member.findOne({ email: req.body.email });
    const validatePassword = await comparePassword(req.body.password, member.password);

    if (!member || !validatePassword) {
      return res.status(400).send({message: 'Invalid email or password.'})
    }else{
      res.status(200).send({ data: {id: member.id, firstName: member.firstName, lastName: member.lastName, email: member.email, password:member.password, isAdmin: member.isAdmin} })
      return
            
        }
    } catch (error) {
     
      res.status(500).send({ message: "Server error." })
    }

  });


router.post("/logout", (req, res) => {
  try {
      req.session.destroy()
      res.send({ message: "Logged out." })    
  } catch {
      res.status(500).send("Server error")
  }
})





router.get('/', async (req, res) => {
  const members = await Member.find().sort('firstName');
  res.send(members);
});

router.get('/:id', async (req, res) => {
  const member = await member.findById(req.params.id);

  if (!member) return res.status(404).send('The member with the given ID was not found.');

  res.send(member);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const member = await member.findByIdAndUpdate(req.params.id,{
    firstName: req.body.firstName,
    lastName: req.body.lasttName,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });

  if (!member) return res.status(404).send('The member with the given ID was not found.');

  res.send(member)
}
)

router.delete('/:id', async (req, res) => {
  const member = await Member.findByIdAndRemove([req.params.id]);

  if (!member) 
  return res.status(404).send('The member with the given ID was not found.');


  res.send(member);
});

export default router;
