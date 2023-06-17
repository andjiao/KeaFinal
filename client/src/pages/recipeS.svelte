<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<script>
  import {BASE_URL} from "../store/globals.js"
  import * as Toastr from 'toastr'
  
import { Router,Link, useNavigate } from 'svelte-navigator';
const navigate = useNavigate()

let recipes = []
$:totalRecipes = recipes.length;

  
    async function fetchRecipes() {

        try {
          await fetch(`${$BASE_URL}`,{
            method: "GET",
            credentials:"include",
            headers:{"Content-Type": "application/json"},
          })
          .then(res => res.json())
          .then( data => {recipes = data.data}
          )
        } catch (error) {
         Toastr.error('Recipes not retrieved')
         console.log(error.message)
         console.log(recipes)
          
        }
    }

    async function deleteRecipe(id) {

        try {
            const response = await fetch(`${$BASE_URL}/recipes/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok) {
                const json = await response.json()
                Toastr.warning(json.message)
                return
            } else{
              recipes = recipes.filter(recipe => recipe.id != id)
            }

            
        } catch (error){
            Toastr.error('Could not delete recipe')
	    }
      return recipes;

    }
   
  export async function getRecipe(recipeId) {
    try {
        const response = await fetch(`${$BASE_URL}/recipes/${recipeId}`, {
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            const result = await response.json()
            const recipeId = result._id
            navigate(`/recipeUpdate/${recipeId}`,{replace:true})
            
           
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

    let searchedRecipe;

    $: searchedRecipes = searchedRecipe ? search : recipes;

$: search = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchedRecipe) 
    || recipe.abilities.toLowerCase().includes(searchedRecipe) 
    || recipe.whoToHelp.toLowerCase().includes(searchedRecipe) 
);


  
</script>
<div>
<form class="form-inline my-2 my-lg-0">
  <h3>There are {totalRecipes} of Recipes</h3>
  <br>
    <Router primary={false}>
        <Link class ="btn btn-outline-success" to="/recipeForm">
          <i class="mi mi-add"><span class="u-sr-only">Ceate Recipe</span></i> 
        </Link>
    </Router>
  </form>
  <br>
  <input type="text" placeholder="Search" bind:value={searchedRecipe}/>
  {#if recipes.length && searchedRecipes.length > 0}
  <br>
  <table class="table"> 
    <thead> 
      <tr>
      <th>Title</th>
        <th>Preperation time</th>
        <th>Number of persons</th>
        <th>Number of ingredients</th>
        <th>Ingredients</th>
        <th>Method</th>
        <th>categories</th>
        <th>type</th>
        <th>rate</th>
        <th>level</th>
      </tr>
    </thead>
    <tbody>
        {#each recipes && searchedRecipes as recipe} 
        <tr>
          <td>{recipe.title}</td>
          <td>{recipe.preptime}</td>
          <td>{recipe.numbPersons}</td>
          <td>{recipe.numbIngre}</td>
          <td>{recipe.ingredients}</td>
          <td>{recipe.method}</td>
          <td>{recipe.categories}</td>
          <td>{recipe.type}</td>
          <td>{recipe.rating}</td>
          <td>{recipe.level}</td>
         
          <td>
            <form action="/recipes">
              <button type="submit" id="deleteRecipe" class="btn btn-outline-danger btn-sm" on:click={(_id)=> deleteRecipe(recipe._id)}>
                <i class="mi mi-delete"><span class="u-sr-only"></span></i> 
              </button>
            </form> 
          </td>
          <td>
        
                <button id="updatecipe" class="btn btn-outline-info btn-sm" on:click={(_id)=> getRecipe(recipe._id)}>
                  <i class="mi mi-edit-alt"><span class="u-sr-only"></span></i> 
                  
                </button>
          </td>

        </tr> 
        {/each}     

        </tbody>
        </table>
        {:else}
        <h1 class="text-center text-muted my-3">No Recipes found</h1>
        {/if}
              
    </div>
  