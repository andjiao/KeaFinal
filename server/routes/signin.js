
import _ from "lodash"
import express from 'express';

const router = express.Router();

import { Member, validate } from "../models/member.js";
import { comparePassword, hashingPassword } from '../middleware/passwordSecurity.js';

router.post('/signup', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let newMember = await Member.findOne({ email: req.body.email });
  if (newMember) return res.status(400).send('Member already registered.');
  
  newMember = new Member(_.pick(req.body, ['firstName','lastName', 'email','password','isAdmin']));
  newMember.password = await hashingPassword(req.body.password);
  
  await newMember.save();
  res.send(newMember)
})

router.post('/login', async (req, res) => {
  try {
    let member = await member.findOne({ email: req.body.email });
    const validatePassword = await comparePassword(req.body.password, member.password);

    if (!member || !validatePassword) {
      return res.status(400).send({message: 'Invalid email or password.'})
    }else{
      req.session.isAdmin === member.isAdmin
      res.status(200).send({ data: {id: member.id, email: member.email, password: member.password, isAdmin:member.isAdmin} })
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

export default router