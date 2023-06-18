<script>
     import { BASE_URL } from "../store/globals.js"
     import * as Toastr from "toastr"
   

     const url = document.URL;
     const lastSegment = url.split("/").pop();
     const recipeId = lastSegment

     let recipe={};


    async function getRecipe() {
    try {
        const response = await fetch(`${$BASE_URL}/recipes/${recipeId}`, {
            headers: { 'Content-Type': 'application/json' }
        })
       if (response.ok) {
                const result = await response.json()
                recipe = result
                console.log(recipe)
              
            } else {
                Toastr.warning('could not get recipe.')
            }    
        
    } catch (error) {
        Toastr.error('failed to get recipe')
    }
    return recipe;
    
}

getRecipe();
    
   
</script>


<div>
    <h1>DEtails</h1>
    <br>
    <h2>{recipe.title}</h2>
    <br>

    <h2>{recipe.rating}</h2>
  
    </div>


  <style>

  </style>