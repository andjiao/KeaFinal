<script>
   
    import { BASE_URL } from "../store/globals.js"
    import * as Toastr from "toastr" 

    import { useNavigate } from 'svelte-navigator'
    const navigate = useNavigate()

    export let recipeId;
    let ratingInput = 0;

  
    function handleStarClick(starIndex) {
    ratingInput = starIndex + 1;
    console.log(recipeId, "this is the recipeId");
    console.log(ratingInput, "this is the ratinhInput")
    if (ratingInput > 0) {
    sendRate(recipeId);
  }
  }

  function handleStarHover(starIndex) {
    ratingInput = starIndex + 1;
  }


   async function sendRate (recipeId){
    const body = {
    rating: ratingInput
  };


    try {
        const response = await fetch(`${$BASE_URL}/recipes/${recipeId}/rateRecipe`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(body),
        
        } )

        console.log(response);
       
        if (!response.ok) {
            //const json = await response.json()
            const text = await response.text()
           
            console.log(text, "this is the text"); 
           
            // Toastr.warning(json.message)
            return

    } else {
        const json = await response.json()
        Toastr.success(json.message)
        navigate('/', { replace: true })

    } 
}catch (error) {
        Toastr.error('Rating failed.')
            console.log(error.message)
            console.log(body.rating.toLocaleString(), "this is the indexnumber")
           
        
    }

  }

  //     on:mouseover={(event) => handleStarKeyDown(event, index)}
  
  </script>
  
  <form id="updateGoodForm" method="PUT" on:submit|preventDefault={sendRate}>

    <div class="star-ratingInput">
        {#each Array(5) as _, index}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <span
            class="star"
            on:click={() => handleStarClick(index)}
            on:mouseover = {() => handleStarHover(index)}
            tabIndex="0"
          >
            {ratingInput >= index + 1 ? '★' : '☆'}
          </span>
        {/each}
      </div>
      
      <p>ratingInput: {ratingInput}</p>

</form>
  


  <style>

  .star {
       display: inline-block; 
       color: yellow;
       font-size: 100px;
    }
  </style>
  