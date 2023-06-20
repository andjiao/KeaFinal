<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<script>
  import {BASE_URL} from "../store/globals.js"
  import * as Toastr from 'toastr'
  
  
import { Router,Link, useNavigate } from 'svelte-navigator';
const navigate = useNavigate()

import EditModal from './editModal.svelte';

import Modal from 'svelte-simple-modal'

let recipes = []

let titleInput="";
let methodInput =""
  
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
    fetchRecipes()

    async function updateRecipe(recipeId){

const body = {
          title: titleInput,
          method:methodInput ,
      }
      try {
          const response = await fetch(`${$BASE_URL}/recipes/${recipeId}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
      })

      if (!response.ok) {
          const json = await response.json()
          Toastr.warning(json.message)
          return
      } else{
        Toastr.success('Recipe Updated.')
        navigate(`/`,{replace:true})

      }
        
      } catch  {
          Toastr.error('Could not update')
          return
      }
}


    async function deleteRecipe(recipeId) {

try {
    const response = await fetch(`${$BASE_URL}/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) {
        const json = await response.json()
        Toastr.warning(json.message)
        return
    } else{
    recipes = recipes.filter(recipe => recipe.id != recipeId)
    }

    
} catch (error){
    Toastr.error('Could not delete student')
}
return recipes;

}
let isModalOpen = false;
  let selectedRecipeId = '';

function openModal(recipeId) {
    isModalOpen = true;
    selectedRecipeId = recipeId;
  }
  
</script>
<div>
  <ul>
    {#each recipes as recipe}
      <li>
        <Link to={`recipeDetails/${recipe._id}`}>{recipe.title}</Link>
        
       
        <form action="/">
          <button type="submit" id="deleteRecipe" class="btn btn-outline-danger btn-sm" on:click={(_id)=> deleteRecipe(recipe._id)}>
            <i class="mi mi-delete"><span class="u-sr-only"></span></i> 
          </button>
        </form> 

        <button id="updateRecipe" class="btn btn-outline-info btn-sm" on:click={()=>openModal(recipe._id)}>
          <i class="mi mi-edit-alt"><span class="u-sr-only"></span></i>    
        </button>

      </li>
    {/each} 
  
  </ul>   


  
    </div>
  