
import _ from 'lodash'

import express from 'express';
const router = express.Router();

// import {checkingUser} from "../utill/auth.js"
// router.use(checkingUser)

import {Recipe, validate} from '../models/recipe.js'
// api/recipes/'287920323'


router.post('/createRecipe', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let newRecipe = new Recipe(_.pick(req.body, ["title", "preptime", "numbPersons", "numbIngre", "ingredients", "method", "categories", "type", "rating", "level"]));
    await newRecipe.save();
    res.send(newRecipe);
    console.log(newRecipe);
  } catch (err) {
    // Handle the error here
    console.error(err.message);
    res.status(500).send("An error occurred while creating the recipe.");
  }
});



// get recipeByID
router.get('/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if(recipe){
    res.json(recipe)
  } else{
    res.status(400).send('The recipe with the given ID was not found.');
  }
});

router.get('/', async (req, res) => {
    const recipes = await Recipe.find().sort('title');
    res.send(recipes);
  });



  router.put('/:id', async (req, res) => {
    // const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const recipe = await Recipe.findByIdAndUpdate(req.params.id,{
        
        title:req.body.title,
        preptime: req.body.preptime,
        numbPersons:req.body.numbPersons,
        numbIngre:req.body.numbIngre,
        ingredients:req.body.ingredients,
        method: req.body.method,
        categories: req.body.categories,
        type:req.body.type,
        rating:req.body.rating,
        level:req.body.level

    });

    if (!recipe) return res.status(404).send('The recipe with the given ID was not found.');

    res.send(recipe)
  }
  )

  router.delete('/:id', async (req, res) => {
    const recipe = await Recipe.findByIdAndRemove([req.params.id]);
  
    if (!recipe) 
    return res.status(404).send('The recipe with the given ID was not found.');

    res.send(recipe);
    console.log("recipe deleted")
  });
  
  export default router;