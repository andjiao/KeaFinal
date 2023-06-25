
<script>
    import { Link } from 'svelte-navigator';
    
    import Star from "./star.svelte"
    export let title;
    export let rating;
    export let recipeId;
  
    let isIconActive =false;
    function handleClick() {
    isIconActive = !isIconActive;
  }
</script>

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css">
</svelte:head>

    <div class="card">
        <div class="card__icon-container">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <i class:active="{isIconActive}" class="mi mi-heart card__icon" 
            on:click="{handleClick}"></i>
          </div>
        
        <div class="card__image-container">
            <!-- svelte-ignore a11y-missing-attribute -->
            <img src="#" class="card__image" />
        </div>
        <div class="card__info">
            <div class="card__title">
                <Link style ="color:black"to={`recipeDetails/${recipeId}`}>{title}</Link>
            </div>
            <Star rate={rating} />
        </div>
    </div>


<style>
  .card {
    font-family: sans-serif;
    text-align: left;
    display: flex;
    flex-wrap: wrap; /* Allow the card content to wrap */
    max-width: 200px;
    padding: 20px;
    margin: 20px auto 30px auto;
    border: solid black;
    background-color: #FF9F7A;
  }

  .card__icon-container,
  .card__image-container,
  .card__info {
    flex: 0 0 100%; /* Each item takes 100% width */
    margin-bottom: 5px; /* Add some spacing between the items */
  }

  .card__icon-container {
    display: flex;
    align-items: center; /* Align the container vertically in the middle */
    justify-content: flex-end;
  }

  .card__icon {
    border: solid black;
    font-size: 24px;
    padding-top: 5px;
    padding-left: 3px;
    padding-right: 3px;
    background-color: #E6E6E6;
  }

  .card__icon.mi-heart.active {
    background-color: #F08080;
  }

  .card__image-container {
    display: inline-block;
    flex: 0 0 auto;
    margin-right: 20px;
  }

  .card__image {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 10%;
    display: block;
  }

  .card__info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .card__title {
    font-size: 1.2em;
    font-weight: bold;
  }

  .card__title:hover {
  cursor: pointer;
}
</style>

