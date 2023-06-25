<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<script>
  import {BASE_URL} from "../store/globals.js"
  import * as Toastr from 'toastr'
  
import { Router,Link, useNavigate } from 'svelte-navigator';
const navigate = useNavigate()


import Card from "../components/Card.svelte"

let recipes = [] 
async function fetchRecipes() {
try {
  const response = await fetch(`${$BASE_URL}/recipes`)
  if(response.ok) {
    const result = await response.json();
    recipes = result;
    } else {
        const data = await response.json()
        Toastr.warning(data.message)
    }
} catch (error) {
 Toastr.error('Something went wrong')
  
}
}
  export async function getRecipe(recipeId) {
    try {
        const response = await fetch(`${$BASE_URL}/recipes/${recipeId}`, {
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            const result = await response.json()
            const recipeId = result._id
            navigate(`/recipeDetails/${recipeId}`,{replace:true})
            
           
        } else {
            Toastr.warning('Unable to get recipe.')
        }
    } catch (error) {
      console.log(error)
        Toastr.error('Unable to get recipe')
    }
}
    fetchRecipes()

    function handleIconClick(recipeId, isIconActive) {
    // console.log(`Recipe ${recipeId} isIconActive: ${isIconActive}`);
  }

  
</script>


  {#each recipes as recipe}
  <Card 
  title={recipe.title} 
  rating ={recipe.rating}
  recipeId={recipe._id}
  />
  {/each}



<style>
 
</style>
 
  