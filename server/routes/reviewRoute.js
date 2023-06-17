
import _ from 'lodash'

import express from 'express';
const router = express.Router();

// import {checkingUser} from "../utill/auth.js"
 import ReviewRecipe from '../models/reviewRecipe';
router.use(checkingUser)

// api/recipes/'287920323'


// get recipeByID
router.get('/:id', async (req, res) => {
  const recipe = await ReviewRecipe.findById(req.params.id);

  if(recipe){
    res.json(recipe)
  } else{
    res.status(400).send('The recipe with the given ID was not found.');
  }
});

// create RecipeReview
router.post('/review', async (req, res) => {
    const { rating } = req.body;

    const reviewRecipe = await ReviewRecipe.findById(req.params.id)

    if(reviewRecipe){
        const alreadyReviewed = reviewRecipe.reviews.find(
            (rev) = rev.member.toString() === req.member._id.tostring()
        )

        if(alreadyReviewed){
            res.status(400).send("ReviewRecipe already reviewed")
        }
    
    const rev ={
        name: req.member.firstName,
        rating: Number(rating),
        member: req.member._id
    }

    reviewRecipe.reviews.push(rev)

    reviewRecipe.numbReview = reviewRecipe.reviews.length

    reviewRecipe.rating =
    reviewRecipe.reviews.reduce((acc,item) => item.rating +acc, 0)/
    reviewRecipe.reviews.length

    await reviewRecipe.save()
    res.status(201).json({message: "review added"})  

}
else{
    res.status(400).send("ReviewRecipe not found")

    }
    
});


export default router;