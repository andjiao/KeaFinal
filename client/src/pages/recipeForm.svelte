<script>
    import { BASE_URL } from "../store/globals.js"
    import { Router, Link, useNavigate } from 'svelte-navigator'
    import { user } from '../store/getUser.js'
    import * as Toastr from "toastr" 

    const navigate = useNavigate()
    
 if(!$user) {
        navigate('/')
    }

    let titleInput=""
    let prepTimeInput=""
    let numbPersonsInput=""
    let numbIngreInput=""
    let ingredientsInput=""
    let methodInput=""
    let categoriesInput=""
    let typeInput=""
    let ratingInput=""
    let levelInput=""

    
        async function createRecipe(){
            const recipe = {
                title:titleInput,
                preptime: prepTimeInput,
                numbPersons:numbPersonsInput,
                numbIngre:numbIngreInput,
                ingredients:ingredientsInput,
                method: methodInput,
                categories: categoriesInput,
                type:typeInput,
                rating:ratingInput,
                level:levelInput

            }
            try {
                const response = await fetch(`${$BASE_URL}/recipes`,{
                method: 'POST',
                //credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(recipe)

                })
                if (!response.ok) {
            const json = await response.json()  
            Toastr.warning(json.message)
            return
        } else{
        const json = await response.json()
        $user.id = json.userid
        navigate('/recipes', { replace: true })
       
        Toastr.success(json.message)

        }
            } catch (error) {
                Toastr.error('Creation failed.')
                
            }
        }
  
    </script>

    <body>
        <div class="container">
            <form class="form"id="createRecipeForm" method="POST" on:submit|preventDefault={createRecipe}>
                <h1 class="form__title">Create Recipe</h1>

                <div class="form__input-group">
                    <input type="text" id="titleInput" class="form__input" bind:value={titleInput} name="title" required placeholder="Title">
                    <div class="form__input-error-message"></div> 
                </div>
                <div class="form__input-group">
                    <input type="text" id="prepmTimeInput" class="form__input" bind:value={prepTimeInput} name="prepTime"  placeholder="Preperation Time">
                    <div class="form__input-error-message"></div> 
                </div>
                <div class="form__input-group">
                    <input type="number" id="numbPersonsInput" class="form__input" bind:value={numbPersonsInput} name="numbPersons"  placeholder="Number of persons">
                    <div class="form__input-error-message"></div> 
                </div>
                <div class="form__input-group">
                    <input type="number" id="numbIngreInput" class="form__input" bind:value={numbIngreInput} name="numbIngre" placeholder="Number of ingredients">
                    <div class="form__input-error-message"></div> 
                </div>
                <div class="form__input-group">
                    <input type="text" id="methodInput" class="form__input" bind:value={methodInput} name="method" placeholder="method">
                    <div class="form__input-error-message"></div> 
                </div>
                <div class="form__input-group">
                    <input type="text" id="methodInput" class="form__input" bind:value={methodInput} name="method" placeholder="method">
                    <div class="form__input-error-message"></div> 
                </div>
                <div class="form__input-group">
                    <input type="text" id="typeInput" class="form__input" bind:value={typeInput} name="type" placeholder="type">
                    <div class="form__input-error-message"></div> 
                </div>
                <div class="form__input-group">
                    <input type="text" id="levelInput" class="form__input" bind:value={levelInput} name="level" placeholder="level">
                    <div class="form__input-error-message"></div> 
                </div>
                <button class="form__button" on:click={createRecipe}>Create</button>

            </form>

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

    
    
    
    
    