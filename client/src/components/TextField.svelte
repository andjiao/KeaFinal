<script>
    export let label = '';
    export let name = '';
    export let placeholder = '';
    export let value = '';
    export let id= "";
    export let className ="";
    export let type="";
    
    export let ref = null;
  </script>
  
  <div class="field">
    <label for={name}>{label}</label>
    {#if type === 'text'}
    <input type="text" {id} class={className} {name} {placeholder}  bind:value={value} bind:this={ref} >
  {:else if type === 'email'}
    <input type="email"{id} {name} {placeholder}  bind:value={value} bind:this={ref} >
  {:else if type === 'password'}
    <input type="password"{id} class={className} {name} {placeholder}  bind:value={value} bind:this={ref} >
  {/if}
  
    <slot></slot>
  </div>