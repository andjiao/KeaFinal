<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<script>
  import {BASE_URL} from "../store/globals.js"
  import * as Toastr from 'toastr'
  
import { Router,Link, useNavigate } from 'svelte-navigator';
const navigate = useNavigate()

let recipes = []
  
async function fetchRecipes() {

try {
  const response = await fetch(`${$BASE_URL}/recipes`)
  if(response.ok) {
    const result = await response.json();
    // $user.id = result.userid
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

function handleIcon(){
  // <i class="mi mi-favorite"> -- star
  // <i class="mi mi-heart"> -- star
    // select

}
    fetchRecipes()
  
</script>
<div>
  <ul>
    {#each recipes as recipe}
      <li>
        <Link to={`recipeDetails/${recipe._id}`}>{recipe.title}</Link>
      </li>
    {/each}
  </ul>          
    </div>
  