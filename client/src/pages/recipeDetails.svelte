<script>
     import { BASE_URL } from "../store/globals.js"
     import * as Toastr from "toastr"
     import Star from "../components/star.svelte"
   

     const url = document.URL;
     const lastSegment = url.split("/").pop();
     const recipeId = lastSegment

     let recipe={};
     let ingredients =[]


    async function getRecipe() {
    try {
        const response = await fetch(`${$BASE_URL}/recipes/${recipeId}`, {
            headers: { 'Content-Type': 'application/json' }
        })
       if (response.ok) {
                const result = await response.json()
                recipe = result
                ingredients = result.ingredients;
                console.log(recipe.rating)

      // Convert recipe.ingredients to an array
      recipe.ingredients = Object.entries(recipe.ingredients).map(([key, value]) => ({ name: key, quantity: value }));
              
            } else {
                Toastr.warning('could not get recipe.')
            }    
        
    } catch (error) {
        Toastr.error('failed to get recipe')
    }
    return recipe;
    
}

getRecipe();

setTimeout(() => {
    recipe.rating = recipe.rating; // Update the rating dynamically
  }, 3000);
    
   
</script>


<div>
    <h1>{recipe.title}</h1>
    <br>
    <br>

    <ul>
        {#each ingredients as ingredient}
          <li>
            <h3>{ingredient.name}</h3>
            <p>{ingredient.quantity}</p>
          </li>
        {/each}
      </ul>
      <p>{recipe.method}</p>
      <Star rate={recipe.rating}/>
  
    </div>


  <style>

  </style>