<script>
  import { createEventDispatcher } from 'svelte';

  export let productId;
  export let review;

  const dispatch = createEventDispatcher();

  async function submitReview() {
    try {
      dispatch('request');

      await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review),
      });

      dispatch('success');
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch('fail', { errorMessage });
    }
  }
</script>


