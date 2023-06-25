<script>
     import { BASE_URL } from "../store/globals.js"
     import * as Toastr from "toastr"
     import Star from "../components/star.svelte"
     import RateRecipe from "../components/RateRecipe.svelte"
   

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
                console.log("this is the rating", recipe.rating)

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

  let isIconActive =false;
    function handleClick() {
    isIconActive = !isIconActive;
  }
    
   
</script>

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css">
</svelte:head>


<div class="recipe">
  <div class="recipe__bookmark">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <i class:active="{isIconActive}" class="mi mi-bookmark recipe__bookmark__icon" 
    on:click="{handleClick}"></i>
  </div>

  <div class="recipe__header">
    <div class="recipe__header-content">
      <h1 style="font-size: 50px; white-space: pre-line;">{recipe.title}</h1>
      <Star rate={recipe.rating}/>
      <p>Reviewed {recipe.ratingCount} times</p>
    </div>
  </div>
    
    <div class="recipe__ingredients">
      <div class="ingredient__header">
        <h2>Ingredients</h2>
      </div>
      <ul>
        {#each ingredients as ingredient}
          <li>
            <div class="ingredient-item">
              <p style="margin-right: 5px;">{ingredient.name}</p>
              <p style="margin-left: 5px;">{ingredient.quantity}</p>            
            
          </div>
          </li>
        {/each}
      </ul>
    </div>

    <div class="recipe__method">
      <div class="method__header">
        <h2>Method</h2>
      </div>
      <div class="method__content">
        <p>{recipe.method}</p>
      </div>
     
    </div>

    <div class="recipe__rate">
      <RateRecipe recipeId={recipe._id}/>
    </div>

    </div>


  <style>

    .recipe{
      background-color: #FFFAFA;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      display: flex;
      align-items: flex-start;
    
    }

      .recipe__bookmark{
        position: absolute;
        top: 20%;
        margin-top: 10px;
        margin-right: 20px;
        margin-left: 50%;
      }
   
    .recipe__bookmark__icon{
    border: solid black;
    font-size: 70px;
    padding-bottom: 0.5px;
    background-color: #E6E6E6;
    padding: 20px;
    }

  .recipe__bookmark__icon.mi-bookmark.active {
    background-color: #CD5C5C;
  }

  .recipe__header {
    position: absolute;
    top: 12%;
    margin-top: 100px;
    margin-right: 20px;
    margin-left: 35%;
    display: flex;
    width:100%; 
  }
  
  .recipe__header-content {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }

  .recipe__ingredients{
    position: absolute;
    top: 40%;
    margin-top: 100px;
    margin-right: 20px;
    margin-left: 20%;
    display: flex;
    flex-wrap: wrap;
    width:100%;

  }
  .ingredient__header{
    display: flex;
    width: 100%;

  }
  .ingredient-item {
    display: flex;
    margin-left: 2px;
    margin-right: 20px;
  }


  .recipe__method {
  position: absolute;
  top: 40%;
  margin-top: 100px;
  margin-right: 20px;
  margin-left: 50%;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.method__header {
  display: flex;
  width: 100%;
}

.method__content {
  display: flex;
  margin-top: 0px;
}

.recipe__rate{
  position: absolute;
    top: 55%;
    margin-top: 100px;
    margin-right: 20px;
    margin-left: 20%;
    display: flex;
    flex-wrap: wrap;
    width:100%;

}

  </style>