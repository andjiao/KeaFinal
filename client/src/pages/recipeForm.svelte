<script>
    import { BASE_URL } from "../store/globals.js"
    import { Router, Link, useNavigate } from 'svelte-navigator'
    import { user } from '../store/getUser.js'
    import * as Toastr from "toastr" 

    const navigate = useNavigate()

    let recipe = {
    title:"",
    ingredients:[{
        name:"",
        quantity:"",
    }],
    prepTime:"",
    numbPersons:0,
    method: "",
    rating:0
   
  };

  const handleIngredientChange = (event, index, key) => {
    const { value } = event.target;
    recipe.ingredients[index][key] = value;
  };

  const handleAddIngredient = () => {
    recipe.ingredients = 
    [...recipe.ingredients, { name: "", quantity: "" }];
  };

        async function createRecipe(){
         
                // const categoriesArray = recipe.categories.map(category => category.trim());
    
            const recipeData = {
                title:recipe.title,
                ingredients:recipe.ingredients ,
                prepTime: recipe.prepTime,
                numbPersons:recipe.numbPersons,
                method: recipe.method,
                rating: recipe.rating,
               
            }
            try {
                const response = await fetch(`${$BASE_URL}/recipes/createRecipe`,{
                method: 'POST',
                //credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(recipeData)

                })
                if (!response.ok) {

                    
            const json = await response.json()  
            Toastr.warning(json.message)
            
            return
        } else{
        const json = await response.json()
        // $user.id = json.userid
        navigate('/', { replace: true })
       
        Toastr.success("Recipe created!")
        console.log(recipeData)

        }
            } catch (error) {
                Toastr.error('Creation failed.')
                console.log(error.message)
                console.log(recipeData)
                
            }
        }

  
    </script>

    <body>
        <div class="container">
            <form class="form"id="createRecipeForm" method="POST" on:submit|preventDefault={createRecipe}>
                <h1 class="form__title">Create Recipe</h1>

                <div class="form__input-group">
                    <input type="text" id="titleInput" class="form__input" bind:value={recipe.title} name="title" required placeholder="Title">
                    <div class="form__input-error-message"></div> 
                </div>
                <div class="form__input-group">
                    <input type="text" id="prepmTimeInput" class="form__input" bind:value={recipe.prepTime} name="prepTime"  placeholder="Preperation Time">
                    <div class="form__input-error-message"></div> 
                </div>
                <div class="form__input-group">
                    <input type="number" id="numbPersonsInput" class="form__input" bind:value={recipe.numbPersons} name="numbPersons"  placeholder="Number of persons">
                    <div class="form__input-error-message"></div> 
                </div>
                

                <div class="form__input-group">
                    {#each recipe.ingredients as ingredient, index}
                      <input
                        type="text"
                        id="ingredientName_"
                        class="form__input"
                        value={ingredient.name}
                        placeholder="Enter ingredients"
                        name="ingredients"
                        on:input={(event) => handleIngredientChange(event, index, 'name')}
                      />
                      <input
                      type="text"
                      id="ingredientQuantity"
                      class="form__input"
                      value={ingredient.quantity}
                      placeholder="Enter quantity"
                      name="quantity"
                      on:input={(event) => handleIngredientChange(event, index, 'quantity')}
                    />
                        <div class="form__input-error-message"></div> 
                    {/each}
                    <button type="button" class="form__button" on:click={handleAddIngredient}>
                      Add Ingredient
                    </button>
                  </div>



                  <div class="form__input-group">

                  </div>

                  <div class="form__input-group">
                    <input type="text" id="methodInput" class="form__input" bind:value={recipe.method} name="method" placeholder="method">
                    <div class="form__input-error-message"></div> 
                </div>
                  <div class="form__input-group">
                    <input type="text" id="ratingInput" class="form__input" bind:value={recipe.rating} name="rating" placeholder="rating">
                    <div class="form__input-error-message"></div> 
                </div>


            </form>

            <button class="form__button" on:click={createRecipe}>Create</button>

        </div>
    </body>

    <style>

        body{
        margin: 0;
        height: 100vh;
        
        /*these three are going to vertically and horizontally center oure actual container for both the forms*/
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        
        background: #FFFAFA;
        }
        
        .container{
            /*the actual width is going to shrink down to whaatever it needs to be*/
            width: 400px;
            max-width: 400px;
            /*this is saying one units of the base-font-size 
            so essentially  1rem is going to be 18px and 2rem is going to be 38px
            */
            margin: 1rem;
            padding: 2rem;
            
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            background: #FFDAB9;
        }
        
        /*setting fonts for text in both the container, the input in the form and for the button in the form
        customize your own fonts go to: fonts.google
        */
        .container,
        .form__input,
        .form__button {
            font: 500 1rem 'Quicksand', sans-serif;
        }
   
        
        .form > *:first-child {
            margin-top: 0;
        }
        
        .form > *:last-child {
            margin-bottom: 0;
        }
        
        .form__title {
            margin-bottom: 2rem;
            text-align: center;
        }
        
       /*  .form__message {
            text-align: center;
            margin-bottom: 1rem;
        }
        
        .form__message--error {
            color: #DC143C;
        } */
        
        .form__input-group {
            /*this gives some space btw the two input-fields*/
            margin-bottom: 1rem;
        }
        
        .form__input {
            display: block;
            width: 100%;
            padding: 0.75rem;
            box-sizing: border-box;
            border-radius: 4px;
            border: 1px solid #663300;
            outline: none;
            background: #F8F8FF;
            transition: background 0.2s, border-color 0.2s;
        }
  
      
        /*this makes it possible for the inputfield to be white, when the input-field is in focus*/
        .form__input:focus {
            border-color: #99004D;
            background: #ffffff;
        }
        
        /* .form__input--error {
            color: var(--color-error);
            border-color: var(--color-error);
        } */
        
        .form__input-error-message {
            margin-top: 0.5rem;
            font-size: 0.85rem;
            color: #DC143C;
        }
        
        .form__button {
            width: 100%;
            padding: 1rem 2rem;
            font-weight: bold;
            font-size: 1.1rem;
            color: #000000;
            border: none;
            border-radius: 4px;
            outline: none;
            cursor: pointer;
            background: #F0FFF0;
        }
        
        .form__button:hover {
            background: #c8ddc8;
        }
        
        /*this style is going to be applied when you have clicked on the button*/
        .form__button:active {
            /*transformin the button by reducing the size of the button by 2% when you press the button*/
            transform: scale(0.98);
        }
        
            </style>

    
    
    
    
    