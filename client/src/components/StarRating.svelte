<script>
    let ratingInput = 0;
    import { BASE_URL } from "../store/globals.js"
    import * as Toastr from "toastr" 

    import { useNavigate } from 'svelte-navigator'
    const navigate = useNavigate()

  
    function handleStarClick(starIndex) {
    ratingInput = starIndex + 1;
    sendRate(ratingInput)
  }

  function handleStarHover(starIndex) {
    ratingInput = starIndex + 1;
  }

  function handleStarKeyDown(event, starIndex) {
    if (event.key === 'Enter' || event.key === 'Space') {
      handleStarClick(starIndex);
    }
  }

   async function sendRate ( recipeId,ratingInput){

    const body ={
        rating: ratingInput
    }

    try {
        const response = await fetch(`${$BASE_URL}/recipe/${recipeId}/review`,{
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        if (!response.ok) {
            const json = await response.json()
            Toastr.warning(json.message)
            return

    } else {
        const json = await response.json()
        Toastr.success(json.message)
        navigate('/recipes', { replace: true })

    } 
}catch (error) {
        Toastr.error('Rating failed.')
            console.log(error.message)
            console.log(body)
        
    }

  }

  //     on:mouseover={(event) => handleStarKeyDown(event, index)}
  
  </script>
  
  
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


  <style>

  .star {
       display: inline-block; 
       color: yellow;
       font-size: 100px;
    }
  </style>
  