<!-- EditModal.svelte -->
<script>
    export let isOpen = false;
    export let recipeId = '';
    export let value = '';
  
    let editedValue = '';
  
    function closeModal() {
      isOpen = false;
      editedValue = '';
    }
  
    function saveChanges() {
      // Perform the save logic here, e.g., make an API request
      // using editedValue as the updated value and recipeId for identification
      console.log(`Saving changes for recipe ID ${recipeId}:`, editedValue);
  
      closeModal();
    }
  </script>
  
  {#if isOpen}
    <div class="modal">
      <div class="modal-content">
        <header>Edit Modal</header>
        <div class="modal-body">
          <input type="text" bind:value={editedValue} />
        </div>
        <footer>
          <button on:click={closeModal}>Cancel</button>
          <button on:click={saveChanges}>Save</button>
        </footer>
      </div>
    </div>
  {/if}
  