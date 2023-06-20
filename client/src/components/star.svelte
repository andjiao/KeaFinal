<script>
  export let rate = 0; // The rating value received as a prop

  // Generate an array of stars based on the rating
  let stars = [];

  $: {
    if (rate >= 0 && rate <= 5) {
      stars = generateStars();
    }
  }

  function generateStars() {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rate) {
        stars.push({ filled: true });
      } else {
        stars.push({ filled: false });
      }
    }
    return stars;
  }
</script>

<!-- Display the stars -->
{#if rate >= 0 && rate <= 5}
  <div class="stars">
    {#each stars as star, i}
      {#if star.filled}
        <span class="star filled">&#9733;</span>
      {:else}
        <span class="star">&#9734;</span>
      {/if}
    {/each}
  </div>
{:else}
  <div>Loading...</div>
{/if}

<style>
  .star {
    font-size: 24px;
    color: #aaa;
  }

  .filled {
    color: #fdd835;
  }
</style>
