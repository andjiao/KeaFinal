import _ from 'lodash'

import express from 'express';
const router = express.Router();

import {checkingUser} from "../utill/auth.js"
router.use(checkingUser)

import  MyList from "../models/myList.js";

router.get('/', async (req, res) => {
    const myLists = await MyList.find().sort('name');
    res.send(myLists);
  });

  router.get('/:id', async (req, res) => {
    const myList = await MyList.findById(req.params.id);
  
    if (!myList) return res.status(404).send('The myList with the given ID was not found.');
  
    res.send(myList);
  });


  router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const myList = await myList.findByIdAndUpdate(req.params.id,{
      name: req.body.name,
      recipes: req.body.recipes //TODO how to add or delete an item in an array??????
    });
  
    if (!myList) return res.status(404).send('The myList with the given ID was not found.');
    res.send(myList)
  }
  )

   router.delete('/:id', async (req, res) => {
    const myList = await MyList.findByIdAndRemove([req.params.id]);
  
    if (!myList) 
    return res.status(404).send('The myList with the given ID was not found.');
  
  
    res.send(myList);
  });

  export default router;